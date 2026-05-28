// ─── Shared TypeScript types for SeniorFit ───

export type Sex = 'M' | 'F';
export type EvaluationStatus = 'draft' | 'completed';
export type SafetyLevel = 'GREEN' | 'ORANGE' | 'RED';
export type Profile = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

export const PROFILE_LABELS: Record<Profile, string> = {
  P1: 'Actif maintenu',
  P2: 'Déconditionné',
  P3: 'Fragile Fonctionnel',
  P4: 'Risque chute',
  P5: 'Vigilance médicale',
};

export const PROFILE_DESCRIPTIONS: Record<Profile, string> = {
  P1: 'Maintien et progression, travail sur la performance.',
  P2: 'Reconditionnement progressif, retour à l\'activité.',
  P3: 'Force et/ou équilibre faibles, priorité sécurité et confiance.',
  P4: 'Risque de chute élevé, programme spécifique anti-chute.',
  P5: 'Comorbidités actives, coordination médicale indispensable.',
};

export interface Participant {
  id: string;
  coach_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  sex: Sex;
  email?: string | null;
  created_at: string;
}

export interface ParticipantWithAge extends Participant {
  age: number;
  bmi?: number | null;
}

export interface Evaluation {
  id: string;
  participant_id: string;
  coach_id: string;
  status: EvaluationStatus;
  current_module: number;
  final_profile?: Profile | null;
  created_at: string;
  completed_at?: string | null;
}

export interface EvaluationM1 {
  evaluation_id: string;
  height_cm?: number | null;
  weight_kg?: number | null;
  bmi?: number | null;
  living_situation?: string | null;
  autonomy_level?: string | null;
  client_goal?: string | null;
  motivations?: string[] | null;
  sessions_per_week?: string | null;
  session_duration?: number | null;
  home_equipment?: string[] | null;
  coach_impressions?: string[] | null;
  coach_notes?: string | null;
}

export interface EvaluationM2 {
  evaluation_id: string;
  q1?: boolean | null;
  q2?: boolean | null;
  q3?: boolean | null;
  q4?: boolean | null;
  q5?: boolean | null;
  q6?: boolean | null;
  q7?: boolean | null;
  q8?: boolean | null;
  q7_count?: number | null;
  q7_context?: string | null;
  safety_level?: SafetyLevel | null;
  safety_notes?: string | null;
}

export interface EvaluationM3 {
  evaluation_id: string;
  physical_activity?: string | null;
  practices?: string[] | null;
  sleep_quality?: string | null;
  tobacco?: string | null;
  alcohol?: string | null;
  fes_q1?: number | null;
  fes_q2?: number | null;
  fes_q3?: number | null;
  fes_q4?: number | null;
  fes_total?: number | null;
  coach_notes?: string | null;
}

export interface EvaluationM4 {
  evaluation_id: string;
  q1?: number | null; q2?: number | null; q3?: number | null;
  q4?: number | null; q5?: number | null; q6?: number | null;
  q7?: number | null; q8?: number | null; q9?: number | null;
  q10?: number | null;
  total_score?: number | null;
  coach_notes?: string | null;
}

export interface EvaluationM5 {
  evaluation_id: string;
  chair_stand_count?: number | null;
  chair_stand_level?: string | null;
  tug_seconds?: number | null;
  tug_level?: string | null;
  semi_tandem_seconds?: number | null;
  balance_level?: string | null;
  step_test_count?: number | null;
  step_test_level?: string | null;
  sit_reach_cm?: number | null;
  sit_reach_level?: string | null;
  back_scratch_cm?: number | null;
  back_scratch_level?: string | null;
  gait_speed_seconds?: number | null;
  gait_speed_ms?: number | null;
  gait_speed_level?: string | null;
  pain_noted?: boolean | null;
  coach_notes?: string | null;
}

export interface EvaluationM6 {
  evaluation_id: string;
  targets?: string[] | null;
  confidence_level?: number | null;
  barriers?: string[] | null;
  support?: string | null;
  priority?: string | null;
  coach_notes?: string | null;
}

export interface EvaluationM7 {
  evaluation_id: string;
  auto_profile?: Profile | null;
  top_indicators?: string[] | null;
  strengths?: string[] | null;
  vigilance_points?: string[] | null;
  red_flags?: string[] | null;
  final_profile?: Profile | null;
  profile_override?: boolean | null;
  profile_override_reason?: string | null;
  coach_comment?: string | null;
}

export interface EvaluationM8 {
  evaluation_id: string;
  frequency_per_week?: string | null;
  priority_axes?: string[] | null;
  program_content?: string | null;
  safety_points?: string | null;
  home_advice?: string | null;
}

export interface PdfExport {
  id: string;
  evaluation_id: string;
  type: 'coach' | 'client';
  storage_path?: string | null;
  generated_at: string;
}

// Module routing
export type ModuleSlug = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7' | 'm8' | 'm9';

export const MODULE_TITLES: Record<ModuleSlug, string> = {
  m1: 'Module 1 — Identification',
  m2: 'Module 2 — Sécurité PAR-Q+',
  m3: 'Module 3 — Habitudes de vie',
  m4: 'Module 4 — Fonctionnel',
  m5: 'Module 5 — Tests physiques',
  m6: 'Module 6 — Objectifs & priorités',
  m7: 'Module 7 — Synthèse & Profil',
  m8: 'Module 8 — Recommandations',
  m9: 'Module 9 — Génération',
};

export const MODULE_ORDER: ModuleSlug[] = ['m1','m2','m3','m4','m5','m6','m7','m8','m9'];

export function getModuleStep(slug: ModuleSlug): number {
  return MODULE_ORDER.indexOf(slug) + 1;
}

export function getNextModule(slug: ModuleSlug): ModuleSlug | null {
  const idx = MODULE_ORDER.indexOf(slug);
  return idx < MODULE_ORDER.length - 1 ? MODULE_ORDER[idx + 1] : null;
}

export function getPrevModule(slug: ModuleSlug): ModuleSlug | null {
  const idx = MODULE_ORDER.indexOf(slug);
  return idx > 0 ? MODULE_ORDER[idx - 1] : null;
}
