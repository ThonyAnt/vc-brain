import type { HTMLAttributes } from 'react'

/* JetBrains Mono metadata label — the code-sm voice used for slugs and metrics. */
export function Eyebrow({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`eyebrow text-mute ${className}`} {...props} />
}
