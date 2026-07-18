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

        <div className={`caption mt-5 inline-block rounded-none border-2 border-hairline-strong px-2.5 py-1 ${recommend ? 'bg-success text-ink' : 'bg-bone text-ink'}`}>
          {recommend ? 'Recommend: advance to partner meeting' : 'Recommend: watch, do not advance'}
        </div>

        <h3 className="heading-sm mt-7">Thesis</h3>
        <p className="mt-2 text-body">{company.summary}</p>

        {company.analogues.length > 0 && (
          <>
            <h3 className="heading-sm mt-6">Precedent</h3>
            <ul className="mt-2 space-y-1.5">
              {company.analogues.map((an) => (
                <li key={an.companyId} className="text-base text-body">
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
              <div key={f.id} className="mt-3">
                <div className="caption-tight text-ink">
                  {f.name} · {f.role} · score {f.score}
                </div>
                <p className="mt-1 text-base text-body">
                  {f.background} {f.justification}
                </p>
              </div>
            ))}
          </>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="heading-sm text-success">For</h3>
            <ul className="mt-2 space-y-1.5">
              {company.reasonsToInvest.map((r) => (
                <li key={r} className="text-base text-body">· {r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="heading-sm text-ink">Against</h3>
            <ul className="mt-2 space-y-1.5">
              {company.reasonsToPass.map((r) => (
                <li key={r} className="text-base text-body">· {r}</li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="heading-sm mt-6">Open diligence</h3>
        <ul className="mt-2 space-y-1.5">
          {company.diligenceQuestions.map((q) => (
            <li key={q} className="text-sm text-charcoal">→ {q}</li>
          ))}
        </ul>

        <div className="mt-8 border-t border-hairline pt-4">
          <Eyebrow>drafted by fund brain · format learned from 34 meridian memos · edit before circulating</Eyebrow>
        </div>
      </Card>
    </div>
  )
}
