'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flag, Check } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';
import { PROFILE_LABELS, PROFILE_DESCRIPTIONS } from '@/lib/types';

const PROFILE_OPTIONS: { id: Profile }[] = [
  { id: 'P1' }, { id: 'P2' }, { id: 'P3' }, { id: 'P4' }, { id: 'P5' },
];

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M7Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [selProfile, setSelProfile] = useState<Profile>('P3');
  const [overrideReason, setOverrideReason] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const autoProfile: Profile = 'P3';
  const isOverride = selProfile !== autoProfile;

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m7').upsert({
      evaluation_id: evalId,
      auto_profile: autoProfile,
      final_profile: selProfile,
      profile_override: isOverride,
      profile_override_reason: isOverride ? overrideReason : null,
      coach_comment: note,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations')
      .update({ current_module: 8, final_profile: selProfile })
      .eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m8`);
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 7 — Synthèse & Profil" step={7} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={7} />

      <div className="sf-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Auto-calculated profile */}
        <div style={{
          background: 'linear-gradient(160deg, var(--amber-50), var(--amber-100))',
          border: '1px solid var(--amber-300)',
          borderRadius: 16, padding: 20,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--amber-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Profil calculé automatiquement
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <span style={{
              background: 'var(--amber-600)', color: '#fff',
              fontSize: 20, fontWeight: 700, padding: '4px 14px', borderRadius: 9999,
            }}>{autoProfile}</span>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--amber-800)' }}>
              {PROFILE_LABELS[autoProfile]}
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--amber-700)', marginTop: 8, lineHeight: 1.5 }}>
            {PROFILE_DESCRIPTIONS[autoProfile]}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber-700)', marginTop: 16, marginBottom: 8 }}>
            Les 3 indicateurs décisifs :
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'TUG : score en dehors des normes',
              'Score fonctionnel M4 : faible',
              'FES total M3 : peur élevée',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--amber-800)' }}>
                <span style={{ color: 'var(--amber-600)', fontWeight: 700 }}>→</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validate profile */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--slate-700)', marginBottom: 10 }}>
            Le coach valide ou ajuste le profil
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PROFILE_OPTIONS.map(opt => {
              const active = selProfile === opt.id;
              return (
                <button
                  key={opt.id} type="button"
                  onClick={() => setSelProfile(opt.id)}
                  style={{
                    height: 48, borderRadius: 8, fontFamily: 'inherit',
                    border: '1px solid ' + (active ? 'var(--amber-300)' : 'var(--slate-200)'),
                    background: active ? 'var(--amber-50)' : 'var(--slate-50)',
                    color: active ? 'var(--amber-700)' : 'var(--slate-600)',
                    display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
                    cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 500,
                    textAlign: 'left',
                  }}>
                  <span style={{ fontWeight: 700 }}>{opt.id}</span>
                  <span style={{ flex: 1 }}>— {PROFILE_LABELS[opt.id]}</span>
                  {active && <Check size={18} color="var(--amber-600)" />}
                </button>
              );
            })}
          </div>
          {isOverride && (
            <input
              className="field"
              style={{ height: 40, marginTop: 10 }}
              placeholder="Justification de la modification..."
              value={overrideReason}
              onChange={e => setOverrideReason(e.target.value)}
            />
          )}
        </div>

        {/* Drapeaux rouges */}
        <div style={{ background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--red-700)', marginBottom: 10 }}>Drapeaux rouges actifs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'TUG hors normes — vérifier risque chute',
              'FES élevé — peur de tomber',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--red-700)' }}>
                <Flag size={16} color="var(--red-500)" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="card">
          <label className="label">Commentaire de synthèse coach</label>
          <textarea
            className="field" rows={3}
            placeholder="Synthèse, contexte, points d'attention pour le programme..."
            value={note} onChange={e => setNote(e.target.value)}
          />
        </div>
        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m6`)}
        onNext={handleNext}
        nextLabel="Valider le profil"
        isLoading={loading}
      />
    </div>
  );
}
