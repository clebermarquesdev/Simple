"use client";

import Image from "next/image";
import Icon from "./Icon";
import type { TutorialStep } from "@/data/tutorials";

import type { UseTextToSpeechResult } from "@/hooks/useTextToSpeech";

interface StepViewProps {
  step: TutorialStep;
  isTransitioning: boolean;
  tts?: UseTextToSpeechResult;
  stepTextToRead?: string;
}

export default function StepView({ step, isTransitioning, tts, stepTextToRead }: StepViewProps) {
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
        <h2 className="text-[32px] font-semibold text-on-background leading-tight tracking-tight">
          {step.title}
        </h2>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          {step.instruction}
        </p>
      </div>

      {/* Audio Controls */}
      {tts && tts.isSupported && stepTextToRead && (
        <div className="mt-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="record_voice_over" className="text-on-surface-variant text-xl" />
            <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Assistente de Voz</span>
          </div>
          
          {tts.status === 'idle' ? (
            <div className="flex gap-2">
              <button
                onClick={() => tts.play(stepTextToRead)}
                className="flex-1 bg-brand-green text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
              >
                <Icon name="play_arrow" /> Ouvir explicação
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              {tts.status === 'playing' ? (
                <button
                  onClick={() => tts.pause()}
                  className="flex-1 bg-surface-container-high text-on-surface py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Icon name="pause" /> Pausar
                </button>
              ) : (
                <button
                  onClick={() => tts.resume()}
                  className="flex-1 bg-brand-green text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
                >
                  <Icon name="play_arrow" /> Continuar
                </button>
              )}
              <button
                onClick={() => tts.stop()}
                className="flex-1 bg-error-container text-on-error-container py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Icon name="stop" /> Parar
              </button>
              <button
                onClick={() => tts.play(stepTextToRead)}
                className="flex items-center justify-center bg-surface-container-high text-on-surface p-3 rounded-xl active:scale-95 transition-all"
                aria-label="Repetir passo"
              >
                <Icon name="replay" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
