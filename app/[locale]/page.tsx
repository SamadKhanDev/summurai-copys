"use client";

import { useTranslations } from "next-intl";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  Section,
  SectionLabel,
  SectionTitle,
  SectionDescription,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardLink,
  Button,
  Badge,
  Testimonial,
  CalloutBanner,
  StatsBar,
} from "./components/ui";
import {
  Shield,
  Cloud,
  Scale,
  Bot,
  RefreshCw,
  Settings,
  Building2,
  Landmark,
  Hospital,
  Zap,
  GraduationCap,
  Building,
} from "lucide-react";
import HeroSection from "./components/HeroSection";
import { Server } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PAMPage from "./components/PAMPage";
import ChatWizardModal from "./components/ChatWizardModal";
import { useState } from "react";
import TestimonialSection from "./components/Testimonialsection";
import WhySamurai from "./components/Whysamurai";
import GlobalPresenceSection from "./components/GlobalPresenceSection";
import TrustedBySection from "./components/TrustedMarquee";
import ServicesSection from "./components/ServicesSection";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      {/* <div className="pt-24 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.14em] text-text-main uppercase mb-5">
            {t("hero.tag")}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl text-white">
            {t("hero.title")}
            <span className="text-text-main">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-6 mb-10 text-lg text-text-secondary max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button variant="fill" size="lg" asLink href="/contact">
              {t("hero.ctaPrimary")}
            </Button>
            <Button variant="outline" size="lg" asLink href="/services">
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </div>
      </div> */}
      <HeroSection />

      {/* Stats Bar */}
      <StatsBar
        stats={[
          {
            value: t("stats.founded.value"),
            label: t("stats.founded.label"),
          },
          {
            value: t("stats.expertise.value"),
            label: t("stats.expertise.label"),
          },
          {
            value: t("stats.countries.value"),
            label: t("stats.countries.label"),
          },
          {
            value: t("stats.organizations.value"),
            label: t("stats.organizations.label"),
          },
        ]}
        logos={["Aramco", "Ministry of Health", "Hassana", "Edarat", "Bousma"]}
      />

      {/* Core Services Overview */}
      <ServicesSection />

      {/* Divider */}
      <div className="h-px bg-card-border mx-8" />

      {/* Compliance Badge Strip */}
      <Section className="py-10">
        <SectionLabel>{t("compliance.label")}</SectionLabel>
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            "NCA ECC",
            "PDPL",
            "NDMO",
            "SAMA BCM",
            "ISO 27001",
            "ISO 22301",
            "ISO 27701",
            "MITRE ATT&CK",
            "Zero Trust",
          ].map((badge, index) => (
            <Badge key={index} active={index < 6}>
              {badge}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Divider */}
      <div className="h-px bg-card-border mx-8" />

      {/* VAPT Callout */}
      {/* <Section className="py-12">
        <CalloutBanner
          title={t("vapt.title")}
          description={t("vapt.description")}
          ctaText={t("vapt.cta")}
          ctaHref="/assessment"
        />
      </Section> */}

      {/* PAM Services */}
      <PAMPage />


      {/* Why Samurai */}
      {/* <Section background="secondary">
        <SectionLabel>{t("whySamurai.label")}</SectionLabel>
        <SectionTitle>
          {t("whySamurai.title")}
          <span className="text-text-main">{t("whySamurai.titleAccent")}</span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Card>
            <CardIcon>🏆</CardIcon>
            <CardTitle>{t("whySamurai.items.expertise.title")}</CardTitle>
            <CardDescription>
              {t("whySamurai.items.expertise.description")}
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>🔗</CardIcon>
            <CardTitle>{t("whySamurai.items.delivery.title")}</CardTitle>
            <CardDescription>
              {t("whySamurai.items.delivery.description")}
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>🔐</CardIcon>
            <CardTitle>{t("whySamurai.items.security.title")}</CardTitle>
            <CardDescription>
              {t("whySamurai.items.security.description")}
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>🇸🇦</CardIcon>
            <CardTitle>{t("whySamurai.items.compliance.title")}</CardTitle>
            <CardDescription>
              {t("whySamurai.items.compliance.description")}
            </CardDescription>
          </Card>
        </div>
      </Section> */}
      <WhySamurai/>

      {/* Industries Served */}
      <Section>
        <SectionLabel>{t("industries.label")}</SectionLabel>
        <SectionTitle>
          {t("industries.title")}
          <span className="text-text-main">{t("industries.titleAccent")}</span>
        </SectionTitle>

        <div className="flex flex-wrap gap-4 mt-10">
          {[
            { icon: Landmark, label: "Government" },
            { icon: Building2, label: "Financial Services" },
            { icon: Hospital, label: "Healthcare" },
            { icon: Zap, label: "Energy & Critical Infrastructure" },
            { icon: GraduationCap, label: "Education" },
            { icon: Building, label: "Enterprise" },
          ].map((industry, index) => (
            <a
              key={index}
              href="/industries"
              className="bg-card-bg border border-card-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer min-w-[180px]"
            >
              <industry.icon className="w-8 h-8 text-text-main mb-3" />
              <span className="text-xs font-semibold text-text-secondary">
                {industry.label}
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* CISO Testimonial */}
      {/* <Section background="secondary">
        <SectionLabel>{t("testimonial.label")}</SectionLabel>
        <Testimonial
          quote={t("testimonial.quote")}
          author={t("testimonial.author")}
        />
        <div className="mt-6">
          <Button variant="outline" asLink href="/case-studies">
            {t("testimonial.cta")}
          </Button>
        </div>
      </Section> */}
      <TestimonialSection/>

      {/* Technology Partners Carousel */}
      <TrustedBySection title={t("partners.label")} logos={t.raw("partners.logos")} cta={t("partners.viewAll")} />

      {/* Global Presence */}
      {/* <Section background="secondary">
        <SectionLabel>{t("globalPresence.label")}</SectionLabel>
        <SectionTitle>
          {t("globalPresence.title")}
          <span className="text-text-main">
            {t("globalPresence.titleAccent")}
          </span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {[
            {
              name: "Riyadh",
              location: "Saudi Arabia — HQ",
              highlighted: true,
            },
            { name: "Dubai", location: "United Arab Emirates" },
            { name: "Karachi", location: "Pakistan" },
            { name: "Calgary", location: "Canada" },
            { name: "Melbourne", location: "Australia" },
          ].map((city, index) => (
            <div
              key={index}
              className={`bg-card-bg border rounded-xl p-5 flex items-center gap-3 ${city.highlighted ? "border-accent/50" : "border-card-border"
                }`}
            >
              <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">{city.name}</h4>
                <span className="text-xs text-text-secondary">
                  {city.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section> */}
      <GlobalPresenceSection/>
      
      {/* Final CTA */}
      <Section className="text-center">
        <SectionTitle className="mx-auto">
          {t("finalCta.title")}
          <span className="text-text-main">{t("finalCta.titleAccent")}</span>
        </SectionTitle>
        <p className="text-text-secondary mt-4 mb-10 text-base max-w-2xl mx-auto">
          {t("finalCta.description")}
        </p>
        <Button variant="fill" size="lg" onClick={() => setIsModalOpen(true)}
        >
          {t("finalCta.cta")}
        </Button>
      </Section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Footer />
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
