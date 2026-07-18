import type { HTMLAttributes } from 'react'

/* Section label: Space Mono uppercase, wide tracking — the neobrutal eyebrow voice. */
export function Eyebrow({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`code-sm uppercase tracking-[0.12em] text-charcoal ${className}`}
      {...props}
    />
  )
}
