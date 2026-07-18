/* The original hand-drawn nav icons (18px grid, 1.2 stroke), kept for the dock. */

type IconProps = { className?: string }

export function BrainIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="9" cy="4" r="1.8" />
      <circle cx="4" cy="12" r="1.8" />
      <circle cx="14" cy="12" r="1.8" />
      <path d="M9 5.8 5 10.4M9 5.8l4 4.6M5.8 12h6.4" />
    </svg>
  )
}

export function PipelineIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="3" width="3.5" height="12" rx="1" />
      <rect x="7.25" y="3" width="3.5" height="8" rx="1" />
      <rect x="12.5" y="3" width="3.5" height="5" rx="1" />
    </svg>
  )
}

export function FoundersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="9" cy="6" r="3" />
      <path d="M3.5 15.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
    </svg>
  )
}

export function FundIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 5h12M3 9h12M3 13h12" />
      <circle cx="7" cy="5" r="1.5" />
      <circle cx="12" cy="9" r="1.5" />
      <circle cx="5" cy="13" r="1.5" />
    </svg>
  )
}

export function AnalystIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 4.5h12v7.5H9.5L6 15v-3H3z" strokeLinejoin="round" />
      <path d="M6 7.5h6M6 9.75h4" strokeLinecap="round" />
    </svg>
  )
}
