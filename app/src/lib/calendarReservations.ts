export type CalendarReservation = {
  id: string
  companyId: string
  companyName: string
  founder: string
  title: string
  when: string
  time: string
  calendar: string
  provider: string
  meetingUrl: string
}

/** Confirmed calls backed by companies in the deterministic brain snapshot. */
export const CALENDAR_RESERVATIONS: CalendarReservation[] = [
  {
    id: 'cal-vooma',
    companyId: 'co_vooma',
    companyName: 'Vooma',
    founder: 'Jesse Buckingham',
    title: 'Partner call',
    when: 'Today',
    time: '2:00 PM–2:25 PM',
    calendar: 'Google Calendar',
    provider: 'Google Meet',
    meetingUrl: 'https://meet.google.com/',
  },
  {
    id: 'cal-isometric',
    companyId: 'co_isometric',
    companyName: 'Isometric',
    founder: 'Eamon Jubbawy',
    title: 'Founder introduction',
    when: 'Tomorrow',
    time: '10:30 AM–10:55 AM',
    calendar: 'Google Calendar',
    provider: 'Zoom',
    meetingUrl: 'https://zoom.us/join',
  },
  {
    id: 'cal-letta',
    companyId: 'co_letta',
    companyName: 'Letta',
    founder: 'Charles Packer',
    title: 'Diligence call',
    when: 'Wed, Jul 22',
    time: '11:00 AM–11:25 AM',
    calendar: 'Google Calendar',
    provider: 'Google Meet',
    meetingUrl: 'https://meet.google.com/',
  },
]
