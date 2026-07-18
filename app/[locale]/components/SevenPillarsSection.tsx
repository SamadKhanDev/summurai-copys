"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Cloud,
  Scale,
  Settings,
  RefreshCw,
  Bot,
  Server,
  ArrowRight,
} from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import { useTheme } from "./ThemeProvider";
import AWaves from "./AWaves/AWaves";

interface PillarItem {
  key: string;
  num: string;
  icon: React.ElementType;
  img: string;
  href: string;
  borderColor: string;
  isWhiteBg: boolean;
  rotateDeg: number;
  translateX: number;
}

const PILLARS: PillarItem[] = [
  {
    key: "cyber",
    num: "01",
    icon: Shield,
    img: withBasePath("/images/pillars/cyber.jpg"),
    href: "/services/cybersecurity",
    borderColor: "#E11D48",
    isWhiteBg: false,
    rotateDeg: -15,
    translateX: 20,
  },
  {
    key: "cloud",
    num: "02",
    icon: Cloud,
    img: withBasePath("/images/pillars/cloud.jpg"),
    href: "/services/cloud",
    borderColor: "#ffffff",
    isWhiteBg: false,
    rotateDeg: -15,
    translateX: -20,
  },
  {
    key: "grc",
    num: "03",
    icon: Scale,
    img: withBasePath("/images/pillars/grc.jpg"),
    href: "/services/grc",
    borderColor: "#ffffff",
    isWhiteBg: true,
    rotateDeg: -15,
    translateX: 20,
  },
  {
    key: "bcm",
    num: "04",
    icon: RefreshCw,
    img: withBasePath("/images/pillars/bcm.jpg"),
    href: "/services/business-continuity",
    borderColor: "#E11D48",
    isWhiteBg: false,
    rotateDeg: -15,
    translateX: -20,
  },
  {
    key: "ai",
    num: "05",
    icon: Bot,
    img: withBasePath("/images/pillars/ai.jpg"),
    href: "/services/ai",
    borderColor: "rgba(255,255,255,0.8)",
    isWhiteBg: false,
    rotateDeg: -15,
    translateX: 20,
  },
  {
    key: "dt",
    num: "06",
    icon: Settings,
    img: withBasePath("/images/pillars/dt.jpg"),
    href: "/services/digital-transformation",
    borderColor: "#ffffff",
    isWhiteBg: false,
    rotateDeg: -15,
    translateX: -20,
  },
  {
    key: "infrastructure",
    num: "07",
    icon: Server,
    img: withBasePath("/images/pillars/infrastructure.jpg"),
    href: "/services/cloud-infrastructure",
    borderColor: "#E11D48",
    isWhiteBg: false,
    rotateDeg: -15,
    translateX: 20,
  },
];

const PILLAR_TAGS: Record<string, string[]> = {
  cyber: ["SIEM/SOAR", "EDR/XDR", "NCA ECC", "MITRE ATT&CK", "Zero Trust", "VA/PT"],
  cloud: ["Azure", "AWS", "Oracle OCI", "ITSM", "Hybrid IT"],
  grc: ["NCA ECC", "PDPL", "ISO 27001", "vCISO", "NDMO"],
  bcm: ["SAMA BCM", "ISO 22301", "BIA", "DR", "RTO/RPO"],
  ai: ["LangChain", "AutoGPT", "NLP", "Computer Vision"],
  dt: ["Agile", "DevOps", "Consulting", "Enterprise Analytics"],
  infrastructure: ["Bare Metal", "Hypervisors", "Data Centers", "Virtualization"],
};

// Card height + step between cards in the scrollable stack
const CARD_HEIGHT = 290;
const CARD_STEP = 135;

export default function SevenPillarsSection() {
  const t = useTranslations("home");
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Outer scroll wrapper — tracks how far we've scrolled inside this section
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0); // 0–1 across all cards

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!outerRef.current) {
            ticking = false;
            return;
          }
          const rect = outerRef.current.getBoundingClientRect();
          // How many pixels of the sticky section have scrolled past the top
          const scrolled = -rect.top;
          const totalScrollable = rect.height - window.innerHeight;

          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          const clamped = Math.max(0, Math.min(scrolled, totalScrollable));
          const progress = clamped / totalScrollable;
          setScrollProgress(progress);

          // Determine active card index from progress
          const rawIdx = progress * (PILLARS.length - 1);
          const idx = Math.round(rawIdx);
          setActiveIndex(Math.max(0, Math.min(idx, PILLARS.length - 1)));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activePillar = PILLARS[activeIndex];

  const handleCardClick = (idx: number) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;

    // Each card index corresponds to 220px of scroll height in the sticky section
    const targetScrollY = elementTop + idx * 220;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Adjust cardListTranslateY so that when activeIndex is 0 (progress = 0), the first card is perfectly centered.
  // When activeIndex increases, the list translates up to keep the active card centered.
  const cardListTranslateY = -(scrollProgress * (PILLARS.length - 1) * CARD_STEP);
  const currentFractionalIndex = scrollProgress * (PILLARS.length - 1);

  return (
    /*
     * Outer wrapper — tall enough to create scroll space.
     * Height = 100vh (sticky panel) + extra scroll distance for cards.
     */
    <div
      ref={outerRef}
      style={{
        position: "relative",
        height: `calc(100vh + ${(PILLARS.length - 1) * 220}px)`,
      }}
    >
      {/* ── Sticky container — stays in viewport while outer scrolls ── */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "var(--background)",
        }}
      >
        {/* ── Fixed Background Layer ── */}
        {/* Deep gradient */}
        {!isLight && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(220,38,38,0.08) 0%, transparent 70%), var(--background)",
              zIndex: 0,
            }}
          />
        )}

        {/* Animated ambient glow that shifts with active card (Pure Red Theme) */}
        {!isLight && (
          <div
            style={{
              position: "absolute",
              left: "55%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle, #DC2626 0%, transparent 70%)",
              opacity: 0.09,
              filter: "blur(120px)",
              transition: "opacity 0.6s ease",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Waves background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <AWaves />
        </div>

        {/* ── Main grid layout ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            alignItems: "center",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2rem",
            gap: "4rem",
          }}
        >
          {/* ── LEFT: Info panel (animated with active card) ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.5rem",
              paddingRight: "2.5rem",
            }}
          >
            {/* Pillar counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  color: "#DC2626",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  transition: "all 0.4s ease",
                }}
              >
                Pillar {activePillar.num} / 07
              </span>
              <div style={{ height: 1, width: 48, background: "var(--border)" }} />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Active Focus
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                maxWidth: 400,
                height: 2,
                background: "var(--border)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((activeIndex + 1) / PILLARS.length) * 100}%`,
                  background: "linear-gradient(90deg, #DC2626, #EF4444)",
                  borderRadius: 2,
                  transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* Title & description */}
            <div
              key={activeIndex}
              style={{
                animation: "slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 900,
                  color: "var(--foreground)",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                {t(`services.items.${activePillar.key}.title`)}
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                {t(`services.items.${activePillar.key}.description`)}
              </p>
            </div>

            {/* Tags */}
            <div
              key={`tags-${activeIndex}`}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                maxWidth: 520,
                animation: "slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              {PILLAR_TAGS[activePillar.key]?.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    padding: "4px 12px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: 999,
                    color: "var(--text-secondary)",
                    letterSpacing: "0.05em",
                    transition: "all 0.3s ease",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Link
                href={activePillar.href as any}
                className="group/btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  padding: "0.875rem 1.5rem",
                  background: "#DC2626",
                  borderRadius: 10,
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(220,38,38,0.3)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                Explore Service
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Scrolling card stack ── */}
          <div
            style={{
              position: "relative",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Fade masks top & bottom */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 120,
                background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />

            {/* Card list container with relative positioning so cards are centered by default */}
            <div
              style={{
                position: "relative",
                height: CARD_HEIGHT,
                width: 210,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateY(${cardListTranslateY}px)`,
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
              }}
            >
              {PILLARS.map((pillar, idx) => {
                const title = t(`services.items.${pillar.key}.title`);
                const words = title.split(" ");
                const firstLine = words.slice(0, 2).join(" ");
                const secondLine = words.slice(2).join(" ");

                const isActive = idx === activeIndex;

                // Continuous fractional distance from the active center
                const dist = idx - currentFractionalIndex;
                const distAbs = Math.abs(dist);

                // Curved position (bulging to the left, i.e. negative translateX at the center,
                // and curving to the right as cards get further away)
                const baseDx = -60; // Pulls the center card closer to the left info section
                const curvature = 45; // Shape of the C curve (bigger = wider curve)
                const currentTranslateX = baseDx + (dist * dist) * curvature;

                // Rotates the cards along the tangent of the C curve
                // Cards above tilt downwards (negative angle), cards below tilt upwards (positive angle)
                const currentRotate = dist * -8;

                // Continuous scale & opacity based on fractional distance
                const scale = Math.max(0.78, 1.12 - distAbs * 0.09);
                const opacity = Math.max(0.2, 1.0 - distAbs * 0.28);

                // Continuous closeness to the active center (for glow/highlight)
                const closeness = Math.max(0, 1 - distAbs);

                return (
                  <Link
                    key={pillar.key}
                    href={pillar.href as any}
                    className={`pillar-card-link ${isActive ? "active-card" : ""}`}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        handleCardClick(idx);
                      }
                    }}
                    style={{
                      position: "absolute",
                      top: idx * CARD_STEP,
                      width: 210,
                      height: CARD_HEIGHT,
                      display: "block",
                      transform: `rotate(${currentRotate}deg) translateX(${currentTranslateX}px) scale(${scale})`,
                      opacity,
                      transition:
                        "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease",
                      willChange: "transform, opacity",
                      textDecoration: "none",
                      zIndex: isActive ? 100 : 50 - Math.round(distAbs),
                    }}
                  >
                    {/* Glow border (Pure Red Theme) */}
                    <div
                      className="glow-border"
                      style={{
                        position: "absolute",
                        inset: -2,
                        borderRadius: 18,
                        border: `3px solid ${isActive ? "rgba(220, 38, 38, 0.75)" : (isLight ? "transparent" : "var(--border)")
                          }`,
                        boxShadow: closeness > 0 && !isLight
                          ? `0 0 25px rgba(220, 38, 38, ${0.3 * closeness})`
                          : "none",
                        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Card body */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        borderRadius: 16,
                        overflow: "hidden",
                        background: "var(--background-secondary)",
                        boxShadow: isLight
                          ? "0 10px 30px rgba(0,0,0,0.06)"
                          : "0 20px 60px rgba(0,0,0,0.5)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "60%",
                          background: "var(--background-tertiary)",
                        }}
                      >
                        <Image
                          src={pillar.img}
                          alt={title}
                          fill
                          unoptimized
                          className="pillar-card-image"
                          style={{
                            objectFit: "cover",
                            filter: isActive
                              ? "brightness(0.9) contrast(1.05)"
                              : "brightness(0.35) grayscale(0.3)",
                            transition: "filter 0.4s ease",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
                          }}
                        />
                        {/* Wave separator */}
                        <svg
                          viewBox="0 0 1440 320"
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: 40,
                            pointerEvents: "none",
                            zIndex: 10,
                            fill: "var(--background-secondary)",
                          }}
                          preserveAspectRatio="none"
                        >
                          <path d="M0,96 C288,140 576,160 864,120 C1152,80 1320,110 1440,128 L1440,320 L0,320 Z" />
                        </svg>
                      </div>

                      {/* Text footer */}
                      <div
                        style={{
                          width: "100%",
                          flex: 1,
                          padding: "8px 20px 20px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          position: "relative",
                          backgroundColor: "var(--background-secondary)",
                          color: "var(--foreground)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            marginBottom: 6,
                            color: isActive ? "#DC2626" : "rgba(220,38,38,0.6)",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {pillar.num}
                        </span>
                        <h3
                          style={{
                            fontWeight: 900,
                            fontSize: 17,
                            lineHeight: 1.15,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {firstLine}
                          {secondLine && (
                            <>
                              <br />
                              <span style={{ fontWeight: 300 }}>{secondLine}</span>
                            </>
                          )}
                        </h3>

                        {/* Arrow */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: 16,
                            right: 20,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "translateX(0)" : "translateX(8px)",
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                          }}
                        >
                          <ArrowRight style={{ width: 20, height: 20, color: "#DC2626" }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll hint — visible when at top of section */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: scrollProgress < 0.05 ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
          <div
            style={{
              width: 1,
              height: 32,
              background: "linear-gradient(to bottom, rgba(220,38,38,0.6), transparent)",
              animation: "scrollPulse 1.8s ease-in-out infinite",
            }}
          />
        </div>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.3); }
          }
          @keyframes slideUpFade {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .pillar-card-link.active-card .glow-border,
          .pillar-card-link.active-card > div:last-child {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease !important;
          }
          .pillar-card-link.active-card:hover .glow-border,
          .pillar-card-link.active-card:hover > div:last-child {
            transform: translateY(-5px) scale(1.015) !important;
          }
          /* Active card hover: extra bright, premium red border and spreading glow */
          .pillar-card-link.active-card:hover .glow-border {
            border-color: rgba(220, 38, 38, 0.95) !important;
            box-shadow: 0 12px 35px rgba(220, 38, 38, 0.55), 0 0 30px rgba(220, 38, 38, 0.4) !important;
          }
        `}</style>
      </div>
    </div>
  );
}
