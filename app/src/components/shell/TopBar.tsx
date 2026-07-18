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
    <header className="flex h-15 shrink-0 items-center justify-between border-b border-hairline bg-canvas px-6">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[17px] font-bold tracking-tight text-ink">Meridian Ventures</span>
        <span className="eyebrow text-ash">{crumb(location.pathname)}</span>
      </div>
      <Pill variant={chatOpen ? 'dark' : 'outline'} onClick={toggleChat}>
        Analyst
      </Pill>
    </header>
  )
}
