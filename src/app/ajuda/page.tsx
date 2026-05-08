import Icon from "@/components/Icon";
import Link from "next/link";

const faqs = [
  {
    question: "O que é o Simple?",
    answer: "O Simple é uma plataforma educativa criada para ajudar pessoas que têm dificuldade com tecnologia. Nosso objetivo é transformar tarefas digitais complexas em passos simples, claros e fáceis de seguir, promovendo a inclusão digital de todos.",
    icon: "lightbulb"
  },
  {
    question: "Como funcionam os tutoriais?",
    answer: "Cada tutorial é dividido em etapas pequenas. Nós usamos uma linguagem simples, sem termos técnicos complicados, e incluímos imagens e vídeos para garantir que você consiga realizar a tarefa do início ao fim com segurança.",
    icon: "auto_stories"
  },
  {
    question: "O Simple é gratuito?",
    answer: "Sim! O Simple é e sempre será 100% gratuito. Nossa missão é ajudar o maior número possível de pessoas a se sentirem confiantes no mundo digital.",
    icon: "volunteer_activism"
  },
  {
    question: "Como posso salvar um tutorial para ver depois?",
    answer: "Basta clicar no ícone de coração (Favoritos) que aparece em cada tutorial. Depois, você pode acessar todos os seus tutoriais salvos clicando em 'Favoritos' no menu principal.",
    icon: "favorite"
  },
  {
    question: "Ainda tenho dúvidas, o que eu faço?",
    answer: "Você pode usar o nosso 'Tutor AI', que está sempre disponível no botão flutuante no canto da tela. Ele pode responder perguntas específicas e te guiar caso você se sinta perdido em algum passo.",
    icon: "smart_toy"
  }
];

export default function AjudaPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-[36px] font-bold text-on-surface mb-4 leading-tight tracking-tight">
          Como podemos te ajudar?
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          Encontre respostas para as dúvidas mais comuns sobre como usar o Simple e aproveitar ao máximo nossos tutoriais.
        </p>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container card-shadow transition-all hover:border-brand-green group"
          >
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Icon name={faq.icon} filled className="text-2xl text-brand-green" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-on-surface">
                  {faq.question}
                </h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-green text-white p-10 rounded-3xl text-center flex flex-col items-center gap-6 shadow-xl mt-4">
        <Icon name="support_agent" className="text-5xl" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Não encontrou o que procurava?</h2>
          <p className="text-emerald-50 text-lg opacity-90">
            Nossa inteligência artificial está pronta para te ajudar agora mesmo.
          </p>
        </div>
        <Link 
          href="/"
          className="bg-white text-brand-green px-8 py-3 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg active:scale-95"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
