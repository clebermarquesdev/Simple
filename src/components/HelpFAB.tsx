"use client";

import { useState } from "react";
import Icon from "./Icon";
import ChatModal from "./ChatModal";
import AccessibilityModal from "./AccessibilityModal";

export default function HelpFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-24 right-6 md:bottom-8 z-40 flex flex-col items-end gap-3">
        {/* Expanded Options */}
        {isOpen && (
          <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
            {/* Accessibility Button */}
            <div className="flex items-center gap-3">
              <span className="bg-surface-container-highest text-on-surface px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm border border-outline-variant">
                Acessibilidade
              </span>
              <button
                onClick={() => {
                  setIsAccessOpen(true);
                  setIsOpen(false);
                }}
                className="w-12 h-12 bg-secondary text-on-secondary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all"
                aria-label="Acessibilidade"
              >
                <Icon name="accessibility" size={24} filled />
              </button>
            </div>

            {/* Chat/Help Button */}
            <div className="flex items-center gap-3">
              <span className="bg-surface-container-highest text-on-surface px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm border border-outline-variant">
                Tutor AI
              </span>
              <button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsOpen(false);
                }}
                className="w-12 h-12 bg-tertiary text-on-tertiary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all"
                aria-label="Conversar com Tutor AI"
              >
                <Icon name="smart_toy" size={24} filled />
              </button>
            </div>
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95 z-50 ${
            isOpen ? "bg-surface-container-highest text-on-surface rotate-90" : "bg-primary text-on-primary"
          }`}
          aria-label="Menu de Ajuda e Acessibilidade"
        >
          <Icon name={isOpen ? "close" : "accessibility_new"} filled className="text-3xl" />
        </button>
      </div>

      {/* Modals */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <AccessibilityModal isOpen={isAccessOpen} onClose={() => setIsAccessOpen(false)} />
    </>
  );
}
