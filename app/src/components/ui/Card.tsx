import type { HTMLAttributes } from 'react'

/* 8px radius, hairline border, charcoal fill. No shadows anywhere. */
export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-card border border-hairline bg-card p-6 ${className}`} {...props} />
}
