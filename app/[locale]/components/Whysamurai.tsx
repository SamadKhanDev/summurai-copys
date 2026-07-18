"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Trophy, Link2, ShieldCheck, MapPin } from "lucide-react";
import { SectionLabel, SectionTitle } from "./ui";
import { AnimatedHeading } from "./animations/textBehavior";
import RingsCanvas from "./RingsCanvas";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { key: "expertise", icon: Trophy },
  { key: "delivery", icon: Link2 },
  { key: "security", icon: ShieldCheck },
  { key: "compliance", icon: MapPin },
] as const;

export default function WhySamurai() {
  const t = useTranslations("home.whySamurai");
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // GSAP ScrollTrigger setup
  useGSAP(() => {
    if (prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%", // scroll distance
      pin: pinRef.current,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    // Delay refresh to ensure preceding elements have settled their heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      trigger.kill();
      clearTimeout(timer);
    };
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  // Math for N items
  const N = ITEMS.length;
  const radius = 39.5; // in vh units

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden text-foreground bg-background z-10"
      >
        {/* 3D background rings */}
        {!prefersReducedMotion && (
          <RingsCanvas progress={progress} />
        )}



        {/* Top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Section Title Header (Fixed at top) */}
        <div className="absolute top-[28vh] left-0 right-0 z-20 px-8 text-center pointer-events-none">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <SectionLabel className="mb-4">{t("label")}</SectionLabel>
            <AnimatedHeading
              titleText={t("title")}
              accentText={t("titleAccent")}
              className="mb-4"
              Component={SectionTitle}
            />
          </div>
        </div>

        {prefersReducedMotion ? (
          // Fallback static 2x2 grid for reduced motion
          <div className="relative z-20 max-w-7xl mx-auto px-8 pt-44 h-full flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {ITEMS.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="group relative rounded-2xl p-8 flex gap-6 bg-card-bg border border-card-border hover:bg-[#E11D48]/[0.04] hover:border-[#E11D48]/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-[#E11D48]/10">
                    <Icon className="w-5 h-5 text-[#E11D48]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-space-grotesk font-bold text-[1rem] tracking-[-0.01em] text-foreground mb-2 leading-snug">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-[0.82rem] leading-relaxed font-light text-text-secondary">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Interactive scrolling/rotating layout
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 w-full h-full"
          >
            {ITEMS.map(({ key, icon: Icon }, i) => {
              const transitionLimit = 0.98; // All transitions finish by 98% of scroll progress
              const activeProgress = Math.min(1.0, progress / transitionLimit);
              const localProgress = activeProgress * (N - 1) - (i - 1);
              const angle = 180 - localProgress * 90;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              // Adjust opacity curve so it peaks when centered and is completely faded out at start/end
              const opacity = Math.max(0, 1 - Math.abs(angle - 90) / 45);

              return (
                <motion.div
                  key={key}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "30vh", // shift center to match RingsCanvas camera & geometry center
                    transform: `translate(calc(-50% + ${x}vh), calc(-50% + ${y}vh))`,
                    opacity: opacity,
                    pointerEvents: opacity < 0.15 ? "none" : "auto",
                  }}
                  className="w-full max-w-xl px-6 text-center flex flex-col items-center justify-center transition-all duration-75"
                >
                  <div className="relative w-full rounded-2xl border border-card-border bg-card-bg backdrop-blur-md p-8 md:p-10 shadow-2xl text-left overflow-hidden group">
                    {/* Vertical neon-red glowing bar on the left edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.8)]" />

                    {/* Step indicator tag */}
                    <span className="text-[9px] font-mono tracking-[0.2em] text-[#E11D48]/80 mb-3 block uppercase font-bold">
                      PILLAR 0{i + 1}
                    </span>

                    <h3 className="font-space-grotesk font-bold text-lg md:text-xl tracking-tight text-foreground mb-3">
                      {t(`items.${key}.title`)}
                    </h3>

                    <p className="text-text-secondary text-xs md:text-sm font-light leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Subtle indicator for scroll prompt */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Scroll to explore
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-zinc-500 to-transparent" />
          </motion.div>
        )}
      </div>
    </div>
  );
}