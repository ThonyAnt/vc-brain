import { useState } from 'react'
import type { Founder } from '../../lib/types'

/*
 * Founder headshot. Real photo when the scout resolved one (photoUrl);
 * placeholder portraits only for the fictional fixture founders (`f-mara`
 * style ids) — a real person (scouted `fd_…` or a web-sourced company's
 * `f-co_…-N`) never gets a stranger's stock face, they get initials.
 * Initials also cover load failures (licdn URLs expire after a while).
 */
export function FounderAvatar({ founder, size = 14 }: { founder: Founder; size?: 9 | 14 }) {
  const [broken, setBroken] = useState(false)
  const initials = founder.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
  const box = size === 9 ? 'h-9 w-9' : 'h-14 w-14'
  const isFixture = /^f-[a-z]+$/.test(founder.id)
  const src = founder.photoUrl ?? (isFixture ? `https://i.pravatar.cc/112?u=${founder.id}` : undefined)
  return broken || !src ? (
    <div className={`flex ${box} shrink-0 items-center justify-center border-2 border-hairline-strong bg-secondary`}>
      <span className={`${size === 9 ? 'code-sm' : 'code-md'} font-bold text-ink`}>{initials}</span>
    </div>
  ) : (
    <img
      src={src}
      alt={founder.name}
      onError={() => setBroken(true)}
      className={`${box} shrink-0 border-2 border-hairline-strong object-cover`}
    />
  )
}
