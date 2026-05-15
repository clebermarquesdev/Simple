import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HelpFAB from "@/components/HelpFAB";
import VLibras from "@/components/VLibras";
import { SettingsProvider } from "@/contexts/SettingsContext";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Simple | Aprender é simples. Entender muda tudo.",
  manifest: "/manifest.json",
  description:
    "O Simple é seu guia fácil e confiável para aprender a usar aplicativos e serviços digitais do dia a dia. Tutoriais passo a passo, explicações simples e links úteis para te ajudar.",
  keywords: [
    "tutoriais digitais",
    "inclusão digital",
    "como fazer pix",
    "como usar whatsapp",
    "aprender tecnologia",
    "tutorial simples",
  ],
  authors: [{ name: "Simple App" }],
  openGraph: {
    title: "Simple | Aprender é simples. Entender muda tudo.",
    description:
      "Tutoriais passo a passo para aprender a usar aplicativos e serviços digitais de forma simples.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={lexend.variable} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#006a34" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Simple" />
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-background text-on-background min-h-screen font-[family-name:var(--font-lexend)]">
        <SettingsProvider>
          <Header />
          <main className="pb-24 md:pb-0">{children}</main>
          <BottomNav />
          <HelpFAB />
          <VLibras />
        </SettingsProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Anti-flash: apply dark mode before paint
              (function() {
                try {
                  var stored = localStorage.getItem('@simple:darkMode');
                  var isDark = stored !== null ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    var meta = document.querySelector('meta[name="theme-color"]');
                    if (meta) meta.setAttribute('content', '#0f1729');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
