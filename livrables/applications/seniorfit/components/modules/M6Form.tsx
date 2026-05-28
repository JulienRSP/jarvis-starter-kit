'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { ChipRow } from '@/components/ui/ChipRow';
import { RadioPills } from '@/components/ui/RadioPills';
import { createClient } from '@/lib/supabase/client';

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M6Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [targets, setTargets] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(5);
  const [barriers, setBarriers] = useState<string[]>([]);
  const [support, setSupport] = useState('');
  const [priority, setPriority] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const pct = (confidence / 10) * 100;

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m6').upsert({
      evaluation_id: evalId,
      targets,
      confidence_level: confidence,
      barriers,
      support,
      priority,
      coach_notes: note,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 7 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m7`);
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 6 — Objectifs & priorités" step={6} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={6} />

      <div className="sf-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div className="card">
          <div className="section-eyebrow">Capacités à retrouver ou préserver</div>
          <div style={{ fontSize: 12, color: 'var(--slate-400)', marginBottom: 10 }}>
            Les gestes du quotidien que le programme doit cibler en priorité.
          </div>
          <ChipRow
            options={['Monter les escaliers', 'Se relever du sol', 'Porter ses courses', 'Marcher en extérieur', 'Jardiner', 'Jouer avec les petits-enfants']}
            value={targets} onChange={setTargets}
          />
        </div>

        <div className="card">
          <div className="section-eyebrow">Confiance perçue</div>
          <label className="label">Confiance dans sa capacité à progresser</label>
          <div>
            <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
              <input
                type="range" min={0} max={10} step={1} value={confidence}
                onChange={e => setConfidence(parseInt(e.target.value, 10))}
                style={{ width: '100%', WebkitAppearance: 'none', appearance: 'none', background: 'transparent', margin: 0, cursor: 'pointer', position: 'relative', zIndex: 2 }}
              />
              <div style={{ position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 9999, background: 'var(--slate-200)', zIndex: 0 }} />
              <div style={{ position: 'absolute', left: 0, width: pct + '%', height: 6, borderRadius: 9999, background: 'var(--accent-500)', zIndex: 1 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <span style={{ fontSize: 12, color: 'var(--slate-400)' }}>Pas confiant(e)</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-700)' }}>{confidence}/10</span>
              <span style={{ fontSize: 12, color: 'var(--slate-400)' }}>Très confiant(e)</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-eyebrow">Freins identifiés</div>
          <ChipRow
            options={['Peur de tomber', 'Douleurs', 'Fatigue', 'Manque de temps', 'Manque de motivation', 'Transport']}
            value={barriers} onChange={setBarriers}
          />
        </div>

        <div className="card">
          <div className="section-eyebrow">Environnement &amp; priorité</div>
          <label className="label">Soutien de l'entourage</label>
          <RadioPills options={['Faible', 'Modéré', 'Fort']} value={support} onChange={setSupport} cols={3} />
          <label className="label" style={{ marginTop: 14 }}>Priorité retenue par le coach</label>
          <RadioPills
            options={['Sécurité & confiance', 'Renforcement', 'Endurance', 'Autonomie gestuelle']}
            value={priority} onChange={setPriority} cols={2}
          />
        </div>

        <div className="card">
          <label className="label">Note de cadrage</label>
          <textarea className="field" rows={2} placeholder="Ce qui orientera le programme des 12 prochaines semaines..." value={note} onChange={e => setNote(e.target.value)} />
        </div>

        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m5`)}
        onNext={handleNext}
        nextLabel="Vers la synthèse"
        isLoading={loading}
      />
    </div>
  );
}
