import { Outlet } from 'react-router'
import { ChatDrawer } from './ChatDrawer'
import { LearningToast } from './LearningToast'
import { NavRail } from './NavRail'
import { TopBar } from './TopBar'

export function Shell() {
  return (
    <div className="flex h-full">
      <NavRail />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ChatDrawer />
      <LearningToast />
    </div>
  )
}
