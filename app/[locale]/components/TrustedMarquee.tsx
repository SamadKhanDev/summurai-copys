"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/basePath";
import { Button } from "./ui";

type TrustedBySectionProps = {
  title?: string;
  logos?: string[];
  cta?: string;
};

const MARQUEE_SPEED = "30s";

export default function TrustedBySection({
  title,
  logos = [],
  cta = ""
}: TrustedBySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const track = [...logos, ...logos];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || logos.length === 0) return;

    let active = true;

    const updateScales = () => {
      if (!active) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        const distance = Math.abs(cardCenter - containerCenter);
        const maxDistance = 220; // Wider range for smooth build-up

        let targetScale = 1.0;
        let targetGlow = 0;

        if (distance < maxDistance) {
          const factor = 1 - distance / maxDistance;
          // Quadratic curve (power of 2) for a very smooth and natural transition before and after the center
          const ease = Math.pow(factor, 2);
          targetScale = 1.0 + 0.08 * ease; // Scale up to a subtle 1.08x when in the center
          targetGlow = ease;
        }

        // Get current values or initialize them
        const currentScale = parseFloat(card.getAttribute("data-scale") || "1.0");
        const currentGlow = parseFloat(card.getAttribute("data-glow") || "0");

        // Interpolate (lerp) towards target values
        const lerpSpeed = 0.04; 
        const nextScale = currentScale + (targetScale - currentScale) * lerpSpeed;
        const nextGlow = currentGlow + (targetGlow - currentGlow) * lerpSpeed;

        // Save interpolated values back to dataset
        card.setAttribute("data-scale", nextScale.toFixed(4));
        card.setAttribute("data-glow", nextGlow.toFixed(4));

        // Apply scale directly
        card.style.transform = `scale(${nextScale})`;
        
        // Dynamic border and opacity effect (mathematically continuous without threshold jumps)
        card.style.borderColor = `rgba(255, 255, 255, ${0.35 * nextGlow})`; // Brighter shiny white border
        card.style.boxShadow = `0 0 12px rgba(255, 255, 255, ${0.15 * nextGlow})`; // Tight edge glow to make the border shine
        const img = card.querySelector("img");
        if (img) img.style.opacity = `${0.6 + 0.4 * nextGlow}`;
      });

      requestAnimationFrame(updateScales);
    };

    const animId = requestAnimationFrame(updateScales);

    return () => {
      active = false;
      cancelAnimationFrame(animId);
    };
  }, [logos]);

  // Early return if no logos
  if (logos.length === 0) return null;

  return (
    <section
      id={title ? "section-8" : "section-10"}
      className="bg-[#0a0a0a] py-20 overflow-hidden border-t-[1px] border-[#ffffff14]"
    >
      {title && (
        <p className="font-jetbrains-mono text-[11px] tracking-[0.25em] text-[#a8a59c] text-center mb-10 uppercase">
          {title}
        </p>
      )}

      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
        />

        <div
          className="flex shrink-0 gap-16 py-6 w-max"
          style={{
            animation: `trustedMarquee ${MARQUEE_SPEED} linear infinite`,
            willChange: "transform",
          }}
        >
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="font-jetbrains-mono text-[22px] font-medium tracking-[0.08em] text-[#6d6b64] transition-colors duration-300 whitespace-nowrap cursor-default select-none uppercase flex justify-center items-center origin-center px-6 py-4 rounded-xl border border-transparent"
              style={{
                willChange: "transform, border-color",
              }}
            >
              <Image
                src={withBasePath(`/assets/logos/${name}`)}
                alt="Logo"
                width={100}
                height={100}
                className="max-h-12 w-auto object-contain transition-opacity duration-300 opacity-60"
              />
            </span>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <Button variant="outline" asLink href="/partners">
          {cta}
        </Button>
      </div>
    </section>
  );
}
