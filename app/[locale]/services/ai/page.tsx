"use client";
// Force recompile

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
import { Lightbulb, FileCheck, Award, Laptop, ShieldAlert, MonitorPlay } from "lucide-react";
import { AnimatedHeading } from "../../components/animations/textBehavior";
import ScrollReveal from "../../components/animations/ScrollReveal";

export default function AIPage() {
  const t = useTranslations("services.ai");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    { icon: Lightbulb, key: "techAwareness" },
    { icon: FileCheck, key: "isoTraining" },
    { icon: Award, key: "certifications" },
    { icon: Laptop, key: "lms1" },
    { icon: ShieldAlert, key: "securityAwareness" },
    { icon: MonitorPlay, key: "lms2" },
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {items.map((item) => (
              <ScrollReveal key={item.key} delay={0.5}>
                <Card hover>
                  <item.icon className="w-9 h-9 text-text-main mb-4" />
                  <CardTitle>{t(`items.${item.key}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`items.${item.key}.description`)}
                  </CardDescription>
                </Card >
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>

            <div className="mt-12 text-center">
              {/* Click karne par modal open hoga with default reference context */}
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
        defaultService="Training & Awareness" // Passing current context reference directly
      />
    </>
  );
}