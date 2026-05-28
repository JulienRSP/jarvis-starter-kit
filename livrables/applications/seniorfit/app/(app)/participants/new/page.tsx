'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { calculateAge, calculateBMI, bmiCategory } from '@/lib/utils';

export default function NewParticipantPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bmi = useMemo(() => {
    const h = parseFloat(heightCm), w = parseFloat(weightKg);
    if (!h || !w || h < 50 || h > 250 || w < 20 || w > 300) return null;
    return calculateBMI(h, w);
  }, [heightCm, weightKg]);

  const bmiInfo = bmi !== null ? bmiCategory(bmi) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !dob || !sex) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const { data: participant, error: pErr } = await supabase
      .from('participants')
      .insert({
        coach_id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        date_of_birth: dob,
        sex,
        email: email.trim() || null,
        height_cm: heightCm ? parseFloat(heightCm) : null,
        weight_kg: weightKg ? parseFloat(weightKg) : null,
        bmi: bmi ? parseFloat(bmi.toFixed(1)) : null,
      })
      .select()
      .single();

    if (pErr || !participant) {
      setError('Erreur lors de la création du participant.');
      setLoading(false);
      return;
    }

    // Create evaluation
    const { data: evaluation, error: eErr } = await supabase
      .from('evaluations')
      .insert({
        participant_id: participant.id,
        coach_id: user.id,
        status: 'draft',
        current_module: 1,
      })
      .select()
      .single();

    if (eErr || !evaluation) {
      setError('Erreur lors de la création de l\'évaluation.');
      setLoading(false);
      return;
    }

    router.push(`/participants/${participant.id}/evaluations/${evaluation.id}/m1`);
  }

  return (
    <div className="sf-screen">
      <div className="sf-header" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              width: 32, height: 32, border: 'none', background: 'transparent',
              color: 'var(--slate-600)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -6,
            }}>
            <ChevronLeft size={22} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>
            Nouveau participant
          </div>
          <div style={{ width: 32 }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="sf-content" style={{ padding: 16 }}>
        <div className="section-eyebrow">Identité</div>

        <div className="card" style={{ marginBottom: 16 }}>
          {error && (
            <div className="alert alert-red" style={{ marginBottom: 12 }}>
              <span>{error}</span>
            </div>
          )}

          <label className="label">Prénom *</label>
          <input
            className="field"
            placeholder="Marie"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />

          <label className="label" style={{ marginTop: 12 }}>Nom *</label>
          <input
            className="field"
            placeholder="Dupont"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />

          <label className="label" style={{ marginTop: 12 }}>Date de naissance *</label>
          <input
            className="field"
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            required
          />
          {dob && (
            <div className="helper">Âge : {calculateAge(dob)} ans</div>
          )}

          <label className="label" style={{ marginTop: 12 }}>Sexe *</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ val: 'F', label: 'Femme' }, { val: 'M', label: 'Homme' }].map(opt => (
              <button
                key={opt.val}
                type="button"
                onClick={() => setSex(opt.val)}
                className={`radio-pill${sex === opt.val ? ' active' : ''}`}
                style={{ flex: 1 }}>
                {opt.label}
              </button>
            ))}
          </div>

          <label className="label" style={{ marginTop: 12 }}>Email (optionnel)</label>
          <input
            className="field"
            type="email"
            placeholder="marie@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="helper">Pour lui envoyer sa fiche client</div>
        </div>

        <div className="section-eyebrow">Mesures</div>

        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label className="label">Taille (cm)</label>
              <input
                className="field"
                type="number"
                placeholder="165"
                value={heightCm}
                onChange={e => setHeightCm(e.target.value)}
                min={100} max={250}
              />
            </div>
            <div>
              <label className="label">Poids (kg)</label>
              <input
                className="field"
                type="number"
                placeholder="68"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                min={20} max={300}
              />
            </div>
          </div>

          {bmi !== null && bmiInfo && (
            <div style={{
              marginTop: 14, background: 'var(--accent-50)',
              border: '1px solid var(--accent-200)', borderRadius: 8, padding: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-700)' }}>
                  IMC calculé : {bmi.toFixed(1)} kg/m²
                </div>
                <span className={bmiInfo.badgeClass}>{bmiInfo.label}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--slate-500)', fontStyle: 'italic', marginTop: 6 }}>
                Note : l'IMC est moins fiable après 70 ans
              </div>
            </div>
          )}
        </div>

        <div style={{ height: 12 }} />
      </form>

      <div className="sf-footer">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', height: 52 }}>
          {loading ? 'Création...' : 'Créer et démarrer l\'évaluation'}
          {!loading && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
