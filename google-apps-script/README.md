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

## Updating the script later

If you edit `Code.gs`, redeploy: **Deploy → Manage deployments →** (edit) **→
Version: New version → Deploy**. The `/exec` URL stays the same.

## Columns written

`Timestamp · Full Name · Company · Job Title · Location · Email · Pledge ·
Already Hires Apprentice · Apprentices In 2026 · Sector · Levy Payer ·
Connect With Another Avenue`
