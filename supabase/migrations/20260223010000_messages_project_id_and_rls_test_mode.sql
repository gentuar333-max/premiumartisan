-- Test-mode chat hardening:
-- 1) Ensure messages keep a direct project_id reference.
-- 2) Keep chat access private to participants (no unlock requirement at DB policy level for now).

alter table public.messages
add column if not exists project_id uuid references public.publier_projets (id) on delete cascade;

update public.messages m
set project_id = c.project_id
from public.conversations c
where m.project_id is null
  and c.id = m.conversation_id;

create index if not exists idx_messages_project_created
  on public.messages (project_id, created_at desc);

drop policy if exists "conversations_select_private" on public.conversations;
create policy "conversations_select_private"
on public.conversations
for select
to authenticated
using (auth.uid() = artisan_id or auth.uid() = client_id);

drop policy if exists "conversations_insert_private" on public.conversations;
create policy "conversations_insert_private"
on public.conversations
for insert
to authenticated
with check (auth.uid() = artisan_id or auth.uid() = client_id);

drop policy if exists "messages_select_private" on public.messages;
create policy "messages_select_private"
on public.messages
for select
to authenticated
using (
  exists (
    select 1
    from public.conversations c
    where c.id = messages.conversation_id
      and (auth.uid() = c.artisan_id or auth.uid() = c.client_id)
  )
);

drop policy if exists "messages_insert_private" on public.messages;
create policy "messages_insert_private"
on public.messages
for insert
to authenticated
with check (
  auth.uid() = sender_id
  and exists (
    select 1
    from public.conversations c
    where c.id = messages.conversation_id
      and c.project_id = messages.project_id
      and (auth.uid() = c.artisan_id or auth.uid() = c.client_id)
  )
);
