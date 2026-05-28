'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Info, AlertTriangle, Flag } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { SfSwitch } from '@/components/ui/SfSwitch';
import { createClient } from '@/lib/supabase/client';

const TABS = [
  { id: 'chair',   label: 'Chair Stand' },
  { id: 'tug',     label: 'TUG' },
  { id: 'balance', label: 'Équilibre' },
  { id: 'step',    label: 'Step Test' },
  { id: 'flex',    label: 'Flexibilité' },
  { id: 'dos',     label: 'Dos' },
  { id: 'walk',    label: 'Marche' },
];

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M5Form({ participantId, evalId, fullName, sex = 'F' }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<string>('chair');
  const [chairVal, setChairVal] = useState('');
  const [tugVal, setTugVal] = useState('');
  const [balanceVal, setBalanceVal] = useState('');
  const [stepVal, setStepVal] = useState('');
  const [flexVal, setFlexVal] = useState('');
  const [dosVal, setDosVal] = useState('');
  const [walkVal, setWalkVal] = useState('');
  const [painNoted, setPainNoted] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const tugNum = parseFloat(tugVal);
  const tugAlert = !isNaN(tugNum) && tugNum > 14;
  const tugWatch = !isNaN(tugNum) && tugNum >= 10 && tugNum <= 14;

  const chairNum = parseInt(chairVal, 10);
  const chairInNorm = !isNaN(chairNum) && chairNum >= 10 && chairNum <= 15;

  function levelFor(val: string, cfg: { ok: (n: number) => boolean }): string | null {
    const n = parseFloat(val);
    if (isNaN(n)) return null;
    return cfg.ok(n) ? 'normal' : 'vigilance';
  }

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    const walkMs = parseFloat(walkVal);
    await supabase.from('evaluation_m5').upsert({
      evaluation_id: evalId,
      chair_stand_count: chairVal ? parseInt(chairVal) : null,
      chair_stand_level: chairVal ? (chairInNorm ? 'normal' : 'vigilance') : null,
      tug_seconds: tugVal ? parseFloat(tugVal) : null,
      tug_level: tugVal ? (tugAlert ? 'alert' : tugWatch ? 'vigilance' : 'normal') : null,
      semi_tandem_seconds: balanceVal ? parseFloat(balanceVal) : null,
      balance_level: levelFor(balanceVal, { ok: n => n >= 10 }),
      step_test_count: stepVal ? parseInt(stepVal) : null,
      step_test_level: levelFor(stepVal, { ok: n => n >= 68 && n <= 101 }),
      sit_reach_cm: flexVal ? parseFloat(flexVal) : null,
      sit_reach_level: levelFor(flexVal, { ok: n => n >= -1 && n <= 14 }),
      back_scratch_cm: dosVal ? parseFloat(dosVal) : null,
      back_scratch_level: levelFor(dosVal, { ok: n => n >= -9 && n <= 4 }),
      gait_speed_ms: walkVal ? walkMs : null,
      gait_speed_level: levelFor(walkVal, { ok: n => n >= 0.8 }),
      pain_noted: painNoted,
      coach_notes: note,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 6 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m6`);
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 5 — Tests physiques" step={5} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={5} />

      <div className="sf-content" style={{ padding: 16 }}>
        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 14 }}>
          {TABS.map(t => (
            <button key={t.id} className={`tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'chair' && (
          <div className="card">
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--slate-900)' }}>Chair Stand 30 secondes</div>
            <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>Force des membres inférieurs</div>
            <ProtocolBox text="Assis au bord d'une chaise, les bras croisés sur la poitrine. Se lever et s'asseoir le plus de fois possible en 30 secondes." />
            <label className="label">Nombre de levers en 30 s</label>
            <BigInput value={chairVal} onChange={setChairVal} suffix="répétitions" />
            {chairVal && (
              <ResultBanner
                tone={chairInNorm ? 'green' : 'amber'}
                label={chairInNorm ? 'Dans la norme' : 'Hors norme'}
                normText="Normes : 10-15 reps pour 70-74 ans (F)"
              />
            )}
            <PainNote pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote} />
          </div>
        )}

        {tab === 'tug' && (
          <div>
            <div className="card">
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--slate-900)' }}>Timed Up &amp; Go (TUG)</div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>Mobilité dynamique et risque de chute</div>
              <ProtocolBox text="Assis(e). Au top, se lever, marcher 3 m, faire demi-tour, revenir s'asseoir. Chronométrer." />
              <label className="label">Temps en secondes</label>
              <BigInput value={tugVal} onChange={setTugVal} suffix="secondes" />
              {tugAlert && (
                <div style={{ background: 'var(--red-50)', border: '1px solid var(--red-300)', borderRadius: 8, padding: '12px 14px', marginTop: 8, display: 'flex', gap: 10 }}>
                  <AlertTriangle size={20} color="var(--red-600)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--red-700)' }}>ALERTE — Risque de chute élevé</div>
                    <div style={{ fontSize: 13, color: 'var(--red-600)', marginTop: 2 }}>{tugNum.toFixed(1)} s &gt; seuil d'alerte (14 s)</div>
                    <div style={{ fontSize: 12, color: 'var(--red-500)', marginTop: 4, lineHeight: 1.4 }}>
                      Critère fort pour le profil <strong>P4 — Risque chute prioritaire</strong>.
                    </div>
                  </div>
                </div>
              )}
              {tugWatch && (
                <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-200)', borderRadius: 8, padding: '10px 12px', marginTop: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--amber-700)' }}>Vigilance</div>
                  <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>{tugNum.toFixed(1)} s — Zone d'attention</div>
                </div>
              )}
              {tugVal && !tugAlert && !tugWatch && (
                <ResultBanner tone="green" label="Dans la norme" normText="Norme : < 10 s normal / 10-14 s vigilance / > 14 s alerte" />
              )}
              <PainNote pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote} />
            </div>
            {tugAlert && (
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                <Flag size={14} color="var(--red-500)" />
                <span style={{ fontSize: 12, color: 'var(--red-600)' }}>Drapeau M5-TUG ajouté au profil</span>
              </div>
            )}
          </div>
        )}

        {tab === 'balance' && (
          <GenericTest
            title="Équilibre semi-tandem" subtitle="Stabilité posturale statique"
            protocol="Pieds en semi-tandem (talon contre le creux du pied opposé), bras le long du corps. Tenir la position le plus longtemps possible, maximum 30 secondes."
            value={balanceVal} onChange={setBalanceVal} suffix="secondes"
            normText="Norme : ≥ 10 s = stable / < 10 s = vigilance"
            evaluate={n => n >= 10 ? { label: 'Dans la norme', tone: 'green' } : { label: 'Vigilance', tone: 'amber' }}
            pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote}
          />
        )}

        {tab === 'step' && (
          <GenericTest
            title="Step Test 2 minutes" subtitle="Endurance cardio-respiratoire"
            protocol="Lever alternativement les genoux à mi-hauteur (mi-cuisse) pendant 2 minutes. Compter le nombre de levers du genou droit."
            value={stepVal} onChange={setStepVal} suffix="levers (genou droit)"
            normText="Normes : 68-101 pour 70-74 ans (F)"
            evaluate={n => (n >= 68 && n <= 101) ? { label: 'Dans la norme', tone: 'green' } : { label: 'Hors norme', tone: 'amber' }}
            pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote}
          />
        )}

        {tab === 'flex' && (
          <GenericTest
            title="Sit & Reach (chaise)" subtitle="Flexibilité des membres inférieurs"
            protocol="Assis(e) au bord de la chaise, une jambe tendue talon au sol. Tenter de toucher les orteils. Mesurer l'écart : + si on dépasse, − s'il manque."
            value={flexVal} onChange={setFlexVal} suffix="cm (+ / −)"
            normText="Norme : −1 à +14 cm (F 70-74)"
            evaluate={n => (n >= -1 && n <= 14) ? { label: 'Dans la norme', tone: 'green' } : { label: 'Hors norme', tone: 'amber' }}
            pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote}
          />
        )}

        {tab === 'dos' && (
          <GenericTest
            title="Back Scratch" subtitle="Flexibilité des épaules"
            protocol="Une main par-dessus l'épaule, l'autre dans le dos par en-dessous. Mesurer l'écart entre les majeurs : + s'ils se chevauchent, − s'il reste un écart."
            value={dosVal} onChange={setDosVal} suffix="cm (+ / −)"
            normText="Norme : −9 à +4 cm (F)"
            evaluate={n => (n >= -9 && n <= 4) ? { label: 'Dans la norme', tone: 'green' } : { label: 'Hors norme', tone: 'amber' }}
            pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote}
          />
        )}

        {tab === 'walk' && (
          <GenericTest
            title="Vitesse de marche (4 m)" subtitle="Mobilité fonctionnelle"
            protocol="Marcher 4 mètres à allure habituelle. Chronométrer puis calculer la vitesse (distance ÷ temps)."
            value={walkVal} onChange={setWalkVal} suffix="m/s"
            normText="Norme : > 0,8 m/s = normal"
            evaluate={n => n >= 0.8 ? { label: 'Dans la norme', tone: 'green' } : { label: 'Vigilance', tone: 'amber' }}
            pain={painNoted} onPain={setPainNoted} note={note} onNote={setNote}
          />
        )}

        {/* Test progress */}
        <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12, padding: 14, marginTop: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate-700)', marginBottom: 10 }}>Progression des tests</div>
          {TABS.map(t => {
            const vals: Record<string, string> = { chair: chairVal, tug: tugVal, balance: balanceVal, step: stepVal, flex: flexVal, dos: dosVal, walk: walkVal };
            const isDone = !!vals[t.id] && t.id !== tab;
            const isCurrent = t.id === tab;
            return (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: isCurrent ? 'var(--accent-700)' : 'var(--slate-500)', padding: '4px 0' }}>
                {isDone
                  ? <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--accent-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                  : <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid ' + (isCurrent ? 'var(--accent-500)' : 'var(--slate-300)'), display: 'inline-block', flexShrink: 0, background: isCurrent ? 'var(--accent-50)' : 'transparent' }} />
                }
                <span style={{ fontWeight: isCurrent ? 600 : 400 }}>{t.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: isCurrent ? 'var(--accent-600)' : isDone ? 'var(--slate-400)' : 'var(--slate-400)' }}>
                  {isCurrent ? 'En cours' : isDone ? 'Complété' : 'En attente'}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m4`)}
        onNext={handleNext}
        nextLabel="Module suivant"
        isLoading={loading}
      />
    </div>
  );
}

function ProtocolBox({ text }: { text: string }) {
  return (
    <div style={{ background: 'var(--slate-50)', borderRadius: 8, padding: '10px 12px', margin: '12px 0', display: 'flex', gap: 10 }}>
      <Info size={18} color="var(--slate-400)" style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ fontSize: 12, color: 'var(--slate-600)', lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

function BigInput({ value, onChange, suffix }: { value: string; onChange: (v: string) => void; suffix: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '12px 0' }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: 140, height: 64, textAlign: 'center',
          border: '1px solid var(--slate-300)', borderRadius: 12,
          fontFamily: 'inherit', fontSize: 28, fontWeight: 700,
          color: 'var(--accent-700)', outline: 'none',
        }}
      />
      <div style={{ fontSize: 12, color: 'var(--slate-400)', marginTop: 6 }}>{suffix}</div>
    </div>
  );
}

function ResultBanner({ tone, label, normText }: { tone: string; label: string; normText: string }) {
  const map: Record<string, { bg: string; bd: string; tx: string }> = {
    green: { bg: 'var(--green-50)', bd: 'var(--green-200)', tx: 'var(--green-700)' },
    amber: { bg: 'var(--amber-50)', bd: 'var(--amber-200)', tx: 'var(--amber-700)' },
    red:   { bg: 'var(--red-50)',   bd: 'var(--red-200)',   tx: 'var(--red-700)' },
  };
  const c = map[tone] || map.amber;
  return (
    <div style={{ background: c.bg, border: '1px solid ' + c.bd, borderRadius: 8, padding: '10px 12px', marginTop: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: c.tx }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>{normText}</div>
    </div>
  );
}

function PainNote({ pain, onPain, note, onNote }: { pain: boolean; onPain: (v: boolean) => void; note: string; onNote: (v: string) => void }) {
  return (
    <>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--slate-700)' }}>Douleur observée ?</div>
        <SfSwitch checked={pain} onChange={onPain} />
      </div>
      <label className="label" style={{ marginTop: 14 }}>Commentaire</label>
      <textarea className="field" rows={2} placeholder="Observations, asymétrie, compensation..." value={note} onChange={e => onNote(e.target.value)} />
    </>
  );
}

function GenericTest({ title, subtitle, protocol, value, onChange, suffix, normText, evaluate, pain, onPain, note, onNote }: {
  title: string; subtitle: string; protocol: string;
  value: string; onChange: (v: string) => void; suffix: string;
  normText: string;
  evaluate: (n: number) => { label: string; tone: string } | null;
  pain: boolean; onPain: (v: boolean) => void; note: string; onNote: (v: string) => void;
}) {
  const n = parseFloat(value);
  const result = !isNaN(n) ? evaluate(n) : null;
  return (
    <div className="card">
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--slate-900)' }}>{title}</div>
      <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>{subtitle}</div>
      <ProtocolBox text={protocol} />
      <BigInput value={value} onChange={onChange} suffix={suffix} />
      {result && <ResultBanner tone={result.tone} label={result.label} normText={normText} />}
      <PainNote pain={pain} onPain={onPain} note={note} onNote={onNote} />
    </div>
  );
}
