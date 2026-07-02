-- Table qui stocke la liste de favoris partagée de Marine & Arnaud
create table if not exists favorites (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Sécurité au niveau des lignes (RLS)
alter table favorites enable row level security;

-- Accès public en lecture/écriture, volontairement simple pour une appli
-- à 2 utilisateurs sans système de comptes. La seule donnée exposée est
-- la liste de lieux favoris (rien de sensible).
create policy "public read favorites"
  on favorites for select
  using (true);

create policy "public insert favorites"
  on favorites for insert
  with check (true);

create policy "public update favorites"
  on favorites for update
  using (true);

-- Active la synchronisation en temps réel sur cette table
alter publication supabase_realtime add table favorites;
