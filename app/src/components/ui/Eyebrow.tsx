import type { HTMLAttributes } from 'react'

/* Section label: basier-square caption-tight (14/600/-0.35px), never mono. */
export function Eyebrow({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`caption-tight text-charcoal ${className}`} {...props} />
}
