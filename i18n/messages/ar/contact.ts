const contact = {
  breadcrumb: "اتصل بنا",
  label: "تواصل معنا",
  title: "لنعمل معاً لبناء غدٍ ",
  titleAccent: "أكثر ذكاءً وأماناً.",
  form: {
    title: "إرسال طلب إحاطة",
    fields: {
      fullName: {
        label: "الاسم الكامل *",
        placeholder: "اسمك الكامل",
      },
      organization: {
        label: "المؤسسة / الشركة *",
        placeholder: "اسم الشركة أو المؤسسة",
      },
      email: {
        label: "البريد الإلكتروني للعمل *",
        placeholder: "you@company.com",
      },
      phone: {
        label: "رقم الهاتف",
        placeholder: "+966 xx xxx xxxx",
      },
      service: {
        label: "الخدمة المطلوبة",
        placeholder: "اختر الخدمة",
        options: [
          "اختر الخدمة",
          "الأمن السيبراني ومركز العمليات الأمنية (Managed SOC)",
          "السحابة وعمليات تقنية المعلومات",
          "الحوكمة والمخاطر والالتزام (GRC)",
          "إدارة استمرارية الأعمال",
          "الذكاء الاصطناعي والأتمتة",
          "التحول الرقمي",
          "إدارة الوصول المميز (PAM - Wallix)",
          "أخرى",
        ],
      },
      inquiry: {
        label: "استفسار موجز",
        placeholder: "أخبرنا عن التحدي الذي تواجهه أو ما ترغب في مناقشته...",
      },
    },
    submit: "إرسال طلب الإحاطة ←",
    success: "نشكرك على تواصلك معنا. سيتصل بك أحد خبراء ساموراي خلال يوم عمل واحد.",
  },
  info: {
    title: "معلومات الاتصال",
    headquarters: {
      label: "المقر الرئيسي",
      address: "مكتب 804، مجمع عبدار التجاري\nالرياض، المملكة العربية السعودية",
    },
    email: {
      label: "البريد الإلكتروني",
      value: "connect@samurai.systems",
    },
    phone: {
      label: "الهاتف",
      value: "+966 11 292 3918",
    },
    website: {
      label: "الموقع الإلكتروني",
      value: "www.samurai.systems",
    },
    offices: {
      title: "مكاتبنا الأخرى",
      dubai: "دبي، الإمارات العربية المتحدة",
      karachi: "كراتشي، باكستان",
      calgary: "كالغاري، كندا",
      melbourne: "ملبورن، أستراليا",
    },
    affiliate: {
      title: "شركة تابعة لـ نيوسول",
      description: "ساموراي سيستمز هي شركة تابعة لـ نيوسول (Neusol)، تقدم حلول تقنية معلومات متمحورة حول العميل للمؤسسات منذ عام 2010.",
    },
  },
} as const;

export default contact;
export type ContactMessages = typeof contact;
