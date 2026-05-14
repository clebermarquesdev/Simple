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

    // 4. Lista de modelos gratuitos para tentar em sequência caso um falhe (Fallback)
    const modelsToTry = [
      'meta-llama/llama-3.3-70b-instruct:free',
      'google/gemini-2.0-flash-lite-preview-02-05:free',
      'deepseek/deepseek-chat:free',
      'openrouter/free'
    ];

    let lastError: any = null;

    for (const modelId of modelsToTry) {
      try {
        console.log(`Tentando modelo: ${modelId}`);
        const result = await streamText({
          model: openrouter(modelId),
          messages: lastMessages,
          system: systemPrompt,
          maxTokens: 500,
          temperature: 0.7,
        });

        // Se conseguiu iniciar o stream, retorna a resposta
        return result.toTextStreamResponse();
      } catch (error) {
        console.error(`Falha no modelo ${modelId}:`, error);
        lastError = error;
        // Continua para o próximo modelo se for erro de limite (429) ou sobrecarga (503/500)
        continue;
      }
    }

    // Se todos falharem
    throw lastError || new Error('Todos os modelos gratuitos falharam');

  } catch (error: unknown) {
    console.error('Erro final na API de chat:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Resposta amigável de erro
    return new Response(
      JSON.stringify({ 
        error: '⚠️ O sistema está muito ocupado no momento. Por favor, aguarde 10 segundos e tente enviar sua mensagem novamente.' 
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
