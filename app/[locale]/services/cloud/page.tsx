"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChatWizardModal from "../../components/ChatWizardModal";
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
import { Cloud, Building2, Wrench, BarChart3 } from "lucide-react";
import { AnimatedHeading } from "../../components/animations/textBehavior";
import ScrollReveal from "../../components/animations/ScrollReveal";

export default function CloudPage() {
  const t = useTranslations("services.cloud");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    { icon: Cloud, key: "management" },
    { icon: Building2, key: "outsourcing" },
    { icon: Wrench, key: "patch" },
    { icon: BarChart3, key: "optimization" },
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
          <AnimatedHeading
            titleText={t("title")}
            accentText={t("titleAccent")}
            className="mb-4"
            Component={SectionTitle}
          />
          <ScrollReveal delay={0.5} >
            <SectionDescription>{t("description")}</SectionDescription>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.5} >
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
          </ScrollReveal>

          <ScrollReveal delay={0.5}>

            <div className="mt-12 text-center">
              <Button variant="fill" size="lg" onClick={() => setIsModalOpen(true)}>
                {t("cta")}
              </Button>
            </div>
          </ScrollReveal>
        </Section>
      </div>
      <Footer />

      {/* Chatbot Modal Setup */}
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="Cloud & IT Operations"
      />
    </>
  );
}
