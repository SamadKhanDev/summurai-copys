const about = {
  breadcrumb: "About",
  label: "About Samurai Systems",
  title: "We Build ",
  titleAccent: "Long-Term Partnerships.",
  description: "Founded in Dubai in 2010 by industry experts, Samurai Systems has expanded to five countries, delivering customer-focused IT solutions. We provide not only high-quality enterprise solutions but also ensure seamless integration with back-office systems and mobile interfaces in a unified stack.",
  mission: {
    label: "OUR MISSION",
    title: "Deliver excellence, nothing less.",
    description: "Our team of solution architects, developers, and consultants share a single mission: to empower organizations to thrive in a fast-evolving digital world — from securing critical infrastructure to modernizing IT operations.",
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
      excellence: {
        title: "Excellence",
        description: "We deliver excellence, nothing less. Every engagement, every deliverable, every client interaction is held to the highest standard.",
      },
      partnership: {
        title: "Partnership",
        description: "We build long-term relationships, not transactional engagements. Your success is our success, and we measure ourselves by your outcomes.",
      },
      security: {
        title: "Security-First",
        description: "Security is embedded in everything we do — not an afterthought. We build resilience from the ground up in every solution we deliver.",
      },
      expertise: {
        title: "Regional Expertise",
        description: "Deep roots in the Kingdom, global reach across five countries. We combine local regulatory knowledge with world-class technology expertise.",
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
