-- DEV BYPASS: Create a mock user for testing when NEXT_PUBLIC_DEV_BYPASS_UNLOCK=true
-- Run this migration only in development. Remove before production.
-- Requires at least one existing user (for instance_id). If empty DB, create a user first.
-- This allows /api/messages/send to insert messages when no real session exists.

create extension if not exists pgcrypto;

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
)
SELECT
  COALESCE((SELECT instance_id FROM auth.users LIMIT 1), '00000000-0000-0000-0000-000000000000'::uuid),
  'aaaaaaaa-bbbb-4ccc-dddd-eeeeeeeeeeee'::uuid,
  'authenticated',
  'authenticated',
  'dev@test.local',
  crypt('dev-bypass-password', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"artisan"}'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE id = 'aaaaaaaa-bbbb-4ccc-dddd-eeeeeeeeeeee'::uuid
);
