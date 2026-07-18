import type { ButtonHTMLAttributes } from 'react'

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'onDark'
  size?: 'md' | 'sm'
}

/*
 * Neobrutal button recipes: square corners, 2px black border, hard 2px shadow
 * that presses flat on :active. primary = red stamp, dark = black CTA,
 * outline/ghost = tertiary, onDark for controls inside dark panels.
 */
export function Pill({ variant = 'outline', size = 'sm', className = '', ...props }: PillProps) {
  const bordered =
    'border-2 border-hairline-strong shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
  const variants = {
    primary: `${bordered} bg-primary text-on-primary hover:bg-primary-deep`,
    dark: `${bordered} bg-dark text-on-dark hover:bg-charcoal`,
    outline: `${bordered} bg-card text-ink hover:bg-bone`,
    ghost: 'border-2 border-transparent bg-transparent text-ink hover:border-hairline-strong hover:bg-bone',
    onDark: 'border-2 border-divider-dark text-on-dark hover:bg-divider-dark hover:text-ink',
  }
  const sizes = { md: 'h-11 px-6 text-[16px]', sm: 'h-9 px-4 text-sm' }
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-none font-semibold leading-none transition-[background-color,border-color,box-shadow,translate] focus-visible:outline-3 focus-visible:outline-ring-focus ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
