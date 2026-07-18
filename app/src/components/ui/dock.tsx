import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'

interface DockProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  /* when provided, the active dot follows this label (e.g. the current route)
     instead of the internal click state */
  activeLabel?: string
  items: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick?: () => void
  }[]
}

export default function Dock({ items, className, activeLabel, orientation = 'horizontal' }: DockProps) {
  const [internalActive, setInternalActive] = React.useState<string | null>(null)
  const [hovered, setHovered] = React.useState<number | null>(null)
  const active = activeLabel !== undefined ? activeLabel : internalActive
  const vertical = orientation === 'vertical'

  return (
    <div className={cn('flex items-center justify-center w-full py-12', className)}>
      <motion.div
        animate={vertical ? { x: [0, -2, 0] } : { y: [0, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          vertical ? 'flex flex-col items-center gap-4 px-3 py-4 rounded-3xl' : 'flex items-end gap-4 px-4 py-3 rounded-3xl',
          'border bg-background/70 backdrop-blur-2xl shadow-lg',
        )}
        style={{
          // arc layout illusion
          transform: vertical ? 'perspective(600px) rotateY(-10deg)' : 'perspective(600px) rotateX(10deg)',
        }}
      >
        <TooltipProvider delayDuration={100}>
          {items.map((item, i) => {
            const isActive = active === item.label
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? -5 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'rounded-2xl relative',
                        'transition-colors',
                        isHovered && 'shadow-lg shadow-ring/40',
                      )}
                      onClick={() => {
                        setInternalActive(item.label)
                        item.onClick?.()
                      }}
                    >
                      <item.icon
                        className={cn(
                          'h-6 w-6 transition-colors',
                          isActive ? 'text-[#3b82f6]' : 'text-foreground',
                        )}
                      />
                      {/* Glowing ring effect */}
                      {isHovered && (
                        <motion.span
                          layoutId="glow"
                          className="absolute inset-0 rounded-2xl border border-ring"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </Button>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="dot"
                        className={cn(
                          'w-1.5 h-1.5 rounded-full bg-ring',
                          vertical ? 'absolute top-1/2 -right-2 -translate-y-1/2' : 'mt-1',
                        )}
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side={vertical ? 'right' : 'top'} className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </motion.div>
    </div>
  )
}
