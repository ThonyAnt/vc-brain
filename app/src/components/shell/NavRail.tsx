import { NavLink } from 'react-router'

const items = [
  {
    to: '/',
    label: 'Brain',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="9" cy="4" r="1.8" />
        <circle cx="4" cy="12" r="1.8" />
        <circle cx="14" cy="12" r="1.8" />
        <path d="M9 5.8 5 10.4M9 5.8l4 4.6M5.8 12h6.4" />
      </svg>
    ),
  },
  {
    to: '/pipeline',
    label: 'Pipeline',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="3" width="3.5" height="12" rx="1" />
        <rect x="7.25" y="3" width="3.5" height="8" rx="1" />
        <rect x="12.5" y="3" width="3.5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    to: '/founders',
    label: 'Founders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="9" cy="6" r="3" />
        <path d="M3.5 15.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
      </svg>
    ),
  },
  {
    to: '/fund',
    label: 'Fund',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 5h12M3 9h12M3 13h12" />
        <circle cx="7" cy="5" r="1.5" />
        <circle cx="12" cy="9" r="1.5" />
        <circle cx="5" cy="13" r="1.5" />
      </svg>
    ),
  },
]

export function NavRail() {
  return (
    <nav className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-hairline bg-canvas py-4">
      <div className="mb-4 font-display text-sm font-bold tracking-tight text-ink" title="VC Brain">
        VC
      </div>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          title={item.label}
          className={({ isActive }) =>
            `flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              isActive ? 'border-hairline-strong bg-card text-ink' : 'border-transparent text-mute hover:text-ink'
            }`
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </nav>
  )
}
