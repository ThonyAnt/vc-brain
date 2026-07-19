import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
}

/*
 * Neobrutal dropdown (dropdown-01 reference motion): square trigger with a
 * rotating chevron, AnimatePresence menu that fades/slides in with staggered
 * items, spring check on the selected row, invert-to-black hover.
 */
export function Dropdown({
  value,
  options,
  onChange,
  ariaLabel,
  className = '',
}: {
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  ariaLabel: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={rootRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-full cursor-pointer items-center justify-between gap-2 border-2 border-hairline-strong bg-card px-2.5 text-sm text-ink transition-colors hover:bg-bone focus-visible:outline-3 focus-visible:outline-ring-focus"
      >
        <span className="truncate">{current?.label ?? value}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex shrink-0">
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 mt-2 min-w-full overflow-hidden border-2 border-hairline-strong bg-card shadow-brutal"
          >
            {options.map((o, i) => (
              <motion.button
                key={o.value}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-dark hover:text-on-dark ${
                  i !== options.length - 1 ? 'border-b border-hairline-strong' : ''
                } ${o.value === value ? 'bg-bone' : 'bg-card'}`}
              >
                <span className="whitespace-nowrap">{o.label}</span>
                {o.value === value && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="flex shrink-0"
                  >
                    <Check className="h-4 w-4" />
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
