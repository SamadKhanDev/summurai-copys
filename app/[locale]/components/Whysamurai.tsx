"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Trophy, Link2, ShieldCheck, MapPin } from "lucide-react";
import { SectionLabel, SectionTitle } from "./ui";
import { AnimatedHeading } from "./animations/textBehavior";

const ITEMS = [
  { key: "expertise", icon: Trophy },
  { key: "delivery", icon: Link2 },
  { key: "security", icon: ShieldCheck },
  { key: "compliance", icon: MapPin },
] as const;

export default function WhySamurai() {
  const t = useTranslations("home.whySamurai");
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
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  return (
    <section
      className="relative overflow-hidden py-28 px-8"
      style={{ background: "#07080D" }}
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
      // style={{
      //   backgroundImage: `
      //     linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      //     linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
      //   `,
      //   backgroundSize: "48px 48px",
      // }}
      />

      {/* Subtle center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(225,29,72,0.06), transparent 70%)",
        }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Label */}
        <SectionLabel className="mb-4">{t("label")}</SectionLabel>


        {/* Title */}
        <AnimatedHeading
          titleText={t("title")}
          accentText={t("titleAccent")}
          className="mb-4"
          Component={SectionTitle}
        />

        {/* Cards — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ITEMS.map(({ key, icon: Icon }, index) => (
            <div
              key={key}
              ref={addRef(2 + index)}
              className="group relative rounded-2xl p-8 flex gap-6 opacity-0 translate-y-7 transition-all duration-700"
              style={{
                transitionDelay: `${200 + index * 80}ms`,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(225,29,72,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(225,29,72,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(225,29,72,0.55), transparent)",
                }}
              />

              {/* Icon column */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-[#E11D48]/15"
                style={{ background: "rgba(225,29,72,0.08)" }}
              >
                <Icon
                  className="w-5 h-5 transition-colors duration-300 group-hover:text-[#E11D48]"
                  style={{ color: "rgba(225,29,72,0.65)" }}
                />
              </div>

              {/* Text column */}
              <div className="flex flex-col">
                <h3
                  className="font-space-grotesk font-bold text-[1rem] tracking-[-0.01em] text-white mb-2 leading-snug"
                >
                  {t(`items.${key}.title`)}
                </h3>
                <p
                  className="text-[0.82rem] leading-relaxed font-light"
                  style={{ color: "rgba(148,163,184,0.65)" }}
                >
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
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