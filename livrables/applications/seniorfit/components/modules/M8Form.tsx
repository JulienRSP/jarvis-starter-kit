'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Info } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { ChipRow } from '@/components/ui/ChipRow';
import { ProfileBadge } from '@/components/evaluation/ProfileBadge';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';

const DEFAULT_PROGRAM = `Semaines 1-4 — Adaptation et confiance
Objectif : Créer un environnement sécurisant, prendre confiance, évaluer les compensations réelles.
Exercices : Équilibre assis-debout guidé, marche encadrée, renfo léger membres inférieurs.
Intensité : RPE 3-4/10. Progression douce.

Semaines 5-12 — Développement progressif
Objectif : Renforcement des membres inférieurs, amélioration de l'équilibre dynamique.
Exercices : Squat partiel, marche tandem, step-up bas, exercices proprioception.
Intensité : RPE 5-6/10.`;

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M8Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [freq, setFreq] = useState('2×/semaine');
  const [axes, setAxes] = useState<string[]>([]);
  const [program, setProgram] = useState(DEFAULT_PROGRAM);
  const [safety, setSafety] = useState('Toujours travailler avec appui disponible. Éviter les exercices en déséquilibre non contrôlé. Surveiller la fatigue.');
  const [home, setHome] = useState('Marche quotidienne 20 min si possible. Exercices de levé de chaise 2×/semaine à domicile.');
  const [loading, setLoading] = useState(false);

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m8').upsert({
      evaluation_id: evalId,
      frequency_per_week: freq,
      priority_axes: axes,
      program_content: program,
      safety_points: safety,
      home_advice: home,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 9 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m9`);
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 8 — Recommandations" step={8} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={8} />

      <div className="sf-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Profile reminder */}
        <div style={{
          background: 'var(--amber-50)', border: '1px solid var(--amber-200)',
          borderRadius: 8, padding: '10px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <ProfileBadge profile={'P3' as Profile} size="lg" />
          <Info size={18} color="var(--amber-600)" />
        </div>

        {/* Fréquence */}
        <div className="card">
          <label className="label">Fréquence recommandée</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['1×/semaine', '2×/semaine', '3×/semaine'].map(f => (
              <button
                key={f} type="button"
                onClick={() => setFreq(f)}
                className={`radio-pill${freq === f ? ' active' : ''}`}
                style={{ fontSize: 12.5 }}>
                {f}
              </button>
            ))}
          </div>
          <div className="helper" style={{ marginTop: 6 }}>2×/semaine recommandé pour le profil P3</div>
        </div>

        {/* Axes prioritaires */}
        <div className="card">
          <label className="label">Axes prioritaires</label>
          <ChipRow
            options={['Équilibre', 'Force MI', 'Confiance', 'Endurance', 'Mobilité', 'Coordination']}
            value={axes} onChange={setAxes}
          />
        </div>

        {/* Programme */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <label className="label" style={{ margin: 0 }}>Programme recommandé — modifiable</label>
            <Edit2 size={14} color="var(--slate-400)" />
          </div>
          <textarea
            value={program}
            onChange={e => setProgram(e.target.value)}
            style={{
              width: '100%', height: 180, padding: 12,
              background: 'var(--slate-50)', border: '1px solid var(--slate-200)',
              borderRadius: 8, fontFamily: 'inherit', fontSize: 13,
              color: 'var(--slate-700)', lineHeight: 1.5, resize: 'none', outline: 'none',
            }}
          />
        </div>

        {/* Sécurité */}
        <div className="card">
          <label className="label">Points de sécurité spécifiques</label>
          <textarea className="field" rows={3} value={safety} onChange={e => setSafety(e.target.value)} />
        </div>

        {/* Conseils domicile */}
        <div className="card">
          <label className="label">Conseils autonomie domicile</label>
          <textarea className="field" rows={3} value={home} onChange={e => setHome(e.target.value)} />
        </div>

        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m7`)}
        onNext={handleNext}
        nextLabel="Générer les fiches"
        isLoading={loading}
      />
    </div>
  );
}
