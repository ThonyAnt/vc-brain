import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import type { Company, Founder } from '../../../lib/types'

/* Draft IC memo generated from the analysis fields, in the fund's memo format. */
export function MemoTab({ company, founders }: { company: Company; founders: Founder[] }) {
  const recommend = company.fitScore >= 80

  return (
    <div className="mx-auto max-w-[760px]">
      <Card className="p-8">
        <div className="flex items-baseline justify-between">
          <Eyebrow>Investment memo · draft</Eyebrow>
          <Eyebrow>{new Date().toISOString().slice(0, 10)}</Eyebrow>
        </div>
        <h2 className="display-md mt-3">
          {company.name} — {company.stage}
        </h2>
        <p className="mt-1 text-sm text-charcoal">
          {company.sector} · {company.location} {company.raising ? `· ${company.raising}` : ''}
        </p>

        <div className={`caption-tight mt-5 inline-block rounded-full px-4 py-2 ${recommend ? 'bg-success text-on-dark' : 'bg-bone text-ink'}`}>
          {recommend ? 'Recommend: advance to partner meeting' : 'Recommend: watch, do not advance'}
        </div>

        <h3 className="heading-sm mt-7">Thesis</h3>
        <p className="mt-2 leading-relaxed text-body">{company.summary}</p>

        {company.analogues.length > 0 && (
          <>
            <h3 className="heading-sm mt-6">Precedent</h3>
            <ul className="mt-2 space-y-1.5">
              {company.analogues.map((an) => (
                <li key={an.companyId} className="text-[15px] leading-relaxed text-body">
                  · {an.note}
                </li>
              ))}
            </ul>
          </>
        )}

        {founders.length > 0 && (
          <>
            <h3 className="heading-sm mt-6">Team</h3>
            {founders.map((f) => (
              <p key={f.id} className="mt-2 text-[15px] leading-relaxed text-body">
                <span className="font-semibold">{f.name}</span> ({f.role}, score {f.score}) — {f.background}{' '}
                {f.justification}
              </p>
            ))}
          </>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="heading-sm text-success">For</h3>
            <ul className="mt-2 space-y-1.5">
              {company.reasonsToInvest.map((r) => (
                <li key={r} className="text-[15px] leading-relaxed text-body">· {r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="heading-sm text-primary">Against</h3>
            <ul className="mt-2 space-y-1.5">
              {company.reasonsToPass.map((r) => (
                <li key={r} className="text-[15px] leading-relaxed text-body">· {r}</li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="heading-sm mt-6">Open diligence</h3>
        <ul className="mt-2 space-y-1.5">
          {company.diligenceQuestions.map((q) => (
            <li key={q} className="font-mono text-[13px] leading-relaxed text-charcoal">→ {q}</li>
          ))}
        </ul>

        <div className="mt-8 border-t border-hairline pt-4">
          <Eyebrow>drafted by fund brain · format learned from 34 meridian memos · edit before circulating</Eyebrow>
        </div>
      </Card>
    </div>
  )
}
