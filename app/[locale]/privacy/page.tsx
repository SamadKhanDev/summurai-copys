"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, Section, SectionLabel, SectionTitle } from "../components/ui";
import { AnimatedHeading } from "../components/animations/textBehavior";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = t.raw("sections") as Array<{
    key: string;
    number: string;
    title: string;
    content: string;
    items?: string[];
    contactEmail?: string;
    contactAddress?: string;
  }>;

  return (
    <>
      <Navbar />
      <div className="pt-16">

        <Section>
          <SectionLabel>{t("meta.label")}</SectionLabel>
          <AnimatedHeading
            titleText={t("meta.title")}
            accentText={t("meta.titleAccent")}
            className="mb-4"
            Component={SectionTitle}
          />
          <p className="text-sm text-text-secondary mb-4">{t("meta.lastUpdated")}</p>

          {/* Intro block */}
          <div className="max-w-4xl mb-12 p-6 rounded-xl border border-card-border bg-card-bg">
            <p className="text-text-secondary leading-relaxed text-sm">
              {t("meta.intro")}
            </p>
            <p className="text-text-secondary leading-relaxed text-sm mt-3 opacity-70">
              {t("meta.appliesTo")}
            </p>
          </div>

          {/* Sections */}
          <div className="max-w-4xl space-y-0 divide-y divide-card-border border border-card-border rounded-xl overflow-hidden">
            {sections.map((section, index) => (
              <div
                key={section.key}
                className="group flex gap-6 p-6 md:p-8 bg-card-bg hover:bg-accent/5 transition-colors duration-200"
              >
                {/* Number accent */}
                <span className="text-3xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors duration-200 leading-none select-none hidden sm:block shrink-0 pt-1 font-mono">
                  {section.number}
                </span>

                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white mb-3 tracking-wide">
                    {section.title}
                  </h2>

                  <p className="text-text-secondary leading-relaxed text-sm">
                    {section.content}
                  </p>

                  {/* Bullet list */}
                  {section.items && section.items.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Contact block */}
                  {section.contactEmail && (
                    <div className="mt-4 flex flex-col gap-1">
                      <a
                        href={`mailto:${section.contactEmail}`}
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        {section.contactEmail}
                      </a>
                      {section.contactAddress && (
                        <p className="text-xs text-text-secondary opacity-70">
                          {section.contactAddress}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-xs text-text-secondary opacity-50 mt-8 max-w-4xl">
            Your continued use of this website constitutes your acceptance of any updates to this Privacy Policy.
          </p>
        </Section>
      </div>
      <Footer />
    </>
  );
}