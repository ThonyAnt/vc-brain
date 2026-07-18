import { useEffect, useRef } from 'react'

/* Ported from mockup: single bottom-lit gradient surface + faint 28px dot grid
   that follows the mouse slightly (spring parallax, disabled on reduced motion). */
export function DotGridBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parallax = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    let last = performance.now()
    const onMove = (e: MouseEvent) => {
      parallax.tx = -(e.clientX - window.innerWidth / 2) * 0.02
      parallax.ty = -(e.clientY - window.innerHeight / 2) * 0.02
    }
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      parallax.x += (parallax.tx - parallax.x) * Math.min(1, dt * 3)
      parallax.y += (parallax.ty - parallax.y) * Math.min(1, dt * 3)
      el.style.transform = `translate(${parallax.x}px, ${parallax.y}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="brain-bg">
      <div ref={ref} className="brain-bg-parallax" />
    </div>
  )
}
