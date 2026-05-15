"use client";

import { useSettings } from "@/contexts/SettingsContext";
import VLibrasComponent from "vlibras-nextjs";

export default function VLibras() {
  const { librasEnabled } = useSettings();

  // Em vez de lutar contra a injeção manual de scripts do governo e o ciclo de vida do React,
  // usamos o pacote 'vlibras-nextjs' que encapsula e resolve todos os conflitos do Next.js.
  // 
  // Ocultamos via CSS para não quebrar o script quando a chave é desativada, 
  // mantendo o widget vivo na memória e pronto para quando for ativado novamente.
  return (
    <div style={{ 
      display: librasEnabled ? 'block' : 'none',
      position: 'relative',
      zIndex: 2147483647
    }}>
      <VLibrasComponent forceOnload={true} />
    </div>
  );
}
