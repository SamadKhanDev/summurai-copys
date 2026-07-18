import { Link } from "@/i18n/navigation";
import type { Pathnames } from "@/i18n/routing";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  hover = true,
  highlighted = false,
  onClick,
}: CardProps) {
  const baseStyles =
    "bg-card-bg border rounded-xl p-7 transition-all duration-300";

  const hoverStyles = hover
    ? "hover:border-accent/40 hover:-translate-y-1 cursor-pointer"
    : "";

  const borderStyle = highlighted
    ? "border-accent/50"
    : "border-card-border";

  return (
    <div
      className={`${baseStyles} ${borderStyle} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardIconProps {
  children: React.ReactNode;
  className?: string;
}

export function CardIcon({ children, className = "" }: CardIconProps) {
  return <div className={`text-4xl mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`text-base font-bold text-foreground mb-3 ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = "",
}: CardDescriptionProps) {
  return (
    <p className={`text-sm text-text-secondary leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

interface CardLinkProps {
  children: React.ReactNode;
  href?: Pathnames;
  onClick?: () => void;
  className?: string;
}

export function CardLink({
  children,
  href,
  onClick,
  className = "",
}: CardLinkProps) {
  const commonClasses = `inline-flex items-center gap-1 mt-4 text-sm font-semibold text-text-main hover:text-foreground transition-colors cursor-pointer ${className}`;

  if (!href) {
    return (
      <button onClick={onClick} className={commonClasses}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={commonClasses}>
      {children}
    </Link>
  );
}
