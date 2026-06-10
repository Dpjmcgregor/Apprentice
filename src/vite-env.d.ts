/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script Web App URL that appends pledges to the Google Sheet. */
  readonly VITE_PLEDGE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
