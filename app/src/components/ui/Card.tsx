import type { HTMLAttributes } from 'react'

/* model-card recipe: white on cream, 10px radius, hairline outline, no shadow. */
export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-card border border-hairline bg-card p-4 ${className}`} {...props} />
}
