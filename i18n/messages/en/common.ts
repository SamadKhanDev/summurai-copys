const common = {
  buttons: {
    learnMore: "Learn More →",
    explore: "Explore →",
    readMore: "Read More →",
    viewAll: "View All →",
    bookBriefing: "Book a Briefing",
    contactUs: "Contact Us",
    getStarted: "Get Started",
    submit: "Submit",
    send: "Send",
    goHome: "Go Home →",
  },
  breadcrumb: {
    home: "Home",
  },
  languageSwitcher: {
    label: "Language",
    english: "EN",
    arabic: "AR",
  },
} as const;

export default common;
export type CommonMessages = typeof common;
