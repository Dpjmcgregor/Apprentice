import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Runs in the Edge middleware on every matched request. It rebuilds the auth
// cookies onto a fresh response and calls getUser(), which refreshes an
// expired session token and writes the new cookies back so Server Components
// downstream see a valid session.
export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Supabase isn't configured yet (no env vars). Skip session refresh and let
  // the request through untouched — otherwise createServerClient throws and,
  // since this middleware runs on every route, every page 500s.
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Do not run code between createServerClient and getUser(). getUser() is what
  // actually refreshes the session; skipping it means expired tokens are never
  // renewed and users get logged out at random.
  await supabase.auth.getUser();

  return supabaseResponse;
};
