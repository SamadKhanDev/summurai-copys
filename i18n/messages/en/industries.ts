const industries = {
  breadcrumb: "Industries",
  label: "Industries",
  title: "We Know ",
  titleAccent: "Your Sector.",
  description: "Saudi enterprise buyers need to see their own sector. Our solutions are tailored to the regulatory and operational realities of your industry.",
  sectors: {
    financial: {
      title: "Financial Services",
      description: "Comprehensive security, resilience, and compliance services for banks, insurers, and financial institutions operating under Saudi Arabia's most demanding regulatory environment.",
      tags: ["SAMA BCM", "PDPL", "NCA ECC", "Risk Management", "Operational Resilience"],
      testimonial: {
        quote: "They walked into a 15-foot spreadsheet and walked out leaving us with six. The board can finally read the risk dashboard without a translator.",
        author: "CISO, Saudi Financial Institution",
      },
    },
    government: {
      title: "Government",
      description: "Data sovereignty, on-premise deployment, and critical infrastructure security for government entities aligned with NDMO mandates and Vision 2030 digital transformation goals.",
      tags: ["NDMO", "Data Sovereignty", "On-Prem Deployment", "Critical Infrastructure"],
    },
    healthcare: {
      title: "Healthcare",
      description: "Patient data security and regulatory compliance for healthcare providers, clinics, and the Ministry of Health — protecting sensitive medical records while enabling digital innovation.",
      tags: ["Patient Data Security", "PDPL", "Ministry of Health", "Regulatory Compliance"],
    },
    energy: {
      title: "Energy",
      description: "OT/ICS and SCADA security, NCA ECC compliance, and operational continuity for energy companies and critical infrastructure operators across the Kingdom.",
      tags: ["OT/ICS", "SCADA", "NCA ECC", "Operational Continuity", "Aramco-tier"],
    },
    education: {
      title: "Education",
      description: "Securing academic institutions and e-learning platforms with appropriate data protection, identity management, and compliance frameworks for the education sector.",
      tags: ["Data Protection", "IAM", "PDPL"],
    },
    enterprise: {
      title: "Enterprise",
      description: "Scalable digital transformation, managed services, and end-to-end IT modernization for large enterprises seeking a reliable long-term technology partner.",
      tags: ["Digital Transformation", "Managed Services", "Scalability"],
    },
  },
} as const;

export default industries;
export type IndustriesMessages = typeof industries;
