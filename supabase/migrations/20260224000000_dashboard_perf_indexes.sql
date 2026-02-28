-- Indexes for dashboard / messages queries (artisan_id + project_id lookups)
create index if not exists idx_project_unlocks_artisan_project
  on public.project_unlocks (artisan_id, project_id);

create index if not exists idx_conversations_artisan_project
  on public.conversations (artisan_id, project_id);

create index if not exists idx_conversations_project_id
  on public.conversations (project_id);
