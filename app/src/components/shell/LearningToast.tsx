import { useEffect } from 'react'
import { useAppStore } from '../../state/store'

/* Glass-pill toast (final-mockup chrome): the "fund updated its thinking" note. */
export function LearningToast() {
  const note = useAppStore((s) => s.learningNote)
  const setNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    if (!note) return
    const t = setTimeout(() => setNote(null), 6000)
    return () => clearTimeout(t)
  }, [note, setNote])

  if (!note) return null
  return (
    <div className="glass-panel fixed bottom-6 left-1/2 z-50 flex max-w-[560px] -translate-x-1/2 items-center gap-3 rounded-full px-5 py-3">
      <span className="caption-tight shrink-0 text-success">Brain updated</span>
      <span className="text-sm text-ink">{note}</span>
    </div>
  )
}
