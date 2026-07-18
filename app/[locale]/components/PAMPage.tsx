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
import { useState } from "react";
import ChatWizardModal from "./ChatWizardModal";
import { AnimatedHeading } from "./animations/textBehavior";
import ScrollReveal from "./animations/ScrollReveal";

export default function PAMPage() {
  const t = useTranslations("solutions.pam");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const items = [
    { icon: Lock, key: "integration" },
    { icon: Factory, key: "coverage" },
    { icon: Eye, key: "insider" },
    { icon: Rocket, key: "deployment" },
  ];

  return (
    <>
      <Section>
        <SectionLabel>{t("label")}</SectionLabel>
        <AnimatedHeading
          titleText={t("title")}
          accentText={t("titleAccent")}
          className="mb-4"
          Component={SectionTitle}
        />

        <ScrollReveal animation="blur" delay={0.1}>
          <SectionDescription>{t("description")}</SectionDescription>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {items.map((item, index) => (
            <ScrollReveal
              key={item.key}
              delay={0.2 + index * 0.1}
              animation="fadeUp"
              distance={40}
            >
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

        <ScrollReveal delay={0.6}>
          <div className="mt-12 text-center">
            <Button variant="fill" size="lg" onClick={() => setIsModalOpen(true)}>

              {t("cta")}
            </Button>
          </div>
        </ScrollReveal>
      </Section>
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="Cloud & Infrastructure"
      />
    </>
  );
}
