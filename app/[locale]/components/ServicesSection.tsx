"use client";

import { useTranslations } from "next-intl";
import {
    Shield,
    Cloud,
    Scale,
    Settings,
    RefreshCw,
    Bot,
    Server,
} from "lucide-react";
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
} from "./ui"; // adjust path as needed
import ScrollReveal from "./animations/ScrollReveal";

const servicesRow1 = [
    {
        key: "cyber",
        icon: Shield,
        href: "/services/cybersecurity",
    },
    {
        key: "cloud",
        icon: Cloud,
        href: "/services/cloud",
    },
    {
        key: "grc",
        icon: Scale,
        href: "/services/grc",
    },
    {
        key: "dt",
        icon: Settings,
        href: "/services/digital-transformation",
    },
];

const servicesRow2 = [
    {
        key: "bcm",
        icon: RefreshCw,
        href: "/services/business-continuity",
    },
    {
        key: "ai",
        icon: Bot,
        href: "/services/ai",
    },
    {
        key: "infrastructure",
        icon: Server,
        href: "/services/cloud-infrastructure",
    },
];

function ServiceCard({
    serviceKey,
    icon: Icon,
    href,
    delay,
}: {
    serviceKey: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    delay: number;
}) {
    const t = useTranslations("home");

    return (
        <ScrollReveal delay={delay} animation="scale">
            <div className="h-[290px]">
                <Card hover className="h-full flex flex-col" >
                    <CardIcon>
                        <Icon className="w-9 h-9 text-text-main" />
                    </CardIcon>
                    <CardTitle>{t(`services.items.${serviceKey}.title`)}</CardTitle>
                    <CardDescription>
                        {t(`services.items.${serviceKey}.description`)}
                    </CardDescription>
                    <CardLink href={href as any}>
                        {t(`services.items.${serviceKey}.link`)}
                    </CardLink>
                </Card>
            </div>
        </ScrollReveal>
    );
}

export default function ServicesSection() {
    const t = useTranslations("home");

    return (
        <Section>
            <ScrollReveal delay={0}>
                <SectionLabel>{t("services.label")}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <SectionTitle>
                    {t("services.title")}
                    <span className="text-text-main">{t("services.titleAccent")}</span>
                </SectionTitle>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
                <SectionDescription>{t("services.description")}</SectionDescription>
            </ScrollReveal>

            <div className="mt-12 space-y-6">
                {/* Row 1 — 4 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {servicesRow1.map((service, index) => (
                        <div key={service.key} className="h-full">
                            <ServiceCard
                                key={service.key}
                                serviceKey={service.key}
                                icon={service.icon}
                                href={service.href}
                                delay={0.2 + index * 0.1}
                            />
                        </div>
                    ))}
                </div>

                {/* Row 2 — 3 cards centered */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:w-3/4 lg:mx-auto">
                    {servicesRow2.map((service, index) => (
                        <div key={service.key} className="h-full">
                            <ServiceCard
                                key={service.key}
                                serviceKey={service.key}
                                icon={service.icon}
                                href={service.href}
                                delay={0.6 + index * 0.1}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}