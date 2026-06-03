import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Badge({
  children,
  active = false,
  className = "",
  onClick,
}: BadgeProps) {
  const baseStyles =
    "inline-block px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200";

  const activeStyles = active
    ? "bg-accent/10 border-accent text-text-main"
    : "bg-background-tertiary border-card-border text-text-secondary hover:border-accent/40 hover:text-text-main";

  const clickableStyles = onClick ? "cursor-pointer" : "";

  return (
    <span
      className={`${baseStyles} border ${activeStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded bg-accent/10 border border-accent/20 text-text-main text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
