"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb } from "../components/ui";
import WorkSection from "../components/work/WorkSection";

export default function IndustriesPage() {
  const t = useTranslations("industries");

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-black">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: t("breadcrumb") },
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {/* Section Label */}
          <div className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase mb-4">
            {t("label")}
          </div>

          {/* Page Top Heading with Two Font Families and Colors */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {t("title")}
            <span className="text-red-500 font-light italic">{t("titleAccent")}</span>
          </h1>

          {/* Section Description with Premium Font Size */}
          <p className="mt-4 text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* GSAP Animated Section */}
        <div className="border-t border-white/5">
          <WorkSection title={t("label")} />
        </div>
      </div>
      <Footer />
    </>
  );
}
