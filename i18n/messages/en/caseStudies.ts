const caseStudies = {
  breadcrumb: "Case Studies",
  label: "Case Studies",
  title: "Proof, Not ",
  titleAccent: "Promises.",
  description: "Real outcomes from real engagements across financial services, government, energy, and healthcare sectors.",
  filters: {
    all: "All",
    financial: "Financial Services",
    grc: "GRC",
    cybersecurity: "Cybersecurity",
    bcm: "BCM",
    ncaEcc: "NCA ECC",
  },
  featured: {
    tag: "FEATURED — FINANCIAL SERVICES",
    title: "GRC Program Consolidation — Major Saudi Financial Institution",
    challenge: {
      title: "Challenge",
      description: "A leading Saudi financial institution was managing risk across 15+ fragmented spreadsheets, with no unified view for the board. Compliance reporting took weeks and lacked credibility with regulators.",
    },
    solution: {
      title: "Solution",
      description: "Samurai deployed a unified GRC framework aligned with NCA ECC, PDPL, and SAMA BCM. Executive dashboards replaced manual reports. vCISO advisory provided ongoing governance leadership.",
    },
    results: {
      title: "Results",
      description: "Risk reporting reduced from 15 spreadsheets to 6. Board-ready dashboards delivered in real time. Full NCA ECC compliance achieved. Audit preparation time reduced by 60%.",
    },
    testimonial: {
      quote: "They walked into a 15-foot spreadsheet and walked out leaving us with six. The board can finally read the risk dashboard without a translator.",
      author: "CISO, Saudi Financial Institution",
    },
  },
  cases: [
    {
      tag: "GOVERNMENT",
      title: "SOC Deployment for Government Entity — Saudi Arabia",
      challenge: "A government agency lacked 24×7 visibility into threats targeting its critical infrastructure, with no structured incident response capability.",
      solution: "Samurai deployed a Managed SOC with SIEM/SOAR integration, MITRE ATT&CK-aligned detection use cases, and a full DFIR playbook aligned with NCA reporting requirements.",
      results: "Mean time to detect (MTTD) reduced by 80%. Full NCA ECC compliance achieved. 24×7 monitoring with escalation SLAs established.",
    },
    {
      tag: "ENERGY",
      title: "OT/ICS Security Program — Energy Sector Client",
      challenge: "An energy company's OT/ICS environment had no network segmentation, limited visibility, and no alignment with NCA ECC for operational technology.",
      solution: "Samurai delivered a comprehensive OT security program including network segmentation, SCADA monitoring, anomaly detection, and NCA ECC compliance mapping.",
      results: "Full OT network visibility achieved. NCA ECC OT requirements met. Zero unplanned OT downtime in 12 months post-implementation.",
    },
  ],
} as const;

export default caseStudies;
export type CaseStudiesMessages = typeof caseStudies;
