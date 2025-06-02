/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DIGITRANSIT_GRAPHQL_URI: string
  readonly VITE_DIGITRANSIT_KEY: string
  readonly VITE_APP_GOOGLE_MAP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
