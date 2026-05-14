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
    // Constrói o contexto com os tutoriais disponíveis para a IA ler
    const tutorialsContext = tutorials.map(t => 
      `- APLICATIVO/TEMA: ${t.title}
       Resumo: ${t.description}
       Passo-a-passo: ${t.steps.map(s => `[${s.title}: ${s.instruction}]`).join(" -> ")}`
    ).join("\n\n");

    const systemPrompt = `Você é o "Tutor Simple", um assistente virtual extremamente paciente, carinhoso e amigável.
Seu objetivo principal é ajudar pessoas com pouca experiência em tecnologia (como idosos ou iniciantes) a usar o celular e aplicativos do dia a dia.

REGRAS DE OURO:
1. NUNCA use jargões técnicos complexos (como "URL", "Cache", "Navegador", "Bug", "Download"). Explique tudo usando palavras simples. Em vez de "faça o download do app", diga "baixe o aplicativo na lojinha do seu celular".
2. Responda de forma curta e direta (máximo de 3 parágrafos curtos). Ninguém gosta de ler textos enormes no celular.
3. Seja encorajador! Use frases como "Fique tranquilo", "É normal ter dúvidas", "Você está indo muito bem".
4. Use alguns emojis simpáticos e amigáveis, como 😊, 📱, ✨, 👍.

TUTORIAIS DA PLATAFORMA SIMPLE:
Você tem acesso aos seguintes tutoriais que existem no aplicativo. Quando a dúvida for sobre um deles, baseie-se estritamente nestes passos:
---
${tutorialsContext}
---

Se o usuário perguntar como fazer algo listado acima, ensine o passo-a-passo com muita clareza.
Se ele perguntar sobre um aplicativo ou função que não está na lista acima, responda educadamente ensinando como puder (se você souber), mas lembre-o de forma gentil de que você é especialista nos tutoriais listados.`;

    const result = await streamText({
      model: openrouter('openrouter/free'),
      messages,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();

  } catch (error: unknown) {
    console.error('Erro na API de chat:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return new Response(
      JSON.stringify({ 
        error: '⚠️ O sistema está temporariamente ocupado. Por favor, tente novamente em alguns segundos.' 
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
