"use client";

import Image from "next/image";
import Icon from "./Icon";
import type { TutorialStep } from "@/data/tutorials";

interface StepViewProps {
  step: TutorialStep;
  isTransitioning: boolean;
}

export default function StepView({ step, isTransitioning }: StepViewProps) {
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
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 border border-outline-variant/50 shadow-lg flex items-start gap-4 max-w-sm">
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
    </div>
  );
}
