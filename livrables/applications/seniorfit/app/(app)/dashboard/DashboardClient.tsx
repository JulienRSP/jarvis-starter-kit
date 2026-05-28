'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ClipboardList, Settings, Search, UserPlus, ChevronRight } from 'lucide-react';
import { ProfileBadge } from '@/components/evaluation/ProfileBadge';
import type { Profile } from '@/lib/types';
import { PROFILE_LABELS } from '@/lib/types';

interface ParticipantRow {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  sex: string;
  age: number;
  lastEvalDate: string | null;
  lastProfile: string | null;
  lastEvalId: string | null;
}

interface Props {
  participants: ParticipantRow[];
  coachInitials: string;
}

function formatEvalDate(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

export function DashboardClient({ participants, coachInitials }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = participants.filter(p =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="sf-screen">
      {/* App header */}
      <div className="sf-header" style={{ padding: '12px 16px 0', height: 90 }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent-600)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em',
            }}>SF</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--slate-900)' }}>SeniorFit</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent-50)', color: 'var(--accent-700)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 600,
            border: '1px solid var(--accent-200)',
          }}>{coachInitials}</div>
        </div>
      </div>

      <div className="sf-content" style={{ padding: '20px 16px 16px' }}>
        <h1 className="h1">Mes participants</h1>
        <div style={{ fontSize: 14, color: 'var(--slate-500)', marginTop: 4 }}>
          {participants.length} participant{participants.length !== 1 ? 's' : ''} actif{participants.length !== 1 ? 's' : ''}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginTop: 16 }}>
          <Search size={18} color="var(--slate-400)" style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }} />
          <input
            className="field"
            placeholder="Rechercher par nom..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ paddingLeft: 40, height: 44 }}
          />
        </div>

        {/* Primary action */}
        <button
          className="btn btn-primary"
          onClick={() => router.push('/participants/new')}
          style={{ width: '100%', marginTop: 16 }}>
          <UserPlus size={18} /> Nouveau participant
        </button>

        {/* Participant list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          {participants.length === 0 && (
            <div style={{ paddingTop: 40, textAlign: 'center' }}>
              <div style={{
                width: 96, height: 96, borderRadius: '50%',
                background: 'var(--accent-50)',
                border: '1px dashed var(--accent-300)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Users size={44} color="var(--accent-600)" strokeWidth={1.4} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--slate-700)', marginBottom: 8 }}>
                Aucun participant
              </div>
              <div style={{ fontSize: 14, color: 'var(--slate-500)', lineHeight: 1.5 }}>
                Commencez votre première évaluation en ajoutant un participant.
              </div>
            </div>
          )}

          {filtered.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                if (p.lastEvalId) {
                  router.push(`/participants/${p.id}/evaluations/${p.lastEvalId}/m1`);
                } else {
                  router.push(`/participants/${p.id}/evaluations/new`);
                }
              }}
              style={{
                width: '100%', background: '#fff', border: '1px solid var(--slate-200)',
                borderRadius: 12, padding: '14px 16px', textAlign: 'left',
                cursor: 'pointer', boxShadow: '0 1px 2px rgba(15,23,42,0.03)',
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'inherit',
              }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 8, marginBottom: 4,
                }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--slate-900)' }}>
                    {p.first_name} {p.last_name}
                  </div>
                  {p.lastProfile && (
                    <ProfileBadge profile={p.lastProfile as Profile} />
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--slate-500)' }}>
                  {p.age} ans • {p.sex === 'F' ? 'Femme' : 'Homme'}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginTop: 6,
                }}>
                  <div style={{ fontSize: 12, color: 'var(--slate-400)' }}>
                    Dernière éval. : {formatEvalDate(p.lastEvalDate)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--accent-600)', fontWeight: 500 }}>
                    {p.lastEvalId ? 'Continuer →' : 'Démarrer →'}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="var(--slate-300)" />
            </button>
          ))}

          {filtered.length === 0 && query && (
            <div style={{
              padding: 24, textAlign: 'center',
              color: 'var(--slate-400)', fontSize: 13,
            }}>Aucun participant ne correspond.</div>
          )}
        </div>
        <div style={{ height: 12 }} />
      </div>

      {/* Bottom tab bar */}
      <div className="tabbar">
        <button className="tabbar-item active" onClick={() => router.push('/dashboard')}>
          <Users size={22} strokeWidth={2.2} />
          <span>Participants</span>
        </button>
        <button className="tabbar-item" onClick={() => {}}>
          <ClipboardList size={22} strokeWidth={1.7} />
          <span>Évaluations</span>
        </button>
        <button className="tabbar-item" onClick={() => {}}>
          <Settings size={22} strokeWidth={1.7} />
          <span>Paramètres</span>
        </button>
      </div>
    </div>
  );
}
