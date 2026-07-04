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
import { Clock, Search, MapIcon } from "lucide-react";
import { AnimatedHeading } from "../components/animations/textBehavior";

export default function AssessmentPage() {
  const t = useTranslations("assessment");

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Info */}
            <div>
              <SectionLabel>{t("label")}</SectionLabel>
              <AnimatedHeading
                titleText={t("title")}
                accentText={t("titleAccent")}
                className="mb-4"
                Component={SectionTitle}
              />
              <SectionDescription className="mb-8">
                {t("description")}
              </SectionDescription>

              <div className="space-y-4">
                <Card className="p-5">
                  <div className="flex gap-4 items-start">
                    <Clock className="w-6 h-6 text-text-main flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        {t("benefits.time.title")}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {t("benefits.time.description")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex gap-4 items-start">
                    <Search className="w-6 h-6 text-text-main flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        {t("benefits.assessment.title")}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {t("benefits.assessment.description")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex gap-4 items-start">
                    <MapIcon className="w-6 h-6 text-text-main flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        {t("benefits.roadmap.title")}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {t("benefits.roadmap.description")}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-card-bg border border-card-border rounded-xl p-8">
              <h2 className="text-white text-xl font-bold mb-6">
                {t("form.title")}
              </h2>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.fullName.label")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("form.fields.fullName.placeholder")}
                    className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.organization.label")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("form.fields.organization.placeholder")}
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
                    {t("form.fields.companySize.label")}
                  </label>
                  <select className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors">
                    {t.raw("form.fields.companySize.options").map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.posture.label")}
                  </label>
                  <select className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors">
                    {t.raw("form.fields.posture.options").map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.concern.label")}
                  </label>
                  <select className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors">
                    {t.raw("form.fields.concern.options").map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.contact.label")}
                  </label>
                  <select className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors">
                    {t.raw("form.fields.contact.options").map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="fill"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => alert(t("form.success"))}
                >
                  {t("form.submit")}
                </Button>
              </form>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
