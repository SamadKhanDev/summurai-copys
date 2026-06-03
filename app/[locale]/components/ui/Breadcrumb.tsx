import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`text-xs text-text-secondary px-8 py-4 max-w-7xl mx-auto ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-3 h-3" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-text-main transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-main">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
