export interface PledgeSubmission {
  fullName: string;
  company: string;
  jobTitle: string;
  location: string;
  email: string;
  pledge: string;
  alreadyHire: string;
  intendCount: string;
  sector: string;
  levyPayer: string;
  connect: string;
}

const ENDPOINT = import.meta.env.VITE_PLEDGE_ENDPOINT;

/**
 * Sends a pledge to the Google Sheet via the Apps Script Web App.
 *
 * Uses a form-encoded body + `no-cors` so it counts as a "simple" request and
 * skips the CORS preflight that Apps Script can't answer. The response is
 * opaque, so this is fire-and-forget — we never block the thank-you journey on
 * it. If no endpoint is configured (local dev), it resolves quietly.
 */
export async function submitPledge(data: PledgeSubmission): Promise<void> {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info("[pledge] No VITE_PLEDGE_ENDPOINT set — skipping submit.", data);
    }
    return;
  }

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ ...data }).toString(),
    });
  } catch (err) {
    // Don't block the user — log and continue to the thank-you page.
    console.error("[pledge] Submission failed", err);
  }
}
