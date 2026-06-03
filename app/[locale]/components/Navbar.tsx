"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { Globe, ChevronDown } from "lucide-react";
import ChatWizardModal from "./ChatWizardModal";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-contact-modal", handleOpenModal);
    };
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  const dropdownBase =
    "absolute top-full left-0 mt-2 w-56 bg-background-tertiary border border-card-border rounded-xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50";

  const dropdownLink =
    "block px-4 py-2 text-[13px] text-text-secondary hover:text-text-main hover:bg-accent/5 transition-colors rounded-md mx-1";

  const dropdownAllLink =
    "block px-4 py-2 text-[11px] font-semibold tracking-wider uppercase text-accent hover:bg-accent/5 transition-colors rounded-md mx-1";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/10"
          : "bg-background/85 backdrop-blur-md border-b border-border/5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 mr-6 flex items-center"
          >
            <img
              src={`${basePath}/assests/logoUP.webp`}
              alt="Samurai Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-end items-center flex-1 gap-0.5">
            <Link
              href="/"
              className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors"
            >
              {t("links.home")}
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors">
                {t("links.services")}
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={dropdownBase}>
                <Link href="/services" className={dropdownAllLink}>{t("dropdowns.services.all")}</Link>
                <div className="h-px bg-border/10 mx-3 my-1" />
                <Link href="/services/cybersecurity" className={dropdownLink}>{t("dropdowns.services.cyber")}</Link>
                <Link href="/services/cloud" className={dropdownLink}>{t("dropdowns.services.cloud")}</Link>
                <Link href="/services/grc" className={dropdownLink}>{t("dropdowns.services.grc")}</Link>
                <Link href="/services/digital-transformation" className={dropdownLink}>{t("dropdowns.services.dt")}</Link>
                <Link href="/services/business-continuity" className={dropdownLink}>{t("dropdowns.services.bcm")}</Link>
                <Link href="/services/ai" className={dropdownLink}>{t("dropdowns.services.ai")}</Link>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors">
                {t("links.solutions")}
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={dropdownBase}>
                <Link href="/solutions" className={dropdownAllLink}>{t("dropdowns.solutions.all")}</Link>
                <div className="h-px bg-border/10 mx-3 my-1" />
                <Link href="/solutions/pam" className={dropdownLink}>{t("dropdowns.solutions.pam")}</Link>
                <Link href="/solutions/grc" className={dropdownLink}>{t("dropdowns.solutions.grc")}</Link>
                <Link href="/solutions/iam" className={dropdownLink}>{t("dropdowns.solutions.iam")}</Link>
              </div>
            </div>

            {/* Industries Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors">
                {t("links.industries")}
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={dropdownBase}>
                <Link href="/industries" className={dropdownAllLink}>{t("dropdowns.industries.all")}</Link>
                <div className="h-px bg-border/10 mx-3 my-1" />
                <Link href={"/industries#financial" as any} className={dropdownLink}>{t("dropdowns.industries.financial")}</Link>
                <Link href={"/industries#government" as any} className={dropdownLink}>{t("dropdowns.industries.government")}</Link>
                <Link href={"/industries#healthcare" as any} className={dropdownLink}>{t("dropdowns.industries.healthcare")}</Link>
                <Link href={"/industries#energy" as any} className={dropdownLink}>{t("dropdowns.industries.energy")}</Link>
              </div>
            </div>

            <Link
              href="/about"
              className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors"
            >
              {t("links.about")}
            </Link>

            <Link href="/partners" className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors">{t("links.partners")}</Link>
            <Link href="/insights" className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors">{t("links.insights")}</Link>
          </div>

          {/* CTAs + Language Toggle */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-[15px] h-[15px]" />
              <span className="uppercase">{locale === "en" ? "EN" : "AR"}</span>
            </button>
            <div className="w-px h-5 bg-border/20 mx-1" />
            {/* <a
            href="/assessment"
            className="inline-flex items-center px-5 py-2.5 bg-gradient-accent text-white text-[11px] font-bold tracking-wider uppercase rounded-lg hover:opacity-90 hover:-translate-y-px transition-all"
          >
            {t("cta.assessment")}
          </a> */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-5 py-2.5 bg-transparent border-2 border-accent/60 hover:border-accent text-text-main text-[11px] font-bold tracking-wider uppercase rounded-lg hover:bg-accent/10 transition-all cursor-pointer"
            >
              {t("cta.contact")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border/10 px-6 py-5">
            <div className="flex flex-col gap-1">
              {[
                { href: "/", label: t("links.home") },
                { href: "/services", label: t("links.services") },
                { href: "/solutions", label: t("links.solutions") },
                { href: "/industries", label: t("links.industries") },
                { href: "/about", label: t("links.about") },
                { href: "/partners", label: t("links.partners") },
                { href: "/insights", label: t("links.insights") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border/10 my-2" />
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-text-secondary hover:text-text-main hover:bg-white/5 rounded-md transition-colors"
              >
                <Globe className="w-4 h-4" />
                {locale === "en" ? "العربية" : "English"}
              </button>
              <div className="flex gap-2 mt-2">
                <Link href="/assessment" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-gradient-accent text-white text-xs font-bold tracking-wider uppercase rounded-lg">
                  {t("cta.assessment")}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 text-center px-4 py-2.5 border-2 border-accent/60 text-text-main text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer bg-transparent"
                >
                  {t("cta.contact")}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="contact"
      />
    </>
  );
}