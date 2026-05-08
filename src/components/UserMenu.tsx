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
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95 group border border-transparent hover:border-gray-200"
      >
        <div className="relative">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Usuário"}
              className="w-9 h-9 rounded-full border-2 border-emerald-100 shadow-sm object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              {user.name?.charAt(0)}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[100px] truncate">
          {user.name?.split(" ")[0]}
        </span>
        <Icon 
          name="keyboard_arrow_down" 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="px-4 py-3 border-b border-gray-50 mb-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Conta</p>
            <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/perfil"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-brand-green transition-colors"
          >
            <Icon name="person" className="text-lg" />
            Meu Perfil
          </Link>

          <Link
            href="/ajuda"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-brand-green transition-colors"
          >
            <Icon name="help" className="text-lg" />
            Ajuda
          </Link>

          <div className="mt-1 pt-1 border-t border-gray-50">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
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
