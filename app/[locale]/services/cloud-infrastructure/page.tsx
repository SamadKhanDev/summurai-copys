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
  Tag,
  Button,
} from "../../components/ui";
import { Cloud, ShieldCheck, Network, Settings2 } from "lucide-react";
import { AnimatedHeading } from "../../components/animations/textBehavior";

export default function CloudInfrastructurePage() {
  const t = useTranslations("services.infrastructure");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    { icon: Cloud, key: "multicloud" },
    { icon: ShieldCheck, key: "cspm" },
    { icon: Network, key: "ot" },
    { icon: Settings2, key: "operations" },
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {items.map((item) => (
              <Card key={item.key} hover>
                <item.icon className="w-9 h-9 text-text-main mb-4" />
                <CardTitle>{t(`items.${item.key}.title`)}</CardTitle>
                <CardDescription>
                  {t(`items.${item.key}.description`)}
                </CardDescription>
                {item.key === "multicloud" && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Azure", "AWS", "SITE Cloud", "Oracle OCI"].map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                )}
                {item.key === "cspm" && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["CSPM", "Zero Trust", "Posture Management"].map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                )}
                {item.key === "ot" && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["OT/ICS", "SCADA", "NCA OT"].map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="fill" size="lg" onClick={() => setIsModalOpen(true)}>
              {t("cta")}
            </Button>
          </div>
        </Section>
      </div>
      <Footer />

      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="Cloud & Infrastructure"
      />
    </>
  );
}