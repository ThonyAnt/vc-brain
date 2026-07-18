/** Lowercase, punctuation-collapsed slug for stable ids. */
export function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 40) || "x"
  );
}

export const normName = (s: string) => s.trim().toLowerCase();
