create table if not exists public.perception_candidatures (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  age text not null,
  genre text not null,
  email text not null,
  whatsapp text not null,
  localisation text not null,
  section1 jsonb not null,
  section2 jsonb not null,
  section3 jsonb not null,
  section4 jsonb not null,
  section5 jsonb not null,
  section6 jsonb not null,
  section7 jsonb not null,
  score_alignement int not null,
  score_remise_en_question int not null,
  status text not null default 'Nouveau'
);

-- Optional indexes
create index if not exists idx_perception_candidatures_created_at on public.perception_candidatures(created_at desc);
create index if not exists idx_perception_candidatures_email on public.perception_candidatures(email);


