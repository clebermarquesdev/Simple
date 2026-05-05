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
}

export default function TutorialCard({
  slug,
  title,
  description,
  image,
  difficulty,
  showLightbulb = false,
}: TutorialCardProps) {
  return (
    <Link
      href={`/tutorial/${slug}`}
      className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden border border-outline-variant flex flex-col md:flex-row cursor-pointer hover:bg-surface-container-low transition-all duration-200 active:scale-[0.98] group"
    >
      {/* Image / Logo Section */}
      <div className="h-48 md:h-auto md:w-1/3 bg-[#f0f0f0] relative overflow-hidden flex items-center justify-center p-4">
        <div className="w-full h-full bg-white rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-shadow p-4">
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
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-center gap-2 md:w-2/3 relative">
        {showLightbulb && (
          <Icon
            name="lightbulb"
            filled
            className="absolute top-4 right-4 text-primary text-3xl"
          />
        )}
        <h3 className="text-2xl font-medium text-on-surface pr-10 leading-tight">
          {title}
        </h3>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          {description}
        </p>
        <div className="mt-2 flex items-center gap-2 text-primary font-semibold text-xl">
          <span>Começar Agora</span>
          <Icon name="arrow_forward" />
        </div>
      </div>
    </Link>
  );
}
