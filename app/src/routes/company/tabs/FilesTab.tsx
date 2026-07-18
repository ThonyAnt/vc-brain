import { useState } from 'react'
import { Download, FileSpreadsheet } from 'lucide-react'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import type { Company } from '../../../lib/types'

/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */

const WORKBOOKS = [
  {
    id: 'tam-exit',
    label: 'TAM + Exit',
    title: 'TAM + Revenue Build + Exit Model',
    description: 'Build market size, a two-year revenue plan, ownership dilution, and exit return scenarios.',
    fileName: 'TAM + Rev Build + Exit Model Template v7.xlsx',
    fileSize: '151 KB',
    href: '/models/tam-revenue-exit-model.xlsx',
    preview: '/models/previews/tam-revenue-exit-model.png',
    previewSheet: 'TAM',
    sheets: ['TAM', '2 year rev build', 'Exit Scenario', 'TAM Penetration Required'],
  },
  {
    id: 'comps',
    label: 'Comps',
    title: 'Comparable Companies Template',
    description: 'Organize transaction, public, and private comps alongside landscape and acquirer research.',
    fileName: 'Comps - Template-v3.xlsx',
    fileSize: '42 KB',
    href: '/models/comps-template.xlsx',
    preview: '/models/previews/comps-template.png',
    previewSheet: 'Transaction Comps',
    sheets: [
      'Transaction Comps',
      'Public Comps',
      'Private Comps',
      'Private Comps Descriptions',
      'Competitive Landscape Map',
      'Potential Acquirers',
      'Sheet1',
    ],
  },
  {
    id: 'landscape',
    label: 'Landscape',
    title: 'Competitive Landscape Template',
    description: 'Compare a company against up to fifteen competitors across product, buyer, moat, pricing, and funding.',
    fileName: 'Competitive Landscape Excel Template.xlsx',
    fileSize: '55 KB',
    href: '/models/competitive-landscape-template.xlsx',
    preview: '/models/previews/competitive-landscape-template.png',
    previewSheet: 'Final Competitive Landscape',
    sheets: ['Final Competitive Landscape'],
  },
] as const

type WorkbookId = (typeof WORKBOOKS)[number]['id']

export function FilesTab({ company }: { company: Company }) {
  const [activeId, setActiveId] = useState<WorkbookId>('tam-exit')
  const activeWorkbook = WORKBOOKS.find((workbook) => workbook.id === activeId) ?? WORKBOOKS[0]

  return (
    <section aria-labelledby="model-library-title">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-hairline-strong pb-5">
        <div>
          <Eyebrow>Model library · {WORKBOOKS.length} editable files</Eyebrow>
          <h2 id="model-library-title" className="display-md mt-2">Diligence workbooks</h2>
          <p className="mt-2 max-w-[680px] text-base text-charcoal">
            Preview a template, then download a working copy to model {company.name} in Excel.
          </p>
        </div>

        <a
          href={activeWorkbook.href}
          download={activeWorkbook.fileName}
          className="caption-tight inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border-2 border-hairline-strong bg-primary px-4 text-on-primary shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus"
        >
          <Download aria-hidden="true" size={18} strokeWidth={2.5} />
          Download .xlsx
        </a>
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
              className={`caption-tight min-h-12 min-w-[156px] flex-1 whitespace-nowrap border-2 border-hairline-strong px-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus ${
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
              <span className="code-sm text-charcoal">XLSX · {activeWorkbook.fileSize}</span>
            </div>
            <h3 className="heading-md mt-3">{activeWorkbook.title}</h3>
            <p className="mt-2 text-base text-body">{activeWorkbook.description}</p>
          </div>
          <div className="border-2 border-hairline-strong bg-bone px-3 py-2 text-right">
            <Eyebrow>Previewing sheet</Eyebrow>
            <div className="code-md mt-1 text-ink">{activeWorkbook.previewSheet}</div>
          </div>
        </div>

        <div className="overflow-x-auto bg-bone p-3 md:p-5">
          <div className="min-w-[900px] overflow-hidden border-2 border-hairline-strong bg-white">
            <img
              key={activeWorkbook.preview}
              src={activeWorkbook.preview}
              alt={`${activeWorkbook.previewSheet} worksheet preview from ${activeWorkbook.title}`}
              className="block h-auto w-full"
            />
          </div>
        </div>

        <div className="border-t-2 border-hairline-strong p-5 md:p-6">
          <Eyebrow>Workbook contents · {activeWorkbook.sheets.length} {activeWorkbook.sheets.length === 1 ? 'sheet' : 'sheets'}</Eyebrow>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeWorkbook.sheets.map((sheet) => (
              <span key={sheet} className="code-sm border border-hairline-strong bg-card px-2.5 py-1.5 text-ink">
                {sheet}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
