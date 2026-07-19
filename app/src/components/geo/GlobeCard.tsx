import type { Company } from '../../lib/types'
import type { LatLng } from '../../lib/geo'
import { FUND_HQ, cityLatLng } from '../../lib/geo'
import { CompanyGlobe, type GlobeMarker } from './CompanyGlobe'

/*
 * Standing sourcing map on the brain page: neobrutal panel, always visible.
 * Hovering an inbox card rotates the globe to that company's city.
 */
export function GlobeCard({
  companies,
  focus,
  globeHeight = 'h-44',
}: {
  companies: Company[]
  focus?: LatLng | null
  globeHeight?: string
}) {
  const markers: GlobeMarker[] = [
    { ...FUND_HQ, kind: 'hq' as const },
    ...companies.flatMap((c) => {
      const ll = c.hqLatLng ?? cityLatLng(c.location)
      return ll
        ? [{ ...ll, label: c.name, city: c.location, kind: 'company' as const, logoUrl: c.logoUrl }]
        : []
    }),
  ]
  const cityCount = new Set(companies.map((c) => c.location)).size

  return (
    <div className="glass-panel pointer-events-auto w-full overflow-hidden">
      <div className="flex items-center justify-between border-b-2 border-hairline-strong px-3 py-2">
        <span className="code-sm uppercase tracking-[0.12em] text-ink">Sourcing map</span>
        <span className="code-sm text-charcoal">{cityCount}c</span>
      </div>
      <div className={`relative ${globeHeight}`}>
        <CompanyGlobe className="h-full w-full" markers={markers} focus={focus} />
      </div>
      <div className="border-t-2 border-hairline-strong px-3 py-1.5">
        <span className="code-sm text-charcoal">
          {companies.length} sourced · arcs from SF
        </span>
      </div>
    </div>
  )
}
