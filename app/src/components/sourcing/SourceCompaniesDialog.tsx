import { useState } from 'react'

export type SourceBrief = {
  count: number
  industries: string[]
  stages: string[]
  valuationMin: string
  valuationMax: string
  fundSize: string
  checkSize: string
  roundStatus: 'actively raising' | 'raising soon' | 'relationship building'
  geography: 'US only' | 'Worldwide' | 'Selected countries'
  countries: string[]
  minimumFit: number
}

type SourceCompaniesDialogProps = {
  onClose: () => void
  onSource: (brief: SourceBrief) => Promise<void>
}

const GENERIC_INDUSTRIES = [
  'AI & developer tools',
  'B2B SaaS',
  'Data infrastructure',
  'Fintech & payments',
  'Healthcare',
  'Climate & energy',
  'Robotics & industrial',
  'Cybersecurity',
  'Logistics & supply chain',
  'Consumer internet',
]
const FUNDING_STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E']
const COUNTRY_OPTIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'Netherlands',
  'Nordics',
  'Rest of Europe',
  'Australia & New Zealand',
  'India',
  'Singapore',
  'Other',
]

function ToggleList({ values, selected, onChange }: { values: string[]; selected: string[]; onChange: (next: string[]) => void }) {
  function toggle(value: string) {
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => {
        const active = selected.includes(value)
        return <button key={value} type="button" onClick={() => toggle(value)} className={`min-h-9 border-2 border-hairline-strong px-3 text-sm font-semibold transition-colors ${active ? 'bg-dark text-on-dark' : 'bg-card text-ink hover:bg-bone'}`}>{active ? '✓ ' : ''}{value}</button>
      })}
    </div>
  )
}

export function SourceCompaniesDialog({ onClose, onSource }: SourceCompaniesDialogProps) {
  const [count, setCount] = useState(25)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [stages, setStages] = useState<string[]>(['Pre-seed', 'Seed', 'Series A'])
  const [valuationMin, setValuationMin] = useState('5')
  const [valuationMax, setValuationMax] = useState('20')
  const [fundSize, setFundSize] = useState('250')
  const [checkSize, setCheckSize] = useState('1–3')
  const [roundStatus, setRoundStatus] = useState<SourceBrief['roundStatus']>('actively raising')
  const [geography, setGeography] = useState<SourceBrief['geography']>('US only')
  const [countries, setCountries] = useState<string[]>(['United States'])
  const [countryToAdd, setCountryToAdd] = useState('United Kingdom')
  const [minimumFit, setMinimumFit] = useState(70)
  const [submitting, setSubmitting] = useState(false)

  function toggleIndustry(industry: string) {
    setSelectedIndustries((previous) => previous.includes(industry) ? previous.filter((item) => item !== industry) : [...previous, industry])
  }

  function setGeographyScope(scope: SourceBrief['geography']) {
    setGeography(scope)
    if (scope === 'US only') setCountries(['United States'])
    if (scope === 'Worldwide') setCountries([])
  }

  function addCountry() {
    if (!countries.includes(countryToAdd)) setCountries((previous) => [...previous, countryToAdd])
    setGeography('Selected countries')
  }

  async function submit() {
    setSubmitting(true)
    await onSource({ count, industries: selectedIndustries, stages, valuationMin, valuationMax, fundSize, checkSize, roundStatus, geography, countries, minimumFit })
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep/45 p-4 py-8" role="dialog" aria-modal="true" aria-labelledby="source-companies-title">
      <div className="w-full max-w-[880px] border-2 border-hairline-strong bg-card shadow-[8px_8px_0_0_#000]">
        <header className="flex items-start justify-between gap-4 border-b-2 border-hairline-strong bg-bone px-6 py-5">
          <div><p className="code-sm uppercase text-mute">Source companies</p><h2 id="source-companies-title" className="heading-md mt-1">Set the sourcing brief</h2><p className="mt-1 text-sm text-body">The fund thesis ranks results after these hard constraints are applied.</p></div>
          <button type="button" onClick={onClose} className="h-9 w-9 border-2 border-hairline-strong bg-card text-xl leading-none hover:bg-bone" aria-label="Close sourcing brief">×</button>
        </header>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <section className="space-y-3">
            <span className="code-sm block uppercase text-mute">Companies to source</span>
            <input aria-label="Number of companies to source" type="number" min="1" max="200" value={count} onChange={(event) => setCount(Math.max(1, Number(event.target.value)))} className="h-11 w-full border-2 border-hairline-strong bg-card px-3 text-base text-ink" />
          </section>

          <section className="space-y-3">
            <span className="code-sm block uppercase text-mute">Minimum fund fit</span>
            <div className="relative"><input aria-label="Minimum fund fit" type="number" min="0" max="100" value={minimumFit} onChange={(event) => setMinimumFit(Math.min(100, Math.max(0, Number(event.target.value))))} className="h-11 w-full border-2 border-hairline-strong bg-card px-3 pr-9 text-base text-ink" /><span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg text-mute">+</span></div>
          </section>

          <section className="space-y-3 md:col-span-2">
            <div className="flex items-baseline justify-between gap-3"><span className="code-sm uppercase text-mute">Industries</span><span className="text-xs text-mute">Select none to use the broad fund thesis.</span></div>
            <details className="border-2 border-hairline-strong bg-card"><summary className="flex h-11 cursor-pointer items-center justify-between px-3 text-sm font-semibold text-ink">{selectedIndustries.length ? `${selectedIndustries.length} industries selected` : 'Choose industries'}<span>⌄</span></summary><div className="grid gap-2 border-t-2 border-hairline-strong p-3 sm:grid-cols-2">{GENERIC_INDUSTRIES.map((industry) => <label key={industry} className="flex cursor-pointer items-center gap-2 text-sm text-ink"><input type="checkbox" checked={selectedIndustries.includes(industry)} onChange={() => toggleIndustry(industry)} className="h-4 w-4 accent-primary" />{industry}</label>)}</div></details>
          </section>

          <section className="space-y-3 md:col-span-2"><span className="code-sm block uppercase text-mute">Investment stage</span><ToggleList values={FUNDING_STAGES} selected={stages} onChange={setStages} /></section>

          <section className="space-y-3"><span className="code-sm block uppercase text-mute">Valuation / cap range</span><div className="grid grid-cols-2 gap-2"><label className="text-sm text-body">Min ($M)<input value={valuationMin} onChange={(event) => setValuationMin(event.target.value)} inputMode="decimal" className="mt-1 h-11 w-full border-2 border-hairline-strong bg-card px-3 text-ink" /></label><label className="text-sm text-body">Max ($M)<input value={valuationMax} onChange={(event) => setValuationMax(event.target.value)} inputMode="decimal" className="mt-1 h-11 w-full border-2 border-hairline-strong bg-card px-3 text-ink" /></label></div></section>

          <section className="space-y-3"><span className="code-sm block uppercase text-mute">Fund capacity</span><div className="grid grid-cols-2 gap-2"><label className="text-sm text-body">Fund size ($M)<input value={fundSize} onChange={(event) => setFundSize(event.target.value)} inputMode="decimal" className="mt-1 h-11 w-full border-2 border-hairline-strong bg-card px-3 text-ink" /></label><label className="text-sm text-body">Initial check ($M)<input value={checkSize} onChange={(event) => setCheckSize(event.target.value)} className="mt-1 h-11 w-full border-2 border-hairline-strong bg-card px-3 text-ink" /></label></div></section>

          <section className="space-y-3"><span className="code-sm block uppercase text-mute">Round status</span><select value={roundStatus} onChange={(event) => setRoundStatus(event.target.value as SourceBrief['roundStatus'])} className="h-11 w-full border-2 border-hairline-strong bg-card px-3 text-base text-ink"><option value="actively raising">Actively fundraising now</option><option value="raising soon">Raising in the next 3 months</option><option value="relationship building">Relationship building only</option></select></section>

          <section className="space-y-3"><span className="code-sm block uppercase text-mute">Geography</span><div className="flex flex-wrap gap-2">{(['US only', 'Worldwide', 'Selected countries'] as const).map((option) => <button key={option} type="button" onClick={() => setGeographyScope(option)} className={`h-10 border-2 border-hairline-strong px-3 text-sm font-semibold ${geography === option ? 'bg-dark text-on-dark' : 'bg-card text-ink hover:bg-bone'}`}>{option}</button>)}</div><div className="mt-2 flex gap-2"><select value={countryToAdd} onChange={(event) => setCountryToAdd(event.target.value)} className="h-10 min-w-0 flex-1 border-2 border-hairline-strong bg-card px-2 text-sm text-ink"><option value="">Choose a country / region</option>{COUNTRY_OPTIONS.map((country) => <option key={country} value={country}>{country}</option>)}</select><button type="button" disabled={!countryToAdd} onClick={addCountry} className="h-10 border-2 border-hairline-strong bg-card px-3 text-sm font-semibold hover:bg-bone disabled:opacity-40">Add</button></div>{geography === 'Selected countries' && <div className="flex flex-wrap gap-1.5">{countries.map((country) => <button type="button" key={country} onClick={() => setCountries((previous) => previous.filter((item) => item !== country))} className="border border-hairline-strong bg-bone px-2 py-1 text-xs text-ink">{country} ×</button>)}</div>}</section>
        </div>

        <footer className="flex flex-wrap justify-end gap-3 border-t-2 border-hairline-strong bg-bone px-6 py-4"><button type="button" onClick={onClose} className="h-11 border-2 border-hairline-strong bg-card px-5 text-sm font-semibold text-ink hover:bg-bone">Cancel</button><button type="button" onClick={submit} disabled={submitting || stages.length === 0} className="h-11 border-2 border-hairline-strong bg-primary px-5 text-sm font-semibold text-on-primary disabled:cursor-not-allowed disabled:bg-stone">{submitting ? 'Sourcing…' : `Source ${count} companies →`}</button></footer>
      </div>
    </div>
  )
}
