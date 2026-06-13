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
import { Server, Globe, FileText, Database, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import PAMPage from "./components/PAMPage";
import ChatWizardModal from "./components/ChatWizardModal";
import { useState } from "react";
import TestimonialSection from "./components/Testimonialsection";
import WhySamurai from "./components/Whysamurai";
import GlobalPresenceSection from "./components/GlobalPresenceSection";
import TrustedBySection from "./components/TrustedMarquee";
import SevenPillarsSection from "./components/SevenPillarsSection";
import { AnimatedHeading } from "./components/animations/textBehavior";
import ScrollReveal from "./components/animations/ScrollReveal";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tInd = useTranslations("industries");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      {/* <div className="pt-24 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.14em] text-text-main uppercase mb-5">
            {t("hero.tag")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {t("hero.title")}
            <span className="text-text-main">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
              {t("hero.ctaPrimary")}
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#services">{t("hero.ctaSecondary")}</Link>
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

      {/* Seven Pillars — Interactive Stacked Cards */}
      <Section id="services">
        <SectionLabel>{t("services.label")}</SectionLabel>
        <SectionTitle>
          {t("services.title")}
          <span className="text-text-main">{t("services.titleAccent")}</span>
        </SectionTitle>
        <SectionDescription>{t("services.description")}</SectionDescription>
        <SevenPillarsSection />
      </Section>

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
      <WhySamurai />

      {/* Industries Served */}
      <Section>
        <SectionLabel>{t("industries.label")}</SectionLabel>
        <AnimatedHeading
          titleText={t("industries.title")}
          accentText={t("industries.titleAccent")}
          className="mb-4"
          Component={SectionTitle}
        />

        {/* Fortinet-Inspired Premium Enterprise Cards - Smaller 6-in-a-row layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[16px] mt-12 w-full overflow-visible">
          {[
            {
              key: "government",
              icon: Landmark,
              color: "#ffffff",
              accentColor: "#A1151C",
              borderColor: "border-[#A1151C]/30",
              shadow: "hover:shadow-[0_20px_40px_rgba(161,21,28,0.35)]",
              borderGlow: "hover:border-[#A1151C]/60",
              cardBg: "radial-gradient(circle at 50% 35%, #A1151C 0%, #4c0a0c 65%, #1b0203 100%)",
              textColor: "text-[#ffd6bd]",
              textHighlight: "rgba(0, 0, 0, 0.6)",
              subtitle: "Saudi Arabia",
              svgBackground: (
                <svg className="w-24 h-24 mb-3 drop-shadow-[0_2px_8px_rgba(255,208,176,0.3)]" viewBox="0 0 100 100" fill="none">
                  <style>{`
                    @keyframes gov-bob {
                      0%, 100% { transform: translateY(0); }
                      50% { transform: translateY(-4px); }
                    }
                    .gov-group {
                      animation: gov-bob 4s ease-in-out infinite;
                    }
                  `}</style>
                  <g className="gov-group">
                    {/* Front Metallic Layer */}
                    <path d="M15,80 L85,80" stroke="#ffd0b0" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M22,72 L78,72" stroke="#ffd0b0" strokeWidth="3" strokeLinecap="round" />
                    <path d="M22,36 L78,36" stroke="#ffd0b0" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M22,36 L50,16 L78,36 Z" fill="#ffd0b0" stroke="#ffd0b0" strokeWidth="1" />

                    {/* Columns */}
                    <line x1="70" y1="36" x2="70" y2="72" stroke="#ffd0b0" strokeWidth="4" strokeLinecap="round" />
                    <line x1="57" y1="36" x2="57" y2="72" stroke="#ffd0b0" strokeWidth="4" strokeLinecap="round" />
                    <line x1="43" y1="36" x2="43" y2="72" stroke="#ffd0b0" strokeWidth="4" strokeLinecap="round" />
                    <line x1="30" y1="36" x2="30" y2="72" stroke="#ffd0b0" strokeWidth="4" strokeLinecap="round" />
                  </g>
                </svg>
              ),
              features: ["NDMO Alignment", "Data Sovereignty", "Vision 2030 Goals", "OT Infrastructure"]
            },
            {
              key: "financial",
              icon: Building2,
              color: "#ffffff",
              accentColor: "#A1151C",
              borderColor: "border-[#A1151C]/30",
              shadow: "hover:shadow-[0_20px_40px_rgba(161,21,28,0.35)]",
              borderGlow: "hover:border-[#A1151C]/60",
              cardBg: "radial-gradient(circle at 50% 35%, #A1151C 0%, #4c0a0c 65%, #1b0203 100%)",
              textColor: "text-[#ffd6bd]",
              textHighlight: "rgba(0, 0, 0, 0.6)",
              subtitle: "Security & Trust",
              svgBackground: (
                <svg className="w-24 h-24 mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="30" stroke="#ffd0b0" strokeWidth="3" />
                  <circle cx="50" cy="50" r="20" stroke="#ffd0b0" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M50,10 L50,20 M50,80 L50,90 M10,50 L20,50 M80,50 L90,50 M22,22 L29,29 M71,71 L78,78 M78,22 L71,29 M29,71 L22,78" stroke="#ffd0b0" strokeWidth="2.5" />
                  <circle cx="50" cy="50" r="4" fill="#ffd0b0" />
                </svg>
              ),
              features: ["SAMA BCM", "PDPL Compliance", "Transaction Guard", "Resilience"]
            },
            {
              key: "healthcare",
              icon: Hospital,
              color: "#ffffff",
              accentColor: "#A1151C",
              borderColor: "border-[#A1151C]/30",
              shadow: "hover:shadow-[0_20px_40px_rgba(161,21,28,0.35)]",
              borderGlow: "hover:border-[#A1151C]/60",
              cardBg: "radial-gradient(circle at 50% 35%, #A1151C 0%, #4c0a0c 65%, #1b0203 100%)",
              textColor: "text-[#ffd6bd]",
              textHighlight: "rgba(0, 0, 0, 0.6)",
              subtitle: "Critical Care",
              svgBackground: (
                <svg className="w-24 h-24 mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none">
                  {/* Outer Shield */}
                  <path d="M50,15 L15,30 L15,60 C15,75 50,90 50,90 C50,90 85,75 85,60 L85,30 Z" stroke="#ffd0b0" strokeWidth="3" />

                  {/* Inner Alert Cross */}
                  <path
                    d="M50,30 L50,70 M30,50 L70,50"
                    stroke="#ffd0b0"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="animate-[pulse_1s_ease-in-out_infinite]"
                  />
                </svg>
              ),
              features: ["Patient Records", "MOH Standards", "Clinic Shield", "Access Audit"]
            },
            {
              key: "energy",
              icon: Zap,
              color: "#ffffff",
              accentColor: "#A1151C",
              borderColor: "border-[#A1151C]/30",
              shadow: "hover:shadow-[0_20px_40px_rgba(161,21,28,0.35)]",
              borderGlow: "hover:border-[#A1151C]/60",
              cardBg: "radial-gradient(circle at 50% 35%, #A1151C 0%, #4c0a0c 65%, #1b0203 100%)",
              textColor: "text-[#ffd6bd]",
              textHighlight: "rgba(0, 0, 0, 0.6)",
              subtitle: "National Grid",
              svgBackground: (
                <svg className="w-24 h-24 mb-3 drop-shadow-[0_2px_6px_rgba(255,208,176,0.3)]" viewBox="0 0 100 100" fill="none">
                  {/* Main Lightning Bolt with Pulse */}
                  <path
                    d="M55,10 L20,55 L50,55 L45,90 L80,45 L50,45 Z"
                    stroke="#ffd0b0"
                    strokeWidth="3"
                    fill="none"
                    strokeLinejoin="round"
                    className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                  />
                  <path d="M50,45 L55,10" stroke="#ffd0b0" strokeWidth="1.2" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />

                  {/* Diagonal Spark 1 (Top Left) */}
                  <line
                    x1="22" y1="28" x2="28" y2="34"
                    stroke="#ffd0b0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="animate-[pulse_0.8s_ease-in-out_infinite]"
                  />

                  {/* Diagonal Spark 2 (Bottom Right) */}
                  <line
                    x1="78" y1="62" x2="72" y2="68"
                    stroke="#ffd0b0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="animate-[pulse_1.2s_ease-in-out_infinite]"
                  />

                  {/* Tiny glowing energy particle */}
                  <circle
                    cx="30" cy="70" r="1"
                    fill="#ffd0b0"
                    className="animate-[pulse_0.9s_ease-in-out_infinite]"
                  />
                </svg>
              ),
              features: ["SCADA/ICS OT", "Aramco Compliance", "Incident Response", "OT Continuity"]
            },
            {
              key: "education",
              icon: GraduationCap,
              color: "#ffffff",
              accentColor: "#A1151C",
              borderColor: "border-[#A1151C]/30",
              shadow: "hover:shadow-[0_20px_40px_rgba(161,21,28,0.35)]",
              borderGlow: "hover:border-[#A1151C]/60",
              cardBg: "radial-gradient(circle at 50% 35%, #A1151C 0%, #4c0a0c 65%, #1b0203 100%)",
              textColor: "text-[#ffd6bd]",
              textHighlight: "rgba(0, 0, 0, 0.6)",
              subtitle: "Knowledge",
              svgBackground: (
                <svg className="w-24 h-24 mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none">
                  <style>{`
                    @keyframes cap-toss {
                      0%, 100% { transform: translateY(0) rotate(0deg); }
                      30% { transform: translateY(-18px) rotate(-12deg); }
                      65% { transform: translateY(0) rotate(0deg); }
                    }
                    .edu-cap {
                      transform-origin: 50px 50px;
                      animation: cap-toss 2.2s ease-in-out infinite;
                    }
                  `}</style>
                  <g className="edu-cap">
                    <path d="M50,20 L85,38 L50,56 L15,38 Z" stroke="#ffd0b0" strokeWidth="3" fill="none" />
                    <path d="M22,42 L22,70 C22,78 50,83 50,83 C50,83 78,78 78,70 L78,42" stroke="#ffd0b0" strokeWidth="2" />
                    <path d="M80,41 L80,78" stroke="#ffd0b0" strokeWidth="2.5" />
                    <circle cx="80" cy="78" r="2" fill="#ffd0b0" />
                  </g>
                </svg>
              ),
              features: ["Student Privacy", "E-Learning IAM", "DDoS Shield", "Compliance"]
            },
            {
              key: "enterprise",
              icon: Building,
              color: "#ffffff",
              accentColor: "#A1151C",
              borderColor: "border-[#A1151C]/30",
              shadow: "hover:shadow-[0_20px_40px_rgba(161,21,28,0.35)]",
              borderGlow: "hover:border-[#A1151C]/60",
              cardBg: "radial-gradient(circle at 50% 35%, #A1151C 0%, #4c0a0c 65%, #1b0203 100%)",
              textColor: "text-[#ffd6bd]",
              textHighlight: "rgba(0, 0, 0, 0.6)",
              subtitle: "Global Scale",
              svgBackground: (
                <svg className="w-24 h-24 mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 100 100" fill="none">
                  <style>{`
                    @keyframes win-glow-a {
                      0%, 100% { opacity: 0.3; }
                      50% { opacity: 1; }
                    }
                    @keyframes win-glow-b {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0.3; }
                    }
                    .win-a {
                      animation: win-glow-a 2s infinite ease-in-out;
                    }
                    .win-b {
                      animation: win-glow-b 2s infinite ease-in-out;
                    }
                  `}</style>
                  <rect x="25" y="15" width="50" height="70" rx="3" stroke="#ffd0b0" strokeWidth="3" />

                  {/* Row 1 */}
                  <rect x="35.5" y="26" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-a" />
                  <rect x="57.5" y="26" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-b" />

                  {/* Row 2 */}
                  <rect x="35.5" y="40" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-b" />
                  <rect x="57.5" y="40" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-a" />

                  {/* Row 3 */}
                  <rect x="35.5" y="54" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-a" />
                  <rect x="57.5" y="54" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-b" />

                  {/* Row 4 */}
                  <rect x="35.5" y="68" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-b" />
                  <rect x="57.5" y="68" width="7" height="3" rx="0.75" fill="#ffd0b0" className="win-a" />
                </svg>
              ),
              features: ["Cloud Tenants", "Next-Gen SOC", "PAM Lifecycle", "Vendor Audits"]
            },
          ].map((industry, index) => {
            const title = tInd(`sectors.${industry.key}.title`);
            const description = tInd(`sectors.${industry.key}.description`);

            return (
              <ScrollReveal key={index} delay={index * 0.05} animation="blur" className="relative overflow-visible">
                <div
                  className={`group relative block w-full h-[260px] rounded-[18px] overflow-hidden cursor-pointer ${industry.borderColor} border transition-all duration-400 ease-out feature-card ${industry.shadow} ${industry.borderGlow}`}
                  style={{
                    background: industry.cardBg,
                    ["--accent-color" as any]: industry.accentColor
                  }}
                >
                  <div
                    className="absolute inset-0 card-bg-slide pointer-events-none z-0 bg-white"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pt-6 text-center card-front-title z-10">
                    <div className="opacity-95 pointer-events-none flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 mb-3 transform -translate-y-2">
                      {industry.svgBackground}
                    </div>
                    <h3
                      className="text-[17px] font-medium font-serif tracking-[0.12em] uppercase leading-none"
                      style={{ color: "#ffd6bd", textShadow: `0px 2px 4px ${industry.textHighlight}` }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-[10px] font-serif tracking-[0.20em] uppercase opacity-75 mt-2"
                      style={{ color: "#e2a282", textShadow: `0px 1px 2px ${industry.textHighlight}` }}
                    >
                      {industry.subtitle}
                    </p>
                  </div>
                  <div className="absolute inset-0 p-4 pt-12 flex flex-col items-start justify-between text-left card-hover-details pointer-events-none group-hover:pointer-events-auto z-10">
                    <div>
                      <h4 className="text-[14.5px] font-black text-slate-900 group-hover:text-[var(--accent-color)] uppercase tracking-wider mb-1.5 leading-tight transition-colors duration-300">{title}</h4>
                      <p className="text-slate-700 text-[11px] font-semibold leading-relaxed mb-2.5 max-w-[95%] line-clamp-2 transition-colors duration-300">{description}</p>
                      <ul className="space-y-1 w-full">
                        {industry.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-slate-800 text-[10.5px] font-bold transition-colors duration-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] flex-shrink-0 transition-colors duration-300" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={{ pathname: '/industries', hash: industry.key }}
                      className="px-5 py-2 rounded-full bg-[var(--accent-color)] text-white text-[10.5px] font-black transition-all duration-300 uppercase tracking-wider shadow-md inline-flex items-center gap-1"
                    >
                      Learn More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
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
      {/* <TestimonialSection />    */}

      {/* Technology Partners Carousel */}
      <TrustedBySection title={t("partners.label")} logos={t.raw("partners.logos")} cta={t("partners.viewAll")} />
      <TestimonialSection />
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
      <GlobalPresenceSection />

      {/* Final CTA */}
      <Section className="text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating cards left side */}
        <motion.div 
          className="absolute left-[2%] xl:left-[6%] top-1/2 -translate-y-1/2 hidden lg:block w-[136px] h-[136px] border border-transparent pointer-events-none select-none"
          initial={{
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: "rgba(255, 255, 255, 0)"
          }}
          animate={{
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: isCtaHovered ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Selection corner brackets */}
          <motion.div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />

          {/* Card 1: Globe (Top-Center) */}
          <motion.div
            className="absolute left-[40px] top-[10px] w-14 h-14 rounded-xl border border-dashed border-white/20 bg-background-tertiary/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            initial={{ y: -150, opacity: 0 }}
            animate={isCtaHovered ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              zIndex: 10
            } : {
              x: 20,
              y: [-45, -50, -45],
              rotate: -12,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 10,
              transition: {
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Globe className="w-6 h-6 text-white/70" />
          </motion.div>

          {/* Card 2: FileText (Bottom-Left) */}
          <motion.div
            className="absolute left-[10px] top-[70px] w-14 h-14 rounded-xl border border-dashed border-white/20 bg-background-tertiary/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            initial={{ y: -150, opacity: 0 }}
            animate={isCtaHovered ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              zIndex: 20
            } : {
              x: -70,
              y: [10, 15, 10],
              rotate: 15,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 20,
              transition: {
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }
              }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <FileText className="w-6 h-6 text-text-main" />
          </motion.div>

          {/* Card 3: Database (Bottom-Right) */}
          <motion.div
            className="absolute left-[70px] top-[70px] w-14 h-14 rounded-xl border border-dashed border-white/20 bg-background-tertiary/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            initial={{ y: -150, opacity: 0 }}
            animate={isCtaHovered ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              zIndex: 30
            } : {
              x: 30,
              y: [80, 75, 80],
              rotate: -8,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 30,
              transition: {
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }
              }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Database className="w-6 h-6 text-white/70" />
          </motion.div>
        </motion.div>

        {/* Floating cards right side */}
        <motion.div 
          className="absolute right-[2%] xl:right-[6%] top-1/2 -translate-y-1/2 hidden lg:block w-[136px] h-[136px] border border-transparent pointer-events-none select-none"
          initial={{
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: "rgba(255, 255, 255, 0)"
          }}
          animate={{
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: isCtaHovered ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Selection corner brackets */}
          <motion.div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/60" initial={{ opacity: 0 }} animate={{ opacity: isCtaHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />

          {/* Card 1: Server (Top-Center) */}
          <motion.div
            className="absolute left-[40px] top-[10px] w-14 h-14 rounded-xl border border-dashed border-white/20 bg-background-tertiary/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            initial={{ y: -150, opacity: 0 }}
            animate={isCtaHovered ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              zIndex: 10
            } : {
              x: -20,
              y: [-45, -50, -45],
              rotate: 12,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 10,
              transition: {
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Server className="w-6 h-6 text-text-main" />
          </motion.div>

          {/* Card 2: Shield (Bottom-Left) */}
          <motion.div
            className="absolute left-[10px] top-[70px] w-14 h-14 rounded-xl border border-dashed border-white/20 bg-background-tertiary/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            initial={{ y: -150, opacity: 0 }}
            animate={isCtaHovered ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              zIndex: 20
            } : {
              x: -60,
              y: [50, 45, 50],
              rotate: -15,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 20,
              transition: {
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.7 }
              }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Shield className="w-6 h-6 text-white/70" />
          </motion.div>

          {/* Card 3: Cpu (Bottom-Right) */}
          <motion.div
            className="absolute left-[70px] top-[70px] w-14 h-14 rounded-xl border border-dashed border-white/20 bg-background-tertiary/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            initial={{ y: -150, opacity: 0 }}
            animate={isCtaHovered ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              zIndex: 30
            } : {
              x: 70,
              y: [15, 19, 15],
              rotate: 8,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              zIndex: 30,
              transition: {
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.2 }
              }
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Cpu className="w-6 h-6 text-white/70" />
          </motion.div>
        </motion.div>

        <AnimatedHeading
          titleText={t("finalCta.title")}
          accentText={t("finalCta.titleAccent")}
          className="mb-4"
          Component={SectionTitle}
        />
        <ScrollReveal animation="fadeUp" delay={0.2}>
          <p className="text-text-secondary mt-4 mb-10 text-base max-w-2xl mx-auto">
            {t("finalCta.description")}
          </p>
          <Button 
            variant="fill" 
            size="lg" 
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
          >
            {t("finalCta.cta")}
          </Button>
        </ScrollReveal>
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
        .feature-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          -webkit-font-smoothing: antialiased;
        }
        .feature-card:hover {
          transform: translate3d(0, -8px, 0);
        }
        .card-bg-slide {
          transform: translate3d(0, 100%, 0);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .group:hover .card-bg-slide {
          transform: translate3d(0, 0, 0);
        }
        .card-front-title {
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s;
          will-change: transform, opacity;
        }
        .group:hover .card-front-title {
          transform: translate3d(0, -100px, 0);
          opacity: 0;
        }
        .card-hover-details {
          opacity: 0;
          transform: translate3d(0, 25px, 0);
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
          -webkit-font-smoothing: antialiased;
        }
        .group:hover .card-hover-details {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        /* Staggered lists entry */
        .card-hover-details li {
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity;
        }
        .group:hover .card-hover-details li:nth-child(1) { transition-delay: 0.1s; opacity: 1; }
        .group:hover .card-hover-details li:nth-child(2) { transition-delay: 0.15s; opacity: 1; }
        .group:hover .card-hover-details li:nth-child(3) { transition-delay: 0.2s; opacity: 1; }
        .group:hover .card-hover-details li:nth-child(4) { transition-delay: 0.25s; opacity: 1; }
        .front-icon {
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.75));
          transition: transform 0.4s ease-out, filter 0.3s;
        }
        .group:hover .front-icon {
          filter: none;
        }
        .hover-icon {
          filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.5));
          transition: filter 0.45s ease-out, color 0.45s;
        }
        .group:hover .hover-icon {
          color: var(--accent-color) !important;
          filter: drop-shadow(0 0 5px var(--accent-color));
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
