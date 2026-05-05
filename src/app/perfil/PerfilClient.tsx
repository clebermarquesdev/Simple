"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";

interface PerfilClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function PerfilClient({ user }: PerfilClientProps) {
  const [notifications, setNotifications] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("medium"); // small, medium, large

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
        <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center overflow-hidden border-4 border-emerald-100 shadow-inner">
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
            checked={notifications} 
            onChange={setNotifications} 
            ariaLabel="Ativar notificações" 
          />
        </div>

        {/* Font Size Setting */}
        <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 card-shadow border border-surface-container">
          <div className="min-w-[56px] min-h-[56px] bg-surface-container-high rounded-xl flex items-center justify-center">
            <Icon name="text_increase" className="text-2xl text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-on-surface">Tamanho do texto</p>
            <p className="text-sm text-on-surface-variant">Ajuste o tamanho da fonte para leitura</p>
          </div>
          <div className="flex bg-surface-container-low rounded-lg p-1 gap-1">
            {[
              { id: "small", label: "Pequeno" },
              { id: "medium", label: "Padrão" },
              { id: "large", label: "Grande" },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`
                  px-4 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer flex-1 text-center
                  ${fontSize === size.id ? "bg-white shadow-md text-primary" : "text-on-surface-variant hover:text-on-surface"}
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
