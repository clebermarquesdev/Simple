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
    <div className="w-full relative group">
      <div className={`
        w-full flex items-center bg-surface-container-lowest rounded-2xl transition-all duration-300 border-2
        ${value ? "border-primary/30 shadow-lg" : "border-outline-variant shadow-md"}
        focus-within:border-brand-green focus-within:shadow-xl focus-within:scale-[1.01]
      `}>
        <div className="pl-5 flex items-center justify-center pointer-events-none">
          <Icon 
            name="search" 
            className={`text-2xl transition-colors duration-300 ${value ? "text-brand-green" : "text-outline"}`} 
          />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-16 bg-transparent border-0 ring-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-lg text-on-surface px-4 placeholder-on-surface-variant/50 font-medium shadow-none"
          placeholder={placeholder}
          aria-label="Buscar tutoriais"
        />
        
        {value && (
          <div className="pr-2 flex items-center">
            <button
              onClick={() => onChange("")}
              className="p-2 rounded-xl hover:bg-error-container hover:text-on-error-container text-outline transition-all duration-200 active:scale-90"
              aria-label="Limpar busca"
            >
              <Icon name="close" className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      
      {/* Decorative focus glow */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 -z-10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

