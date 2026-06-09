"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Breadcrumb,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  CalloutBanner,
} from "../components/ui";
import { AnimatedHeading } from "../components/animations/textBehavior";
import ScrollReveal from "../components/animations/ScrollReveal";

export default function PartnersPage() {
  const t = useTranslations("partners");

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
          <AnimatedHeading
            titleText={t("title")}
            accentText={t("titleAccent")}
            className="mb-4"
            Component={SectionTitle}
          />
          <ScrollReveal delay={0.5}>
            <SectionDescription>{t("description")}</SectionDescription>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
              {(t.raw("list") as Array<{ name: string; description: string; logo?: string }>).map((partner, index) => (
                <div
                  key={index}
                  className="bg-card-bg border border-card-border rounded-xl p-5 text-center hover:border-accent/40 transition-all flex flex-col items-center"
                >
                  {partner.logo && (
                    <div className="w-16 h-12 mb-3 relative flex items-center justify-center">
                      <Image
                        src={`/v0/assets/logos/${partner.logo}`}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  {/* <div className="text-sm font-bold text-white mb-2">
                  {partner.name}
                </div> */}
                  <p className="text-xs text-text-secondary">{partner.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <div className="mt-12">
              <CalloutBanner
                title={t("callout.title")}
                description={t("callout.description")}
                ctaText={t("callout.cta")}
                onCtaClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
              />
            </div>
          </ScrollReveal>
        </Section>
      </div>
      <Footer />
    </>
  );
}