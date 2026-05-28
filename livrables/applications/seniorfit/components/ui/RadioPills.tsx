'use client';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props {
  options: (string | Option)[];
  value: string;
  onChange: (value: string) => void;
  cols?: number;
}

export function RadioPills({ options, value, onChange, cols = 2 }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
      {options.map(opt => {
        const optVal = typeof opt === 'string' ? opt : opt.value;
        const optLabel = typeof opt === 'string' ? opt : opt.label;
        const optIcon = typeof opt === 'object' ? opt.icon : null;
        return (
          <button
            key={optVal}
            type="button"
            className={`radio-pill${value === optVal ? ' active' : ''}`}
            onClick={() => onChange(optVal)}
            style={{ flex: 'unset' }}>
            {optIcon}{optLabel}
          </button>
        );
      })}
    </div>
  );
}
