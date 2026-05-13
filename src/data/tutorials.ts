export interface TutorialStep {
  title: string;
  instruction: string;
  tip: string;
  image: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  categoryIcon: string;
  difficulty: "Iniciante" | "Intermediário";
  image: string;
  featured: boolean;
  steps: TutorialStep[];
  videoUrl?: string;
  siteUrl?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const categories: Category[] = [
  {
    slug: "bancos-e-pix",
    name: "Bancos e PIX",
    description: "Aprenda a usar seu dinheiro pelo celular com segurança.",
    icon: "account_balance",
    color: "bg-primary-fixed",
    bgColor: "bg-primary-fixed",
    textColor: "text-on-primary-fixed",
  },
  {
    slug: "redes-sociais",
    name: "Redes Sociais",
    description: "Conecte-se com amigos e família sem complicação.",
    icon: "groups",
    color: "bg-secondary-fixed",
    bgColor: "bg-secondary-fixed",
    textColor: "text-on-secondary-fixed",
  },
  {
    slug: "governo",
    name: "Governo",
    description: "Acesse serviços públicos e documentos importantes.",
    icon: "account_balance_wallet",
    color: "bg-tertiary-fixed",
    bgColor: "bg-tertiary-fixed",
    textColor: "text-on-tertiary-fixed",
  },
  {
    slug: "aplicativos",
    name: "Aplicativos do Dia a Dia",
    description: "Facilite sua rotina com aplicativos úteis.",
    icon: "smartphone",
    color: "bg-secondary-fixed-dim",
    bgColor: "bg-secondary-fixed-dim",
    textColor: "text-on-secondary-fixed",
  },
  {
    slug: "seguranca",
    name: "Segurança Digital",
    description:
      "Saiba como proteger seus dados e evitar golpes na internet. Essencial para todos.",
    icon: "security",
    color: "bg-error-container",
    bgColor: "bg-error-container",
    textColor: "text-on-error-container",
  },
];

export const tutorials: Tutorial[] = [
  {
    slug: "como-fazer-pix",
    title: "Como fazer um Pix seguro",
    description:
      "Aprenda passo a passo como enviar dinheiro sem medo de errar.",
    category: "Bancos e PIX",
    categorySlug: "bancos-e-pix",
    categoryIcon: "qr_code_scanner",
    difficulty: "Iniciante",
    image: "/images/Logo_Pix_Png_-_Baixar_Imagens_em_PNG-removebg-preview.png",
    featured: true,
    steps: [
      {
        title: "Abra o aplicativo do seu Banco",
        instruction:
          "Procure pelo ícone do seu banco na tela do seu celular e toque nele para abrir.",
        tip: "Toque no desenho do banco que você usa sempre.",
        image: "/images/tutorial-pix.png",
      },
      {
        title: "Encontre a opção PIX",
        instruction:
          'Na tela inicial do aplicativo do banco, procure pelo botão escrito "PIX" ou "Área PIX" e toque nele.',
        tip: 'Geralmente o botão PIX fica na parte de cima da tela, com o desenho de um raio ou QR code.',
        image: "/images/tutorial-pix.png",
      },
      {
        title: 'Escolha "Enviar PIX"',
        instruction:
          'Dentro da área PIX, toque no botão "Transferir" ou "Enviar PIX". Isso vai abrir a tela para enviar dinheiro.',
        tip: 'Procure pelo botão verde ou azul escrito "Transferir".',
        image: "/images/tutorial-pix.png",
      },
      {
        title: "Digite a chave PIX",
        instruction:
          "Digite o CPF, telefone ou e-mail da pessoa que vai receber o dinheiro. Depois, coloque o valor e confira os dados.",
        tip: "Sempre confira o nome da pessoa antes de enviar!",
        image: "/images/tutorial-pix.png",
      },
      {
        title: "Confirme o envio",
        instruction:
          'Revise todos os dados com cuidado. Se estiver tudo certo, toque em "Confirmar" e digite sua senha.',
        tip: "Pronto! Seu PIX foi enviado com sucesso. 🎉",
        image: "/images/tutorial-pix.png",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/o4YEEm2F2Dw",
    siteUrl: "https://www.bcb.gov.br/estabilidadefinanceira/pix",
  },
  {
    slug: "como-usar-whatsapp",
    title: "Como usar o WhatsApp",
    description:
      "Aprenda a conversar, enviar fotos, áudios e documentos.",
    category: "Redes Sociais",
    categorySlug: "redes-sociais",
    categoryIcon: "chat",
    difficulty: "Iniciante",
    image: "/images/9914549e-8403-4fbb-9b00-938454800f08.jpg",
    featured: false,
    steps: [
      {
        title: "Abra o WhatsApp",
        instruction:
          "Procure pelo ícone verde do WhatsApp na tela do celular e toque nele para abrir.",
        tip: "É o ícone verde com um telefone branco.",
        image: "/images/9914549e-8403-4fbb-9b00-938454800f08.jpg",
      },
      {
        title: "Veja suas conversas",
        instruction:
          "A tela inicial mostra todas as suas conversas. Toque em qualquer nome para abrir o chat.",
        tip: "As mensagens mais recentes ficam no topo da lista.",
        image: "/images/9914549e-8403-4fbb-9b00-938454800f08.jpg",
      },
      {
        title: "Envie uma mensagem de texto",
        instruction:
          'Toque no campo "Mensagem" na parte de baixo e digite o que deseja. Depois, toque na seta verde para enviar.',
        tip: "Você pode usar emojis tocando na carinha sorridente!",
        image: "/images/9914549e-8403-4fbb-9b00-938454800f08.jpg",
      },
      {
        title: "Envie um áudio",
        instruction:
          "Segure o botão de microfone e fale. Solte quando terminar para enviar o áudio.",
        tip: "Segure firme enquanto fala. Se arrastar para o lado, cancela.",
        image: "/images/9914549e-8403-4fbb-9b00-938454800f08.jpg",
      },
      {
        title: "Faça uma ligação",
        instruction:
          "Dentro da conversa, toque no ícone de telefone no topo para ligar, ou no ícone de câmera para videochamada.",
        tip: "Ligações pelo WhatsApp são gratuitas usando Wi-Fi!",
        image: "/images/9914549e-8403-4fbb-9b00-938454800f08.jpg",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/ghIsVurSs-o",
    siteUrl: "https://www.whatsapp.com",
  },
  {
    slug: "como-pagar-boleto",
    title: "Como pagar um boleto",
    description:
      "Aprenda a pagar boletos pelo celular sem ir ao banco.",
    category: "Bancos e PIX",
    categorySlug: "bancos-e-pix",
    categoryIcon: "payments",
    difficulty: "Iniciante",
    image: "/images/Boleto.jpg",
    featured: false,
    steps: [
      {
        title: "Abra o app do banco",
        instruction:
          "Toque no ícone do aplicativo do seu banco para abri-lo.",
        tip: "Use o mesmo banco onde recebe seu salário ou benefício.",
        image: "/images/Boleto.jpg",
      },
      {
        title: "Encontre 'Pagar Boleto'",
        instruction:
          'Na tela principal, procure por "Pagar" ou "Boleto" e toque nessa opção.',
        tip: 'Alguns bancos colocam dentro de "Pagamentos".',
        image: "/images/Boleto.jpg",
      },
      {
        title: "Escaneie o código de barras",
        instruction:
          "Aponte a câmera do celular para o código de barras do boleto. O app vai ler automaticamente.",
        tip: "Se não funcionar, você pode digitar os números do boleto.",
        image: "/images/Boleto.jpg",
      },
      {
        title: "Confirme o pagamento",
        instruction:
          "Confira o valor e os dados. Se estiver tudo certo, toque em Confirmar e digite sua senha.",
        tip: "Guarde o comprovante! Tire um print da tela. 📱",
        image: "/images/Boleto.jpg",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/lFilkBukkI0",
  },
  {
    slug: "como-acessar-govbr",
    title: "Como acessar o gov.br",
    description:
      "Acesse serviços do governo pelo celular de forma fácil.",
    category: "Governo",
    categorySlug: "governo",
    categoryIcon: "account_balance_wallet",
    difficulty: "Iniciante",
    image: "govbr",
    featured: false,
    steps: [
      {
        title: "Baixe o aplicativo gov.br",
        instruction:
          'Abra a loja de aplicativos do seu celular (Play Store ou App Store) e busque por "gov.br". Toque em Instalar.',
        tip: "O app oficial tem o brasão do governo na cor amarela e verde.",
        image: "govbr",
      },
      {
        title: "Crie sua conta",
        instruction:
          'Abra o app e toque em "Criar conta". Digite seu CPF e siga os passos para criar sua senha.',
        tip: "Você vai precisar do seu CPF e um e-mail ou celular válido.",
        image: "govbr",
      },
      {
        title: "Faça login",
        instruction:
          "Digite seu CPF e a senha que criou. Toque em Entrar para acessar sua conta.",
        tip: "Se esquecer a senha, toque em 'Esqueci minha senha'.",
        image: "govbr",
      },
      {
        title: "Acesse os serviços",
        instruction:
          "Dentro do app, você pode consultar CPF, carteira de trabalho digital, vacinação e muito mais.",
        tip: "Explore os serviços disponíveis no menu principal!",
        image: "govbr",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/kQf6SoFlNDo",
    siteUrl: "https://www.gov.br",
  },
  {
    slug: "seguranca-digital-basica",
    title: "Segurança Digital básica",
    description:
      "Proteja seus dados e evite golpes na internet.",
    category: "Segurança Digital",
    categorySlug: "seguranca",
    categoryIcon: "security",
    difficulty: "Iniciante",
    image: "/images/Segurança digital.bmp",
    featured: false,
    steps: [
      {
        title: "Crie senhas fortes",
        instruction:
          "Use senhas com letras maiúsculas, minúsculas, números e símbolos. Evite datas de nascimento ou nomes simples.",
        tip: "Uma boa senha tem pelo menos 8 caracteres. Exemplo: Minha#Casa123",
        image: "/images/Segurança digital.bmp",
      },
      {
        title: "Cuidado com links suspeitos",
        instruction:
          "Nunca clique em links recebidos por mensagem de números desconhecidos. Golpistas usam links falsos para roubar dados.",
        tip: 'Na dúvida, não clique! Pergunte a alguém de confiança.',
        image: "/images/Segurança digital.bmp",
      },
      {
        title: "Mantenha o celular atualizado",
        instruction:
          'Sempre atualize o sistema do celular e os aplicativos. As atualizações corrigem problemas de segurança.',
        tip: 'Vá em Configurações > Atualização do sistema para verificar.',
        image: "/images/Segurança digital.bmp",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/9vHSqKMtpw8",
  },
  {
    slug: "como-consultar-fgts",
    title: "Como consultar o FGTS",
    description: "Veja o saldo do seu Fundo de Garantia pelo celular.",
    category: "Governo",
    categorySlug: "governo",
    categoryIcon: "account_balance_wallet",
    difficulty: "Intermediário",
    image: "/images/FGTS-DIGITAL.jpg",
    featured: false,
    steps: [
      {
        title: "Baixe o app FGTS",
        instruction: "Procure por 'FGTS' na loja de aplicativos e instale o app oficial da Caixa.",
        tip: "O ícone é um quadrado azul com letras brancas.",
        image: "/images/FGTS-DIGITAL.jpg"
      },
      {
        title: "Entre com gov.br",
        instruction: "Use seu CPF e senha do portal gov.br para entrar.",
        tip: "É a mesma senha que você usa em outros serviços do governo.",
        image: "/images/FGTS-DIGITAL.jpg"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/gjcnkPxkv8s",
    siteUrl: "https://www.fgts.gov.br",
  },
  {
    slug: "como-usar-inss",
    title: "Acessar o Meu INSS",
    description: "Consulte sua aposentadoria e extratos de pagamento.",
    category: "Governo",
    categorySlug: "governo",
    categoryIcon: "account_balance_wallet",
    difficulty: "Intermediário",
    image: "/images/inss-previdencia-privada-seeklogo.png",
    featured: false,
    steps: [
      {
        title: "Abra o aplicativo Meu INSS",
        instruction: "Procure pelo ícone azul com o nome 'Meu INSS' e toque para abrir.",
        tip: "Você também pode acessar pelo site meu.inss.gov.br no navegador.",
        image: "/images/inss-previdencia-privada-seeklogo.png"
      },
      {
        title: "Entre com sua conta gov.br",
        instruction: "Toque no botão azul 'Entrar com gov.br'. Digite seu CPF e depois sua senha cadastrada.",
        tip: "É a mesma senha que você usa para outros serviços do governo.",
        image: "/images/inss-previdencia-privada-seeklogo.png"
      },
      {
        title: "Confira seus pagamentos",
        instruction: "Na tela inicial, procure por 'Extrato de Pagamento' para ver os valores e datas dos seus benefícios.",
        tip: "Você pode baixar o extrato em PDF para guardar ou imprimir.",
        image: "/images/inss-previdencia-privada-seeklogo.png"
      },
      {
        title: "Veja seus benefícios",
        instruction: "Toque em 'Meus Benefícios' para ver se sua aposentadoria ou auxílio já foi aprovado.",
        tip: "Se houver algum problema, o aplicativo avisará nesta tela.",
        image: "/images/inss-previdencia-privada-seeklogo.png"
      },
      {
        title: "Peça ajuda ou agende",
        instruction: "Use a opção 'Novo Pedido' se precisar solicitar um serviço ou 'Agendamentos' para marcar uma visita presencial.",
        tip: "Muitas coisas podem ser resolvidas sem sair de casa pelo próprio aplicativo!",
        image: "/images/inss-previdencia-privada-seeklogo.png"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/u3Mf_DLNqUM",
    siteUrl: "https://meu.inss.gov.br",
  },
  {
    slug: "usar-facebook-basico",
    title: "Como usar o Facebook",
    description: "Crie seu perfil e conecte-se com amigos e familiares.",
    category: "Redes Sociais",
    categorySlug: "redes-sociais",
    categoryIcon: "groups",
    difficulty: "Iniciante",
    image: "facebook",
    featured: false,
    steps: [
      {
        title: "Abra o Facebook",
        instruction: "Toque no ícone azul com um 'f' branco para abrir o aplicativo.",
        tip: "O ícone é bem reconhecível pela cor azul forte e a letra 'f'.",
        image: "facebook"
      },
      {
        title: "Veja as Novidades (Feed)",
        instruction: "Role o dedo na tela de baixo para cima para ver o que seus amigos e familiares estão postando.",
        tip: "Esta tela se chama 'Feed de Notícias' e é onde tudo aparece.",
        image: "facebook"
      },
      {
        title: "Interaja com os amigos",
        instruction: "Toque no ícone de 'Mãozinha' para curtir ou no 'Balão' para escrever um comentário em uma foto.",
        tip: "Curtir e comentar é a melhor forma de mostrar que você viu a postagem!",
        image: "facebook"
      },
      {
        title: "Procure por conhecidos",
        instruction: "Toque na 'Lupa' no topo da tela e digite o nome de um amigo ou familiar.",
        tip: "Ao encontrar a pessoa, toque em 'Adicionar Amigo' para se conectar.",
        image: "facebook"
      },
      {
        title: "Faça sua postagem",
        instruction: "Toque em 'No que você está pensando?' no topo da tela para escrever algo ou postar uma foto sua.",
        tip: "Você pode escolher quem verá sua postagem antes de clicar em 'Publicar'.",
        image: "facebook"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/BszYeoeiHF0",
    siteUrl: "https://www.facebook.com",
  },
  {
    slug: "usar-instagram-basico",
    title: "Como usar o Instagram",
    description: "Veja fotos de amigos e compartilhe seus momentos.",
    category: "Redes Sociais",
    categorySlug: "redes-sociais",
    categoryIcon: "groups",
    difficulty: "Iniciante",
    image: "instagram",
    featured: false,
    steps: [
      {
        title: "Abra o Instagram",
        instruction: "Procure pelo ícone colorido que parece uma câmera quadrada e toque para abrir.",
        tip: "O Instagram é focado em fotos e vídeos de amigos e famosos.",
        image: "instagram"
      },
      {
        title: "Veja as fotos (Feed)",
        instruction: "Arraste a tela para cima para ver as fotos e vídeos que as pessoas postaram.",
        tip: "As postagens mais novas sempre aparecem primeiro.",
        image: "instagram"
      },
      {
        title: "Curta com dois toques",
        instruction: "Para dar um 'coração' em uma foto, você pode tocar rápido duas vezes no meio da imagem.",
        tip: "Você também pode tocar no coraçãozinho que fica logo abaixo da foto.",
        image: "instagram"
      },
      {
        title: "Veja os Stories",
        instruction: "No topo da tela, você verá círculos com as fotos dos seus amigos. Toque neles para ver vídeos curtos.",
        tip: "Os Stories são vídeos rápidos que somem depois de 24 horas.",
        image: "instagram"
      },
      {
        title: "Poste sua foto",
        instruction: "Toque no ícone de '+' (mais) no centro ou no topo da tela para escolher uma foto da sua galeria e publicar.",
        tip: "Você pode escrever uma legenda e colocar filtros para deixar a foto mais bonita!",
        image: "instagram"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/PQULFL8biAs",
    siteUrl: "https://www.instagram.com",
  },
  {
    slug: "como-pedir-uber",
    title: "Como pedir um Uber",
    description: "Aprenda a pedir um carro para ir aonde precisar com conforto.",
    category: "Aplicativos do Dia a Dia",
    categorySlug: "aplicativos",
    categoryIcon: "smartphone",
    difficulty: "Iniciante",
    image: "/images/Uber.png",
    featured: false,
    steps: [
      {
        title: "Abra o aplicativo Uber",
        instruction: "Toque no ícone preto escrito 'Uber' para abrir.",
        tip: "Lembre-se de ligar o GPS do seu celular.",
        image: "/images/Uber.png"
      },
      {
        title: "Diga para onde você vai",
        instruction: "Toque em 'Para onde?' e digite o endereço de destino.",
        tip: "Você também pode escolher lugares salvos como 'Casa' ou 'Trabalho'.",
        image: "/images/Uber.png"
      },
      {
        title: "Escolha o tipo de carro",
        instruction: "Escolha entre as opções (UberX é o mais comum) e veja o preço.",
        tip: "Confira o tempo que o motorista vai demorar para chegar.",
        image: "/images/Uber.png"
      },
      {
        title: "Confirme a viagem",
        instruction: "Toque em 'Confirmar UberX' e aguarde o app encontrar um motorista.",
        tip: "Fique de olho na placa e no modelo do carro que aparecerá na tela.",
        image: "/images/Uber.png"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/06KtCd3_kqA",
    siteUrl: "https://www.uber.com/br/pt-br/",
  },
  {
    slug: "como-pedir-99",
    title: "Como pedir um 99",
    description: "Peça viagens rápidas e baratas pelo aplicativo 99.",
    category: "Aplicativos do Dia a Dia",
    categorySlug: "aplicativos",
    categoryIcon: "smartphone",
    difficulty: "Iniciante",
    image: "/images/99-removebg-preview.png",
    featured: false,
    steps: [
      {
        title: "Abra o app 99",
        instruction: "Toque no ícone amarelo escrito '99' para abrir.",
        tip: "O 99 costuma ter promoções e descontos frequentes.",
        image: "/images/99-removebg-preview.png"
      },
      {
        title: "Insira seu destino",
        instruction: "Toque em 'Para onde vamos?' e coloque o endereço desejado.",
        tip: "Confira se o ponto de partida (onde você está) está correto no mapa.",
        image: "/images/99-removebg-preview.png"
      },
      {
        title: "Selecione a categoria",
        instruction: "Escolha a categoria (99Pop, 99Plus, etc.) e confira o valor da corrida.",
        tip: "Você pode mudar a forma de pagamento tocando no ícone de cartão ou dinheiro.",
        image: "/images/99-removebg-preview.png"
      },
      {
        title: "Chame o carro",
        instruction: "Toque em 'Confirmar' e aguarde o motorista aceitar a viagem.",
        tip: "Quando o carro chegar, confirme o nome do motorista antes de entrar.",
        image: "/images/99-removebg-preview.png"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/Bi-H6zb07JU?start=5",
    siteUrl: "https://99app.com",
  },
  {
    slug: "como-usar-mercado-livre",
    title: "Como usar o Mercado Livre",
    description: "Compre produtos de todos os tipos e receba em casa.",
    category: "Aplicativos do Dia a Dia",
    categorySlug: "aplicativos",
    categoryIcon: "smartphone",
    difficulty: "Iniciante",
    image: "/images/mercado-livre-logo-2022.png",
    featured: false,
    steps: [
      {
        title: "Abra o Mercado Livre",
        instruction: "Toque no ícone amarelo com duas mãos dadas (ou sacolas).",
        tip: "O Mercado Livre é um dos maiores sites de compras do Brasil.",
        image: "/images/mercado-livre-logo-2022.png"
      },
      {
        title: "Busque um produto",
        instruction: "Toque na barra de busca no topo e digite o que você quer comprar.",
        tip: "Use palavras simples como 'panela de pressão' ou 'sapato azul'.",
        image: "/images/mercado-livre-logo-2022.png"
      },
      {
        title: "Escolha o melhor anúncio",
        instruction: "Toque no produto que gostou e veja as fotos, o preço e o frete.",
        tip: "Sempre confira a 'reputação do vendedor' (a barra verde é a melhor).",
        image: "/images/mercado-livre-logo-2022.png"
      },
      {
        title: "Finalize a compra",
        instruction: "Toque em 'Comprar agora' e escolha como quer pagar (Pix, Boleto ou Cartão).",
        tip: "Confira se o seu endereço de entrega está certinho antes de terminar.",
        image: "/images/mercado-livre-logo-2022.png"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/2pXtTkD8jYg",
    siteUrl: "https://www.mercadolivre.com.br",
  },
  {
    slug: "como-usar-shopee",
    title: "Como usar a Shopee",
    description: "Encontre ofertas incríveis e cupons de frete grátis.",
    category: "Aplicativos do Dia a Dia",
    categorySlug: "aplicativos",
    categoryIcon: "smartphone",
    difficulty: "Iniciante",
    image: "/images/Shopee-removebg-preview-removebg-preview.png",
    featured: false,
    steps: [
      {
        title: "Abra a Shopee",
        instruction: "Toque no ícone laranja escrito 'Shopee' para começar.",
        tip: "Fique atento aos 'Cupons' para ganhar descontos e frete grátis.",
        image: "/images/Shopee-removebg-preview-removebg-preview.png"
      },
      {
        title: "Procure ofertas",
        instruction: "Use a barra de pesquisa para achar o que precisa ou navegue pelas categorias.",
        tip: "A Shopee tem muitas ofertas relâmpago que duram poucas horas.",
        image: "/images/Shopee-removebg-preview-removebg-preview.png"
      },
      {
        title: "Adicione ao carrinho",
        instruction: "Toque no produto e depois em 'Adicionar ao carrinho' se quiser comprar mais coisas, ou 'Comprar Agora'.",
        tip: "Leia os comentários de quem já comprou para ver se o produto é bom.",
        image: "/images/Shopee-removebg-preview-removebg-preview.png"
      },
      {
        title: "Pague com segurança",
        instruction: "No carrinho, toque em 'Continuar' e selecione o método de pagamento.",
        tip: "O pagamento via Pix é processado na hora e agiliza o envio!",
        image: "/images/Shopee-removebg-preview-removebg-preview.png"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/SG3dZV3hcNo",
    siteUrl: "https://shopee.com.br",
  },
];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.slug === slug);
}

export function getTutorialsByCategory(categorySlug: string): Tutorial[] {
  return tutorials.filter((t) => t.categorySlug === categorySlug);
}

export function getFeaturedTutorials(): Tutorial[] {
  return tutorials.filter((t) => t.featured);
}

export function searchTutorials(query: string): Tutorial[] {
  const q = query.toLowerCase().trim();
  if (!q) return tutorials;
  return tutorials.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}
