const solutions = {
  breadcrumb: "Solutions",
  label: "Solutions",
  title: "Business-Challenge ",
  titleAccent: "Lens",
  description: "For visitors who think in problems, not service categories. Find the right solution for your security, compliance, or operational challenge.",
  items: {
    grc: {
      title: "Governance, Risk & Compliance (GRC)",
      description: "Comprehensive GRC programs highlighting NCA ECC, PDPL, SAMA — from policy development to vCISO advisory and audit readiness.",
      link: "Explore →",
    },
    iam: {
      title: "Identity & Access Management (IAM)",
      description: "MFA, directory services, and identity lifecycle management ensuring only the right people access the right resources.",
      link: "Explore →",
    },
    pam: {
      title: "Privileged Access Management (PAM)",
      description: "Dedicated Wallix PAM solution: IT/OT coverage, insider threat protection, session recording, and flexible deployment options.",
      link: "Explore Wallix PAM →",
      highlighted: true,
    },
    securityOps: {
      title: "Security Operations",
      description: "SOC-as-a-service, SIEM/SOAR integration, and 24×7 monitoring with full MITRE ATT&CK framework alignment.",
      link: "Explore →",
    },
    cloudModernization: {
      title: "Cloud Modernization",
      description: "Migration, optimization, and multi-cloud management across Azure, AWS, Oracle OCI and SITE Cloud.",
      link: "Explore →",
    },
    businessResilience: {
      title: "Business Resilience",
      description: "BCM and DR combined as a unified resilience solution — ensuring your organization can withstand and recover from any disruption.",
      link: "Explore →",
    },
  },
  pam: {
    breadcrumb: "PAM (Wallix)",
    label: "Solutions / PAM",
    title: "Privileged Access Management ",
    titleAccent: "with Wallix",
    description: "Comprehensive Privileged Access Management — protecting your most sensitive accounts, systems, and data from insider threats and external attacks.",
    items: {
      integration: {
        title: "Wallix Integration",
        description: "Deep integration with Wallix PAM — industry-leading privileged session management, password vaulting, and access controls deployed in your environment.",
      },
      coverage: {
        title: "IT & OT Coverage",
        description: "Unified PAM coverage across IT and OT environments — protecting both enterprise systems and operational technology from privileged misuse.",
      },
      insider: {
        title: "Insider Threat Protection",
        description: "Session recording, behavioral analytics, and real-time alerts that detect and respond to suspicious privileged activity before damage occurs.",
      },
      deployment: {
        title: "Flexible Deployment",
        description: "On-premise, cloud, or hybrid deployment options — with full support for regulated and sovereign environments requiring data residency.",
      },
    },
    cta: "Request PAM Assessment →",
  },
} as const;

export default solutions;
export type SolutionsMessages = typeof solutions;
