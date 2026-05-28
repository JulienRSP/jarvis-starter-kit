'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { createClient } from '@/lib/supabase/client';

const M4_ITEMS = [
  "Se lever d'une chaise sans les mains",
  "Monter un escalier d'un étage",
  "Marcher 10 minutes sans s'arrêter",
  "Porter un sac de courses de 5 kg",
  "S'habiller seul(e) sans aide",
  "Sortir de baignoire ou de douche",
  "Se retourner dans son lit",
  "Ramasser quelque chose par terre",
  "Tenir debout sur un pied quelques secondes",
  "Faire demi-tour rapidement sans perdre l'équilibre",
];

const SCALE_LABELS = ['Impossible', 'Très difficile', 'Difficile', 'Avec effort', 'Facile'];

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M4Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [scores, setScores] = useState<number[]>(new Array(10).fill(2));
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const total = scores.reduce((a, b) => a + b, 0);

  let level = 'Niveau fonctionnel élevé', levelColor = 'var(--green-700)';
  if (total < 20) { level = 'Niveau fonctionnel faible'; levelColor = 'var(--red-700)'; }
  else if (total < 30) { level = 'Niveau fonctionnel modéré'; levelColor = 'var(--accent-700)'; }

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m4').upsert({
      evaluation_id: evalId,
      q1: scores[0], q2: scores[1], q3: scores[2], q4: scores[3], q5: scores[4],
      q6: scores[5], q7: scores[6], q8: scores[7], q9: scores[8], q10: scores[9],
      total_score: total,
      coach_notes: note,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 5 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m5`);
  }

  const scaleChips = [
    { v: 0, bg: 'var(--slate-100)', color: 'var(--slate-600)' },
    { v: 1, bg: 'var(--red-100)',   color: 'var(--red-700)' },
    { v: 2, bg: 'var(--orange-100)',color: '#c2410c' },
    { v: 3, bg: 'var(--amber-100)', color: 'var(--amber-800)' },
    { v: 4, bg: 'var(--green-100)', color: 'var(--green-800)' },
  ];

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 4 — Fonctionnel" step={4} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={4} />

      <div className="sf-content" style={{ padding: 16 }}>
        <div style={{
          background: 'var(--slate-100)', border: '1px solid var(--slate-200)',
          borderRadius: 8, padding: 12, marginBottom: 12,
        }}>
          <div style={{ fontSize: 13, color: 'var(--slate-600)', lineHeight: 1.5 }}>
            Demandez à la personne d'évaluer sa capacité pour chaque activité. Lisez à voix haute.
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
            {scaleChips.map(c => (
              <span key={c.v} style={{
                fontSize: 10, padding: '3px 7px', borderRadius: 4,
                background: c.bg, color: c.color, fontWeight: 600, whiteSpace: 'nowrap',
              }}>{c.v} {SCALE_LABELS[c.v]}</span>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {M4_ITEMS.map((q, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              borderBottom: i < M4_ITEMS.length - 1 ? '1px solid var(--slate-100)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--slate-400)', fontWeight: 600, width: 18, flexShrink: 0 }}>{i + 1}.</span>
                <div style={{ fontSize: 13.5, color: 'var(--slate-800)', lineHeight: 1.4 }}>{q}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, paddingLeft: 26 }}>
                {[0,1,2,3,4].map(v => (
                  <button
                    key={v} type="button"
                    data-v={v}
                    onClick={() => { const next = [...scores]; next[i] = v; setScores(next); }}
                    className={`score-dot${scores[i] === v ? ' selected' : ''}`}
                    style={{ border: 'none', flex: '0 0 auto' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--accent-50)', border: '1px solid var(--accent-200)',
          borderRadius: 8, padding: '12px 16px', marginTop: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-700)' }}>Score : {total} / 40</div>
            <div style={{ fontSize: 13, color: levelColor, marginTop: 2 }}>{level}</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <label className="label">Observations</label>
          <textarea className="field" rows={2} placeholder="Observations particulières..." value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m3`)}
        onNext={handleNext}
        isLoading={loading}
      />
    </div>
  );
}
