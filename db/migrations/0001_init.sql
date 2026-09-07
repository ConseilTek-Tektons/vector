create extension if not exists pgcrypto;

create table organisation (
  id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique,
  created_at timestamptz not null default now()
);
create table app_user (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references organisation(id) on delete cascade,
  identity_subject text not null, email text not null, display_name text not null, active boolean not null default true,
  created_at timestamptz not null default now(), unique (organisation_id, identity_subject), unique (organisation_id, email)
);
create table team (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references organisation(id) on delete cascade,
  name text not null, key text not null, next_issue_number integer not null default 1, unique (organisation_id, key)
);
create table project (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references organisation(id) on delete cascade,
  team_id uuid not null references team(id), name text not null, slug text not null, summary text not null default '',
  lead_id uuid references app_user(id), status text not null default 'planned' check (status in ('planned','active','paused','completed','cancelled')),
  target_date date, created_at timestamptz not null default now(), unique (organisation_id, slug)
);
create table cycle (
  id uuid primary key default gen_random_uuid(), team_id uuid not null references team(id) on delete cascade,
  name text not null, starts_on date not null, ends_on date not null, goal text not null default '',
  status text not null default 'planned' check (status in ('planned','active','completed')), check (ends_on >= starts_on), unique (team_id, name)
);
create table workflow_state (
  id uuid primary key default gen_random_uuid(), team_id uuid not null references team(id) on delete cascade,
  name text not null, category text not null check (category in ('backlog','unstarted','started','completed','cancelled')),
  position integer not null, unique (team_id, name), unique (team_id, position)
);
create table issue (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references organisation(id) on delete cascade,
  team_id uuid not null references team(id), number integer not null, project_id uuid references project(id) on delete set null,
  cycle_id uuid references cycle(id) on delete set null, parent_id uuid references issue(id) on delete set null,
  state_id uuid not null references workflow_state(id), assignee_id uuid references app_user(id) on delete set null,
  creator_id uuid references app_user(id) on delete set null, title text not null, description text not null default '',
  priority text not null default 'none' check (priority in ('none','low','medium','high','urgent')),
  estimate smallint check (estimate between 0 and 100), due_date date, completed_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique (team_id, number)
);
create index issue_org_updated_idx on issue (organisation_id, updated_at desc);
create index issue_search_idx on issue using gin (to_tsvector('english', title || ' ' || description));
create table label (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references organisation(id) on delete cascade,
  name text not null, color text not null default '#A3FF12', unique (organisation_id, name)
);
create table issue_label (issue_id uuid not null references issue(id) on delete cascade, label_id uuid not null references label(id) on delete cascade, primary key (issue_id, label_id));
create table issue_relation (
  source_issue_id uuid not null references issue(id) on delete cascade, target_issue_id uuid not null references issue(id) on delete cascade,
  relation text not null check (relation in ('blocks','blocked_by','duplicate','related')), primary key (source_issue_id, target_issue_id, relation),
  check (source_issue_id <> target_issue_id)
);
create table issue_comment (
  id uuid primary key default gen_random_uuid(), issue_id uuid not null references issue(id) on delete cascade,
  author_id uuid references app_user(id) on delete set null, body text not null, created_at timestamptz not null default now(), edited_at timestamptz
);
create table attachment (
  id uuid primary key default gen_random_uuid(), issue_id uuid not null references issue(id) on delete cascade,
  object_key text not null unique, filename text not null, media_type text not null, size_bytes bigint not null check (size_bytes >= 0), created_at timestamptz not null default now()
);
create table saved_view (
  id uuid primary key default gen_random_uuid(), organisation_id uuid not null references organisation(id) on delete cascade,
  owner_id uuid references app_user(id) on delete cascade, name text not null, query jsonb not null default '{}'::jsonb,
  shared boolean not null default false, unique (organisation_id, owner_id, name)
);
create table audit_event (
  id bigint generated always as identity primary key, organisation_id uuid not null references organisation(id) on delete cascade,
  actor_id text not null, action text not null, entity_type text not null, entity_id text not null,
  payload jsonb not null default '{}'::jsonb, occurred_at timestamptz not null default now()
);
create index audit_event_org_time_idx on audit_event (organisation_id, occurred_at desc);
create table role_policy (
  organisation_id uuid not null references organisation(id) on delete cascade, role_key text not null,
  permissions text[] not null default '{}', updated_by text not null, updated_at timestamptz not null default now(), primary key (organisation_id, role_key)
);
