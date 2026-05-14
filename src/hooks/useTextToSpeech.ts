"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type SpeechStatus = "idle" | "playing" | "paused";

export interface UseTextToSpeechResult {
  isSupported: boolean;
  status: SpeechStatus;
  rate: number;
  play: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setRate: (rate: number) => void;
}

export function useTextToSpeech(defaultRate: number = 1.0): UseTextToSpeechResult {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [rate, setRateState] = useState<number>(defaultRate);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setStatus("idle");
    }
  }, []);

  const play = useCallback((text: string) => {
    if (!synthRef.current || !isSupported) return;

    // Stop any currently playing audio
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = rate;

    utterance.onend = () => {
      setStatus("idle");
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      setStatus("idle");
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setStatus("playing");
  }, [isSupported, rate, stop]);

  const pause = useCallback(() => {
    if (synthRef.current && status === "playing") {
      synthRef.current.pause();
      setStatus("paused");
    }
  }, [status]);

  const resume = useCallback(() => {
    if (synthRef.current && status === "paused") {
      synthRef.current.resume();
      setStatus("playing");
    }
  }, [status]);

  const setRate = useCallback((newRate: number) => {
    setRateState(newRate);
    if (utteranceRef.current && status !== "idle") {
      // It's tricky to change rate on the fly across all browsers. 
      // The most reliable way is to restart, but for simplicity we just set the state.
      // Next time `play` is called, it will use the new rate.
      // For immediate effect during play, some browsers allow updating utterance.rate but not all re-evaluate it mid-speech.
    }
  }, [status]);

  return {
    isSupported,
    status,
    rate,
    play,
    pause,
    resume,
    stop,
    setRate
  };
}
