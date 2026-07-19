/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional absolute origin for the Meridian brain API (e.g. https://api.example.com). Empty = same origin / Vite proxy. */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
