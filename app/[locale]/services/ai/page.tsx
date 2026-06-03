"use client";

import { useTranslations } from "next-intl";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
} from "../../components/ui";
import { Brain, BarChart3, MessageSquare, Eye, Zap, Server } from "lucide-react";

export default function AIPage() {
  const t = useTranslations("services.ai");

  const items = [
    { icon: Brain, key: "strategy" },
    { icon: BarChart3, key: "analytics" },
    { icon: MessageSquare, key: "conversational" },
    { icon: Eye, key: "vision" },
    { icon: Zap, key: "agents" },
    { icon: Server, key: "infrastructure" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
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
            <Button variant="fill" size="lg" asLink href="/contact">
              {t("cta")}
            </Button>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
