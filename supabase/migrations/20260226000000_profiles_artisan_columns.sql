-- Artisan profile fields for signup
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS metier text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS postal_code text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city text;
