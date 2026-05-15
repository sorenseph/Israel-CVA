-- Ejecutar en Supabase SQL Editor si el MCP no está disponible

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.demo_stats (
  id int primary key default 1 check (id = 1),
  projects_count int not null default 24,
  clients_count int not null default 12,
  uptime_percent numeric(5,2) not null default 99.90,
  updated_at timestamptz not null default now()
);

insert into public.demo_stats (id, projects_count, clients_count, uptime_percent)
values (1, 24, 12, 99.9)
on conflict (id) do nothing;

alter table public.contact_leads enable row level security;
alter table public.demo_stats enable row level security;

create policy "leads_insert_public"
  on public.contact_leads for insert
  to anon, authenticated
  with check (true);

create policy "leads_select_public"
  on public.contact_leads for select
  to anon, authenticated
  using (true);

create policy "stats_select_public"
  on public.demo_stats for select
  to anon, authenticated
  using (true);

create policy "stats_update_public"
  on public.demo_stats for update
  to anon, authenticated
  using (true);
