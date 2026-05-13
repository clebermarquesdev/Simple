import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

interface TutorialCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  showLightbulb?: boolean;
  siteUrl?: string;
}

export default function TutorialCard({
  slug,
  title,
  description,
  image,
  difficulty,
  showLightbulb = false,
  siteUrl,
}: TutorialCardProps) {
  return (
    <div
      className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden border border-outline-variant flex flex-col md:flex-row hover:bg-surface-container-low transition-all duration-200 group"
    >
      {/* Image / Logo Section */}
      <Link href={`/tutorial/${slug}`} className="h-48 md:h-auto md:w-1/3 bg-surface-container relative overflow-hidden flex items-center justify-center p-4 cursor-pointer">
        <div className="w-full h-full bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-shadow p-4">
          {image.startsWith("/") ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ) : (
            <div className="group-hover:scale-110 transition-transform duration-300">
              <Icon name={image} size={80} />
            </div>
          )}
        </div>
        {difficulty && (
          <div className="absolute top-6 left-6 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow-sm z-10">
            {difficulty}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col justify-center gap-2 md:w-2/3 relative">
        {showLightbulb && (
          <Icon
            name="lightbulb"
            filled
            className="absolute top-4 right-4 text-primary text-3xl"
          />
        )}
        <Link href={`/tutorial/${slug}`} className="cursor-pointer">
          <h3 className="text-2xl font-medium text-on-surface pr-10 leading-tight">
            {title}
          </h3>
          <p className="text-lg text-on-surface-variant leading-relaxed mt-1">
            {description}
          </p>
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Link
            href={`/tutorial/${slug}`}
            className="flex items-center gap-2 text-primary font-semibold text-lg hover:underline underline-offset-4 transition-all active:scale-[0.97]"
          >
            <span>Começar Agora</span>
            <Icon name="arrow_forward" />
          </Link>
          {siteUrl && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border-2 border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-[0.97]"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="open_in_new" size={16} />
              <span>Acessar Site</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
