'use client';

import { ChevronLeft } from 'lucide-react';

interface Props {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, onBack, right }: Props) {
  return (
    <div className="sf-header" style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              width: 32, height: 32, border: 'none', background: 'transparent',
              color: 'var(--slate-600)', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', borderRadius: 6,
              marginLeft: -6,
            }}
            aria-label="Retour">
            <ChevronLeft size={22} />
          </button>
        )}
        {!onBack && <div style={{ width: 32 }} />}
        <div style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 600, color: 'var(--slate-900)' }}>
          {title}
        </div>
        <div style={{ width: 32, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
      </div>
    </div>
  );
}
