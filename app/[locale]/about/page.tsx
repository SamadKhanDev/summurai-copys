"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Breadcrumb,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  Card,
  CardTitle,
  CardDescription,
  Badge,
} from "../components/ui";
import { Target, Handshake, Shield, Globe as GlobeIcon } from "lucide-react";
import { AnimatedHeading } from "../components/animations/textBehavior";
import ScrollReveal from "../components/animations/ScrollReveal";

export default function AboutPage() {
  const t = useTranslations("about");

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

          {/* Mission Callout */}
          <ScrollReveal delay={0.5}>
            <div className="bg-gradient-to-br from-accent/8 to-accent/3 border border-accent/25 rounded-xl p-10 mt-10 text-left">
              <div className="text-xs font-bold tracking-[0.14em] text-text-main uppercase mb-3">
                {t("mission.label")}
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                {t("mission.title")}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {t("mission.description")}
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { key: "founded", icon: "2010" },
              { key: "countries", icon: "5" },
              { key: "clients", icon: "2,800+" },
              { key: "expertise", icon: "15+" },
            ].map((stat) => (
              <ScrollReveal key={stat.key} delay={0.5}>
                <Card className="text-center">
                  <div className="text-4xl font-extrabold text-text-main mb-2">
                    {t(`stats.${stat.key}.value`)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {t(`stats.${stat.key}.label`)}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Leadership Team */}
        <Section background="secondary">
          <SectionLabel>{t("leadership.label")}</SectionLabel>
          <SectionTitle className="mb-10">
            {t("leadership.title")}
            <span className="text-text-main">{t("leadership.titleAccent")}</span>
          </SectionTitle>
          <ScrollReveal delay={0.5}>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["ceo", "cto", "cso", "coo"].map((role) => (
                <Card key={role} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-accent flex items-center justify-center text-2xl font-extrabold text-white mx-auto mb-4">
                    {t(`leadership.team.${role}.avatar`)}
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {t(`leadership.team.${role}.title`)}
                  </h4>
                  <span className="text-xs text-text-main block mb-3">
                    {t(`leadership.team.${role}.location`)}
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {t(`leadership.team.${role}.description`)}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </Section>

        {/* Global Presence */}
        <Section id="global">
          <SectionLabel>{t("global.label")}</SectionLabel>
          <SectionTitle className="mb-8">
            {t("global.title")}
            <span className="text-text-main">{t("global.titleAccent")}</span>
          </SectionTitle>

          <ScrollReveal delay={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {["riyadh", "dubai", "karachi", "calgary", "melbourne"].map((city, index) => (
                <div
                  key={city}
                  className={`bg-card-bg border rounded-xl p-5 flex items-center gap-3 ${index === 0 ? "border-accent/50" : "border-card-border"
                    }`}
                >
                  <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {t(`global.cities.${city}.name`)}
                    </h4>
                    <span className="text-xs text-text-secondary">
                      {t(`global.cities.${city}.location`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Section>

        {/* Mission & Values */}
        <Section background="secondary">
          <SectionLabel>{t("values.label")}</SectionLabel>
          <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[
              { key: "excellence", icon: Target },
              { key: "partnership", icon: Handshake },
              { key: "security", icon: Shield },
              { key: "expertise", icon: GlobeIcon },
            ].map((value) => (
              <Card key={value.key}>
                <value.icon className="w-9 h-9 text-text-main mb-4" />
                <CardTitle>{t(`values.items.${value.key}.title`)}</CardTitle>
                <CardDescription>
                  {t(`values.items.${value.key}.description`)}
                </CardDescription>
              </Card>
            ))}
          </div>
          </ScrollReveal>
        </Section>

        {/* Certifications & Alliances */}
        <Section id="certifications">
          <SectionLabel>{t("certifications.label")}</SectionLabel>
          <ScrollReveal delay={0.5}>
          <div className="flex flex-wrap gap-3 mt-6">
            {t.raw("certifications.badges").map((badge: { name: string; active: boolean }, index: number) => (
              <Badge key={index} active={badge.active}>
                {badge.name}
              </Badge>
            ))}
          </div>
          </ScrollReveal>
        </Section>
      </div>
      <Footer />
    </>
  );
}
