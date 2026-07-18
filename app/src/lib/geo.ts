export interface LatLng {
  lat: number
  lng: number
}

/** Fund HQ (Meridian Ventures) — arcs on the sourcing globe originate here. */
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

export function cityLatLng(location: string): LatLng | null {
  return CITY_COORDS[location] ?? null
}
