import { useEffect } from 'react'
import { useAppStore } from '../../state/store'

/* Dark-inversion toast: the "fund updated its thinking" note after feedback. */
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
    <div className="fixed bottom-6 left-1/2 z-50 flex max-w-[560px] -translate-x-1/2 items-center gap-3 rounded-full bg-dark px-5 py-3 text-on-dark">
      <span className="eyebrow shrink-0 text-hero-glow">Brain updated</span>
      <span className="text-sm leading-tight">{note}</span>
    </div>
  )
}
