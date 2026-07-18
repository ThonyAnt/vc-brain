import { useEffect } from 'react'
import { useAppStore } from '../../state/store'
import { Eyebrow } from '../ui/Eyebrow'

/* Shows the "fund updated its thinking" note after any feedback action. */
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
    <div className="fixed bottom-6 left-1/2 z-50 w-[480px] -translate-x-1/2 rounded-card border border-sunset/50 bg-card px-4 py-3">
      <Eyebrow className="mb-1 text-sunset">Brain updated</Eyebrow>
      <div className="text-sm text-body">{note}</div>
    </div>
  )
}
