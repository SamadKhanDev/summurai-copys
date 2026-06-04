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
import { Brain, BarChart3, MessageSquare, Eye, Zap, Server } from "lucide-react";
import { AnimatedHeading } from "../../components/animations/textBehavior";

export default function AIPage() {
  const t = useTranslations("services.ai");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <AnimatedHeading
            titleText={t("title")}
            accentText={t("titleAccent")}
            className="mb-4"
            Component={SectionTitle}
          />
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
            {/* Click karne par modal open hoga with default reference context */}
            <Button variant="fill" size="lg" onClick={() => setIsModalOpen(true)}>
              {t("cta")}
            </Button>
          </div>
        </Section>
      </div>
      <Footer />

      {/* Chatbot Modal Setup */}
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="AI & Automation" // Passing current context reference directly
      />
    </>
  );
}