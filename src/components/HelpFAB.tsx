"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function HelpFAB() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-[220px] animate-fade-in">
          <p>Precisa de ajuda? Toque aqui para ver explicações simples!</p>
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-inverse-surface transform rotate-45" />
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-16 h-16 bg-primary rounded-full shadow-[0_8px_24px_rgba(0,106,52,0.3)] flex items-center justify-center text-on-primary hover:bg-surface-tint active:scale-95 transition-all duration-200"
        aria-label="Ajuda"
      >
        <Icon name="lightbulb" filled className="text-3xl" />
      </button>
    </div>
  );
}
