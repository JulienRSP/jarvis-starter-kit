import { Check } from 'lucide-react';

interface Props {
  current: number;
  total?: number;
}

export function ProgressDots({ current, total = 9 }: Props) {
  return (
    <div className="prog-row">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const cls = n < current ? 'prog-dot done' : n === current ? 'prog-dot active' : 'prog-dot';
        return (
          <div key={n} className={cls}>
            {n < current ? <Check size={14} color="#fff" strokeWidth={3} /> : n}
          </div>
        );
      })}
    </div>
  );
}
