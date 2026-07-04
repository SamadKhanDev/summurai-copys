const contact = {
  breadcrumb: "Contact",
  label: "Contact",
  title: "Let's Build a Smarter, ",
  titleAccent: "Safer Tomorrow.",
  form: {
    title: "Send a Briefing Request",
    fields: {
      fullName: {
        label: "Full Name *",
        placeholder: "Your full name",
      },
      organization: {
        label: "Organization *",
        placeholder: "Company or organization",
      },
      email: {
        label: "Corporate Email *",
        placeholder: "you@company.com",
      },
      phone: {
        label: "Phone",
        placeholder: "+966 xx xxx xxxx",
      },
      service: {
        label: "Service of Interest",
        placeholder: "Select a service",
        options: [
          "Select a service",
          "Cybersecurity & Managed SOC",
          "Cloud & IT Operations",
          "GRC & Compliance",
          "Business Continuity Management",
          "AI & Automation",
          "Digital Transformation",
          "PAM (Wallix)",
          "Other",
        ],
      },
      inquiry: {
        label: "Brief Inquiry",
        placeholder: "Tell us about your challenge or what you'd like to discuss...",
      },
    },
    submit: "Send Briefing Request →",
    success: "Thank you for reaching out. A Samurai expert will contact you within one business day.",
  },
  info: {
    title: "Contact Information",
    headquarters: {
      label: "Headquarters",
      address: "Office 804, Abdar Commercial Complex\nRiyadh, Saudi Arabia",
    },
    email: {
      label: "Email",
      value: "connect@samurai.systems",
    },
    phone: {
      label: "Phone",
      value: "+966 11 292 3918",
    },
    website: {
      label: "Website",
      value: "www.samurai.systems",
    },
    offices: {
      title: "Other Offices",
      dubai: "Dubai, United Arab Emirates",
      karachi: "Karachi, Pakistan",
      calgary: "Calgary, Canada",
      melbourne: "Melbourne, Australia",
    },
    affiliate: {
      title: "An Affiliate of Neusol",
      description: "Samurai Systems is an affiliate of Neusol, delivering customer-focused enterprise IT solutions since 2010.",
    },
  },
} as const;

export default contact;
export type ContactMessages = typeof contact;
