import { useEffect, useRef, useState } from 'react'
import { AskInput } from '@/components/ui/ask-input'
import { api } from '../../lib/api/client'
import type { ChatMessage } from '../../lib/types'

/* Full-screen fund-brain chat. Empty state is the big ask prompt; once a
   question lands the page becomes a message thread with the input pinned. */
export function AnalystPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy])

  async function ask(question: string) {
    const next: ChatMessage[] = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setBusy(true)
    const reply = await api.chat(next, { route: '/analyst' })
    setMessages((m) => [...m, reply])
    setBusy(false)
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <AskInput title="Ask the fund brain" onSubmit={ask} className="max-w-2xl" />
        <p className="code-sm -mt-4 text-charcoal">
          institutional memory · 34 memos · 47 passes · 8 outcomes
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[820px] flex-col px-8 pt-6 pb-8">
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 pb-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-none border-2 border-hairline-strong p-4 text-sm ${
              m.role === 'user'
                ? 'ml-auto bg-dark text-on-dark shadow-brutal-sm'
                : 'bg-card text-ink shadow-brutal'
            }`}
          >
            {m.content}
          </div>
        ))}
        {busy && <div className="code-sm text-charcoal">thinking…</div>}
      </div>
      <AskInput onSubmit={ask} className="shrink-0" />
    </div>
  )
}
