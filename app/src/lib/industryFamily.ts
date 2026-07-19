/** Collapse hyper-specific sector labels into filter-friendly market families. */
export function industryFamily(sector: string): string {
  const text = sector.trim()
  if (!text) return 'Other'

  if (/health|medical|medicine|clinical|payer|telehealth|maternity|nutrition|behavioral/i.test(text)) return 'Healthcare'
  if (/fintech|payment|wallet|banking|insurance|embedded finance|cross-border|financial/i.test(text)) return 'Fintech'
  if (/cyber|security|soc\b/i.test(text)) return 'Cybersecurity'
  if (/climate|energy|carbon|cleantech|renewable/i.test(text)) return 'Climate & Energy'
  if (/robot|logistics|supply chain|manufacturing|industrial/i.test(text)) return 'Robotics & Logistics'
  if (/education|learning|k-12|edtech/i.test(text)) return 'Education'
  if (/consumer|social|irl|creator economy/i.test(text)) return 'Consumer'
  if (/future of work|creator tools|hr technology|recruiting|interview/i.test(text)) return 'Future of Work'
  if (/data infrastructure/i.test(text)) return 'Data Infrastructure'
  if (/ai infrastructure|developer tools|developer infrastructure/i.test(text)) return 'AI Infrastructure'
  if (/enterprise ai|vertical ai|smb ai|ai agents?|ai productivity|ai search|ai automation|ai platform/i.test(text)) return 'Enterprise AI'
  if (/erp|enterprise resource|sales|marketing|customer support|billing|revenue operations|b2b saas|enterprise software/i.test(text)) {
    return 'Enterprise Software'
  }

  const head = text.split(/[/,(]/)[0]?.replace(/\s+and\s+.*$/i, '').trim()
  return head || 'Other'
}
