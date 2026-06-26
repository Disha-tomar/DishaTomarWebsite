-- Run this in the Supabase SQL editor.

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  user_agent text,
  referrer text
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null references conversations(session_id),
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_session_idx on messages(session_id, created_at);
