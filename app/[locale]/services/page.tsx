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
  CardTitle,
  CardDescription,
  CardLink,
  Tag,
} from "../components/ui";
import { Shield, Cloud, Scale, RefreshCw, Bot, Settings } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations("services");

  const services = [
    {
      icon: Shield,
      key: "cyber",
      href: "/services/cybersecurity",
      tags: ["SIEM/SOAR", "EDR/XDR", "NCA ECC", "MITRE ATT&CK", "Zero Trust", "VA/PT"],
    },
    {
      icon: Cloud,
      key: "cloud",
      href: "/services/cloud",
      tags: ["Azure", "AWS", "Oracle OCI", "ITSM", "Hybrid IT"],
    },
    {
      icon: Scale,
      key: "grc",
      href: "/services/grc",
      tags: ["NCA ECC", "PDPL", "ISO 27001", "vCISO", "NDMO"],
    },
    {
      icon: RefreshCw,
      key: "bcm",
      href: "/services/business-continuity",
      tags: ["SAMA BCM", "ISO 22301", "BIA", "DR", "RTO/RPO"],
    },
    {
      icon: Bot,
      key: "ai",
      href: "/services/ai",
      tags: ["LangChain", "AutoGPT", "NLP", "Computer Vision", "OCR"],
    },
    {
      icon: Settings,
      key: "dt",
      href: "/services/digital-transformation",
      tags: ["RPA", "Power BI", "Custom Dev", "Data Warehousing"],
    },
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

        <div className="bg-background-secondary py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>{t("hero.label")}</SectionLabel>
            <SectionTitle className="mb-4">
              {t("hero.title")}
              <span className="text-text-main">{t("hero.titleAccent")}</span>
            </SectionTitle>
            <SectionDescription>{t("hero.description")}</SectionDescription>
          </div>
        </div>

        <Section>
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.key}
                className="bg-card-bg border border-card-border rounded-xl p-8 hover:border-accent/40 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <service.icon className="w-8 h-8 text-text-main flex-shrink-0" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-3">
                      {t(`${service.key}.breadcrumb`)}
                    </h2>
                    <p className="text-sm text-text-secondary mb-4">
                      {t(`${service.key}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </div>
                    <CardLink href={service.href}>Explore →</CardLink>
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
