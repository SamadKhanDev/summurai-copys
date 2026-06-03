"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Breadcrumb,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  Badge,
  Testimonial,
} from "../components/ui";

export default function CaseStudiesPage() {
  const t = useTranslations("caseStudies");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "financial", "grc", "cybersecurity", "bcm", "ncaEcc"];

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
          <SectionLabel>{t("label")}</SectionLabel>
          <SectionTitle className="mb-4">
            {t("title")}
            <span className="text-text-main">{t("titleAccent")}</span>
          </SectionTitle>
          <SectionDescription>{t("description")}</SectionDescription>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-8 mb-12">
            {filters.map((filter) => (
              <Badge
                key={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {t(`filters.${filter}`)}
              </Badge>
            ))}
          </div>

          {/* Featured Case Study */}
          <div className="bg-card-bg border border-accent/50 rounded-xl p-8 mb-6">
            <div className="text-xs font-bold tracking-[0.14em] text-text-main uppercase mb-2">
              {t("featured.tag")}
            </div>
            <h2 className="text-xl font-bold text-white mb-6">
              {t("featured.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-text-main mb-2">
                  {t("featured.challenge.title")}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t("featured.challenge.description")}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-text-main mb-2">
                  {t("featured.solution.title")}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t("featured.solution.description")}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-text-main mb-2">
                  {t("featured.results.title")}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t("featured.results.description")}
                </p>
              </div>
            </div>

            <Testimonial
              quote={t("featured.testimonial.quote")}
              author={t("featured.testimonial.author")}
            />
          </div>

          {/* Other Case Studies */}
          <div className="space-y-6">
            {(t.raw("cases") as Array<{
              tag: string;
              title: string;
              challenge: string;
              solution: string;
              results: string;
            }>).map((caseStudy, index) => (
              <div
                key={index}
                className="bg-card-bg border border-card-border rounded-xl p-8 hover:border-accent/40 transition-all"
              >
                <div className="text-xs font-bold tracking-[0.14em] text-text-main uppercase mb-2">
                  {caseStudy.tag}
                </div>
                <h2 className="text-xl font-bold text-white mb-6">
                  {caseStudy.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase text-text-main mb-2">
                      Challenge
                    </h4>
                    <p className="text-sm text-text-secondary">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase text-text-main mb-2">
                      Solution
                    </h4>
                    <p className="text-sm text-text-secondary">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase text-text-main mb-2">
                      Results
                    </h4>
                    <p className="text-sm text-text-secondary">{caseStudy.results}</p>
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
