import { useState } from 'react'

export type CalendarConnection = {
  provider: 'google'
  calendarName: string
  connectedAt: string
}

type CalendarSyncDialogProps = {
  connection: CalendarConnection | null
  onClose: () => void
  onConnect: (connection: CalendarConnection) => void
  onDisconnect: () => void
}

export function CalendarSyncDialog({ connection, onClose, onConnect, onDisconnect }: CalendarSyncDialogProps) {
  const [calendarName, setCalendarName] = useState(connection?.calendarName ?? 'Primary calendar')
  const [connecting, setConnecting] = useState(false)

  function connect() {
    setConnecting(true)
    // The OAuth redirect is supplied by the production Google integration. The
    // local demo records the chosen calendar and allows the scheduling workflow.
    window.setTimeout(() => {
      onConnect({ provider: 'google', calendarName, connectedAt: new Date().toISOString() })
      setConnecting(false)
    }, 450)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep/45 p-4 py-16" role="dialog" aria-modal="true" aria-labelledby="calendar-sync-title">
      <div className="w-full max-w-[600px] border-2 border-hairline-strong bg-card shadow-[8px_8px_0_0_#000]">
        <header className="flex items-start justify-between gap-4 border-b-2 border-hairline-strong bg-bone px-6 py-5">
          <div>
            <p className="code-sm uppercase text-mute">Calendar sync</p>
            <h2 id="calendar-sync-title" className="heading-md mt-1">{connection ? 'Google Calendar connected' : 'Connect Google Calendar'}</h2>
            <p className="mt-1 text-sm text-body">Use availability for scheduling and create the confirmed meeting invite after a founder selects a time.</p>
          </div>
          <button type="button" onClick={onClose} className="h-9 w-9 border-2 border-hairline-strong bg-card text-xl leading-none hover:bg-bone" aria-label="Close calendar sync">×</button>
        </header>

        <div className="space-y-5 p-6">
          {connection ? (
            <>
              <div className="border-2 border-success bg-success/10 p-4">
                <p className="caption-tight text-ink">Synced with {connection.calendarName}</p>
                <p className="mt-1 text-sm text-body">Availability checks and confirmed meeting reservations will use this Google Calendar.</p>
              </div>
              <div className="grid gap-3 text-sm text-body sm:grid-cols-2">
                <div className="border-2 border-hairline-strong p-3"><span className="code-sm block text-mute">Availability</span><strong className="mt-1 block text-ink">Free / busy only</strong></div>
                <div className="border-2 border-hairline-strong p-3"><span className="code-sm block text-mute">Meeting creation</span><strong className="mt-1 block text-ink">Confirmed slots only</strong></div>
              </div>
            </>
          ) : (
            <>
              <label className="block">
                <span className="code-sm block uppercase text-mute">Calendar to sync</span>
                <select value={calendarName} onChange={(event) => setCalendarName(event.target.value)} className="mt-2 h-11 w-full border-2 border-hairline-strong bg-card px-3 text-base text-ink">
                  <option>Primary calendar</option>
                  <option>VC meetings</option>
                  <option>Deal team calendar</option>
                </select>
              </label>
              <div className="border-2 border-hairline-strong bg-bone p-4 text-sm text-body">
                <p className="caption-tight text-ink">Permissions requested</p>
                <ul className="mt-2 space-y-1.5"><li>· Read free/busy availability only</li><li>· Create an invite only after a meeting is confirmed</li><li>· Add the founder as an attendee and notify you</li></ul>
              </div>
            </>
          )}
        </div>

        <footer className="flex flex-wrap justify-end gap-3 border-t-2 border-hairline-strong bg-bone px-6 py-4">
          {connection && <button type="button" onClick={onDisconnect} className="h-11 border-2 border-hairline-strong bg-card px-5 text-sm font-semibold text-ink hover:bg-bone">Disconnect</button>}
          <button type="button" onClick={onClose} className="h-11 border-2 border-hairline-strong bg-card px-5 text-sm font-semibold text-ink hover:bg-bone">{connection ? 'Done' : 'Cancel'}</button>
          {!connection && <button type="button" onClick={connect} disabled={connecting} className="h-11 border-2 border-hairline-strong bg-primary px-5 text-sm font-semibold text-on-primary disabled:bg-stone">{connecting ? 'Authorizing…' : 'Connect Google Calendar →'}</button>}
        </footer>
      </div>
    </div>
  )
}
