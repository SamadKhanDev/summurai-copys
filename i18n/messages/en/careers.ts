const careers = {
  breadcrumb: "Careers",
  label: "Careers",
  title: "Build the Future of ",
  titleAccent: "Digital Resilience.",
  description: "Join a team that's at the forefront of enterprise cybersecurity, AI, and digital transformation across Saudi Arabia and the Gulf.",
  noOpenings: {
    title: "No openings currently",
    description: "We don't have any open positions right now, but we're always interested in exceptional talent. Send us your CV and we'll keep you in mind for future opportunities.",
  },
  benefits: {
    offices: {
      title: "Global Offices",
      description: "Work from Riyadh, Dubai, Karachi, Calgary, or Melbourne — with opportunities across our international footprint.",
    },
    work: {
      title: "Cutting-Edge Work",
      description: "Work on complex enterprise security, AI, and transformation engagements for the Kingdom's most important organizations.",
    },
    growth: {
      title: "Growth Culture",
      description: "We invest in our people. Continuous learning, certifications, and career development are built into our culture.",
    },
  },
  form: {
    title: "Submit Your CV",
    fields: {
      name: {
        label: "Full Name *",
        placeholder: "Your full name",
      },
      email: {
        label: "Email *",
        placeholder: "you@email.com",
      },
      role: {
        label: "Role of Interest",
        placeholder: "e.g. Security Engineer, Cloud Architect, GRC Consultant",
      },
      cv: {
        label: "CV / Resume *",
      },
    },
    submit: "Submit CV →",
    success: "Thank you! We'll be in touch if a suitable role opens up.",
  },
} as const;

export default careers;
export type CareersMessages = typeof careers;
