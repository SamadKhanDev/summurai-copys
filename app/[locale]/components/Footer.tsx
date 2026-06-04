"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-background-secondary border-t border-card-border pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="font-extrabold text-base tracking-[0.18em] text-white mb-4">
              {t("brand.name")}
              <span className="text-text-main">{t("brand.dot")}</span>
              {t("brand.suffix")}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-4">
              {t("brand.description")}
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${t("brand.email")}`}
                className="flex items-center gap-2 text-sm text-text-main hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t("brand.email")}
              </a>
              <a
                href={`tel:${t("brand.phone")}`}
                className="flex items-center gap-2 text-sm text-text-main hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t("brand.phone")}
              </a>
            </div>
            <p className="text-xs text-text-secondary mt-4">{t("brand.affiliate")}</p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-text-main mb-4">
              {t("services.title")}
            </h4>
            <div className="space-y-2">
              <Link
                href="/services/cybersecurity"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.cyber")}
              </Link>
              <Link
                href="/services/cloud"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.cloud")}
              </Link>
              <Link
                href="/services/grc"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.grc")}
              </Link>
              <Link
                href="/services/ai"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.ai")}
              </Link>
              <Link
                href="/services/business-continuity"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.bcm")}
              </Link>
              <Link
                href="/services/digital-transformation"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.dt")}
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-text-main mb-4">
              {t("company.title")}
            </h4>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.about")}
              </Link>
              <Link
                href="/careers"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.careers")}
              </Link>
              <Link
                href="/partners"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.partners")}
              </Link>
              <Link
                href="/case-studies"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.caseStudies")}
              </Link>
              <Link
                href="/insights"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.insights")}
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-text-main mb-4">
              {t("legal.title")}
            </h4>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("legal.privacy")}
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("legal.terms")}
              </Link>
              <Link
                href={"/privacy#cookies" as any}
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("legal.cookies")}
              </Link>
              <button
                onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                className="block text-sm text-text-secondary hover:text-text-main transition-colors cursor-pointer bg-transparent border-none text-left p-0"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">{t("bottom.copyright")}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-text-secondary hover:text-text-main transition-colors"
            >
              {t("bottom.privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-text-secondary hover:text-text-main transition-colors"
            >
              {t("bottom.terms")}
            </Link>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary hover:text-text-main transition-colors"
            >
              {t("bottom.linkedin")}
            </a>
            <span className="text-xs text-text-secondary">{t("bottom.languages")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
