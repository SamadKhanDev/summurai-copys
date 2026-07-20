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
    title: "Secure Privileged Access ",
    titleAccent: "with Wallix",
    description: "Enterprise-grade control over privileged identities — securing your critical accounts, infrastructure, and sensitive data against both internal risks and advanced external threats.",
    items: {
      integration: {
        title: "Wallix Integration",
        description: "Seamless deployment of Wallix PAM within your environment — bringing world-class privileged session governance, secure credential vaulting, and fine-grained access policies out of the box.",
      },
      coverage: {
        title: "IT & OT Coverage",
        description: "End-to-end privileged access visibility across both traditional IT infrastructure and industrial operational technology — eliminating blind spots that attackers exploit.",
      },
      insider: {
        title: "Insider Threat Protection",
        description: "Continuous session recording, user behavior analysis, and instant alerting that identify and contain abnormal privileged activity before any harm is done.",
      },
      deployment: {
        title: "Flexible Deployment",
        description: "Choose the model that fits your architecture — on-premises, cloud-hosted, or hybrid — with dedicated support for sovereign and regulated environments with strict data locality requirements.",
      },
      audit: {
        title: "Audit & Compliance Readiness",
        description: "Build a complete, tamper-proof record of every privileged session to confidently meet regulatory obligations across NCA, SAMA, ISO, and other compliance frameworks.",
      },
      access: {
        title: "Granular Access Control",
        description: "Apply least-privilege principles through just-in-time access grants, passwordless connections, and precise command-level restrictions — minimizing your attack surface at every layer.",
      },
    },
    cta: "Request PAM Assessment →",
  },
} as const;

export default solutions;
export type SolutionsMessages = typeof solutions;
