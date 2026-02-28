-- Paid unlock + private chat

create extension if not exists pgcrypto;

alter table public.publier_projets
add column if not exists client_id uuid references auth.users (id) on delete set null;

alter table public.publier_projets
add column if not exists client_email text;

create table if not exists public.project_unlocks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.publier_projets (id) on delete cascade,
  artisan_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'paid',
  stripe_session_id text,
  stripe_payment_intent_id text,
  amount_cents integer,
  created_at timestamptz not null default now(),
  constraint project_unlocks_status_check
    check (status in ('pending', 'paid', 'failed', 'canceled', 'refunded')),
  constraint project_unlocks_project_artisan_unique unique (project_id, artisan_id)
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.publier_projets (id) on delete cascade,
  artisan_id uuid not null references auth.users (id) on delete cascade,
  client_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint conversations_project_artisan_unique unique (project_id, artisan_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  constraint messages_body_not_empty check (char_length(trim(body)) > 0)
);

create index if not exists idx_project_unlocks_project_artisan_status
  on public.project_unlocks (project_id, artisan_id, status);

create index if not exists idx_project_unlocks_project_artisan
  on public.project_unlocks (project_id, artisan_id);

create index if not exists idx_conversations_artisan_created
  on public.conversations (artisan_id, created_at desc);

create index if not exists idx_conversations_client_created
  on public.conversations (client_id, created_at desc);

create index if not exists idx_messages_conversation_created
  on public.messages (conversation_id, created_at asc);

create or replace function public.has_paid_unlock(p_project_id uuid, p_artisan_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.project_unlocks u
    where u.project_id = p_project_id
      and u.artisan_id = p_artisan_id
      and u.status = 'paid'
  );
$$;

create or replace function public.get_client_phone(p_project_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.phone
  from public.publier_projets p
  where p.id = p_project_id
    and (
      p.client_id = auth.uid()
      or exists (
        select 1
        from public.project_unlocks u
        where u.project_id = p.id
          and u.artisan_id = auth.uid()
          and u.status = 'paid'
      )
    )
  limit 1;
$$;

revoke all on function public.get_client_phone(uuid) from public;
grant execute on function public.get_client_phone(uuid) to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
exception
  when undefined_object then
    null;
end;
$$;

alter table public.project_unlocks enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "project_unlocks_select_participants" on public.project_unlocks;
create policy "project_unlocks_select_participants"
on public.project_unlocks
for select
to authenticated
using (auth.uid() = artisan_id or auth.uid() = client_id);

drop policy if exists "conversations_select_private" on public.conversations;
create policy "conversations_select_private"
on public.conversations
for select
to authenticated
using (
  auth.uid() = client_id
  or (
    auth.uid() = artisan_id
    and exists (
      select 1
      from public.project_unlocks u
      where u.project_id = conversations.project_id
        and u.artisan_id = auth.uid()
        and u.status = 'paid'
    )
  )
);

drop policy if exists "conversations_insert_private" on public.conversations;
create policy "conversations_insert_private"
on public.conversations
for insert
to authenticated
with check (
  auth.uid() = client_id
  or (
    auth.uid() = artisan_id
    and exists (
      select 1
      from public.project_unlocks u
      where u.project_id = conversations.project_id
        and u.artisan_id = auth.uid()
        and u.status = 'paid'
    )
  )
);

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
      and (
        auth.uid() = c.client_id
        or (
          auth.uid() = c.artisan_id
          and exists (
            select 1
            from public.project_unlocks u
            where u.project_id = c.project_id
              and u.artisan_id = auth.uid()
              and u.status = 'paid'
          )
        )
      )
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
      and (
        auth.uid() = c.client_id
        or (
          auth.uid() = c.artisan_id
          and exists (
            select 1
            from public.project_unlocks u
            where u.project_id = c.project_id
              and u.artisan_id = auth.uid()
              and u.status = 'paid'
          )
        )
      )
  )
);
