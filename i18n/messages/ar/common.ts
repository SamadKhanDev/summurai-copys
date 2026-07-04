const common = {
  buttons: {
    learnMore: "تعرف على المزيد ←",
    explore: "استكشف ←",
    readMore: "اقرأ المزيد ←",
    viewAll: "عرض الكل ←",
    bookBriefing: "احجز جلسة تعريفية",
    contactUs: "اتصل بنا",
    getStarted: "ابدأ الآن",
    submit: "إرسال",
    send: "إرسال",
    goHome: "العودة للرئيسية ←",
  },
  breadcrumb: {
    home: "الرئيسية",
  },
  languageSwitcher: {
    label: "اللغة",
    english: "EN",
    arabic: "AR",
  },
} as const;

export default common;
export type CommonMessages = typeof common;
