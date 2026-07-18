import { useEffect, useRef } from 'react'

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

/* Three box-shadow star layers drifting at different speeds, with spring mouse parallax. */
export function StarsBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const rand = mulberry32(20260718)

    for (const [count, size, dur] of [
      [1000, 1, 50],
      [400, 2, 100],
      [200, 3, 150],
    ]) {
      const layer = document.createElement('div')
      layer.className = 'star-layer'
      layer.style.animationDuration = `${dur}s`
      const shadows: string[] = []
      for (let i = 0; i < count; i++) {
        shadows.push(`${Math.floor(rand() * 4000) - 2000}px ${Math.floor(rand() * 4000) - 2000}px #fff`)
      }
      const shadow = shadows.join(', ')
      for (const top of [0, 2000]) {
        const dot = document.createElement('div')
        dot.className = 'star-dot'
        dot.style.cssText = `width:${size}px;height:${size}px;top:${top}px;box-shadow:${shadow}`
        layer.appendChild(dot)
      }
      container.appendChild(layer)
    }

    const parallax = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    let last = performance.now()
    const onMove = (e: MouseEvent) => {
      parallax.tx = -(e.clientX - window.innerWidth / 2) * 0.05
      parallax.ty = -(e.clientY - window.innerHeight / 2) * 0.05
    }
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      parallax.x += (parallax.tx - parallax.x) * Math.min(1, dt * 3)
      parallax.y += (parallax.ty - parallax.y) * Math.min(1, dt * 3)
      container.style.transform = `translate(${parallax.x}px, ${parallax.y}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      container.replaceChildren()
    }
  }, [])

  return <div ref={ref} className="pointer-events-none absolute inset-0 opacity-60" />
}
