create table if not exists public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  url text not null,
  type text not null check (type in ('article', 'video', 'course', 'project', 'other')),
  description text,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null
);

-- Enable Row Level Security
alter table public.resources enable row level security;

-- Create policies
create policy "Users can view their own resources"
  on public.resources for select
  using (auth.uid() = user_id);

create policy "Users can insert their own resources"
  on public.resources for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own resources"
  on public.resources for update
  using (auth.uid() = user_id);

create policy "Users can delete their own resources"
  on public.resources for delete
  using (auth.uid() = user_id);

-- Create function to automatically set updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger handle_updated_at
  before update on public.resources
  for each row
  execute function public.handle_updated_at(); 