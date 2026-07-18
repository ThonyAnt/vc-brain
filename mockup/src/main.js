// VC Brain — visual mockup. Fuses two references:
//  - cosmos (cosmograph): palette-per-cluster points, additive links that fade with
//    length (linkVisibilityDistanceRange 50–150 / minTransparency 0.25), greyout at
//    0.1 on focus, white hover ring at 0.7 opacity, 800ms cubic-in-out transitions.
//  - three.js webgl_buffergeometry_drawrange: drifting particles, ephemeral lines
//    between nearby pairs with alpha = 1 - d/minDistance, additive blending, slow
//    group rotation.
// No backend: 200 seeded fake companies.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// ---------------------------------------------------------------- rng / data

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260718);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

const SECTORS = [
  { name: 'AI Infra',   color: '#ff4fd8', desc: 'training + inference plumbing' },
  { name: 'Fintech',    color: '#4fd6ff', desc: 'money movement and risk' },
  { name: 'Healthcare', color: '#9d6bff', desc: 'care delivery and clinical ops' },
  { name: 'Climate',    color: '#5fff9d', desc: 'energy, grid and industrial decarb' },
  { name: 'DevTools',   color: '#ffb347', desc: 'software that builds software' },
  { name: 'Consumer',   color: '#ff6b6b', desc: 'products people choose themselves' },
];
// which sectors plausibly trade companies between them (cross-links)
const SECTOR_ADJ = [[0, 4], [0, 1], [0, 2], [1, 5], [3, 1], [2, 3], [4, 1], [5, 4]];

const PREFIX = ['Lumen', 'Vanta', 'Arc', 'Helio', 'Nimbus', 'Fathom', 'Quill', 'Ember', 'Atlas', 'Vertex',
  'Sable', 'Orin', 'Pluma', 'Cobalt', 'Drift', 'Fern', 'Halcyon', 'Iris', 'Juniper', 'Kite',
  'Loam', 'Mica', 'Nectar', 'Onyx', 'Prism', 'Rill', 'Signal', 'Tessel', 'Umbra', 'Verdant',
  'Willow', 'Zephyr', 'Basalt', 'Crux', 'Echo', 'Flux', 'Grove', 'Harbor', 'Alder', 'Sorrel'];
const SUFFIX = {
  0: ['Compute', 'AI', 'Labs', 'Stack', 'Mind', 'Tensor'],
  1: ['Pay', 'Finance', 'Ledger', 'Capital', 'Rails', 'Risk'],
  2: ['Health', 'Bio', 'Care', 'Clinic', 'Genomics', 'Rx'],
  3: ['Energy', 'Grid', 'Carbon', 'Volt', 'Thermal', 'Hydro'],
  4: ['Dev', 'Ops', 'Forge', 'Build', 'Deploy', 'Test'],
  5: ['App', 'Social', 'Shop', 'Play', 'Home', 'Go'],
};
const STAGES = ['Pre-seed', 'Seed', 'Seed', 'Series A'];

const N = 200;
const N_PORTFOLIO = 12;
const N_REJECTED = 47;
const N_CANDIDATES = 3;

const usedNames = new Set();
function makeName(sector) {
  for (;;) {
    const n = pick(PREFIX) + (rand() < 0.35 ? '' : ' ') + pick(SUFFIX[sector]);
    if (!usedNames.has(n)) { usedNames.add(n); return n; }
  }
}

// cluster anchors: fibonacci sphere, so the mass reads volumetric from any angle
const anchors = SECTORS.map((s, i) => {
  const phi = Math.acos(1 - 2 * (i + 0.5) / SECTORS.length);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const r = 330;
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * r,
    Math.cos(phi) * r * 0.72,
    Math.sin(phi) * Math.sin(theta) * r
  );
});

const nodes = [];
for (let i = 0; i < N; i++) {
  const sector = i % SECTORS.length;
  const anchor = anchors[sector];
  const spread = 130;
  const base = new THREE.Vector3(
    anchor.x + (rand() + rand() - 1) * spread,
    anchor.y + (rand() + rand() - 1) * spread * 0.7,
    anchor.z + (rand() + rand() - 1) * spread
  );
  nodes.push({
    id: i, sector,
    name: makeName(sector),
    role: 'tracked',
    stage: pick(STAGES),
    fit: 0.45 + rand() * 0.5,
    base,
    offset: new THREE.Vector3(),
    vel: new THREE.Vector3((rand() - 0.5) * 6, (rand() - 0.5) * 6, (rand() - 0.5) * 6),
    pos: base.clone(),
    phase: rand() * Math.PI * 2,
  });
}
// roles: portfolio brightest, rejected dimmest, candidates pulse
const shuffled = [...nodes].sort(() => rand() - 0.5);
shuffled.slice(0, N_PORTFOLIO).forEach((n) => { n.role = 'portfolio'; n.fit = 0.8 + rand() * 0.18; });
shuffled.slice(N_PORTFOLIO, N_PORTFOLIO + N_REJECTED).forEach((n) => { n.role = 'rejected'; });
shuffled.slice(N_PORTFOLIO + N_REJECTED, N_PORTFOLIO + N_REJECTED + N_CANDIDATES)
  .forEach((n) => { n.role = 'candidate'; n.fit = 0.72 + rand() * 0.2; n.stage = 'Seed'; });

function nearest(node, filterFn) {
  let best = null; let bestD = Infinity;
  for (const o of nodes) {
    if (o === node || !filterFn(o)) continue;
    const d = o.base.distanceToSquared(node.base);
    if (d < bestD) { bestD = d; best = o; }
  }
  return best;
}

// static edges: 2 nearest same-sector neighbours + sector adjacency cross-links
const edgeKeys = new Set();
const edges = [];
function addEdge(a, b, weight = 1) {
  const key = Math.min(a.id, b.id) + '-' + Math.max(a.id, b.id);
  if (edgeKeys.has(key)) return;
  edgeKeys.add(key);
  edges.push({ a, b, weight, phase: rand() * Math.PI * 2 });
}
for (const n of nodes) {
  const sameSector = nodes.filter((o) => o !== n && o.sector === n.sector);
  sameSector.sort((p, q) => p.base.distanceToSquared(n.base) - q.base.distanceToSquared(n.base));
  addEdge(n, sameSector[0]);
  if (rand() < 0.6) addEdge(n, sameSector[1]);
}
for (const [sa, sb] of SECTOR_ADJ) {
  const as = nodes.filter((n) => n.sector === sa);
  const bs = nodes.filter((n) => n.sector === sb);
  for (let k = 0; k < 4; k++) addEdge(pick(as), pick(bs), 0.6);
}
for (const n of nodes) {
  if (n.role !== 'candidate') continue;
  const analogue = nearest(n, (o) => o.role === 'portfolio');
  const rejection = nearest(n, (o) => o.role === 'rejected');
  if (analogue) addEdge(n, analogue, 1.6);
  if (rejection) addEdge(n, rejection, 1.2);
}
const neighbourSets = new Map(nodes.map((n) => [n.id, new Set([n.id])]));
for (const e of edges) {
  neighbourSets.get(e.a.id).add(e.b.id);
  neighbourSets.get(e.b.id).add(e.a.id);
}

// ---------------------------------------------------------------- three setup

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const container = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#04050c'); // cosmograph-dark, not cosmos's #222

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
camera.position.set(0, 170, 1180);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 320;
controls.maxDistance = 3200;
controls.autoRotate = !reducedMotion;
controls.autoRotateSpeed = 0.45;

const group = new THREE.Group();
scene.add(group);

// --- points
const sectorColors = SECTORS.map((s) => new THREE.Color(s.color));
const white = new THREE.Color('#ffffff');

const pPos = new Float32Array(N * 3);
const pCol = new Float32Array(N * 3);
const pSize = new Float32Array(N);
const pPulse = new Float32Array(N);
const pPhase = new Float32Array(N);
const pDim = new Float32Array(N).fill(1);

function nodeColor(n) {
  const c = sectorColors[n.sector].clone();
  if (n.role === 'rejected') c.multiplyScalar(0.32);
  if (n.role === 'tracked') c.multiplyScalar(0.72);
  if (n.role === 'portfolio') c.lerp(white, 0.12);
  if (n.role === 'candidate') c.lerp(white, 0.35);
  return c;
}
nodes.forEach((n, i) => {
  const c = nodeColor(n);
  pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
  pSize[i] = n.role === 'portfolio' ? 19 : n.role === 'candidate' ? 15 : n.role === 'rejected' ? 6.5 : 8.5;
  pPulse[i] = n.role === 'candidate' ? 1 : 0;
  pPhase[i] = n.phase;
});

const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3).setUsage(THREE.DynamicDrawUsage));
pGeo.setAttribute('aColor', new THREE.BufferAttribute(pCol, 3));
pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1));
pGeo.setAttribute('aPulse', new THREE.BufferAttribute(pPulse, 1));
pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1));
pGeo.setAttribute('aDim', new THREE.BufferAttribute(pDim, 1).setUsage(THREE.DynamicDrawUsage));

const pMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { uTime: { value: 0 }, uMotion: { value: reducedMotion ? 0 : 1 } },
  vertexShader: /* glsl */`
    attribute vec3 aColor;
    attribute float aSize, aPulse, aPhase, aDim;
    uniform float uTime, uMotion;
    varying vec3 vColor;
    varying float vDim;
    void main() {
      vColor = aColor;
      vDim = aDim;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float pulse = 1.0 + aPulse * uMotion * 0.3 * sin(uTime * 2.2 + aPhase);
      gl_PointSize = clamp(aSize * pulse * (620.0 / -mv.z), 2.0, 72.0);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */`
    varying vec3 vColor;
    varying float vDim;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float edge = smoothstep(0.5, 0.12, d);          // soft disc
      float core = pow(smoothstep(0.32, 0.0, d), 2.0); // hot centre
      vec3 col = (vColor * edge + vColor * core * 0.9 + vec3(core * 0.25)) * vDim;
      gl_FragColor = vec4(col, 1.0);
    }`,
});
const points = new THREE.Points(pGeo, pMat);
group.add(points);

// --- static links (cosmos-style: endpoint-tinted, fade with length, greyout on focus)
const LINK_FADE_NEAR = 55, LINK_FADE_FAR = 240;   // world-unit analogue of [50,150]
const LINK_MIN_TRANSPARENCY = 0.25;               // cosmos linkVisibilityMinTransparency
const GREYOUT = 0.1;                              // cosmos linkGreyoutOpacity
const E = edges.length;
const lPos = new Float32Array(E * 6);
const lCol = new Float32Array(E * 6);
const lGeo = new THREE.BufferGeometry();
lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage));
lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3).setUsage(THREE.DynamicDrawUsage));
const lMat = new THREE.LineBasicMaterial({
  vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
});
const links = new THREE.LineSegments(lGeo, lMat);
group.add(links);

// --- synapse shimmer (drawrange-style ephemeral proximity lines)
const SYN_DIST = 105;             // drawrange minDistance, scaled to our space
const SYN_MAX = 900;
const sPos = new Float32Array(SYN_MAX * 6);
const sCol = new Float32Array(SYN_MAX * 6);
const sGeo = new THREE.BufferGeometry();
sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3).setUsage(THREE.DynamicDrawUsage));
sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3).setUsage(THREE.DynamicDrawUsage));
sGeo.setDrawRange(0, 0);
const synapse = new THREE.LineSegments(sGeo, lMat.clone());
group.add(synapse);
const synTint = new THREE.Color('#8fa8ff');

// --- hover ring (cosmos: white ring, 0.7 opacity)
function ringTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.strokeStyle = 'rgba(255,255,255,0.9)';
  g.lineWidth = 7;
  g.beginPath(); g.arc(64, 64, 52, 0, Math.PI * 2); g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const ring = new THREE.Sprite(new THREE.SpriteMaterial({
  map: ringTexture(), transparent: true, opacity: 0.7, depthWrite: false, depthTest: false,
}));
ring.visible = false;
scene.add(ring);

// --- cluster labels
function labelSprite(text, colorHex) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  g.font = '600 44px system-ui, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = colorHex; g.shadowBlur = 22;
  g.fillStyle = 'rgba(238, 242, 252, 0.92)';
  g.fillText(text.toUpperCase(), 256, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: t, transparent: true, opacity: 0.5, depthWrite: false,
  }));
  sp.scale.set(190, 47.5, 1);
  return sp;
}
SECTORS.forEach((s, i) => {
  const sp = labelSprite(s.name, s.color);
  sp.position.copy(anchors[i]).multiplyScalar(1.28);
  sp.position.y += 120;
  group.add(sp);
});

// --- starfield backdrop
{
  const M = 900;
  const stPos = new Float32Array(M * 3);
  for (let i = 0; i < M; i++) {
    const v = new THREE.Vector3((rand() - 0.5), (rand() - 0.5), (rand() - 0.5)).normalize()
      .multiplyScalar(1900 + rand() * 1400);
    stPos[i * 3] = v.x; stPos[i * 3 + 1] = v.y; stPos[i * 3 + 2] = v.z;
  }
  const stGeo = new THREE.BufferGeometry();
  stGeo.setAttribute('position', new THREE.BufferAttribute(stPos, 3));
  const stMat = new THREE.PointsMaterial({
    color: new THREE.Color('#6f7fb8'), size: 1.6, sizeAttenuation: false,
    transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(stGeo, stMat));
}

// --- bloom
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.65, 0.0
);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// ---------------------------------------------------------------- hud / dom

const legend = document.getElementById('legend');
SECTORS.forEach((s) => {
  const chip = document.createElement('span');
  chip.className = 'chip';
  const dot = document.createElement('i');
  dot.style.background = s.color;
  dot.style.boxShadow = `0 0 6px ${s.color}`;
  chip.appendChild(dot);
  chip.appendChild(document.createTextNode(s.name));
  legend.appendChild(chip);
});
document.getElementById('counts').textContent =
  `${N} companies · ${SECTORS.length} sectors · ${N_PORTFOLIO} portfolio · ${N_REJECTED} rejected · ${N_CANDIDATES} sourced this week`;

const tooltip = document.getElementById('tooltip');
const panel = document.getElementById('panel');
const toast = document.getElementById('toast');
let toastTimer = 0;
function showToast(html) {
  toast.innerHTML = html;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
const BELIEFS = [
  'weighting technical-founder signal <span class="pulse">+0.04</span> in regulated sectors',
  'raising bar on consumer CAC efficiency <span class="pulse">+0.03</span>',
  'pattern stored: passed twice on single-founder infra <span class="pulse">·</span> confidence 0.61',
  'analogue link reinforced with portfolio winner <span class="pulse">+0.05</span>',
];
document.getElementById('btn-pass').addEventListener('click', () => {
  showToast(`brain updated · ${pick(BELIEFS)}`);
  clearFocus();
});
document.getElementById('btn-investigate').addEventListener('click', () => {
  showToast('queued: diligence brief, competitor map, founder outreach draft');
});

// ---------------------------------------------------------------- interaction

let hovered = null;
let focused = null;
const mouse = { x: -1e4, y: -1e4, downX: 0, downY: 0 };
const proj = new THREE.Vector3();

renderer.domElement.addEventListener('pointermove', (e) => {
  mouse.x = e.clientX; mouse.y = e.clientY;
});
renderer.domElement.addEventListener('pointerdown', (e) => {
  mouse.downX = e.clientX; mouse.downY = e.clientY;
});
renderer.domElement.addEventListener('pointerup', (e) => {
  const dx = e.clientX - mouse.downX, dy = e.clientY - mouse.downY;
  if (dx * dx + dy * dy > 25) return; // drag, not click
  if (hovered) setFocus(hovered); else clearFocus();
});

function pickHovered() {
  const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight;
  let best = null, bestD = 18 * 18, bestZ = Infinity;
  for (const n of nodes) {
    proj.copy(n.pos).applyMatrix4(group.matrixWorld).project(camera);
    if (proj.z > 1) continue;
    const sx = (proj.x * 0.5 + 0.5) * w, sy = (-proj.y * 0.5 + 0.5) * h;
    const d = (sx - mouse.x) ** 2 + (sy - mouse.y) ** 2;
    if (d < bestD && proj.z < bestZ + 0.05) { best = n; bestD = d; bestZ = proj.z; }
  }
  return best;
}

const ringWorld = new THREE.Vector3();
function updateHover() {
  hovered = pickHovered();
  if (hovered) {
    tooltip.style.display = 'block';
    tooltip.style.left = `${Math.min(mouse.x + 14, window.innerWidth - 250)}px`;
    tooltip.style.top = `${mouse.y + 14}px`;
    const s = SECTORS[hovered.sector];
    const roleTag = { portfolio: 'portfolio', rejected: 'rejected 2024', candidate: 'sourced this week', tracked: 'tracked' }[hovered.role];
    tooltip.innerHTML = `<div class="t-name">${hovered.name}</div>
      <div class="t-meta" style="color:${s.color}">${s.name} · ${roleTag}</div>`;
    ringWorld.copy(hovered.pos).applyMatrix4(group.matrixWorld);
    ring.position.copy(ringWorld);
    const sz = (hovered.role === 'portfolio' ? 15 : 10) * 3.4;
    ring.scale.set(sz, sz, 1);
    ring.visible = true;
    renderer.domElement.style.cursor = 'pointer';
  } else {
    tooltip.style.display = 'none';
    ring.visible = false;
    renderer.domElement.style.cursor = 'default';
  }
}

// camera tween: cosmos transitionDuration 800ms, cubic in/out
const tween = { active: false, t: 0, fromT: new THREE.Vector3(), toT: new THREE.Vector3() };
const easeCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function setFocus(node) {
  focused = node;
  const nbrs = neighbourSets.get(node.id);
  nodes.forEach((n, i) => { pDim[i] = nbrs.has(n.id) ? 1 : GREYOUT; });
  pGeo.attributes.aDim.needsUpdate = true;
  tween.active = true; tween.t = 0;
  tween.fromT.copy(controls.target);
  tween.toT.copy(node.pos).applyMatrix4(group.matrixWorld);
  controls.autoRotate = false;

  const s = SECTORS[node.sector];
  document.getElementById('p-name').textContent = node.name;
  const sec = document.getElementById('p-sector');
  sec.textContent = `${s.name} · ${node.role === 'candidate' ? 'sourced this week' : node.role}`;
  sec.style.color = s.color;
  document.getElementById('p-desc').textContent =
    `${s.desc[0].toUpperCase() + s.desc.slice(1)}. Placeholder profile — every number on this card is fake.`;
  document.getElementById('p-stage').textContent = `${node.stage} · $${(1 + Math.floor(node.fit * 9))}M`;
  const analogue = nearest(node, (o) => o.role === 'portfolio');
  const rejection = nearest(node, (o) => o.role === 'rejected');
  document.getElementById('p-analogue').textContent = analogue ? `${analogue.name} · ${(0.7 + node.fit * 0.25).toFixed(2)}` : '—';
  document.getElementById('p-rejection').textContent = rejection ? `${rejection.name} · ${(0.5 + node.fit * 0.3).toFixed(2)}` : '—';
  const fitPct = Math.round(node.fit * 100);
  const bar = document.getElementById('p-fitbar');
  bar.style.width = `${fitPct}%`;
  bar.style.background = s.color;
  bar.style.boxShadow = `0 0 8px ${s.color}`;
  document.getElementById('p-fit').textContent = `${fitPct} / 100`;
  panel.classList.add('open');
}
function clearFocus() {
  focused = null;
  pDim.fill(1);
  pGeo.attributes.aDim.needsUpdate = true;
  panel.classList.remove('open');
  controls.autoRotate = !reducedMotion;
}

// ---------------------------------------------------------------- animate

const clock = new THREE.Clock();
const tmpA = new THREE.Vector3();

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const time = clock.elapsedTime;
  const motion = reducedMotion ? 0 : 1;

  // drift with soft spring back to base (drawrange float, but clustered)
  for (const n of nodes) {
    n.vel.addScaledVector(n.offset, -0.6 * dt);
    n.vel.multiplyScalar(1 - 0.12 * dt);
    n.offset.addScaledVector(n.vel, dt * motion);
    n.pos.copy(n.base).add(n.offset);
  }
  nodes.forEach((n, i) => {
    pPos[i * 3] = n.pos.x; pPos[i * 3 + 1] = n.pos.y; pPos[i * 3 + 2] = n.pos.z;
  });
  pGeo.attributes.position.needsUpdate = true;
  pMat.uniforms.uTime.value = time;

  // static links
  for (let i = 0; i < E; i++) {
    const e = edges[i];
    const a = e.a.pos, b = e.b.pos;
    lPos[i * 6] = a.x; lPos[i * 6 + 1] = a.y; lPos[i * 6 + 2] = a.z;
    lPos[i * 6 + 3] = b.x; lPos[i * 6 + 4] = b.y; lPos[i * 6 + 5] = b.z;
    const len = a.distanceTo(b);
    const fade = 1 - THREE.MathUtils.smoothstep(len, LINK_FADE_NEAR, LINK_FADE_FAR) * (1 - LINK_MIN_TRANSPARENCY);
    const breathe = 0.8 + 0.2 * Math.sin(time * 0.7 + e.phase) * motion;
    let alpha = 0.38 * fade * breathe * e.weight;
    if (focused) {
      const on = e.a === focused || e.b === focused;
      alpha *= on ? 1.6 : 0.06;
    }
    const ca = nodeColor(e.a), cb = nodeColor(e.b);
    lCol[i * 6] = ca.r * alpha; lCol[i * 6 + 1] = ca.g * alpha; lCol[i * 6 + 2] = ca.b * alpha;
    lCol[i * 6 + 3] = cb.r * alpha; lCol[i * 6 + 4] = cb.g * alpha; lCol[i * 6 + 5] = cb.b * alpha;
  }
  lGeo.attributes.position.needsUpdate = true;
  lGeo.attributes.color.needsUpdate = true;

  // synapse shimmer: ephemeral lines between near pairs (drawrange collision loop)
  let seg = 0;
  if (!focused) {
    outer:
    for (let i = 0; i < N; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < N; j++) {
        const b = nodes[j];
        const dx = a.pos.x - b.pos.x, dy = a.pos.y - b.pos.y, dz = a.pos.z - b.pos.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > SYN_DIST * SYN_DIST) continue;
        const alpha = (1 - Math.sqrt(d2) / SYN_DIST) * 0.16;
        sPos[seg * 6] = a.pos.x; sPos[seg * 6 + 1] = a.pos.y; sPos[seg * 6 + 2] = a.pos.z;
        sPos[seg * 6 + 3] = b.pos.x; sPos[seg * 6 + 4] = b.pos.y; sPos[seg * 6 + 5] = b.pos.z;
        for (const off of [0, 3]) {
          sCol[seg * 6 + off] = synTint.r * alpha;
          sCol[seg * 6 + off + 1] = synTint.g * alpha;
          sCol[seg * 6 + off + 2] = synTint.b * alpha;
        }
        if (++seg >= SYN_MAX) break outer;
      }
    }
  }
  sGeo.setDrawRange(0, seg * 2);
  sGeo.attributes.position.needsUpdate = true;
  sGeo.attributes.color.needsUpdate = true;

  // slow rotation of the whole brain (drawrange group.rotation), gentler
  group.rotation.y += dt * 0.02 * motion;

  if (tween.active) {
    tween.t = Math.min(tween.t + dt / 0.8, 1);
    controls.target.lerpVectors(tween.fromT, tween.toT, easeCubic(tween.t));
    if (tween.t >= 1) tween.active = false;
  } else if (focused) {
    controls.target.copy(tmpA.copy(focused.pos).applyMatrix4(group.matrixWorld));
  }

  controls.update();
  updateHover();
  composer.render();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

animate();
