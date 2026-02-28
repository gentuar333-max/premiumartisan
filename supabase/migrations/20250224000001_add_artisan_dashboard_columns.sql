-- Add missing columns for artisan dashboard (Malt-style UI)
-- Safe: only ADD, no DROP or MODIFY

ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS budget text;
ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS postal_prefix text;
ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS category_details text;
ALTER TABLE public.publier_projets ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
