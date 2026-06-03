import React from "react";
import { ChevronRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "fill" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: boolean;
  asLink?: boolean;
  href?: string;
}

export function Button({
  variant = "fill",
  size = "md",
  children,
  icon = false,
  asLink = false,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 font-semibold font-space-grotesk tracking-wider uppercase transition-all duration-300 rounded-lg cursor-pointer border-none whitespace-nowrap";

  const variantStyles = {
    fill: "bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]",
    outline:
      "bg-transparent border-2 border-accent text-text-main hover:bg-accent/10",
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-2.5",
    lg: "text-base px-8 py-3.5",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asLink && href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
        {icon && <ChevronRight className="w-4 h-4" />}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
      {icon && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}
