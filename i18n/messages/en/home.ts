const home = {
  hero: {
    tag: "An Affiliate of Neusol · Riyadh, Saudi Arabia",
    title: "Invest in ",
    titleAccent: "Proven Cybersecurity Solutions.",
    description: "Reduce recovery time by up to 80% with our cloud-based solution that quickly detects, responds to, and recovers from cyberattacks.",
    ctaPrimary: "Book a Briefing",
    ctaSecondary: "Explore Services",
  },
  stats: {
    founded: {
      value: "2010",
      label: "Founded",
    },
    expertise: {
      value: "15+",
      label: "Years of Expertise",
    },
    countries: {
      value: "5",
      label: "Countries",
    },
    organizations: {
      value: "2,800+",
      label: "Organizations Served",
    },
    clients: ["Aramco", "Ministry of Health", "Hassana", "Edarat", "Bousma"],
  },
  services: {
    label: "What We Do",
    title: "Seven Pillars. ",
    titleAccent: "One Operating System.",
    description: "A holistic ecosystem engineered to protect, modernize, and scale your most critical digital assets — fully aligned with Saudi regulatory frameworks.",
    items: {
      cyber: {
        title: "Cybersecurity & Managed SOC",
        description: "24×7 monitoring, SIEM/SOAR/EDR/XDR, MITRE ATT&CK & NCA ECC alignment. End-to-end cyber protection.",
        link: "Learn More →",
      },
      cloud: {
        title: "Cloud & IT Operations",
        description: "Azure, AWS, Oracle OCI management with on-site, hybrid, or fully managed outsourcing models.",
        link: "Learn More →",
      },
      grc: {
        title: "GRC & Compliance",
        description: "NCA ECC, PDPL, NDMO, ISO 27001/22301/27701 alignment, vCISO advisory, and audit readiness.",
        link: "Learn More →",
      },
      ai: {
        title: "AI & Automation",
        description: "AI strategy, ML, conversational AI, computer vision, OCR, and AI agents for regulated enterprises.",
        link: "Learn More →",
      },
      bcm: {
        title: "Business Continuity Management",
        description: "SAMA BCM end-to-end, ISO 22301 readiness, BIA, DR environments, and NCA-compliant testing.",
        link: "Learn More →",
      },
      dt: {
        title: "Digital Transformation & Analytics",
        description: "Enterprise modernization, RPA, custom development, and Power BI dashboards & data warehousing.",
        link: "Learn More →",
      },
      infrastructure: {
        title: "Cloud & Infrastructure",
        description: "Unified multi-cloud management, CSPM, OT/ICS & SCADA monitoring with automated scaling across Azure, AWS, SITE Cloud, and Oracle OCI.",
        link: "Learn More →",
      },
    },
  },
  compliance: {
    label: "Regulatory Alignment",
    badges: ["NCA ECC", "PDPL", "NDMO", "SAMA BCM", "ISO 27001", "ISO 22301", "ISO 27701", "MITRE ATT&CK", "Zero Trust"],
  },
  vapt: {
    title: "Identify vulnerabilities before adversaries do.",
    description: "Our comprehensive VA/PT and red teaming services expose your weaknesses so your adversaries never can.",
    cta: "Schedule a Security Assessment",
  },
  whySamurai: {
    label: "Why Samurai",
    title: "Built for the ",
    titleAccent: "Enterprise.",
    items: {
      expertise: {
        title: "Enterprise-Grade Expertise",
        description: "Over 15 years delivering complex, mission-critical IT and security solutions to 2,800+ organizations across 5 countries.",
      },
      delivery: {
        title: "End-to-End Delivery",
        description: "From strategy and architecture to implementation and managed operations — we own the full journey with one unified team.",
      },
      security: {
        title: "Security-First Approach",
        description: "Security is embedded across every engagement, not bolted on. Every solution we deliver is designed with a zero-trust posture.",
      },
      compliance: {
        title: "Regional Compliance Alignment",
        description: "Deep expertise in NCA ECC, PDPL, NDMO, SAMA BCM — we speak the regulator's language and help you stay ahead of mandates.",
      },
    },
  },
  industries: {
    label: "Industries",
    title: "Serving ",
    titleAccent: "Critical Sectors.",
    items: ["Government", "Financial Services", "Healthcare", "Energy & Critical Infrastructure", "Education", "Enterprise"],
  },
  testimonial: {
    label: "Client Voice",
    quote: "They walked into a 15-foot spreadsheet and walked out leaving us with six. The board can finally read the risk dashboard without a translator.",
    author: "CISO, Saudi Financial Institution",
    cta: "See Case Studies →",
  },
  partners: {
    label: "Technology Partners",
    logos: [
      "aramco.2a50736c.svg",
      "bussma.webp",
      "edarat-group.webp",
      "evolveum-logo-white.webp",
      "hassana (1).webp",
      "midpoint.webp",
      "ministry-of-health.webp",
      // "STC PAY",
      // "KFUPM",
      // "MOH",
      // "ALRAJHI",
      // "STC",
      // "MAADEN",
    ],
    viewAll: "View All Partners →",
  },
  globalPresence: {
    eyebrow: "FOOTPRINT",
    title1: "Five countries.",
    title2: "One accountable partner.",
    description:
      "Engineers in your time zone. SOC analysts in your jurisdiction. Contracts that recognize your regulator. Founded 2010 · independent · privately held.",
    offices: [
      { num: "01", name: "Riyadh", country: "Saudi Arabia", role: "Headquarters · SOC", hq: true },
      { num: "02", name: "Dubai", country: "UAE", role: "GCC operations", hq: false },
      { num: "03", name: "Cairo", country: "Egypt", role: "Engineering hub", hq: false },
      { num: "04", name: "Kuwait City", country: "Kuwait", role: "Delivery", hq: false },
      { num: "05", name: "Manama", country: "Bahrain", role: "Delivery", hq: false },
    ],
  },
  finalCta: {
    title: "Ready to evaluate your ",
    titleAccent: "digital strategy?",
    description: "Book a free 30-minute resilience health check. Briefing, not pitch.",
    cta: "Book a Briefing →",
  },
} as const;

export default home;
export type HomeMessages = typeof home;
