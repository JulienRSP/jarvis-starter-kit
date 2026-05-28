'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Check, FileText, FileHeart, Shield, Download } from 'lucide-react';
import { ModuleHeader } from '@/components/evaluation/ModuleHeader';
import { ProgressDots } from '@/components/evaluation/ProgressDots';
import { ModuleFooter } from '@/components/evaluation/ModuleFooter';
import { createClient } from '@/lib/supabase/client';

interface Props { participantId: string; evalId: string; fullName: string; sex?: string; }

export default function M9Form({ participantId, evalId, fullName }: Props) {
  const router = useRouter();
  const [coachPdfLoading, setCoachPdfLoading] = useState(false);
  const [clientPdfLoading, setClientPdfLoading] = useState(false);
  const [coachGen, setCoachGen] = useState(false);
  const [clientGen, setClientGen] = useState(false);
  const [finishing, setFinishing] = useState(false);

  async function generatePdf(type: 'coach' | 'client') {
    if (type === 'coach') setCoachPdfLoading(true);
    else setClientPdfLoading(true);

    try {
      const response = await fetch(`/api/pdf/${type}?evalId=${evalId}`, { method: 'POST' });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SeniorFit-${type === 'coach' ? 'Coach' : 'Client'}-${evalId.slice(0, 8)}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        if (type === 'coach') setCoachGen(true);
        else setClientGen(true);
      }
    } finally {
      if (type === 'coach') setCoachPdfLoading(false);
      else setClientPdfLoading(false);
    }
  }

  async function handleFinish() {
    setFinishing(true);
    const supabase = createClient();
    await supabase.from('evaluations')
      .update({ status: 'completed', completed_at: new Date().toISOString(), current_module: 9 })
      .eq('id', evalId);
    router.push('/dashboard');
  }

  return (
    <div className="sf-screen">
      <ModuleHeader participantName={fullName} moduleTitle="Module 9 — Génération" step={9} onClose={() => router.push('/dashboard')} />
      <ProgressDots current={9} />

      <div className="sf-content" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Summary */}
        <div style={{ background: 'var(--accent-50)', border: '1px solid var(--accent-200)', borderRadius: 16, padding: 20 }}>
          <Award size={24} color="var(--accent-600)" />
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-800, #115e59)', marginTop: 8 }}>
            Évaluation complète
          </div>
          <div style={{ fontSize: 13, color: 'var(--accent-700)', marginTop: 2 }}>{fullName}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
            {[
              'Tous les modules complétés',
              'Profil P3 — Fragile Fonctionnel attribué',
              'Programme 12 semaines généré',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--accent-700)' }}>
                <Check size={16} color="var(--green-600)" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--slate-700)' }}>Fiches à générer</div>

        {/* Coach PDF */}
        <div className="card">
          <div style={{ display: 'flex', gap: 12 }}>
            <FileText size={22} color="var(--slate-600)" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--slate-800)' }}>Fiche Coach — Technique</div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2, lineHeight: 1.4 }}>
                Scores bruts, normes, profil, programme complet, notes coach
              </div>
            </div>
          </div>
          {coachGen ? (
            <button
              className="btn"
              onClick={() => generatePdf('coach')}
              style={{
                width: '100%', height: 40, marginTop: 12,
                background: 'var(--green-50)', color: 'var(--green-700)',
                border: '1px solid var(--green-200)',
              }}>
              <Check size={18} color="var(--green-600)" /> Fiche générée — Télécharger à nouveau
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => generatePdf('coach')}
              disabled={coachPdfLoading}
              style={{ width: '100%', height: 40, marginTop: 12 }}>
              {coachPdfLoading ? 'Génération...' : <><Download size={16} /> Générer et télécharger</>}
            </button>
          )}
        </div>

        {/* Client PDF */}
        <div className="card">
          <div style={{ display: 'flex', gap: 12 }}>
            <FileHeart size={22} color="var(--accent-500)" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--slate-800)' }}>Fiche Client — Simplifiée</div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2, lineHeight: 1.4 }}>
                Langage accessible, points forts, programme simplifié
              </div>
              <div style={{ fontSize: 11, color: 'var(--accent-600)', fontStyle: 'italic', marginTop: 4 }}>
                Destinée à être remise au participant
              </div>
            </div>
          </div>
          {clientGen ? (
            <button
              className="btn"
              onClick={() => generatePdf('client')}
              style={{
                width: '100%', height: 40, marginTop: 12,
                background: 'var(--green-50)', color: 'var(--green-700)',
                border: '1px solid var(--green-200)',
              }}>
              <Check size={18} color="var(--green-600)" /> Fiche générée — Télécharger à nouveau
            </button>
          ) : (
            <button
              className="btn btn-outline"
              onClick={() => generatePdf('client')}
              disabled={clientPdfLoading}
              style={{ width: '100%', height: 40, marginTop: 12 }}>
              {clientPdfLoading ? 'Génération...' : <><Download size={16} /> Générer et télécharger</>}
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <div style={{
          background: 'var(--slate-50)', border: '1px solid var(--slate-200)',
          borderRadius: 8, padding: 12, display: 'flex', gap: 10,
        }}>
          <Shield size={16} color="var(--slate-400)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 11, color: 'var(--slate-500)', fontStyle: 'italic', lineHeight: 1.5 }}>
            Cet outil est une aide à la décision pour un professionnel diplômé. Il ne remplace pas un avis médical. SeniorFit n'est pas un outil de diagnostic.
          </div>
        </div>

        <div style={{ height: 8 }} />
      </div>

      <ModuleFooter
        onPrev={() => router.push(`/participants/${participantId}/evaluations/${evalId}/m8`)}
        onNext={handleFinish}
        nextLabel="Terminer l'évaluation"
        nextIcon={false}
        isLoading={finishing}
      />
    </div>
  );
}
