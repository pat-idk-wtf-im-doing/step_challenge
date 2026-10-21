create table if not exists teams (
  id   serial primary key,
  name text unique not null
);

create table if not exists users (
  id      serial primary key,
  name    text unique not null,
  team_id integer not null references teams(id)
);

create table if not exists daily_steps (
  id      serial primary key,
  user_id integer not null references users(id),
  day     date not null,
  steps   integer not null check (steps >= 0),
  unique (user_id, day)
);

insert into teams (name) values ('Team A'), ('Team B'), ('Team C')
  on conflict (name) do nothing;

insert into users (name, team_id) values
  ('Patrick',     (select id from teams where name = 'Team A')),
  ('Scott',       (select id from teams where name = 'Team A')),
  ('Chow',        (select id from teams where name = 'Team A')),
  ('Jessica',     (select id from teams where name = 'Team B')),
  ('Big Lisa',    (select id from teams where name = 'Team B')),
  ('Lina',        (select id from teams where name = 'Team B')),
  ('Little Lisa', (select id from teams where name = 'Team C')),
  ('Annie',       (select id from teams where name = 'Team C')),
  ('Wes',         (select id from teams where name = 'Team C'))
  on conflict (name) do nothing;
