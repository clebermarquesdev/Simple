"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const navItems = [
  { href: "/", label: "Início", icon: "home" },
  { href: "/categorias", label: "Categorias", icon: "grid_view" },
  { href: "/favoritos", label: "Favoritos", icon: "favorite" },
];

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95 ${
              isActive
                ? "text-brand-green font-bold bg-primary-fixed/20"
                : "text-on-surface-variant hover:text-brand-green hover:bg-surface-container-low"
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

