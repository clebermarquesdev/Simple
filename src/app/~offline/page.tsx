"use client";

import Icon from "@/components/Icon";

export default function OfflinePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-6">
        <Icon name="wifi_off" className="text-5xl text-on-surface-variant" />
      </div>
      <h1 className="text-3xl font-bold text-on-background mb-4">
        Você está offline
      </h1>
      <p className="text-lg text-on-surface-variant max-w-md">
        Parece que você perdeu a conexão com a internet. O aplicativo precisa de conexão para carregar novos tutoriais.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-8 bg-primary text-on-primary px-6 py-3 rounded-full font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
