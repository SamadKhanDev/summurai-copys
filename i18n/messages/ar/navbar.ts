const navbar = {
  brand: "ساموراي",
  brandDot: ".",
  brandSuffix: "سيستمز",
  links: {
    about: "من نحن",
    services: "الخدمات",
    ai: "حلول الذكاء الاصطناعي",
    compliance: "الامتثال",
    cybersecurity: "الأمن السيبراني",
    contact: "تواصل معنا",
  },
  cta: "حجز جلسة تعريفية",
} as const;

export default navbar;
export type NavbarMessages = typeof navbar;