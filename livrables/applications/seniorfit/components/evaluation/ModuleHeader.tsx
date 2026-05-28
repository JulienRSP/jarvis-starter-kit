'use client';

import { X } from 'lucide-react';

interface Props {
  participantName: string;
  moduleTitle: string;
  step: number;
  total?: number;
  onClose: () => void;
}

export function ModuleHeader({ participantName, moduleTitle, step, total = 9, onClose }: Props) {
  return (
    <div className="sf-header" style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={onClose}
          style={{
            width: 32, height: 32, border: 'none', background: 'transparent',
            color: 'var(--slate-500)', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', borderRadius: 6,
            marginLeft: -6,
          }}
          aria-label="Fermer">
          <X size={20} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', lineHeight: 1.25 }}>
          <div style={{ fontSize: 12, color: 'var(--slate-500)', fontWeight: 500 }}>{participantName}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--slate-900)', marginTop: 2 }}>{moduleTitle}</div>
        </div>
        <div style={{ width: 40, textAlign: 'right', fontSize: 13, fontWeight: 600, color: 'var(--accent-600)' }}>
          {step}/{total}
        </div>
      </div>
    </div>
  );
}
