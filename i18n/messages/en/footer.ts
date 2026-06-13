const footer = {
  brand: {
    name: "SAMURAI",
    dot: ".",
    suffix: "SYSTEMS",
    description: "Samurai Systems — an affiliate of Neusol. We build long-term partnerships that empower organizations to thrive in a fast-evolving digital world.",
    email: "connect@samurai.systems",
    phone: "+966 11 292 3918",
    location: "Riyadh, Saudi Arabia",
    affiliate: "Affiliate of Neusol",
  },
  services: {
    title: "Services",
    cyber: "Cybersecurity & SOC",
    cloud: "Cloud & IT Operations",
    grc: "GRC & Compliance",
    ai: "AI & Automation",
    bcm: "Business Continuity",
    dt: "Digital Transformation",
  },
  company: {
    title: "Company",
    about: "About Us",
    careers: "Careers",
    partners: "Partners",
    caseStudies: "Case Studies",
    insights: "Insights",
  },
  solutions: {
    title: "Solutions",
    pam: "PAM (Wallix)",
    grc: "GRC",
    iam: "IAM",
    cloudModernization: "Cloud Modernization",
    securityOps: "Security Operations",
    businessResilience: "Business Resilience",
  },
  legal: {
    title: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookies: "Cookie Policy",
    careers: "Careers",
    sitemap: "Sitemap",
  },
  bottom: {
    copyright: "© 2025 Samurai Systems — An Affiliate of Neusol | All Rights Reserved",
    privacy: "Privacy",
    terms: "Terms",
    linkedin: "LinkedIn",
    languages: "EN | AR",
  },
  whatsapp: {
    title: "Chat on WhatsApp",
  },
} as const;

export default footer;
export type FooterMessages = typeof footer;
