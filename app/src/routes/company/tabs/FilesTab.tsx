import { useEffect, useState } from 'react'
import { Download, FileSpreadsheet } from 'lucide-react'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import type { Company } from '../../../lib/types'
import { api, type CompanyWorkbookKind, type CompanyWorkbookPreview } from '../../../lib/api/client'

/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */

const WORKBOOKS = [
  {
    id: 'tam-exit',
    label: 'TAM + Exit',
    title: 'TAM + Revenue Build + Exit Model',
    description: 'Build market size, a two-year revenue plan, ownership dilution, and exit return scenarios.',
    blankHref: '/models/tam-revenue-exit-model-blank.xlsx',
  },
  {
    id: 'landscape',
    label: 'Landscape',
    title: 'Competitive Landscape Template',
    description: 'Compare a company against up to fifteen competitors across product, buyer, moat, pricing, and funding.',
    blankHref: '/models/competitive-landscape-template-blank.xlsx',
  },
] as const

type WorkbookId = CompanyWorkbookKind

function formatValue(label: string, value: string | number | null) {
  if (value === null || value === '') return 'Input required'
  if (typeof value !== 'number') return value
  const lower = label.toLowerCase()
  if (lower.includes('arr') || lower.includes('valuation') || lower.includes('investment')) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }
  if (lower.includes('growth')) return `${value}%`
  if (lower.includes('multiple')) return `${value}x`
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)
}

export function FilesTab({ company }: { company: Company }) {
  const [activeId, setActiveId] = useState<WorkbookId>('tam-exit')
  const [preview, setPreview] = useState<CompanyWorkbookPreview | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const activeWorkbook = WORKBOOKS.find((workbook) => workbook.id === activeId) ?? WORKBOOKS[0]

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    api.getCompanyWorkbookPreview(company, activeId).then((nextPreview) => {
      if (cancelled) return
      setPreview(nextPreview)
      setLoading(false)
      if (!nextPreview) setError('The Brain API is required to generate company-specific files.')
    })
    return () => {
      cancelled = true
    }
  }, [activeId, company])

  async function downloadGeneratedWorkbook() {
    setDownloading(true)
    setError(null)
    const downloaded = await api.downloadCompanyWorkbook(company, activeId)
    setDownloading(false)
    if (!downloaded) setError('Generation failed. Download the blank template or restart the Brain API and try again.')
  }

  return (
    <section aria-labelledby="model-library-title">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-hairline-strong pb-5">
        <div>
          <Eyebrow>Company model library · {WORKBOOKS.length} generated files</Eyebrow>
          <h2 id="model-library-title" className="display-md mt-2">Diligence workbooks</h2>
          <p className="mt-2 max-w-[680px] text-base text-charcoal">
            Review exactly what is known versus missing, then generate an editable workbook for {company.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadGeneratedWorkbook}
          disabled={downloading}
          className="caption-tight inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border-2 border-hairline-strong bg-primary px-4 text-on-primary shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus"
        >
          <Download aria-hidden="true" size={18} strokeWidth={2.5} />
          {downloading ? 'Generating…' : `Generate ${company.name} .xlsx`}
        </button>
      </div>

      <div
        className="mt-5 flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Choose a workbook preview"
      >
        {WORKBOOKS.map((workbook, index) => {
          const selected = workbook.id === activeWorkbook.id
          return (
            <button
              key={workbook.id}
              id={`workbook-tab-${workbook.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="workbook-preview"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(workbook.id)}
              className={`caption-tight min-h-12 min-w-[190px] flex-1 whitespace-nowrap border-2 border-hairline-strong px-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus ${
                selected
                  ? 'bg-dark text-on-dark shadow-brutal-sm'
                  : 'bg-card text-ink hover:bg-secondary'
              }`}
            >
              <span className="code-sm mr-3 opacity-70">0{index + 1}</span>
              {workbook.label}
            </button>
          )
        })}
      </div>

      <div
        id="workbook-preview"
        role="tabpanel"
        aria-labelledby={`workbook-tab-${activeWorkbook.id}`}
        className="mt-4 border-2 border-hairline-strong bg-card shadow-brutal"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-hairline-strong p-5 md:p-6">
          <div className="max-w-[760px]">
            <div className="flex items-center gap-2">
              <FileSpreadsheet aria-hidden="true" size={20} strokeWidth={2.5} />
              <span className="code-sm text-charcoal">XLSX · generated on demand</span>
            </div>
            <h3 className="heading-md mt-3">{activeWorkbook.title}</h3>
            <p className="mt-2 text-base text-body">{activeWorkbook.description}</p>
          </div>
          <div className="border-2 border-hairline-strong bg-bone px-3 py-2 text-right">
            <Eyebrow>Previewing sheet</Eyebrow>
            <div className="code-md mt-1 text-ink">{preview?.previewSheet ?? '—'}</div>
          </div>
        </div>

        <div className="bg-bone p-3 md:p-5">
          {loading && (
            <div className="code-md border-2 border-hairline-strong bg-card p-8">Building company-specific preview…</div>
          )}
          {!loading && error && (
            <div className="border-2 border-hairline-strong bg-secondary p-5">
              <p className="caption-tight">{error}</p>
              <a className="caption-tight mt-3 inline-block text-primary underline" href={activeWorkbook.blankHref} download>
                Download blank template →
              </a>
            </div>
          )}
          {!loading && preview && (
            <div className="overflow-x-auto border-2 border-hairline-strong bg-card">
              <table className="w-full min-w-[860px] border-collapse text-left">
                <thead>
                  <tr className="bg-dark text-on-dark">
                    <th className="caption-tight border-r border-divider-dark px-4 py-3">Field</th>
                    {preview.columns.map((column) => (
                      <th key={column} className="caption-tight border-r border-divider-dark px-4 py-3 last:border-r-0">{column}</th>
                    ))}
                    <th className="caption-tight px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, rowIndex) => (
                    <tr key={row.label} className={rowIndex % 2 ? 'bg-bone' : 'bg-card'}>
                      <th className="caption-tight border-r border-t border-hairline-strong px-4 py-3 align-top">{row.label}</th>
                      {row.values.map((value, valueIndex) => (
                        <td
                          key={`${row.label}-${valueIndex}`}
                          className={`code-sm border-r border-t border-hairline-strong px-4 py-3 align-top last:border-r-0 ${value === null || value === '' ? 'bg-secondary' : ''}`}
                        >
                          {formatValue(row.label, value)}
                        </td>
                      ))}
                      {Array.from({ length: Math.max(0, preview.columns.length - row.values.length) }).map((_, blankIndex) => (
                        <td key={`${row.label}-blank-${blankIndex}`} className="code-sm border-r border-t border-hairline-strong bg-secondary px-4 py-3">Input required</td>
                      ))}
                      <td className="code-sm border-t border-hairline-strong px-4 py-3 align-top text-charcoal">{row.source ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="border-t-2 border-hairline-strong p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow>Workbook contents · {preview?.sheets.length ?? 0} sheets</Eyebrow>
            <a href={activeWorkbook.blankHref} download className="caption-tight whitespace-nowrap text-primary underline">
              Blank template ↓
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(preview?.sheets ?? []).map((sheet) => (
              <span key={sheet} className="code-sm border border-hairline-strong bg-card px-2.5 py-1.5 text-ink">
                {sheet}
              </span>
            ))}
          </div>
          {preview?.notes.map((note) => (
            <p key={note} className="code-sm mt-3 text-charcoal">→ {note}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
