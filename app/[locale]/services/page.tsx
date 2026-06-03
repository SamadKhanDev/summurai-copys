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
import { Shield, Cloud, Scale, RefreshCw, Bot, Settings, Server } from "lucide-react";
import { Pathnames } from "@/i18n/routing";

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
    {
      icon: Server,
      key: "infrastructureService",
      href: "/services/cloud-infrastructure",
      tags: ["Azure", "AWS", "SITE Cloud", "Oracle OCI", "CSPM", "OT/ICS", "SCADA"],
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.key}
                className="hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <service.icon className="w-8 h-8 text-text-main flex-shrink-0" />
                    <CardTitle>
                      {t(`${service.key}.breadcrumb`)}
                    </CardTitle>
                  </div>

                  <CardDescription>
                    {t(`${service.key}.description`)}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 my-4">
                    {service.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <CardLink href={service.href as Pathnames}>Explore →</CardLink>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
