const insights = {
  breadcrumb: "Insights",
  label: "Insights & Thought Leadership",
  title: "Knowledge for the ",
  titleAccent: "Resilient Business",
  description: "Stay informed with the latest regulatory updates, cybersecurity insights, AI adoption strategies, and business continuity best practices from Samurai Systems' industry experts.",
  filters: {
    all: "All Topics",
    regulatory: "NCA / PDPL / SAMA",
    threat: "Threat Intelligence",
    ai: "AI Implementation",
    bcm: "BCM & DR",
    whitepapers: "Whitepapers",
  },
  articles: [
    {
      tag: "Managed SOC",
      title: "Managed Security Operations Center (mSOC)",
      description: "Samurai Systems provides 24/7 security monitoring, threat detection, and rapid incident response to help organizations stay protected against evolving cyber threats.",
      link: "Explore Services →",
    },
    {
      tag: "Offensive Security",
      title: "Offensive Security & Red Teaming",
      description: "Identify vulnerabilities before attackers do through comprehensive penetration testing, red teaming, and security assessments that strengthen your overall cyber defense.",
      link: "Explore Services →",
    },
    {
      tag: "OT/IoT Security",
      title: "OT & IoT Security",
      description: "Protect operational technology and connected devices with advanced security solutions designed for critical infrastructure, industrial environments, and smart ecosystems.",
      link: "Explore Services →",
    },
    {
      tag: "Advisory",
      title: "Compliance, Governance & Risk Advisory",
      description: "Achieve compliance with industry regulations through expert risk assessments, governance frameworks, policy development, and tailored cybersecurity strategies.",
      link: "Explore Services →",
    },
    {
      tag: "Managed Services",
      title: "Managed Cybersecurity Services",
      description: "Reduce operational complexity with fully managed cybersecurity services, proactive monitoring, expert support, and ongoing protection tailored to your business needs.",
      link: "Explore Services →",
    },
    {
      tag: "Resilience",
      title: "Business Resilience & Digital Transformation",
      description: "Empower your organization with secure digital transformation strategies that strengthen resilience, ensure business continuity, and support long-term growth.",
      link: "Explore Services →",
    },
  ],
  newsletter: {
    title: "Stay ahead of the threat landscape.",
    description: "Regulatory updates, threat briefings, and AI guides — delivered directly to your inbox.",
    placeholder: "your@email.com",
    button: "Subscribe",
  },
} as const;

export default insights;
export type InsightsMessages = typeof insights;
