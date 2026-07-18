"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { withBasePath } from "@/lib/basePath";

export default function Footer() {
  const t = useTranslations("footer");

  // Nav columns configurations mapping to translation keys
  const servicesLinks = [
    { href: "/services/cybersecurity", label: t("services.cyber") },
    { href: "/services/cloud", label: t("services.cloud") },
    { href: "/services/grc", label: t("services.grc") },
    { href: "/services/ai", label: t("services.ai") },
    { href: "/services/business-continuity", label: t("services.bcm") },
    { href: "/services/digital-transformation", label: t("services.dt") },
  ];

  const companyLinks = [
    { href: "/about", label: t("company.about") },
    { href: "/careers", label: t("company.careers") },
    { href: "/partners", label: t("company.partners") },
    { href: "/case-studies", label: t("company.caseStudies") },
    { href: "/insights", label: t("company.insights") },
  ];

  const legalLinks = [
    { href: "/privacy", label: t("legal.privacy") },
    { href: "/terms", label: t("legal.terms") },
    { href: "/privacy#cookies", label: t("legal.cookies") },
  ];

  // SVG representation of a Penguin filled with ASCII/matrix code characters
  const MatrixPenguin = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <defs>
        {/* Red & Crimson Matrix Code Text Pattern */}
        <pattern id="matrixText" width="40" height="40" patternUnits="userSpaceOnUse">
          <text x="2" y="10" fill="#FF1A1A" fontSize="6" fontFamily="monospace" opacity="0.65">jux3z</text>
          <text x="18" y="10" fill="#C70039" fontSize="6" fontFamily="monospace" opacity="0.35">yZ</text>
          <text x="5" y="20" fill="#FF1A1A" fontSize="6" fontFamily="monospace" opacity="0.45">0DM</text>
          <text x="22" y="20" fill="#7A0018" fontSize="6" fontFamily="monospace" opacity="0.25">vj</text>
          <text x="2" y="30" fill="#FF1A1A" fontSize="6" fontFamily="monospace" opacity="0.55">wQ</text>
          <text x="18" y="30" fill="#C70039" fontSize="6" fontFamily="monospace" opacity="0.3">v5</text>
          <text x="10" y="38" fill="#FF1A1A" fontSize="6" fontFamily="monospace" opacity="0.5">Z{ }Q</text>
        </pattern>
        {/* Mask shape to cut the pattern into a Penguin silhouette */}
        <clipPath id="penguinClip">
          {/* Main Body & Head */}
          <path d="M60,15 C45,15 35,28 35,42 C35,45 25,48 20,50 C25,54 35,56 37,56 C40,78 20,118 25,138 C28,146 38,154 60,154 C82,154 92,146 95,138 C100,118 80,78 83,56 C85,56 95,54 100,50 C95,48 85,45 85,42 C85,28 75,15 60,15 Z" />
          {/* Left Flipper */}
          <path d="M30,70 C22,82 12,102 15,117 C20,117 28,107 33,92 Z" />
          {/* Right Flipper */}
          <path d="M90,70 C98,82 108,102 105,117 C100,117 92,107 87,92 Z" />
          {/* Feet */}
          <path d="M38,152 C30,156 26,160 32,160 C40,160 45,156 48,152 Z" />
          <path d="M82,152 C90,156 94,160 88,160 C80,160 75,156 72,152 Z" />
        </clipPath>
      </defs>
      {/* Penguin silhouette filled with ASCII characters */}
      <rect
        width="120"
        height="160"
        fill="url(#matrixText)"
        clipPath="url(#penguinClip)"
      />
    </svg>
  );

  return (
    <footer className="relative w-full overflow-hidden mt-0 z-10">
      {/* Full-width container with premium stone background, and standard clean top border */}
      <div
        className="relative w-full bg-[#050505] overflow-hidden border-t border-white/5 shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.99)), url(${withBasePath("/assets/stone-texture.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dense Cyberpunk Dotted Grid Matrix Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 26, 26, 0.025) 1.2px, transparent 1.2px)`,
            backgroundSize: "8px 8px",
          }}
        />

        {/* Futuristic Background Glows & Penguins */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Left Side Matrix Penguin (facing right) */}
          <MatrixPenguin className="absolute left-6 bottom-4 w-24 h-32 opacity-20" />

          {/* Right Side Matrix Penguin (facing left) */}
          <MatrixPenguin className="absolute right-6 bottom-4 w-24 h-32 opacity-20" flip />
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 px-8 py-10 md:py-12">

          {/* Left Column: Brand Description & Contact Info */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 z-20">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
                <img
                  src={withBasePath("/assets/logoUP.webp")}
                  alt="Samurai Systems Logo"
                  className="h-11 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,26,26,0.3)] transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-[13px] text-slate-300 leading-relaxed max-w-sm">
                {t("brand.description")}
              </p>
            </div>

            {/* Contact Details with Glowing Red Icons */}
            <div className="space-y-3.5">
              <a
                href={`mailto:${t("brand.email")}`}
                className="flex items-center gap-3.5 group text-[13px] text-slate-300 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-7.5 h-7.5 rounded-lg bg-[#FF1A1A]/5 border border-[#FF1A1A]/20 shadow-[0_0_8px_rgba(255,26,26,0.05)] transition-all duration-300 group-hover:border-[#FF1A1A]/50 group-hover:shadow-[0_0_12px_rgba(255,26,26,0.3)]">
                  <Mail className="w-3.5 h-3.5 text-[#FF1A1A] drop-shadow-[0_0_3px_#FF1A1A]" />
                </div>
                <span className="font-medium tracking-wide text-xs transition-colors duration-200">{t("brand.email")}</span>
              </a>
              <a
                href={`tel:${t("brand.phone")}`}
                className="flex items-center gap-3.5 group text-[13px] text-slate-300 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-7.5 h-7.5 rounded-lg bg-[#FF1A1A]/5 border border-[#FF1A1A]/20 shadow-[0_0_8px_rgba(255,26,26,0.05)] transition-all duration-300 group-hover:border-[#FF1A1A]/50 group-hover:shadow-[0_0_12px_rgba(255,26,26,0.3)]">
                  <Phone className="w-3.5 h-3.5 text-[#FF1A1A] drop-shadow-[0_0_3px_#FF1A1A]" />
                </div>
                <span className="font-medium tracking-wide text-xs transition-colors duration-200">{t("brand.phone")}</span>
              </a>
            </div>

            <p className="text-[12px] text-slate-500 font-medium border-t border-white/5 pt-4">
              {t("brand.affiliate")}
            </p>
          </div>

          {/* Right Section: Navigation Links in one sequence with vertical dividers */}
          <div className="lg:col-span-8 grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-2 items-start relative z-20">
            {/* Services Column */}
            <div className="flex flex-col col-span-1">
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase !text-white mb-4 relative" style={{ color: '#ffffff' }}>
                {t("services.title")}
                <span className="absolute bottom-[-6px] left-0 w-6 h-[1.5px] bg-[#FF1A1A] shadow-[0_0_5px_#FF1A1A]" />
              </h4>
              <ul className="space-y-2">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className="text-[12px] text-slate-300 hover:text-white transition-all duration-200 pb-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider 1 with diamond marker */}
            <div className="hidden sm:flex flex-col items-center justify-self-center h-full py-1 pointer-events-none col-span-1">
              <div className="w-[1px] flex-grow bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#FF1A1A] border border-white/20 shadow-[0_0_8px_#FF1A1A] my-3" />
              <div className="w-[1px] flex-grow bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
            </div>

            {/* Company Column */}
            <div className="flex flex-col col-span-1">
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase !text-white mb-4 relative" style={{ color: '#ffffff' }}>
                {t("company.title")}
                <span className="absolute bottom-[-6px] left-0 w-6 h-[1.5px] bg-[#FF1A1A] shadow-[0_0_5px_#FF1A1A]" />
              </h4>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className="text-[12px] text-slate-300 hover:text-white transition-all duration-200 pb-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider 2 with diamond marker */}
            <div className="hidden sm:flex flex-col items-center justify-self-center h-full py-1 pointer-events-none col-span-1">
              <div className="w-[1px] flex-grow bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#FF1A1A] border border-white/20 shadow-[0_0_8px_#FF1A1A] my-3" />
              <div className="w-[1px] flex-grow bg-gradient-to-b from-white/0 via-white/10 to-white/0" />
            </div>

            {/* Legal Column */}
            <div className="flex flex-col col-span-1">
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase !text-white mb-4 relative" style={{ color: '#ffffff' }}>
                {t("legal.title")}
                <span className="absolute bottom-[-6px] left-0 w-6 h-[1.5px] bg-[#FF1A1A] shadow-[0_0_5px_#FF1A1A]" />
              </h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className="text-[12px] text-slate-300 hover:text-white transition-all duration-200 pb-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                    className="text-[12px] text-slate-300 hover:text-white transition-all duration-200 pb-0.5 inline-block cursor-pointer bg-transparent border-none text-left p-0"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright/Social Connections */}
        <div className="relative z-20 max-w-7xl mx-auto px-8 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Copyright Text */}
            <p className="text-[11px] text-slate-300 font-medium">
              {t("bottom.copyright")}
            </p>

            {/* Right Side links */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-[12px] text-slate-300 hover:text-white transition-all duration-200"
              >
                {t("bottom.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-[12px] text-slate-300 hover:text-white transition-all duration-200"
              >
                {t("bottom.terms")}
              </Link>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-slate-300 hover:text-white transition-all duration-200"
              >
                {t("bottom.linkedin")}
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
