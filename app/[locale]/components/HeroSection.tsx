"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui";

export default function HeroSection({ onBookBriefingClick }: { onBookBriefingClick?: () => void }) {
  const t = useTranslations("home");
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-7");
          }
        });
      },
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (index: number) => (el: HTMLElement | null) => {
    revealRefs.current[index] = el;
  };

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col items-start justify-center px-8 pt-28 pb-20 overflow-hidden"
        style={{ background: "#05060A" }}
      >
        {/* Radial red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(225,29,72,0.12), transparent 70%)",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Tag / Badge */}
          <div
            ref={addRevealRef(0)}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] mb-8 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-[#94A3B8] opacity-0 translate-y-7 transition-all duration-700 font-['Space_Grotesk',sans-serif]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#E11D48] shrink-0"
              style={{
                boxShadow: "0 0 10px rgba(225,29,72,1)",
                animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
              }}
            />
            {t("hero.tag")}
          </div>

          {/* Headline */}
          <h1
            ref={addRevealRef(1)}
            className="font-['Space_Grotesk',sans-serif] font-extrabold leading-tight tracking-[-0.03em] mb-6 max-w-4xl text-white opacity-0 translate-y-7 transition-all duration-700 delay-100 text-[85px] md:text-6xl lg:text-7xl"
          >
            {t("hero.title")}
            <span className="text-text-main font-light italic">{t("hero.titleAccent")}</span>
          </h1>

          {/* Description */}
          <p
            ref={addRevealRef(2)}
            className="text-lg leading-relaxed text-[rgba(148,163,184,0.75)] max-w-2xl mb-10 opacity-0 translate-y-7 transition-all duration-700 delay-200 font-light"
          >
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div
            ref={addRevealRef(3)}
            className="flex gap-4 flex-wrap opacity-0 translate-y-7 transition-all duration-700 delay-300"
          >
            <Button
              variant="fill"
              size="lg"
              {...(onBookBriefingClick ? { onClick: onBookBriefingClick } : { asLink: true, href: "/contact" })}
            >
              {t("hero.ctaPrimary")}
            </Button>
            <Button variant="outline" size="lg" asLink href="/services">
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
