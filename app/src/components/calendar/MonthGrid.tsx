import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CalendarEvent {
  id: string
  date: Date
  title: string
  companyName: string
  companyId: string
}

const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

/*
 * Neobrutal month grid (DayPicker reference, hand-rolled for full theme
 * control): square bordered cells, mono day numbers, red today stamp,
 * events as yellow sticker chips inside their day.
 */
export function MonthGrid({
  events,
  onOpenEvent,
}: {
  events: CalendarEvent[]
  onOpenEvent: (companyId: string) => void
}) {
  const today = new Date()
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const monthLabel = month
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    .toUpperCase()
  const firstWeekday = month.getDay()
  const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekday)
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    return d
  })

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-hairline-strong bg-card px-3 py-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-hairline-strong bg-card hover:bg-bone"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="caption-tight uppercase tracking-[0.08em] text-ink">{monthLabel}</span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-hairline-strong bg-card hover:bg-bone"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((d) => (
          <div key={d} className="code-sm border-b-2 border-hairline-strong bg-bone px-2 py-1.5 text-center text-charcoal">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === month.getMonth()
          const isToday = sameDay(d, today)
          const dayEvents = events.filter((e) => sameDay(e.date, d))
          return (
            <div
              key={i}
              className={`min-h-20 border-b border-hairline-strong p-1.5 ${(i + 1) % 7 !== 0 ? 'border-r' : ''} ${
                inMonth ? 'bg-card' : 'bg-bone/60'
              }`}
            >
              <span
                className={`code-sm inline-block px-1 ${
                  isToday
                    ? 'bg-primary text-on-primary'
                    : inMonth
                      ? 'text-ink'
                      : 'text-ash'
                }`}
              >
                {d.getDate()}
              </span>
              <div className="mt-1 space-y-1">
                {dayEvents.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => onOpenEvent(e.companyId)}
                    title={`${e.title} — ${e.companyName}`}
                    className="block w-full cursor-pointer truncate border border-hairline-strong bg-hero-glow px-1 py-0.5 text-left text-[10px] leading-tight font-semibold text-ink shadow-brutal-sm hover:bg-secondary"
                  >
                    {e.companyName}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
