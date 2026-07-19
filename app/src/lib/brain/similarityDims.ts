/*
 * Frontend mirror of brain/src/similarity/{metrics,taxonomy,compute}.ts —
 * the per-dimension similarity recipe, kept deterministic and dependency-free
 * so the snapshot path can draw similarity fingerprints offline. The problem
 * dimension uses the token-Jaccard fallback (same as the brain without
 * embeddings). If the brain's weights or metrics change, update this mirror.
 */

export interface SimilarityAttrs {
  industryPath?: string[]
  productCategoryPath?: string[]
  problemStatement?: string
  targetCustomers?: string[]
  technicalApproaches?: string[]
  businessModel?: string
  goToMarket?: string
  founderArchetypes?: string[]
  disruptionMechanisms?: string[]
  regulatoryLabels?: string[]
}

export const DIMENSION_LABELS: { key: string; label: string }[] = [
  { key: 'industry', label: 'Industry' },
  { key: 'problem', label: 'Problem' },
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'technical', label: 'Technical' },
  { key: 'businessModel', label: 'Biz model' },
  { key: 'goToMarket', label: 'GTM' },
  { key: 'founder', label: 'Founder' },
  { key: 'disruption', label: 'Disruption' },
  { key: 'regulatory', label: 'Regulatory' },
]

const norm = (s: string) => s.trim().toLowerCase()

const toSet = (labels: string[]) => new Set(labels.map(norm).filter((s) => s.length > 0))

function jaccard(a: string[] = [], b: string[] = []): number {
  const sa = toSet(a)
  const sb = toSet(b)
  if (sa.size === 0 && sb.size === 0) return 0
  let inter = 0
  for (const x of sa) if (sb.has(x)) inter++
  const union = sa.size + sb.size - inter
  return union === 0 ? 0 : inter / union
}

const WORD_RE = /[^a-z0-9]+/
const STOPWORDS = new Set(['the', 'a', 'an', 'of', 'for', 'to', 'and', 'in', 'on', 'with'])

function words(text: string, dropStop = false): Set<string> {
  const out = new Set<string>()
  for (const w of norm(text).split(WORD_RE)) {
    if (w.length === 0) continue
    if (dropStop && STOPWORDS.has(w)) continue
    out.add(w)
  }
  return out
}

function categoricalSimilarity(a = '', b = ''): number {
  const na = norm(a)
  const nb = norm(b)
  if (na.length === 0 || nb.length === 0) return 0
  if (na === nb) return 1
  const wa = words(na)
  const wb = words(nb)
  let inter = 0
  for (const x of wa) if (wb.has(x)) inter++
  const union = wa.size + wb.size - inter
  const wordJ = union === 0 ? 0 : inter / union
  return Math.min(0.8, wordJ)
}

function textTokenJaccard(a = '', b = ''): number {
  const wa = words(a, true)
  const wb = words(b, true)
  if (wa.size === 0 || wb.size === 0) return 0
  let inter = 0
  for (const x of wa) if (wb.has(x)) inter++
  const union = wa.size + wb.size - inter
  return union === 0 ? 0 : inter / union
}

function hierarchicalSimilarity(pathA: string[] = [], pathB: string[] = []): number {
  const a = pathA.map((s) => s.trim().toLowerCase()).filter(Boolean)
  const b = pathB.map((s) => s.trim().toLowerCase()).filter(Boolean)
  if (a.length === 0 || b.length === 0) return 0
  let common = 0
  const min = Math.min(a.length, b.length)
  for (let i = 0; i < min; i++) {
    if (a[i] === b[i]) common++
    else break
  }
  if (common === 0) return 0
  return common / Math.max(a.length, b.length)
}

export function similarityDimensions(a: SimilarityAttrs, b: SimilarityAttrs): Record<string, number> {
  return {
    industry: hierarchicalSimilarity(a.industryPath, b.industryPath),
    problem: textTokenJaccard(a.problemStatement, b.problemStatement),
    customer: jaccard(a.targetCustomers, b.targetCustomers),
    product: hierarchicalSimilarity(a.productCategoryPath, b.productCategoryPath),
    technical: jaccard(a.technicalApproaches, b.technicalApproaches),
    businessModel: categoricalSimilarity(a.businessModel, b.businessModel),
    goToMarket: categoricalSimilarity(a.goToMarket, b.goToMarket),
    founder: jaccard(a.founderArchetypes, b.founderArchetypes),
    disruption: jaccard(a.disruptionMechanisms, b.disruptionMechanisms),
    regulatory: jaccard(a.regulatoryLabels, b.regulatoryLabels),
  }
}
