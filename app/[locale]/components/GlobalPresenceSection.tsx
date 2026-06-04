"use client";

import { useTranslations } from "next-intl";
import { SectionLabel } from "./ui";
// import { useInViewTrigger } from "@/hooks/useInViewTrigger";
// import { useTypingEffect } from "@/hooks/useTypingEffect";
// import ScrollReveal from "./animations/ScrollReveal";

type Office = {
  num: string;
  name: string;
  country: string;
  role: string;
  hq: boolean;
};

function FootprintMap() {

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full" aria-hidden="true">
      {/* Radar rings */}
      {[60, 84, 108, 132, 156, 180, 204, 228].map((r) => (
        <circle
          key={r}
          cx="250"
          cy="250"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}

      {/* Region outline */}
      <path
        d="M120 180 Q 170 140 230 150 Q 290 140 340 170 Q 380 200 370 250 Q 380 310 340 340 Q 290 370 230 360 Q 170 370 130 330 Q 100 290 110 240 Q 105 210 120 180 Z"
        fill="rgba(226,52,43,0.04)"
        stroke="rgba(226,52,43,0.25)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* Connection lines */}
      <g
        stroke="rgba(226,52,43,0.4)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 4"
      >
        <path d="M240 270 Q 280 240 320 230" />
        <path d="M240 270 Q 200 230 160 200" />
        <path d="M240 270 Q 270 220 290 195" />
        <path d="M240 270 Q 280 260 305 255" />
      </g>

      {/* Riyadh — HQ (red) */}
      <g>
        <circle cx="240" cy="270" r="22" fill="rgba(226,52,43,0.12)" />
        <circle cx="240" cy="270" r="6" fill="#e2342b" />
        <text
          x="252"
          y="262"
          fill="rgba(255,255,255,0.6)"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          RIYADH
        </text>
      </g>

      {/* Dubai */}
      <g>
        <circle cx="320" cy="230" r="22" fill="rgba(201,165,90,0.08)" />
        <circle cx="320" cy="230" r="4" fill="#c9a55a" />
        <text
          x="332"
          y="222"
          fill="rgba(255,255,255,0.6)"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          DUBAI
        </text>
      </g>

      {/* Cairo */}
      <g>
        <circle cx="160" cy="200" r="22" fill="rgba(201,165,90,0.08)" />
        <circle cx="160" cy="200" r="4" fill="#c9a55a" />
        <text
          x="172"
          y="192"
          fill="rgba(255,255,255,0.6)"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          CAIRO
        </text>
      </g>

      {/* Kuwait */}
      <g>
        <circle cx="290" cy="195" r="22" fill="rgba(201,165,90,0.08)" />
        <circle cx="290" cy="195" r="4" fill="#c9a55a" />
        <text
          x="302"
          y="187"
          fill="rgba(255,255,255,0.6)"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          KUWAIT
        </text>
      </g>

      {/* Manama */}
      <g>
        <circle cx="305" cy="255" r="22" fill="rgba(201,165,90,0.08)" />
        <circle cx="305" cy="255" r="4" fill="#c9a55a" />
        <text
          x="317"
          y="247"
          fill="rgba(255,255,255,0.6)"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          MANAMA
        </text>
      </g>
    </svg>
  );
}

export default function GlobalPresenceSection() {
  const t = useTranslations("home.globalPresence");
  const offices = t.raw("offices") as Office[];

  // const { ref, isInView } = useInViewTrigger();

  const fullTitle = `${t("title1")} ${t("title2")}`;

  //   const { displayed: typedText, showCursor } = useTypingEffect(
  //   fullTitle,
  //   50,
  //   isInView,
  //   500, // delay before hiding cursor
  // );

  return (
    <section className="bg-[#0a0a0a] text-white px-8 md:px-16 py-36 border-t-[1px] border-[#ffffff14]">
      <div className="max-w-screen-xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-jetbrains-mono text-[11px] tracking-[0.2em] text-[#a8a59c] uppercase">
            <SectionLabel>{t("eyebrow")}</SectionLabel>
          </span>
        </div>

        {/* Hero text */}
        <div className="flex gap-26 mb-12">
          <h2 className="font-space-grotesk text-5xl text-[#f4f1ea] font-medium md:text-[76px] leading-[1.05]">
            {fullTitle}
          </h2>
          {/* <ScrollReveal delay={0.2}> */}
          <p className="text-[#a8a59c] text-[17px] leading-relaxed self-end max-w-md">
            {t("description")}
          </p>
          {/* </ScrollReveal> */}
        </div>

        {/* Map + list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Map card */}
          <div className="rounded-xl border border-white/10 bg-[#111] p-4 aspect-square">
            <FootprintMap />
          </div>

          {/* Office list */}
          <div className="flex flex-col divide-y divide-white/10 self-center">
            {offices.map((o) => (
              <div key={o.num} className="flex items-start gap-6 py-5">
                <span className="font-jetbrains-mono text-[11px] text-white/25 pt-1 w-5 shrink-0">
                  {o.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-space-grotesk text-xl font-bold ${o.hq ? "text-red-500" : "text-white"}`}
                    >
                      {o.name}
                    </p>
                    {o.hq && (
                      <span className="font-jetbrains-mono text-[9px] tracking-widest text-red-500 border border-red-600/40 px-1.5 py-0.5 rounded-sm">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="font-jetbrains-mono text-[11px] text-white/30 mt-0.5">
                    {o.country}
                  </p>
                </div>
                <p className="font-jetbrains-mono text-[11px] text-white/30 self-center shrink-0">
                  {o.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
