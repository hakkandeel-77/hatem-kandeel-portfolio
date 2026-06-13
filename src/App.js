import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeTab, setActiveTab] = useState('microsoft');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';
  const audioRef = useRef(null);

  const titlesEn = [
    'Senior Business Development & Commercial Manager',
    'Strategic Partnerships Expert',
    'B2B Sales Leader',
    'Data-Driven Growth Strategist'
  ];
  const titlesAr = [
    'مدير تطوير الأعمال والمبيعات التجارية',
    'خبير الشراكات الاستراتيجية',
    'قائد مبيعات B2B',
    'استراتيجي النمو المبني على البيانات'
  ];
  const titles = isAr ? titlesAr : titlesEn;
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setText('');
    setCharIndex(0);
  }, [lang]);

  useEffect(() => {
    const current = titles[titleIndex];
    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + current[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText('');
        setCharIndex(0);
        setTitleIndex(prev => (prev + 1) % titles.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, titleIndex, lang]);

  // ===================== EXPERIENCES =====================
  const experiencesEn = [
    { period:'Dec 2021 – Present', title:'Sales Manager', company:'Egyptian Company for Security Systems', location:'Sharqia, Egypt', points:[
      'Lead sales operations in the security systems sector, driving B2B growth and key account acquisition',
      'Manage full sales cycle: opportunity identification, negotiation, proposals, pricing, and contract closure',
      'Expand market presence across multiple regions and governorates',
      'Conduct forecasting, planning, and performance monitoring',
      'Deliver technical training for clients and internal teams',
      'Strengthen long-term relationships with key clients and institutional accounts',
      'Improved sales processes and operational reporting in coordination with management',
    ]},
    { period:'Oct 2011 – Sep 2020', title:'Founder & General Manager', company:'Egyptian Co. for Trade & Contract', location:'New Cairo, Egypt', points:[
      'Founded the company from scratch with 3 employees and scaled to 50+ engineers, technicians, and admin staff',
      'Sustained profitability for 9 consecutive years, achieving 200% revenue growth',
      'Expanded from a single office to a multi-branch company across multiple governorates',
      'Managed all business functions: BD, technical operations, procurement, finance, HR, and client relations',
      'Built strong partnerships with government entities and major private sector clients',
      'Personally oversaw installation, programming, and maintenance of complex surveillance systems',
      'Designed and improved internal sales processes, reporting structures, and CRM workflows',
      'Managed branch expansion, regional growth activities, and organizational development',
    ]},
    { period:'Aug 2008 – Sep 2011', title:'Sales Supervisor', company:'Tanko Egypt — Water Tanks & Filters', location:'Cairo, Egypt', points:[
      'Supervised and coached a cross-functional sales and telesales team',
      'Took full ownership of the CRM system — managing and optimizing it for lead tracking and performance reporting',
      'Designed structured training programs on product knowledge and customer communication',
      'Registered company with government institutions, unlocking new formal procurement channels',
      'Participated in industry exhibitions and prepared customized product presentations',
      'Achieved 120% of sales targets while successfully expanding into new markets and establishing a network of agents across 6 governorates',
      'Supported logistics coordination, order fulfillment, and operational reporting',
    ]},
    { period:'Oct 2003 – Dec 2007', title:'Project & Community Development Specialist', company:'Agricultural Services Project — World Bank, IFAD & Egyptian Government', location:'Port Said, Egypt', points:[
      'Worked on a nationally significant initiative co-funded by the World Bank, IFAD, and Egyptian Government',
      'Led establishment and legal registration of Water User Associations across rural communities',
      'Coordinated high-level field visits for World Bank, IFAD, and government delegations',
      'Prepared detailed progress reports and presentations for international donors and senior government leadership',
      'Served on official procurement committees ensuring full compliance with international donor policies',
      'Exceeded 6-month growth targets by 170%, successfully establishing five user boards of directors and transitioning the project from preparation to full execution phase',
    ]},
    { period:'Sep 2002 – Aug 2003', title:'Administrative Social Worker', company:'Ministry of Water Resources and Irrigation', location:'Zagazig, Egypt', points:[
      'Key liaison between the Ministry and local Water User Associations',
      'Identified and resolved internal conflicts, providing on-ground social support',
      'Prepared field and administrative reports and participated in official meetings',
      'Contributed to strengthening community engagement in rural water resource management',
    ]},
    { period:'Apr 2001 – Aug 2002', title:'Financial & Admin Affairs Officer', company:'Water Boards Project — Dutch & Egyptian Government', location:'Zagazig, Egypt', points:[
      'Served in a prestigious joint initiative between the Dutch and Egyptian governments',
      'Managed all document flow, correspondence, and communication between field staff and senior management',
      'Coordinated vehicle movements, field schedules, logistics planning, and daily operations',
      'Handled office procurement, expense tracking, and administrative compliance',
    ]},
  ];

  const experiencesAr = [
    { period:'ديسمبر 2021 – حتى الآن', title:'مدير مبيعات', company:'الشركة المصرية لأنظمة الأمن', location:'الشرقية، مصر', points:[
      'قيادة عمليات المبيعات في قطاع أنظمة الأمن، ودفع نمو B2B واستقطاب العملاء الرئيسيين',
      'إدارة دورة المبيعات الكاملة: تحديد الفرص، التفاوض، المقترحات، التسعير، وإغلاق العقود',
      'توسيع الحضور السوقي عبر مناطق ومحافظات متعددة',
      'إجراء التوقعات والتخطيط ومتابعة الأداء',
      'تقديم تدريب تقني للعملاء والفرق الداخلية',
      'تعزيز العلاقات طويلة الأمد مع العملاء الرئيسيين والحسابات المؤسسية',
      'تحسين عمليات المبيعات والتقارير التشغيلية بالتنسيق مع الإدارة',
    ]},
    { period:'أكتوبر 2011 – سبتمبر 2020', title:'المؤسس والمدير العام', company:'الشركة المصرية للتجارة والمقاولات', location:'القاهرة الجديدة، مصر', points:[
      'أسست الشركة من الصفر بـ 3 موظفين ووسّعتها لأكثر من 50 مهندس وفني وموظف إداري',
      'حافظت على الربحية لمدة 9 سنوات متتالية، محققاً نمواً في الإيرادات بنسبة 200%',
      'التوسع من مكتب واحد إلى شركة متعددة الفروع عبر محافظات متعددة',
      'إدارة جميع وظائف الأعمال: تطوير الأعمال، العمليات التقنية، المشتريات، المالية، الموارد البشرية، وعلاقات العملاء',
      'بناء شراكات قوية مع الجهات الحكومية وكبار عملاء القطاع الخاص',
      'الإشراف الشخصي على تركيب وبرمجة وصيانة أنظمة المراقبة المعقدة',
      'تصميم وتحسين عمليات المبيعات الداخلية وهياكل التقارير وسير عمل CRM',
      'إدارة توسع الفروع وأنشطة النمو الإقليمي والتطوير التنظيمي',
    ]},
    { period:'أغسطس 2008 – سبتمبر 2011', title:'مشرف مبيعات', company:'تانكو مصر — خزانات المياه والفلاتر', location:'القاهرة، مصر', points:[
      'الإشراف على فريق المبيعات والمبيعات الهاتفية متعدد الوظائف وتدريبه',
      'تولي المسؤولية الكاملة لنظام CRM — إدارته وتحسينه لتتبع العملاء المحتملين وتقارير الأداء',
      'تصميم برامج تدريبية منظمة حول معرفة المنتج والتواصل مع العملاء',
      'تسجيل الشركة لدى المؤسسات الحكومية، مما فتح قنوات مشتريات رسمية جديدة',
      'المشاركة في المعارض الصناعية وإعداد عروض تقديمية مخصصة للمنتجات',
      'تحقيق 120% من أهداف المبيعات مع التوسع في أسواق جديدة وإنشاء شبكة وكلاء في 6 محافظات',
      'دعم تنسيق الخدمات اللوجستية وتنفيذ الطلبات والتقارير التشغيلية',
    ]},
    { period:'أكتوبر 2003 – ديسمبر 2007', title:'أخصائي تنمية مجتمعية ومشاريع', company:'مشروع الخدمات الزراعية — البنك الدولي، إيفاد والحكومة المصرية', location:'بورسعيد، مصر', points:[
      'العمل في مبادرة وطنية بالغة الأهمية بتمويل مشترك من البنك الدولي وإيفاد والحكومة المصرية',
      'قيادة تأسيس وتسجيل جمعيات مستخدمي المياه قانونياً في المجتمعات الريفية',
      'تنسيق الزيارات الميدانية رفيعة المستوى لوفود البنك الدولي وإيفاد والحكومة',
      'إعداد تقارير التقدم التفصيلية والعروض التقديمية للجهات المانحة الدولية وقيادة الحكومة',
      'العمل في لجان المشتريات الرسمية لضمان الامتثال الكامل لسياسات الجهات المانحة الدولية',
      'تجاوز أهداف النمو لمدة 6 أشهر بنسبة 170%، وتأسيس خمسة مجالس إدارة بنجاح ونقل المشروع من مرحلة الإعداد إلى مرحلة التنفيذ الكامل',
    ]},
    { period:'سبتمبر 2002 – أغسطس 2003', title:'أخصائي اجتماعي إداري', company:'وزارة الموارد المائية والري', location:'الزقازيق، مصر', points:[
      'الحلقة الرئيسية الرابطة بين الوزارة وجمعيات مستخدمي المياه المحلية',
      'تحديد النزاعات الداخلية وحلها، وتقديم الدعم الاجتماعي الميداني',
      'إعداد التقارير الميدانية والإدارية والمشاركة في الاجتماعات الرسمية',
      'المساهمة في تعزيز مشاركة المجتمع في إدارة موارد المياه الريفية',
    ]},
    { period:'أبريل 2001 – أغسطس 2002', title:'مسؤول الشؤون المالية والإدارية', company:'مشروع مجالس المياه — الحكومتان الهولندية والمصرية', location:'الزقازيق، مصر', points:[
      'خدمت في مبادرة مشتركة مرموقة بين الحكومتين الهولندية والمصرية',
      'إدارة جميع تدفقات المستندات والمراسلات والتواصل بين الموظفين الميدانيين والإدارة العليا',
      'تنسيق حركة المركبات والجداول الزمنية الميدانية والتخطيط اللوجستي والعمليات اليومية',
      'التعامل مع مشتريات المكتب وتتبع المصروفات والامتثال الإداري',
    ]},
  ];

  const experiences = isAr ? experiencesAr : experiencesEn;

  // ===================== HARD SKILLS =====================
  const hardSkillsEn = [
    { icon:'📈', name:'Business Development', level:95, desc:'Identifying growth opportunities, building partnerships, and expanding market presence across multiple sectors' },
    { icon:'🤝', name:'B2B Sales & Negotiation', level:95, desc:'Managing full sales cycles from prospecting to closing high-value deals with corporate and government clients' },
    { icon:'🌐', name:'Strategic Partnerships', level:90, desc:'Building and maintaining long-term relationships with key stakeholders, institutions, and business partners' },
    { icon:'🗺️', name:'Market Expansion', level:90, desc:'Researching and penetrating new markets, developing go-to-market strategies across multiple regions' },
    { icon:'🔒', name:'Security & Surveillance Systems', level:90, desc:'Full technical expertise in CCTV, access control, and security system installation, programming and maintenance' },
    { icon:'🗂️', name:'CRM Systems & Strategy', level:85, desc:'Managing and optimizing CRM platforms to improve lead tracking, client follow-up, and sales performance' },
    { icon:'📊', name:'Data Analysis', level:85, desc:'Analyzing business data using Excel and Power BI to extract insights and support strategic decision-making' },
    { icon:'💹', name:'Power BI', level:80, desc:'Building interactive dashboards and reports to visualize KPIs and business performance metrics' },
    { icon:'📋', name:'Advanced Excel', level:85, desc:'Advanced formulas, pivot tables, data modeling, conditional formatting, and automated reporting' },
    { icon:'🎯', name:'Project Management', level:85, desc:'Planning, executing, and monitoring projects from initiation to delivery using structured methodologies' },
    { icon:'⚙️', name:'Operations Management', level:85, desc:'Streamlining business operations using the 4Ds framework: Define, Design, Deliver, Develop' },
    { icon:'📦', name:'Procurement & Logistics', level:80, desc:'Managing vendor selection, purchasing processes, and supply chain coordination for operational efficiency' },
    { icon:'📝', name:'Report Writing & Documentation', level:85, desc:'Preparing formal reports and presentations for international donors, government bodies, and senior management' },
    { icon:'💼', name:'Microsoft Office', level:90, desc:'Advanced proficiency in Word, Excel, and PowerPoint for professional business communication' },
    { icon:'🤖', name:'AI Tools & Prompt Engineering', level:75, desc:'Applying AI tools and prompt engineering techniques to enhance productivity and business workflows' },
    { icon:'🎬', name:'Motion Infographics', level:65, desc:'Creating animated infographics using Adobe Illustrator, After Effects, and Adobe Audition' },
    { icon:'🌐', name:'Introduction to Networking', level:70, desc:'Understanding network components, types, DNS, and basic network design and configuration' },
    { icon:'🐍', name:'Python Programming', level:40, inProgress:true, desc:'Currently learning Python for data analysis, automation, and business intelligence applications' },
    { icon:'🇬🇧', name:'English Language', level:60, inProgress:true, desc:'Actively improving spoken and written English for professional business communication' },
  ];

  const hardSkillsAr = [
    { icon:'📈', name:'تطوير الأعمال', level:95, desc:'تحديد فرص النمو وبناء الشراكات وتوسيع الحضور السوقي عبر قطاعات متعددة' },
    { icon:'🤝', name:'مبيعات B2B والتفاوض', level:95, desc:'إدارة دورات المبيعات الكاملة من الاستقطاب حتى إغلاق الصفقات عالية القيمة مع العملاء المؤسسيين والحكوميين' },
    { icon:'🌐', name:'الشراكات الاستراتيجية', level:90, desc:'بناء علاقات طويلة الأمد والحفاظ عليها مع أصحاب المصلحة الرئيسيين والمؤسسات وشركاء الأعمال' },
    { icon:'🗺️', name:'التوسع في الأسواق', level:90, desc:'البحث والاختراق في أسواق جديدة وتطوير استراتيجيات الدخول إلى السوق عبر مناطق متعددة' },
    { icon:'🔒', name:'أنظمة الأمن والمراقبة', level:90, desc:'خبرة تقنية كاملة في كاميرات المراقبة والتحكم في الوصول وتركيب أنظمة الأمن وبرمجتها وصيانتها' },
    { icon:'🗂️', name:'أنظمة CRM والاستراتيجية', level:85, desc:'إدارة وتحسين منصات CRM لتحسين تتبع العملاء المحتملين ومتابعة العملاء وأداء المبيعات' },
    { icon:'📊', name:'تحليل البيانات', level:85, desc:'تحليل بيانات الأعمال باستخدام Excel وPower BI لاستخراج الرؤى ودعم اتخاذ القرارات الاستراتيجية' },
    { icon:'💹', name:'Power BI', level:80, desc:'بناء لوحات بيانات وتقارير تفاعلية لتصور مؤشرات الأداء الرئيسية ومقاييس أداء الأعمال' },
    { icon:'📋', name:'Excel المتقدم', level:85, desc:'الصيغ المتقدمة وجداول Pivot ونمذجة البيانات والتنسيق الشرطي والتقارير الآلية' },
    { icon:'🎯', name:'إدارة المشاريع', level:85, desc:'تخطيط وتنفيذ ومراقبة المشاريع من البداية حتى التسليم باستخدام منهجيات منظمة' },
    { icon:'⚙️', name:'إدارة العمليات', level:85, desc:'تبسيط عمليات الأعمال باستخدام إطار 4Ds: التعريف والتصميم والتسليم والتطوير' },
    { icon:'📦', name:'المشتريات والخدمات اللوجستية', level:80, desc:'إدارة اختيار الموردين وعمليات الشراء وتنسيق سلسلة التوريد لتحقيق الكفاءة التشغيلية' },
    { icon:'📝', name:'كتابة التقارير والتوثيق', level:85, desc:'إعداد تقارير وعروض رسمية للجهات المانحة الدولية والهيئات الحكومية والإدارة العليا' },
    { icon:'💼', name:'Microsoft Office', level:90, desc:'إتقان متقدم لبرامج Word وExcel وPowerPoint للتواصل المهني في الأعمال' },
    { icon:'🤖', name:'أدوات الذكاء الاصطناعي وهندسة الأوامر', level:75, desc:'تطبيق أدوات الذكاء الاصطناعي وتقنيات هندسة الأوامر لتعزيز الإنتاجية وسير عمل الأعمال' },
    { icon:'🎬', name:'الإنفوجرافيك المتحرك', level:65, desc:'إنشاء إنفوجرافيك متحرك باستخدام Adobe Illustrator وAfter Effects وAdobe Audition' },
    { icon:'🌐', name:'مقدمة في الشبكات', level:70, desc:'فهم مكونات الشبكات وأنواعها و DNS وتصميم الشبكات الأساسية وتكوينها' },
    { icon:'🐍', name:'برمجة Python', level:40, inProgress:true, desc:'أتعلم حالياً Python لتحليل البيانات والأتمتة وتطبيقات ذكاء الأعمال' },
    { icon:'🇬🇧', name:'اللغة الإنجليزية', level:60, inProgress:true, desc:'أعمل باستمرار على تحسين الإنجليزية المنطوقة والمكتوبة للتواصل المهني في الأعمال' },
  ];

  const hardSkills = isAr ? hardSkillsAr : hardSkillsEn;

  // ===================== SOFT SKILLS =====================
  const softSkillsEn = [
    { icon:'👑', name:'Leadership & Team Building', desc:'Built and led teams of 50+ across technical, sales, and administrative functions' },
    { icon:'🗺️', name:'Strategic Planning & Vision', desc:'Translating long-term business goals into actionable plans with measurable outcomes' },
    { icon:'🌍', name:'Stakeholder Management', desc:'Managing relationships with international institutions, government bodies, and private sector partners' },
    { icon:'🌏', name:'Cross-cultural Communication', desc:'Collaborating effectively with Dutch, Italian, Egyptian, and international teams and institutions' },
    { icon:'💡', name:'Problem Solving & Decision Making', desc:'Turning complex operational and business challenges into practical, results-driven solutions' },
    { icon:'✍️', name:'Negotiation & Closing', desc:'Structuring and closing high-value deals while maintaining long-term client relationships' },
    { icon:'🏗️', name:'Field Operations & Community Training', desc:'Leading on-ground implementation, community awareness, and hands-on staff training programs' },
    { icon:'⚡', name:'Fast Learning & Adaptability', desc:'Rapidly acquiring new technical and business skills — from CRM systems to AI tools and coding' },
    { icon:'🔍', name:'Attention to Detail', desc:'Ensuring precision in proposals, reports, contracts, and technical documentation' },
    { icon:'📌', name:'KPI Monitoring & Reporting', desc:'Tracking performance metrics and translating data into actionable business insights' },
    { icon:'💻', name:'Digital Literacy', desc:'Comfortable navigating modern digital tools, platforms, and emerging technologies' },
    { icon:'🎤', name:'Communication & Presentation', desc:'Delivering clear, persuasive presentations to senior management, clients, and international bodies' },
  ];

  const softSkillsAr = [
    { icon:'👑', name:'القيادة وبناء الفريق', desc:'بنيت وقدت فرق تضم أكثر من 50 فرداً عبر الوظائف التقنية والمبيعات والإدارية' },
    { icon:'🗺️', name:'التخطيط الاستراتيجي والرؤية', desc:'ترجمة أهداف الأعمال طويلة الأمد إلى خطط قابلة للتنفيذ بنتائج قابلة للقياس' },
    { icon:'🌍', name:'إدارة أصحاب المصلحة', desc:'إدارة العلاقات مع المؤسسات الدولية والهيئات الحكومية وشركاء القطاع الخاص' },
    { icon:'🌏', name:'التواصل متعدد الثقافات', desc:'التعاون الفعّال مع الفرق والمؤسسات الهولندية والإيطالية والمصرية والدولية' },
    { icon:'💡', name:'حل المشكلات واتخاذ القرار', desc:'تحويل التحديات التشغيلية والأعمال المعقدة إلى حلول عملية تحقق النتائج' },
    { icon:'✍️', name:'التفاوض وإغلاق الصفقات', desc:'هيكلة وإغلاق الصفقات عالية القيمة مع الحفاظ على علاقات العملاء طويلة الأمد' },
    { icon:'🏗️', name:'العمليات الميدانية وتدريب المجتمع', desc:'قيادة التنفيذ الميداني وتوعية المجتمع وبرامج تدريب الموظفين العملية' },
    { icon:'⚡', name:'التعلم السريع والتكيف', desc:'اكتساب المهارات التقنية والأعمال الجديدة بسرعة — من أنظمة CRM إلى أدوات الذكاء الاصطناعي والبرمجة' },
    { icon:'🔍', name:'الاهتمام بالتفاصيل', desc:'ضمان الدقة في المقترحات والتقارير والعقود والتوثيق التقني' },
    { icon:'📌', name:'مراقبة مؤشرات الأداء والتقارير', desc:'تتبع مقاييس الأداء وترجمة البيانات إلى رؤى أعمال قابلة للتنفيذ' },
    { icon:'💻', name:'الكفاءة الرقمية', desc:'إتقان التنقل في الأدوات الرقمية الحديثة والمنصات والتقنيات الناشئة' },
    { icon:'🎤', name:'التواصل والعرض التقديمي', desc:'تقديم عروض واضحة ومقنعة للإدارة العليا والعملاء والهيئات الدولية' },
  ];

  const softSkills = isAr ? softSkillsAr : softSkillsEn;

  // ===================== CERT TABS =====================
  const certTabsEn = [
    { id:'microsoft', label:'🏆 Microsoft', count:10 },
    { id:'dubai', label:'⭐ Dubai Future', count:2 },
    { id:'edraak', label:'📚 Edraak', count:7 },
    { id:'older', label:'📜 Other', count:4 },
    { id:'appreciation', label:'🎖️ Appreciation', count:2 },
  ];

  const certTabsAr = [
    { id:'microsoft', label:'🏆 مايكروسوفت', count:10 },
    { id:'dubai', label:'⭐ مستقبل دبي', count:2 },
    { id:'edraak', label:'📚 إدراك', count:7 },
    { id:'older', label:'📜 أخرى', count:4 },
    { id:'appreciation', label:'🎖️ تقدير', count:2 },
  ];

  const certTabs = isAr ? certTabsAr : certTabsEn;

  // ===================== CERTIFICATES =====================
  const certificatesEn = {
    microsoft: [
      { name:'Get Data in Power BI', img:'powerbi1.jpg', year:'2026', desc:'Connecting to various data sources and importing datasets into Power BI for analysis and reporting' },
      { name:'Build Visuals with Power BI', img:'powerbi2.jpg', year:'2026', desc:'Creating compelling charts, graphs, and visual elements to represent business data effectively' },
      { name:'Design Reports in Power BI', img:'powerbi3.jpg', year:'2026', desc:'Designing professional, interactive reports with advanced layout and formatting techniques' },
      { name:'Data Analysis Exploration', img:'powerbi4.jpg', year:'2026', desc:'Exploring and analyzing datasets to uncover trends, patterns, and actionable business insights' },
      { name:'Clean & Transform Data', img:'powerbi5.jpg', year:'2026', desc:'Using Power Query to clean, shape, and transform raw data into analysis-ready formats' },
      { name:'Data Model Framework', img:'powerbi6.jpg', year:'2026', desc:'Building and testing robust data models with relationships, measures, and calculated columns' },
      { name:'End-to-End Analytics with MS Fabric', img:'powerbi7.jpg', year:'2026', desc:'Implementing complete analytics solutions using Microsoft Fabric for enterprise-level data workflows' },
      { name:'Configure a Semantic Model', img:'powerbi8.jpg', year:'2026', desc:'Setting up and optimizing semantic models to enable accurate and efficient data analysis' },
      { name:'Copilot in Power BI', img:'powerbi9.jpg', year:'2026', desc:'Leveraging AI-powered Copilot features to generate reports and insights using natural language' },
      { name:'Report Design Scope', img:'powerbi10.jpg', year:'2026', desc:'Defining report requirements and translating business needs into effective dashboard specifications' },
    ],
    dubai: [
      { name:'AI Prompt Engineering — English', img:'dubai1.jpg', year:'2026', desc:'Mastering prompt engineering techniques for AI systems — part of the 1 Million Prompters initiative by Dubai Future Foundation' },
      { name:'هندسة الأوامر — Arabic', img:'dubai2.jpg', year:'2026', desc:'إتقان مهارات هندسة الأوامر للذكاء الاصطناعي — مبادرة مليون خبير للأوامر من مؤسسة دبي للمستقبل' },
    ],
    edraak: [
      { name:'Motion Infographics', img:'motion.jpg', year:'2026', desc:'Creating animated infographics using Adobe Illustrator, After Effects, and Adobe Audition for professional visual storytelling' },
      { name:'Introduction to AI', img:'ai.jpg', year:'2026', desc:'Understanding AI fundamentals, machine learning algorithms, neural networks, and real-world AI applications' },
      { name:'Advanced Excel', img:'excel.jpg', year:'2026', desc:'Advanced MS Excel skills including conditional formats, functions, charts, pivot tables, and automated reporting' },
      { name:'Customer Relationship Management', img:'crm.jpg', year:'2026', desc:'Applying CRM concepts and strategies to build sustainable customer relationships and support business growth' },
      { name:'Operations Management', img:'operations.jpg', year:'2026', desc:'Understanding core operations management concepts using the 4Ds framework for strategic business delivery' },
      { name:'Project Management Foundation', img:'project.jpg', year:'2026', desc:'Essential project management skills, tools, and methodologies for initiating and delivering successful projects' },
      { name:'Introduction to Networking', img:'networking.jpg', year:'2026', desc:'Understanding network fundamentals, components, types, DNS, and practical wired/wireless network configuration' },
    ],
    older: [
      { name:'Effective Communication Skills', img:'communication.jpg', year:'2008', desc:'Comprehensive communication seminar by Dr. Ibrahim Elfiky — Canadian Training Center of Human Development' },
      { name:'Customs Clearance', img:'customs.jpg', year:'2006', desc:'Professional training on customs clearance operations — Egyptian Customs Authority, Ministry of Finance' },
      { name:'English Language — Level 3', img:'english.jpg', year:'2001', desc:'Third level English language certification — Sesco Language & Computer Center, Zagazig' },
      { name:'Irrigation & Drainage Problem Solving', img:'irrigation.jpg', year:'2001', desc:'Technical training on solving irrigation and drainage challenges in North Sharqia — Nile Media & Training Center' },
    ],
    appreciation: [
      { name:'Water Guidance Appreciation', img:'appreciation1.jpg', year:'-', desc:'Official appreciation certificate for outstanding contribution to water guidance and irrigation management programs' },
      { name:'Board of Directors Appreciation', img:'appreciation2.jpg', year:'-', desc:'Recognition from the Board of Directors for exceptional performance, leadership, and professional excellence' },
    ],
  };

  const certificatesAr = {
    microsoft: [
      { name:'الحصول على البيانات في Power BI', img:'powerbi1.jpg', year:'2026', desc:'الاتصال بمصادر البيانات المتنوعة واستيراد مجموعات البيانات في Power BI للتحليل وإعداد التقارير' },
      { name:'بناء المرئيات في Power BI', img:'powerbi2.jpg', year:'2026', desc:'إنشاء مخططات ورسوم بيانية وعناصر مرئية جذابة لتمثيل بيانات الأعمال بفعالية' },
      { name:'تصميم التقارير في Power BI', img:'powerbi3.jpg', year:'2026', desc:'تصميم تقارير احترافية وتفاعلية بتقنيات تخطيط وتنسيق متقدمة' },
      { name:'استكشاف تحليل البيانات', img:'powerbi4.jpg', year:'2026', desc:'استكشاف وتحليل مجموعات البيانات للكشف عن الاتجاهات والأنماط ورؤى الأعمال القابلة للتنفيذ' },
      { name:'تنظيف البيانات وتحويلها', img:'powerbi5.jpg', year:'2026', desc:'استخدام Power Query لتنظيف البيانات الخام وتشكيلها وتحويلها إلى تنسيقات جاهزة للتحليل' },
      { name:'إطار نموذج البيانات', img:'powerbi6.jpg', year:'2026', desc:'بناء واختبار نماذج بيانات قوية بالعلاقات والمقاييس والأعمدة المحسوبة' },
      { name:'التحليلات الشاملة مع MS Fabric', img:'powerbi7.jpg', year:'2026', desc:'تنفيذ حلول تحليلية متكاملة باستخدام Microsoft Fabric لسير عمل البيانات على مستوى المؤسسات' },
      { name:'تكوين نموذج دلالي', img:'powerbi8.jpg', year:'2026', desc:'إعداد وتحسين النماذج الدلالية لتمكين تحليل بيانات دقيق وفعّال' },
      { name:'Copilot في Power BI', img:'powerbi9.jpg', year:'2026', desc:'الاستفادة من ميزات Copilot المدعومة بالذكاء الاصطناعي لإنشاء التقارير والرؤى باللغة الطبيعية' },
      { name:'نطاق تصميم التقارير', img:'powerbi10.jpg', year:'2026', desc:'تحديد متطلبات التقارير وترجمة احتياجات الأعمال إلى مواصفات لوحة بيانات فعّالة' },
    ],
    dubai: [
      { name:'هندسة أوامر الذكاء الاصطناعي — إنجليزي', img:'dubai1.jpg', year:'2026', desc:'إتقان تقنيات هندسة الأوامر لأنظمة الذكاء الاصطناعي — ضمن مبادرة مليون خبير من مؤسسة دبي للمستقبل' },
      { name:'هندسة الأوامر — عربي', img:'dubai2.jpg', year:'2026', desc:'إتقان مهارات هندسة الأوامر للذكاء الاصطناعي — مبادرة مليون خبير للأوامر من مؤسسة دبي للمستقبل' },
    ],
    edraak: [
      { name:'الإنفوجرافيك المتحرك', img:'motion.jpg', year:'2026', desc:'إنشاء إنفوجرافيك متحرك باستخدام Adobe Illustrator وAfter Effects وAdobe Audition لرواية قصص مرئية احترافية' },
      { name:'مقدمة في الذكاء الاصطناعي', img:'ai.jpg', year:'2026', desc:'فهم أساسيات الذكاء الاصطناعي وخوارزميات التعلم الآلي والشبكات العصبية وتطبيقات الذكاء الاصطناعي الواقعية' },
      { name:'Excel المتقدم', img:'excel.jpg', year:'2026', desc:'مهارات MS Excel المتقدمة بما في ذلك التنسيقات الشرطية والدوال والمخططات وجداول Pivot والتقارير الآلية' },
      { name:'إدارة علاقات العملاء', img:'crm.jpg', year:'2026', desc:'تطبيق مفاهيم وإستراتيجيات CRM لبناء علاقات عملاء مستدامة ودعم نمو الأعمال' },
      { name:'إدارة العمليات', img:'operations.jpg', year:'2026', desc:'فهم مفاهيم إدارة العمليات الأساسية باستخدام إطار 4Ds لتسليم أعمال استراتيجي' },
      { name:'أسس إدارة المشاريع', img:'project.jpg', year:'2026', desc:'مهارات وأدوات ومنهجيات إدارة المشاريع الأساسية لبدء وتسليم مشاريع ناجحة' },
      { name:'مقدمة في الشبكات', img:'networking.jpg', year:'2026', desc:'فهم أساسيات الشبكات ومكوناتها وأنواعها و DNS وتكوين الشبكات السلكية واللاسلكية العملية' },
    ],
    older: [
      { name:'مهارات التواصل الفعّال', img:'communication.jpg', year:'2008', desc:'ندوة تواصل شاملة بإشراف د. إبراهيم الفقي — المركز الكندي للتدريب على التنمية البشرية' },
      { name:'التخليص الجمركي', img:'customs.jpg', year:'2006', desc:'تدريب مهني على عمليات التخليص الجمركي — مصلحة الجمارك المصرية، وزارة المالية' },
      { name:'اللغة الإنجليزية — المستوى الثالث', img:'english.jpg', year:'2001', desc:'شهادة اللغة الإنجليزية للمستوى الثالث — مركز سيسكو للغات والكمبيوتر، الزقازيق' },
      { name:'حل مشكلات الري والصرف', img:'irrigation.jpg', year:'2001', desc:'تدريب تقني على حل تحديات الري والصرف في شمال الشرقية — مركز النيل للإعلام والتدريب' },
    ],
    appreciation: [
      { name:'شهادة تقدير الإرشاد المائي', img:'appreciation1.jpg', year:'-', desc:'شهادة تقدير رسمية على المساهمة المتميزة في برامج الإرشاد المائي وإدارة الري' },
      { name:'شهادة تقدير مجلس الإدارة', img:'appreciation2.jpg', year:'-', desc:'تقدير من مجلس الإدارة على الأداء الاستثنائي والقيادة والتميز المهني' },
    ],
  };

  const certificates = isAr ? certificatesAr : certificatesEn;

  const CertImage = ({ cert }) => {
    const [imgError, setImgError] = useState(false);
    return imgError ? (
      <div style={{height:'150px', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#1a2340', fontSize:'40px'}}>🏆</div>
    ) : (
      <img src={process.env.PUBLIC_URL + `/images/certificates/${cert.img}`} alt={cert.name} loading="lazy" style={{width:'100%', height:'150px', objectFit:'cover'}} onError={() => setImgError(true)}/>
    );
  };

  const ModalImage = ({ cert }) => {
    const [imgError, setImgError] = useState(false);
    return imgError ? (
      <div style={{height:'300px', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#1a2340', fontSize:'60px', borderRadius:'8px'}}>🏆</div>
    ) : (
      <img src={process.env.PUBLIC_URL + `/images/certificates/${cert.img}`} alt={cert.name} style={{width:'100%', borderRadius:'8px', border:'1px solid rgba(201,168,76,0.3)'}} onError={() => setImgError(true)}/>
    );
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // NAV LINKS
  const navLinks = isAr
    ? ['من أنا', 'الخبرات', 'المهارات', 'الشهادات', 'المشاريع', 'تواصل']
    : ['About', 'Experience', 'Skills', 'Certifications', 'Projects', 'Contact'];
  const navAnchors = ['about', 'experience', 'skills', 'certifications', 'projects', 'contact'];

  return (
    <div style={{fontFamily: isAr ? "'Cairo', 'Segoe UI', Arial, sans-serif" : "'Segoe UI', Arial, sans-serif", backgroundColor:'#0a0f2e', color:'#ffffff', minHeight:'100vh', direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left'}}>

      {/* NAVBAR */}
      <nav style={{position:'fixed', top:0, width:'100%', backgroundColor:'rgba(10,15,46,0.95)', borderBottom:'1px solid #C9A84C', padding:'15px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:1000, boxSizing:'border-box'}}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="HK Logo" style={{height:'50px', width:'auto'}}/>
        <div style={{display:'flex', gap:'20px', alignItems:'center', flexWrap:'wrap'}}>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            style={{backgroundColor:'transparent', border:'1px solid #C9A84C', color:'#C9A84C', padding:'6px 15px', borderRadius:'20px', cursor:'pointer', fontSize:'13px', fontWeight:'700'}}>
            {lang === 'en' ? 'AR عربية' : 'EN English'}
          </button>
          {navLinks.map((item, idx) => (
            <a key={item} href={`#${navAnchors[idx]}`} style={{color:'#ffffff', textDecoration:'none', fontSize:'14px', letterSpacing: isAr ? '0' : '1px'}}
              onMouseOver={e => e.target.style.color='#C9A84C'}
              onMouseOut={e => e.target.style.color='#ffffff'}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'100px 20px 40px'}}>
        <div style={{width:'150px', height:'150px', borderRadius:'50%', border:'3px solid #C9A84C', overflow:'hidden', marginBottom:'30px', boxShadow:'0 0 30px rgba(201,168,76,0.4)'}}>
          <img src={process.env.PUBLIC_URL + "/images/profile.jpg"} alt="Hatem Kandeel" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
        </div>
        <h1 style={{fontSize:'3.5rem', fontWeight:'700', marginBottom:'10px', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
          {isAr ? 'حاتم قنديل' : 'Hatem A. Kandeel'}
        </h1>
        <div style={{fontSize:'1.2rem', color:'#C9A84C', minHeight:'40px', marginBottom:'20px'}}>{text}<span>|</span></div>
        <p style={{color:'#8899cc', fontSize:'1rem', maxWidth:'600px', lineHeight:'1.8'}}>
          {isAr ? 'أكثر من 20 عامًا في قيادة نمو الأعمال عبر أنظمة الأمن والشراكات الاستراتيجية ومشاريع التنمية الدولية.' : '20+ years of driving business growth across security systems, strategic partnerships, and international development projects.'}
        </p>
        <div style={{display:'flex', gap:'15px', marginTop:'40px', flexWrap:'wrap', justifyContent:'center'}}>
          <a href="#contact" style={{backgroundColor:'#C9A84C', color:'#0a0f2e', padding:'14px 35px', borderRadius:'4px', textDecoration:'none', fontWeight:'700', fontSize:'15px', letterSpacing:'1px'}}>
            {isAr ? 'وظفني' : 'Hire Me'}
          </a>
          <a href="#certifications" style={{border:'2px solid #C9A84C', color:'#C9A84C', padding:'14px 35px', borderRadius:'4px', textDecoration:'none', fontWeight:'700', fontSize:'15px', letterSpacing:'1px'}}>
            {isAr ? 'الشهادات' : 'View Certificates'}
          </a>
          <a href={process.env.PUBLIC_URL + "/cv.pdf"} download="Hatem_Kandeel_CV.pdf" style={{border:'2px solid #ffffff', color:'#ffffff', padding:'14px 35px', borderRadius:'4px', textDecoration:'none', fontWeight:'700', fontSize:'15px', letterSpacing:'1px'}}>
            {isAr ? '📄 تحميل السيرة الذاتية' : '📄 Download CV'}
          </a>
        </div>

        {/* Video Intro */}
        <div style={{marginTop:'60px', width:'100%', maxWidth:'800px'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'12px', marginBottom:'15px'}}>
            {isAr ? '🎬 شاهد مقدمتي' : '🎬 WATCH MY INTRO'}
          </p>
          <div style={{position:'relative', paddingBottom:'56.25%', height:0, borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(201,168,76,0.3)', boxShadow:'0 0 30px rgba(201,168,76,0.1)'}}>
            <iframe
              src="https://www.youtube.com/embed/NHyIiZ_0RZY"
              title="Hatem Kandeel Intro"
              style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section style={{backgroundColor:'#0d1540', padding:'60px 40px', display:'flex', justifyContent:'center', gap:'60px', flexWrap:'wrap'}}>
        {[
          {num:'20+', label: isAr ? 'سنوات خبرة' : 'Years Experience'},
          {num:'200%', label: isAr ? 'نمو في الإيرادات' : 'Revenue Growth'},
          {num:'50+', label: isAr ? 'موظف قادهم' : 'Team Members Led'},
          {num:'26', label: isAr ? 'شهادة مهنية' : 'Certifications'},
        ].map(item => (
          <div key={item.label} style={{textAlign:'center'}}>
            <div style={{fontSize:'3rem', fontWeight:'700', color:'#C9A84C'}}>{item.num}</div>
            <div style={{color:'#8899cc', fontSize:'0.9rem', letterSpacing:'1px', marginTop:'5px'}}>{item.label}</div>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section id="about" style={{padding:'100px 40px', maxWidth:'1100px', margin:'0 auto', display:'flex', gap:'60px', alignItems:'flex-start', flexWrap:'wrap'}}>
        <div style={{flex:1, minWidth:'280px'}}>
          <img src={process.env.PUBLIC_URL + "/images/profile.jpg"} alt="Hatem Kandeel" style={{width:'100%', borderRadius:'12px', border:'2px solid #C9A84C', boxShadow:'0 0 40px rgba(201,168,76,0.2)'}}/>

          {/* Audio Player */}
          <div style={{marginTop:'20px', backgroundColor:'#0d1540', borderRadius:'12px', padding:'20px', border:'1px solid rgba(201,168,76,0.3)', textAlign:'center'}}>
            <p style={{color:'#C9A84C', fontSize:'12px', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '🎧 استمع إلى قصتي' : '🎧 LISTEN TO MY STORY'}
            </p>
            <p style={{color:'#8899cc', fontSize:'12px', marginBottom:'15px'}}>
              {isAr ? 'من العمل الاجتماعي إلى قيادة المبيعات بالذكاء الاصطناعي' : 'From Social Work to AI Sales Leadership'}
            </p>
            <audio ref={audioRef} src={process.env.PUBLIC_URL + "/audio/mystory.m4a"} onEnded={() => setIsPlaying(false)}/>
            <button onClick={toggleAudio} style={{backgroundColor:'#C9A84C', color:'#0a0f2e', border:'none', borderRadius:'50px', padding:'12px 30px', cursor:'pointer', fontWeight:'700', fontSize:'14px'}}>
              {isPlaying ? (isAr ? '⏸ إيقاف' : '⏸ Pause') : (isAr ? '▶ تشغيل قصتي' : '▶ Play My Story')}
            </button>
          </div>
        </div>

        <div style={{flex:2, minWidth:'280px'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px'}}>
            {isAr ? 'من أنا' : 'WHO I AM'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'25px', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'نبذة عني' : 'About Me'}
          </h2>
          <p style={{color:'#aabbdd', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'على مدار أكثر من 20 عامًا، بنيت مسيرتي المهنية بالطريقة الصعبة — من الصفر، متعلمًا كل دور من الداخل، ونامياً عبر تحديات حقيقية في صناعات متعددة.'
              : "Over the past 20 years, I've built my career the hard way — starting from scratch, learning every role from the inside, and growing through real challenges across multiple industries."}
          </p>
          <p style={{color:'#aabbdd', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'أسست وأدرت شركة نمت من 3 موظفين إلى أكثر من 50، محافظًا على الربحية لمدة 9 سنوات متتالية وحققت نموًا في الإيرادات بنسبة 200%. قدت فرق عمل ميدانية، تفاوضت على عقود كبرى، وبنيت علاقات عملاء من الصفر، وحققت نتائج في قطاعات تتراوح من أنظمة الأمن والعقارات إلى إدارة موارد المياه والتنمية الدولية.'
              : "I founded and managed a company that grew from 3 employees to over 50, maintaining profitability for 9 consecutive years and achieving 200% revenue growth. I've led field teams, negotiated major contracts, built client relationships from scratch, and delivered results in sectors ranging from security systems and real estate to water resource management and international development."}
          </p>
          <p style={{color:'#aabbdd', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'ما يميز ملفي الشخصي هو عمق ونطاق الخبرة العملية التي اكتسبتها — العمليات الإدارية، العمل الميداني التقني، قيادة الفرق، تنفيذ المشاريع، التخطيط الاستراتيجي، المشتريات والمتابعة. لم أدر من وراء مكتب فقط — كنت في الميدان، داخل العمل، أفهم كل قسم من الداخل.'
              : "What makes my profile different is the depth and range of hands-on experience — administrative operations, technical field work, team leadership, project execution, strategic planning, procurement and follow-up. I didn't just manage from behind a desk — I was in the field, inside the work, understanding every department from within."}
          </p>
          <p style={{color:'#aabbdd', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'على مدار مسيرتي المهنية، تشرفت بالعمل مع بعض أعرق المؤسسات الدولية — البنك الدولي، إيفاد، معهد باري (إيطاليا)، الحكومة الهولندية ومشروعها المشترك في مصر، والحكومة المصرية عبر وزارات متعددة.'
              : "Throughout my career, I've had the honor of working with some of the world's most prestigious international institutions — the World Bank, IFAD, the Bari Institute (Italy), the Dutch Government and its joint project in Egypt, and the Egyptian Government across multiple ministries."}
          </p>
          <p style={{color:'#aabbdd', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'30px'}}>
            {isAr
              ? 'ما يدفعني اليوم هو الإيمان بأن الخبرة وحدها لا تكفي. لهذا أواصل بناء مهاراتي — Power BI، هندسة الأوامر AI، إدارة المشاريع، إدارة العمليات، CRM، Excel المتقدم، تحليل البيانات، الشبكات، وحاليًا أدرس Python والإنجليزية. ليس لأتبع الاتجاهات، بل لأنني أفهم إلى أين يتجه عالم الأعمال — وأعتزم أن أكون في المقدمة.'
              : "What drives me today is the belief that experience alone is not enough. That's why I continue building my skills — Power BI, AI Prompt Engineering, Project Management, Operations Management, CRM, Advanced Excel, Data Analysis, Networking, and currently studying Python and English. Not to follow trends, but because I understand where the business world is heading — and I intend to be at the forefront."}
          </p>
          <div style={{display:'flex', gap:'30px', flexWrap:'wrap'}}>
            {[
              {label: isAr ? 'الموقع' : 'Location', value: isAr ? 'القاهرة الجديدة، مصر' : 'New Cairo, Egypt'},
              {label: isAr ? 'الهاتف' : 'Phone', value:'+201036836343'},
              {label: isAr ? 'البريد الإلكتروني' : 'Email', value:'hakkandeel@gmail.com'},
              {label: isAr ? 'اللغات' : 'Languages', value: isAr ? 'العربية | الإنجليزية' : 'Arabic | English'}
            ].map(item => (
              <div key={item.label}>
                <div style={{color:'#C9A84C', fontSize:'12px', letterSpacing:'2px', marginBottom:'4px'}}>{item.label.toUpperCase()}</div>
                <div style={{color:'#ffffff', fontSize:'14px'}}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{padding:'100px 40px', backgroundColor:'#0d1540'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'رحلتي المهنية' : 'MY JOURNEY'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'60px', textAlign:'center', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'الخبرة المهنية' : 'Professional Experience'}
          </h2>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute', [isAr ? 'right' : 'left']:'20px', top:0, bottom:0, width:'2px', backgroundColor:'#C9A84C', opacity:0.3}}/>
            {experiences.map((exp, index) => (
              <div key={index} style={{display:'flex', gap:'40px', marginBottom:'50px', position:'relative', flexDirection: isAr ? 'row-reverse' : 'row'}}>
                <div style={{width:'42px', height:'42px', borderRadius:'50%', backgroundColor:'#0d1540', border:'2px solid #C9A84C', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1}}>
                  <div style={{width:'12px', height:'12px', borderRadius:'50%', backgroundColor:'#C9A84C'}}/>
                </div>
                <div style={{backgroundColor:'#0a0f2e', borderRadius:'12px', padding:'25px 30px', border:'1px solid rgba(201,168,76,0.2)', flex:1, boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
                  <span style={{color:'#C9A84C', fontSize:'12px', letterSpacing:'2px'}}>{exp.period}</span>
                  <h3 style={{fontSize:'1.2rem', fontWeight:'700', margin:'8px 0 4px', color:'#ffffff'}}>{exp.title}</h3>
                  <p style={{color:'#C9A84C', fontSize:'14px', marginBottom:'4px'}}>{exp.company}</p>
                  <p style={{color:'#667799', fontSize:'12px', marginBottom:'15px'}}>{exp.location}</p>
                  <ul style={{paddingLeft: isAr ? '0' : '20px', paddingRight: isAr ? '20px' : '0', margin:0}}>
                    {exp.points.map((point, i) => (
                      <li key={i} style={{color:'#aabbdd', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'6px'}}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{padding:'100px 40px', backgroundColor:'#0a0f2e'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'ما أقدمه' : 'WHAT I BRING'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'15px', textAlign:'center', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'المهارات والخبرات' : 'Skills & Expertise'}
          </h2>
          <p style={{color:'#667799', textAlign:'center', marginBottom:'60px', fontSize:'13px'}}>
            {isAr ? '💡 انقر على أي مهارة لمعرفة المزيد' : '💡 Click on any skill to learn more'}
          </p>
          <h3 style={{color:'#C9A84C', fontSize:'1rem', letterSpacing:'3px', marginBottom:'30px'}}>
            {isAr ? '⚙️ المهارات التقنية' : '⚙️ HARD SKILLS'}
          </h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'15px', marginBottom:'60px'}}>
            {hardSkills.map((skill, i) => (
              <div key={i} onClick={() => setActiveSkill(activeSkill === `h${i}` ? null : `h${i}`)}
                style={{backgroundColor: activeSkill === `h${i}` ? 'rgba(201,168,76,0.12)' : '#0d1540', borderRadius:'10px', padding:'18px 20px', border: activeSkill === `h${i}` ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.15)', cursor:'pointer', transition:'all 0.3s'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                  <span style={{color:'#ffffff', fontSize:'14px', fontWeight:'600'}}>
                    {skill.icon} {skill.name}
                    {skill.inProgress && <span style={{color:'#C9A84C', fontSize:'10px', marginLeft:'8px', marginRight:'8px', border:'1px solid #C9A84C', padding:'2px 6px', borderRadius:'10px'}}>{isAr ? 'قيد التعلم' : 'In Progress'}</span>}
                  </span>
                  <span style={{color:'#C9A84C', fontSize:'13px', fontWeight:'700'}}>{skill.level}%</span>
                </div>
                <div style={{backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'50px', height:'6px', overflow:'hidden', marginBottom:'10px'}}>
                  <div style={{height:'100%', width:`${skill.level}%`, borderRadius:'50px', background:'linear-gradient(90deg, #C9A84C, #ffe082)'}}/>
                </div>
                {activeSkill === `h${i}` && (
                  <p style={{color:'#aabbdd', fontSize:'12px', lineHeight:'1.7', marginTop:'10px', borderTop:'1px solid rgba(201,168,76,0.2)', paddingTop:'10px'}}>{skill.desc}</p>
                )}
              </div>
            ))}
          </div>
          <h3 style={{color:'#C9A84C', fontSize:'1rem', letterSpacing:'3px', marginBottom:'30px'}}>
            {isAr ? '🌟 المهارات الشخصية' : '🌟 SOFT SKILLS'}
          </h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'15px'}}>
            {softSkills.map((skill, i) => (
              <div key={i} onClick={() => setActiveSkill(activeSkill === `s${i}` ? null : `s${i}`)}
                style={{backgroundColor: activeSkill === `s${i}` ? 'rgba(201,168,76,0.12)' : '#0d1540', borderRadius:'10px', padding:'18px 20px', border: activeSkill === `s${i}` ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.15)', cursor:'pointer', transition:'all 0.3s'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom: activeSkill === `s${i}` ? '10px' : '0'}}>
                  <span style={{fontSize:'20px'}}>{skill.icon}</span>
                  <span style={{color:'#ffffff', fontSize:'13px', fontWeight:'600'}}>{skill.name}</span>
                </div>
                {activeSkill === `s${i}` && (
                  <p style={{color:'#aabbdd', fontSize:'12px', lineHeight:'1.7', borderTop:'1px solid rgba(201,168,76,0.2)', paddingTop:'10px', margin:0}}>{skill.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" style={{padding:'100px 40px', backgroundColor:'#0d1540'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'مؤهلاتي' : 'MY CREDENTIALS'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'15px', textAlign:'center', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'الشهادات المهنية' : 'Certifications'}
          </h2>
          <p style={{color:'#667799', textAlign:'center', marginBottom:'40px', fontSize:'13px'}}>
            {isAr ? '26 شهادة مهنية — انقر على أي شهادة للعرض' : '26 Professional Certifications — Click any certificate to view'}
          </p>
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'center', marginBottom:'40px'}}>
            {certTabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{padding:'10px 20px', borderRadius:'50px', border:'1px solid #C9A84C', backgroundColor: activeTab === tab.id ? '#C9A84C' : 'transparent', color: activeTab === tab.id ? '#0a0f2e' : '#C9A84C', cursor:'pointer', fontSize:'13px', fontWeight:'600', transition:'all 0.3s'}}>
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'20px'}}>
            {certificates[activeTab].map((cert, i) => (
              <div key={i} onClick={() => setSelectedCert(cert)}
                style={{backgroundColor:'#0a0f2e', borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(201,168,76,0.2)', cursor:'pointer', transition:'all 0.3s', boxShadow:'0 4px 15px rgba(0,0,0,0.3)'}}
                onMouseOver={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.transform='translateY(-5px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <CertImage cert={cert} />
                <div style={{padding:'15px'}}>
                  <p style={{color:'#ffffff', fontSize:'13px', fontWeight:'600', marginBottom:'5px', lineHeight:'1.4'}}>{cert.name}</p>
                  <p style={{color:'#aabbdd', fontSize:'11px', lineHeight:'1.5', marginBottom:'8px'}}>{cert.desc.substring(0, 80)}...</p>
                  <p style={{color:'#C9A84C', fontSize:'11px'}}>{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{padding:'100px 40px', backgroundColor:'#0a0f2e'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'أعمالي' : 'MY WORK'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'60px', textAlign:'center', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'المشاريع والمحتوى' : 'Projects & Content'}
          </h2>

          {/* Power BI Dashboard */}
          <div style={{marginBottom:'80px'}}>
            <h3 style={{color:'#C9A84C', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '📊 مشروع تحليل البيانات بـ Power BI' : '📊 POWER BI DATA ANALYSIS PROJECT'}
            </h3>
            <p style={{color:'#aabbdd', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'30px'}}>
              {isAr
                ? 'لوحة بيانات شاملة لتحليل مبيعات التجزئة مبنية بـ Power BI — تحليل أداء خطوط المنتجات ومقارنة الفروع والدخل الإجمالي وتقييمات العملاء عبر أشهر ومواقع متعددة.'
                : 'A comprehensive retail sales analysis dashboard built with Power BI — analyzing product line performance, branch comparison, gross income, and customer ratings across multiple months and locations.'}
            </p>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'15px', marginBottom:'30px'}}>
              {['dashboard1.png','dashboard2.png','dashboard3.png','dashboard4.png','dashboard5.png','dashboard6.png','dashboard7.png'].map((img, i) => (
                <img key={i} src={process.env.PUBLIC_URL + `/projects/${img}`} alt={`Dashboard ${i+1}`}
                  loading="lazy" style={{width:'100%', borderRadius:'8px', border:'1px solid rgba(201,168,76,0.2)', cursor:'pointer', transition:'all 0.3s'}}
                  onMouseOver={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.transform='scale(1.02)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'; e.currentTarget.style.transform='scale(1)'; }}
                />
              ))}
            </div>
          </div>

          {/* Infographic */}
          <div style={{marginBottom:'80px'}}>
            <h3 style={{color:'#C9A84C', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '🖼️ إنفوجرافيك احترافي' : '🖼️ PROFESSIONAL INFOGRAPHIC'}
            </h3>
            <p style={{color:'#aabbdd', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'30px'}}>
              {isAr
                ? 'ملخص مرئي لأكثر من 20 عامًا من النمو المثبت والابتكار الرقمي — يجمع بين القيادة التشغيلية وتحليلات الذكاء الاصطناعي الحديثة.'
                : 'A visual summary of 20+ years of proven growth and digital innovation — bridging operational leadership with modern AI analytics.'}
            </p>
            <img src={process.env.PUBLIC_URL + "/projects/infographic.png"} alt="Hatem Kandeel Infographic"
              loading="lazy" style={{width:'100%', borderRadius:'12px', border:'1px solid rgba(201,168,76,0.3)'}}/>
          </div>

          {/* Mind Map */}
          <div style={{marginBottom:'80px'}}>
            <h3 style={{color:'#C9A84C', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '🧠 خريطة ذهنية مهنية' : '🧠 PROFESSIONAL MIND MAP'}
            </h3>
            <p style={{color:'#aabbdd', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'30px'}}>
              {isAr
                ? 'خريطة ذهنية شاملة لملفي المهني — تغطي الخبرة والمهارات والشهادات والرؤية الاستراتيجية.'
                : 'A comprehensive mind map of my professional profile — covering experience, skills, certifications, and strategic vision.'}
            </p>
            <img src={process.env.PUBLIC_URL + "/projects/mindmap.png"} alt="Mind Map"
              loading="lazy" style={{width:'100%', borderRadius:'12px', border:'1px solid rgba(201,168,76,0.3)'}}/>
          </div>

          {/* Videos */}
          <div>
            <h3 style={{color:'#C9A84C', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'30px'}}>
              {isAr ? '🎬 محتوى الفيديو' : '🎬 VIDEO CONTENT'}
            </h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', gap:'30px'}}>
              {[
                {
                  title: isAr ? 'معماري النمو' : 'Architect of Growth',
                  url:'https://www.youtube.com/embed/goyDOcrbews',
                  desc: isAr ? 'قصة رحلتي التي امتدت أكثر من 20 عامًا — من تنمية المجتمع إلى قيادة الأعمال والتحول الرقمي.' : 'The story of my 20+ year journey — from community development to business leadership and digital transformation.'
                },
                {
                  title: isAr ? 'مخطط نمو B2B' : 'The B2B Growth Blueprint',
                  url:'https://www.youtube.com/embed/lIrZdt6gnag',
                  desc: isAr ? 'دليل عملي لاستراتيجية مبيعات B2B وإدارة الحسابات الرئيسية وتطوير الأعمال المستدام.' : 'A practical guide to B2B sales strategy, key account management, and sustainable business development.'
                },
              ].map((video, i) => (
                <div key={i} style={{backgroundColor:'#0d1540', borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(201,168,76,0.2)'}}>
                  <div style={{position:'relative', paddingBottom:'56.25%', height:0}}>
                    <iframe src={video.url} title={video.title}
                      style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
                      loading="lazy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                  </div>
                  <div style={{padding:'20px'}}>
                    <h4 style={{color:'#C9A84C', marginBottom:'8px'}}>{video.title}</h4>
                    <p style={{color:'#aabbdd', fontSize:'13px', lineHeight:'1.7'}}>{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:'100px 40px', backgroundColor:'#0d1540'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'تواصل معي' : 'GET IN TOUCH'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'15px', textAlign:'center', background:'linear-gradient(135deg, #ffe082, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'اتصل بي' : 'Contact Me'}
          </h2>
          <p style={{color:'#8899cc', textAlign:'center', marginBottom:'60px', fontSize:'1rem', lineHeight:'1.8'}}>
            {isAr
              ? 'سواء كان لديك فرصة عمل أو مشروع للنقاش أو ترغب ببساطة في التواصل — أنا دائمًا منفتح على المحادثة. المراجع متاحة عند الطلب.'
              : 'Whether you have a business opportunity, a project to discuss, or simply want to connect — I\'m always open to a conversation. References available upon request.'}
          </p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'30px', marginBottom:'60px'}}>
            <a href="mailto:hakkandeel@gmail.com" style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'#0a0f2e', borderRadius:'12px', padding:'30px', border:'1px solid rgba(201,168,76,0.2)', textAlign:'center', transition:'all 0.3s', cursor:'pointer'}}
                onMouseOver={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.transform='translateY(-5px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{fontSize:'40px', marginBottom:'15px'}}>📧</div>
                <p style={{color:'#C9A84C', fontSize:'12px', letterSpacing:'2px', marginBottom:'8px'}}>{isAr ? 'البريد الإلكتروني' : 'EMAIL'}</p>
                <p style={{color:'#ffffff', fontSize:'14px'}}>hakkandeel@gmail.com</p>
              </div>
            </a>

            <a href="https://wa.me/201036836343" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'#0a0f2e', borderRadius:'12px', padding:'30px', border:'1px solid rgba(201,168,76,0.2)', textAlign:'center', transition:'all 0.3s', cursor:'pointer'}}
                onMouseOver={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.transform='translateY(-5px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{marginBottom:'15px', display:'flex', justifyContent:'center', gap:'15px', alignItems:'center'}}>
                  <span style={{fontSize:'35px'}}>📱</span>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <p style={{color:'#C9A84C', fontSize:'12px', letterSpacing:'2px', marginBottom:'8px'}}>{isAr ? 'واتساب والهاتف' : 'WHATSAPP & PHONE'}</p>
                <p style={{color:'#ffffff', fontSize:'14px'}}>+201036836343</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/hatem-kandeel1" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <div style={{backgroundColor:'#0a0f2e', borderRadius:'12px', padding:'30px', border:'1px solid rgba(201,168,76,0.2)', textAlign:'center', transition:'all 0.3s', cursor:'pointer'}}
                onMouseOver={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.transform='translateY(-5px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{fontSize:'40px', marginBottom:'15px'}}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="#0077b5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <p style={{color:'#C9A84C', fontSize:'12px', letterSpacing:'2px', marginBottom:'8px'}}>LINKEDIN</p>
                <p style={{color:'#ffffff', fontSize:'14px'}}>Hatem Kandeel</p>
              </div>
            </a>
          </div>

          {/* Business Card */}
          <div style={{marginBottom:'40px'}}>
            <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'12px', marginBottom:'15px', textAlign:'center'}}>
              {isAr ? '🃏 بطاقة أعمال رقمية' : '🃏 DIGITAL BUSINESS CARD'}
            </p>
            <img src={process.env.PUBLIC_URL + "/projects/businesscard.jpg"} alt="Hatem Kandeel Business Card"
              loading="lazy" style={{width:'100%', borderRadius:'12px', border:'1px solid rgba(201,168,76,0.3)'}}/>
          </div>

          {/* QR Code */}
          <div style={{textAlign:'center', backgroundColor:'#0a0f2e', borderRadius:'16px', padding:'40px', border:'1px solid rgba(201,168,76,0.2)'}}>
            <p style={{color:'#C9A84C', letterSpacing:'3px', fontSize:'12px', marginBottom:'15px'}}>
              {isAr ? 'امسح للواتساب' : 'SCAN TO WHATSAPP'}
            </p>
            <p style={{color:'#8899cc', fontSize:'13px', marginBottom:'25px'}}>
              {isAr ? 'امسح رمز QR بهاتفك لبدء محادثة واتساب مباشرةً' : 'Scan the QR code with your phone to start a WhatsApp conversation directly'}
            </p>
            <div style={{display:'inline-block', padding:'15px', backgroundColor:'#ffffff', borderRadius:'12px', marginBottom:'20px'}}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wa.me/201036836343`} alt="WhatsApp QR Code" style={{width:'180px', height:'180px', display:'block'}}/>
            </div>
            <p style={{color:'#667799', fontSize:'12px'}}>+201036836343</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{backgroundColor:'#0a0f2e', borderTop:'1px solid rgba(201,168,76,0.2)', padding:'30px 40px', textAlign:'center'}}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="HK Logo" style={{height:'40px', marginBottom:'15px'}}/>
        <p style={{color:'#667799', fontSize:'13px', marginBottom:'5px'}}>
          {isAr ? 'حاتم أحمد قنديل' : 'Hatem A. Kandeel'}
        </p>
        <p style={{color:'#445566', fontSize:'12px', marginBottom:'15px'}}>
          {isAr ? 'مدير تطوير الأعمال والمبيعات التجارية | استراتيجي مبني على البيانات | خبير العمليات' : 'Senior Business Development & Commercial Manager | Data-Driven Strategist | Operations Expert'}
        </p>
        <p style={{color:'#445566', fontSize:'12px'}}>© 2026 {isAr ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
      </footer>

      {/* Certificate Modal */}
      {selectedCert && (
        <div onClick={() => setSelectedCert(null)}
          style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.85)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', boxSizing:'border-box'}}>
          <div onClick={e => e.stopPropagation()}
            style={{backgroundColor:'#0d1540', borderRadius:'16px', padding:'30px', maxWidth:'700px', width:'100%', border:'1px solid #C9A84C', position:'relative', maxHeight:'90vh', overflowY:'auto'}}>
            <button onClick={() => setSelectedCert(null)}
              style={{position:'absolute', top:'15px', [isAr ? 'left' : 'right']:'15px', backgroundColor:'transparent', border:'none', color:'#C9A84C', fontSize:'24px', cursor:'pointer'}}>✕</button>
            <h3 style={{color:'#C9A84C', marginBottom:'10px', fontSize:'1.1rem'}}>{selectedCert.name}</h3>
            <p style={{color:'#aabbdd', fontSize:'13px', lineHeight:'1.7', marginBottom:'20px'}}>{selectedCert.desc}</p>
            <ModalImage cert={selectedCert} />
            <p style={{color:'#667799', marginTop:'15px', fontSize:'12px', textAlign:'center'}}>{selectedCert.year}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;