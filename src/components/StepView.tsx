"use client";

import Image from "next/image";
import Icon from "./Icon";
import type { TutorialStep } from "@/data/tutorials";

import type { UseTextToSpeechResult } from "@/hooks/useTextToSpeech";
import { useSettings } from "@/contexts/SettingsContext";
import { useEffect } from "react";

interface StepViewProps {
  step: TutorialStep;
  isTransitioning: boolean;
  tts?: UseTextToSpeechResult;
  stepTextToRead?: string;
}

export default function StepView({ step, isTransitioning, tts, stepTextToRead }: StepViewProps) {
  const { voiceAssistantEnabled } = useSettings();

  useEffect(() => {
    if (voiceAssistantEnabled && tts && stepTextToRead && !isTransitioning) {
      // Small delay to ensure transition starts/ends smoothly
      const timer = setTimeout(() => {
        tts.play(stepTextToRead);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step, voiceAssistantEnabled, tts, stepTextToRead, isTransitioning]);
  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-300 ${
        isTransitioning
          ? "opacity-0 translate-x-5"
          : "opacity-100 translate-x-0"
      }`}
    >
      {/* Illustration Area */}
      <div className="w-full aspect-square md:aspect-[4/3] bg-surface-container-low rounded-xl card-shadow overflow-hidden mt-4 relative border border-outline-variant/30 flex items-center justify-center">
        {step.image.startsWith("/") ? (
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-contain opacity-90 p-4"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full opacity-90">
            <Icon name={step.image} size={120} />
          </div>
        )}
        {/* Tip overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/80 to-transparent flex items-end p-6">
          <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-lg p-4 border border-outline-variant/50 shadow-lg flex items-start gap-4 max-w-sm">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shrink-0">
              <Icon name="lightbulb" filled size={28} />
            </div>
            <p className="text-lg text-on-surface">{step.tip}</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4 mt-6 flex-1">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[32px] font-semibold text-on-background leading-tight tracking-tight">
            {step.title}
          </h2>
          
          {/* Inline Audio Control */}
          {tts && tts.isSupported && stepTextToRead && (
            <button
              onClick={() => {
                if (tts.status === 'playing') tts.pause();
                else if (tts.status === 'paused') tts.resume();
                else tts.play(stepTextToRead);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all active:scale-95 shrink-0 shadow-sm border-2 ${
                tts.status === 'playing' 
                  ? 'bg-primary text-on-primary border-primary animate-pulse' 
                  : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary hover:bg-primary/5'
              }`}
            >
              <Icon name={tts.status === 'playing' ? "pause" : "volume_up"} size={20} />
              <span>{tts.status === 'playing' ? 'Ouvindo' : 'Ouvir'}</span>
            </button>
          )}
        </div>
        
        {/* Blocked Audio Hint */}
        {tts && tts.isBlocked && (
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <div className="w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center shrink-0">
              <Icon name="touch_app" size={18} />
            </div>
            <p className="text-sm font-medium text-primary leading-tight">
              Clique no botão <strong>Ouvir</strong> acima para liberar o áudio do assistente.
            </p>
          </div>
        )}

        <p className="text-xl text-on-surface-variant leading-relaxed">
          {step.instruction}
        </p>
      </div>

    </div>
  );
}
