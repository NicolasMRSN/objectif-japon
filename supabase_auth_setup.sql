-- ============================================================
-- 1) Créer le compte partagé (dashboard, PAS en SQL)
--    Authentication → Users → Add user → Create new user
--      Email    : voyage@marine-arnaud.app
--      Password : (le mot de passe que vous choisissez tous les deux)
--      Cocher "Auto Confirm User" (sinon Supabase attend une
--      confirmation par e-mail que cette adresse ne recevra jamais)
-- ============================================================

-- 2) Restreindre l'accès à la table favorites aux seuls utilisateurs
--    connectés (jusqu'ici elle était ouverte à tout le monde, ce qui
--    n'a plus de raison d'être maintenant que l'authentification existe)
drop policy if exists "public read favorites" on favorites;
drop policy if exists "public insert favorites" on favorites;
drop policy if exists "public update favorites" on favorites;

create policy "authenticated read favorites"
  on favorites for select
  to authenticated
  using (true);

create policy "authenticated insert favorites"
  on favorites for insert
  to authenticated
  with check (true);

create policy "authenticated update favorites"
  on favorites for update
  to authenticated
  using (true);
