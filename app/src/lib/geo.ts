export interface LatLng {
  lat: number
  lng: number
}

/** Fund HQ (Meridian) — arcs on the sourcing globe originate here. */
export const FUND_HQ: LatLng = { lat: 37.7749, lng: -122.4194 } // San Francisco

/** Coordinates for every city used in fixtures' `location` fields. */
const CITY_COORDS: Record<string, LatLng> = {
  'San Francisco': { lat: 37.7749, lng: -122.4194 },
  'New York': { lat: 40.7128, lng: -74.006 },
  Boston: { lat: 42.3601, lng: -71.0589 },
  Chicago: { lat: 41.8781, lng: -87.6298 },
  Toronto: { lat: 43.6532, lng: -79.3832 },
  Seattle: { lat: 47.6062, lng: -122.3321 },
  London: { lat: 51.5074, lng: -0.1278 },
  Denver: { lat: 39.7392, lng: -104.9903 },
  Berlin: { lat: 52.52, lng: 13.405 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  Austin: { lat: 30.2672, lng: -97.7431 },
  Nashville: { lat: 36.1627, lng: -86.7816 },
  Atlanta: { lat: 33.749, lng: -84.388 },
  Phoenix: { lat: 33.4484, lng: -112.074 },
  Miami: { lat: 25.7617, lng: -80.1918 },
  Paris: { lat: 48.8566, lng: 2.3522 },
  Amsterdam: { lat: 52.3676, lng: 4.9041 },
  Stockholm: { lat: 59.3293, lng: 18.0686 },
}

/* Country/region fallbacks: the HCP research set records geography at country
   granularity ("US", "United States", "UK/US"). Map to a hub city so the globe
   still draws arcs; combos resolve to their first recognizable part. */
const COUNTRY_COORDS: Record<string, LatLng> = {
  us: CITY_COORDS['San Francisco'],
  usa: CITY_COORDS['San Francisco'],
  'united states': CITY_COORDS['San Francisco'],
  uk: CITY_COORDS.London,
  'united kingdom': CITY_COORDS.London,
  canada: CITY_COORDS.Toronto,
  de: CITY_COORDS.Berlin,
  germany: CITY_COORDS.Berlin,
  france: CITY_COORDS.Paris,
  sweden: CITY_COORDS.Stockholm,
  netherlands: CITY_COORDS.Amsterdam,
  il: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv
  israel: { lat: 32.0853, lng: 34.7818 },
  india: { lat: 12.9716, lng: 77.5946 }, // Bengaluru
  japan: { lat: 35.6762, lng: 139.6503 }, // Tokyo
  singapore: { lat: 1.3521, lng: 103.8198 },
  australia: { lat: -33.8688, lng: 151.2093 }, // Sydney
  eu: CITY_COORDS.Berlin,
}

export function cityLatLng(location: string): LatLng | null {
  if (!location) return null
  const exact = CITY_COORDS[location]
  if (exact) return exact
  // Try each slash/comma-separated part as a city, then as a country.
  for (const part of location.split(/[/,]/).map((p) => p.trim())) {
    if (CITY_COORDS[part]) return CITY_COORDS[part]
    const country = COUNTRY_COORDS[part.toLowerCase()]
    if (country) return country
  }
  return null
}
