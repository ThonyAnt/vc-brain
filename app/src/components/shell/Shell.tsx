import { Outlet, useLocation, useNavigate } from 'react-router'
import { Brain, Landmark, MessageSquare, Users, Workflow } from 'lucide-react'
import Dock from '@/components/ui/dock'
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
    { icon: Brain, label: 'Brain', onClick: () => navigate('/') },
    { icon: Workflow, label: 'Pipeline', onClick: () => navigate('/pipeline') },
    { icon: Users, label: 'Founders', onClick: () => navigate('/founders') },
    { icon: Landmark, label: 'Fund', onClick: () => navigate('/fund') },
    { icon: MessageSquare, label: 'Analyst', onClick: toggleChat },
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

      {/* macOS-style dock replaces the nav rail */}
      <div className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2">
        <Dock className="w-auto py-0" items={items} activeLabel={routeLabel(location.pathname)} />
      </div>

      <LearningToast />
    </div>
  )
}
