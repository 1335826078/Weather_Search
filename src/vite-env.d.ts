/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_BASE: string
  readonly VITE_WEATHER_APPID: string
  readonly VITE_WEATHER_APPSECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
