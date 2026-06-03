const insights = {
  breadcrumb: "Insights",
  label: "Insights & Thought Leadership",
  title: "Knowledge for the ",
  titleAccent: "Resilient Enterprise.",
  description: "Regulatory updates, threat intelligence, AI implementation guides, and BCM best practices from Samurai's experts on the front lines of enterprise security and compliance.",
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
      tag: "Regulatory Update",
      title: "NCA ECC 2.0: What Saudi Enterprises Need to Know in 2025",
      description: "A practical breakdown of the updated Essential Cybersecurity Controls and the compliance timeline for critical sector organizations.",
      link: "Read Article →",
    },
    {
      tag: "Threat Intelligence",
      title: "OT/ICS Threats Rising: How Energy Sector CISOs Are Responding",
      description: "An analysis of the latest OT-targeted threat campaigns and defensive strategies emerging across the Gulf energy sector.",
      link: "Read Article →",
    },
    {
      tag: "AI Implementation",
      title: "Deploying AI in Regulated Saudi Environments: A Compliance-First Guide",
      description: "How to build AI capabilities within the constraints of PDPL, NDMO data governance, and SAMA requirements.",
      link: "Read Guide →",
    },
    {
      tag: "BCM & DR",
      title: "SAMA BCM Framework: 6 Steps to Full Compliance",
      description: "A step-by-step walkthrough of Samurai's proven SAMA BCM delivery methodology, from BIA to executive dashboards.",
      link: "Read Whitepaper →",
    },
    {
      tag: "Regulatory Update",
      title: "PDPL Enforcement Is Here: Are You Ready?",
      description: "With PDPL enforcement underway, this guide covers the key obligations for data controllers and processors operating in Saudi Arabia.",
      link: "Read Article →",
    },
    {
      tag: "Threat Intelligence",
      title: "Zero Trust in Practice: Moving Beyond the Buzzword",
      description: "Real-world implementation lessons from Samurai's zero trust deployments across financial services and government sectors.",
      link: "Read Article →",
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
