"use client";

import Icon from "./Icon";
import Switch from "./Switch";
import { useSettings } from "@/contexts/SettingsContext";

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    setHighContrast, 
    librasEnabled, 
    setLibrasEnabled,
    voiceAssistantEnabled,
    setVoiceAssistantEnabled
  } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl shadow-2xl border border-outline-variant relative z-10 animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-6 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="accessibility" filled className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold">Acessibilidade</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <p className="text-on-surface-variant text-sm font-medium">
            Escolha as opções que facilitam seu uso do Simple.
          </p>

          <div className="flex flex-col gap-4">
            {/* Voice Assistant */}
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed/20 rounded-xl flex items-center justify-center">
                  <Icon name="record_voice_over" className="text-2xl text-brand-green" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Assistente de voz</p>
                  <p className="text-xs text-on-surface-variant">Lê os passos para você</p>
                </div>
              </div>
              <Switch 
                checked={voiceAssistantEnabled} 
                onChange={setVoiceAssistantEnabled} 
                ariaLabel="Ativar assistente de voz" 
              />
            </div>

            {/* Libras */}
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-fixed/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🤟</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Libras</p>
                  <p className="text-xs text-on-surface-variant">Tradução em sinais (VLibras)</p>
                </div>
              </div>
              <Switch 
                checked={librasEnabled} 
                onChange={setLibrasEnabled} 
                ariaLabel="Ativar VLibras" 
              />
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary-fixed/20 rounded-xl flex items-center justify-center">
                  <Icon name="contrast" className="text-2xl text-on-tertiary-fixed-variant" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Alto contraste</p>
                  <p className="text-xs text-on-surface-variant">Cores mais fortes</p>
                </div>
              </div>
              <Switch 
                checked={highContrast} 
                onChange={setHighContrast} 
                ariaLabel="Ativar alto contraste" 
              />
            </div>

            {/* Text Size */}
            <div className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center">
                  <Icon name="text_increase" className="text-2xl text-on-surface-variant" />
                </div>
                <p className="font-bold text-on-surface">Tamanho do texto</p>
              </div>
              <div className="flex bg-surface-container-lowest rounded-xl p-1 gap-1 w-full">
                {[
                  { id: "small", label: "Pequeno" },
                  { id: "medium", label: "Padrão" },
                  { id: "large", label: "Grande" },
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setFontSize(size.id as "small" | "medium" | "large")}
                    className={`
                      px-3 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer flex-1 text-center
                      ${fontSize === size.id ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-low"}
                    `}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button 
            onClick={onClose}
            className="w-full bg-surface-container-high text-on-surface py-4 rounded-2xl font-bold text-lg active:scale-[0.98] transition-all"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
