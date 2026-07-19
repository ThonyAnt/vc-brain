import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, ChevronDown, ChevronUp, ExternalLink, Video } from 'lucide-react'
import { useNavigate } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company } from '../../lib/types'

type Reservation = {
  id: string
  companyId: string
  founder: string
  title: string
  when: string
  time: string
  calendar: string
}

const reservations: Reservation[] = [
  {
    id: 'cal-aureline',
    companyId: 's-aureline',
    founder: 'Mara Voss',
    title: 'Partner call',
    when: 'Today',
    time: '2:00 PM–2:25 PM',
    calendar: 'Google Calendar',
  },
  {
    id: 'cal-tessellate',
    companyId: 's-tessellate',
    founder: 'Elin Sørensen',
    title: 'Founder introduction',
    when: 'Tomorrow',
    time: '10:30 AM–10:55 AM',
    calendar: 'Google Calendar',
  },
  {
    id: 'cal-solstice',
    companyId: 's-solstice',
    founder: 'Adaeze Okafor',
    title: 'Diligence call',
    when: 'Wed, Jul 22',
    time: '11:00 AM–11:25 AM',
    calendar: 'Google Calendar',
  },
]

/** Expandable, free-floating calendar surface for upcoming confirmed company calls. */
export function IncomingCalendar() {
  const [expanded, setExpanded] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.getCompanies().then(setCompanies)
  }, [])

  const names = useMemo(() => new Map(companies.map((company) => [company.id, company.name])), [companies])
  const next = reservations[0]

  return (
    <section className="pointer-events-auto w-[min(410px,calc(100vw-7rem))]" aria-label="Incoming company calendar">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 border-2 border-hairline-strong bg-card px-4 py-3 text-left shadow-brutal transition-transform hover:-translate-y-0.5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center bg-primary text-on-primary"><CalendarDays size={17} /></span>
          <span className="min-w-0">
            <span className="block font-mono text-[10px] font-bold tracking-[0.12em] text-mute uppercase">Incoming calendar</span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-ink">{next.when} · {next.title} — {names.get(next.companyId) ?? 'Loading…'}</span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-bold tracking-[0.08em] text-success uppercase">
          {reservations.length} confirmed
          {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </span>
      </button>

      {expanded && (
        <div className="border-x-2 border-b-2 border-hairline-strong bg-card p-4 shadow-brutal">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.12em] text-mute uppercase">Confirmed reservations</p>
              <p className="mt-1 text-sm text-body">Company calls already held on your calendar.</p>
            </div>
            <span className="rounded-full border border-success/30 bg-success/10 px-2 py-1 font-mono text-[10px] font-bold text-success uppercase">synced</span>
          </div>

          <div className="overflow-x-auto border-2 border-hairline-strong">
            <table className="w-full min-w-[360px] border-collapse text-left">
              <thead className="border-b-2 border-hairline-strong bg-bone font-mono text-[10px] tracking-[0.1em] text-mute uppercase">
                <tr>
                  <th className="px-3 py-2 font-bold">When</th>
                  <th className="px-3 py-2 font-bold">Company call</th>
                  <th className="px-3 py-2 font-bold">Reservation</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => {
                  const company = names.get(reservation.companyId) ?? 'Loading…'
                  return (
                    <tr key={reservation.id} className="border-b border-hairline last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 align-top font-mono text-[11px] text-body">
                        <div className="font-bold text-ink">{reservation.when}</div>
                        <div className="mt-0.5">{reservation.time}</div>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <button type="button" onClick={() => navigate(`/company/${reservation.companyId}`)} className="group text-left">
                          <span className="flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-primary">{company}<ExternalLink size={12} /></span>
                          <span className="mt-0.5 block text-xs text-mute">{reservation.title} · {reservation.founder}</span>
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-top">
                        <span className="inline-flex items-center gap-1.5 bg-success/10 px-2 py-1 font-mono text-[10px] font-bold text-success uppercase"><Video size={12} /> Confirmed</span>
                        <span className="mt-1.5 block font-mono text-[10px] text-mute">{reservation.calendar}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
