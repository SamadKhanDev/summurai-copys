"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "./ui";

type TrustedBySectionProps = {
  title?: string;
  logos?: string[]; // <-- changed to optional
  cta?: string; // <-- changed to optional
};

const MARQUEE_SPEED = "30s";

export default function TrustedBySection({
  title,
  logos = [],
  cta // <-- add default value
}: TrustedBySectionProps) {
  const track = [...logos, ...logos];

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

      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
        />

        <div
          className="flex shrink-0 gap-16 w-max"
          style={{
            animation: `trustedMarquee ${MARQUEE_SPEED} linear infinite`,
            willChange: "transform",
          }}
        >
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`} // <-- better key using name + index
              className="font-jetbrains-mono text-[22px] font-medium tracking-[0.08em] text-[#6d6b64] hover:text-[#F4F1E4] transition-colors duration-300 whitespace-nowrap cursor-default select-none uppercase flex justify-center items-center"
            >
              <Image
                src={`/v0/assets/logos/${name}`}
                alt="Logo"
                width={100}
                height={100}
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