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
} from "../components/ui";
import { Scale, KeyRound, Lock, Shield, Cloud, RefreshCw } from "lucide-react";

export default function SolutionsPage() {
  const t = useTranslations("solutions");

  const solutions = [
    { icon: Scale, key: "grc", href: "/services/grc" },
    { icon: KeyRound, key: "iam", href: "/services/cybersecurity" },
    { icon: Lock, key: "pam", href: "/solutions/pam", highlighted: true },
    { icon: Shield, key: "securityOps", href: "/services/cybersecurity" },
    { icon: Cloud, key: "cloudModernization", href: "/services/cloud" },
    { icon: RefreshCw, key: "businessResilience", href: "/services/business-continuity" },
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
          <SectionLabel>{t("label")}</SectionLabel>
          <SectionTitle className="mb-4">
            {t("title")}
            <span className="text-text-main">{t("titleAccent")}</span>
          </SectionTitle>
          <SectionDescription>{t("description")}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {solutions.map((solution) => (
              <Card
                key={solution.key}
                hover
                highlighted={solution.highlighted}
              >
                <solution.icon className="w-9 h-9 text-text-main mb-4" />
                <CardTitle>{t(`items.${solution.key}.title`)}</CardTitle>
                <CardDescription>
                  {t(`items.${solution.key}.description`)}
                </CardDescription>
                <CardLink href={solution.href}>
                  {t(`items.${solution.key}.link`)}
                </CardLink>
              </Card>
            ))}
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
