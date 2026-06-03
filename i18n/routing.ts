import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"] as const,
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/services": "/services",
    "/services/cybersecurity": "/services/cybersecurity",
    "/services/cloud": "/services/cloud",
    "/services/grc": "/services/grc",
    "/services/digital-transformation": "/services/digital-transformation",
    "/services/business-continuity": "/services/business-continuity",
    "/services/ai": "/services/ai",
    "/solutions": "/solutions",
    "/solutions/pam": "/solutions/pam",
    "/solutions/grc": "/solutions/grc",
    "/solutions/iam": "/solutions/iam",
    "/industries": "/industries",
    "/partners": "/partners",
    "/insights": "/insights",
    "/careers": "/careers",
    "/case-studies": "/case-studies",
    "/assessment": "/assessment",

    "/auth/login": {
      en: "/auth/login",
      ur: "/auth/login",
      ar: "/auth/login",
    },
    "/auth/signup": {
      en: "/auth/signup",
      ur: "/auth/signup",
      ar: "/auth/signup",
    },
    "/auth/forgot": {
      en: "/auth/forgot",
      ur: "/auth/forgot",
      ar: "/auth/forgot",
    },
    "/auth/otp": {
      en: "/auth/otp",
      ur: "/auth/otp",
      ar: "/auth/otp",
    },
    "/auth/reset": {
      en: "/auth/reset",
      ur: "/auth/reset",
      ar: "/auth/reset",
    },
    "/privacy": {
      en: "/privacy",
      ur: "/privacy",
      ar: "/privacy",
    },
    "/terms": {
      en: "/terms",
      ur: "/terms",
      ar: "/terms",
    },
    "/contact": {
      en: "/contact",
      ur: "/contact",
      ar: "/contact",
    },
    "/about": {
      en: "/about",
      ur: "/about",
      ar: "/about",
    },
    "/docs": {
      en: "/docs",
      ur: "/docs",
      ar: "/docs",
    },
    "/support": {
      en: "/support",
      ur: "/support",
      ar: "/support",
    },
    "/changelog": {
      en: "/changelog",
      ur: "/changelog",
      ar: "/changelog",
    },
  },
} as const);

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
