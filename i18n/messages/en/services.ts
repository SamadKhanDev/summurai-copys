const services = {
  breadcrumb: "Services",
  hero: {
    label: "Our Services",
    title: "Seven Pillars. ",
    titleAccent: "One Operating System.",
    description: "A holistic ecosystem engineered to protect, modernize, and scale your most critical digital assets — fully aligned with Saudi regulatory frameworks.",
  },
  cyber: {
    breadcrumb: "Incident Response & Forensics",
    label: "Services / Incident Response",
    title: "Incident Response & ",
    titleAccent: "Forensics",
    description: "Expert support for cyber incident response and investigation.",
    items: {
      forensics: {
        title: "Cyber Forensics",
        description: "Investigate cyber incidents to understand what happened, identify the source of the attack, collect digital evidence, and help prevent similar incidents in the future.",
      },
      response: {
        title: "Incident Response",
        description: "Respond quickly to cyberattacks by containing threats, reducing damage, recovering affected systems, and restoring normal business operations as soon as possible.",
      },
      investigation: {
        title: "Threat Investigation",
        description: "Monitor and investigate suspicious activities, identify potential attackers, understand how they operate, and improve your organization's overall security.",
      },
      recovery: {
        title: "Recovery and Prevention",
        description: "Recover from security incidents, restore critical systems, fix vulnerabilities, and implement stronger security measures to reduce the risk of future attacks.",
      },
      malware: {
        title: "Malware Analysis",
        description: "Detect, analyze, and remove malware from your systems. Understand how malicious software affects your environment and take steps to prevent future infections.",
      },
    },
    cta: "Request Incident Support →",
  },
  cloud: {
    breadcrumb: "OT Security Solutions",
    label: "Services / OT Security",
    title: "OT Security ",
    titleAccent: "Solutions",
    description: "Protect your OT systems with solutions that improve network visibility, reduce security risks, and keep your operations, people, and business secure.",
    items: {
      risk: {
        title: "Risk Assessment",
        description: "Identify possible security risks and weaknesses in your systems before they become serious problems. This helps protect your business and reduce potential threats.",
      },
      asset: {
        title: "OT Security and Asset Management",
        description: "Protect your Operational Technology (OT) systems by finding vulnerabilities, keeping an updated inventory of devices and software, and improving system design and security settings.",
      },
      compliance: {
        title: "Compliance and Security Management",
        description: "Meet industry regulations and security standards with expert guidance. Strengthen your security policies and ensure your business stays compliant and protected.",
      },
      protection: {
        title: "Cybersecurity Protection",
        description: "Keep your business safe from cyber threats with advanced security solutions, including malware protection, cloud security, network security, threat detection, and regular security testing.",
      },
    },
    cta: "Talk to Our OT Security Team →",
  },
  grc: {
    breadcrumb: "GRC & Compliance",
    label: "Services / GRC",
    title: "GRC & ",
    titleAccent: "Compliance",
    description: "A strong GRC strategy helps businesses manage risks, follow laws and regulations, and achieve long-term growth. It improves daily operations, builds trust with stakeholders, and keeps compliance simple and cost-effective.",
    items: {
      nca: {
        title: "NCA Cybersecurity Compliance Services",
        description: "We help organizations achieve compliance with the National Cybersecurity Authority (NCA) Cybersecurity Framework by implementing security controls, strengthening governance, and protecting critical systems, data, and infrastructure.",
      },
      sama: {
        title: "SAMA Cybersecurity & BCM Implementation",
        description: "Our experts assist organizations in adopting the SAMA Cybersecurity and Business Continuity Management (BCM) Frameworks to improve cyber resilience, safeguard critical assets, and comply with SAMA regulations.",
      },
      aramco: {
        title: "Saudi Aramco Cybersecurity Compliance",
        description: "Our experts provide implementation, assessment, and audit services for the Saudi Aramco Cybersecurity Standard (SACS-002), helping organizations strengthen security and meet third-party compliance requirements",
      },
      risk: {
        title: "Cybersecurity Risk Assessment",
        description: "Our cybersecurity risk assessment services identify potential threats, evaluate vulnerabilities, and recommend practical solutions to reduce risk and improve your organization's security posture.",
      },
      iso: {
        title: "Implementing ISO Standards",
        description: "Implementing ISO standards can seem overwhelming and stressful for organizations of any size. A company's preparation for ISO implementation depends on several factors, including",
      },
    },
    cta: "Book a Compliance Review →",
  },
  infrastructure: {
    breadcrumb: "Technical Consulting Services",
    label: "Services / Technical Consulting",
    title: "Technical Consulting ",
    titleAccent: "Services",
    description: "Align your technology with your business goals through expert consulting. Samurai helps businesses improve efficiency, strengthen cybersecurity, adopt new technologies, and achieve sustainable growth with cost-effective and practical solutions.",
    items: {
      securityOps: {
        title: "Security Operations Consulting",
        description: "Get expert guidance to strengthen your security operations and stay protected against evolving cyber threats.",
      },
      securityPlanning: {
        title: "Security Planning and Procedures",
        description: "Develop clear security policies, processes, and best practices to keep your systems secure and well-managed.",
      },
      techPlanning: {
        title: "Technology Planning and Support",
        description: "Receive expert advice on choosing the right technologies and creating a clear roadmap for successful implementation.",
      },
      assessment: {
        title: "IT and Security Assessment",
        description: "Review your IT systems and cybersecurity setup to identify weaknesses, improve performance, and strengthen overall security.",
      },
    },
    cta: "Book a Consulting Session →",
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
    breadcrumb: "Training & Awareness",
    label: "Services / Training & Awareness",
    title: "From Vision to ",
    titleAccent: "Security Awareness",
    description: "Help your employees recognize cyber threats, avoid security risks, and follow safe online practices with flexible cybersecurity training that strengthens your organization's security.",
    items: {
      techAwareness: {
        title: "Technology Awareness Training",
        description: "Build your team's knowledge of technology and cybersecurity with practical training that improves awareness and promotes safe digital practices.",
      },
      isoTraining: {
        title: "ISO 27001 Training",
        description: "Learn the principles of ISO 27001 and develop the skills needed to manage and improve information security systems.",
      },
      certifications: {
        title: "Professional Cybersecurity Certifications",
        description: "Prepare for industry-recognized certifications such as CISSP, SSCP, and CISM with expert-led training to strengthen your cybersecurity skills and advance your career.",
      },
      lms1: {
        title: "Learning Management System (LMS)",
        description: "Manage and deliver online training with an easy-to-use learning platform that helps employees develop their skills.",
      },
      securityAwareness: {
        title: "Security Awareness Programs",
        description: "Train employees to recognize cyber threats, avoid phishing attacks, and follow safe online practices to protect your organization.",
      },
      lms2: {
        title: "Learning Management System (LMS)",
        description: "Manage and deliver online training with an easy-to-use learning platform that helps employees develop their skills.",
      },
    },
    cta: "Explore Training Programs →",
  },
  dt: {
    breadcrumb: "Digital Transformation",
    label: "Services / Digital Transformation",
    title: "Digital Transformation That ",
    titleAccent: "Drives Success",
    description: "Focused on enabling businesses to transform digitally, streamline operations, and foster innovation.",
    items: {
      strategy: {
        title: "IT Strategy and Planning",
        description: "Build a strong IT foundation through strategic budgeting, system assessments, security planning, and technology roadmaps aligned with your long-term business goals.",
      },
      iot: {
        title: "IoT Solutions and Integration",
        description: "End-to-end IoT services include smart device setup, custom software development, seamless system integration, and real-time insights to improve business performance.",
      },
      experience: {
        title: "Digital Experience and Smart Solutions",
        description: "Enhance customer experiences with intuitive UI/UX design, mobile applications, AI chatbots, and AR/VR solutions that support digital transformation.",
      },
      analytics: {
        title: "Data Analytics and Business Intelligence",
        description: "Turn business data into actionable insights with analytics, business intelligence, and big data solutions for smarter decisions and improved performance.",
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
