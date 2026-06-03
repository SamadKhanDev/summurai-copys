import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "primary" | "secondary" | "tertiary";
  id?: string;
}

export function Section({
  children,
  className = "",
  background = "primary",
  id,
}: SectionProps) {
  const bgStyles = {
    primary: "bg-background",
    secondary: "bg-background-secondary",
    tertiary: "bg-background-tertiary",
  };

  return (
    <section id={id} className={`py-20 px-8 ${bgStyles[background]} ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`text-xs font-bold tracking-[0.18em] text-text-main uppercase mb-3 ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  accent?: React.ReactNode;
  className?: string;
}

export function SectionTitle({
  children,
  accent,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-extrabold text-white leading-tight ${className}`}
    >
      {children}
      {accent && <span className="text-text-main">{accent}</span>}
    </h2>
  );
}

interface SectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionDescription({
  children,
  className = "",
}: SectionDescriptionProps) {
  return (
    <p
      className={`mt-4 text-text-secondary max-w-2xl leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}
