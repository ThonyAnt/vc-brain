import type { HTMLAttributes } from 'react'

/* Neobrutal card: solid white, 2px black border, square corners, hard 4px shadow. */
export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-none border-2 border-hairline-strong bg-card p-4 shadow-brutal ${className}`}
      {...props}
    />
  )
}
