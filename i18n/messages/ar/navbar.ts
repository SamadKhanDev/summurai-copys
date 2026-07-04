const navbar = {
  brand: "SAMURAI",
  brandDot: ".",
  brandSuffix: "SYSTEMS",
  links: {
    home: "الرئيسية",
    services: "الخدمات",
    solutions: "الحلول",
    industries: "القطاعات",
    about: "من نحن",
    partners: "الشركاء",
    insights: "الآراء والأفكار",
    contact: "تواصل معنا",
  },
  dropdowns: {
    services: {
      all: "جميع الخدمات",
      cyber: "الأمن السيبراني ومركز العمليات الأمنية (SOC)",
      cloud: "السحابة وعمليات تقنية المعلومات",
      grc: "الحوكمة والمخاطر والالتزام (GRC)",
      dt: "التحول الرقمي",
      bcm: "استمرارية الأعمال",
      ai: "الذكاء الاصطناعي والأتمتة",
      infras: "السحابة والبنية التحتية",
    },
    solutions: {
      all: "جميع الحلول",
      pam: "إدارة الوصول المميز (PAM - Wallix)",
      grc: "الحوكمة والمخاطر والالتزام",
      iam: "إدارة الهوية والوصول (IAM)",
      cloudModernization: "تحديث البنية السحابية",
      securityOperations: "العمليات الأمنية",
      businessResilience: "المرونة المؤسسية",
    },
    industries: {
      all: "جميع القطاعات",
      financial: "الخدمات المالية",
      government: "القطاع الحكومي",
      healthcare: "الرعاية الصحية",
      energy: "الطاقة",
      education: "التعليم",
      enterprise: "الشركات والمؤسسات",
    },
    about: {
      overview: "نبذة عن الشركة",
      leadership: "فريق القيادة",
      global: "التواجد العالمي",
      certifications: "الشهادات والاعتمادات",
    },
  },
  cta: {
    assessment: "Get Assessment",
    contact: "تواصل معنا",
  },
} as const;

export default navbar;
export type NavbarMessages = typeof navbar;