import { useCallback, useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import type { LatLng } from '../../lib/geo'

/**
 * Sticker globe (GlobeStickers reference): light dotted cobe sphere with
 * die-cut company "logo" stickers anchored to their cities — neobrutal
 * letter-marks (Space Mono monograms, white edge, hard shadow, slight
 * rotations) since the demo companies are fictional and have no real logos.
 * Drag with momentum, 0.003 auto-spin, hover-to-rotate via the focus prop.
 * Props are unchanged — this stays the GlobeCard integration boundary.
 */
export interface GlobeMarker extends LatLng {
  label?: string
  city?: string
  kind?: 'hq' | 'company'
}

const DEG = Math.PI / 180
const BASE_THETA = 0.2
const SPEED = 0.003
const STICKER_ROT = [-8, 6, -4, 10]

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

  /* one sticker per company: monogram letter-mark; HQ gets an inverted MV */
  const items = markers.map((m, i) => ({
    ...m,
    id: `${slug(m.kind === 'hq' ? 'hq' : (m.label ?? 'm'))}-${i}`,
    mark: m.kind === 'hq' ? 'MV' : (m.label ?? '?').slice(0, 1).toUpperCase(),
    title: m.kind === 'hq' ? 'Meridian Ventures (HQ)' : `${m.label ?? ''}${m.city ? ` · ${m.city}` : ''}`,
    rot: STICKER_ROT[i % STICKER_ROT.length],
  }))
  const markersKey = JSON.stringify(items.map((m) => ({ lat: m.lat, lng: m.lng, id: m.id })))

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
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: BASE_THETA,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 8,
        baseColor: [1, 1, 1],
        markerColor: [1, 0.2, 0.2],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: parsed.map((m) => ({ location: [m.lat, m.lng] as [number, number], size: 0.03, id: m.id })),
        arcs: [],
        arcColor: [0.9, 0.4, 0.7],
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
            title={m.title}
            style={{
              position: 'absolute',
              positionAnchor: `--cobe-${m.id}`,
              bottom: 'anchor(top)',
              left: 'anchor(center)',
              translate: '-50% 0',
              marginBottom: 2,
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: m.kind === 'hq' ? '#000000' : '#ffffff',
              color: m.kind === 'hq' ? '#ffffff' : '#000000',
              border: '2px solid #000000',
              /* die-cut sticker edge + hard lift */
              boxShadow: '0 0 0 2px #ffffff, 2px 3px 0px 0px rgba(0,0,0,0.35)',
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: m.kind === 'hq' ? '0.5rem' : '0.7rem',
              lineHeight: 1,
              transform: `rotate(${m.rot}deg)`,
              pointerEvents: 'none' as const,
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              transition: 'opacity 0.2s',
            }}
          >
            {m.mark}
          </div>
        ))}
      </div>
    </div>
  )
}
