"use client";

import { useTranslations } from "next-intl";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Breadcrumb,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  Card,
  CardTitle,
  CardDescription,
  Button,
} from "./ui";
import { Lock, Factory, Eye, Rocket } from "lucide-react";

export default function PAMPage() {
  const t = useTranslations("solutions.pam");

  const items = [
    { icon: Lock, key: "integration" },
    { icon: Factory, key: "coverage" },
    { icon: Eye, key: "insider" },
    { icon: Rocket, key: "deployment" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Section>
          <SectionLabel>{t("label")}</SectionLabel>
          <SectionTitle className="mb-4">
            {t("title")}
            <span className="text-text-main">{t("titleAccent")}</span>
          </SectionTitle>
          <SectionDescription>{t("description")}</SectionDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {items.map((item) => (
              <Card key={item.key} hover>
                <item.icon className="w-9 h-9 text-text-main mb-4" />
                <CardTitle>{t(`items.${item.key}.title`)}</CardTitle>
                <CardDescription>
                  {t(`items.${item.key}.description`)}
                </CardDescription>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="fill" size="lg" asLink href="/assessment">
              {t("cta")}
            </Button>
          </div>
        </Section>
      </div>
    </>
  );
}
