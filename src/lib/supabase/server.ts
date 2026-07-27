import { createServerClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the SERVICE ROLE key — this bypasses Row-Level Security and must
 * NEVER be exposed to the browser. Only import this from Server Components,
 * Route Handlers, or Server Actions ("use server").
 *
 * Public/anon usage (if ever needed in the browser) would use a separate
 * client built with NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  return createServerClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
