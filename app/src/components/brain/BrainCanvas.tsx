import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { FundGraph } from '../../lib/types'

/*
 * Ported from mockup/src/main.js. Rendering core (shader points, cosmos-style
 * links, synapse shimmer, bezier fly-to) is kept; data now comes from the fund
 * graph, with procedural "tracked" companies added for visual density. All HUD
 * moved to React overlays; this component exposes an imperative handle.
 */

export interface BrainHandle {
  focusNode: (id: string) => void
  clearFocus: () => void
  pulseNodes: (ids: string[]) => void
}

interface Props {
  graph: FundGraph
  onSelect?: (id: string | null) => void
}

/* xAI accent mapping — legend and UI use the same colors */
export const ROLE_COLORS: Record<string, string> = {
  sourced: '#ff7a17', // sunset
  portfolio: '#a0c3ec', // breeze
  rejected: '#7c3aed', // dusk
  founder: '#c4b5fd', // twilight
  tracked: '#565b64',
}

const N_FILLER = 169

function mulberry32(seed: number) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const PREFIX = ['Lumen', 'Vanta', 'Arc', 'Helio', 'Nimbus', 'Fathom', 'Ember', 'Atlas', 'Vertex', 'Sable', 'Orin', 'Cobalt', 'Drift', 'Halcyon', 'Iris', 'Juniper', 'Kite', 'Mica', 'Onyx', 'Prism', 'Rill', 'Tessel', 'Verdant', 'Willow', 'Zephyr', 'Basalt', 'Crux', 'Echo', 'Flux', 'Grove', 'Harbor', 'Alder', 'Sorrel']
const SUFFIX = ['Labs', 'Systems', 'Works', 'Data', 'Ops', 'Cloud', 'Base', 'Flow', 'Grid', 'Stack']

interface SceneNode {
  id: string
  label: string
  role: string
  score?: number
  cluster: number
  base: THREE.Vector3
  offset: THREE.Vector3
  vel: THREE.Vector3
  pos: THREE.Vector3
  phase: number
  real: boolean
}

export const BrainCanvas = forwardRef<BrainHandle, Props>(function BrainCanvas({ graph, onSelect }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<BrainHandle>({ focusNode: () => {}, clearFocus: () => {}, pulseNodes: () => {} })

  useImperativeHandle(ref, () => ({
    focusNode: (id) => apiRef.current.focusNode(id),
    clearFocus: () => apiRef.current.clearFocus(),
    pulseNodes: (ids) => apiRef.current.pulseNodes(ids),
  }))

  useEffect(() => {
    const container = containerRef.current
    const tooltip = tooltipRef.current
    if (!container || !tooltip) return

    const rand = mulberry32(20260718)
    const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ---------------- build scene data from the fund graph ---------------- */

    const markets = graph.nodes.filter((n) => n.type === 'market')
    const clusterCount = Math.max(markets.length, 1)
    const anchors = markets.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / clusterCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 330
      return new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.cos(phi) * r * 0.72,
        Math.sin(phi) * Math.sin(theta) * r,
      )
    })
    const marketIndex = new Map(markets.map((m, i) => [m.id, i]))

    /* cluster for each company via its market edge; founders via founder edge */
    const clusterOf = new Map<string, number>()
    for (const e of graph.edges) {
      if (e.kind === 'market' && marketIndex.has(e.target)) clusterOf.set(e.source, marketIndex.get(e.target)!)
    }
    for (const e of graph.edges) {
      if (e.kind === 'founder') clusterOf.set(e.source, clusterOf.get(e.target) ?? 0)
    }

    const nodes: SceneNode[] = []
    const jitterVec = (id: string, spread: number) => {
      const r = mulberry32(hash(id))
      return new THREE.Vector3(
        (r() + r() - 1) * spread,
        (r() + r() - 1) * spread * 0.7,
        (r() + r() - 1) * spread,
      )
    }

    for (const gn of graph.nodes) {
      if (gn.type === 'market' || gn.type === 'criterion') continue
      const cluster = clusterOf.get(gn.id) ?? 0
      const base = anchors[cluster].clone().add(jitterVec(gn.id, gn.type === 'founder' ? 150 : 120))
      nodes.push({
        id: gn.id,
        label: gn.label,
        role: gn.type,
        score: gn.score,
        cluster,
        base,
        offset: new THREE.Vector3(),
        vel: new THREE.Vector3((rand() - 0.5) * 6, (rand() - 0.5) * 6, (rand() - 0.5) * 6),
        pos: base.clone(),
        phase: rand() * Math.PI * 2,
      real: true,
      })
    }

    const usedNames = new Set<string>()
    for (let i = 0; i < N_FILLER; i++) {
      const cluster = i % clusterCount
      let name = ''
      do name = `${pick(PREFIX)} ${pick(SUFFIX)}`
      while (usedNames.has(name))
      usedNames.add(name)
      const base = anchors[cluster].clone().add(jitterVec(`filler-${i}`, 130))
      nodes.push({
        id: `t-${i}`,
        label: name,
        role: 'tracked',
        cluster,
        base,
        offset: new THREE.Vector3(),
        vel: new THREE.Vector3((rand() - 0.5) * 6, (rand() - 0.5) * 6, (rand() - 0.5) * 6),
        pos: base.clone(),
        phase: rand() * Math.PI * 2,
        real: false,
      })
    }

    const N = nodes.length
    const byId = new Map(nodes.map((n) => [n.id, n]))

    /* edges: real graph edges + procedural filler links (2 nearest same-cluster) */
    type SceneEdge = { a: SceneNode; b: SceneNode; weight: number; phase: number }
    const edges: SceneEdge[] = []
    const edgeKeys = new Set<string>()
    const addEdge = (a?: SceneNode, b?: SceneNode, weight = 1) => {
      if (!a || !b || a === b) return
      const key = a.id < b.id ? `${a.id}|${b.id}` : `${b.id}|${a.id}`
      if (edgeKeys.has(key)) return
      edgeKeys.add(key)
      edges.push({ a, b, weight, phase: rand() * Math.PI * 2 })
    }
    for (const e of graph.edges) {
      if (e.kind === 'market') continue
      addEdge(byId.get(e.source), byId.get(e.target), e.kind === 'precedent' ? 1.6 : e.kind === 'founder' ? 0.9 : 0.7)
    }
    const fillers = nodes.filter((n) => !n.real)
    for (const n of fillers) {
      const same = nodes.filter((o) => o !== n && o.cluster === n.cluster && !o.real)
      same.sort((p, q) => p.base.distanceToSquared(n.base) - q.base.distanceToSquared(n.base))
      addEdge(n, same[0], 0.8)
      if (rand() < 0.6) addEdge(n, same[1], 0.6)
    }
    /* a few cross-cluster links for depth */
    for (let k = 0; k < clusterCount * 3; k++) addEdge(pick(fillers), pick(fillers), 0.5)

    const neighbourSets = new Map(nodes.map((n) => [n.id, new Set([n.id])]))
    for (const e of edges) {
      neighbourSets.get(e.a.id)!.add(e.b.id)
      neighbourSets.get(e.b.id)!.add(e.a.id)
    }

    /* ---------------- three setup (ported) ---------------- */

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 8000)
    camera.position.set(0, 170, 1180)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.minDistance = 140
    controls.maxDistance = 3200
    controls.autoRotate = !reducedMotion
    controls.autoRotateSpeed = 0.45

    const group = new THREE.Group()
    scene.add(group)

    const white = new THREE.Color('#ffffff')
    const roleColor = (n: SceneNode) => {
      const c = new THREE.Color(ROLE_COLORS[n.role] ?? ROLE_COLORS.tracked)
      if (n.role === 'sourced') c.lerp(white, 0.15)
      return c
    }
    const roleSize = (n: SceneNode) =>
      n.role === 'portfolio' ? 23 : n.role === 'sourced' ? 19 : n.role === 'founder' ? 10 : n.role === 'rejected' ? 12 : 9

    const pPos = new Float32Array(N * 3)
    const pCol = new Float32Array(N * 3)
    const pSize = new Float32Array(N)
    const pPulse = new Float32Array(N)
    const pPhase = new Float32Array(N)
    const pDim = new Float32Array(N).fill(1)
    const pOutline = new Float32Array(N)

    nodes.forEach((n, i) => {
      const c = roleColor(n)
      pCol[i * 3] = c.r
      pCol[i * 3 + 1] = c.g
      pCol[i * 3 + 2] = c.b
      pSize[i] = roleSize(n)
      pPulse[i] = n.role === 'sourced' ? 1 : 0
      pPhase[i] = n.phase
      pOutline[i] = n.role === 'portfolio' ? 1 : 0
    })

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3).setUsage(THREE.DynamicDrawUsage))
    pGeo.setAttribute('aColor', new THREE.BufferAttribute(pCol, 3))
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1))
    pGeo.setAttribute('aPulse', new THREE.BufferAttribute(pPulse, 1).setUsage(THREE.DynamicDrawUsage))
    pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1))
    pGeo.setAttribute('aDim', new THREE.BufferAttribute(pDim, 1).setUsage(THREE.DynamicDrawUsage))
    pGeo.setAttribute('aOutline', new THREE.BufferAttribute(pOutline, 1))

    /* additive over transparent canvas: add RGB, never write alpha */
    function pureAdditive<T extends THREE.Material>(mat: T): T {
      mat.blending = THREE.CustomBlending
      mat.blendEquation = THREE.AddEquation
      mat.blendSrc = THREE.OneFactor
      mat.blendDst = THREE.OneFactor
      mat.blendSrcAlpha = THREE.ZeroFactor
      mat.blendDstAlpha = THREE.OneFactor
      return mat
    }

    const pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uMotion: { value: reducedMotion ? 0 : 1 } },
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aSize, aPulse, aPhase, aDim, aOutline;
        uniform float uTime, uMotion;
        varying vec3 vColor;
        varying float vDim, vOutline;
        void main() {
          vColor = aColor;
          vDim = aDim;
          vOutline = aOutline;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float pulse = 1.0 + aPulse * uMotion * 0.22 * sin(uTime * 2.2 + aPhase);
          gl_PointSize = clamp(aSize * pulse * (620.0 / -mv.z), 2.0, 52.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vDim, vOutline;
        void main() {
          vec2 p = 2.0 * gl_PointCoord - 1.0;
          float d2 = dot(p, p);
          float alpha = 1.0 - smoothstep(0.9, 1.0, d2);
          if (alpha < 0.004) discard;
          vec3 col = vColor;
          if (vOutline > 0.5) {
            float r = length(p);
            float ring = smoothstep(0.6, 0.68, r) * (1.0 - smoothstep(0.86, 0.97, r));
            col = mix(col, vec3(0.98), ring * 0.85);
          }
          gl_FragColor = vec4(col, alpha * vDim);
        }`,
    })
    const points = new THREE.Points(pGeo, pMat)
    points.renderOrder = 2
    group.add(points)

    const LINK_FADE_NEAR = 55
    const LINK_FADE_FAR = 240
    const LINK_MIN_TRANSPARENCY = 0.25
    const GREYOUT = 0.22
    const E = edges.length
    const lPos = new Float32Array(E * 6)
    const lCol = new Float32Array(E * 6)
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage))
    lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3).setUsage(THREE.DynamicDrawUsage))
    const lMat = pureAdditive(new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }))
    const links = new THREE.LineSegments(lGeo, lMat)
    links.renderOrder = 1
    group.add(links)

    const SYN_DIST = 105
    const SYN_MAX = 900
    const sPos = new Float32Array(SYN_MAX * 6)
    const sCol = new Float32Array(SYN_MAX * 6)
    const sGeo = new THREE.BufferGeometry()
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3).setUsage(THREE.DynamicDrawUsage))
    sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3).setUsage(THREE.DynamicDrawUsage))
    sGeo.setDrawRange(0, 0)
    const synapse = new THREE.LineSegments(sGeo, lMat.clone())
    synapse.renderOrder = 1
    group.add(synapse)
    const synTint = new THREE.Color('#8f9bb3')

    function ringTexture() {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const g = c.getContext('2d')!
      g.strokeStyle = 'rgba(255,255,255,0.95)'
      g.lineWidth = 7
      g.beginPath()
      g.arc(64, 64, 52, 0, Math.PI * 2)
      g.stroke()
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      return t
    }
    const ring = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: ringTexture(), transparent: true, opacity: 0.7, depthWrite: false, depthTest: false }),
    )
    ring.visible = false
    scene.add(ring)

    /* cluster labels in the mono label voice */
    function labelSprite(text: string) {
      const c = document.createElement('canvas')
      c.width = 1024
      c.height = 192
      const g = c.getContext('2d')!
      g.font = '400 58px "Geist Mono", monospace'
      if ('letterSpacing' in g) (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '16px'
      g.textBaseline = 'middle'
      const label = text.toUpperCase()
      const tickW = 12
      const gap = 26
      const textW = g.measureText(label).width
      const x0 = (c.width - (tickW + gap + textW)) / 2
      g.fillStyle = '#7d8187'
      g.fillRect(x0, 96 - 24, tickW, 48)
      g.fillStyle = 'rgba(218, 219, 223, 0.9)'
      g.fillText(label, x0 + tickW + gap, 96)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, opacity: 0.6, depthWrite: false }))
      sp.scale.set(150, 28.1, 1)
      return sp
    }
    const labelSprites: THREE.Sprite[] = []
    markets.forEach((m, i) => {
      const sp = labelSprite(m.label)
      sp.position.copy(anchors[i]).multiplyScalar(1.28)
      sp.position.y += 120
      group.add(sp)
      labelSprites.push(sp)
    })

    /* ---------------- interaction (ported, HUD → React refs) ---------------- */

    let hovered: SceneNode | null = null
    let focused: SceneNode | null = null
    const mouse = { x: -1e4, y: -1e4, downX: 0, downY: 0 }
    const proj = new THREE.Vector3()
    const tmpA = new THREE.Vector3()
    const tmpB = new THREE.Vector3()

    const onPointerMove = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onPointerDown = (e: PointerEvent) => {
      mouse.downX = e.clientX
      mouse.downY = e.clientY
    }
    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - mouse.downX
      const dy = e.clientY - mouse.downY
      if (dx * dx + dy * dy > 25) return
      if (hovered) setFocus(hovered)
      else clearFocus()
    }
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointerup', onPointerUp)

    function pickHovered() {
      const w = renderer.domElement.clientWidth
      const h = renderer.domElement.clientHeight
      let best: SceneNode | null = null
      let bestD = 18 * 18
      let bestZ = Infinity
      for (const n of nodes) {
        proj.copy(n.pos).applyMatrix4(group.matrixWorld).project(camera)
        if (proj.z > 1) continue
        const sx = (proj.x * 0.5 + 0.5) * w
        const sy = (-proj.y * 0.5 + 0.5) * h
        const d = (sx - mouse.x) ** 2 + (sy - mouse.y) ** 2
        if (d < bestD && proj.z < bestZ + 0.05) {
          best = n
          bestD = d
          bestZ = proj.z
        }
      }
      return best
    }

    const ROLE_TAG: Record<string, string> = {
      portfolio: 'portfolio',
      rejected: 'rejected',
      sourced: 'sourced this week',
      founder: 'founder',
      tracked: 'tracked',
    }

    const ringWorld = new THREE.Vector3()
    function updateHover() {
      hovered = pickHovered()
      if (hovered && tooltip) {
        tooltip.style.display = 'block'
        tooltip.style.left = `${Math.min(mouse.x + 14, container!.clientWidth - 250)}px`
        tooltip.style.top = `${mouse.y + 14}px`
        const color = ROLE_COLORS[hovered.role] ?? ROLE_COLORS.tracked
        tooltip.innerHTML = `<div style="color:#fff;font-size:13px">${hovered.label}</div>
          <div class="eyebrow" style="color:${color};margin-top:2px">${ROLE_TAG[hovered.role]}${hovered.score ? ` · fit ${hovered.score}` : ''}</div>`
        ringWorld.copy(hovered.pos).applyMatrix4(group.matrixWorld)
        ring.position.copy(ringWorld)
        const sz = (hovered.role === 'portfolio' ? 15 : 10) * 3.4
        ring.scale.set(sz, sz, 1)
        ring.visible = true
        renderer.domElement.style.cursor = 'pointer'
      } else if (tooltip) {
        tooltip.style.display = 'none'
        ring.visible = false
        renderer.domElement.style.cursor = 'default'
      }
    }

    const tween = {
      active: false,
      t: 0,
      dur: 1.25,
      fromPos: new THREE.Vector3(),
      midPos: new THREE.Vector3(),
      toPos: new THREE.Vector3(),
      fromT: new THREE.Vector3(),
      toT: new THREE.Vector3(),
    }
    const easeCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const home = { pos: new THREE.Vector3(), target: new THREE.Vector3(), saved: false }
    const flyDir = new THREE.Vector3()
    const flySide = new THREE.Vector3()

    function flyToPose(toPos: THREE.Vector3, toTarget: THREE.Vector3, dur: number) {
      tween.active = true
      tween.t = 0
      tween.dur = reducedMotion ? 0.001 : dur
      tween.fromPos.copy(camera.position)
      tween.fromT.copy(controls.target)
      tween.toPos.copy(toPos)
      tween.toT.copy(toTarget)
      const travel = tween.fromPos.distanceTo(tween.toPos)
      flyDir.copy(tween.toPos).sub(tween.fromPos).normalize()
      flySide.crossVectors(flyDir, camera.up)
      if (flySide.lengthSq() < 1e-6) flySide.set(1, 0, 0)
      else flySide.normalize()
      tween.midPos
        .lerpVectors(tween.fromPos, tween.toPos, 0.5)
        .addScaledVector(camera.up, Math.min(travel * 0.14, 130))
        .addScaledVector(flySide, Math.min(travel * 0.1, 90))
      controls.enabled = false
      controls.autoRotate = false
    }

    function setFocus(node: SceneNode) {
      if (!focused) {
        home.pos.copy(camera.position)
        home.target.copy(controls.target)
        home.saved = true
      }
      focused = node
      const nbrs = neighbourSets.get(node.id)!
      nodes.forEach((n, i) => {
        pDim[i] = nbrs.has(n.id) ? 1 : GREYOUT
      })
      pGeo.attributes.aDim.needsUpdate = true
      const targetWorld = tmpA.copy(node.pos).applyMatrix4(group.matrixWorld)
      flyDir.copy(camera.position).sub(targetWorld).normalize()
      const endDist = node.role === 'portfolio' ? 300 : 240
      flyToPose(tmpB.copy(targetWorld).addScaledVector(flyDir, endDist).addScaledVector(camera.up, 24), targetWorld.clone(), 1.25)
      onSelect?.(node.real ? node.id : null)
    }

    function clearFocus() {
      const wasFocused = focused
      focused = null
      pDim.fill(1)
      pGeo.attributes.aDim.needsUpdate = true
      onSelect?.(null)
      if (wasFocused && home.saved) {
        home.saved = false
        flyToPose(home.pos, home.target, 1.0)
      } else {
        controls.autoRotate = !reducedMotion
      }
    }

    let pulseTimer = 0
    apiRef.current = {
      focusNode: (id) => {
        const n = byId.get(id)
        if (n) setFocus(n)
      },
      clearFocus,
      pulseNodes: (ids) => {
        const idx = new Set(ids)
        nodes.forEach((n, i) => {
          if (idx.has(n.id)) pPulse[i] = 2.2
        })
        pGeo.attributes.aPulse.needsUpdate = true
        clearTimeout(pulseTimer)
        pulseTimer = window.setTimeout(() => {
          nodes.forEach((n, i) => {
            pPulse[i] = n.role === 'sourced' ? 1 : 0
          })
          pGeo.attributes.aPulse.needsUpdate = true
        }, 4200)
      },
    }

    /* ---------------- animate (ported) ---------------- */

    const clock = new THREE.Clock()
    let raf = 0

    function animate() {
      raf = requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.05)
      const time = clock.elapsedTime
      const motion = reducedMotion ? 0 : 1

      for (const n of nodes) {
        n.vel.addScaledVector(n.offset, -0.6 * dt)
        n.vel.multiplyScalar(1 - 0.12 * dt)
        n.offset.addScaledVector(n.vel, dt * motion)
        n.pos.copy(n.base).add(n.offset)
      }
      nodes.forEach((n, i) => {
        pPos[i * 3] = n.pos.x
        pPos[i * 3 + 1] = n.pos.y
        pPos[i * 3 + 2] = n.pos.z
      })
      pGeo.attributes.position.needsUpdate = true
      pMat.uniforms.uTime.value = time

      for (let i = 0; i < E; i++) {
        const e = edges[i]
        const a = e.a.pos
        const b = e.b.pos
        lPos[i * 6] = a.x
        lPos[i * 6 + 1] = a.y
        lPos[i * 6 + 2] = a.z
        lPos[i * 6 + 3] = b.x
        lPos[i * 6 + 4] = b.y
        lPos[i * 6 + 5] = b.z
        const len = a.distanceTo(b)
        const fade = 1 - THREE.MathUtils.smoothstep(len, LINK_FADE_NEAR, LINK_FADE_FAR) * (1 - LINK_MIN_TRANSPARENCY)
        const breathe = 0.9 + 0.1 * Math.sin(time * 0.7 + e.phase) * motion
        let alpha = 0.55 * fade * breathe * e.weight
        if (focused) {
          const on = e.a === focused || e.b === focused
          alpha *= on ? 1.6 : 0.06
        }
        const ca = roleColor(e.a)
        const cb = roleColor(e.b)
        lCol[i * 6] = ca.r * alpha
        lCol[i * 6 + 1] = ca.g * alpha
        lCol[i * 6 + 2] = ca.b * alpha
        lCol[i * 6 + 3] = cb.r * alpha
        lCol[i * 6 + 4] = cb.g * alpha
        lCol[i * 6 + 5] = cb.b * alpha
      }
      lGeo.attributes.position.needsUpdate = true
      lGeo.attributes.color.needsUpdate = true

      let seg = 0
      if (!focused) {
        outer: for (let i = 0; i < N; i++) {
          const a = nodes[i]
          for (let j = i + 1; j < N; j++) {
            const b = nodes[j]
            const dx = a.pos.x - b.pos.x
            const dy = a.pos.y - b.pos.y
            const dz = a.pos.z - b.pos.z
            const d2 = dx * dx + dy * dy + dz * dz
            if (d2 > SYN_DIST * SYN_DIST) continue
            const alpha = (1 - Math.sqrt(d2) / SYN_DIST) * 0.1
            sPos[seg * 6] = a.pos.x
            sPos[seg * 6 + 1] = a.pos.y
            sPos[seg * 6 + 2] = a.pos.z
            sPos[seg * 6 + 3] = b.pos.x
            sPos[seg * 6 + 4] = b.pos.y
            sPos[seg * 6 + 5] = b.pos.z
            for (const off of [0, 3]) {
              sCol[seg * 6 + off] = synTint.r * alpha
              sCol[seg * 6 + off + 1] = synTint.g * alpha
              sCol[seg * 6 + off + 2] = synTint.b * alpha
            }
            if (++seg >= SYN_MAX) break outer
          }
        }
      }
      sGeo.setDrawRange(0, seg * 2)
      sGeo.attributes.position.needsUpdate = true
      sGeo.attributes.color.needsUpdate = true

      if (!focused && !tween.active) group.rotation.y += dt * 0.02 * motion

      if (tween.active) {
        tween.t = Math.min(tween.t + dt / tween.dur, 1)
        const e = easeCubic(tween.t)
        tmpA.lerpVectors(tween.fromPos, tween.midPos, e)
        tmpB.lerpVectors(tween.midPos, tween.toPos, e)
        camera.position.lerpVectors(tmpA, tmpB, e)
        controls.target.lerpVectors(tween.fromT, tween.toT, e)
        if (tween.t >= 1) {
          tween.active = false
          controls.enabled = true
          controls.autoRotate = !reducedMotion && !focused
        }
      } else if (focused) {
        controls.target.copy(tmpA.copy(focused.pos).applyMatrix4(group.matrixWorld))
      }

      for (const sp of labelSprites) {
        tmpA.setFromMatrixPosition(sp.matrixWorld)
        sp.material.opacity = 0.7 * THREE.MathUtils.smoothstep(camera.position.distanceTo(tmpA), 260, 620)
      }

      controls.update()
      updateHover()
      renderer.render(scene, camera)
    }

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    animate()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(pulseTimer)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [graph, onSelect])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div
        ref={tooltipRef}
        className="pointer-events-none absolute z-10 hidden rounded-card border border-hairline bg-card/90 px-3 py-2"
      />
    </div>
  )
})
