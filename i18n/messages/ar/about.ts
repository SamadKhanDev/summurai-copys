const about = {
  breadcrumb: "من نحن",
  label: "عن ساموراي سيستمز",
  title: "نبني شراكات ",
  titleAccent: "طويلة الأمد.",
  description: "تأسست ساموراي سيستمز في دبي عام 2010 على يد خبراء في القطاع، وتوسعت لتغطي خمس دول، مقدمةً حلول تقنية معلومات متمحورة حول العميل. نحن لا نقدم حلولاً برمجية عالية الجودة للمؤسسات فحسب، بل نضمن أيضاً تكاملها السلس مع الأنظمة الخلفية وواجهات الأجهزة المحمولة في بيئة موحدة.",
  mission: {
    label: "مهمتنا",
    title: "تقديم التميز، ولا شيء أقل من ذلك.",
    description: "يتشارك فريقنا من مهندسي الحلول والمطورين والاستشاريين في مهمة واحدة: تمكين المؤسسات من الازدهار في عالم رقمي سريع التطور — بدءاً من تأمين البنية التحتية الحيوية وحتى تحديث عمليات تقنية المعلومات.",
  },
  stats: {
    founded: { value: "2010", label: "عام التأسيس" },
    countries: { value: "5", label: "الدول" },
    clients: { value: "2,800+", label: "العملاء المستفيدون" },
    expertise: { value: "15+", label: "عاماً من الخبرة" },
  },
  leadership: {
    label: "فريق القيادة",
    title: "الفريق الذي يقف وراء ",
    titleAccent: "المهمة.",
    team: {
      ceo: {
        avatar: "CEO",
        title: "الرئيس التنفيذي",
        location: "الرياض، المملكة العربية السعودية",
        description: "يقود رؤية ساموراي لتعزيز المرونة الرقمية في جميع أنحاء المملكة وخارجها منذ عام 2010.",
      },
      cto: {
        avatar: "CTO",
        title: "المدير التقني التنفيذي",
        location: "دبي، الإمارات العربية المتحدة",
        description: "يصمم القواعد التقنية الأساسية التي تدعم التحول المؤسسي على نطاق واسع.",
      },
      cso: {
        avatar: "CSO",
        title: "رئيس قطاع الأمن السيبراني",
        location: "الرياض، المملكة العربية السعودية",
        description: "يقود ممارسات الأمن السيبراني في ساموراي بخبرة عميقة في ضوابط NCA ECC ومصفوفة MITRE ATT&CK.",
      },
      coo: {
        avatar: "COO",
        title: "رئيس العمليات التشغيلية",
        location: "كراتشي، باكستان",
        description: "يضمن التميز التشغيلي في تقديم كافة المشاريع والخدمات عبر خمس دول.",
      },
    },
  },
  global: {
    label: "التواجد العالمي",
    title: "انتشار عالمي. ",
    titleAccent: "رؤية محلية.",
    cities: {
      riyadh: { name: "الرياض", location: "المقر الرئيسي — المملكة العربية السعودية" },
      dubai: { name: "دبي", location: "مركز الإمارات العربية المتحدة" },
      karachi: { name: "كراتشي", location: "باكستان" },
      calgary: { name: "كالغاري", location: "كندا" },
      melbourne: { name: "ملبورن", location: "أستراليا" },
    },
  },
  values: {
    label: "المهمة والقيم",
    items: {
      excellence: {
        title: "التميز",
        description: "نحن نقدم التميز، ولا شيء أقل من ذلك. كل مشروع، وكل مخرج، وكل تفاعل مع العملاء يخضع لأعلى معايير الجودة.",
      },
      partnership: {
        title: "الشراكة",
        description: "نبني علاقات طويلة الأمد، وليست مجرد معاملات تجارية عابرة. نجاحكم هو نجاحنا، ونقيس تميزنا بالنتائج التي تحققونها.",
      },
      security: {
        title: "الأمن أولاً",
        description: "الأمن السيبراني مدمج في كل ما نقوم به — وليس مجرد فكرة لاحقة. نبني المرونة الرقمية من الأساس في كل حل نقدمه.",
      },
      expertise: {
        title: "الخبرة الإقليمية",
        description: "جذور عميقة في المملكة، وامتداد عالمي عبر خمس دول. نجمع بين المعرفة التامة باللوائح والتشريعات المحلية والخبرة التقنية العالمية.",
      },
    },
  },
  certifications: {
    label: "الشهادات والتحالفات",
    badges: [
      { name: "NCA ECC", active: true },
      { name: "PDPL", active: true },
      { name: "NDMO", active: true },
      { name: "ISO 27001", active: true },
      { name: "ISO 22301", active: true },
      { name: "ISO 27701", active: true },
      { name: "SAMA BCM", active: true },
      { name: "Cisco Partner", active: false },
      { name: "Microsoft Partner", active: false },
      { name: "IBM Partner", active: false },
      { name: "Fortinet Partner", active: false },
      { name: "Wallix Partner", active: false },
    ],
  },
} as const;

export default about;
export type AboutMessages = typeof about;
