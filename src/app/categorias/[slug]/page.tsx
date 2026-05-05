"use client";

import { use } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, getTutorialsByCategory } from "@/data/tutorials";
import TutorialCard from "@/components/TutorialCard";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories.find((c) => c.slug === slug);
  const filteredTutorials = getTutorialsByCategory(slug);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Icon name="error" className="text-6xl text-outline mb-4 block mx-auto" />
        <h1 className="text-2xl font-semibold text-on-surface mb-2">Categoria não encontrada</h1>
        <Link href="/categorias" className="text-primary font-medium hover:underline">
          Ver todas as categorias
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header with Back button */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/categorias"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant"
        >
          <Icon name="arrow_back" size={28} />
        </Link>
        <div>
          <h1 className="text-[32px] font-semibold text-on-surface leading-tight">
            {category.name}
          </h1>
          <p className="text-lg text-on-surface-variant">
            {category.description}
          </p>
        </div>
      </div>

      {/* Tutorials List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-on-surface">
            Tutoriais disponíveis
          </h2>
          <span className="text-sm text-on-surface-variant font-medium">
            {filteredTutorials.length} {filteredTutorials.length === 1 ? "guia" : "guias"}
          </span>
        </div>

        {filteredTutorials.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.slug}
                slug={tutorial.slug}
                title={tutorial.title}
                description={tutorial.description}
                image={tutorial.image}
                difficulty={tutorial.difficulty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-dashed border-outline-variant">
            <Icon
              name="school"
              className="text-6xl text-outline mb-4 block mx-auto"
            />
            <p className="text-xl text-on-surface-variant">
              Em breve teremos novos tutoriais para esta categoria!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
