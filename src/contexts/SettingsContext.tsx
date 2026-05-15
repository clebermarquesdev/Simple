"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FontSize = "small" | "medium" | "large";

interface SettingsContextData {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  librasEnabled: boolean;
  setLibrasEnabled: (enabled: boolean) => void;
  voiceAssistantEnabled: boolean;
  setVoiceAssistantEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextData | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [highContrast, setHighContrastState] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabledState] = useState<boolean>(false);
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [librasEnabled, setLibrasEnabledState] = useState<boolean>(false);
  const [voiceAssistantEnabled, setVoiceAssistantEnabledState] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load settings from localStorage on mount
    const storedFontSize = localStorage.getItem("@simple:fontSize") as FontSize;
    const storedHighContrast = localStorage.getItem("@simple:highContrast");
    const storedNotifications = localStorage.getItem("@simple:notifications");
    const storedDarkMode = localStorage.getItem("@simple:darkMode");
    const storedLibras = localStorage.getItem("@simple:libras");
    const storedVoice = localStorage.getItem("@simple:voiceAssistant");

    if (storedFontSize) setFontSizeState(storedFontSize);
    if (storedHighContrast) setHighContrastState(storedHighContrast === "true");
    if (storedNotifications) setNotificationsEnabledState(storedNotifications === "true");
    if (storedLibras) setLibrasEnabledState(storedLibras === "true");
    if (storedVoice !== null) setVoiceAssistantEnabledState(storedVoice === "true");
    
    // Dark mode: check localStorage, then system preference
    if (storedDarkMode !== null) {
      setDarkModeState(storedDarkMode === "true");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkModeState(true);
    }
    
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

  const setNotificationsEnabled = (enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    localStorage.setItem("@simple:notifications", String(enabled));
  };

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
    localStorage.setItem("@simple:darkMode", String(dark));
  };

  const setLibrasEnabled = (enabled: boolean) => {
    setLibrasEnabledState(enabled);
    localStorage.setItem("@simple:libras", String(enabled));
  };

  const setVoiceAssistantEnabled = (enabled: boolean) => {
    setVoiceAssistantEnabledState(enabled);
    localStorage.setItem("@simple:voiceAssistant", String(enabled));
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

    // Toggle dark mode class
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Update theme-color meta tag
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", darkMode ? "#0f1729" : "#006a34");
    }
  }, [fontSize, highContrast, darkMode, mounted]);

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        notificationsEnabled,
        setNotificationsEnabled,
        darkMode,
        setDarkMode,
        librasEnabled,
        setLibrasEnabled,
        voiceAssistantEnabled,
        setVoiceAssistantEnabled,
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
