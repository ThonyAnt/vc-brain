import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/*
 * Ambient flow-field particle layer, theme-adapted from a community shadcn
 * component. Differences from the source that matter here: trails fade via
 * destination-out compositing so the page background shows through (the
 * original painted solid black), the particle color resolves from a theme
 * token at mount so light/dark both work, the layer is pointer-events-none
 * with mouse repulsion read off the window, and prefers-reduced-motion
 * renders nothing. Sit it inside a `relative` container, content above it.
 */

interface FlowFieldBackgroundProps {
  className?: string
  /** CSS custom property to read the particle color from. Default: --primary. */
  colorVar?: string
  /** Trail fade per frame (0–1). Lower = longer trails. Default: 0.08 */
  trailOpacity?: number
  /** Default: 350 — enough texture without stealing focus from the content. */
  particleCount?: number
  speed?: number
}

export function FlowFieldBackground({
  className,
  colorVar = '--primary',
  trailOpacity = 0.08,
  particleCount = 350,
  speed = 0.8,
}: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const color =
      getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim() || '#ff3333'

    let width = container.clientWidth
    let height = container.clientHeight
    let animationFrameId: number
    const mouse = { x: -1000, y: -1000 }

    class Particle {
      x = Math.random() * width
      y = Math.random() * height
      vx = 0
      vy = 0
      age = 0
      life = Math.random() * 200 + 100

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI
        this.vx += Math.cos(angle) * 0.2 * speed
        this.vy += Math.sin(angle) * 0.2 * speed

        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const interactionRadius = 150
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius
          this.vx -= dx * force * 0.05
          this.vy -= dy * force * 0.05
        }

        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.95
        this.vy *= 0.95

        if (++this.age > this.life) this.reset()
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color
        context.globalAlpha = 1 - Math.abs(this.age / this.life - 0.5) * 2
        context.fillRect(this.x, this.y, 1.5, 1.5)
      }
    }

    let particles: Particle[] = []

    const init = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      // setTransform, not scale — scale() compounds across resizes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      particles = Array.from({ length: particleCount }, () => new Particle())
    }

    const animate = () => {
      // Erase a fraction of what's drawn instead of painting a background:
      // trails fade to transparent and the page shows through.
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = 1
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      for (const p of particles) {
        p.update()
        p.draw(ctx)
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      init()
    }
    // The layer is pointer-events-none, so repulsion reads the window.
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    init()
    animate()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colorVar, trailOpacity, particleCount, speed])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
