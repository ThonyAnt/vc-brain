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

/* Final mockup palette (light mode): mid-tone sector colors that read on
   white; one blue accent reserved for sourced candidates + focus states. */
export const SECTOR_PALETTE = ['#bd66a8', '#4f9ec4', '#7d6bc9', '#c08a3e', '#4faa74', '#c96666']
export const ACCENT = '#266df0' // Attio blue-500: candidates, hover ring, focus, fit bar
export const REJECTED_COLOR = '#b9bec8'
const SHOW_LINES = false // resting-state edges + shimmer; focused node's edges still show

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

    /* uniform node radius multiplier. Priority: ?scale= param, then your last
       [ ] tuning (saved per browser), then the baked-in default. */
    const NODE_SCALE =
      parseFloat(new URLSearchParams(location.search).get('scale') ?? '') ||
      parseFloat(localStorage.getItem('vcbrain-node-scale') ?? '') ||
      2.0

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
    controls.autoRotate = false // the graph holds still unless the user moves it

    const group = new THREE.Group()
    scene.add(group)

    /* raw shaders skip three's colorspace chunk, so feed sRGB components directly
       to make on-screen colors match the chosen hexes exactly */
    const srgb = (hex: string) => new THREE.Color(hex).convertLinearToSRGB()
    const sectorColors = SECTOR_PALETTE.map((c) => srgb(c))
    const accentColor = srgb(ACCENT)
    const rejectedColor = srgb(REJECTED_COLOR)
    const portfolioColors = sectorColors.map((c) => c.clone().multiplyScalar(0.82)) // deeper + ring
    const nodeColor = (n: SceneNode): THREE.Color => {
      if (n.role === 'sourced') return accentColor
      if (n.role === 'portfolio') return portfolioColors[n.cluster % portfolioColors.length]
      if (n.role === 'rejected') return rejectedColor
      return sectorColors[n.cluster % sectorColors.length]
    }
    const roleSize = (n: SceneNode) =>
      n.role === 'portfolio' ? 23 : n.role === 'sourced' ? 18 : n.role === 'founder' ? 10 : n.role === 'rejected' ? 8 : 11

    const pPos = new Float32Array(N * 3)
    const pCol = new Float32Array(N * 3)
    const pSize = new Float32Array(N)
    const pPulse = new Float32Array(N)
    const pPhase = new Float32Array(N)
    const pDim = new Float32Array(N).fill(1)
    const pOutline = new Float32Array(N)

    nodes.forEach((n, i) => {
      const c = nodeColor(n)
      pCol[i * 3] = c.r
      pCol[i * 3 + 1] = c.g
      pCol[i * 3 + 2] = c.b
      pSize[i] = roleSize(n)
      pPulse[i] = n.role === 'sourced' ? 1 : 0
      pPhase[i] = n.phase
      pOutline[i] = n.role === 'portfolio' ? 1 : 0
    })

    /* intro: camera swoop from distance + staggered node reveal on every mount,
       clusters lighting up one after another */
    const intro = { active: !reducedMotion, start: -1 }
    const revealAt = new Float32Array(N)
    nodes.forEach((n, i) => {
      revealAt[i] = 0.08 + n.cluster * 0.05 + ((hash(n.id + 'reveal') % 997) / 997) * 0.18
    })
    if (intro.active) {
      pDim.fill(0)
      camera.position.set(0, 700, 3050)
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3).setUsage(THREE.DynamicDrawUsage))
    pGeo.setAttribute('aColor', new THREE.BufferAttribute(pCol, 3))
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1))
    pGeo.setAttribute('aPulse', new THREE.BufferAttribute(pPulse, 1).setUsage(THREE.DynamicDrawUsage))
    pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1))
    pGeo.setAttribute('aDim', new THREE.BufferAttribute(pDim, 1).setUsage(THREE.DynamicDrawUsage))
    pGeo.setAttribute('aOutline', new THREE.BufferAttribute(pOutline, 1))

    const pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMotion: { value: reducedMotion ? 0 : 1 },
        uScale: { value: NODE_SCALE },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aSize, aPulse, aPhase, aDim, aOutline;
        uniform float uTime, uMotion, uScale;
        varying vec3 vColor;
        varying float vDim, vOutline;
        void main() {
          vColor = aColor;
          vDim = aDim;
          vOutline = aOutline;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float pulse = 1.0 + aPulse * uMotion * 0.22 * sin(uTime * 2.2 + aPhase);
          gl_PointSize = clamp(aSize * uScale * pulse * (620.0 / -mv.z), 2.0, 52.0 * max(uScale, 1.0));
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
    const lCol = new Float32Array(E * 8) // RGBA per vertex: real alpha works on light bg
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage))
    lGeo.setAttribute('aRGBA', new THREE.BufferAttribute(lCol, 4).setUsage(THREE.DynamicDrawUsage))
    const lMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        attribute vec4 aRGBA;
        varying vec4 vRGBA;
        void main() {
          vRGBA = aRGBA;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying vec4 vRGBA;
        void main() { gl_FragColor = vRGBA; }`,
    })
    const links = new THREE.LineSegments(lGeo, lMat)
    links.renderOrder = 1
    group.add(links)

    const SYN_DIST = 105
    const SYN_MAX = 900
    const sPos = new Float32Array(SYN_MAX * 6)
    const sCol = new Float32Array(SYN_MAX * 8)
    const sGeo = new THREE.BufferGeometry()
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3).setUsage(THREE.DynamicDrawUsage))
    sGeo.setAttribute('aRGBA', new THREE.BufferAttribute(sCol, 4).setUsage(THREE.DynamicDrawUsage))
    sGeo.setDrawRange(0, 0)
    const synapse = new THREE.LineSegments(sGeo, lMat.clone())
    synapse.renderOrder = 1
    group.add(synapse)
    const synTint = srgb('#5c6f9e')

    function ringTexture() {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const g = c.getContext('2d')!
      g.strokeStyle = 'rgba(38,109,240,0.95)' /* accent */
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
    function labelSprite(text: string, colorHex: string) {
      const c = document.createElement('canvas')
      c.width = 1024
      c.height = 192
      const g = c.getContext('2d')!
      /* neobrutal cartography label: Space Mono 700, tracked uppercase */
      g.font = "700 60px 'Space Mono', monospace"
      if ('letterSpacing' in g) (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '16px'
      g.textBaseline = 'middle'
      const label = text.toUpperCase()
      const tickW = 12
      const gap = 26
      const textW = g.measureText(label).width
      const x0 = (c.width - (tickW + gap + textW)) / 2
      g.fillStyle = colorHex
      g.fillRect(x0, 96 - 26, tickW, 52)
      g.fillStyle = 'rgba(0, 0, 0, 0.92)'
      g.fillText(label, x0 + tickW + gap, 96)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, opacity: 0.6, depthWrite: false }))
      sp.scale.set(150, 28.1, 1)
      return sp
    }
    const labelSprites: THREE.Sprite[] = []
    markets.forEach((m, i) => {
      const sp = labelSprite(m.label, SECTOR_PALETTE[i % SECTOR_PALETTE.length])
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

    /* live node-size tuning: [ shrinks, ] grows — saved as the per-browser default */
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '[' && e.key !== ']') return
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      const u = pMat.uniforms.uScale
      u.value = Math.min(3, Math.max(0.4, (u.value as number) * (e.key === ']' ? 1.1 : 1 / 1.1)))
      localStorage.setItem('vcbrain-node-scale', (u.value as number).toFixed(2))
    }
    window.addEventListener('keydown', onKeyDown)

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
        const color = hovered.role === 'sourced' ? ACCENT : SECTOR_PALETTE[hovered.cluster % SECTOR_PALETTE.length]
        tooltip.innerHTML = `<div style="color:#000000;font-size:13px;font-weight:700">${hovered.label}</div>
          <div style="color:${color};margin-top:2px;font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase">${markets[hovered.cluster]?.label ?? ''} · ${ROLE_TAG[hovered.role]}${hovered.score ? ` · fit ${hovered.score}` : ''}</div>`
        ringWorld.copy(hovered.pos).applyMatrix4(group.matrixWorld)
        ring.position.copy(ringWorld)
        const sz = (hovered.role === 'portfolio' ? 15 : 10) * 3.4 * (pMat.uniforms.uScale.value as number)
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
    }

    function setFocus(node: SceneNode) {
      if (intro.active) {
        intro.active = false
        pDim.fill(1)
      }
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

      /* staggered reveal while the intro plays */
      if (intro.active && !focused) {
        if (intro.start < 0) intro.start = time
        const t = time - intro.start
        let done = true
        for (let i = 0; i < N; i++) {
          const p = Math.min(Math.max((t - revealAt[i]) / 0.25, 0), 1)
          pDim[i] = p * p * (3 - 2 * p)
          if (p < 1) done = false
        }
        pGeo.attributes.aDim.needsUpdate = true
        if (done && !tween.active) intro.active = false
      }

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
        let alpha = SHOW_LINES ? 0.32 * fade * breathe * e.weight : 0
        if (focused) {
          const on = e.a === focused || e.b === focused
          alpha = on ? 0.55 * fade * breathe * e.weight : alpha * 0.05
        }
        alpha = Math.min(alpha, 0.85)
        const ca = nodeColor(e.a)
        const cb = nodeColor(e.b)
        lCol[i * 8] = ca.r
        lCol[i * 8 + 1] = ca.g
        lCol[i * 8 + 2] = ca.b
        lCol[i * 8 + 3] = alpha
        lCol[i * 8 + 4] = cb.r
        lCol[i * 8 + 5] = cb.g
        lCol[i * 8 + 6] = cb.b
        lCol[i * 8 + 7] = alpha
      }
      lGeo.attributes.position.needsUpdate = true
      lGeo.attributes.aRGBA.needsUpdate = true

      let seg = 0
      if (SHOW_LINES && !focused) {
        outer: for (let i = 0; i < N; i++) {
          const a = nodes[i]
          for (let j = i + 1; j < N; j++) {
            const b = nodes[j]
            const dx = a.pos.x - b.pos.x
            const dy = a.pos.y - b.pos.y
            const dz = a.pos.z - b.pos.z
            const d2 = dx * dx + dy * dy + dz * dz
            if (d2 > SYN_DIST * SYN_DIST) continue
            const alpha = (1 - Math.sqrt(d2) / SYN_DIST) * 0.09
            sPos[seg * 6] = a.pos.x
            sPos[seg * 6 + 1] = a.pos.y
            sPos[seg * 6 + 2] = a.pos.z
            sPos[seg * 6 + 3] = b.pos.x
            sPos[seg * 6 + 4] = b.pos.y
            sPos[seg * 6 + 5] = b.pos.z
            for (const off of [0, 4]) {
              sCol[seg * 8 + off] = synTint.r
              sCol[seg * 8 + off + 1] = synTint.g
              sCol[seg * 8 + off + 2] = synTint.b
              sCol[seg * 8 + off + 3] = alpha
            }
            if (++seg >= SYN_MAX) break outer
          }
        }
      }
      sGeo.setDrawRange(0, seg * 2)
      sGeo.attributes.position.needsUpdate = true
      sGeo.attributes.aRGBA.needsUpdate = true

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

    if (intro.active) {
      flyToPose(new THREE.Vector3(0, 170, 1180), new THREE.Vector3(0, 0, 0), 0.8)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(pulseTimer)
      ro.disconnect()
      window.removeEventListener('keydown', onKeyDown)
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
        className="pointer-events-none absolute z-10 hidden rounded-none border-2 border-hairline-strong bg-white px-3 py-2 shadow-brutal-sm"
      />
    </div>
  )
})
