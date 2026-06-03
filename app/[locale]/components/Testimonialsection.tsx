"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "./ui";

export default function TestimonialSection() {
  const t = useTranslations("home.testimonial");
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-7");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden py-28 px-8"
      style={{ background: "#07080D" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Radial glow — red, centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(225,29,72,0.07), transparent 70%)",
        }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
      // style={{
      //   backgroundImage: `
      //     linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      //     linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
      //   `,
      //   backgroundSize: "48px 48px",
      //   maskImage:
      //     "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 100%)",
      //   WebkitMaskImage:
      //     "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 100%)",
      // }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Label */}
        <SectionLabel>{t("industries.label")}</SectionLabel>


        {/* Quote card */}
        <article
          ref={ref}
          className="relative w-full rounded-2xl px-10 py-12 md:px-16 md:py-14 opacity-0 translate-y-7 transition-all duration-700"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-12 right-12 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(225,29,72,0.5), transparent)",
            }}
          />

          {/* Large decorative quote mark */}
          <div
            className="absolute top-8 left-10 font-space-grotesk font-extrabold leading-none select-none pointer-events-none"
            style={{
              fontSize: "7rem",
              lineHeight: 1,
              color: "rgba(225,29,72,0.12)",
            }}
            aria-hidden
          >
            "
          </div>

          {/* Quote text */}
          <blockquote
            className="relative z-10 font-space-grotesk font-bold leading-[1.55] tracking-[-0.01em] text-white mb-10 text-xl md:text-2xl lg:text-[1.65rem]"
          >
            {t("quote")}
          </blockquote>

          {/* Divider */}
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ background: "rgba(225,29,72,0.4)" }}
          />

          {/* Author */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-space-grotesk font-bold text-[0.75rem] tracking-[0.15em] uppercase text-white"
            >
              {t("author")}
            </span>
            <span
              className="text-[0.7rem] tracking-[0.08em] font-space-grotesk"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              Saudi Financial Institution
            </span>
          </div>
        </article>

        {/* CTA */}
        <a
          href="/case-studies"
          className="group mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-full font-space-grotesk font-bold text-[0.65rem] tracking-[0.18em] uppercase text-white transition-all duration-300 hover:border-[#E11D48] hover:text-[#E11D48]"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(225,29,72,0.5)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(225,29,72,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          {t("cta")}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}