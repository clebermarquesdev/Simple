"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export default function Switch({ checked, onChange, ariaLabel }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer
        ${checked ? "bg-primary" : "bg-outline-variant"}
      `}
    >
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md
          ${checked ? "translate-x-7" : "translate-x-1"}
        `}
      />
    </button>
  );
}
