"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Globe } from "lucide-react";

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
              <a
                href="/services/cybersecurity"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.cyber")}
              </a>
              <a
                href="/services/cloud"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.cloud")}
              </a>
              <a
                href="/services/grc"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.grc")}
              </a>
              <a
                href="/services/ai"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.ai")}
              </a>
              <a
                href="/services/business-continuity"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.bcm")}
              </a>
              <a
                href="/services/digital-transformation"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("services.dt")}
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-text-main mb-4">
              {t("company.title")}
            </h4>
            <div className="space-y-2">
              <a
                href="/about"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.about")}
              </a>
              <a
                href="/careers"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.careers")}
              </a>
              <a
                href="/partners"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.partners")}
              </a>
              <a
                href="/case-studies"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.caseStudies")}
              </a>
              <a
                href="/insights"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("company.insights")}
              </a>
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-text-main mb-4">
              {t("legal.title")}
            </h4>
            <div className="space-y-2">
              <a
                href="/privacy"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("legal.privacy")}
              </a>
              <a
                href="/terms"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("legal.terms")}
              </a>
              <a
                href="/privacy#cookies"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                {t("legal.cookies")}
              </a>
              <a
                href="/contact"
                className="block text-sm text-text-secondary hover:text-text-main transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">{t("bottom.copyright")}</p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-xs text-text-secondary hover:text-text-main transition-colors"
            >
              {t("bottom.privacy")}
            </a>
            <a
              href="/terms"
              className="text-xs text-text-secondary hover:text-text-main transition-colors"
            >
              {t("bottom.terms")}
            </a>
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

      {/* WhatsApp Widget */}
      <a
        href={`https://wa.me/${t("brand.phone").replace(/\s/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label={t("whatsapp.title")}
      >
        <span className="text-2xl">💬</span>
      </a>
    </footer>
  );
}
