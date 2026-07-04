const privacy = {
  meta: {
    label: "Legal",
    title: "Privacy ",
    titleAccent: "Policy",
    lastUpdated: "Effective Date: May 4, 2025",
    intro:
      "Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our service. By accessing or using this site, you agree to this Privacy Policy. This policy may change from time to time — your continued use of this website after we make changes is deemed to be acceptance of those changes.",
    appliesTo: "This Privacy Policy applies to https://samurai.systems.",
  },

  sections: [
    {
      key: "introduction",
      number: "01",
      title: "Introduction",
      content:
        "At Samurai, your privacy is important to us. This Privacy Policy outlines the types of personal data we collect, how we use it, and your rights regarding your information.",
    },
    {
      key: "dataCollected",
      number: "02",
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you contact us, request an assessment, or submit a form on our website.",
      items: [
        "Personal identification information (name, email, phone number)",
        "Technical data (IP address, browser type, device information)",
        "Usage data (pages visited, time spent on site)",
      ],
    },
    {
      key: "dataUse",
      number: "03",
      title: "How We Use Your Data",
      content: "We use the information we collect to:",
      items: [
        "Provide and improve our services",
        "Respond to inquiries or support requests",
        "Send relevant marketing communications (if you opt-in)",
        "Comply with our legal obligations",
      ],
    },
    {
      key: "dataSharing",
      number: "04",
      title: "Sharing Your Information",
      content:
        "We do not sell your personal information. We may share data with trusted third-party service providers under strict confidentiality agreements to help us operate our website and deliver services.",
    },
    {
      key: "dataSecurity",
      number: "05",
      title: "Data Security",
      content:
        "We implement appropriate technical and organisational security measures to protect your data against unauthorised access, alteration, disclosure, or destruction.",
    },
    {
      key: "yourRights",
      number: "06",
      title: "Your Rights",
      content: "You have the right to:",
      items: [
        "Access the data we hold about you",
        "Request corrections or deletions",
        "Withdraw consent at any time",
      ],
    },
    {
      key: "contact",
      number: "07",
      title: "Contact Us",
      content:
        "If you have questions or concerns about this Privacy Policy, please reach out to us:",
      contactEmail: "connect@samurai.systems",
      contactAddress: "Samurai, https://samurai.systems",
    },
  ],
} as const;

export default privacy;
export type PrivacyMessages = typeof privacy;