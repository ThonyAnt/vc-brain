import { useLocation } from 'react-router'
import { Pill } from '../ui/Pill'
import { useAppStore } from '../../state/store'

function crumb(pathname: string): string {
  if (pathname === '/') return 'brain'
  if (pathname.startsWith('/company/')) return `company/${pathname.split('/')[2] ?? ''}`
  return pathname.slice(1)
}

export function TopBar() {
  const location = useLocation()
  const toggleChat = useAppStore((s) => s.toggleChat)
  const chatOpen = useAppStore((s) => s.chatOpen)

  return (
    <header className="flex h-15 shrink-0 items-center justify-between border-b-2 border-hairline-strong bg-canvas px-6">
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-semibold text-ink">Meridian Ventures</span>
        <span className="code-sm text-ash">{crumb(location.pathname)}</span>
      </div>
      <Pill variant={chatOpen ? 'dark' : 'outline'} size="md" onClick={toggleChat}>
        Analyst
      </Pill>
    </header>
  )
}
