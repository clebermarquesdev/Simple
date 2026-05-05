import Link from "next/link";
import Icon from "./Icon";
import HeaderNav from "./HeaderNav";
import { auth } from "@/auth";
import { SignInButton, SignOutButton } from "./AuthButtons";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b-2 border-gray-100 shadow-sm flex items-center justify-between px-6 h-20 w-full sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Icon name="lightbulb" filled className="text-3xl text-brand-green" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-brand-green tracking-tight">
            Simple
          </span>
          <span className="text-sm text-on-surface-variant hidden md:block">
            Aprender é simples. Entender muda tudo.
          </span>
        </div>
      </Link>

      {/* Desktop Nav & Auth */}
      <div className="flex items-center gap-6">
        <HeaderNav />
        
        <div className="hidden md:block h-8 w-[2px] bg-gray-100"></div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-800 leading-none">
                  {session.user.name}
                </span>
              </div>
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || "Usuário"} 
                  className="w-10 h-10 rounded-full border-2 border-emerald-100 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  {session.user.name?.charAt(0)}
                </div>
              )}
              <SignOutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}
