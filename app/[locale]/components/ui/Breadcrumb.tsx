import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`bg-black border-b border-white/5 text-xs text-white/50 px-8 py-3 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-3 h-3" />}
            {item.href ? (
              <Link
                href={item.href as any}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-red-500 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
