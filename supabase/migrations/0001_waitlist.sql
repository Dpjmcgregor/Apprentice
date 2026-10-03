-- Waitlist signups captured from the marketing site.
--
-- Run this against your Supabase project (SQL editor, or `supabase db push`
-- if you use the CLI) before the waitlist form can persist signups.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  name       text,
  company    text,
  source     text,
  created_at timestamptz not null default now()
);

-- One row per email address, case-insensitively. A repeat signup is treated as
-- a no-op by the API (see app/api/waitlist/route.ts).
create unique index if not exists waitlist_email_key
  on public.waitlist (lower(email));

-- Row Level Security: anonymous visitors may INSERT their own signup, but no
-- one can read the list through the public (anon) key. Reading signups is done
-- from the Supabase dashboard or with the service-role key, never the browser.
alter table public.waitlist enable row level security;

drop policy if exists "Anyone can join the waitlist" on public.waitlist;
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);
