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
 
    // 1. Limita o histórico de mensagens para evitar estourar o limite de tokens/contexto
    // Mantemos as últimas 6 mensagens (3 trocas) + a nova mensagem
    const lastMessages = messages.slice(-7);
    
    // 2. Constrói o contexto com os tutoriais de forma mais COMPACTA
    // Envia apenas títulos e descrições para economizar tokens
    const tutorialsContext = tutorials.map(t => 
      `- ${t.title}: ${t.description}`
    ).join("\n");

    // 3. Adiciona os passos detalhados apenas para os tutoriais RELEVANTES
    const userQuery = messages[messages.length - 1].content.toLowerCase();
    const relevantTutorials = tutorials.filter(t => 
      userQuery.includes(t.title.toLowerCase().replace('como ', '').split(' ')[0]) ||
      t.steps.some(s => userQuery.includes(s.title.toLowerCase().split(' ')[0]))
    );

    const detailedSteps = relevantTutorials.length > 0 
      ? "\n\nDETALHES DO TUTORIAL RELEVANTE:\n" + relevantTutorials.map(t => 
          `${t.title}:\n${t.steps.map((s, i) => `${i+1}. ${s.title}: ${s.instruction}`).join("\n")}`
        ).join("\n\n")
      : "";

    const systemPrompt = `Você é o "Tutor Simple", um assistente virtual extremamente paciente, carinhoso e amigável.
Seu objetivo principal é ajudar pessoas com pouca experiência em tecnologia a usar o celular.

REGRAS:
1. NUNCA use jargões técnicos (URL, Cache, Browser, Bug). Explique como se falasse com um avô querido.
2. Responda de forma CURTA e DIRETA (máximo 2-3 parágrafos curtos).
3. Seja sempre encorajador e calmo. 😊

TUTORIAIS DISPONÍVEIS:
${tutorialsContext}${detailedSteps}

Se o usuário perguntar sobre algo acima, ensine o passo-a-passo carinhosamente.
Se perguntar sobre algo fora da lista, tente ajudar se souber, mas lembre-o que você é especialista no que está acima.`;

    // 4. Usamos o seletor automático 'openrouter/free' para garantir que o serviço 
    // continue funcionando mesmo se modelos específicos deixarem de ser gratuitos.
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
