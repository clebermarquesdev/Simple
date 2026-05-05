"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, getTutorialsByCategory, tutorials } from "@/data/tutorials";
import TutorialCard from "@/components/TutorialCard";

export default function CategoriasPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-[32px] font-semibold text-on-surface mb-2 leading-tight tracking-tight">
        Categorias
      </h1>
      <p className="text-lg text-on-surface-variant mb-10">
        Escolha um assunto para aprender. Nós explicamos de forma simples.
      </p>

      {/* Bento Grid Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorias/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-surface-container-low card-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 flex flex-col items-center text-center border border-outline-variant hover:border-primary-fixed min-h-[220px] justify-center active:scale-[0.98]"
          >
            <div
              className={`w-16 h-16 rounded-full ${cat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon
                name={cat.icon}
                filled
                className={`text-3xl ${cat.textColor}`}
              />
            </div>
            <h3 className="text-2xl font-semibold text-on-surface mb-2">
              {cat.name}
            </h3>
            <p className="text-base text-on-surface-variant opacity-80 group-hover:opacity-100 transition-opacity max-w-md leading-relaxed">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
