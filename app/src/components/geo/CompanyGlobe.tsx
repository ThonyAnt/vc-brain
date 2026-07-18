import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ACCENT } from '../brain/BrainCanvas'
import type { LatLng } from '../../lib/geo'
import { FUND_HQ } from '../../lib/geo'

/**
 * Interim globe renderer matched to the app's light chrome: paper sphere,
 * ink graticule, accent company markers, arcs from fund HQ.
 * Swap the internals for the pasted `ui/globe` component when it lands —
 * keep this component's props as the integration boundary.
 */
export interface GlobeMarker extends LatLng {
  label?: string
  kind?: 'hq' | 'company'
}

const DEG = Math.PI / 180

function toVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const la = lat * DEG
  const ln = lng * DEG
  return new THREE.Vector3(
    Math.cos(la) * Math.sin(ln) * r,
    Math.sin(la) * r,
    Math.cos(la) * Math.cos(ln) * r,
  )
}

export function CompanyGlobe({
  markers,
  focus,
  className,
}: {
  markers: GlobeMarker[]
  focus?: LatLng | null
  className?: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<LatLng | null>(null)
  focusRef.current = focus ?? null

  const markersKey = JSON.stringify(markers)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10)
    camera.position.set(0, 0, 3.5)

    const globe = new THREE.Group()
    scene.add(globe)

    // flat paper sphere, no lighting — matches the app's flat Attio chrome
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0xf6f8fb }),
    )
    globe.add(sphere)

    // graticule
    const ink = 0x1c1d1f
    function ring(points: THREE.Vector3[], opacity: number) {
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity })
      const loop = new THREE.LineLoop(geo, mat)
      globe.add(loop)
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts = []
      for (let i = 0; i < 96; i++) pts.push(toVec3(lat, (i / 96) * 360, 1.001))
      ring(pts, lat === 0 ? 0.13 : 0.07)
    }
    for (let lng = 0; lng < 180; lng += 30) {
      const pts = []
      for (let i = 0; i < 96; i++) pts.push(toVec3((i / 96) * 360 - 180, lng, 1.001))
      ring(pts, 0.07)
    }

    // markers + arcs from HQ
    const parsed: GlobeMarker[] = JSON.parse(markersKey)
    const accent = new THREE.Color(ACCENT)
    const hqVec = toVec3(FUND_HQ.lat, FUND_HQ.lng, 1.004)
    for (const m of parsed) {
      const isHq = m.kind === 'hq'
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(isHq ? 0.03 : 0.024, 12, 8),
        new THREE.MeshBasicMaterial({ color: isHq ? ink : accent }),
      )
      dot.position.copy(toVec3(m.lat, m.lng, 1.004))
      globe.add(dot)
      if (!isHq) {
        const a = hqVec
        const b = dot.position
        const mid = a.clone().add(b).normalize().multiplyScalar(1 + a.angleTo(b) * 0.22)
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40))
        const mat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.32 })
        globe.add(new THREE.Line(geo, mat))
      }
    }

    // rotation state: face the HQ initially, drift slowly, tween to focus
    let yaw = -FUND_HQ.lng * DEG
    let pitch = FUND_HQ.lat * DEG * 0.5
    let idleYaw = yaw
    let raf = 0
    const clock = new THREE.Clock()

    function frame() {
      const dt = Math.min(clock.getDelta(), 0.05)
      const f = focusRef.current
      let targetYaw: number
      let targetPitch: number
      if (f) {
        targetYaw = -f.lng * DEG
        targetPitch = THREE.MathUtils.clamp(f.lat * DEG * 0.5, -0.6, 0.6)
        idleYaw = targetYaw
      } else {
        if (!reducedMotion) idleYaw += dt * 0.07
        targetYaw = idleYaw
        targetPitch = 0.28
      }
      const k = Math.min(1, dt * 4.5)
      yaw += (targetYaw - yaw) * k
      pitch += (targetPitch - pitch) * k
      globe.rotation.set(pitch, yaw, 0)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(host)
    frame()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material as THREE.Material | undefined
        if (mat) mat.dispose()
      })
      renderer.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [markersKey])

  return <div ref={hostRef} className={className} />
}
