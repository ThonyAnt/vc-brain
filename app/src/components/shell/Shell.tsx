import { Outlet, useLocation, useNavigate } from 'react-router'
import Dock from '@/components/ui/dock'
import { AnalystIcon, BrainIcon, FoundersIcon, FundIcon, PipelineIcon } from '@/components/ui/nav-icons'
import { useAppStore } from '../../state/store'
import { ChatDrawer } from './ChatDrawer'
import { LearningToast } from './LearningToast'
import { TopBar } from './TopBar'

function routeLabel(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/company')) return 'Brain'
  if (pathname.startsWith('/pipeline')) return 'Pipeline'
  if (pathname.startsWith('/founders')) return 'Founders'
  if (pathname.startsWith('/fund')) return 'Fund'
  return ''
}

export function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const toggleChat = useAppStore((s) => s.toggleChat)

  const items = [
    { icon: BrainIcon, label: 'Brain', onClick: () => navigate('/') },
    { icon: PipelineIcon, label: 'Pipeline', onClick: () => navigate('/pipeline') },
    { icon: FoundersIcon, label: 'Founders', onClick: () => navigate('/founders') },
    { icon: FundIcon, label: 'Fund', onClick: () => navigate('/fund') },
    { icon: AnalystIcon, label: 'Analyst', onClick: toggleChat },
  ]

  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ChatDrawer />

      {/* macOS-style dock, docked to the left edge */}
      <div className="fixed top-1/2 left-3 z-40 -translate-y-1/2">
        <Dock
          orientation="vertical"
          className="w-auto p-0"
          items={items}
          activeLabel={routeLabel(location.pathname)}
        />
      </div>

      <LearningToast />
    </div>
  )
}
