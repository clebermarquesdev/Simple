import Link from "next/link";
import Icon from "./Icon";

interface CategoryCardProps {
  name: string;
  icon: string;
  href: string;
  bgColor?: string;
  textColor?: string;
}

export default function CategoryCard({
  name,
  icon,
  href,
  bgColor = "bg-primary-container",
  textColor = "text-on-primary-container",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="bg-surface-container-lowest p-6 rounded-xl card-shadow flex flex-col items-center gap-3 hover:bg-surface-container-low transition-all duration-200 active:scale-95 border border-outline-variant group"
    >
      <div
        className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center ${textColor} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon name={icon} filled className="text-4xl" />
      </div>
      <span className="text-base font-semibold text-on-surface text-center tracking-wide">
        {name}
      </span>
    </Link>
  );
}
