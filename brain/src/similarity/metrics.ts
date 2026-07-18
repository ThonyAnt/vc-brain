/** Low-level similarity metrics. All pure, deterministic, no LLM. */

const norm = (s: string) => s.trim().toLowerCase();

function toSet(labels: string[]): Set<string> {
  return new Set(labels.map(norm).filter((s) => s.length > 0));
}

/** Multi-label Jaccard: |A ∩ B| / |A ∪ B|. Both-empty -> 0 (no shared info). */
export function jaccard(a: string[], b: string[]): number {
  const sa = toSet(a);
  const sb = toSet(b);
  if (sa.size === 0 && sb.size === 0) return 0;
  let inter = 0;
  for (const x of sa) if (sb.has(x)) inter++;
  const union = sa.size + sb.size - inter;
  return union === 0 ? 0 : inter / union;
}

/** Cosine similarity of two equal-length vectors. Zero vector -> 0. */
export function cosine(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

const WORD_RE = /[^a-z0-9]+/;
const STOPWORDS = new Set(["the", "a", "an", "of", "for", "to", "and", "in", "on", "with"]);

function words(text: string, dropStop = false): Set<string> {
  const out = new Set<string>();
  for (const w of norm(text).split(WORD_RE)) {
    if (w.length === 0) continue;
    if (dropStop && STOPWORDS.has(w)) continue;
    out.add(w);
  }
  return out;
}

/**
 * Categorical partial match. Exact -> 1. Otherwise word-level Jaccard capped
 * at 0.8 so related-but-distinct categories score below an exact match.
 * (e.g. "enterprise sales" vs "founder-led enterprise sales").
 */
export function categoricalSimilarity(a: string, b: string): number {
  const na = norm(a);
  const nb = norm(b);
  if (na.length === 0 || nb.length === 0) return 0;
  if (na === nb) return 1;
  const wa = words(na);
  const wb = words(nb);
  let inter = 0;
  for (const x of wa) if (wb.has(x)) inter++;
  const union = wa.size + wb.size - inter;
  const wordJ = union === 0 ? 0 : inter / union;
  return Math.min(0.8, wordJ);
}

/** Word-set Jaccard over free text (stopwords dropped). Fallback when no embeddings. */
export function textTokenJaccard(a: string, b: string): number {
  const wa = words(a, true);
  const wb = words(b, true);
  if (wa.size === 0 || wb.size === 0) return 0;
  let inter = 0;
  for (const x of wa) if (wb.has(x)) inter++;
  const union = wa.size + wb.size - inter;
  return union === 0 ? 0 : inter / union;
}
