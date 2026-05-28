'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, ShieldX, CheckCircle, X } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { createClient } from '@/lib/supabase/client';

const PARQ_QUESTIONS = [
  { id: 'Q1', text: "Votre médecin vous a-t-il déjà dit que vous aviez un problème cardiaque ?" },
  { id: 'Q2', text: "Ressentez-vous des douleurs thoraciques au repos ou à l'effort ?" },
  { id: 'Q3', text: "Avez-vous des vertiges, pertes d'équilibre ou pertes de connaissance ?" },
  { id: 'Q4', text: "Prenez-vous des médicaments pour la tension artérielle ou le cœur ?" },
  { id: 'Q5', text: "Avez-vous un problème osseux ou articulaire qui pourrait s'aggraver avec l'exercice ?" },
  { id: 'Q6', text: "Y a-t-il une autre raison médicale pour laquelle vous ne devriez pas faire d'exercice ?" },
  { id: 'Q7', text: "Avez-vous chuté dans les 6 derniers mois ?", hasFollowup: true },
  { id: 'Q8', text: "Avez-vous eu une hospitalisation ou opération dans les 12 derniers mois ?" },
];

type Answer = 'yes' | 'no' | null;

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M2Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, Answer>>({
    Q1: null, Q2: null, Q3: null, Q4: null, Q5: null, Q6: null, Q7: null, Q8: null,
  });
  const [fallCount, setFallCount] = useState('');
  const [fallCtx, setFallCtx] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const redFlags = ['Q1','Q2','Q3','Q4','Q5','Q6'].filter(q => answers[q] === 'yes');
  const orangeFlags = ['Q7','Q8'].filter(q => answers[q] === 'yes');
  const safetyLevel = redFlags.length > 0 ? 'RED' : orangeFlags.length > 0 ? 'ORANGE' : 'GREEN';
  const isRed = safetyLevel === 'RED';
  const allAnswered = Object.values(answers).every(v => v !== null);

  function setAnswer(id: string, val: Answer) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m2').upsert({
      evaluation_id: evalId,
      q1: answers.Q1 === 'yes', q2: answers.Q2 === 'yes',
      q3: answers.Q3 === 'yes', q4: answers.Q4 === 'yes',
      q5: answers.Q5 === 'yes', q6: answers.Q6 === 'yes',
      q7: answers.Q7 === 'yes', q8: answers.Q8 === 'yes',
      q7_count: fallCount ? parseInt(fallCount) : null,
      q7_context: fallCtx || null,
      safety_level: safetyLevel,
      safety_notes: note || null,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 3 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m3`);
  }

  if (isRed && allAnswered) {
    return <M2RedResult
      participantId={participantId}
      evalId={evalId}
      fullName={fullName}
      redFlags={PARQ_QUESTIONS.filter(q => redFlags.includes(q.id))}
      onBack={() => setAnswers(prev => ({ ...prev, Q1: null, Q2: null }))}
      onContinue={handleNext}
      loading={loading}
    />;
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 2 — Sécurité PAR-Q+" step={2} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={2} />

      <div className="sf-content" style={{ padding: 16 }}>
        <div className="alert alert-teal" style={{ marginBottom: 16, borderLeft: 'none', background: 'var(--accent-50)', border: '1px solid var(--accent-200)' }}>
          <Mic size={20} color="var(--accent-600)" />
          <div>Posez ces questions oralement à votre participant. Saisissez les réponses.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PARQ_QUESTIONS.map(q => (
            <div key={q.id} style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{
                  background: 'var(--slate-100)', color: 'var(--slate-500)',
                  fontSize: 10, fontWeight: 600, padding: '3px 7px',
                  borderRadius: 4, marginTop: 2, flexShrink: 0,
                }}>{q.id}</span>
                <div style={{ fontSize: 14, color: 'var(--slate-800)', lineHeight: 1.45 }}>{q.text}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button type="button" style={{
                  flex: 1, height: 40, borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', border: '1px solid',
                  background: answers[q.id] === 'yes' ? 'var(--red-600)' : 'var(--red-50)',
                  color: answers[q.id] === 'yes' ? '#fff' : 'var(--red-700)',
                  borderColor: answers[q.id] === 'yes' ? 'var(--red-600)' : 'var(--red-300)',
                }} onClick={() => setAnswer(q.id, 'yes')}>Oui</button>
                <button type="button" style={{
                  flex: 1, height: 40, borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', border: '1px solid',
                  background: answers[q.id] === 'no' ? 'var(--green-600)' : 'var(--green-50)',
                  color: answers[q.id] === 'no' ? '#fff' : 'var(--green-700)',
                  borderColor: answers[q.id] === 'no' ? 'var(--green-600)' : 'var(--green-300)',
                }} onClick={() => setAnswer(q.id, 'no')}>Non</button>
              </div>
              {q.hasFollowup && answers[q.id] === 'yes' && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div>
                    <label className="label" style={{ fontSize: 12 }}>Combien de fois ?</label>
                    <input className="field" type="number" style={{ height: 40 }} value={fallCount} onChange={e => setFallCount(e.target.value)} />
                  </div>
                  <div>
                    <label className="label" style={{ fontSize: 12 }}>Dans quel contexte ?</label>
                    <input className="field" style={{ height: 40 }} placeholder="Escaliers, sol mouillé..." value={fallCtx} onChange={e => setFallCtx(e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <label className="label">Notes sécurité</label>
          <textarea className="field" rows={3} placeholder="Informations complémentaires sur l'état de santé..." value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m1`)}
        onNext={handleNext}
        nextLabel="Suivant"
        isLoading={loading}
      />
    </div>
  );
}

function M2RedResult({ participantId, evalId, fullName, redFlags, onBack, onContinue, loading }: {
  participantId: string; evalId: string; fullName: string;
  redFlags: typeof PARQ_QUESTIONS; onBack: () => void;
  onContinue: () => void; loading: boolean;
}) {
  const router = useRouter();
  return (
    <div className="sf-screen">
      <ModuleHeader
        participantName={fullName}
        moduleTitle="Module 2 — Sécurité PAR-Q+"
        step={2}
        onClose={() => router.push('/dashboard')}
      />
      <ProgressDots current={2} />

      <div className="sf-content" style={{ padding: 16 }}>
        <div style={{
          background: 'var(--red-50)', border: '2px solid var(--red-400)',
          borderRadius: 12, padding: 20, textAlign: 'center',
        }}>
          <ShieldX size={32} color="var(--red-600)" strokeWidth={2.2} style={{ margin: '0 auto' }} />
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--red-800)', marginTop: 12 }}>
            Évaluation physique suspendue
          </div>
          <div style={{ fontSize: 14, color: 'var(--red-700)', marginTop: 8, lineHeight: 1.5 }}>
            Ce participant présente des facteurs de risque nécessitant un avis médical avant toute évaluation physique.
          </div>
          <div style={{ height: 1, background: 'var(--red-200)', margin: '16px 0' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--red-700)', marginBottom: 6 }}>
              Raison(s) identifiée(s) :
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 16px', color: 'var(--red-600)', fontSize: 13, lineHeight: 1.6 }}>
              {redFlags.map(q => <li key={q.id}>{q.id} — {q.text}</li>)}
            </ul>
          </div>
          <div style={{
            marginTop: 16, background: '#fff',
            border: '1px solid var(--red-200)', borderRadius: 8, padding: 12, textAlign: 'left',
          }}>
            <div style={{ fontSize: 13, color: 'var(--red-800)', lineHeight: 1.5 }}>
              <strong style={{ fontWeight: 600 }}>Recommandation :</strong> Orienter vers le médecin traitant avant de reprendre. Remettre la fiche d'orientation si disponible.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate-700)', marginBottom: 10 }}>
            Vous pouvez continuer avec :
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--slate-700)' }}>
              <CheckCircle size={18} color="var(--accent-600)" />
              <span>Module 3 — Habitudes de vie (sans risque)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--slate-700)' }}>
              <CheckCircle size={18} color="var(--accent-600)" />
              <span>Module 4 — Questionnaire fonctionnel (sans risque)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--slate-400)' }}>
              <X size={18} color="var(--red-500)" />
              <span style={{ textDecoration: 'line-through' }}>Module 5 — Tests physiques (bloqué)</span>
            </div>
          </div>
        </div>
        <div style={{ height: 8 }} />
      </div>

      <div className="sf-footer" style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-outline" onClick={onBack} style={{ flex: '0 0 45%' }}>
          Retour au PAR-Q+
        </button>
        <button className="btn btn-amber" onClick={onContinue} disabled={loading} style={{ flex: 1 }}>
          {loading ? 'Enregistrement...' : 'Continuer vers M3 →'}
        </button>
      </div>
    </div>
  );
}
