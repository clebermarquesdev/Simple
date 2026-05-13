"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import TutorialCard from "@/components/TutorialCard";
import { tutorials, searchTutorials, getFeaturedTutorials } from "@/data/tutorials";

const quickCategories = [
  {
    name: "Bancos e PIX",
    icon: "account_balance",
    href: "/categorias/bancos-e-pix",
    bgColor: "bg-primary-container",
    textColor: "text-on-primary-container",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    href: "/categorias/redes-sociais",
    bgColor: "bg-[#25D366]",
    textColor: "text-white",
  },
  {
    name: "Governo",
    icon: "account_balance_wallet",
    href: "/categorias/governo",
    bgColor: "bg-tertiary-container",
    textColor: "text-on-tertiary-container",
  },
  {
    name: "Ver Mais",
    icon: "grid_view",
    href: "/categorias",
    bgColor: "bg-surface-variant",
    textColor: "text-on-surface-variant",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery ? searchTutorials(searchQuery) : [];
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mt-6 flex flex-col gap-10">


      {/* Search Bar */}
      <section className="w-full flex justify-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </section>

      {/* Search Results */}
      {isSearching && (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-on-surface">
            Resultados da busca
          </h2>
          {searchResults.length === 0 ? (
            <div className="bg-surface-container-low rounded-2xl p-8 text-center">
              <span className="material-symbols-outlined text-5xl text-outline mb-4 block">
                search_off
              </span>
              <p className="text-xl text-on-surface-variant">
                Nenhum tutorial encontrado para &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-lg text-on-surface-variant mt-2">
                Tente buscar por outro termo, como &ldquo;pix&rdquo; ou &ldquo;whatsapp&rdquo;.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {searchResults.map((tutorial) => (
                <TutorialCard
                  key={tutorial.slug}
                  slug={tutorial.slug}
                  title={tutorial.title}
                  description={tutorial.description}
                  image={tutorial.image}
                  difficulty={tutorial.difficulty}
                  siteUrl={tutorial.siteUrl}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Categories and Featured (hidden when searching) */}
      {!isSearching && (
        <>
          {/* Categorias Rápidas */}
          <section className="flex flex-col gap-4">
            <h2 className="text-[28px] font-semibold text-on-surface leading-tight">
              Categorias Rápidas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickCategories.map((cat) => (
                <CategoryCard
                  key={cat.name}
                  name={cat.name}
                  icon={cat.icon}
                  href={cat.href}
                  bgColor={cat.bgColor}
                  textColor={cat.textColor}
                />
              ))}
            </div>
          </section>

          {/* All tutorials */}
          <section className="flex flex-col gap-4">
            <h2 className="text-[28px] font-semibold text-on-surface leading-tight">
              Todos os Tutoriais
            </h2>
            <div className="flex flex-col gap-4">
              {tutorials.map((tutorial) => (
                <TutorialCard
                  key={tutorial.slug}
                  slug={tutorial.slug}
                  title={tutorial.title}
                  description={tutorial.description}
                  image={tutorial.image}
                  difficulty={tutorial.difficulty}
                  siteUrl={tutorial.siteUrl}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
