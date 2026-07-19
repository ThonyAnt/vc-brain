import { useEffect, useState } from 'react'
import { Check, CheckCircle2, CalendarCheck, Mail, Send, ShieldCheck, Sparkles } from 'lucide-react'
import { api } from '../../../lib/api/client'
import type { Company, OutreachRecord } from '../../../lib/types'
import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { Pill } from '../../../components/ui/Pill'

const statusCopy = {
  draft: 'Draft ready for review',
  pending_approval: 'Awaiting approval',
  sent: 'Sent · waiting for a reply',
  replied: 'Positive reply received',
  awaiting_slot: 'Availability offered',
  event_created: 'Meeting on calendar',
} as const

export function OutreachTab({ company }: { company: Company }) {
  const [outreach, setOutreach] = useState<OutreachRecord | null>(null)
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getOutreach(company.id).then(setOutreach)
  }, [company.id])

  if (!outreach) return <div className="text-body">Loading outreach workspace…</div>

  async function saveDraft() {
    if (!outreach) return
    setSaving(true)
    setOutreach(await api.saveOutreachDraft(company.id, outreach))
    setSaving(false)
    setNotice('Draft saved. It has not been sent.')
  }

  async function send() {
    if (!outreach) return
    const recipient = outreach.contact.email
    setOutreach(await api.sendOutreach(company.id))
    setNotice(`Sent to ${recipient}. Reply tracking is active.`)
  }

  async function simulateReply() {
    setOutreach(await api.simulatePositiveReply(company.id))
    setNotice('Reply received and classified as positive. Review before proposing times.')
  }

  async function proposeTimes() {
    setOutreach(await api.proposeOutreachSlots(company.id))
    setNotice('Free/busy checked. Slots are shown in the founder’s timezone (PT).')
  }

  async function confirm(slotId: string) {
    setOutreach(await api.confirmOutreachSlot(company.id, slotId))
    setNotice('Meeting created on Dana’s calendar and the investor has been notified.')
  }

  const sent = outreach.status !== 'draft' && outreach.status !== 'pending_approval'
  const hasReply = ['replied', 'awaiting_slot', 'event_created'].includes(outreach.status)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)]">
      <div className="space-y-5">
        <Card className="border-primary/20 bg-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-primary" /><Eyebrow>Founder outreach</Eyebrow></div>
              <h2 className="heading-md mt-2">{statusCopy[outreach.status]}</h2>
              <p className="mt-1 text-sm text-mute">AI suggests content; sending and calendar changes remain explicit actions.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bone px-3 py-1.5 text-xs font-semibold text-body"><ShieldCheck size={14} className="text-success" /> review-controlled</span>
          </div>
          {notice && <div className="mt-4 rounded-card border border-success/20 bg-success/10 px-3 py-2 text-sm text-body">{notice}</div>}
        </Card>

        <Card>
          <div className="flex items-center justify-between"><Eyebrow>Personalized draft</Eyebrow><span className="code-sm text-mute">grounded in 2 facts</span></div>
          <label className="mt-5 block caption text-mute" htmlFor="outreach-subject">Subject</label>
          <input id="outreach-subject" value={outreach.subject} onChange={(event) => setOutreach({ ...outreach, subject: event.target.value })} className="mt-1 w-full border-b border-hairline bg-transparent pb-2 text-base font-semibold text-ink outline-none focus:border-primary" />
          <label className="mt-5 block caption text-mute" htmlFor="outreach-body">Message</label>
          <textarea id="outreach-body" value={outreach.body} onChange={(event) => setOutreach({ ...outreach, body: event.target.value })} rows={10} className="mt-1 w-full resize-y rounded-card border border-hairline bg-canvas p-3 text-sm leading-6 text-body outline-none focus:border-primary" />
          <div className="mt-4 flex flex-wrap gap-3">
            <Pill onClick={saveDraft} disabled={saving}>{saving ? 'Saving…' : 'Save draft'}</Pill>
            {!sent && <Pill variant="primary" onClick={send}><Send size={15} /> Approve & send</Pill>}
            {outreach.status === 'sent' && <Pill variant="dark" onClick={simulateReply}><Sparkles size={15} /> Simulate reply</Pill>}
          </div>
        </Card>

        {hasReply && (
          <Card>
            <Eyebrow>Thread & scheduling</Eyebrow>
            <div className="mt-4 space-y-3">
              {outreach.thread.map((message) => (
                <div key={message.id} className={`rounded-card p-3 text-sm leading-6 ${message.direction === 'inbound' ? 'bg-bone text-body' : 'bg-dark text-on-dark'}`}>
                  <div className="caption mb-1 opacity-70">{message.direction === 'inbound' ? outreach.contact.name : 'Dana · Meridian'}</div>{message.body}
                </div>
              ))}
            </div>
            {outreach.status === 'replied' && <Pill className="mt-4" variant="primary" onClick={proposeTimes}><CalendarCheck size={15} /> Check calendar & propose times</Pill>}
            {outreach.status === 'awaiting_slot' && <div className="mt-5"><p className="text-sm text-body">Free/busy was checked without exposing other calendar details. Select a confirmed slot:</p><div className="mt-3 grid gap-2">{outreach.offeredSlots.map((slot) => <button type="button" key={slot.id} onClick={() => confirm(slot.id)} className="flex items-center justify-between rounded-card border border-hairline bg-canvas px-4 py-3 text-left text-sm font-semibold text-ink hover:border-primary"><span>{slot.label}</span><Check size={16} className="text-primary" /></button>)}</div></div>}
            {outreach.event && <div className="mt-5 flex gap-3 rounded-card bg-success/10 p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-success" size={18} /><div><p className="text-sm font-semibold text-ink">Calendar invite created</p><p className="mt-1 text-sm text-body">{outreach.event.title} · {new Date(outreach.event.startAt).toLocaleString(undefined, { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p><p className="mt-1 caption text-mute">Notification sent · {outreach.event.calendar}</p></div></div>}
          </Card>
        )}
      </div>

      <aside className="space-y-5 lg:sticky lg:top-4 lg:h-fit">
        <Card>
          <Eyebrow>Founder contact</Eyebrow>
          <h3 className="heading-sm mt-3">{outreach.contact.name}</h3>
          <p className="mt-1 text-sm text-body">{outreach.contact.role}</p>
          <p className="code-md mt-4 break-all text-ink">{outreach.contact.email}</p>
          <div className="mt-4 border-t border-hairline pt-4 text-sm text-mute"><p>{outreach.contact.source}</p><p className="mt-1 flex items-center gap-1.5"><CheckCircle2 size={14} className="text-success" /> Verified · {outreach.contact.confidence}% confidence</p></div>
        </Card>
        <Card className="bg-bone"><Eyebrow>Draft evidence</Eyebrow><ul className="mt-3 space-y-3">{outreach.personalizationFacts.map((fact) => <li key={fact} className="text-sm leading-5 text-body">· {fact}</li>)}</ul></Card>
        <Card className="bg-dark text-on-dark"><Eyebrow className="text-on-dark-mute">Automation policy</Eyebrow><p className="mt-3 text-sm leading-6 text-on-dark">Replies are classified automatically, but ambiguous replies and all external commitments stay in your review queue.</p></Card>
      </aside>
    </div>
  )
}