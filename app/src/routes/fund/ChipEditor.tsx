import { useState, type KeyboardEvent } from 'react'

interface ChipEditorProps {
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  /** Match the read-only tag tone (ink for sectors, charcoal for geographies). */
  tone?: 'ink' | 'charcoal'
}

/**
 * Add/remove list of free-text chips, styled to match the read-only tag row on
 * the fund profile. Enter or comma commits the input; ✕ removes a chip.
 * Duplicates (case-insensitive) and blanks are ignored.
 */
export function ChipEditor({ values, onChange, placeholder = 'Add…', tone = 'ink' }: ChipEditorProps) {
  const [draft, setDraft] = useState('')
  const text = tone === 'ink' ? 'text-ink' : 'text-charcoal'

  const add = () => {
    const v = draft.trim()
    if (!v) return
    if (!values.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...values, v])
    setDraft('')
  }
  const remove = (v: string) => onChange(values.filter((x) => x !== v))
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add()
    } else if (e.key === 'Backspace' && !draft && values.length) {
      remove(values[values.length - 1])
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {values.map((v) => (
        <span
          key={v}
          className={`inline-flex items-center gap-1 rounded-none border border-hairline-strong bg-canvas px-2.5 py-1 caption ${text}`}
        >
          {v}
          <button
            type="button"
            aria-label={`Remove ${v}`}
            onClick={() => remove(v)}
            className="ml-0.5 cursor-pointer text-charcoal hover:text-primary"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={add}
        placeholder={placeholder}
        className="min-w-[8rem] flex-1 rounded-none border border-dashed border-hairline-strong bg-transparent px-2.5 py-1 caption text-ink outline-none focus:border-solid focus:border-ink"
      />
    </div>
  )
}
