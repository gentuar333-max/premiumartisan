-- Performance indexes for messages/unlocks/conversations
CREATE INDEX IF NOT EXISTS idx_conversations_project_id ON public.conversations (project_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages (conversation_id);
CREATE INDEX IF NOT EXISTS idx_project_unlocks_project_id ON public.project_unlocks (project_id);
CREATE INDEX IF NOT EXISTS idx_project_unlocks_artisan_id ON public.project_unlocks (artisan_id);
