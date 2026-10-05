import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// POST /api/waitlist — persists a waitlist signup to Supabase.
//
// When Supabase isn't configured (e.g. a preview without env vars) it returns
// { ok: true, persisted: false } so the client can still show the success
// state and keep its local copy, matching the pre-Supabase demo behaviour.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { email, name, company, role, consent, source } = (body ?? {}) as {
    email?: unknown;
    name?: unknown;
    company?: unknown;
    role?: unknown;
    consent?: unknown;
    source?: unknown;
  };

  const cleanEmail = typeof email === "string" ? email.trim() : "";
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email." },
      { status: 400 }
    );
  }

  const clean = (v: unknown) => {
    const s = typeof v === "string" ? v.trim() : "";
    return s.length ? s : null;
  };

  if (!supabaseConfigured) {
    return NextResponse.json({ ok: true, persisted: false, reason: "unconfigured" });
  }

  try {
    const supabase = createClient(await cookies());
    const { error } = await supabase.from("waitlist").insert({
      email: cleanEmail,
      name: clean(name),
      company: clean(company),
      role: clean(role),
      consent: consent === true,
      source: clean(source) ?? "unknown",
    });

    // 23505 = unique_violation: this email is already on the list. Report it so
    // the form can show "You're already on the list." rather than a fresh
    // thank-you.
    if (error?.code === "23505") {
      return NextResponse.json({ ok: true, persisted: true, duplicate: true });
    }

    if (error) {
      console.error("[waitlist] insert failed:", error.message);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("[waitlist] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
