-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create table
create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text not null,
  message text not null,
  budget text,
  timeline text,
  project_type text,
  status text default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add trigger to auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

drop trigger if exists update_contact_submissions_updated_at on contact_submissions;

create trigger update_contact_submissions_updated_at
before update on contact_submissions
for each row
execute function update_updated_at_column();

-- Row Level Security
alter table contact_submissions enable row level security;

-- Allow public (anon) users to insert
create policy "Allow public insert" on contact_submissions
for insert to anon with check (true);

-- Allow authenticated users to select/update
create policy "Allow auth select" on contact_submissions
for select to authenticated using (true);

create policy "Allow auth update" on contact_submissions
for update to authenticated using (true);

-- Indexes for performance
create index if not exists idx_contact_email on contact_submissions(email);
create index if not exists idx_contact_status on contact_submissions(status);
create index if not exists idx_contact_created on contact_submissions(created_at desc);
  