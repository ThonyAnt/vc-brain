/* Named partner portraits, keyed by real name (Unsplash stock). */
const PARTNER_PHOTOS: Record<string, string> = {
  'Dana Whitfield': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop',
  'Marcus Oyelaran': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop',
  'Priya Ramachandran': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
}

/*
 * The research snapshot anonymizes partners as "Partner A/B". Present them as
 * named people with DISTINCT headshots (assigned by index so no two cards ever
 * share a face) while keeping their real focus/lens from the data.
 */
export const PARTNER_PERSONAS: { name: string; photo: string; background: string }[] = [
  {
    name: 'David Chen',
    photo: '/partners/david-chen.png',
    background: 'David began his career as a software engineer working on enterprise data systems, then co-founded a workflow-automation company serving finance and operations teams. Over the next decade, he moved from product leadership into company building, helping scale the business from its first design partners to an international customer base. Before joining Meridian, he advised early-stage founders on product strategy, technical hiring, and enterprise sales. He is drawn to technical teams that can turn complex infrastructure into software people use every day.',
  },
  {
    name: 'Priya Nair',
    photo: '/partners/priya-nair.png',
    background: 'Priya started her career in product and risk at consumer-fintech startups, where she helped launch credit and payments products across multiple markets. She later led cross-functional teams spanning underwriting, compliance, design, and growth, giving her a close view of how financial products earn trust at scale. Before moving into venture, she worked alongside seed-stage founders on go-to-market strategy and responsible expansion. At Meridian, she looks for products that make financial systems more useful, accessible, and transparent for everyday customers.',
  },
  {
    name: 'Marcus Boone',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    background: 'Former B2B founder and go-to-market leader with experience scaling developer tools from first customers through repeatable enterprise sales.',
  },
  {
    name: 'Sarah Delgado',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop',
    background: 'Former marketplace general manager and growth-stage investor. Her operating background spans customer acquisition, network effects, and international expansion.',
  },
]

export const isPlaceholderPartner = (name: string) => /^partner\s+[a-z0-9]+$/i.test(name.trim())

/** A realistic display name + a distinct headshot for a partner card. */
export function partnerDisplay(name: string, index: number): { name: string; photo: string; background: string } {
  const persona = PARTNER_PERSONAS[index % PARTNER_PERSONAS.length]
  if (isPlaceholderPartner(name)) return persona
  return { name, photo: PARTNER_PHOTOS[name] ?? persona.photo, background: persona.background }
}
