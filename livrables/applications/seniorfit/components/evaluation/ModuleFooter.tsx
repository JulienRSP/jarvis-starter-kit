'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onPrev?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  nextVariant?: 'primary' | 'amber' | 'outline';
  nextIcon?: boolean;
  isLoading?: boolean;
}

export function ModuleFooter({
  onPrev,
  onNext,
  nextLabel = 'Suivant',
  prevDisabled = false,
  nextDisabled = false,
  nextVariant = 'primary',
  nextIcon = true,
  isLoading = false,
}: Props) {
  return (
    <div className="sf-footer" style={{ display: 'flex', gap: 10 }}>
      <button
        className="btn btn-outline"
        onClick={onPrev}
        disabled={prevDisabled}
        style={{ flex: '0 0 45%', padding: '0 16px', opacity: prevDisabled ? 0.5 : 1 }}>
        <ChevronLeft size={18} /> Précédent
      </button>
      <button
        className={`btn btn-${nextVariant}`}
        onClick={onNext}
        disabled={nextDisabled || isLoading}
        style={{ flex: 1, padding: '0 16px' }}>
        {isLoading ? 'Enregistrement...' : nextLabel}
        {nextIcon && !isLoading && <ChevronRight size={18} />}
      </button>
    </div>
  );
}
