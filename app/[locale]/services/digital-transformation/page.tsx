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
import { Building, Bot, Code, LineChart } from "lucide-react";
import { AnimatedHeading } from "../../components/animations/textBehavior";
import ScrollReveal from "../../components/animations/ScrollReveal";

export default function DigitalTransformationPage() {
  const t = useTranslations("services.dt");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    { icon: Building, key: "modernization" },
    { icon: Bot, key: "rpa" },
    { icon: Code, key: "custom" },
    { icon: LineChart, key: "analytics" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16">

        <Section>
          <SectionLabel>{t("label")}</SectionLabel>
          <AnimatedHeading
            titleText={t("title")}
            accentText={t("titleAccent")}
            className="mb-4"
            Component={SectionTitle}
          />
          <ScrollReveal delay={0.5}>

            <SectionDescription>{t("description")}</SectionDescription>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {items.map((item) => (
              <ScrollReveal delay={0.5}>
                <Card key={item.key} hover>
                  <item.icon className="w-9 h-9 text-text-main mb-4" />
                  <CardTitle>{t(`items.${item.key}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`items.${item.key}.description`)}
                  </CardDescription>
                </Card>
              </ScrollReveal>
            ))}
          </div>

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
        defaultService="Digital Transformation"
      />
    </>
  );
}
