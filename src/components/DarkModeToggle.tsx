"use client";

import { useSettings } from "@/contexts/SettingsContext";
import Icon from "./Icon";

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useSettings();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all duration-300 active:scale-90"
      aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      title={darkMode ? "Modo claro" : "Modo escuro"}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Icon
          name="light_mode"
          className={`absolute inset-0 text-2xl transition-all duration-300 ${
            darkMode
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100 text-amber-500"
          }`}
        />
        {/* Moon icon */}
        <Icon
          name="dark_mode"
          className={`absolute inset-0 text-2xl transition-all duration-300 ${
            darkMode
              ? "opacity-100 rotate-0 scale-100 text-blue-300"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
}
