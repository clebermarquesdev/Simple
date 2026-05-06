"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './Icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rolagem automática para o fim da tela quando houver novas mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Foca no input quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Erro na resposta do servidor';
        try {
          const errorData = await response.json();
          errorMessage = errorData?.error || errorMessage;
        } catch {
          // Response wasn't JSON, try text
          try {
            errorMessage = await response.text() || errorMessage;
          } catch {
            // ignore
          }
        }
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantId = (Date.now() + 1).toString();
      
      // Adiciona mensagem vazia do assistente
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      if (reader) {
        let accumulatedText = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            accumulatedText += chunk;
            const currentText = accumulatedText;
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantId
                  ? { ...m, content: currentText }
                  : m
              )
            );
          }
        }
        
        if (!accumulatedText.trim()) {
          throw new Error('⚠️ O limite de uso da API foi atingido ou a resposta falhou. Verifique se sua chave (ou créditos) está válida, aguarde alguns minutos e tente novamente.');
        }
      }
    } catch (error) {
      console.error('Erro no chat:', error);
      const errorMsg = error instanceof Error ? error.message : '';
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: errorMsg.includes('API') || errorMsg.includes('Chave') 
            ? `⚠️ ${errorMsg}` 
            : 'Desculpe, tive um probleminha. 😅 Pode tentar de novo?',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  // Se o modal estiver fechado, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40 animate-fade-in backdrop-blur-sm">
      <div className="w-full h-[85vh] sm:h-[600px] sm:w-[420px] bg-surface rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col animate-slide-up sm:animate-zoom-in overflow-hidden border border-outline-variant">
        
        {/* Cabeçalho */}
        <div className="bg-primary text-on-primary px-6 py-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-sm">
              <Icon name="psychology" filled className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Tutor Simple</h3>
              <p className="text-xs opacity-90 font-medium">Sempre online para ajudar ✨</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Área de Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-surface-container-lowest flex flex-col gap-4">
          
          {/* Mensagem de Boas Vindas (Fixa) */}
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
              <Icon name="smart_toy" className="text-on-primary-container text-sm" />
            </div>
            <div className="bg-surface-variant text-on-surface-variant rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] shadow-sm text-sm">
              Olá! 😊 Eu sou o Tutor Simple. Estou aqui para te ajudar com qualquer dúvida sobre os aplicativos do seu celular. O que você gostaria de aprender hoje?
            </div>
          </div>

          {/* Histórico do Chat */}
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
                  <Icon name="smart_toy" className="text-on-primary-container text-sm" />
                </div>
              )}
              <div 
                className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm text-[15px] leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user' 
                    ? 'bg-primary text-on-primary rounded-tr-none' 
                    : 'bg-surface-variant text-on-surface-variant rounded-tl-none'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Efeito de "Digitando..." quando está carregando */}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-2">
               <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
                  <Icon name="smart_toy" className="text-on-primary-container text-sm" />
                </div>
                <div className="bg-surface-variant text-on-surface-variant rounded-2xl rounded-tl-none px-4 py-4 shadow-sm text-sm flex items-center gap-1.5 h-[44px]">
                  <span className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulário de Envio */}
        <form 
          onSubmit={handleSubmit} 
          className="p-3 sm:p-4 bg-surface border-t border-outline-variant flex items-end gap-2 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]"
        >
          <div className="flex-1 bg-surface-container-highest rounded-3xl flex items-center border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida aqui..."
              className="w-full bg-transparent px-5 py-3.5 outline-none text-on-surface text-[15px] placeholder-on-surface-variant/60"
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 flex-shrink-0 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:bg-surface-variant disabled:text-on-surface-variant transition-all hover:bg-primary/90 active:scale-95"
            aria-label="Enviar mensagem"
          >
            <Icon name="send" />
          </button>
        </form>
      </div>
    </div>
  );
}
