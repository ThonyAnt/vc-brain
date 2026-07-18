import { useLocation } from 'react-router'
import { Pill } from '../ui/Pill'
import { useAppStore } from '../../state/store'

function crumb(pathname: string): string {
  if (pathname === '/') return 'BRAIN'
  if (pathname.startsWith('/company/')) return `COMPANY / ${pathname.split('/')[2] ?? ''}`
  return pathname.slice(1).toUpperCase()
}

export function TopBar() {
  const location = useLocation()
  const toggleChat = useAppStore((s) => s.toggleChat)
  const chatOpen = useAppStore((s) => s.chatOpen)

  return (
    <header className="flex h-13 shrink-0 items-center justify-between border-b border-hairline px-6">
      <div className="eyebrow text-mute">
        MERIDIAN VENTURES <span className="mx-2 text-hairline">/</span>
        <span className="text-ink">{crumb(location.pathname)}</span>
      </div>
      <Pill size="sm" onClick={toggleChat} className={chatOpen ? 'bg-soft' : ''}>
        <span className="eyebrow text-ink">Analyst</span>
      </Pill>
    </header>
  )
}
