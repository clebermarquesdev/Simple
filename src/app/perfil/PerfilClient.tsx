"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";
import { useSettings } from "@/contexts/SettingsContext";

interface PerfilClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function PerfilClient({ user }: PerfilClientProps) {
  const { 
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
  } = useSettings();

  const handleToggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      // Request browser permission
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setNotificationsEnabled(true);
          // Show a test notification
          new Notification("Simple", {
            body: "As notificações foram ativadas com sucesso!",
            icon: "/icon-192x192.png"
          });
        } else {
          alert("Para receber notificações, você precisa permitir nas configurações do seu navegador.");
          setNotificationsEnabled(false);
        }
      } else {
        alert("Seu navegador não suporta notificações.");
        setNotificationsEnabled(false);
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-[32px] font-semibold text-on-background mb-2 leading-tight tracking-tight">
          Perfil
        </h1>
        <p className="text-lg text-on-surface-variant">
          Gerencie suas preferências e configurações.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-8 card-shadow border border-surface-container flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center overflow-hidden border-4 border-primary-fixed-dim shadow-inner">
          {user?.image ? (
            <img 
              src={user.image} 
              alt={user.name || "Usuário"} 
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="person" filled className="text-5xl text-primary" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-on-surface">
          {user?.name || "Usuário"}
        </h2>
        <p className="text-lg text-on-surface-variant">
          {user?.email || "Em breve você poderá personalizar seu perfil!"}
        </p>
      </div>

      {/* Settings List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-on-surface mb-2">Configurações</h3>

        {/* Dark Mode Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <Icon name="dark_mode" className="text-2xl text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Modo escuro</p>
            <p className="text-sm text-on-surface-variant">Alterne entre tema claro e escuro</p>
          </div>
          <Switch 
            checked={darkMode} 
            onChange={setDarkMode} 
            ariaLabel="Ativar modo escuro" 
          />
        </div>

        {/* Voice Assistant Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <Icon name="record_voice_over" className="text-2xl text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Assistente de voz</p>
            <p className="text-sm text-on-surface-variant">Lê os passos dos tutoriais automaticamente</p>
          </div>
          <Switch 
            checked={voiceAssistantEnabled} 
            onChange={setVoiceAssistantEnabled} 
            ariaLabel="Ativar assistente de voz" 
          />
        </div>

        {/* Libras Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <span className="text-2xl">🤟</span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Libras (VLibras)</p>
            <p className="text-sm text-on-surface-variant">Ativa o tradutor de sinais oficial</p>
          </div>
          <Switch 
            checked={librasEnabled} 
            onChange={setLibrasEnabled} 
            ariaLabel="Ativar VLibras" 
          />
        </div>

        {/* Notifications Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <Icon name="notifications" className="text-2xl text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Notificações</p>
            <p className="text-sm text-on-surface-variant">Receba lembretes de novos tutoriais</p>
          </div>
          <Switch 
            checked={notificationsEnabled} 
            onChange={handleToggleNotifications} 
            ariaLabel="Ativar notificações" 
          />
        </div>

        {/* Font Size Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 card-shadow border border-surface-container">
          <div className="flex items-center gap-4">
            <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
              <Icon name="text_increase" className="text-2xl text-on-surface-variant" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-on-surface">Tamanho do texto</p>
              <p className="text-sm text-on-surface-variant">Ajuste o tamanho da fonte para leitura</p>
            </div>
          </div>
          <div className="flex bg-surface-container-low rounded-lg p-1 gap-1 w-full sm:w-auto">
            {[
              { id: "small", label: "Pequeno" },
              { id: "medium", label: "Padrão" },
              { id: "large", label: "Grande" },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id as "small" | "medium" | "large")}
                className={`
                  px-3 sm:px-4 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer flex-1 text-center
                  ${fontSize === size.id ? "bg-surface-container-lowest shadow-md text-primary" : "text-on-surface-variant hover:text-on-surface"}
                `}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <Icon name="contrast" className="text-2xl text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Alto contraste</p>
            <p className="text-sm text-on-surface-variant">Aumente o contraste das cores</p>
          </div>
          <Switch 
            checked={highContrast} 
            onChange={setHighContrast} 
            ariaLabel="Ativar alto contraste" 
          />
        </div>

        {/* About Setting (Info only) */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container opacity-80">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <Icon name="info" className="text-2xl text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Sobre o Simple</p>
            <p className="text-sm text-on-surface-variant">Versão 1.0.0 • Feito com carinho</p>
          </div>
          <Icon name="chevron_right" className="text-outline opacity-40" />
        </div>
      </div>
    </div>
  );
}

