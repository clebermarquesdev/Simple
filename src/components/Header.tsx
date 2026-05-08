import Link from "next/link";
import Icon from "./Icon";
import HeaderNav from "./HeaderNav";
import { auth } from "@/auth";
import { SignInButton } from "./AuthButtons";
import UserMenu from "./UserMenu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-4 md:px-8 h-16 w-full sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex-1 flex justify-start">
        <Link href="/" className="flex items-center gap-3 group">
          <Icon name="lightbulb" filled className="text-3xl text-brand-green group-hover:scale-110 transition-transform duration-300 shrink-0" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-brand-green tracking-tight">
              Simple
            </span>
            <span className="text-sm text-on-surface-variant hidden md:block">
              Aprender é simples. Entender muda tudo.
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Main Navigation */}
      <div className="hidden md:flex justify-center">
        <HeaderNav />
      </div>

      {/* Right: User Identity / Auth */}
      <div className="flex-1 flex justify-end items-center gap-4">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
}
