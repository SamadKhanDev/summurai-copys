const navbar = {
  brand: "SAMURAI",
  brandDot: ".",
  brandSuffix: "SYSTEMS",
  links: {
    home: "Home",
    services: "Services",
    solutions: "Solutions",
    industries: "Industries",
    about: "About",
    partners: "Partners",
    insights: "Insights",
    contact: "Contact",
  },
  dropdowns: {
    services: {
      all: "All Services",
      cyber: "Cybersecurity & SOC",
      cloud: "Cloud & IT Operations",
      grc: "GRC & Compliance",
      dt: "Digital Transformation",
      bcm: "Business Continuity",
      ai: "AI & Automation",
    },
    solutions: {
      all: "All Solutions",
      pam: "PAM (Wallix)",
      grc: "GRC",
      iam: "IAM",
      cloudModernization: "Cloud Modernization",
      securityOperations: "Security Operations",
      businessResilience: "Business Resilience",
    },
    industries: {
      all: "All Industries",
      financial: "Financial Services",
      government: "Government",
      healthcare: "Healthcare",
      energy: "Energy",
      education: "Education",
      enterprise: "Enterprise",
    },
    about: {
      overview: "Company Overview",
      leadership: "Leadership Team",
      global: "Global Presence",
      certifications: "Certifications",
    },
  },
  cta: {
    assessment: "Get Assessment",
    contact: "Contact Us",
  },
} as const;

export default navbar;
export type NavbarMessages = typeof navbar;
