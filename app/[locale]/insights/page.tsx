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
} from "../components/ui";
import { BookOpen } from "lucide-react";
import { AnimatedHeading } from "../components/animations/textBehavior";

export default function InsightsPage() {
  const t = useTranslations("insights");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "regulatory", "threat", "ai", "bcm", "whitepapers"];
  const articles = t.raw("articles") as Array<{
    tag: string;
    title: string;
    description: string;
    link: string;
  }>;

  return (
    <>
      <Navbar />
      <div className="pt-16">

        <Section>
          <SectionLabel>{t("label")}</SectionLabel>
          <AnimatedHeading
            titleText={t("title")}
            accentText={t("titleAccent")}
            className="mb-4"
            Component={SectionTitle}
          />
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-card-bg border border-card-border rounded-xl p-7 hover:border-accent/40 transition-all"
              >
                <div className="text-xs font-bold tracking-[0.12em] text-text-main uppercase mb-3">
                  {article.tag}
                </div>
                <h3 className="text-base font-bold text-white mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary mb-5">{article.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-text-main hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {article.link}
                </a>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 bg-card-bg border border-card-border rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-lg font-bold mb-2">
                {t("newsletter.title")}
              </h3>
              <p className="text-sm text-text-secondary">
                {t("newsletter.description")}
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors w-64"
              />
              <button className="bg-gradient-accent text-white px-6 py-3 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-accent/20 transition-all whitespace-nowrap">
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
