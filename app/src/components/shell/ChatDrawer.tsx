import { useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { api } from '../../lib/api/client'
import type { ChatMessage } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Eyebrow } from '../ui/Eyebrow'
import { Pill } from '../ui/Pill'

export function ChatDrawer() {
  const open = useAppStore((s) => s.chatOpen)
  const location = useLocation()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'I am the fund analyst. Ask why a company surfaced, how it compares to past decisions, or upload a deck.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const companyId = location.pathname.startsWith('/company/') ? location.pathname.split('/')[2] : undefined

  async function send(text: string) {
    if (!text.trim() || busy) return
    const next: ChatMessage[] = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setInput('')
    setBusy(true)
    const reply = await api.chat(next, { route: location.pathname, companyId })
    setMessages((m) => [...m, reply])
    setBusy(false)
  }

  function onFile(file: File) {
    setMessages((m) => [
      ...m,
      { role: 'user', content: `Uploaded: ${file.name}` },
      {
        role: 'assistant',
        content: `Parsing ${file.name}… deck ingestion is stubbed in this build. In the full flow this creates a company node, runs the analysis, and places it in the brain next to its analogues.`,
      },
    ])
  }

  return (
    <aside className="flex w-90 shrink-0 flex-col border-l border-hairline bg-canvas">
      <div className="flex h-15 items-center justify-between border-b border-hairline px-4">
        <span className="caption-tight text-ink">Fund Analyst</span>
        {companyId && <Eyebrow>ctx: {companyId.replace(/^s-|^p-|^r-/, '')}</Eyebrow>}
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-card px-3 py-2 text-sm leading-normal ${
              m.role === 'user' ? 'ml-auto bg-bone text-ink' : 'border border-hairline bg-card text-body'
            }`}
          >
            {m.content}
          </div>
        ))}
        {busy && <Eyebrow className="text-ash">thinking…</Eyebrow>}
      </div>
      <div className="border-t border-hairline p-3">
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          <button
            onClick={() => fileRef.current?.click()}
            title="Upload deck"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline bg-card text-ink hover:bg-bone"
          >
            +
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask the brain…"
            className="h-11 w-full rounded-full border border-hairline bg-card px-5 text-sm text-ink placeholder:text-ash focus:outline-3 focus:outline-ring-focus"
          />
          <Pill variant="primary" onClick={() => send(input)}>
            →
          </Pill>
        </div>
      </div>
    </aside>
  )
}
