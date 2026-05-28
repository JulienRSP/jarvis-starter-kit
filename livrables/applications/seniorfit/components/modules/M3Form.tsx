'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flag } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { ChipRow } from '@/components/ui/ChipRow';
import { RadioPills } from '@/components/ui/RadioPills';
import { createClient } from '@/lib/supabase/client';

const FES_ITEMS = [
  "S'habiller ou se déshabiller",
  "Prendre un bain ou une douche",
  "Se lever d'une chaise ou s'y asseoir",
  "Monter ou descendre les escaliers",
];
const FES_LABELS = ['Pas du tout', 'Un peu', 'Assez', 'Très'];

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M3Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [activity, setActivity] = useState('Légèrement actif');
  const [practices, setPractices] = useState<string[]>([]);
  const [sleep, setSleep] = useState('');
  const [tobacco, setTobacco] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [fes, setFes] = useState<number[]>([1, 1, 1, 1]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const fesTotal = fes.reduce((a, b) => a + b, 0);
  const fesHigh = fesTotal >= 10;

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m3').upsert({
      evaluation_id: evalId,
      physical_activity: activity,
      practices,
      sleep_quality: sleep,
      tobacco,
      alcohol,
      fes_q1: fes[0], fes_q2: fes[1], fes_q3: fes[2], fes_q4: fes[3],
      fes_total: fesTotal,
      coach_notes: note,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 4 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m4`);
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 3 — Habitudes de vie" step={3} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={3} />

      <div className="sf-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div className="card">
          <div className="section-eyebrow">Activité physique actuelle</div>
          <label className="label">Niveau d'activité habituel</label>
          <RadioPills
            options={['Sédentaire', 'Légèrement actif', 'Modérément actif', 'Actif']}
            value={activity} onChange={setActivity} cols={2}
          />
          <label className="label" style={{ marginTop: 14 }}>Activités pratiquées</label>
          <ChipRow
            options={['Marche', 'Jardinage', 'Natation', 'Vélo', 'Gym douce', 'Aucune']}
            value={practices} onChange={setPractices}
          />
        </div>

        <div className="card">
          <div className="section-eyebrow">Sommeil &amp; consommations</div>
          <label className="label">Qualité du sommeil</label>
          <RadioPills options={['Mauvais', 'Correct', 'Bon']} value={sleep} onChange={setSleep} cols={3} />
          <label className="label" style={{ marginTop: 14 }}>Tabac</label>
          <RadioPills options={['Non-fumeur', 'Ancien fumeur', 'Fumeur actif']} value={tobacco} onChange={setTobacco} cols={3} />
          <label className="label" style={{ marginTop: 14 }}>Alcool</label>
          <RadioPills options={['Jamais', 'Occasionnel', 'Régulier']} value={alcohol} onChange={setAlcohol} cols={3} />
        </div>

        {/* FES */}
        <div className="card">
          <div className="section-eyebrow">Peur de tomber (FES)</div>
          <div style={{ fontSize: 12, color: 'var(--slate-500)', lineHeight: 1.5, marginBottom: 12 }}>
            « À quel point êtes-vous inquiet(e) de tomber en faisant… ? » Lisez chaque situation à voix haute.
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
            {FES_LABELS.map((l, i) => (
              <span key={l} style={{
                fontSize: 10, padding: '3px 7px', borderRadius: 4, fontWeight: 600,
                background: i === 0 ? 'var(--green-100)' : i === 1 ? 'var(--amber-100)' : i === 2 ? 'var(--orange-100)' : 'var(--red-100)',
                color: i === 0 ? 'var(--green-800)' : i === 1 ? 'var(--amber-800)' : i === 2 ? '#c2410c' : 'var(--red-700)',
              }}>{i + 1} {l}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FES_ITEMS.map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 13.5, color: 'var(--slate-800)', marginBottom: 8 }}>{item}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3, 4].map(v => {
                    const selected = fes[i] === v;
                    const sv = v - 1;
                    return (
                      <button
                        key={v} type="button"
                        data-v={sv}
                        onClick={() => { const next = [...fes]; next[i] = v; setFes(next); }}
                        className={`score-dot${selected ? ' selected' : ''}`}
                        style={{ border: 'none', flex: 1 }}>
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 14,
            background: fesHigh ? 'var(--amber-50)' : 'var(--green-50)',
            border: '1px solid ' + (fesHigh ? 'var(--amber-200)' : 'var(--green-200)'),
            borderRadius: 8, padding: '10px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: fesHigh ? 'var(--amber-700)' : 'var(--green-700)' }}>
                Score FES : {fesTotal} / 16
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>
                {fesHigh ? 'Peur de tomber élevée' : 'Peur de tomber faible à modérée'}
              </div>
            </div>
          </div>

          {fesHigh && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
              <Flag size={14} color="var(--amber-600)" />
              <span style={{ fontSize: 12, color: 'var(--amber-700)' }}>Drapeau M3-FES ajouté au profil</span>
            </div>
          )}
        </div>

        <div className="card">
          <label className="label">Notes habitudes de vie</label>
          <textarea className="field" rows={2} placeholder="Contexte, routines, freins repérés..." value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m2`)}
        onNext={handleNext}
        isLoading={loading}
      />
    </div>
  );
}
