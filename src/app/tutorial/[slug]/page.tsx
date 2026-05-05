"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { getTutorialBySlug } from "@/data/tutorials";
import { useFavorites } from "@/hooks/useFavorites";
import ProgressBar from "@/components/ProgressBar";
import StepView from "@/components/StepView";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const tutorial = getTutorialBySlug(slug);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!tutorial) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <Icon name="error" className="text-6xl text-outline mb-4 block mx-auto" />
        <h1 className="text-2xl font-semibold text-on-surface mb-2">Tutorial não encontrado</h1>
        <Link href="/" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold text-lg inline-flex items-center gap-2 mt-4">
          <Icon name="home" /> Voltar ao Início
        </Link>
      </div>
    );
  }

  const totalSteps = tutorial.steps.length;
  const isLast = currentStep === totalSteps - 1;

  const goToStep = (n: number) => {
    setIsTransitioning(true);
    setTimeout(() => { setCurrentStep(n); setIsTransitioning(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, 200);
  };

  const handleNext = () => { if (isLast) setIsComplete(true); else goToStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 0) goToStep(currentStep - 1); else router.back(); };

  if (isComplete) {
    return (
      <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-6 py-10 items-center justify-center text-center min-h-[70vh]">
        <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Icon name="check_circle" filled className="text-6xl text-primary" />
        </div>
        <h1 className="text-[32px] font-semibold text-on-background mb-3">Parabéns! 🎉</h1>
        <p className="text-xl text-on-surface-variant mb-2">Você concluiu o tutorial</p>
        <p className="text-2xl font-medium text-on-surface mb-8">&ldquo;{tutorial.title}&rdquo;</p>
        
        {tutorial.videoUrl && (
          <div className="w-full mb-8 rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={tutorial.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full max-w-sm">
          {!isFavorite(tutorial.slug) && (
            <button onClick={() => toggleFavorite(tutorial.slug)} className="w-full bg-secondary text-on-secondary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
              <Icon name="star" /> Salvar nos Favoritos
            </button>
          )}
          <Link href="/" className="w-full bg-primary text-on-primary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <Icon name="home" /> Voltar ao Início
          </Link>
          <button onClick={() => { setCurrentStep(0); setIsComplete(false); }} className="w-full min-h-[56px] text-primary font-semibold text-xl flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-colors">
            <Icon name="replay" className="mr-2" /> Refazer Tutorial
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-white border-b-2 border-gray-100 shadow-sm flex items-center justify-between px-6 h-20 w-full sticky top-0 z-50">
        <button onClick={handleBack} className="flex items-center justify-center w-[56px] h-[56px] active:scale-95 text-gray-500 hover:bg-gray-50 rounded-full" aria-label="Voltar">
          <Icon name="arrow_back" size={28} />
        </button>
        <h1 className="text-brand-green font-bold text-xl text-center flex-1">{tutorial.title}</h1>
        <button onClick={() => toggleFavorite(tutorial.slug)} className="flex items-center justify-center w-[56px] h-[56px] active:scale-95 rounded-full hover:bg-gray-50" aria-label="Favoritar">
          <Icon name={isFavorite(tutorial.slug) ? "star" : "star_border"} filled={isFavorite(tutorial.slug)} className={`text-2xl ${isFavorite(tutorial.slug) ? "text-yellow-500" : "text-gray-400"}`} />
        </button>
      </header>
      <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-6 py-4 md:py-10 gap-4">
        <div className="pt-4"><ProgressBar current={currentStep + 1} total={totalSteps} /></div>
        <StepView step={tutorial.steps[currentStep]} isTransitioning={isTransitioning} />
        <div className="mt-auto pt-8 flex flex-col gap-4 pb-8">
          <button onClick={handleNext} className="w-full bg-primary text-on-primary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center shadow-md active:scale-[0.98] transition-all gap-2">
            {isLast ? "Concluir Tutorial" : "Próximo Passo"} <Icon name={isLast ? "check" : "arrow_forward"} />
          </button>
          <button onClick={handleBack} className="w-full min-h-[56px] text-primary font-semibold text-xl flex items-center justify-center hover:bg-surface-container-low rounded-xl transition-colors">Voltar</button>
        </div>
      </div>
    </>
  );
}
