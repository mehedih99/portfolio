-- MD Mehedi Hasan Portfolio CMS
-- Run this once in a NEW Supabase project: SQL Editor -> New query -> Run

create table if not exists public.portfolio_content (
  id integer primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.portfolio_content (id, content)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.portfolio_content enable row level security;

drop policy if exists "Public can read portfolio" on public.portfolio_content;
create policy "Public can read portfolio"
on public.portfolio_content
for select
to anon, authenticated
using (true);

drop policy if exists "Owner can insert portfolio" on public.portfolio_content;
create policy "Owner can insert portfolio"
on public.portfolio_content
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'mehedi.src@gmail.com');

drop policy if exists "Owner can update portfolio" on public.portfolio_content;
create policy "Owner can update portfolio"
on public.portfolio_content
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'mehedi.src@gmail.com')
with check ((auth.jwt() ->> 'email') = 'mehedi.src@gmail.com');

drop policy if exists "Owner can delete portfolio" on public.portfolio_content;
create policy "Owner can delete portfolio"
on public.portfolio_content
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'mehedi.src@gmail.com');

-- Public media bucket for portfolio images/PDFs.
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view portfolio media" on storage.objects;
create policy "Public can view portfolio media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'portfolio-media');

drop policy if exists "Owner can upload portfolio media" on storage.objects;
create policy "Owner can upload portfolio media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and (auth.jwt() ->> 'email') = 'mehedi.src@gmail.com'
);

drop policy if exists "Owner can update portfolio media" on storage.objects;
create policy "Owner can update portfolio media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and (auth.jwt() ->> 'email') = 'mehedi.src@gmail.com'
)
with check (
  bucket_id = 'portfolio-media'
  and (auth.jwt() ->> 'email') = 'mehedi.src@gmail.com'
);

drop policy if exists "Owner can delete portfolio media" on storage.objects;
create policy "Owner can delete portfolio media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and (auth.jwt() ->> 'email') = 'mehedi.src@gmail.com'
);
