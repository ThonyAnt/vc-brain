import type { ButtonHTMLAttributes } from 'react'

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'onDark'
  size?: 'md' | 'sm'
}

/*
 * Replicate button recipes: every interactive element is fully rounded,
 * label 600. primary = the orange stamp (one per viewport), dark = equal-weight
 * CTA, outline/ghost = tertiary. onDark for controls inside dark panels.
 */
export function Pill({ variant = 'outline', size = 'sm', className = '', ...props }: PillProps) {
  const variants = {
    primary: 'bg-primary text-on-primary active:bg-primary-deep',
    dark: 'bg-dark text-on-dark hover:bg-body',
    outline: 'border border-hairline-strong bg-card text-ink hover:bg-bone',
    ghost: 'bg-canvas text-ink hover:bg-bone',
    onDark: 'border border-divider-dark text-on-dark hover:bg-divider-dark',
  }
  const sizes = { md: 'h-11 px-6 text-[16px]', sm: 'h-9 px-4 text-sm' }
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold leading-none transition-colors focus-visible:outline-3 focus-visible:outline-ring-focus ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
