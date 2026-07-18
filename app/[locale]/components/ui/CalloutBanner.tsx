import React from "react";
import { Button } from "./Button";

interface CalloutBannerProps {
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function CalloutBanner({
  title,
  description,
  ctaText,
  ctaHref,
  onCtaClick,
  className = "",
}: CalloutBannerProps) {
  return (
    <div
      className={`bg-gradient-to-br from-accent/8 to-accent/3 border border-accent/25 rounded-xl p-12 text-center ${className}`}
    >
      <h2 className="text-3xl font-extrabold text-foreground mb-3">{title}</h2>
      {description && (
        <p className="text-text-secondary mb-7 max-w-2xl mx-auto">{description}</p>
      )}
      {ctaText && (
        <Button
          variant="fill"
          size="lg"
          asLink={!!ctaHref}
          href={ctaHref}
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
}
