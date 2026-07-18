import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * AskNexusInput reference, re-cut for the neobrutal theme: square bar with a
 * 2px black border and hard shadow, DM Sans input, red square submit that
 * inverts to black, black particle dust on submit.
 */
export interface AskInputProps {
  title?: string
  placeholders?: string[]
  placeholderInterval?: number
  defaultValue?: string
  /** Called with the trimmed query the instant the user submits — before the disintegration runs. */
  onSubmit?: (value: string) => void
  className?: string
}

type Phase = 'idle' | 'disintegrating'

const INPUT_FONT_PX = 14
const INPUT_FONT = `${INPUT_FONT_PX}px 'DM Sans', sans-serif`
const PARTICLE_RGB = '0,0,0'

const DEFAULT_PLACEHOLDERS = [
  'Why did Aureline surface this week?',
  'Compare Tessellate to the Corepay memo',
  'What would Marcus think of Solstice Health?',
  'Which passes does the fund regret most?',
  'Draft outreach to the Ledgerline founder',
]

export function AskInput({
  title,
  placeholders = DEFAULT_PLACEHOLDERS,
  placeholderInterval = 2800,
  defaultValue = '',
  onSubmit,
  className,
}: AskInputProps) {
  const [value, setValue] = useState(defaultValue)
  const [phase, setPhase] = useState<Phase>('idle')
  const [snapshot, setSnapshot] = useState('')
  const [phIndex, setPhIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const activePlaceholder = placeholders[phIndex] ?? ''

  useEffect(() => {
    if (phase !== 'idle' || value || placeholders.length <= 1) return
    const id = setInterval(() => setPhIndex((i) => (i + 1) % placeholders.length), placeholderInterval)
    return () => clearInterval(id)
  }, [phase, value, placeholders.length, placeholderInterval])

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (phase !== 'idle') return
    const submitted = value.trim() || activePlaceholder.trim()
    if (!submitted) return
    onSubmit?.(submitted)
    setSnapshot(submitted)
    setPhase('disintegrating')
  }

  const handleComplete = useCallback(() => {
    setSnapshot('')
    setValue('')
    setPhase('idle')
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const showPlaceholder = phase === 'idle' && !value

  return (
    <div className={cn('flex w-full flex-col items-center', title ? 'gap-10 py-12' : 'gap-0 py-0', className)}>
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg text-center text-ink"
        >
          {title}
        </motion.h1>
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full max-w-xl"
      >
        <motion.div
          animate={phase === 'disintegrating' ? { scale: [1, 0.985, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex items-center gap-3 rounded-none border-2 border-hairline-strong bg-card px-4 py-3 shadow-brutal transition-shadow focus-within:shadow-[6px_6px_0px_0px_#000]"
        >
          <div className="relative h-6 flex-1">
            {/* Inner clip wraps only the input + placeholder so the canvas can overflow. */}
            <div className="absolute inset-0 overflow-hidden">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={phase !== 'idle'}
                spellCheck={false}
                className={cn(
                  'absolute inset-0 w-full bg-transparent text-sm text-ink outline-none transition-opacity duration-300',
                  phase === 'disintegrating' && 'opacity-0',
                )}
              />

              <AnimatePresence mode="wait">
                {showPlaceholder && (
                  <motion.span
                    key={phIndex}
                    initial={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -10, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 truncate text-sm"
                    style={{ color: 'rgba(0, 0, 0, 0.45)' }}
                  >
                    {activePlaceholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {phase === 'disintegrating' && <DisintegratingText text={snapshot} onComplete={handleComplete} />}
          </div>

          <motion.button
            type="submit"
            aria-label="Ask"
            disabled={phase !== 'idle'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-none border-2 border-hairline-strong bg-primary text-on-primary transition-colors hover:bg-dark disabled:opacity-60"
          >
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  )
}

type Particle = {
  ox: number
  oy: number
  vx: number
  vy: number
  delay: number
  life: number
  size: number
}

interface DisintegratingTextProps {
  text: string
  onComplete: () => void
}

const RIGHT_OVERHANG_PX = 90
const CHAR_STEP_MS = 50
const CHAR_JITTER_MS = 22

function DisintegratingText({ text, onComplete }: DisintegratingTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const baseW = Math.max(parent.clientWidth, 1)
    const H = Math.max(parent.clientHeight, 1)
    const W = baseW + RIGHT_OVERHANG_PX

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(dpr, dpr)

    ctx.font = INPUT_FONT
    ctx.fillStyle = `rgb(${PARTICLE_RGB})`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'left'
    ctx.fillText(text, 0, H / 2)

    const chars = Array.from(text)
    const charBounds: { start: number; end: number }[] = []
    let cursor = 0
    for (const ch of chars) {
      const w = ctx.measureText(ch).width
      charBounds.push({ start: cursor, end: cursor + w })
      cursor += w
    }
    const totalChars = chars.length
    const charDelay = (charIdx: number) => {
      const fromRight = totalChars - 1 - charIdx
      return fromRight * CHAR_STEP_MS + Math.random() * CHAR_JITTER_MS
    }
    const findCharIdx = (lx: number) => {
      let lo = 0,
        hi = charBounds.length - 1
      while (lo <= hi) {
        const mid = (lo + hi) >> 1
        const b = charBounds[mid]
        if (lx < b.start) hi = mid - 1
        else if (lx >= b.end) lo = mid + 1
        else return mid
      }
      return Math.min(Math.max(lo, 0), charBounds.length - 1)
    }

    const sampleW = baseW * dpr
    const img = ctx.getImageData(0, 0, sampleW, H * dpr)
    const particles: Particle[] = []
    const stride = dpr

    for (let y = 0; y < H * dpr; y += stride) {
      for (let x = 0; x < sampleW; x += stride) {
        const i = (y * sampleW + x) * 4
        if (img.data[i + 3] > 110) {
          const lx = x / dpr
          const ly = y / dpr
          const charIdx = findCharIdx(lx)

          const angle = (Math.random() - 0.5) * Math.PI * 0.6
          const speed = 0.18 + Math.random() * 0.55
          const vx = Math.cos(angle) * speed + 0.12
          const vy = Math.sin(angle) * speed * 0.55

          const sizeRoll = Math.random()
          const size = sizeRoll < 0.65 ? 1 : sizeRoll < 0.92 ? 1.4 : 1.8

          particles.push({
            ox: lx,
            oy: ly,
            vx,
            vy,
            delay: charDelay(charIdx),
            life: 480 + Math.random() * 320,
            size,
          })
        }
      }
    }

    ctx.clearRect(0, 0, W, H)

    let rafId = 0
    let start = 0
    let cancelled = false

    const frame = (now: number) => {
      if (cancelled) return
      if (!start) start = now
      const elapsed = now - start
      ctx.clearRect(0, 0, W, H)

      let aliveCount = 0

      for (const p of particles) {
        if (elapsed < p.delay) {
          const ttd = p.delay - elapsed
          if (ttd < 80) {
            const tension = 1 - ttd / 80
            const jx = (Math.random() - 0.5) * 0.5 * tension
            const jy = (Math.random() - 0.5) * 0.5 * tension
            ctx.fillStyle = `rgb(${PARTICLE_RGB})`
            ctx.fillRect(p.ox + jx, p.oy + jy, p.size, p.size)
          } else {
            ctx.fillStyle = `rgb(${PARTICLE_RGB})`
            ctx.fillRect(p.ox, p.oy, p.size, p.size)
          }
          aliveCount++
          continue
        }
        const t = elapsed - p.delay
        if (t > p.life) continue
        aliveCount++

        const norm = t / p.life
        const motionT = t / 16
        const wobble = Math.sin((p.ox + motionT) * 0.22) * 0.4
        const x = p.ox + p.vx * motionT + wobble * norm
        const y = p.oy + p.vy * motionT
        const opacity = Math.cos((norm * Math.PI) / 2)
        ctx.fillStyle = `rgba(${PARTICLE_RGB},${opacity.toFixed(3)})`
        ctx.fillRect(x, y, p.size, p.size)
      }

      if (aliveCount === 0) {
        onCompleteRef.current()
        return
      }
      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [text])

  return <canvas ref={canvasRef} className="pointer-events-none absolute top-0 left-0" aria-hidden />
}

export default AskInput
