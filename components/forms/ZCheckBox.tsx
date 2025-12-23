import React from 'react';

interface ZCheckBoxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function ZCheckBox({
  id,
  label,
  checked,
  onChange,
  disabled = false
}: ZCheckBoxProps) {
  return (
    <div className={`z-check-box ${disabled ? 'opacity-50' : ''}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className=""
      />
      <label
        htmlFor={id}
        className={``}
      >
        {label}
      </label>
    </div>
  );
}