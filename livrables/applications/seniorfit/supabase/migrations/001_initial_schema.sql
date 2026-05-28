-- SeniorFit — Schéma initial
-- Région Supabase : eu-west-1 (Frankfurt) — RGPD données de santé belges

-- ─── Profils coach (étend auth.users) ───
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_profile" ON profiles
  FOR ALL USING (id = auth.uid());

-- Créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Participants ───
CREATE TABLE IF NOT EXISTS participants (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id        uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  first_name      text NOT NULL,
  last_name       text NOT NULL,
  date_of_birth   date NOT NULL,
  sex             text NOT NULL CHECK (sex IN ('M', 'F')),
  email           text,
  height_cm       numeric,
  weight_kg       numeric,
  bmi             numeric,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_participants" ON participants
  FOR ALL USING (coach_id = auth.uid());

-- ─── Évaluations ───
CREATE TABLE IF NOT EXISTS evaluations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id  uuid NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  coach_id        uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
  current_module  int NOT NULL DEFAULT 1,
  final_profile   text CHECK (final_profile IN ('P1','P2','P3','P4','P5')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  completed_at    timestamptz
);

ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_evaluations" ON evaluations
  FOR ALL USING (coach_id = auth.uid());

-- ─── Module 1 — Identification ───
CREATE TABLE IF NOT EXISTS evaluation_m1 (
  evaluation_id       uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  height_cm           numeric,
  weight_kg           numeric,
  bmi                 numeric,
  living_situation    text,
  autonomy_level      text,
  client_goal         text,
  motivations         text[],
  sessions_per_week   text,
  session_duration    int,
  home_equipment      text[],
  coach_impressions   text[],
  gait_observations   text[],
  coach_notes         text,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m1 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m1" ON evaluation_m1
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 2 — PAR-Q+ ───
CREATE TABLE IF NOT EXISTS evaluation_m2 (
  evaluation_id   uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  q1 boolean, q2 boolean, q3 boolean, q4 boolean,
  q5 boolean, q6 boolean, q7 boolean, q8 boolean,
  q7_count        int,
  q7_context      text,
  safety_level    text CHECK (safety_level IN ('GREEN','ORANGE','RED')),
  safety_notes    text,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m2 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m2" ON evaluation_m2
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 3 — Habitudes de vie & FES ───
CREATE TABLE IF NOT EXISTS evaluation_m3 (
  evaluation_id       uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  physical_activity   text,
  practices           text[],
  sleep_quality       text,
  tobacco             text,
  alcohol             text,
  fes_q1 int, fes_q2 int, fes_q3 int, fes_q4 int,
  fes_total           int,
  coach_notes         text,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m3 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m3" ON evaluation_m3
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 4 — Questionnaire fonctionnel ───
CREATE TABLE IF NOT EXISTS evaluation_m4 (
  evaluation_id   uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  q1 int, q2 int, q3 int, q4 int, q5 int,
  q6 int, q7 int, q8 int, q9 int, q10 int,
  total_score     int,
  coach_notes     text,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m4 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m4" ON evaluation_m4
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 5 — Tests physiques ───
CREATE TABLE IF NOT EXISTS evaluation_m5 (
  evaluation_id           uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  chair_stand_count       int,
  chair_stand_level       text,
  tug_seconds             numeric,
  tug_level               text,
  semi_tandem_seconds     numeric,
  balance_level           text,
  step_test_count         int,
  step_test_level         text,
  sit_reach_cm            numeric,
  sit_reach_level         text,
  back_scratch_cm         numeric,
  back_scratch_level      text,
  gait_speed_seconds      numeric,
  gait_speed_ms           numeric,
  gait_speed_level        text,
  pain_noted              boolean,
  coach_notes             text,
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m5 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m5" ON evaluation_m5
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 6 — Objectifs & priorités ───
CREATE TABLE IF NOT EXISTS evaluation_m6 (
  evaluation_id       uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  targets             text[],
  confidence_level    int CHECK (confidence_level BETWEEN 0 AND 10),
  barriers            text[],
  support             text,
  priority            text,
  coach_notes         text,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m6 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m6" ON evaluation_m6
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 7 — Synthèse & Profil ───
CREATE TABLE IF NOT EXISTS evaluation_m7 (
  evaluation_id           uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  auto_profile            text CHECK (auto_profile IN ('P1','P2','P3','P4','P5')),
  top_indicators          text[],
  strengths               text[],
  vigilance_points        text[],
  red_flags               text[],
  final_profile           text CHECK (final_profile IN ('P1','P2','P3','P4','P5')),
  profile_override        boolean DEFAULT false,
  profile_override_reason text,
  coach_comment           text,
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m7 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m7" ON evaluation_m7
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Module 8 — Recommandations ───
CREATE TABLE IF NOT EXISTS evaluation_m8 (
  evaluation_id       uuid PRIMARY KEY REFERENCES evaluations(id) ON DELETE CASCADE,
  frequency_per_week  text,
  priority_axes       text[],
  program_content     text,
  safety_points       text,
  home_advice         text,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE evaluation_m8 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_m8" ON evaluation_m8
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Exports PDF ───
CREATE TABLE IF NOT EXISTS pdf_exports (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id   uuid NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  type            text NOT NULL CHECK (type IN ('coach','client')),
  storage_path    text,
  generated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pdf_exports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coach_own_pdf_exports" ON pdf_exports
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM evaluations WHERE coach_id = auth.uid())
  );

-- ─── Bucket Supabase Storage (à créer manuellement dans le dashboard) ───
-- Bucket: "pdf-exports" — privé (non-public)
-- Les PDFs sont accessibles via signed URLs temporaires uniquement
