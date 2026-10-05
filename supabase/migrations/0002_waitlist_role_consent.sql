-- Adds the `role` and `marketing_consent` fields captured by the homepage
-- waitlist form (the "Keep me updated about Cushion" checkbox).
--
-- Run this against your Supabase project (SQL editor, or `supabase db push`
-- if you use the CLI) after 0001_waitlist.sql. Safe to re-run.

alter table public.waitlist
  add column if not exists role              text,
  add column if not exists marketing_consent boolean not null default false;
