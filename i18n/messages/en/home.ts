const home = {
  hero: {
    tag: "An Affiliate of Neusol · Riyadh, Saudi Arabia",
    title: "Invest in ",
    titleAccent: "Where Challenges Meet Innovation",
    description: "Samurai Systems is a team of skilled solution architects, developers, and consultants with one clear goal in mind \"to deliver the best, nothing less\"",
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
    titleAccent: "One Strong Defense.",
    description: "A unified cybersecurity framework designed to protect your critical assets, strengthen resilience, and ensure compliance with Saudi regulatory standards.",
    items: {
      cyber: {
        title: "Incident Response",
        description: "Rapidly detect, contain, and investigate cyber breaches. Our certified experts provide 24/7 emergency response and post-incident recovery support.",
        link: "Learn More →",
      },
      cloud: {
        title: "OT Security",
        description: "Secure operational technology (OT), industrial control systems (ICS), and SCADA environments against evolving cyber risks while simplifying compliance.",
        link: "Learn More →",
      },
      grc: {
        title: "GRC & Compliance",
        description: "Establish robust Governance, Risk, and Compliance frameworks aligned with national and international standards like NCA, SAMA, and ISO to ensure continuous security alignment.",
        link: "Learn More →",
      },
      dt: {
        title: "Digital Transformation",
        description: "Enable businesses to transform digitally, streamline operations, and foster innovation. We help you build a strong IT foundation aligned with your long-term goals.",
        link: "Learn More →",
      },
      ai: {
        title: "Training & Awareness",
        description: "Empower your workforce and mitigate human risk. We deliver engaging security awareness training, ISO certification courses, and centralized learning solutions.",
        link: "Learn More →",
      },
      bcm: {
        title: "Business Continuity",
        description: "Proactively manage risks and ensure your critical operations never stop. We help you develop resilient frameworks, disaster recovery plans, and crisis management strategies.",
        link: "Learn More →",
      },
      infrastructure: {
        title: "Technical Consulting",
        description: "Align IT and cybersecurity strategies with business goals. We help design secure operations, build clear technology roadmaps, and conduct technical security assessments.",
        link: "Learn More →",
      },
    },
  },
  compliance: {
    label: "Regulatory Alignment",
    badges: [
      "NCA ECC",
      "NCA CSCC",
      "NCA OTCC",
      "SAMA CSF",
      "Aramco SACS-002",
      "KSA PDPL",
      "NDMO",
      "ISO 27001",
      "ISO 22301",
      "IEC 62443"
    ],
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
        title: "Trusted & Agile",
        description: "We build lasting client relationships through integrity, transparency, and responsive service. Our agile approach enables us to adapt quickly to evolving business needs.",
      },
      delivery: {
        title: "Dedicated Support",
        description: "Our experts provide proactive technical assistance and continuous guidance. We're committed to ensuring your systems operate securely and efficiently.",
      },
      security: {
        title: "Global Reach",
        description: "With a presence across multiple countries, we deliver world-class IT solutions backed by local expertise and personalized service.",
      },
      compliance: {
        title: "On-Time Delivery",
        description: "We plan and execute every project with precision, ensuring timely delivery without compromising quality, performance, or reliability.",
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
    title2: "One Secure Partner.",
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
