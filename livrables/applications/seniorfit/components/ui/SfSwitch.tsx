'use client';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SfSwitch({ checked, onChange }: Props) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className="switch-slider" />
    </label>
  );
}
