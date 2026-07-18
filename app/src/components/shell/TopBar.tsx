import { useLocation, useNavigate } from 'react-router'
import { Pill } from '../ui/Pill'

function crumb(pathname: string): string {
  if (pathname === '/') return 'brain'
  if (pathname.startsWith('/company/')) return `company/${pathname.split('/')[2] ?? ''}`
  return pathname.slice(1)
}

export function TopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const onAnalyst = location.pathname.startsWith('/analyst')

  return (
    <header className="flex h-15 shrink-0 items-center justify-between border-b-2 border-hairline-strong bg-canvas px-6">
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-semibold text-ink">Meridian Ventures</span>
        <span className="code-sm text-ash">{crumb(location.pathname)}</span>
      </div>
      <Pill variant={onAnalyst ? 'dark' : 'outline'} size="md" onClick={() => navigate('/analyst')}>
        Analyst
      </Pill>
    </header>
  )
}
