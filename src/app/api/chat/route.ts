import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { tutorials } from '@/data/tutorials';

export const maxDuration = 30;

export async function POST(req: Request) {
  // Verifica se a chave da API está configurada
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Chave da API do OpenRouter não configurada. Adicione OPENROUTER_API_KEY no arquivo .env' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Configuração do OpenRouter
  const openrouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    // Headers recomendados pelo OpenRouter
    headers: {
      'HTTP-Referer': 'http://localhost:3000', // Substitua pela URL do seu app em produção
      'X-Title': 'Tutor Simple App',
    }
  });

  try {
    const { messages } = await req.json();
    // 1. Histórico curtíssimo para economizar tokens (3 mensagens)
    const lastMessages = messages.slice(-3);
    
    // 2. Títulos apenas para economizar tokens
    const tutorialsList = tutorials.map(t => `- ${t.title}`).join("\n");

    // 3. Busca tutorial relevante
    const userQuery = messages[messages.length - 1].content.toLowerCase();
    const relevant = tutorials.find(t => 
      userQuery.includes(t.title.toLowerCase().replace('como ', '').split(' ')[0])
    );

    const context = relevant 
      ? `TUTORIAL RELEVANTE:\n${relevant.title}: ${relevant.steps.map((s, i) => `${i+1}. ${s.title}: ${s.instruction}`).join("\n")}`
      : `LISTA DE TUTORIAIS DISPONÍVEIS (se precisar de detalhes sobre um deles, peça ao usuário para ser mais específico):\n${tutorialsList}`;

    const systemPrompt = `Você é o "Tutor Simple", um assistente carinhoso para idosos.
REGRAS:
1. Respostas CURTÍSSIMAS (máximo 2 parágrafos).
2. Sem termos técnicos.
3. Use o contexto abaixo:

${context}`;

    const result = streamText({
      model: openrouter('openrouter/free'),
      messages: lastMessages,
      system: systemPrompt,
      onError: ({ error }) => {
        console.error('🔥 ERRO INTERNO NO STREAMTEXT:', error);
      }
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error('Erro na API de chat:', error);
    
    // Detecta erros de cota/rate limit
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('quota') || errorMessage.includes('credits')) {
      return new Response(
        JSON.stringify({ 
          error: '⚠️ O limite de uso da API foi atingido (ou saldo insuficiente no OpenRouter). Aguarde ou adicione créditos.' 
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor. Verifique o console para detalhes.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
