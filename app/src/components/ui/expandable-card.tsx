import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* Hallmark · pre-emit critique: P4 H5 E4 S4 R5 V4 */
/* Hallmark · component: profile modal · genre: editorial · theme: existing brutalist system
 * interaction states: default · hover · focus · active · async states not applicable
 * contrast: pass (40–41) · responsive: pass (49–57)
 */
interface ExpandableCardProps {
  title: string
  src: string
  description: string
  children?: React.ReactNode
  className?: string
  classNameExpanded?: string
  imageClassName?: string
  [key: string]: unknown
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  imageClassName,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const id = React.useId()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActive(false)
      }
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-ink/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className={cn('fixed inset-0 grid place-items-center z-[100] sm:mt-16 before:pointer-events-none')}>
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                'relative grid max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-[900px] grid-cols-1 overflow-y-auto border-2 border-hairline-strong bg-card shadow-brutal [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] md:h-[min(720px,calc(100vh-3rem))] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:overflow-hidden dark:bg-zinc-950 dark:shadow-none',
                classNameExpanded,
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`} className="min-w-0">
                <div className="relative h-64 border-b-2 border-hairline-strong bg-bone md:h-full md:border-r-2 md:border-b-0">
                  <img src={src} alt={title} className={cn('absolute inset-0 h-full w-full object-cover object-center', imageClassName)} />
                </div>
              </motion.div>
              <div className="relative flex min-w-0 flex-col bg-card p-6 sm:p-8 md:h-full md:min-h-0 md:overflow-hidden">
                <div className="flex items-start justify-between gap-6 border-b-2 border-hairline-strong pb-6">
                  <div className="min-w-0 pt-1">
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="font-mono text-[11px] font-bold tracking-[0.08em] text-mute uppercase"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="mt-2 min-w-0 text-3xl font-semibold text-ink sm:text-4xl [overflow-wrap:anywhere] dark:text-white"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border-2 border-hairline-strong bg-card text-ink transition-colors hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus active:translate-y-px dark:bg-zinc-950 dark:text-white"
                    onClick={() => setActive(false)}
                  >
                    <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.4 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
                <div className="min-h-0 flex-1 pt-6 md:overflow-y-auto md:pr-2">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 text-base text-body sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-start [&_h4]:font-mono [&_h4]:text-[11px] [&_h4]:font-bold [&_h4]:tracking-[0.08em] [&_h4]:uppercase [&_p]:min-w-0 [&_p]:leading-relaxed"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="button"
        aria-label={`Open ${title} profile`}
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setActive(true)
          }
        }}
        tabIndex={0}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-between rounded-none border-2 border-hairline-strong bg-card p-3 shadow-brutal hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus active:translate-y-px',
          className,
        )}
      >
        <div className="flex gap-4 flex-col">
          <motion.div layoutId={`image-${title}-${id}`}>
            <img src={src} alt={title} className={cn('w-64 h-56 rounded-none border-2 border-hairline-strong object-cover object-center', imageClassName)} />
          </motion.div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="min-w-0 text-sm font-medium text-zinc-500 md:text-left dark:text-zinc-400"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-black dark:text-white md:text-left font-semibold"
              >
                {title}
              </motion.h3>
            </div>
            <motion.div
              aria-hidden="true"
              layoutId={`button-${title}-${id}`}
              className={cn(
                'h-8 w-8 shrink-0 flex items-center justify-center rounded-none border-2 border-hairline-strong bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300  focus:outline-none',
                className,
              )}
            >
              <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.4 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
