-- Add budget column to publier_projets if not exists
ALTER TABLE public.publier_projets
ADD COLUMN IF NOT EXISTS budget text;
