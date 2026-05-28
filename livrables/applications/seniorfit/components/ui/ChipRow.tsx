'use client';

interface Props {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  multi?: boolean;
}

export function ChipRow({ options, value, onChange, multi = true }: Props) {
  const isActive = (opt: string) => value.includes(opt);
  const toggle = (opt: string) => {
    if (!multi) return onChange([opt]);
    if (value.includes(opt)) onChange(value.filter(v => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => (
        <button
          key={opt}
          className={`chip${isActive(opt) ? ' active' : ''}`}
          onClick={() => toggle(opt)}
          type="button">
          {opt}
        </button>
      ))}
    </div>
  );
}
