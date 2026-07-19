/**
 * Hierarchical taxonomy similarity for root->leaf category paths.
 * Companies sharing a deeper prefix are more similar. Sharing no root -> 0.
 *
 * score = commonPrefixLength / max(depthA, depthB)
 *   identical paths                       -> 1.0
 *   same parent, different leaf (3 vs 3)  -> 2/3
 *   same root only (2 vs 2)               -> 1/2
 *   different roots                       -> 0
 */
export function hierarchicalSimilarity(pathA: string[], pathB: string[]): number {
  const a = pathA.map((s, index) => normalizeTaxonomyLabel(s, index)).filter(Boolean);
  const b = pathB.map((s, index) => normalizeTaxonomyLabel(s, index)).filter(Boolean);
  if (a.length === 0 || b.length === 0) return 0;

  let common = 0;
  const min = Math.min(a.length, b.length);
  for (let i = 0; i < min; i++) {
    if (a[i] === b[i]) common++;
    else break;
  }
  if (common === 0) return 0;
  return common / Math.max(a.length, b.length);
}

/**
 * Normalize broad industry synonyms inside the existing industry dimension.
 * This is deliberately conservative: only roots with a clear shared market
 * family are folded together, so Healthcare/Medicine/Fitness/Wellness gain
 * affinity without inventing a second similarity metric.
 */
function normalizeTaxonomyLabel(value: string, depth: number): string {
  const label = value.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
  if (depth !== 0) return label;
  if (/^(health|healthcare|medical|medicine|fitness|wellness|consumer health)$/.test(label)) {
    return "health & wellness";
  }
  if (/^(finance|financial services|fintech|banking)$/.test(label)) return "financial services";
  return label;
}
