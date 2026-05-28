'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="sf-screen" style={{ background: 'var(--slate-50)' }}>
      <div className="sf-content" style={{ display: 'flex', flexDirection: 'column', padding: '0 0 28px' }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', padding: '40px 24px 0' }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto 14px',
            borderRadius: 14, background: 'var(--accent-50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--accent-200)',
          }}>
            <Activity size={28} color="var(--accent-600)" strokeWidth={2.4} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--slate-900)', letterSpacing: '-0.01em' }}>
            SeniorFit
          </div>
          <div style={{ fontSize: 14, color: 'var(--slate-500)', marginTop: 2 }}>Espace coach</div>
        </div>

        {/* Login card */}
        <form onSubmit={handleLogin} style={{
          margin: '32px',
          background: '#fff',
          border: '1px solid var(--slate-200)',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
        }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--slate-900)', marginBottom: 18 }}>
            Connexion
          </div>

          {error && (
            <div className="alert alert-red" style={{ marginBottom: 16 }}>
              <span>{error}</span>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label className="label">Adresse email</label>
            <input
              type="email"
              className="field"
              placeholder="votre@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label className="label">Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="field"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label="Afficher / masquer"
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  width: 36, height: 36, border: 'none', background: 'transparent',
                  cursor: 'pointer', color: 'var(--slate-400)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div style={{
          textAlign: 'center', padding: '0 32px',
          fontSize: 11, color: 'var(--slate-400)', fontStyle: 'italic',
        }}>
          Accès réservé aux coachs autorisés
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--slate-300)', paddingTop: 24 }}>
          SeniorFit v1.0
        </div>
      </div>
    </div>
  );
}
