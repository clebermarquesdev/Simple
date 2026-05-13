"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-surface-container-high transition-all duration-200 active:scale-95 group border border-transparent hover:border-outline-variant"
      >
        <div className="relative">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Usuário"}
              className="w-9 h-9 rounded-full border-2 border-primary-fixed shadow-sm object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm">
              {user.name?.charAt(0)}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary border-2 border-surface-container-lowest rounded-full"></div>
        </div>
        <span className="hidden sm:block text-sm font-semibold text-on-surface max-w-[100px] truncate">
          {user.name?.split(" ")[0]}
        </span>
        <Icon 
          name="keyboard_arrow_down" 
          className={`text-on-surface-variant transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant py-2 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="px-4 py-3 border-b border-outline-variant/50 mb-1">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Conta</p>
            <p className="text-sm font-bold text-on-surface truncate">{user.name}</p>
            <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
          </div>

          <Link
            href="/perfil"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-primary-fixed/20 hover:text-brand-green transition-colors"
          >
            <Icon name="person" className="text-lg" />
            Meu Perfil
          </Link>

          <Link
            href="/ajuda"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-primary-fixed/20 hover:text-brand-green transition-colors"
          >
            <Icon name="help" className="text-lg" />
            Ajuda
          </Link>

          <div className="mt-1 pt-1 border-t border-outline-variant/50">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
            >
              <Icon name="logout" className="text-lg" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

