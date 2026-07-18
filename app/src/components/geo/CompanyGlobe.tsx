import { useCallback, useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import type { LatLng } from '../../lib/geo'

/**
 * Cobe v2 globe matching the pasted GlobeInteractive reference: light dotted
 * sphere (dark 0, diffuse 1.5, mapBrightness 10), white base, warm glow, navy
 * markers, 0.003 auto-spin, grab-drag with momentum offsets, circular canvas
 * with 1.2s fade-in, and anchor-positioned label chips that fade/blur behind
 * the horizon. Props are unchanged — this stays the inbox integration boundary.
 */
export interface GlobeMarker extends LatLng {
  label?: string
  city?: string
  kind?: 'hq' | 'company'
}

const DEG = Math.PI / 180
const BASE_THETA = 0.2
const SPEED = 0.003

/* cobe centers longitude L when phi = π - (L·π/180 - π/2) */
const phiForLng = (lng: number) => Math.PI - (lng * DEG - Math.PI / 2)
const wrapAngle = (a: number) => ((((a + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export function CompanyGlobe({
  markers,
  focus,
  className,
}: {
  markers: GlobeMarker[]
  focus?: LatLng | null
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const focusRef = useRef<LatLng | null>(null)
  focusRef.current = focus ?? null
  const [expanded, setExpanded] = useState<string | null>(null)

  /* one chip per city — per-company chips pile up on the small globe */
  const groups: { lat: number; lng: number; city: string; hq: boolean; names: string[] }[] = []
  for (const m of markers) {
    const g = groups.find((g) => Math.abs(g.lat - m.lat) < 1e-6 && Math.abs(g.lng - m.lng) < 1e-6)
    if (g) {
      g.hq ||= m.kind === 'hq'
      if (m.label) g.names.push(m.label)
      if (!g.city && m.city) g.city = m.city
    } else {
      groups.push({
        lat: m.lat,
        lng: m.lng,
        city: m.city ?? '',
        hq: m.kind === 'hq',
        names: m.label ? [m.label] : [],
      })
    }
  }
  const items = groups.map((g, i) => ({
    ...g,
    id: `${slug(g.city || g.names[0] || 'hq')}-${i}`,
    name: g.hq ? 'HQ' : g.city || g.names[0] || '',
  }))
  const markersKey = JSON.stringify(items)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const parsed: { lat: number; lng: number; id: string }[] = JSON.parse(markersKey)
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId = 0
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0) return
      if (globe) return // already initialized

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: BASE_THETA,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.2, 0.45],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: parsed.map((m) => ({ location: [m.lat, m.lng] as [number, number], size: 0.025, id: m.id })),
        arcs: [],
        arcColor: [0.15, 0.3, 0.55],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
      })

      function animate() {
        const f = focusRef.current
        if (f) {
          /* ease toward the hovered city instead of free-spinning */
          const dPhi = wrapAngle(phiForLng(f.lng) - phi - phiOffsetRef.current)
          phiOffsetRef.current += dPhi * 0.08
          const thetaTarget = Math.max(-0.6, Math.min(0.6, f.lat * DEG * 0.5))
          thetaOffsetRef.current += (thetaTarget - BASE_THETA - thetaOffsetRef.current) * 0.08
        } else if (!isPausedRef.current && !reducedMotion) {
          phi += SPEED
        }
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: BASE_THETA + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = '1'))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markersKey])

  return (
    <div className={`relative flex select-none items-center justify-center ${className ?? ''}`}>
      <style>{`
        @keyframes fade-slide-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
      <div className="relative h-full" style={{ aspectRatio: '1 / 1' }}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            opacity: 0,
            transition: 'opacity 1.2s ease',
            borderRadius: '50%',
            touchAction: 'none',
          }}
        />
        {items.map((m) => (
          <div
            key={m.id}
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            style={{
              position: 'absolute',
              positionAnchor: `--cobe-${m.id}`,
              bottom: 'anchor(top)',
              left: 'anchor(center)',
              translate: '-50% 0',
              marginBottom: 6,
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              padding: expanded === m.id ? '0.4rem 0.6rem' : '0.3rem 0.5rem',
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: 3,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: 'opacity 0.4s, filter 0.4s, transform 0.2s, padding 0.2s',
              zoom: expanded === m.id ? 1.05 : 1,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                whiteSpace: 'nowrap',
              }}
            >
              {m.name}
            </span>
            {expanded === m.id && (
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.55rem',
                  opacity: 0.8,
                  marginTop: '0.15rem',
                  animation: 'fade-slide-in 0.2s ease-out',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.hq
                  ? ['Meridian Ventures', ...m.names].join(' · ')
                  : m.names.join(' · ') || 'sourced this week'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
