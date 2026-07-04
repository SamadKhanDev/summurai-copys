const services = {
  breadcrumb: "Services",
  hero: {
    label: "Our Services",
    title: "Seven Pillars. ",
    titleAccent: "One Operating System.",
    description: "A holistic ecosystem engineered to protect, modernize, and scale your most critical digital assets — fully aligned with Saudi regulatory frameworks.",
  },
  cyber: {
    breadcrumb: "Cybersecurity & Managed SOC",
    label: "Services / Cybersecurity",
    title: "Cybersecurity & ",
    titleAccent: "Managed SOC",
    description: "End-to-end protection for the enterprise — proactive, integrated cybersecurity operations that safeguard data, infrastructure, and people.",
    items: {
      soc: {
        title: "Managed SOC (24×7)",
        description: "Continuous monitoring, detection & incident response. Threat hunting, alert triage, and vulnerability prioritization aligned with MITRE ATT&CK and NCA ECC frameworks.",
        tags: ["SIEM", "SOAR", "EDR/XDR", "24×7"],
      },
      infraProtection: {
        title: "Infrastructure Protection",
        description: "Next-gen Firewalls, IDS/IPS, WAF, DLP, and Endpoint Security. IAM, PAM, MFA, and Zero Trust Architecture. CSPM and configuration hardening.",
        tags: ["NGFW", "Zero Trust", "PAM/IAM", "CSPM"],
      },
      dfir: {
        title: "DFIR & Threat Intelligence",
        description: "Real-time threat visibility and correlation. Digital forensics, incident investigation, and malware analysis. Rapid containment and NCA-compliant reporting.",
        tags: ["DFIR", "Forensics", "Threat Intel"],
      },
      vapt: {
        title: "VA/PT & Red Teaming",
        description: "Comprehensive network, web, and application testing. Red team & adversary simulation aligned with NCA and MITRE frameworks. Continuous vulnerability management.",
        tags: ["Red Team", "VAPT", "Pen Testing"],
      },
      cloudOt: {
        title: "Cloud & OT Security",
        description: "DevSecOps integration, API & SaaS security testing. Cloud-native protection (CSPM, CWPP, CASB). OT/ICS & SCADA network monitoring, segmentation, and anomaly detection.",
        tags: ["DevSecOps", "OT/ICS", "SCADA", "CASB"],
      },
    },
    cta: "Request Security Assessment →",
  },
  cloud: {
    breadcrumb: "Cloud & IT Operations",
    label: "Services / Cloud & IT",
    title: "Cloud & ",
    titleAccent: "IT Operations",
    description: "Enterprise-grade IT operations management with 24×7 monitoring, proactive maintenance, and SLA-driven service delivery ensuring uninterrupted business continuity.",
    items: {
      management: {
        title: "Cloud Management",
        description: "Unified management across Azure, AWS, Oracle OCI, and SITE Cloud — with security, cost transparency, and automated scaling.",
      },
      outsourcing: {
        title: "IT Outsourcing",
        description: "Flexible models — on-site, hybrid, or fully managed. ITSM-based operations and full-stack monitoring with L1–L3 support escalation.",
      },
      patch: {
        title: "Patch & Configuration",
        description: "Patch management, Office 365/Azure administration, and hardware baseline deployments. Keep your environment current and hardened.",
      },
      optimization: {
        title: "Capacity & Cost Optimization",
        description: "Cloud cost optimization, capacity planning, and performance tuning across multi-cloud environments to maximize ROI.",
      },
    },
    cta: "Talk to Our Infrastructure Team →",
  },
  grc: {
    breadcrumb: "GRC & Compliance",
    label: "Services / GRC",
    title: "GRC & ",
    titleAccent: "Compliance",
    description: "Strong governance is the foundation of resilient digital operations. We align your cybersecurity and data protection programs with NCA ECC, PDPL, and international frameworks.",
    items: {
      regulatory: {
        title: "Regulatory Alignment",
        description: "NCA ECC, PDPL, NDMO, and ISO 27001/22301/27701 alignment. We translate complex mandates into actionable programs.",
        tags: ["NCA ECC", "PDPL", "NDMO"],
      },
      policy: {
        title: "Policy Development",
        description: "Comprehensive policy and procedure development tailored to your organizational context and regulatory environment.",
      },
      vciso: {
        title: "vCISO Advisory",
        description: "Virtual CISO and governance advisory services — executive-level security leadership without the full-time overhead.",
      },
      audit: {
        title: "Gap Assessments & Audit Readiness",
        description: "Compliance gap assessments, remediation roadmaps, and full audit readiness support for internal and external reviewers.",
      },
    },
    cta: "Book a Compliance Review →",
  },
  infrastructure: {
    breadcrumb: "Cloud & Infrastructure",
    label: "Services / Cloud & Infrastructure",
    title: "Cloud & ",
    titleAccent: "Infrastructure",
    description:
      "Unified management across data centers and multi-cloud platforms with security, cost transparency, and automated scaling. Network, server, and endpoint administration with patch and configuration control.",
    items: {
      multicloud: {
        title: "Multi-Cloud Platform Management",
        description:
          "Centralized operations across Azure, AWS, SITE Cloud, and Oracle OCI — with cost transparency, automated scaling, and unified governance across all environments.",
        tags: ["Azure", "AWS", "SITE Cloud", "Oracle OCI"],
      },
      cspm: {
        title: "Cloud Security Posture Management",
        description:
          "Continuous misconfiguration detection, compliance benchmarking, and automated remediation across your cloud estate — enforcing Zero Trust principles at scale.",
      },
      ot: {
        title: "OT/ICS & SCADA Monitoring",
        description:
          "Specialized monitoring and protection for operational technology environments — including industrial control systems and SCADA networks — aligned with NCA OT controls.",
      },
      operations: {
        title: "Network & Endpoint Operations",
        description:
          "Full-lifecycle network, server, and endpoint administration with automated patch management, configuration control, and 24×7 health monitoring across on-premise and cloud workloads.",
      },
    },
    cta: "Book an Infrastructure Review →",
  },
  bcm: {
    breadcrumb: "Business Continuity",
    label: "Services / BCM",
    title: "Business Continuity ",
    titleAccent: "Management",
    description: "Enterprise-grade BCM programs fully aligned with SAMA BCM Framework and ISO 22301 — covering governance, risk, continuity strategies, and full technical DR implementation.",
    steps: [
      {
        number: "01",
        title: "SAMA BCM Framework",
        description: "End-to-end delivery of SAMA's BCM regulatory requirements — covering governance structures, BIA, recovery strategies, and testing cycles.",
      },
      {
        number: "02",
        title: "ISO 22301 Certification Readiness",
        description: "Gap assessments, BCMS design, documentation, internal audits, and certification readiness aligned with ISO 22301 international standards.",
      },
      {
        number: "03",
        title: "Business Impact Analysis",
        description: "Identifying critical business functions, RTOs, RPOs, and single points of failure to build a risk-informed continuity strategy.",
      },
      {
        number: "04",
        title: "Technical Disaster Recovery",
        description: "Design and implementation of DR environments — active-passive, active-active — across on-premise, cloud, and hybrid infrastructure with automated failover.",
      },
      {
        number: "05",
        title: "DR Testing & Simulation",
        description: "Structured DR drills, tabletop exercises, and full failover tests validated against RTOs and RPOs with NCA-compliant reporting.",
      },
      {
        number: "06",
        title: "BCM Governance & Training",
        description: "BCM policy development, crisis management plans, staff awareness programs, and executive reporting dashboards.",
      },
    ],
    cta: "Get BCM Assessment →",
  },
  ai: {
    breadcrumb: "AI & Automation",
    label: "Services / AI & Automation",
    title: "From Vision to ",
    titleAccent: "Intelligent Enterprise",
    description: "We help organizations operationalize AI responsibly, transforming data into decisions, automating critical processes, and enhancing efficiency across the enterprise — with full governance and compliance alignment.",
    items: {
      strategy: {
        title: "AI Strategy & Consulting",
        description: "Develop AI roadmaps aligned with enterprise goals, compliance frameworks, and ethical governance standards.",
      },
      analytics: {
        title: "Predictive Analytics & ML",
        description: "Advanced models for demand forecasting, anomaly detection, and performance optimization across business processes.",
      },
      conversational: {
        title: "Conversational AI & NLP",
        description: "Build multilingual chatbots and virtual assistants that improve customer engagement and automate support workflows.",
      },
      vision: {
        title: "Computer Vision & OCR",
        description: "Automate visual inspection, data extraction, and identity validation using AI and OCR models at scale.",
      },
      agents: {
        title: "AI Agents & Automation",
        description: "Integrate AI agents (LangChain, AutoGPT) for decision support, threat detection, and workflow orchestration.",
      },
      infrastructure: {
        title: "AI Infrastructure",
        description: "On-premise AI deployment and AI service enablement for sovereign, regulated environments requiring data residency.",
      },
    },
    cta: "Schedule AI Consultation →",
  },
  dt: {
    breadcrumb: "Digital Transformation",
    label: "Services / Digital Transformation",
    title: "Digital Transformation & ",
    titleAccent: "Analytics",
    description: "Modernizing legacy applications and core business platforms for cloud readiness. Streamlining workflows using RPA, API integration, and unified data warehouses.",
    items: {
      modernization: {
        title: "Enterprise Application Modernization",
        description: "Migrate, re-architect, and modernize legacy systems for cloud readiness and improved business agility.",
      },
      rpa: {
        title: "RPA & Process Automation",
        description: "Streamline workflows using Robotic Process Automation and API integration to eliminate manual bottlenecks.",
      },
      custom: {
        title: "Custom Software Development",
        description: "Bespoke enterprise applications built to your specifications, integrated with your existing technology stack.",
      },
      analytics: {
        title: "Power BI & Data Analytics",
        description: "Unified data warehouses, Power BI dashboards, and analytics platforms that turn data into executive-ready insights.",
      },
    },
    cta: "Start Your Transformation →",
  },
  overview: {
    title: "🛡️ Cybersecurity & Managed SOC",
    description: "Advanced threat intelligence and incident response engineered for radical digital resilience. 24×7 monitoring, detection & incident response powered by SIEM, SOAR, and EDR/XDR.",
    tags: ["SIEM/SOAR", "EDR/XDR", "NCA ECC", "MITRE ATT&CK", "Zero Trust", "VA/PT"],
    link: "Explore →",
  },
} as const;

export default services;
export type ServicesMessages = typeof services;
