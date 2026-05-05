"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const navItems = [
  { href: "/", label: "Início", icon: "home" },
  { href: "/categorias", label: "Categorias", icon: "grid_view" },
  { href: "/favoritos", label: "Favoritos", icon: "favorite" },
  { href: "/perfil", label: "Perfil", icon: "person" },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on tutorial pages
  if (pathname.startsWith("/tutorial/")) return null;

  return (
    <nav className="md:hidden bg-white fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe rounded-t-2xl border-t-2 border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all duration-300 touch-manipulation min-w-[56px] min-h-[56px] ${
              isActive
                ? "text-brand-green bg-emerald-50 rounded-xl px-4 py-2"
                : "text-gray-500 p-2 hover:text-emerald-600 active:scale-90"
            }`}
          >
            <Icon
              name={item.icon}
              filled={isActive}
              className="mb-1 text-2xl"
            />
            <span className="text-xs font-semibold tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
