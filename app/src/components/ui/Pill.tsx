import type { ButtonHTMLAttributes } from 'react'

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'solid'
  size?: 'md' | 'sm'
}

/* Every interactive element is a pill: translucent-white outline by default,
   white fill reserved for the single primary action on a screen. */
export function Pill({ variant = 'outline', size = 'md', className = '', ...props }: PillProps) {
  const variants = {
    outline: 'border border-white/25 text-ink hover:bg-soft',
    solid: 'border border-white bg-ink text-canvas hover:bg-body',
  }
  const sizes = { md: 'px-4 py-2', sm: 'px-3 py-1' }
  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full text-sm leading-5 transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
