"use client";

import { useState, use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getTutorialBySlug } from "@/data/tutorials";
import { useFavorites } from "@/hooks/useFavorites";
import ProgressBar from "@/components/ProgressBar";
import StepView from "@/components/StepView";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export default function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const tutorial = getTutorialBySlug(slug);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel');
  
  const tts = useTextToSpeech(1.0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);


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

  // Helper to format text for TTS
  const getStepTextToRead = (step: typeof tutorial.steps[0]) => {
    return `${step.title}. ${step.instruction}. ${step.tip ? `Dica: ${step.tip}` : ''}`;
  };



  // --- Auto-advance Inactivity Timer ---
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    // Only auto-advance if we are in carousel mode, not complete, NOT on the last step, and audio is NOT playing
    if (viewMode === 'carousel' && !isComplete && !isLast && tts.status !== 'playing') {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 60000); // 1 minute of inactivity
    }
  };

  useEffect(() => {
    resetTimer();
    const events = ['touchstart', 'mousemove', 'keydown', 'scroll', 'click'];
    const handleInteraction = () => resetTimer();
    events.forEach(e => window.addEventListener(e, handleInteraction));
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };
  }, [currentStep, viewMode, isComplete, isLast, tts.status]);

  // --- Swipe Gestures ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (viewMode !== 'carousel') return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0 && !isLast) {
        // swiped left -> next
        handleNext();
      } else if (diff < 0 && currentStep > 0) {
        // swiped right -> back
        handleBack();
      }
    }
  };

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
          {tutorial.siteUrl && (
            <a
              href={tutorial.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-secondary text-on-secondary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:shadow-lg"
            >
              <Icon name="open_in_new" /> Acessar o Site
            </a>
          )}
          {!isFavorite(tutorial.slug) && (
            <button onClick={() => toggleFavorite(tutorial.slug)} className="w-full border-2 border-secondary text-secondary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-secondary/10">
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
      <header className="bg-surface-container-lowest border-b-2 border-outline-variant shadow-sm flex items-center justify-between px-6 h-20 w-full sticky top-0 z-50 transition-colors duration-300">
        <button onClick={handleBack} className="flex items-center justify-center w-[56px] h-[56px] active:scale-95 text-on-surface-variant hover:bg-surface-container-low rounded-full" aria-label="Voltar">
          <Icon name="arrow_back" size={28} />
        </button>
        <h1 className="text-brand-green font-bold text-xl text-center flex-1">{tutorial.title}</h1>
        <button onClick={() => toggleFavorite(tutorial.slug)} className="flex items-center justify-center w-[56px] h-[56px] active:scale-95 rounded-full hover:bg-surface-container-low" aria-label="Favoritar">
          <Icon name={isFavorite(tutorial.slug) ? "star" : "star_border"} filled={isFavorite(tutorial.slug)} className={`text-2xl ${isFavorite(tutorial.slug) ? "text-yellow-500" : "text-outline"}`} />
        </button>
      </header>
      <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto px-6 py-4 md:py-6 gap-4">
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-2">
          <div className="bg-surface-container-low p-1 rounded-xl inline-flex gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${viewMode === 'carousel' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Icon name="view_carousel" size={20} /> Carrossel
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Icon name="view_stream" size={20} /> Lista Contínua
            </button>
          </div>
        </div>



        {viewMode === 'list' ? (
          /* List Mode (Long Screenshot) */
          <div className="flex flex-col gap-12 pt-4">
            {tutorial.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary/20 w-full" />
                </div>
                <div className="pl-4">
                  <div className="text-sm font-bold text-primary mb-3 tracking-wider uppercase">Passo {index + 1}</div>
                  <StepView 
                    step={step} 
                    isTransitioning={false} 
                    tts={tts}
                    stepTextToRead={getStepTextToRead(step)}
                  />
                </div>
              </div>
            ))}
            
            <div className="mt-8 pt-8 border-t border-outline-variant flex flex-col gap-4 mb-8">
              <button onClick={() => setIsComplete(true)} className="w-full bg-primary text-on-primary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center shadow-md active:scale-[0.98] transition-all gap-2">
                Concluir Tutorial <Icon name="check" />
              </button>
            </div>
          </div>
        ) : (
          /* Carousel Mode */
          <div 
            className="flex-1 flex flex-col w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <ProgressBar current={currentStep + 1} total={totalSteps} />
            <div className="mt-4">
              <StepView 
                step={tutorial.steps[currentStep]} 
                isTransitioning={isTransitioning}
                tts={tts}
                stepTextToRead={getStepTextToRead(tutorial.steps[currentStep])}
              />
            </div>

            {/* Site link during tutorial */}
            {tutorial.siteUrl && (
              <a
                href={tutorial.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border-2 border-dashed border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 mx-auto mt-6"
              >
                <Icon name="open_in_new" size={18} />
                <span>Abrir o site: <strong className="text-on-surface">{new URL(tutorial.siteUrl).hostname.replace('www.', '')}</strong></span>
              </a>
            )}

            <div className="mt-auto pt-8 flex flex-col gap-4 pb-8">
              <button onClick={handleNext} className="w-full bg-primary text-on-primary min-h-[56px] rounded-xl font-semibold text-xl flex items-center justify-center shadow-md active:scale-[0.98] transition-all gap-2">
                {isLast ? "Concluir Tutorial" : "Próximo Passo"} <Icon name={isLast ? "check" : "arrow_forward"} />
              </button>
              <button onClick={handleBack} className="w-full min-h-[56px] text-primary font-semibold text-xl flex items-center justify-center hover:bg-surface-container-low rounded-xl transition-colors">Voltar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
