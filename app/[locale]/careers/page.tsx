"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Breadcrumb,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  Card,
  Button,
} from "../components/ui";
import { Globe, Rocket, TrendingUp } from "lucide-react";

export default function CareersPage() {
  const t = useTranslations("careers");

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

          {/* No Openings Notice */}
          <div className="bg-card-bg border border-card-border rounded-xl p-10 text-center mt-12 mb-12">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-white text-lg font-bold mb-3">
              {t("noOpenings.title")}
            </h3>
            <p className="text-sm text-text-secondary mb-6 max-w-2xl mx-auto">
              {t("noOpenings.description")}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <Globe className="w-9 h-9 text-text-main mb-4" />
              <h3 className="text-base font-bold text-white mb-3">
                {t("benefits.offices.title")}
              </h3>
              <p className="text-sm text-text-secondary">
                {t("benefits.offices.description")}
              </p>
            </Card>

            <Card>
              <Rocket className="w-9 h-9 text-text-main mb-4" />
              <h3 className="text-base font-bold text-white mb-3">
                {t("benefits.work.title")}
              </h3>
              <p className="text-sm text-text-secondary">
                {t("benefits.work.description")}
              </p>
            </Card>

            <Card>
              <TrendingUp className="w-9 h-9 text-text-main mb-4" />
              <h3 className="text-base font-bold text-white mb-3">
                {t("benefits.growth.title")}
              </h3>
              <p className="text-sm text-text-secondary">
                {t("benefits.growth.description")}
              </p>
            </Card>
          </div>

          {/* CV Submission Form */}
          <div className="bg-card-bg border border-card-border rounded-xl p-8 max-w-2xl">
            <h2 className="text-white text-xl font-bold mb-6">
              {t("form.title")}
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  {t("form.fields.name.label")}
                </label>
                <input
                  type="text"
                  placeholder={t("form.fields.name.placeholder")}
                  className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  {t("form.fields.email.label")}
                </label>
                <input
                  type="email"
                  placeholder={t("form.fields.email.placeholder")}
                  className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  {t("form.fields.role.label")}
                </label>
                <input
                  type="text"
                  placeholder={t("form.fields.role.placeholder")}
                  className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  {t("form.fields.cv.label")}
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-accent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-hover file:cursor-pointer"
                />
              </div>

              <Button
                variant="fill"
                className="w-full justify-center"
                onClick={() => alert(t("form.success"))}
              >
                {t("form.submit")}
              </Button>
            </form>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
