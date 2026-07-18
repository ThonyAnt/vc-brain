import type { HTMLAttributes } from 'react'

/* Uppercase tracked Geist Mono label — section eyebrows, table headers, metric labels. */
export function Eyebrow({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`eyebrow text-mute ${className}`} {...props} />
}
