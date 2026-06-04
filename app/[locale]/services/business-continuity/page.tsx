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
  Button,
} from "../../components/ui";
import { AnimatedHeading } from "../../components/animations/textBehavior";

export default function BusinessContinuityPage() {
  const t = useTranslations("services.bcm");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = [
    {
      number: "01",
      title: "SAMA BCM Framework",
      description: "End-to-end delivery of SAMA's BCM regulatory requirements — covering governance structures, BIA, recovery strategies, and testing cycles.",
    },
    {
      number: "02",
      title: "ISO 22301 Certification Readiness",
      description: "Gap assessments, BCMS design, documentation, internal audits, and certification readiness aligned with ISO 22301 international standards.",
    },
    {
      number: "03",
      title: "Business Impact Analysis",
      description: "Identifying critical business functions, RTOs, RPOs, and single points of failure to build a risk-informed continuity strategy.",
    },
    {
      number: "04",
      title: "Technical Disaster Recovery",
      description: "Design and implementation of DR environments — active-passive, active-active — across on-premise, cloud, and hybrid infrastructure with automated failover.",
    },
    {
      number: "05",
      title: "DR Testing & Simulation",
      description: "Structured DR drills, tabletop exercises, and full failover tests validated against RTOs and RPOs with NCA-compliant reporting.",
    },
    {
      number: "06",
      title: "BCM Governance & Training",
      description: "BCM policy development, crisis management plans, staff awareness programs, and executive reporting dashboards.",
    },
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

          <div className="mt-12 space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex gap-6 py-6 ${index < steps.length - 1 ? "border-b border-card-border" : ""
                  }`}
              >
                <div className="text-5xl font-extrabold text-text-main/25 flex-shrink-0 w-20 text-center">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
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

      {/* Chatbot Modal Setup */}
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="Business Continuity"
      />
    </>
  );
}
