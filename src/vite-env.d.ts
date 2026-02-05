/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDIUM_RSS: string;
  readonly VITE_GITHUB: string;
  readonly VITE_GITHUB_TOKEN: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  readonly VITE_SPOTIFY_REFRESH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
