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

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-2 items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95 ${
              isActive
                ? "text-brand-green font-bold bg-emerald-50"
                : "text-gray-500 hover:text-emerald-600 hover:bg-gray-50"
            }`}
          >
            <Icon name={item.icon} filled={isActive} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
