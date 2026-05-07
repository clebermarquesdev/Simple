"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FontSize = "small" | "medium" | "large";

interface SettingsContextData {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
}

const SettingsContext = createContext<SettingsContextData | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Use lazy initialization or a useEffect to prevent hydration mismatch
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [highContrast, setHighContrastState] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load settings from localStorage on mount
    const storedFontSize = localStorage.getItem("@simple:fontSize") as FontSize;
    const storedHighContrast = localStorage.getItem("@simple:highContrast");

    if (storedFontSize) setFontSizeState(storedFontSize);
    if (storedHighContrast) setHighContrastState(storedHighContrast === "true");
    
    setMounted(true);
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("@simple:fontSize", size);
  };

  const setHighContrast = (contrast: boolean) => {
    setHighContrastState(contrast);
    localStorage.setItem("@simple:highContrast", String(contrast));
  };

  // Apply settings to document.documentElement (html element)
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;

    // Reset text-size classes
    html.classList.remove("text-size-small", "text-size-medium", "text-size-large");
    html.classList.add(`text-size-${fontSize}`);

    // Toggle high-contrast class
    if (highContrast) {
      html.classList.add("high-contrast");
    } else {
      html.classList.remove("high-contrast");
    }
  }, [fontSize, highContrast, mounted]);

  // Don't render children until mounted to prevent hydration errors 
  // since server rendering would not have the localStorage values
  // Alternatively, just render it and handle a slight flicker. We'll render immediately 
  // to avoid blocking the whole app, but HTML classes will apply post-hydration.
  
  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
