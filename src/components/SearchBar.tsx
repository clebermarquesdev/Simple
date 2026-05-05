"use client";

import Icon from "./Icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "O que você quer aprender?",
}: SearchBarProps) {
  return (
    <div className="w-full relative card-shadow rounded-xl bg-surface-container-lowest flex items-center p-2 border-2 border-transparent focus-within:border-primary transition-colors">
      <Icon name="search" className="text-on-surface-variant ml-4 text-3xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[56px] bg-transparent border-none focus:ring-0 focus:outline-none text-xl text-on-surface px-4 placeholder-on-surface-variant font-normal"
        placeholder={placeholder}
        aria-label="Buscar tutoriais"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="mr-2 p-2 rounded-full hover:bg-surface-container-high transition-colors touch-target flex items-center justify-center"
          aria-label="Limpar busca"
        >
          <Icon name="close" className="text-on-surface-variant text-2xl" />
        </button>
      )}
    </div>
  );
}
