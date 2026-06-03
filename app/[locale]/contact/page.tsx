"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, Section, SectionLabel, SectionTitle, Button } from "../components/ui";
import { MapPin, Mail, Phone, Globe as GlobeIcon } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");

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
          <SectionTitle>
            {t("title")}
            <span className="text-text-main">{t("titleAccent")}</span>
          </SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Contact Form */}
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
                    {t("form.fields.phone.label")}
                  </label>
                  <input
                    type="tel"
                    placeholder={t("form.fields.phone.placeholder")}
                    className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.service.label")}
                  </label>
                  <select className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors">
                    {t.raw("form.fields.service.options").map((option: string, index: number) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    {t("form.fields.inquiry.label")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t("form.fields.inquiry.placeholder")}
                    className="w-full bg-background-secondary border border-card-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors resize-y"
                  />
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

            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <h3 className="text-base font-bold text-text-main mb-6">
                  {t("info.title")}
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-text-main mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {t("info.headquarters.label")}
                      </h4>
                      <p className="text-sm text-text-secondary whitespace-pre-line">
                        {t("info.headquarters.address")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-text-main mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {t("info.email.label")}
                      </h4>
                      <p className="text-sm text-text-secondary">{t("info.email.value")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-text-main mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {t("info.phone.label")}
                      </h4>
                      <p className="text-sm text-text-secondary">{t("info.phone.value")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <GlobeIcon className="w-5 h-5 text-text-main mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {t("info.website.label")}
                      </h4>
                      <p className="text-sm text-text-secondary">{t("info.website.value")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-wider uppercase text-text-secondary mb-4">
                  {t("info.offices.title")}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-text-main text-xs">◆</span>
                    {t("info.offices.dubai")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-text-main text-xs">◆</span>
                    {t("info.offices.karachi")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-text-main text-xs">◆</span>
                    {t("info.offices.calgary")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-text-main text-xs">◆</span>
                    {t("info.offices.melbourne")}
                  </div>
                </div>
              </div>

              <div className="bg-card-bg border border-card-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  {t("info.affiliate.title")}
                </h4>
                <p className="text-xs text-text-secondary">
                  {t("info.affiliate.description")}
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
