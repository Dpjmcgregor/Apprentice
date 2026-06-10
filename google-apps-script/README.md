# Pledge backend (Google Sheet)

The pledge form submits straight to a Google Sheet via a Google Apps Script
Web App. No server, no database — just a sheet you own.

## One-time setup (~5 minutes)

1. **Create the sheet.** Go to [sheets.new](https://sheets.new) and name it
   e.g. "Apprentice Pledge 2026". (The script auto-creates a `Pledges` tab with
   headers on the first submission.)

2. **Add the script.** In that sheet: **Extensions → Apps Script**. Delete the
   placeholder code, paste the contents of [`Code.gs`](./Code.gs), and **Save**.

3. **Deploy as a Web App.** Click **Deploy → New deployment** →
   gear icon → **Web app**, then set:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*

   Click **Deploy**, authorise when prompted, and copy the **Web app URL**
   (it ends in `/exec`).

   > "Anyone" only means anyone can *POST* a pledge — nobody can read your sheet.

4. **Point the site at it.** Add the URL to the site's environment:

   ```sh
   # .env.local  (or your host's env settings — Vercel, Netlify, etc.)
   VITE_PLEDGE_ENDPOINT="https://script.google.com/macros/s/AKfy.../exec"
   ```

   Restart `npm run dev` (or redeploy) so Vite picks up the variable.

## Verify it works

- Open the `/exec` URL in a browser — you should see
  `{"ok":true,"service":"apprentice-pledge","sheet":"Pledges"}`.
- Submit a test pledge on the site, then check the `Pledges` tab for a new row.

## Troubleshooting (sheet not filling)

Because the website submits with `no-cors`, the browser can't read the
response — a failed write looks the same as a success to the user. So diagnose
from the server side, in this order:

1. **Write a test row straight from the browser.** Open
   `<your /exec URL>?test=1`. This bypasses the website entirely.
   - You see `{"ok":true,"test":true,"rowsNow":N}` **and a row appears** → the
     script + sheet work. The problem is the website not sending (go to step 3).
   - You see `{"ok":false,"error":"..."}` → the script can't reach the sheet.
     Most common: the script is a **standalone** project, so
     `getActiveSpreadsheet()` is null. Fix: set `SHEET_ID` at the top of
     `Code.gs` to your sheet's ID (the part of the sheet URL between `/d/` and
     `/edit`), then redeploy.
   - You see a **Google login / "authorization needed"** page → the deployment
     isn't public. Redeploy with **Who has access: Anyone** (step 3 above).
2. **Check the Executions log.** Apps Script editor → **Executions** (left
   sidebar). Each website submit should appear as a `doPost`.
   - No `doPost` entries at all → requests aren't arriving → it's the website
     side (step 3), or the `/exec` URL is wrong.
   - `doPost` entries marked **Failed** → open one to read the error.
3. **Confirm the website is actually posting.**
   - The `VITE_PLEDGE_ENDPOINT` env var must be set **in the environment that
     built the site** — locally in `.env.local` (restart `npm run dev` after
     changing it), and in Vercel under Settings → Environment Variables
     **before** the build (redeploy after adding it). `VITE_*` vars are baked
     in at build time, not read at runtime.
   - In the browser, open DevTools → **Network**, submit a pledge, and look for
     a POST to `script.google.com`. If there isn't one, check the **Console**:
     a `[pledge] No VITE_PLEDGE_ENDPOINT set` message means the var is missing
     from this build.
4. **Stale deployment.** If you edited `Code.gs` after first deploying, the
   live `/exec` may still run the old code. Redeploy a **new version** (below).

## Updating the script later

If you edit `Code.gs`, redeploy: **Deploy → Manage deployments →** (edit) **→
Version: New version → Deploy**. The `/exec` URL stays the same. (Editing the
code alone does **not** update the live Web App.)

## Columns written

`Timestamp · Full Name · Company · Job Title · Location · Email · Pledge ·
Already Hires Apprentice · Apprentices In 2026 · Sector · Levy Payer ·
Connect With Another Avenue`
