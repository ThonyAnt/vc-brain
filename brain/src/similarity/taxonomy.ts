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
  const a = pathA.map((s) => s.trim().toLowerCase()).filter(Boolean);
  const b = pathB.map((s) => s.trim().toLowerCase()).filter(Boolean);
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
