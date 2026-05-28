'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, HelpCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { ChipRow } from '@/components/ui/ChipRow';
import { RadioPills } from '@/components/ui/RadioPills';
import { createClient } from '@/lib/supabase/client';

interface Props {
  participantId: string;
  evalId: string;
  fullName: string;
  sex?: string;
}

export default function M1Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [situation, setSituation] = useState('Seul(e)');
  const [autonomy, setAutonomy] = useState('Totalement autonome');
  const [objective, setObjective] = useState('');
  const [motivations, setMotivations] = useState<string[]>([]);
  const [frequency, setFrequency] = useState('2x');
  const [duration, setDuration] = useState('45 min');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [attitude, setAttitude] = useState<string[]>([]);
  const [gait, setGait] = useState<string[]>([]);
  const [coachNote, setCoachNote] = useState('');
  const [loading, setLoading] = useState(false);

  const gaitFlag = gait.some(g => ['Boiterie', 'Petits pas', "Recherche d'appui", 'Déambulateur/canne'].includes(g));

  async function handleNext() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('evaluation_m1').upsert({
      evaluation_id: evalId,
      living_situation: situation,
      autonomy_level: autonomy,
      client_goal: objective,
      motivations,
      sessions_per_week: frequency,
      session_duration: parseInt(duration),
      home_equipment: equipment,
      coach_impressions: attitude,
      gait_observations: gait,
      coach_notes: coachNote,
      updated_at: new Date().toISOString(),
    });
    await supabase.from('evaluations').update({ current_module: 2 }).eq('id', evalId);
    router.push(`/participants/${participantId}/evaluations/${evalId}/m2`);
  }

  return (
    <div className="sf-screen">
      <ModuleHeader
        participantName={fullName}
        moduleTitle="Module 1 — Identification"
        step={1}
        onClose={() => router.push('/dashboard')}
      />
      <ProgressDots current={1} />

      <div className="sf-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Contexte de vie */}
        <div className="card">
          <div className="section-eyebrow">Contexte de vie</div>
          <label className="label">Situation de vie</label>
          <RadioPills
            options={['Seul(e)', 'En couple', 'Famille proche', 'Maison de retraite']}
            value={situation}
            onChange={setSituation}
            cols={2}
          />
          <label className="label" style={{ marginTop: 14 }}>Autonomie perçue</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { value: 'Totalement autonome', icon: <CheckCircle size={18} color="var(--green-600)" /> },
              { value: 'Aide ponctuelle',     icon: <HelpCircle size={18} color="var(--amber-500)" /> },
              { value: 'Aide régulière',      icon: <AlertCircle size={18} color="var(--red-600)" /> },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAutonomy(opt.value)}
                className={`radio-pill${autonomy === opt.value ? ' active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', gap: 12, height: 48, paddingLeft: 14 }}>
                {opt.icon}
                <span>{opt.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Objectif */}
        <div className="card">
          <div className="section-eyebrow">Objectif du participant</div>
          <label className="label">Objectif exprimé par la personne</label>
          <div className="helper" style={{ marginTop: -2, marginBottom: 8, fontStyle: 'italic' }}>
            Notez ses mots exacts — cette phrase apparaîtra dans sa fiche
          </div>
          <textarea
            className="field"
            rows={3}
            placeholder="Ex : Je veux rester capable de monter mes escaliers seul..."
            value={objective}
            onChange={e => setObjective(e.target.value)}
          />
          <label className="label" style={{ marginTop: 14 }}>Motivation principale</label>
          <ChipRow
            options={['Santé', 'Autonomie', 'Prévention chute', 'Perte de poids', 'Lien social', 'Bien-être']}
            value={motivations}
            onChange={setMotivations}
          />
        </div>

        {/* Disponibilité */}
        <div className="card">
          <div className="section-eyebrow">Disponibilité</div>
          <label className="label">Séances encadrées / semaine</label>
          <select className="field" value={frequency} onChange={e => setFrequency(e.target.value)}>
            <option value="1x">1×</option>
            <option value="2x">2×</option>
            <option value="3x">3×</option>
            <option value="collectif">+ collectif</option>
          </select>
          <label className="label" style={{ marginTop: 14 }}>Durée possible</label>
          <RadioPills
            options={['30 min', '45 min', '60 min']}
            value={duration}
            onChange={setDuration}
            cols={3}
          />
        </div>

        {/* Matériel */}
        <div className="card">
          <div className="section-eyebrow">Matériel disponible à domicile</div>
          <div className="helper" style={{ marginTop: -6, marginBottom: 10 }}>
            Sélectionnez tout ce qui est disponible
          </div>
          <ChipRow
            options={['Aucun', 'Chaise stable', 'Élastiques', 'Tapis', 'Haltères légers', 'Step']}
            value={equipment}
            onChange={setEquipment}
          />
        </div>

        {/* Premières impressions */}
        <div className="card">
          <div className="section-eyebrow">Premières impressions du coach</div>
          <label className="label">Attitude et posture à l'arrivée</label>
          <ChipRow
            options={['Enthousiaste', 'Anxieux/se', 'Réservé(e)', 'Confiant(e)', 'Fatigué(e)']}
            value={attitude}
            onChange={setAttitude}
          />
          <label className="label" style={{ marginTop: 14 }}>Marche observée</label>
          <ChipRow
            options={['Normale', 'Boiterie', 'Petits pas', "Recherche d'appui", 'Déambulateur/canne']}
            value={gait}
            onChange={setGait}
          />
          {gaitFlag && (
            <div className="alert alert-amber" style={{ marginTop: 12 }}>
              <AlertTriangle size={20} color="var(--amber-500)" />
              <div>
                <strong style={{ fontWeight: 600 }}>Surveiller le test TUG en M5</strong> avec une attention particulière.
              </div>
            </div>
          )}
        </div>

        {/* Note libre */}
        <div className="card">
          <div className="section-eyebrow">Note libre du coach</div>
          <textarea
            className="field"
            rows={3}
            placeholder="Contexte particulier, informations complémentaires..."
            value={coachNote}
            onChange={e => setCoachNote(e.target.value)}
            style={{ background: 'var(--slate-50)' }}
          />
        </div>

        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push('/dashboard')}
        onNext={handleNext}
        prevDisabled={true}
        nextLabel="Suivant"
        isLoading={loading}
      />
    </div>
  );
}
