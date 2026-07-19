import type { HTMLAttributes } from 'react'

/* Section label: compact DM Sans uppercase label. */
export function Eyebrow({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`code-sm uppercase tracking-[0.12em] text-charcoal ${className}`}
      {...props}
    />
  )
}
