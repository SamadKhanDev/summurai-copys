const assessment = {
  breadcrumb: "Get Assessment",
  label: "Free Resilience Health Check",
  title: "Briefing. ",
  titleAccent: "Not Pitch.",
  description: "A free 30-minute resilience health check with a Samurai expert. We'll assess your current security posture, identify gaps, and give you a clear picture of where you stand — no sales agenda, no pressure.",
  benefits: {
    time: {
      title: "30 Minutes",
      description: "A focused, structured conversation — not a sales call.",
    },
    assessment: {
      title: "Honest Assessment",
      description: "We tell you where you are. No fluff, no fear-mongering.",
    },
    roadmap: {
      title: "Clear Next Steps",
      description: "Walk away with a prioritized roadmap, not a lengthy proposal.",
    },
  },
  form: {
    title: "Start Your Assessment",
    fields: {
      fullName: { label: "Full Name *", placeholder: "Your full name" },
      organization: { label: "Organization *", placeholder: "Company or organization name" },
      email: { label: "Corporate Email *", placeholder: "you@yourcompany.com" },
      companySize: {
        label: "Company Size",
        options: [
          "Select company size",
          "1–50 employees",
          "51–250 employees",
          "251–1,000 employees",
          "1,001–5,000 employees",
          "5,000+ employees",
        ],
      },
      posture: {
        label: "Current Security Posture",
        options: [
          "Select current posture",
          "No formal security program",
          "Basic controls in place",
          "Mature security program",
          "Fully certified (ISO/NCA)",
        ],
      },
      concern: {
        label: "Biggest Concern",
        options: [
          "Select primary concern",
          "Regulatory compliance (NCA/PDPL/SAMA)",
          "Cyber threats & ransomware",
          "Operational resilience / DR",
          "Cloud security",
          "Insider threats / PAM",
          "AI & automation governance",
        ],
      },
      contact: {
        label: "Preferred Contact Method",
        options: ["Email", "Phone call", "WhatsApp", "Video call"],
      },
    },
    submit: "Request Free Assessment →",
    success: "Thank you! A Samurai expert will be in touch within one business day.",
  },
} as const;

export default assessment;
export type AssessmentMessages = typeof assessment;
