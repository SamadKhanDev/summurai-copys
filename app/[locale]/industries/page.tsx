"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Breadcrumb,
  Section,
  Tag,
  Testimonial,
} from "../components/ui";
import { Building2, Landmark, Hospital, Zap, GraduationCap, Building } from "lucide-react";

export default function IndustriesPage() {
  const t = useTranslations("industries");

  const sectors = [
    { key: "financial", icon: Building2 },
    { key: "government", icon: Landmark },
    { key: "healthcare", icon: Hospital },
    { key: "energy", icon: Zap },
    { key: "education", icon: GraduationCap },
    { key: "enterprise", icon: Building },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: t("breadcrumb") },
          ]}
        />

        <Section>
          {/* Section Label */}
          <div className="text-xs font-bold tracking-[0.2em] text-text-main uppercase mb-4">
            {t("label")}
          </div>

          {/* Page Top Heading with Two Font Families and Colors */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {t("title")}
            <span className="text-text-main font-light italic">{t("titleAccent")}</span>
          </h1>

          {/* Section Description with Premium Font Size */}
          <p className="mt-4 text-text-secondary text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
            {t("description")}
          </p>

          {/* Sectors Grid/List */}
          <div className="space-y-8 mt-16">
            {sectors.map((sector) => (
              <div
                key={sector.key}
                id={sector.key}
                className="bg-card-bg border border-card-border rounded-2xl p-8 md:p-10 hover:border-accent/30 hover:bg-accent/[0.01] hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Icon Container */}
                  <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10 text-text-main flex-shrink-0">
                    <sector.icon className="w-7 h-7" />
                  </div>

                  {/* Content Container */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {t(`sectors.${sector.key}.title`)}
                    </h2>
                    <p className="text-base text-text-secondary mb-6 leading-relaxed">
                      {t(`sectors.${sector.key}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(t.raw(`sectors.${sector.key}.tags`) as string[]).map((tag: string, index: number) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </div>
                    {sector.key === "financial" && t.raw(`sectors.${sector.key}.testimonial`) && (
                      <div className="mt-8">
                        <Testimonial
                          quote={t(`sectors.financial.testimonial.quote`)}
                          author={t(`sectors.financial.testimonial.author`)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}

