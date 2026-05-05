"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { tutorials } from "@/data/tutorials";
import FavoriteCard from "@/components/FavoriteCard";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function FavoritosPage() {
  const { favorites, isLoaded, removeFavorite } = useFavorites();

  const favoriteTutorials = tutorials.filter((t) =>
    favorites.includes(t.slug)
  );

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="animate-pulse">
          <div className="h-10 bg-surface-container-high rounded w-48 mb-4" />
          <div className="h-6 bg-surface-container-high rounded w-80 mb-8" />
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-20 bg-surface-container-high rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-[32px] font-semibold text-on-background mb-2 leading-tight tracking-tight">
          Favoritos
        </h1>
        <p className="text-lg text-on-surface-variant">
          Encontre rapidamente os guias que você mais usa.
        </p>
      </div>

      {/* Favorite Cards */}
      {favoriteTutorials.length > 0 ? (
        <div className="flex flex-col gap-4">
          {favoriteTutorials.map((tutorial) => (
            <FavoriteCard
              key={tutorial.slug}
              slug={tutorial.slug}
              title={tutorial.title}
              category={tutorial.category}
              categoryIcon={tutorial.categoryIcon}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-8 bg-surface-container-low rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-dashed border-outline-variant">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <Icon name="bookmark" className="text-4xl text-outline" />
          </div>
          <h3 className="text-2xl font-medium text-on-surface mb-2">
            Você ainda não salvou nenhum tutorial.
          </h3>
          <p className="text-lg text-on-surface-variant max-w-sm mb-6">
            Toque na estrela quando estiver lendo um guia para guardá-lo aqui e
            acessar facilmente depois.
          </p>
          <Link
            href="/"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 hover:bg-surface-tint transition-colors active:scale-95"
          >
            <Icon name="home" />
            Explorar tutoriais
          </Link>
        </div>
      )}
    </div>
  );
}
