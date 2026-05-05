"use client";

import Link from "next/link";
import Icon from "./Icon";

interface FavoriteCardProps {
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  onRemove: (slug: string) => void;
}

export default function FavoriteCard({
  slug,
  title,
  category,
  categoryIcon,
  onRemove,
}: FavoriteCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 flex items-center justify-between card-shadow border border-surface-container hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow">
      {/* Tutorial info (clickable) */}
      <Link
        href={`/tutorial/${slug}`}
        className="flex items-center gap-4 flex-grow group"
      >
        <div className="min-w-[56px] min-h-[56px] bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center rounded-xl group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
          <Icon name="star" filled className="text-3xl" />
        </div>
        <div>
          <h2 className="text-xl text-on-surface font-normal leading-snug">
            {title}
          </h2>
          <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full text-sm text-on-surface-variant mt-1">
            <Icon name={categoryIcon} className="text-sm" />
            {category}
          </span>
        </div>
      </Link>

      {/* Remove button */}
      <button
        onClick={() => {
          if (
            window.confirm(
              `Deseja remover "${title}" dos seus favoritos?`
            )
          ) {
            onRemove(slug);
          }
        }}
        className="min-w-[56px] min-h-[56px] flex items-center justify-center rounded-full text-outline hover:bg-error-container hover:text-on-error-container transition-colors ml-4 focus:ring-2 focus:ring-outline cursor-pointer"
        aria-label={`Remover ${title} dos favoritos`}
      >
        <Icon name="delete" />
      </button>
    </div>
  );
}
