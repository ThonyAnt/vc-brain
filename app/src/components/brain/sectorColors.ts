import { SECTOR_PALETTE } from './BrainCanvas'

/* Cluster order matches the market-node order in lib/mock/fixtures.ts */
const ORDER = ['B2B SaaS', 'Fintech infra', 'Healthcare data', 'Dev infra', 'Logistics', 'Security']

export function sectorColor(sector: string): string {
  const i = ORDER.indexOf(sector)
  return SECTOR_PALETTE[(i < 0 ? 0 : i) % SECTOR_PALETTE.length]
}
