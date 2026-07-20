const about = {
  breadcrumb: "About",
  label: "About Samurai Systems",
  title: "We Build ",
  titleAccent: "Excellence Through Collaboration",
  description: "Founded in Dubai in 2010, Samurai Systems delivers customer-focused IT and cybersecurity solutions across five countries. We provide enterprise technology, seamless system integration, and comprehensive cybersecurity services—including consulting, implementation, monitoring, and support—to protect your infrastructure, data, and people with trusted expertise.",
  mission: {
    label: "Our Mission",
    title: "Secure, Innovate, Grow.",
    description: "To protect businesses with innovative cybersecurity solutions, expert guidance, and proactive support, ensuring secure, resilient, and future-ready digital operations.",
  },
  stats: {
    founded: { value: "2010", label: "Year Founded" },
    countries: { value: "5", label: "Countries" },
    clients: { value: "2,800+", label: "Clients Served" },
    expertise: { value: "15+", label: "Years of Expertise" },
  },
  leadership: {
    label: "Leadership Team",
    title: "The Team Behind ",
    titleAccent: "the Mission.",
    team: {
      ceo: {
        avatar: "CEO",
        title: "Chief Executive Officer",
        location: "Riyadh, Saudi Arabia",
        description: "Driving Samurai's vision of digital resilience across the Kingdom and beyond since 2010.",
      },
      cto: {
        avatar: "CTO",
        title: "Chief Technology Officer",
        location: "Dubai, UAE",
        description: "Architecting the technical foundations that power enterprise transformation at scale.",
      },
      cso: {
        avatar: "CSO",
        title: "Chief Security Officer",
        location: "Riyadh, Saudi Arabia",
        description: "Leading Samurai's cybersecurity practice with deep expertise in NCA ECC and MITRE ATT&CK.",
      },
      coo: {
        avatar: "COO",
        title: "Chief Operating Officer",
        location: "Karachi, Pakistan",
        description: "Ensuring operational excellence across all delivery engagements in five countries.",
      },
    },
  },
  global: {
    label: "Global Presence",
    title: "Global Reach. ",
    titleAccent: "Local Insight.",
    cities: {
      riyadh: { name: "Riyadh", location: "HQ — Saudi Arabia" },
      dubai: { name: "Dubai", location: "UAE Hub" },
      karachi: { name: "Karachi", location: "Pakistan" },
      calgary: { name: "Calgary", location: "Canada" },
      melbourne: { name: "Melbourne", location: "Australia" },
    },
  },
  values: {
    label: "Mission & Values",
    items: {
      trust: {
        title: "Trust",
        description: "We build lasting relationships through honesty, transparency, and reliability. Trust is the foundation of every client partnership and every solution we deliver.",
      },
      security: {
        title: "Security",
        description: "Protecting your business is our highest priority. We deliver robust cybersecurity solutions that safeguard your data, systems, and digital infrastructure against evolving threats.",
      },
      collaboration: {
        title: "Collaboration",
        description: "We believe the best results come from working together. By partnering closely with our clients and technology partners, we create tailored solutions that drive shared success.",
      },
      innovation: {
        title: "Innovation",
        description: "We continuously embrace emerging technologies and forward-thinking strategies to deliver smarter, more efficient, and future-ready IT solutions that help businesses grow with confidence.",
      },
    },
  },
  certifications: {
    label: "Certifications & Alliances",
    badges: [
      { name: "NCA ECC", active: true },
      { name: "PDPL", active: true },
      { name: "NDMO", active: true },
      { name: "ISO 27001", active: true },
      { name: "ISO 22301", active: true },
      { name: "ISO 27701", active: true },
      { name: "SAMA BCM", active: true },
      { name: "Cisco Partner", active: false },
      { name: "Microsoft Partner", active: false },
      { name: "IBM Partner", active: false },
      { name: "Fortinet Partner", active: false },
      { name: "Wallix Partner", active: false },
    ],
  },
} as const;

export default about;
export type AboutMessages = typeof about;
