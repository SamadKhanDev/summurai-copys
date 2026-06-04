const footer = {
  brand: {
    name: "SAMURAI",
    dot: ".",
    suffix: "SYSTEMS",
    description: "ساموراي سيستمز — شركة تابعة لـ نيوسول (Neusol). نبني شراكات طويلة الأمد تمكّن المؤسسات من الازدهار في عالم رقمي سريع التطور.",
    email: "connect@samurai.systems",
    phone: "+966 11 292 3918",
    affiliate: "شركة تابعة لـ نيوسول",
  },
  services: {
    title: "الخدمات",
    cyber: "الأمن السيبراني ومركز SOC",
    cloud: "السحابة وعمليات تقنية المعلومات",
    grc: "الحوكمة والمخاطر والالتزام",
    ai: "الذكاء الاصطناعي والأتمتة",
    bcm: "استمرارية الأعمال",
    dt: "التحول الرقمي",
  },
  company: {
    title: "الشركة",
    about: "من نحن",
    careers: "الوظائف",
    partners: "الشركاء",
    caseStudies: "دراسات الحالة",
    insights: "الآراء والأفكار",
  },
  solutions: {
    title: "الحلول",
    pam: "إدارة الوصول المميز (PAM - Wallix)",
    grc: "الحوكمة والمخاطر والالتزام",
    iam: "إدارة الهوية والوصول (IAM)",
    cloudModernization: "تحديث البنية السحابية",
    securityOps: "العمليات الأمنية",
    businessResilience: "المرونة المؤسسية",
  },
  legal: {
    title: "قانوني",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    cookies: "سياسة ملفات الارتباط",
    careers: "الوظائف",
    sitemap: "خريطة الموقع",
  },
  bottom: {
    copyright: "© 2025 ساموراي سيستمز — شركة تابعة لـ نيوسول | جميع الحقوق محفوظة",
    privacy: "الخصوصية",
    terms: "الشروط",
    linkedin: "لينكد إن",
    languages: "العربية | الإنجليزية",
  },
  whatsapp: {
    title: "تحدث معنا عبر واتساب",
  },
} as const;

export default footer;
export type FooterMessages = typeof footer;
