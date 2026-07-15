import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Sun, Moon, Zap, TrendingUp, Users, GraduationCap, LineChart, Play, Pause, MapPin, Phone, Mail, Languages as Languages2, Globe2, Cpu, Target, BarChart3 } from 'lucide-react';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Portfolio render error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', background:'#060913', color:'#F3F4F6', textAlign:'center', padding:'40px'}}>
          <h2 style={{color:'#C5A880', marginBottom:'12px'}}>Something went wrong loading the page</h2>
          <p style={{color:'#94a3b8', marginBottom:'20px'}}>حدث خطأ غير متوقع أثناء تحميل الصفحة</p>
          <button onClick={() => window.location.reload()} style={{background:'#C5A880', color:'#060913', border:'none', padding:'12px 28px', borderRadius:'999px', fontWeight:700, cursor:'pointer'}}>Reload / إعادة التحميل</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [text, setText] = useState('');
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeTab, setActiveTab] = useState('microsoft');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('en');
  const [expandedGalleries, setExpandedGalleries] = useState({});
  const [activeBookVideo, setActiveBookVideo] = useState(null);
  const isAr = lang === 'ar';
  const audioRef = useRef(null);
  const heroRef = useRef(null);
  const [heroScrollPx, setHeroScrollPx] = useState(0);
  useEffect(() => {
    const onHeroScroll = () => setHeroScrollPx(window.scrollY || window.pageYOffset || 0);
    window.addEventListener('scroll', onHeroScroll, { passive: true });
    return () => window.removeEventListener('scroll', onHeroScroll);
  }, []);
  const grayAmount = Math.max(0, 1 - Math.min(heroScrollPx, 500) / 500);
  const heroImgFilter = `grayscale(${grayAmount}) brightness(${0.85 + 0.15 * (1 - grayAmount)}) contrast(${1.05 - 0.05 * (1 - grayAmount)})`;

  // ===================== THEME (Dark / Light) =====================
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('hk-theme') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    try { localStorage.setItem('hk-theme', theme); } catch {}
  }, [theme]);
  const [contactForm, setContactForm] = useState({ name:'', email:'', subject:'', message:'' });
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = contactForm;
    const body = `${message}\n\n${isAr ? 'من' : 'From'}: ${name} (${email})`;
    window.location.href = `mailto:hakkandeel@gmail.com?subject=${encodeURIComponent(subject || (isAr ? 'تواصل من الموقع الشخصي' : 'Portfolio Contact'))}&body=${encodeURIComponent(body)}`;
  };
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  // ===================== PRELOADER + LANGUAGE GATE =====================
  const [loadProgress, setLoadProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);
  const [showGate, setShowGate] = useState(false);
  const [siteEntered, setSiteEntered] = useState(false);

  useEffect(() => {
    let alreadyVisited = false;
    try { alreadyVisited = sessionStorage.getItem('hk-entered') === '1'; } catch {}
    const start = Date.now();
    const duration = 1200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setLoadProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setShowPreloader(false);
          if (alreadyVisited) {
            setSiteEntered(true);
          } else {
            setShowGate(true);
          }
        }, 250);
      }
    };
    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterSite = (chosenLang) => {
    setLang(chosenLang);
    setShowGate(false);
    setSiteEntered(true);
    try { sessionStorage.setItem('hk-entered', '1'); } catch {}
  };

  // Scroll progress bar
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setScrollPct(height > 0 ? (scrolled / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleGallery = (projectId) => {
    setExpandedGalleries(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

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
    { icon:'💹', name:'Power BI', level:90, desc:'Building interactive dashboards and reports using Star Schema, advanced DAX measures, forecasting, and What-If analysis to visualize KPIs and drive strategic decision-making' },
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
    { icon:'💹', name:'Power BI', level:90, desc:'بناء لوحات بيانات وتقارير تفاعلية باستخدام Star Schema ومقاييس DAX متقدمة والتنبؤات وتحليل ماذا لو لتصور مؤشرات الأداء الرئيسية ودعم القرارات الاستراتيجية' },
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

  const topSkillsChartData = [...hardSkills]
    .filter(s => !s.inProgress)
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)
    .map(s => ({ name: s.name, level: s.level }))
    .reverse();

  const pieColors = ['#C5A880', '#6366F1', '#8B7355', '#9CA3AF', '#E5D5C0'];

  const platformsData = [
    {
      id: 'knowledge',
      images: ['/platforms/mirnex-knowledge-1.png'],
      titleEn: 'Mirnex — BI Knowledge Platform', titleAr: 'ميرنكس — منصة المعرفة فى تحليل البيانات وذكاء الأعمال',
      descEn: 'A professional knowledge platform for data analytics and BI — bringing a KPI library, Power BI DAX formulas, Excel formulas, expert articles, case studies, and a dashboard gallery into one place, so analysts stop hunting across dozens of scattered sources.',
      descAr: 'منصة معرفية احترافية لتحليل البيانات وذكاء الأعمال، بتجمع فى مكان واحد: مكتبة KPIs، صيغ DAX لـ Power BI، معادلات Excel، مقالات متخصصة، دراسات حالة، ومعرض Dashboards — بدل البحث فى عشرات المصادر المتفرقة.',
      stack: ['Next.js 16', 'TypeScript', 'Prisma', 'SQLite'],
      note: { en:'Bilingual (AR/EN) today, architected to scale to 6 languages · full cross-content search · Dark/Light mode', ar:'ثنائي اللغة (عربي/إنجليزي) حاليًا، مبنية للتوسع لـ6 لغات · بحث شامل عبر كل المحتوى · وضع ليلي ونهاري' },
    },
    {
      id: 'entrepreneur',
      images: ['/platforms/mirnex-entrepreneur-1.jpeg', '/platforms/mirnex-entrepreneur-2.jpeg', '/platforms/mirnex-platform-1.png', '/platforms/mirnex-platform-2.png', '/platforms/mirnex-platform-3.png', '/platforms/mirnex-platform-4.png'],
      titleEn: 'Mirnex-Platform — Free Entrepreneur Guidance Platform', titleAr: 'Mirnex-Platform — منصة مجانية لإرشاد رواد الأعمال',
      descEn: 'A completely free platform for early-stage entrepreneurs worldwide — an interactive founder-journey timeline, a mock income/expense dashboard with a debt-to-income calculator, a curated tools directory, an educational financing guide, a community forum, an AI-agent directory, and a Claude-powered chat assistant. No paid services sold — only curated guidance.',
      descAr: 'منصة مجانية بالكامل لرواد الأعمال المبتدئين حول العالم — تايم لاين تفاعلي لرحلة التأسيس، لوحة عمل تجريبية لمحاكاة الدخل والمصروفات مع حاسبة نسبة الدين للدخل، دليل أدوات، دليل تمويل تعليمي، منتدى مجتمعي، دليل وكلاء ذكاء اصطناعي، ومساعد ذكي بالمحادثة عبر Claude. من غير أي خدمات مدفوعة — إرشاد فقط.',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      note: { en:'13 languages · deep-space visual identity (violet & sky-blue) · all charts hand-built in CSS/SVG/Canvas, no chart libraries', ar:'13 لغة · هوية بصرية "كونية غامقة" (بنفسجي وأزرق سماوي) · كل الرسومات مبنية يدويًا بـCSS/SVG/Canvas بدون مكتبات خارجية' },
    },
    {
      id: 'crm',
      images: ['/platforms/mirnex-crm-1.png'],
      titleEn: 'Mirnex CRM — Desktop CRM for SMBs', titleAr: 'Mirnex CRM — تطبيق سطح مكتب لإدارة العملاء',
      descEn: 'A Windows desktop CRM (Electron) sold as a one-time license instead of a monthly subscription, built for small and medium businesses worldwide. Completed: leads & pipeline (Kanban), customers, an interactive dashboard, invoicing & expenses with automatic profit calculation, inventory with low-stock alerts, country-based onboarding with dynamic currency/tax, and an AI assistant that turns plain-language questions into safe, read-only reports.',
      descAr: 'تطبيق سطح مكتب (Windows) لإدارة علاقات العملاء ببيع دفعة واحدة بدل اشتراك شهري، موجّه للشركات الصغيرة والمتوسطة عالميًا. المكتمل حاليًا: فرص المبيعات (Kanban)، العملاء، لوحة تحكم تفاعلية، فواتير ومصروفات بحساب ربح تلقائي، مخزون بتنبيهات نفاد، إعداد أولي حسب الدولة بعملة وضريبة تلقائية، ومساعد ذكاء اصطناعي بيحول الأسئلة الطبيعية لتقارير آمنة (قراءة فقط).',
      stack: ['Electron', 'React', 'TypeScript', 'sql.js'],
      note: { en:'6-language UI (Arabic full RTL) · in progress: invoice–inventory linking, purchasing module, WhatsApp alerts, PDF export', ar:'واجهة بـ6 لغات (عربي كامل RTL) · جاري العمل: ربط الفواتير بالمخزون، وحدة المشتريات، تنبيهات واتساب، تصدير PDF' },
    },
    {
      id: 'erp',
      images: ['/platforms/mirnex-erp-1.png', '/platforms/mirnex-erp-2.png', '/platforms/mirnex-erp-3.png'],
      titleEn: 'Mirnex ERP — Multi-Tenant SaaS ERP', titleAr: 'Mirnex ERP — نظام تخطيط موارد مؤسسات متعدد المستأجرين',
      descEn: 'A SaaS ERP where any company can sign up and get a fully isolated instance, modeling the real chain of a sale — Lead → Quotation → Sales Order → Delivery → Invoice → Payment — so documents flow into each other instead of being re-entered by hand. Live today: authentication, bilingual UI, a base dashboard, and three complete modules — Customers, Leads, and Quotations.',
      descAr: 'نظام ERP بنموذج SaaS، أي شركة تقدر تسجل وتاخد نسخة معزولة بالكامل، بيحاكي دورة البيع الحقيقية: عميل محتمل ← عرض سعر ← أمر بيع ← تسليم ← فاتورة ← تحصيل — فكل مستند بياناته بتتنقل تلقائي للي بعده من غير إعادة إدخال. الشغال حاليًا: تسجيل الدخول، واجهة عربي/إنجليزي، لوحة تحكم أساسية، وثلاث موديولات كاملة: العملاء، فرص المبيعات، وعروض الأسعار.',
      stack: ['Multi-Tenant SaaS', 'Sales & CRM', 'Inventory', 'Accounting'],
      note: { en:'Currently covers the start of the sales cycle only; inventory, purchasing, accounting, and user permissions are next on the roadmap', ar:'بيغطي حاليًا بداية دورة المبيعات بس؛ المخزون والمشتريات والمحاسبة وصلاحيات المستخدمين هي الخطوة الجاية' },
    },
    {
      id: 'os',
      images: ['/platforms/mirnex-os-1.jpeg'],
      titleEn: 'Mirnex OS — AI Business Readiness Platform', titleAr: 'Mirnex OS — منصة تقييم جاهزية الأعمال بالذكاء الاصطناعي',
      descEn: 'An AI-powered assessment tool that scores a company\'s operational and AI readiness, estimates potential savings and ROI trajectory over time, and benchmarks the business against its sector — combining risk analysis with a market comparison view.',
      descAr: 'أداة تقييم مدعومة بالذكاء الاصطناعي بتحسب درجة جاهزية الشركة التشغيلية ولتطبيق الذكاء الاصطناعي، وبتقدّر التوفير المحتمل ومسار العائد على الاستثمار عبر الوقت، وبتقارن الشركة بمتوسط قطاعها — مع تحليل مخاطر ومقارنة بالسوق.',
      stack: ['AI Assessment Engine', 'Analytics Dashboard'],
      note: { en:null, ar:null },
    },
  ];

  const booksData = [


    {
      id: 'mirnex',
      cover: '/books/cover-mirnex-analytics.png',
      infographicAr: '/books/infographic-mirnex-analytics-ar.png',
      titleEn: 'Mirnex Analytics — Power BI & DAX Master Library',
      titleAr: 'مكتبة ميرنكس أناليتكس — المرجع الشامل لـ Power BI وDAX',
      descEn: "A production-grade reference for mastering Microsoft Power BI and DAX — built around the 80/20 rule: 80% of performance issues and inaccurate KPIs come from poor data modeling, not complex formulas. Covers Star Schema architecture, 500+ ready DAX formulas, a 180+ KPI dictionary, and disciplined dashboard design across 21 chapters.",
      descAr: "مرجع احترافي لاحتراف Power BI وDAX، مبني على قاعدة 80/20: 80% من مشاكل الأداء ودقة المؤشرات سببها ضعف نمذجة البيانات وليس تعقيد المعادلات. يغطي الكتاب هيكلة Star Schema، وأكثر من 500 معادلة DAX جاهزة، وقاموس يضم أكثر من 180 مؤشر أداء، وأسس تصميم الداشبورد عبر 21 فصلًا.",
      stats: [ { n:'500+', l: isAr ? 'معادلة DAX' : 'DAX Formulas' }, { n:'21', l: isAr ? 'فصل' : 'Chapters' }, { n:'180+', l: isAr ? 'مؤشر أداء' : 'KPIs' } ],
      videoEn: 'w7194kQtJck',
      videoAr: '1JEfFFdnwd0',
    },
    {
      id: 'datamodeling',
      cover: '/books/cover-data-modeling.png',
      infographicAr: '/books/infographic-data-modeling-ar.png',
      titleEn: 'Data Modeling Mastery: Enterprise Architecture for Power BI & AI Systems',
      titleAr: 'احتراف نمذجة البيانات: هندسة المؤسسات لـ Power BI وأنظمة الذكاء الاصطناعي',
      descEn: "A practical guide to understanding, designing, and applying data models that drive real business results. Explains why a well-designed semantic model — not visualization or DAX complexity — is the true foundation of reliable Business Intelligence and AI systems, with real-world examples across multiple industries.",
      descAr: "دليل عملي لفهم وتصميم وتطبيق نماذج البيانات التي تحقق نتائج أعمال حقيقية. يشرح الكتاب لماذا يُعد النموذج الدلالي (Semantic Model) المصمم جيدًا — وليس تعقيد العرض المرئي أو DAX — هو الأساس الحقيقي لأي نظام Business Intelligence أو ذكاء اصطناعي موثوق، مع أمثلة واقعية من صناعات متعددة.",
      stats: [ { n:'80%', l: isAr ? 'قاعدة الأداء والدقة' : 'Performance & Accuracy Rule' }, { n:'★', l: isAr ? 'Star Schema' : 'Star Schema Standard' }, { n:'AI', l: isAr ? 'جاهز لأنظمة الذكاء الاصطناعي' : 'AI-Ready Foundation' } ],
      videoEn: 'B7SS61Ux5rI',
      videoAr: 'Uwi_HHPQ-CU',
    },
  ];

  const freeResources = [
    { file:'/resources/Free-AI-Prompts-Lead-Magnet.pdf', preview:'/resources/preview-ai-prompts-free.jpg',
      titleEn:'10 Free AI Prompts for Small Business Owners', titleAr:'10 أوامر AI مجانية لأصحاب المشاريع الصغيرة',
      descEn:'Copy-paste-ready prompts for ChatGPT, Claude, or Gemini — a free taste of the AI Small Business Starter Kit, plus a bonus invoice template. No credit card needed.',
      descAr:'أوامر جاهزة للنسخ واللصق فى ChatGPT أو Claude أو Gemini — عينة مجانية من AI Small Business Starter Kit، مع قالب فاتورة إضافي. من غير أي بطاقة ائتمان.' },
    { file:'/resources/Mirnex-DAX-Measure-Template-Library.pdf', preview:'/resources/preview-dax-templates.jpg',
      titleEn:'DAX Measure Template Library', titleAr:'مكتبة قوالب معادلات DAX',
      descEn:'50 production-ready DAX measures across 10 business categories — revenue, profit, margin, growth, forecasting and more. Copy, adapt, ship.',
      descAr:'50 معادلة DAX جاهزة للإنتاج عبر 10 تصنيفات (الإيرادات، الربح، الهامش، النمو، التوقعات وغيرها). انسخ وعدّل واستخدم مباشرة.' },
    { file:'/resources/Mirnex-KPI-Master-Library-and-Dictionary.xlsx', preview:null,
      titleEn:'KPI Master Library & Dictionary', titleAr:'مكتبة وقاموس مؤشرات الأداء (KPI)',
      descEn:'An Excel dictionary of 180+ business KPIs with formulas and definitions — the same library referenced inside the Mirnex Analytics book.',
      descAr:'قاموس إكسل لأكثر من 180 مؤشر أداء بمعادلاتها وتعريفاتها — نفس المكتبة المشار إليها داخل كتاب Mirnex Analytics.' },
    { file:'/resources/Mirnex-Theme-Pack-Catalog.pdf', preview:'/resources/preview-theme-pack.jpg',
      titleEn:'Power BI Theme Pack Catalog', titleAr:'كتالوج ثيمات Power BI',
      descEn:'15 production-ready Power BI report themes with full JSON files — Corporate Blue, Executive Dark, Luxury Black, and more, ready to import.',
      descAr:'15 ثيم جاهز لتقارير Power BI مع ملفات JSON كاملة — Corporate Blue وExecutive Dark وLuxury Black وغيرها، جاهزة للاستيراد المباشر.' },
  ];

  const premiumResources = [
    { preview:'/resources/preview-dax-powerquery-cheatsheets.jpg', titleEn:'DAX & Power Query Cheat Sheet Pack', titleAr:'حزمة أوراق مرجعية DAX وPower Query',
      descEn:'13 DAX topics and 11 Power Query topics as printable one-page quick references.', descAr:'13 موضوع DAX و11 موضوع Power Query كأوراق مرجعية سريعة قابلة للطباعة.', group:'mirnex' },
    { preview:'/resources/preview-dashboard-specs.jpg', titleEn:'Dashboard Design Specifications', titleAr:'مواصفات تصميم الداشبورد',
      descEn:'10 production-ready dashboard blueprints with desktop & mobile wireframes — Executive, Sales, Finance, HR, Retail and more.', descAr:'10 مخططات داشبورد جاهزة للإنتاج مع wireframes لسطح المكتب والموبايل — تنفيذي، مبيعات، مالية، موارد بشرية، تجزئة وغيرها.', group:'mirnex' },
    { preview:'/resources/preview-interview-prep.jpg', titleEn:'Power BI & DAX Interview Prep Kit', titleAr:'حقيبة التحضير لمقابلات Power BI وDAX',
      descEn:'100 interview questions with detailed answers across 8 topic areas, plus recruiter and hiring-manager tips.', descAr:'100 سؤال مقابلة شخصية بإجاباتها التفصيلية عبر 8 محاور، مع نصائح لمسؤولي التوظيف.', group:'mirnex' },
    { preview:'/resources/preview-naming-conventions.jpg', titleEn:'Naming Conventions & Best Practices Handbook', titleAr:'دليل قواعد التسمية وأفضل الممارسات',
      descEn:'10 naming categories and 11 governance & optimization domains — the standards companion to the Mirnex Analytics book.', descAr:'10 تصنيفات تسمية و11 مجال حوكمة وتحسين — الدليل المعياري المكمل لكتاب Mirnex Analytics.', group:'mirnex' },
    { preview:'/resources/preview-star-schema.jpg', titleEn:'Star Schema Blueprint Pack', titleAr:'حزمة مخططات Star Schema',
      descEn:'Ready-made star schema blueprints for common business scenarios, built to production standards.', descAr:'مخططات Star Schema جاهزة لأكثر السيناريوهات التجارية شيوعًا، مبنية بمعايير الإنتاج.', group:'mirnex' },
    { preview:'/resources/preview-ai-prompt-library-100.jpg', titleEn:'The AI Prompt Library — 100 Prompts', titleAr:'مكتبة أوامر الذكاء الاصطناعي — 100 أمر',
      descEn:'100 copy-paste-ready prompts for ChatGPT, Claude, or Gemini across 7 business functions — marketing, sales, service, operations, strategy, finance and research.', descAr:'100 أمر جاهز للنسخ لـ ChatGPT وClaude وGemini عبر 7 مجالات: تسويق، مبيعات، خدمة عملاء، عمليات، استراتيجية، مالية وأبحاث.', group:'starterkit' },
    { preview:null, titleEn:'AI Small Business Starter Kit — Workbook Demo', titleAr:'عرض توضيحي لحقيبة AI Small Business Starter Kit',
      descEn:'A demo Excel workbook showcasing the operational structure inside the full AI Small Business Starter Kit.', descAr:'ملف إكسل تجريبي يوضح الهيكل التشغيلي داخل حقيبة AI Small Business Starter Kit الكاملة.', group:'starterkit' },
    { preview:'/resources/preview-templates-worksheets.jpg', titleEn:'Templates & Worksheets Companion', titleAr:'مرافق القوالب وأوراق العمل',
      descEn:'Printable, fillable worksheets covering business planning, sales, customer management, productivity, checklists and SOPs.', descAr:'أوراق عمل قابلة للطباعة والتعبئة تغطي التخطيط، المبيعات، إدارة العملاء، الإنتاجية، القوائم والإجراءات التشغيلية.', group:'starterkit' },
    { preview:'/resources/preview-notion-dashboard.jpg', titleEn:'Your Notion Dashboard — First Steps', titleAr:'داشبورد Notion — الخطوات الأولى',
      descEn:'A guided setup for a fully working Notion dashboard with 5 connected databases: sales pipeline, content calendar, CRM tracker, SOPs, and checklists.', descAr:'دليل إعداد داشبورد Notion متكامل بـ5 قواعد بيانات مترابطة: خط المبيعات، تقويم المحتوى، متابعة العملاء، الإجراءات، والقوائم.', group:'starterkit' },
  ];

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
      <div style={{height:'150px', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'var(--bg-elevated-2)', fontSize:'40px'}}>🏆</div>
    ) : (
      <img src={process.env.PUBLIC_URL + `/images/certificates/${cert.img}`} alt={cert.name} loading="lazy" style={{width:'100%', height:'150px', objectFit:'cover'}} onError={() => setImgError(true)}/>
    );
  };

  const ModalImage = ({ cert }) => {
    const [imgError, setImgError] = useState(false);
    return imgError ? (
      <div style={{height:'300px', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'var(--bg-elevated-2)', fontSize:'60px', borderRadius:'8px'}}>🏆</div>
    ) : (
      <img src={process.env.PUBLIC_URL + `/images/certificates/${cert.img}`} alt={cert.name} style={{width:'100%', borderRadius:'8px', border:'1px solid rgba(197,168,128,0.3)'}} onError={() => setImgError(true)}/>
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
    ? ['من أنا', 'الخبرات', 'المهارات', 'الشهادات', 'المشاريع', 'المنصات', 'الكتب', 'المنتجات', 'تواصل']
    : ['About', 'Experience', 'Skills', 'Certifications', 'Projects', 'Platforms', 'Books', 'Resources', 'Contact'];
  const navAnchors = ['about', 'experience', 'skills', 'certifications', 'projects', 'platforms', 'books', 'resources', 'contact'];

  return (
    <div className={`app-shell ${isAr ? 'lang-ar' : 'lang-en'}`} data-theme={theme}
      style={{direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left'}}>

      {/* PRELOADER */}
      {showPreloader && (
        <div className="preloader">
          <div className="pct">{loadProgress}</div>
          <div className="bar-track"><div className="bar-fill" style={{width:`${loadProgress}%`}}/></div>
          <div className="tag">Loading Portfolio · جارٍ التحميل</div>
        </div>
      )}

      {/* LANGUAGE GATE */}
      {showGate && !showPreloader && (
        <div className="gate">
          <div className="gate-ring">
            <img src={process.env.PUBLIC_URL + "/images/profile.jpg"} alt="Hatem Kandeel"
              onError={(e) => { e.target.style.display = 'none'; }}/>
          </div>
          <h1 className="font-serif-ui" style={{fontSize:'clamp(2rem,6vw,3.5rem)', marginBottom:'12px', color:'var(--gold-bright)'}}>
            Welcome <span style={{color:'var(--violet)'}}>•</span> أهلاً بك
          </h1>
          <p style={{color:'var(--text-muted)', maxWidth:'560px', marginBottom:'8px', fontWeight:300}}>
            To Hatem Kandeel's executive portfolio — 20+ years turning commercial leadership into data-driven strategy.
          </p>
          <p style={{color:'var(--text-muted)', maxWidth:'560px', marginBottom:'48px', fontFamily:"'Cairo',sans-serif"}} dir="rtl">
            إلى البورتفوليو التنفيذي لحاتم قنديل — أكثر من 20 عامًا من تحويل القيادة التجارية إلى استراتيجية مبنية على البيانات.
          </p>
          <div style={{display:'flex', gap:'24px', flexWrap:'wrap', justifyContent:'center'}}>
            <div className="lang-card" onClick={() => enterSite('en')}>
              <div style={{fontSize:'1.8rem', marginBottom:'8px'}}>🇬🇧</div>
              <div style={{fontWeight:700, color:'var(--text)'}}>English</div>
              <div style={{fontSize:'11px', color:'var(--text-dim)', marginTop:'4px'}}>Enter site</div>
            </div>
            <div className="lang-card" onClick={() => enterSite('ar')}>
              <div style={{fontSize:'1.8rem', marginBottom:'8px'}}>🇪🇬</div>
              <div style={{fontWeight:700, color:'var(--text)', fontFamily:"'Cairo',sans-serif"}}>العربية</div>
              <div style={{fontSize:'11px', color:'var(--text-dim)', marginTop:'4px', fontFamily:"'Cairo',sans-serif"}}>ادخل الموقع</div>
            </div>
          </div>
        </div>
      )}

      {siteEntered && (
      <>
      {/* NAVBAR */}
      <nav className="site-nav">
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'14px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px'}}>
          <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="HK Logo" style={{height:'44px', width:'auto'}}/>
          <div style={{display:'flex', gap:'22px', alignItems:'center', flexWrap:'wrap'}}>
            {navLinks.map((item, idx) => (
              <a key={item} href={`#${navAnchors[idx]}`} style={{fontSize:'14px', letterSpacing: isAr ? '0' : '.03em'}}>
                {item}
              </a>
            ))}
          </div>
          <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="toggle theme" title={theme==='dark' ? 'Light mode' : 'Dark mode'}>
              {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="pill-btn" style={{padding:'6px 15px', fontSize:'13px'}}>
              {lang === 'en' ? 'AR عربية' : 'EN English'}
            </button>
          </div>
        </div>
        <div id="scrollProgress" style={{width:`${scrollPct}%`}}/>
      </nav>

      {/* HERO */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="hero" ref={heroRef} style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'130px 20px 60px', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:.5, pointerEvents:'none',
          backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',
          backgroundSize:'56px 56px', maskImage:'linear-gradient(to bottom,black,transparent 75%)', WebkitMaskImage:'linear-gradient(to bottom,black,transparent 75%)'}}/>

        <div className="glass-card" style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'8px 18px', borderRadius:'999px', marginBottom:'28px'}}>
          <Zap size={13} color="var(--violet)"/>
          <span style={{fontSize:'11px', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--violet)', fontWeight:700}}>
            {isAr ? 'المحفظة التنفيذية' : "Executive Portfolio"}
          </span>
        </div>

        <div style={{position:'relative', width:'170px', height:'170px', marginBottom:'26px'}}>
          <div className="orbit-ring orbit-ring-1"/>
          <div className="orbit-ring orbit-ring-2"/>
          <div style={{position:'absolute', top:'10px', left:'10px', width:'150px', height:'150px', borderRadius:'50%', border:'3px solid var(--gold)', overflow:'hidden', boxShadow:'0 0 40px rgba(197,168,128,0.35)'}}>
            <motion.img src={process.env.PUBLIC_URL + "/images/profile.jpg"} alt="Hatem Kandeel" style={{width:'100%', height:'100%', objectFit:'cover', filter: heroImgFilter}}/>
          </div>
        </div>

        <h1 className="font-serif-ui" style={{fontSize:'clamp(2.4rem,6vw,3.7rem)', fontWeight:700, marginBottom:'12px', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
          {isAr ? 'حاتم قنديل' : 'Hatem A. Kandeel'}
        </h1>
        <div style={{fontSize:'1.15rem', color:'var(--gold)', minHeight:'34px', marginBottom:'18px', fontWeight:600}}>{text}<span style={{opacity:.6}}>|</span></div>
        <p style={{color:'var(--text-muted)', fontSize:'1rem', maxWidth:'620px', lineHeight:'1.8', marginBottom:'8px'}}>
          {isAr ? 'قائد تجاري يدمج الخبرة العملية مع ذكاء الأعمال والاستراتيجية المبنية على البيانات' : 'Commercial Leader transitioning into Business Intelligence & Data-Driven Strategy'}
        </p>

        <div style={{display:'flex', gap:'15px', marginTop:'26px', flexWrap:'wrap', justifyContent:'center'}}>
          <a href="#contact" className="gold-btn" style={{padding:'14px 32px', textDecoration:'none', fontSize:'13px', display:'inline-block'}}>
            {isAr ? 'وظفني' : 'Hire Me'}
          </a>
          <a href="#certifications" className="pill-btn" style={{padding:'14px 32px', textDecoration:'none', fontSize:'13px', display:'inline-block'}}>
            {isAr ? 'الشهادات' : 'View Certificates'}
          </a>
          <a href={process.env.PUBLIC_URL + "/cv.pdf"} download="Hatem_Kandeel_CV.pdf" className="pill-btn" style={{padding:'14px 32px', textDecoration:'none', fontSize:'13px', display:'inline-block', borderColor:'var(--text-muted)', color:'var(--text)'}}>
            {isAr ? '📄 تحميل السيرة الذاتية' : '📄 Download CV'}
          </a>
        </div>

        {/* Stats */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:'18px', marginTop:'50px', width:'100%', maxWidth:'760px'}}>
          {[
            {num:'20+', label: isAr ? 'سنوات خبرة' : 'Years Experience', Icon: TrendingUp},
            {num:'200%', label: isAr ? 'نمو في الإيرادات' : 'Revenue Growth', Icon: LineChart},
            {num:'50+', label: isAr ? 'موظف قادهم' : 'Team Members Led', Icon: Users},
            {num:'26', label: isAr ? 'شهادة مهنية' : 'Certifications', Icon: GraduationCap},
          ].map(item => (
            <div key={item.label} className="glass-card" style={{padding:'18px 12px', borderRadius:'14px', textAlign:'center'}}>
              <item.Icon size={18} color="var(--gold)" style={{marginBottom:'6px'}}/>
              <div className="font-serif-ui" style={{fontSize:'1.8rem', fontWeight:800, color:'var(--gold)'}}>{item.num}</div>
              <div style={{color:'var(--text-muted)', fontSize:'10px', letterSpacing:'.05em', marginTop:'4px', textTransform:'uppercase'}}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Video Intro */}
        <div style={{marginTop:'60px', width:'100%', maxWidth:'800px'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'12px', marginBottom:'15px'}}>
            {isAr ? '🎬 شاهد مقدمتي' : '🎬 WATCH MY INTRO'}
          </p>
          <div className="glass-card" style={{position:'relative', paddingBottom:'56.25%', height:0, borderRadius:'16px', overflow:'hidden'}}>
            <iframe
              src={isAr ? "https://www.youtube.com/embed/yOkay2ybqGM" : "https://www.youtube.com/embed/ri5AcGWM8iY"}
              title="Hatem Kandeel Intro"
              style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="about" style={{padding:'90px 24px', maxWidth:'1150px', margin:'0 auto', display:'flex', gap:'50px', alignItems:'flex-start', flexWrap:'wrap'}}>
        <div style={{flex:1, minWidth:'280px'}}>
          <div className="glass-card" style={{borderRadius:'16px', overflow:'hidden'}}>
            <img src={process.env.PUBLIC_URL + "/images/profile.jpg"} alt="Hatem Kandeel" style={{width:'100%', display:'block'}}/>
          </div>

          {/* Audio Player */}
          <div className="glass-card" style={{marginTop:'20px', borderRadius:'14px', padding:'20px', textAlign:'center'}}>
            <p style={{color:'var(--gold)', fontSize:'12px', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '🎧 استمع إلى قصتي' : '🎧 LISTEN TO MY STORY'}
            </p>
            <p style={{color:'var(--text-muted)', fontSize:'12px', marginBottom:'15px'}}>
              {isAr ? 'من العمل الاجتماعي إلى قيادة المبيعات بالذكاء الاصطناعي' : 'From Social Work to AI Sales Leadership'}
            </p>
            <audio ref={audioRef} src={process.env.PUBLIC_URL + (isAr ? "/audio/mystory-ar.m4a" : "/audio/mystory-en.m4a")} onEnded={() => setIsPlaying(false)}/>
            <button onClick={toggleAudio} className="gold-btn" style={{padding:'12px 30px', fontSize:'13px', display:'inline-flex', alignItems:'center', gap:'8px'}}>
              {isPlaying ? <Pause size={14}/> : <Play size={14}/>}
              {isPlaying ? (isAr ? 'إيقاف' : 'Pause') : (isAr ? 'تشغيل قصتي' : 'Play My Story')}
            </button>
          </div>
        </div>

        <div style={{flex:2, minWidth:'280px'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px'}}>
            {isAr ? 'من أنا' : 'WHO I AM'}
          </p>
          <h2 className="font-serif-ui" style={{fontSize:'2.3rem', fontWeight:700, marginBottom:'22px', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'نبذة عني' : 'About Me'}
          </h2>
          <p style={{color:'var(--text-muted)', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'على مدار أكثر من 20 عامًا، بنيت مسيرتي المهنية بالطريقة الصعبة — من الصفر، متعلمًا كل دور من الداخل، ونامياً عبر تحديات حقيقية في صناعات متعددة.'
              : "Over the past 20 years, I've built my career the hard way — starting from scratch, learning every role from the inside, and growing through real challenges across multiple industries."}
          </p>
          <p style={{color:'var(--text-muted)', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'أسست وأدرت شركة نمت من 3 موظفين إلى أكثر من 50، محافظًا على الربحية لمدة 9 سنوات متتالية وحققت نموًا في الإيرادات بنسبة 200%. قدت فرق عمل ميدانية، تفاوضت على عقود كبرى، وبنيت علاقات عملاء من الصفر، وحققت نتائج في قطاعات تتراوح من أنظمة الأمن والعقارات إلى إدارة موارد المياه والتنمية الدولية.'
              : "I founded and managed a company that grew from 3 employees to over 50, maintaining profitability for 9 consecutive years and achieving 200% revenue growth. I've led field teams, negotiated major contracts, built client relationships from scratch, and delivered results in sectors ranging from security systems and real estate to water resource management and international development."}
          </p>
          <p style={{color:'var(--text-muted)', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'ما يميز ملفي الشخصي هو عمق ونطاق الخبرة العملية التي اكتسبتها — العمليات الإدارية، العمل الميداني التقني، قيادة الفرق، تنفيذ المشاريع، التخطيط الاستراتيجي، المشتريات والمتابعة. لم أدر من وراء مكتب فقط — كنت في الميدان، داخل العمل، أفهم كل قسم من الداخل.'
              : "What makes my profile different is the depth and range of hands-on experience — administrative operations, technical field work, team leadership, project execution, strategic planning, procurement and follow-up. I didn't just manage from behind a desk — I was in the field, inside the work, understanding every department from within."}
          </p>
          <p style={{color:'var(--text-muted)', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'18px'}}>
            {isAr
              ? 'على مدار مسيرتي المهنية، تشرفت بالعمل مع بعض أعرق المؤسسات الدولية — البنك الدولي، إيفاد، معهد باري (إيطاليا)، الحكومة الهولندية ومشروعها المشترك في مصر، والحكومة المصرية عبر وزارات متعددة.'
              : "Throughout my career, I've had the honor of working with some of the world's most prestigious international institutions — the World Bank, IFAD, the Bari Institute (Italy), the Dutch Government and its joint project in Egypt, and the Egyptian Government across multiple ministries."}
          </p>
          <p style={{color:'var(--text-muted)', lineHeight:'1.9', fontSize:'0.95rem', marginBottom:'30px'}}>
            {isAr
              ? 'ما يدفعني اليوم هو الإيمان بأن الخبرة وحدها لا تكفي. لهذا أواصل بناء مهاراتي — Power BI، هندسة الأوامر AI، إدارة المشاريع، إدارة العمليات، CRM، Excel المتقدم، تحليل البيانات، الشبكات، وحاليًا أدرس Python والإنجليزية. ليس لأتبع الاتجاهات، بل لأنني أفهم إلى أين يتجه عالم الأعمال — وأعتزم أن أكون في المقدمة.'
              : "What drives me today is the belief that experience alone is not enough. That's why I continue building my skills — Power BI, AI Prompt Engineering, Project Management, Operations Management, CRM, Advanced Excel, Data Analysis, Networking, and currently studying Python and English. Not to follow trends, but because I understand where the business world is heading — and I intend to be at the forefront."}
          </p>
          <div className="glass-card" style={{display:'flex', gap:'30px', flexWrap:'wrap', borderRadius:'14px', padding:'20px 24px'}}>
            {[
              {label: isAr ? 'الموقع' : 'Location', value: isAr ? 'القاهرة الجديدة، مصر' : 'New Cairo, Egypt', Icon: MapPin},
              {label: isAr ? 'الهاتف' : 'Phone', value:'+201036836343', Icon: Phone},
              {label: isAr ? 'البريد الإلكتروني' : 'Email', value:'hakkandeel@gmail.com', Icon: Mail},
              {label: isAr ? 'اللغات' : 'Languages', value: isAr ? 'العربية | الإنجليزية' : 'Arabic | English', Icon: Languages2}
            ].map(item => (
              <div key={item.label} style={{display:'flex', alignItems:'flex-start', gap:'8px'}}>
                <item.Icon size={14} color="var(--gold)" style={{marginTop:'3px'}}/>
                <div>
                  <div style={{color:'var(--gold)', fontSize:'11px', letterSpacing:'.05em', marginBottom:'4px', textTransform:'uppercase'}}>{item.label}</div>
                  <div style={{color:'var(--text)', fontSize:'14px'}}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PILLARS — built from the same facts above, just highlighted */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="pillars" style={{padding:'70px 24px', maxWidth:'1150px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px'}}>
          <div className="glass-card" style={{borderRadius:'16px', padding:'32px'}}>
            <div style={{width:'52px', height:'52px', borderRadius:'12px', background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
              <Globe2 size={24} color="var(--violet)"/>
            </div>
            <h3 className="font-serif-ui" style={{fontSize:'1.4rem', fontWeight:700, marginBottom:'12px', color:'var(--text)'}}>
              {isAr ? 'التنمية الدولية والشراكات المؤسسية' : 'International Development & Institutional Partnerships'}
            </h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
              {isAr
                ? 'العمل مع البنك الدولي وإيفاد ومعهد باري (إيطاليا) والحكومة الهولندية والحكومة المصرية عبر وزارات متعددة.'
                : 'Working with the World Bank, IFAD, the Bari Institute (Italy), the Dutch Government, and the Egyptian Government across multiple ministries.'}
            </p>
          </div>
          <div className="glass-card" style={{borderRadius:'16px', padding:'32px'}}>
            <div style={{width:'52px', height:'52px', borderRadius:'12px', background:'rgba(197,168,128,0.12)', border:'1px solid var(--border-strong)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
              <Cpu size={24} color="var(--gold)"/>
            </div>
            <h3 className="font-serif-ui" style={{fontSize:'1.4rem', fontWeight:700, marginBottom:'12px', color:'var(--text)'}}>
              {isAr ? 'البيانات وذكاء الأعمال والذكاء الاصطناعي' : 'Data, BI & AI'}
            </h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
              {isAr
                ? 'Power BI، هندسة أوامر الذكاء الاصطناعي، إدارة المشاريع والعمليات، CRM، Excel المتقدم، تحليل البيانات، والشبكات — مع دراسة مستمرة لـ Python والإنجليزية.'
                : 'Power BI, AI Prompt Engineering, Project & Operations Management, CRM, Advanced Excel, Data Analysis, and Networking — with ongoing study of Python and English.'}
            </p>
          </div>
          <div className="glass-card" style={{borderRadius:'16px', padding:'32px'}}>
            <div style={{width:'52px', height:'52px', borderRadius:'12px', background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
              <TrendingUp size={24} color="var(--violet)"/>
            </div>
            <h3 className="font-serif-ui" style={{fontSize:'1.4rem', fontWeight:700, marginBottom:'12px', color:'var(--text)'}}>
              {isAr ? 'النمو التجاري وتطوير الأعمال' : 'Commercial Growth & Business Development'}
            </h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
              {isAr
                ? 'تأسيس وقيادة شركة نمت من 3 موظفين إلى أكثر من 50، بربحية مستمرة لـ9 سنوات ونمو إيرادات بنسبة 200%، مع قيادة عمليات B2B فى قطاع أنظمة الأمن.'
                : 'Founded and led a company that grew from 3 employees to 50+, sustaining 9 years of profitability and 200% revenue growth, while driving B2B sales operations in the security systems sector.'}
            </p>
          </div>
        </div>
      </motion.section>

      {/* ACHIEVEMENTS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="achievements" style={{padding:'80px 24px', backgroundColor:'var(--bg-elevated)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'النتائج بالأرقام' : 'RESULTS BY THE NUMBERS'}
          </p>
          <h2 className="font-serif-ui" style={{fontSize:'2.2rem', fontWeight:700, marginBottom:'50px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'النمو بذكاء' : 'Growth, By Design'}
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'30px'}}>
            {[
              {
                label: isAr ? 'تجاوز أهداف النمو خلال 6 أشهر' : '6-Month Growth Target Exceeded',
                value: 170, suffix: '%',
                desc: isAr ? 'تأسيس خمسة مجالس إدارة ونقل المشروع من الإعداد للتنفيذ الكامل' : 'Established 5 boards of directors, moving the project from setup to full execution',
                Icon: Target,
              },
              {
                label: isAr ? 'تحقيق أهداف المبيعات' : 'Sales Target Achievement',
                value: 120, suffix: '%',
                desc: isAr ? 'مع التوسع فى أسواق جديدة وشبكة وكلاء فى 6 محافظات' : 'While expanding into new markets with an agent network across 6 governorates',
                Icon: BarChart3,
              },
              {
                label: isAr ? 'نمو الفريق' : 'Team Growth',
                value: 100, suffix: '', display: isAr ? '3 ← 50+' : '3 → 50+',
                desc: isAr ? 'من 3 موظفين إلى أكثر من 50، بربحية مستمرة 9 سنوات' : 'From 3 employees to 50+, with 9 straight years of profitability',
                Icon: Users,
              },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{borderRadius:'16px', padding:'26px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px'}}>
                  <item.Icon size={18} color="var(--gold)"/>
                  <span style={{color:'var(--text)', fontSize:'13px', fontWeight:600}}>{item.label}</span>
                </div>
                <div className="font-serif-ui" style={{fontSize:'2rem', fontWeight:800, color:'var(--gold)', marginBottom:'10px'}}>
                  {item.display || `${item.value}${item.suffix}`}
                </div>
                <div className="achv-bar-track">
                  <motion.div className="achv-bar-fill" initial={{width:0}} whileInView={{width:`${Math.min(item.value,100)}%`}} viewport={{once:true}} transition={{duration:1.2, ease:[0.16,1,0.3,1], delay:i*0.15}}/>
                </div>
                <p style={{color:'var(--text-muted)', fontSize:'12px', lineHeight:'1.7', marginTop:'12px'}}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CAREER TIMELINE */}
          <div style={{marginTop:'70px'}}>
            <h3 className="font-serif-ui" style={{fontSize:'1.4rem', fontWeight:700, marginBottom:'36px', textAlign:'center', color:'var(--text)'}}>
              {isAr ? 'رحلة من الإتقان التشغيلي' : 'A Journey of Operational Mastery'}
            </h3>
            <div style={{position:'relative', paddingLeft: isAr ? 0 : '20px', paddingRight: isAr ? '20px' : 0}}>
              <div style={{position:'absolute', top:0, bottom:0, left: isAr ? 'auto' : '29px', right: isAr ? '29px' : 'auto', width:'2px', background:'linear-gradient(var(--border-strong), transparent)'}}/>
              {[...experiences].reverse().map((exp, i) => (
                <div key={i} style={{display:'flex', gap:'20px', marginBottom:'26px', position:'relative'}}>
                  <div style={{flexShrink:0, width:'18px', height:'18px', borderRadius:'50%', background:'var(--bg)', border:'3px solid var(--gold)', marginTop:'4px', zIndex:1}}/>
                  <div className="glass-card" style={{borderRadius:'12px', padding:'16px 20px', flex:1}}>
                    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px', marginBottom:'4px'}}>
                      <span style={{color:'var(--text)', fontWeight:700, fontSize:'14px'}}>{exp.title}</span>
                      <span style={{color:'var(--gold)', fontSize:'12px', fontWeight:600}}>{exp.period}</span>
                    </div>
                    <span style={{color:'var(--text-muted)', fontSize:'12px'}}>{exp.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ready-made Career Infographic */}
          <div style={{marginTop:'50px'}}>
            <img src={process.env.PUBLIC_URL + (isAr ? "/images/growth-story-ar.png" : "/images/growth-story-en.png")}
              alt={isAr ? "مسيرة نجاح حاتم قنديل المهنية" : "Hatem Kandeel: 20 Years of Strategic Growth"}
              loading="lazy" style={{width:'100%', borderRadius:'14px', border:'1px solid var(--border)'}}/>
          </div>

          {/* DATA CHARTS */}
          <div style={{marginTop:'70px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'30px'}}>
            <div className="glass-card" style={{borderRadius:'16px', padding:'30px'}}>
              <h4 style={{color:'var(--text)', fontSize:'1rem', fontWeight:700, marginBottom:'6px'}}>
                {isAr ? 'أبرز المهارات التقنية والتجارية' : 'Top Technical & Business Skills'}
              </h4>
              <p style={{color:'var(--text-dim)', fontSize:'11px', marginBottom:'20px'}}>
                {isAr ? 'مستوى الإتقان الذاتي المُقيَّم (%)' : 'Self-assessed proficiency level (%)'}
              </p>
              <div dir="ltr">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={topSkillsChartData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false}/>
                    <XAxis type="number" domain={[0,100]} tick={{fill:'var(--text-dim)', fontSize:11}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
                    <YAxis type="category" dataKey="name" width={150} orientation="left" tick={{fill:'var(--text-muted)', fontSize:11}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{background:'var(--bg-elevated)', border:'1px solid var(--border-strong)', borderRadius:'8px', color:'var(--text)'}} formatter={(v) => [`${v}%`, isAr ? 'المستوى' : 'Level']}/>
                    <Bar dataKey="level" radius={[0,6,6,0]}>
                      {topSkillsChartData.map((entry, idx) => (
                        <Cell key={idx} fill={idx % 2 === 0 ? 'var(--gold)' : 'var(--violet)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card" style={{borderRadius:'16px', padding:'30px'}}>
              <h4 style={{color:'var(--text)', fontSize:'1rem', fontWeight:700, marginBottom:'6px'}}>
                {isAr ? 'توزيع الشهادات حسب المصدر' : 'Certifications by Source'}
              </h4>
              <p style={{color:'var(--text-dim)', fontSize:'11px', marginBottom:'20px'}}>
                {isAr ? `${certTabs.reduce((s,t)=>s+t.count,0)} شهادة موثّقة إجمالًا` : `${certTabs.reduce((s,t)=>s+t.count,0)} verified certificates total`}
              </p>
              <div dir="ltr">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={certTabs} dataKey="count" nameKey="label" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
                      {certTabs.map((entry, idx) => (
                        <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{background:'var(--bg-elevated)', border:'1px solid var(--border-strong)', borderRadius:'8px', color:'var(--text)'}}/>
                    <Legend wrapperStyle={{fontSize:'11px', color:'var(--text-muted)'}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="experience" style={{padding:'100px 40px', backgroundColor:'var(--bg-elevated)'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'رحلتي المهنية' : 'MY JOURNEY'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'60px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'الخبرة المهنية' : 'Professional Experience'}
          </h2>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute', [isAr ? 'right' : 'left']:'20px', top:0, bottom:0, width:'2px', backgroundColor:'var(--gold)', opacity:0.3}}/>
            {experiences.map((exp, index) => (
              <div key={index} style={{display:'flex', gap:'40px', marginBottom:'50px', position:'relative', flexDirection: isAr ? 'row-reverse' : 'row'}}>
                <div style={{width:'42px', height:'42px', borderRadius:'50%', backgroundColor:'var(--bg-elevated)', border:'2px solid var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1}}>
                  <div style={{width:'12px', height:'12px', borderRadius:'50%', backgroundColor:'var(--gold)'}}/>
                </div>
                <div className="glass-card timeline-node" style={{borderRadius:'12px', padding:'25px 30px', flex:1}}>
                  <span style={{color:'var(--gold)', fontSize:'12px', letterSpacing:'2px'}}>{exp.period}</span>
                  <h3 style={{fontSize:'1.2rem', fontWeight:'700', margin:'8px 0 4px', color:'var(--text)'}}>{exp.title}</h3>
                  <p style={{color:'var(--gold)', fontSize:'14px', marginBottom:'4px'}}>{exp.company}</p>
                  <p style={{color:'var(--text-dim)', fontSize:'12px', marginBottom:'15px'}}>{exp.location}</p>
                  <ul style={{paddingLeft: isAr ? '0' : '20px', paddingRight: isAr ? '20px' : '0', margin:0}}>
                    {exp.points.map((point, i) => (
                      <li key={i} style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'6px'}}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="skills" style={{padding:'100px 40px', backgroundColor:'var(--bg)'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'ما أقدمه' : 'WHAT I BRING'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'15px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'المهارات والخبرات' : 'Skills & Expertise'}
          </h2>
          <p style={{color:'var(--text-dim)', textAlign:'center', marginBottom:'60px', fontSize:'13px'}}>
            {isAr ? '💡 انقر على أي مهارة لمعرفة المزيد' : '💡 Click on any skill to learn more'}
          </p>
          <h3 style={{color:'var(--gold)', fontSize:'1rem', letterSpacing:'3px', marginBottom:'30px'}}>
            {isAr ? '⚙️ المهارات التقنية' : '⚙️ HARD SKILLS'}
          </h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'15px', marginBottom:'60px'}}>
            {hardSkills.map((skill, i) => (
              <div key={i} onClick={() => setActiveSkill(activeSkill === `h${i}` ? null : `h${i}`)}
                style={{backgroundColor: activeSkill === `h${i}` ? 'rgba(197,168,128,0.12)' : 'var(--bg-elevated)', borderRadius:'10px', padding:'18px 20px', border: activeSkill === `h${i}` ? '1px solid var(--gold)' : '1px solid rgba(197,168,128,0.15)', cursor:'pointer', transition:'all 0.3s'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                  <span style={{color:'var(--text)', fontSize:'14px', fontWeight:'600'}}>
                    {skill.icon} {skill.name}
                    {skill.inProgress && <span style={{color:'var(--gold)', fontSize:'10px', marginLeft:'8px', marginRight:'8px', border:'1px solid var(--gold)', padding:'2px 6px', borderRadius:'10px'}}>{isAr ? 'قيد التعلم' : 'In Progress'}</span>}
                  </span>
                  <span style={{color:'var(--gold)', fontSize:'13px', fontWeight:'700'}}>{skill.level}%</span>
                </div>
                <div style={{backgroundColor:'rgba(148,163,184,0.15)', borderRadius:'50px', height:'6px', overflow:'hidden', marginBottom:'10px'}}>
                  <div style={{height:'100%', width:`${skill.level}%`, borderRadius:'50px', background:'linear-gradient(90deg, var(--gold), var(--gold-bright))'}}/>
                </div>
                {activeSkill === `h${i}` && (
                  <p style={{color:'var(--text-muted)', fontSize:'12px', lineHeight:'1.7', marginTop:'10px', borderTop:'1px solid rgba(197,168,128,0.2)', paddingTop:'10px'}}>{skill.desc}</p>
                )}
              </div>
            ))}
          </div>
          <h3 style={{color:'var(--gold)', fontSize:'1rem', letterSpacing:'3px', marginBottom:'30px'}}>
            {isAr ? '🌟 المهارات الشخصية' : '🌟 SOFT SKILLS'}
          </h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'15px'}}>
            {softSkills.map((skill, i) => (
              <div key={i} onClick={() => setActiveSkill(activeSkill === `s${i}` ? null : `s${i}`)}
                style={{backgroundColor: activeSkill === `s${i}` ? 'rgba(197,168,128,0.12)' : 'var(--bg-elevated)', borderRadius:'10px', padding:'18px 20px', border: activeSkill === `s${i}` ? '1px solid var(--gold)' : '1px solid rgba(197,168,128,0.15)', cursor:'pointer', transition:'all 0.3s'}}>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom: activeSkill === `s${i}` ? '10px' : '0'}}>
                  <span style={{fontSize:'20px'}}>{skill.icon}</span>
                  <span style={{color:'var(--text)', fontSize:'13px', fontWeight:'600'}}>{skill.name}</span>
                </div>
                {activeSkill === `s${i}` && (
                  <p style={{color:'var(--text-muted)', fontSize:'12px', lineHeight:'1.7', borderTop:'1px solid rgba(197,168,128,0.2)', paddingTop:'10px', margin:0}}>{skill.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATIONS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="certifications" style={{padding:'100px 40px', backgroundColor:'var(--bg-elevated)'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'مؤهلاتي' : 'MY CREDENTIALS'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'15px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'الشهادات المهنية' : 'Certifications'}
          </h2>
          <p style={{color:'var(--text-dim)', textAlign:'center', marginBottom:'40px', fontSize:'13px'}}>
            {isAr ? '26 شهادة مهنية — انقر على أي شهادة للعرض' : '26 Professional Certifications — Click any certificate to view'}
          </p>
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'center', marginBottom:'40px'}}>
            {certTabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{padding:'10px 20px', borderRadius:'50px', border:'1px solid var(--gold)', backgroundColor: activeTab === tab.id ? 'var(--gold)' : 'transparent', color: activeTab === tab.id ? 'var(--bg)' : 'var(--gold)', cursor:'pointer', fontSize:'13px', fontWeight:'600', transition:'all 0.3s'}}>
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'20px'}}>
            {certificates[activeTab].map((cert, i) => (
              <div key={i} onClick={() => setSelectedCert(cert)}
                style={{backgroundColor:'var(--bg)', borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(197,168,128,0.2)', cursor:'pointer', transition:'all 0.3s', boxShadow:'0 4px 15px var(--shadow-color)'}}
                onMouseOver={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.transform='translateY(-5px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor='rgba(197,168,128,0.2)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <CertImage cert={cert} />
                <div style={{padding:'15px'}}>
                  <p style={{color:'var(--text)', fontSize:'13px', fontWeight:'600', marginBottom:'5px', lineHeight:'1.4'}}>{cert.name}</p>
                  <p style={{color:'var(--text-muted)', fontSize:'11px', lineHeight:'1.5', marginBottom:'8px'}}>{cert.desc.substring(0, 80)}...</p>
                  <p style={{color:'var(--gold)', fontSize:'11px'}}>{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="projects" style={{padding:'100px 40px', backgroundColor:'var(--bg)'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'أعمالي' : 'MY WORK'}
          </p>
          <h2 style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'20px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'المشاريع والمحتوى' : 'Projects & Content'}
          </h2>
          
          {/* Intro Text */}
          <div style={{textAlign:'center', maxWidth:'800px', margin:'0 auto 60px'}}>
            <h3 style={{fontSize:'1.3rem', color:'var(--gold)', fontWeight:'600', marginBottom:'15px', lineHeight:'1.6'}}>
              {isAr 
                ? 'محفظة أعمال ذكاء الأعمال والتحليل'
                : 'Business Intelligence & Analytics Portfolio'}
            </h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:'1.8'}}>
              {isAr
                ? 'أجمع بين خبرة تجارية تتجاوز 20 عامًا وأدوات التحليل وذكاء الأعمال الحديثة لتحويل البيانات إلى قرارات استراتيجية.'
                : 'Combining 20+ years of commercial leadership with modern BI and analytics tools to turn business data into strategic decisions.'}
            </p>
          </div>

          {/* SPORTS COMPANY PROJECT - FEATURED */}
          <div className="glass-card" style={{marginBottom:'80px', padding:'40px', backgroundColor:'var(--bg-elevated)', borderRadius:'12px', border:'2px solid var(--gold)'}}>
            <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'15px'}}>
              <span style={{backgroundColor:'var(--gold)', color:'var(--bg)', padding:'6px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', letterSpacing:'1px'}}>
                {isAr ? '⭐ مشروع ذكاء أعمال مميز' : '⭐ FEATURED BI PROJECT'}
              </span>
            </div>
            <h3 style={{color:'var(--gold)', fontSize:'1.5rem', letterSpacing:'1px', marginBottom:'20px', fontWeight:'700'}}>
              {isAr ? '⚽ تحليل مبيعات وربحية شركة رياضية | Power BI' : '⚽ Sports Company Sales & Profitability Analysis | Power BI'}
            </h3>

            {/* Overview */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '📋 نظرة عامة' : '📋 OVERVIEW'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px'}}>
                {isAr
                  ? 'طورت حلاً شاملاً للذكاء الأعمالي لشركة متخصصة في الملابس الرياضية في المملكة المتحدة، مع تحليل أكثر من 8,300 معاملة بيع عبر إنجلترا واسكتلندا وويلز بين عامي 2018 و2021. بنيت لوحة بيانات احترافية في Power BI تتضمن 24 صفحة تفاعلية، مستخدماً Star Schema لنمذجة البيانات، وتحويلات Power Query، و16 مقياساً متقدماً في DAX لكشف رؤى الأعمال ودعم اتخاذ القرارات الاستراتيجية.'
                  : 'Developed a comprehensive Business Intelligence solution for a UK-based sports apparel company, analyzing over 8,300 sales transactions across England, Scotland, and Wales between 2018 and 2021. Built a professional Power BI dashboard consisting of 24 interactive pages, utilizing Star Schema data modeling, Power Query transformations, and 16 advanced DAX measures to uncover business insights and support strategic decision-making.'}
              </p>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
                {isAr
                  ? 'قدم المشروع تقييماً شاملاً للأداء يغطي الإيرادات والربحية وأداء المنتجات وفعالية تجار التجزئة والتوزيع الجغرافي وتحليل المخاطر والتنبؤات وتصميم سيناريوهات ماذا لو. حددت النتائج الرئيسية £7.08 مليون في الإيرادات، £3.82 مليون في الأرباح، هامش ربح بنسبة 53.96%، واكتشفت فرصاً تبلغ قيمتها أكثر من £1.8 مليون من خلال التوسع في السوق وتحسين التسعير.'
                  : 'The project delivered a full performance assessment covering revenue, profitability, product performance, retailer effectiveness, geographic distribution, risk analysis, forecasting, and What-If scenario modeling. Key findings identified £7.08M in revenue, £3.82M in profit, a 53.96% profit margin, and uncovered opportunities worth more than £1.8M through market expansion and pricing optimization.'}
              </p>
            </div>

            {/* Key Findings & Metrics */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '📊 النتائج الرئيسية والمقاييس' : '📊 KEY FINDINGS & METRICS'}
              </h4>
              <ul style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px', paddingLeft:'20px'}}>
                {isAr
                  ? [
                      'الإيرادات الإجمالية: £7.08 مليون',
                      'إجمالي الأرباح: £3.82 مليون',
                      'هامش الربح: 53.96%',
                      'فرص النمو المحددة: أكثر من £1.8 مليون',
                      'فرص زيادة الربح من خلال تحسين الخصومات: £360K'
                    ].map((item, i) => <li key={i}>{item}</li>)
                  : [
                      'Total Revenue: £7.08M',
                      'Total Profit: £3.82M',
                      'Profit Margin: 53.96%',
                      'Identified Growth Opportunities: £1.8M+',
                      'Potential Profit Increase via Discount Optimization: £360K'
                    ].map((item, i) => <li key={i}>{item}</li>)
                }
              </ul>
            </div>

            {/* Key Features */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '⚙️ المميزات الرئيسية' : '⚙️ KEY FEATURES'}
              </h4>
              <ul style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px', paddingLeft:'20px'}}>
                {isAr
                  ? [
                      'نمذجة البيانات باستخدام معمارية Star Schema',
                      'مقاييس DAX متقدمة ومؤشرات الأداء الرئيسية',
                      'ملخص تنفيذي ورؤى استراتيجية',
                      'تحليل المبيعات والربحية وأداء المنتجات',
                      'تقييم تجار التجزئة وقنوات التوزيع',
                      'التحليل الجغرافي مع الخرائط التفاعلية',
                      'إطار عمل تقييم المخاطر',
                      'محاكاة الربح وتحليل ماذا لو',
                      'التنبؤ بالمبيعات حتى عام 2030',
                      'صفحات تفصيلية ديناميكية وفلاتر تفاعلية'
                    ].map((item, i) => <li key={i}>{item}</li>)
                  : [
                      'Data Modeling using Star Schema Architecture',
                      'Advanced DAX Measures & KPIs',
                      'Executive Summary & Strategic Insights',
                      'Sales, Profitability & Product Performance Analysis',
                      'Retailer & Distribution Channel Evaluation',
                      'Geographic Analysis with Interactive Maps',
                      'Risk Assessment Framework',
                      'What-If Profit Simulation',
                      'Sales Forecasting through 2030',
                      'Interactive Drill-Through Pages & Dynamic Filters'
                    ].map((item, i) => <li key={i}>{item}</li>)
                }
              </ul>
            </div>

            {/* Business Impact */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '💼 تأثير العمل' : '💼 BUSINESS IMPACT'}
              </h4>
              <ul style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px', paddingLeft:'20px'}}>
                {isAr
                  ? [
                      'تحديد زيادة الأرباح المحتملة بقيمة £360K من خلال تحسين الخصومات',
                      'الكشف عن فرص النمو بقيمة £1.2 مليون–£1.8 مليون في المناطق ذات الاختراق المنخفض',
                      'إبراز مخاطر التركيز على المنتجات وفرص التنويع',
                      'تقديم توصيات على مستوى تنفيذي مدعومة برؤى مبنية على البيانات'
                    ].map((item, i) => <li key={i}>{item}</li>)
                  : [
                      'Identified £360K potential profit increase through discount optimization',
                      'Revealed £1.2M–£1.8M growth opportunities in underpenetrated regions',
                      'Highlighted product concentration risks and diversification opportunities',
                      'Delivered executive-level recommendations supported by data-driven insights'
                    ].map((item, i) => <li key={i}>{item}</li>)
                }
              </ul>
            </div>

            {/* Tools & Technologies */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '🛠️ الأدوات والتقنيات' : '🛠️ TOOLS & TECHNOLOGIES'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
                {isAr
                  ? 'Power BI • Power Query • DAX • نمذجة البيانات • Star Schema • تصور البيانات • ذكاء الأعمال • التنبؤ • تحليل ماذا لو • تطوير مؤشرات الأداء الرئيسية'
                  : 'Power BI • Power Query • DAX • Data Modeling • Star Schema • Data Visualization • Business Intelligence • Forecasting • What-If Analysis • KPI Development'}
              </p>
            </div>

            {/* Image Gallery */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'20px', letterSpacing:'1px'}}>
                {isAr ? '📸 معرض الصور' : '📸 IMAGE GALLERY'}
              </h4>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'15px', marginBottom:'20px'}}>
                {[
                  '1- Cover Page.png',
                  '2- Project Overview.png',
                  '3- Executive Insights.png',
                  '4- Risks & Warnings.png',
                  '5- Recommendations.png',
                  '6- KPI Dashboard.png',
                  ...(expandedGalleries.sports ? [
                    '7- Executive Summary.png',
                    '8- Time Analysis.png',
                    '9- Time Analysis2.png',
                    '10- Product Analysis.png',
                    '11- Sales Analysis.png',
                    '12- Sales Analysis 2.png',
                    '13- Sales Analysis 3.png',
                    '14- Retailer & Channel.png',
                    '15- Retailer & Channel 2.png',
                    '16- Retailer & Channel 3.png',
                    '17- Geographic View.png',
                    '18- Geographic View map 2.png',
                    '19- Geographic View map 3.png',
                    '20- Sales Forecast.png',
                    '21- What-If Analysis.png',
                    '22- Category Detail.png',
                    '32- Conclusions.png'
                  ] : [])
                ].map((img, i) => (
                  <img key={i} src={process.env.PUBLIC_URL + "/projects2/" + encodeURIComponent(img)} alt={`Sports Analysis ${i+1}`}
                    loading="lazy" style={{width:'100%', borderRadius:'8px', border:'1px solid rgba(197,168,128,0.3)', cursor:'pointer', transition:'all 0.3s'}}
                    onMouseOver={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.transform='scale(1.02)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor='rgba(197,168,128,0.3)'; e.currentTarget.style.transform='scale(1)'; }}
                  />
                ))}
              </div>
              <button onClick={() => toggleGallery('sports')} style={{backgroundColor:'var(--gold)', color:'var(--bg)', border:'none', padding:'10px 24px', borderRadius:'6px', fontSize:'0.9rem', fontWeight:'600', cursor:'pointer', transition:'all 0.3s'}}>
                {expandedGalleries.sports ? (isAr ? 'إخفاء المزيد' : 'Show Less') : (isAr ? 'عرض المزيد (17+)' : 'Show More (17+)')}
              </button>
            </div>

            {/* Video */}
            <div style={{position:'relative', paddingBottom:'56.25%', height:0, borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(197,168,128,0.3)'}}>
              <iframe src="https://www.youtube.com/embed/KiHd3Ksw59Q" title={isAr ? 'فيديو تحليل الشركة الرياضية' : 'Sports Company Analysis Video'}
                style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
                loading="lazy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </div>
          </div>

          {/* ============ RETAIL PROJECT ============ */}
          <div className="glass-card" style={{marginBottom:'80px', backgroundColor:'var(--bg-elevated)', borderRadius:'16px', padding:'40px', border:'2px solid rgba(197,168,128,0.4)'}}>
            {/* Badge */}
            <div style={{display:'inline-block', backgroundColor:'rgba(197,168,128,0.2)', color:'var(--gold)', padding:'6px 16px', borderRadius:'20px', fontSize:'0.75rem', fontWeight:'700', letterSpacing:'1px', marginBottom:'20px', border:'1px solid var(--gold)'}}>
              {isAr ? '📊 مشروع BI' : '📊 BI PROJECT'}
            </div>
            
            <h3 style={{color:'var(--gold-bright)', fontSize:'1.4rem', fontWeight:'700', marginBottom:'10px', lineHeight:'1.4'}}>
              {isAr ? 'لوحة تحليل أداء مبيعات التجزئة | Power BI' : 'Retail Sales Performance Dashboard | Power BI'}
            </h3>

            {/* Overview */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '📋 نظرة عامة' : '📋 OVERVIEW'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px'}}>
                {isAr
                  ? 'لوحة بيانات شاملة لتحليل مبيعات التجزئة مبنية بـ Power BI مع تحليل متعمق لأداء خطوط المنتجات ومقارنة الفروع والدخل الإجمالي وتقييمات العملاء عبر أشهر ومواقع متعددة. توفر اللوحة رؤى قابلة للعمل لتحسين استراتيجية المبيعات والتخطيط الكميات وتحسين الأداء.'
                  : 'A comprehensive retail sales analysis dashboard built with Power BI featuring in-depth analysis of product line performance, branch comparison, gross income, and customer ratings across multiple months and locations. The dashboard provides actionable insights to improve sales strategy, inventory planning, and operational performance.'}
              </p>
            </div>

            {/* Key Findings & Metrics */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '📊 الميزات الرئيسية' : '📊 KEY FEATURES'}
              </h4>
              <ul style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px', paddingLeft:'20px'}}>
                {isAr
                  ? [
                      'تحليل المبيعات حسب الفرع والمنطقة الجغرافية',
                      'مقارنة أداء خطوط المنتجات',
                      'مراقبة الدخل الإجمالي والهوامش',
                      'تقييمات العملاء والتحليل النوعي',
                      'التنبيهات التلقائية للانحرافات عن الأهداف',
                      'فلاتر ديناميكية للتحليل التفصيلي'
                    ].map((item, i) => <li key={i}>{item}</li>)
                  : [
                      'Sales Analysis by Branch & Geographic Region',
                      'Product Line Performance Comparison',
                      'Gross Income & Margin Monitoring',
                      'Customer Ratings & Qualitative Analysis',
                      'Automated Alerts for Target Deviations',
                      'Dynamic Filters for Detailed Analysis'
                    ].map((item, i) => <li key={i}>{item}</li>)
                }
              </ul>
            </div>

            {/* Business Impact */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '💼 تأثير العمل' : '💼 BUSINESS IMPACT'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
                {isAr
                  ? 'تحسين الرؤية الإجمالية على الأداء بالوقت الفعلي، تسريع اتخاذ القرارات التشغيلية، وتحسين فرص المبيعات من خلال الرؤى القائمة على البيانات.'
                  : 'Enhanced visibility into real-time performance metrics, accelerated operational decision-making, and improved sales opportunities through data-driven insights.'}
              </p>
            </div>

            {/* Tools & Technologies */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '🛠️ الأدوات والتقنيات' : '🛠️ TOOLS & TECHNOLOGIES'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
                Power BI • DAX • Power Query • Data Modeling • Real-time Analytics • KPI Development
              </p>
            </div>

            {/* Image Gallery */}
            <div>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'20px', letterSpacing:'1px'}}>
                {isAr ? '📸 لقطات لوحة التحكم' : '📸 DASHBOARD SCREENSHOTS'}
              </h4>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'15px', marginBottom:'20px'}}>
                {[
                  'dashboard1.png',
                  'dashboard2.png',
                  'dashboard3.png',
                  'dashboard4.png',
                  'dashboard5.png',
                  'dashboard6.png',
                  ...(expandedGalleries.retail ? ['dashboard7.png'] : [])
                ].map((img, i) => (
                  <img key={i} src={process.env.PUBLIC_URL + `/projects/${img}`} alt={`Dashboard ${i+1}`}
                    loading="lazy" style={{width:'100%', borderRadius:'8px', border:'1px solid rgba(197,168,128,0.3)', cursor:'pointer', transition:'all 0.3s'}}
                    onMouseOver={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.transform='scale(1.02)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor='rgba(197,168,128,0.3)'; e.currentTarget.style.transform='scale(1)'; }}
                  />
                ))}
              </div>
              <button onClick={() => toggleGallery('retail')} style={{backgroundColor:'var(--gold)', color:'var(--bg)', border:'none', padding:'10px 24px', borderRadius:'6px', fontSize:'0.9rem', fontWeight:'600', cursor:'pointer', transition:'all 0.3s'}}>
                {expandedGalleries.retail ? (isAr ? 'إخفاء المزيد' : 'Show Less') : (isAr ? 'عرض المزيد (1+)' : 'Show More (1+)')}
              </button>
            </div>
          </div>

          {/* ============ EXCEL PROJECT ============ */}
          <div className="glass-card" style={{marginBottom:'80px', backgroundColor:'var(--bg-elevated)', borderRadius:'16px', padding:'40px', border:'2px solid rgba(197,168,128,0.4)'}}>
            {/* Badge */}
            <div style={{display:'inline-block', backgroundColor:'rgba(197,168,128,0.2)', color:'var(--gold)', padding:'6px 16px', borderRadius:'20px', fontSize:'0.75rem', fontWeight:'700', letterSpacing:'1px', marginBottom:'20px', border:'1px solid var(--gold)'}}>
              {isAr ? '📊 مشروع Excel' : '📊 EXCEL PROJECT'}
            </div>
            
            <h3 style={{color:'var(--gold-bright)', fontSize:'1.4rem', fontWeight:'700', marginBottom:'10px', lineHeight:'1.4'}}>
              {isAr ? 'مجموعة أعمال متنوعة على Excel' : 'Excel Business Analysis Portfolio'}
            </h3>

            {/* Overview */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '📋 نظرة عامة' : '📋 OVERVIEW'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px'}}>
                {isAr
                  ? 'مجموعة شاملة من مشاريع تحليل الأعمال التي تم إنجازها باستخدام Microsoft Excel، تغطي تحليل البيانات المتقدم والنماذج المالية والتقارير التشغيلية. تتضمن المشاريع استخدام الصيغ المتقدمة والجداول المحورية والرسوم البيانية التفاعلية والتحليل الإحصائي لدعم اتخاذ القرارات الاستراتيجية.'
                  : 'A comprehensive collection of business analysis projects delivered using Microsoft Excel, covering advanced data analysis, financial modeling, and operational reporting. Projects include advanced formulas, pivot tables, interactive charts, and statistical analysis to support strategic decision-making.'}
              </p>
            </div>

            {/* Key Features */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '⚙️ المميزات والقدرات' : '⚙️ FEATURES & CAPABILITIES'}
              </h4>
              <ul style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'15px', paddingLeft:'20px'}}>
                {isAr
                  ? [
                      'تحليل البيانات المتقدم والنماذج الإحصائية',
                      'النماذج المالية والتنبؤات',
                      'الجداول المحورية والتحليلات متعددة الأبعاد',
                      'الرسوم البيانية التفاعلية والرؤى المرئية',
                      'الصيغ المخصصة والدوال المعقدة',
                      'التقارير الديناميكية والتجميعات'
                    ].map((item, i) => <li key={i}>{item}</li>)
                  : [
                      'Advanced Data Analysis & Statistical Modeling',
                      'Financial Modeling & Forecasting',
                      'Pivot Tables & Multi-dimensional Analysis',
                      'Interactive Charts & Visual Insights',
                      'Custom Formulas & Complex Functions',
                      'Dynamic Reporting & Aggregations'
                    ].map((item, i) => <li key={i}>{item}</li>)
                }
              </ul>
            </div>

            {/* Business Impact */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '💼 تأثير العمل' : '💼 BUSINESS IMPACT'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
                {isAr
                  ? 'توفير أتمتة فعالة للتقارير، تسريع تحليل البيانات، تقليل الأخطاء اليدوية، والسماح بمقارنات سريعة للسيناريوهات المختلفة.'
                  : 'Efficient reporting automation, accelerated data analysis, reduced manual errors, and enabled quick scenario comparisons for strategic planning.'}
              </p>
            </div>

            {/* Tools & Technologies */}
            <div style={{marginBottom:'30px'}}>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'10px', letterSpacing:'1px'}}>
                {isAr ? '🛠️ الأدوات والتقنيات' : '🛠️ TOOLS & TECHNOLOGIES'}
              </h4>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8'}}>
                Microsoft Excel • Advanced Formulas • Pivot Tables • VBA Macros • Data Visualization • Statistical Analysis
              </p>
            </div>

            {/* Image Gallery */}
            <div>
              <h4 style={{color:'var(--gold)', fontSize:'0.95rem', fontWeight:'600', marginBottom:'20px', letterSpacing:'1px'}}>
                {isAr ? '📸 لقطات المشاريع' : '📸 PROJECT SCREENSHOTS'}
              </h4>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'15px', marginBottom:'20px'}}>
                {[
                  'Project (1).png',
                  'Project (2).png',
                  'Project (3).png',
                  'Project (4).png',
                  'Project (5).png',
                  'Project (6).png',
                  ...(expandedGalleries.excel ? [
                    'Project (7).png',
                    'Project (8).png',
                    'Project (9).png',
                    'Project (10).png',
                    'Project (11).png',
                    'Project (12).png',
                    'Project (13).png',
                    'Project (14).png',
                    'Project (15).png',
                    'Project (16).png',
                    'Project (17).png',
                    'Project (18).png'
                  ] : [])
                ].map((img, i) => (
                  <img key={i} src={process.env.PUBLIC_URL + `/New project/${img}`} alt={`Excel Project ${i+1}`}
                    loading="lazy" style={{width:'100%', borderRadius:'8px', border:'1px solid rgba(197,168,128,0.3)', cursor:'pointer', transition:'all 0.3s'}}
                    onMouseOver={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.transform='scale(1.02)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor='rgba(197,168,128,0.3)'; e.currentTarget.style.transform='scale(1)'; }}
                  />
                ))}
              </div>
              <button onClick={() => toggleGallery('excel')} style={{backgroundColor:'var(--gold)', color:'var(--bg)', border:'none', padding:'10px 24px', borderRadius:'6px', fontSize:'0.9rem', fontWeight:'600', cursor:'pointer', transition:'all 0.3s'}}>
                {expandedGalleries.excel ? (isAr ? 'إخفاء المزيد' : 'Show Less') : (isAr ? 'عرض المزيد (12+)' : 'Show More (12+)')}
              </button>
            </div>
          </div>

          {/* Infographic */}
          <div style={{marginBottom:'80px'}}>
            <h3 style={{color:'var(--gold)', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '🖼️ إنفوجرافيك احترافي' : '🖼️ PROFESSIONAL INFOGRAPHIC'}
            </h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'30px'}}>
              {isAr
                ? 'ملخص مرئي لأكثر من 20 عامًا من النمو المثبت والابتكار الرقمي — يجمع بين القيادة التشغيلية وتحليلات الذكاء الاصطناعي الحديثة.'
                : 'A visual summary of 20+ years of proven growth and digital innovation — bridging operational leadership with modern AI analytics.'}
            </p>
            <img src={process.env.PUBLIC_URL + "/projects/infographic.png"} alt="Hatem Kandeel Infographic"
              loading="lazy" style={{width:'100%', borderRadius:'12px', border:'1px solid rgba(197,168,128,0.3)'}}/>
          </div>

          {/* Mind Map */}
          <div style={{marginBottom:'80px'}}>
            <h3 style={{color:'var(--gold)', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'10px'}}>
              {isAr ? '🧠 خريطة ذهنية مهنية' : '🧠 PROFESSIONAL MIND MAP'}
            </h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.8', marginBottom:'30px'}}>
              {isAr
                ? 'خريطة ذهنية شاملة لملفي المهني — تغطي الخبرة والمهارات والشهادات والرؤية الاستراتيجية.'
                : 'A comprehensive mind map of my professional profile — covering experience, skills, certifications, and strategic vision.'}
            </p>
            <img src={process.env.PUBLIC_URL + "/projects/mindmap.png"} alt="Mind Map"
              loading="lazy" style={{width:'100%', borderRadius:'12px', border:'1px solid rgba(197,168,128,0.3)'}}/>
          </div>

          {/* Videos */}
          <div>
            <h3 style={{color:'var(--gold)', fontSize:'1.1rem', letterSpacing:'2px', marginBottom:'30px'}}>
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
                <div key={i} style={{backgroundColor:'var(--bg-elevated)', borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(197,168,128,0.2)'}}>
                  <div style={{position:'relative', paddingBottom:'56.25%', height:0}}>
                    <iframe src={video.url} title={video.title}
                      style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
                      loading="lazy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                  </div>
                  <div style={{padding:'20px'}}>
                    <h4 style={{color:'var(--gold)', marginBottom:'8px'}}>{video.title}</h4>
                    <p style={{color:'var(--text-muted)', fontSize:'13px', lineHeight:'1.7'}}>{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* PLATFORMS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="platforms" style={{padding:'100px 24px', maxWidth:'1150px', margin:'0 auto'}}>
        <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
          {isAr ? 'هندسة البرمجيات' : 'SOFTWARE ENGINEERING'}
        </p>
        <h2 className="font-serif-ui" style={{fontSize:'2.3rem', fontWeight:700, marginBottom:'16px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
          {isAr ? 'منصات وبرمجيات ميرنكس' : 'The Mirnex Platforms'}
        </h2>
        <p style={{color:'var(--text-muted)', textAlign:'center', marginBottom:'50px', fontSize:'0.95rem', maxWidth:'700px', marginLeft:'auto', marginRight:'auto', lineHeight:'1.8'}}>
          {isAr
            ? 'مجموعة من المنتجات البرمجية الحقيقية قيد التطوير حاليًا تحت مظلة Mirnex — من منصة معرفية وأداة إرشاد لرواد الأعمال، لنظام CRM وERP وأداة تقييم بالذكاء الاصطناعي.'
            : 'A set of real software products currently in active development under the Mirnex brand — from a knowledge platform and entrepreneur guidance tool, to a CRM, an ERP, and an AI readiness assessment engine.'}
        </p>

        <div style={{display:'grid', gap:'30px'}}>
          {platformsData.map((p) => (
            <div key={p.id} className="glass-card" style={{borderRadius:'20px', padding:'34px', display:'grid', gridTemplateColumns:'minmax(260px, 380px) 1fr', gap:'34px'}}>
              <div style={{display:'grid', gridTemplateColumns: p.images.length > 1 ? 'repeat(2, 1fr)' : '1fr', gap:'8px', alignContent:'start'}}>
                {p.images.map((img, idx) => (
                  <img key={idx} src={process.env.PUBLIC_URL + img} alt={isAr ? p.titleAr : p.titleEn} loading="lazy"
                    style={{width:'100%', borderRadius:'8px', border:'1px solid var(--border)', boxShadow:'0 8px 24px var(--shadow-color)'}}/>
                ))}
              </div>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px', flexWrap:'wrap'}}>
                  <h3 className="font-serif-ui" style={{fontSize:'1.3rem', fontWeight:700, color:'var(--text)'}}>
                    {isAr ? p.titleAr : p.titleEn}
                  </h3>
                  <span style={{fontSize:'10px', letterSpacing:'.05em', color:'var(--violet)', background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.3)', padding:'3px 10px', borderRadius:'999px', textTransform:'uppercase', fontWeight:700}}>
                    {isAr ? 'قيد التطوير' : 'In Development'}
                  </span>
                </div>
                <p style={{color:'var(--text-muted)', fontSize:'0.92rem', lineHeight:'1.85', marginBottom:'18px'}}>
                  {isAr ? p.descAr : p.descEn}
                </p>
                <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom: (p.note.en || p.note.ar) ? '14px' : 0}}>
                  {p.stack.map((s, idx) => (
                    <span key={idx} style={{fontSize:'11px', color:'var(--gold)', border:'1px solid var(--border-strong)', padding:'4px 12px', borderRadius:'999px'}}>{s}</span>
                  ))}
                </div>
                {(p.note.en || p.note.ar) && (
                  <p style={{color:'var(--text-dim)', fontSize:'11px', lineHeight:'1.7', fontStyle:'italic'}}>
                    {isAr ? p.note.ar : p.note.en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* BOOKS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="books" style={{padding:'100px 24px', maxWidth:'1150px', margin:'0 auto'}}>
        <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
          {isAr ? 'إصداراتي' : 'MY PUBLICATIONS'}
        </p>
        <h2 className="font-serif-ui" style={{fontSize:'2.3rem', fontWeight:700, marginBottom:'50px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
          {isAr ? 'الكتب' : 'Books'}
        </h2>

        {booksData.map((book, i) => (
          <div key={book.id} className="glass-card" style={{borderRadius:'20px', padding:'40px', marginBottom:'40px', display:'grid', gridTemplateColumns:'minmax(220px, 280px) 1fr', gap:'40px'}}>
            <div>
              <img src={process.env.PUBLIC_URL + book.cover} alt={isAr ? book.titleAr : book.titleEn}
                loading="lazy" style={{width:'100%', borderRadius:'10px', boxShadow:'0 10px 30px var(--shadow-color)'}}/>
              {isAr && (
                <img src={process.env.PUBLIC_URL + book.infographicAr} alt={book.titleAr}
                  loading="lazy" style={{width:'100%', borderRadius:'10px', marginTop:'16px', border:'1px solid var(--border)'}}/>
              )}
            </div>
            <div>
              <h3 className="font-serif-ui" style={{fontSize:'1.5rem', fontWeight:700, color:'var(--text)', marginBottom:'14px'}}>
                {isAr ? book.titleAr : book.titleEn}
              </h3>
              <p style={{color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:'1.85', marginBottom:'22px'}}>
                {isAr ? book.descAr : book.descEn}
              </p>
              <div style={{display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'26px'}}>
                {book.stats.map((s,idx) => (
                  <div key={idx} style={{textAlign:'center', padding:'10px 18px', borderRadius:'10px', background:'rgba(197,168,128,0.08)', border:'1px solid var(--border)'}}>
                    <div className="font-serif-ui" style={{color:'var(--gold)', fontWeight:800, fontSize:'1.1rem'}}>{s.n}</div>
                    <div style={{color:'var(--text-dim)', fontSize:'10px', marginTop:'2px'}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'center'}}>
                <a href="https://mirnex.gumroad.com/" target="_blank" rel="noopener noreferrer" className="gold-btn" style={{padding:'12px 28px', fontSize:'13px', textDecoration:'none'}}>
                  {isAr ? 'اشترِ الآن على Gumroad' : 'Buy Now on Gumroad'}
                </a>
                <button onClick={() => setActiveBookVideo(activeBookVideo === book.id ? null : book.id)} className="pill-btn" style={{padding:'12px 24px', fontSize:'13px'}}>
                  {activeBookVideo === book.id ? (isAr ? 'إخفاء الفيديو ▲' : 'Hide Preview ▲') : (isAr ? '🎬 مشاهدة ملخص الكتاب' : '🎬 Watch Book Summary')}
                </button>
              </div>
              {activeBookVideo === book.id && (
                <div style={{position:'relative', paddingBottom:'56.25%', height:0, borderRadius:'12px', overflow:'hidden', marginTop:'20px', border:'1px solid var(--border)'}}>
                  <iframe
                    src={`https://www.youtube.com/embed/${isAr ? book.videoAr : book.videoEn}`}
                    title={isAr ? book.titleAr : book.titleEn}
                    style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                </div>
              )}
            </div>
          </div>
        ))}
        <p style={{color:'var(--text-dim)', fontSize:'12px', textAlign:'center', marginTop:'10px'}}>
          {isAr ? '📚 الكتب متاحة قريبًا للشراء رقميًا — تابع صفحتي على Gumroad لكل التحديثات.' : '📚 Books launching soon for digital purchase — follow my Gumroad page for updates.'}
        </p>
      </motion.section>

      {/* RESOURCES / PRODUCTS */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="resources" style={{padding:'100px 24px', backgroundColor:'var(--bg-elevated)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:'1150px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'موارد ومنتجات' : 'RESOURCES & PRODUCTS'}
          </p>
          <h2 className="font-serif-ui" style={{fontSize:'2.3rem', fontWeight:700, marginBottom:'20px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'مكتبة الموارد' : 'Resource Library'}
          </h2>

          {/* FREE */}
          <h3 style={{color:'var(--text)', fontSize:'1.1rem', fontWeight:700, marginBottom:'6px', marginTop:'40px'}}>
            🎁 {isAr ? 'موارد مجانية — حمّلها الآن' : 'Free Resources — Download Now'}
          </h3>
          <p style={{color:'var(--text-dim)', fontSize:'12px', marginBottom:'24px'}}>
            {isAr ? 'عينات مجانية بالكامل من مكتبة Mirnex Analytics' : 'Fully free samples from the Mirnex Analytics library'}
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'22px', marginBottom:'50px'}}>
            {freeResources.map((r, i) => (
              <div key={i} className="glass-card" style={{borderRadius:'14px', overflow:'hidden', display:'flex', flexDirection:'column'}}>
                {r.preview ? (
                  <img src={process.env.PUBLIC_URL + r.preview} alt={isAr ? r.titleAr : r.titleEn} loading="lazy" style={{width:'100%', height:'160px', objectFit:'cover', borderBottom:'1px solid var(--border)'}}/>
                ) : (
                  <div style={{width:'100%', height:'160px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(197,168,128,0.06)', borderBottom:'1px solid var(--border)', fontSize:'40px'}}>📊</div>
                )}
                <div style={{padding:'20px', display:'flex', flexDirection:'column', flex:1}}>
                  <h4 style={{color:'var(--text)', fontSize:'0.95rem', fontWeight:700, marginBottom:'8px'}}>{isAr ? r.titleAr : r.titleEn}</h4>
                  <p style={{color:'var(--text-muted)', fontSize:'12px', lineHeight:'1.7', marginBottom:'16px', flex:1}}>{isAr ? r.descAr : r.descEn}</p>
                  <a href={process.env.PUBLIC_URL + r.file} download className="gold-btn" style={{textAlign:'center', padding:'10px', fontSize:'12px', textDecoration:'none'}}>
                    {isAr ? '⬇ تحميل مجاني' : '⬇ Free Download'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* PREMIUM */}
          <h3 style={{color:'var(--text)', fontSize:'1.1rem', fontWeight:700, marginBottom:'6px'}}>
            💎 {isAr ? 'قوالب وحقائب احترافية — معروضة للبيع' : 'Premium Templates & Kits — Available for Purchase'}
          </h3>
          <p style={{color:'var(--text-dim)', fontSize:'12px', marginBottom:'24px'}}>
            {isAr ? 'معاينة فقط — التحميل الكامل متاح عبر Gumroad' : 'Preview only — full files available via Gumroad'}
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'22px'}}>
            {premiumResources.map((r, i) => (
              <div key={i} className="glass-card" style={{borderRadius:'14px', overflow:'hidden', display:'flex', flexDirection:'column'}}>
                {r.preview ? (
                  <img src={process.env.PUBLIC_URL + r.preview} alt={isAr ? r.titleAr : r.titleEn} loading="lazy" style={{width:'100%', height:'160px', objectFit:'cover', borderBottom:'1px solid var(--border)', filter:'saturate(0.9)'}}/>
                ) : (
                  <div style={{width:'100%', height:'160px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(99,102,241,0.06)', borderBottom:'1px solid var(--border)', fontSize:'40px'}}>📈</div>
                )}
                <div style={{padding:'20px', display:'flex', flexDirection:'column', flex:1}}>
                  <span style={{alignSelf:'flex-start', fontSize:'9px', letterSpacing:'.05em', color:'var(--violet)', background:'rgba(99,102,241,0.12)', padding:'3px 9px', borderRadius:'999px', marginBottom:'10px', textTransform:'uppercase'}}>
                    {r.group === 'mirnex' ? (isAr ? 'مكمل لكتاب Power BI' : 'Power BI Book Companion') : (isAr ? 'AI Small Business Kit' : 'AI Small Business Kit')}
                  </span>
                  <h4 style={{color:'var(--text)', fontSize:'0.95rem', fontWeight:700, marginBottom:'8px'}}>{isAr ? r.titleAr : r.titleEn}</h4>
                  <p style={{color:'var(--text-muted)', fontSize:'12px', lineHeight:'1.7', marginBottom:'16px', flex:1}}>{isAr ? r.descAr : r.descEn}</p>
                  <a href={r.group === 'starterkit' ? 'https://mirnex.gumroad.com/l/ymunpk' : 'https://mirnex.gumroad.com/'} target="_blank" rel="noopener noreferrer" className="pill-btn" style={{textAlign:'center', padding:'10px', fontSize:'12px', textDecoration:'none'}}>
                    {isAr ? 'عرض على Gumroad' : 'View on Gumroad'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section initial={{opacity:0, y:36}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0}} transition={{duration:0.7, ease:[0.16,1,0.3,1]}} id="contact" style={{padding:'100px 24px', backgroundColor:'var(--bg-elevated)'}}>
        <div style={{maxWidth:'1150px', margin:'0 auto'}}>
          <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'13px', marginBottom:'10px', textAlign:'center'}}>
            {isAr ? 'تواصل معي' : 'GET IN TOUCH'}
          </p>
          <h2 className="font-serif-ui" style={{fontSize:'2.5rem', fontWeight:'700', marginBottom:'15px', textAlign:'center', background:'linear-gradient(135deg, var(--gold-bright), var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {isAr ? 'لنبنِ شيئًا معًا' : "Let's Build Something Together"}
          </h2>
          <p style={{color:'var(--text-muted)', textAlign:'center', marginBottom:'60px', fontSize:'1rem', lineHeight:'1.8', maxWidth:'700px', marginLeft:'auto', marginRight:'auto'}}>
            {isAr
              ? 'سواء كان لديك فرصة عمل أو مشروع للنقاش أو ترغب ببساطة في التواصل — أنا دائمًا منفتح على المحادثة. المراجع متاحة عند الطلب.'
              : 'Whether you have a business opportunity, a project to discuss, or simply want to connect — I\'m always open to a conversation. References available upon request.'}
          </p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))', gap:'40px', alignItems:'start'}}>

            {/* MESSAGE FORM */}
            <form onSubmit={handleContactSubmit} className="glass-card" style={{borderRadius:'16px', padding:'36px', minWidth:'280px'}}>
              <h3 className="font-serif-ui" style={{color:'var(--text)', fontSize:'1.2rem', fontWeight:700, marginBottom:'22px'}}>
                {isAr ? 'أرسل رسالة' : 'Send a Message'}
              </h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
                <div>
                  <label style={{display:'block', color:'var(--text-muted)', fontSize:'12px', marginBottom:'6px'}}>{isAr ? 'اسمك' : 'Your Name'}</label>
                  <input required value={contactForm.name} onChange={e => setContactForm({...contactForm, name:e.target.value})}
                    style={{width:'100%', padding:'11px 14px', borderRadius:'8px', border:'1px solid var(--border-strong)', background:'var(--bg)', color:'var(--text)', fontSize:'14px', outline:'none'}}/>
                </div>
                <div>
                  <label style={{display:'block', color:'var(--text-muted)', fontSize:'12px', marginBottom:'6px'}}>{isAr ? 'بريدك الإلكتروني' : 'Your Email'}</label>
                  <input required type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email:e.target.value})}
                    style={{width:'100%', padding:'11px 14px', borderRadius:'8px', border:'1px solid var(--border-strong)', background:'var(--bg)', color:'var(--text)', fontSize:'14px', outline:'none'}}/>
                </div>
              </div>
              <div style={{marginBottom:'16px'}}>
                <label style={{display:'block', color:'var(--text-muted)', fontSize:'12px', marginBottom:'6px'}}>{isAr ? 'الموضوع' : 'Subject'}</label>
                <input value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject:e.target.value})}
                  style={{width:'100%', padding:'11px 14px', borderRadius:'8px', border:'1px solid var(--border-strong)', background:'var(--bg)', color:'var(--text)', fontSize:'14px', outline:'none'}}/>
              </div>
              <div style={{marginBottom:'22px'}}>
                <label style={{display:'block', color:'var(--text-muted)', fontSize:'12px', marginBottom:'6px'}}>{isAr ? 'الرسالة' : 'Message'}</label>
                <textarea required rows={5} value={contactForm.message} onChange={e => setContactForm({...contactForm, message:e.target.value})}
                  style={{width:'100%', padding:'11px 14px', borderRadius:'8px', border:'1px solid var(--border-strong)', background:'var(--bg)', color:'var(--text)', fontSize:'14px', outline:'none', resize:'vertical', fontFamily:'inherit'}}/>
              </div>
              <button type="submit" className="gold-btn" style={{padding:'13px 34px', fontSize:'13px', width:'100%'}}>
                {isAr ? 'إرسال الرسالة' : 'Send Message'}
              </button>
              <p style={{color:'var(--text-dim)', fontSize:'10px', marginTop:'10px', textAlign:'center'}}>
                {isAr ? 'سيفتح هذا تطبيق البريد الإلكتروني لديك لإتمام الإرسال' : 'This will open your email app to complete sending'}
              </p>
            </form>

            {/* CONTACT INFO */}
            <div>
              <div style={{display:'flex', flexDirection:'column', gap:'16px', marginBottom:'24px'}}>
                <a href="mailto:hakkandeel@gmail.com" style={{textDecoration:'none'}}>
                  <div className="glass-card" style={{borderRadius:'12px', padding:'20px 24px', display:'flex', alignItems:'center', gap:'18px'}}>
                    <div style={{width:'46px', height:'46px', borderRadius:'50%', background:'rgba(197,168,128,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <Mail size={20} color="var(--gold)"/>
                    </div>
                    <div>
                      <p style={{color:'var(--gold)', fontSize:'11px', letterSpacing:'1px', marginBottom:'3px'}}>{isAr ? 'البريد الإلكتروني' : 'EMAIL'}</p>
                      <p style={{color:'var(--text)', fontSize:'14px', fontWeight:600}}>hakkandeel@gmail.com</p>
                    </div>
                  </div>
                </a>

                <a href="https://wa.me/201036836343" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                  <div className="glass-card" style={{borderRadius:'12px', padding:'20px 24px', display:'flex', alignItems:'center', gap:'18px'}}>
                    <div style={{width:'46px', height:'46px', borderRadius:'50%', background:'rgba(37,211,102,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{color:'var(--gold)', fontSize:'11px', letterSpacing:'1px', marginBottom:'3px'}}>{isAr ? 'واتساب والهاتف' : 'WHATSAPP & PHONE'}</p>
                      <p style={{color:'var(--text)', fontSize:'14px', fontWeight:600}}>+201036836343</p>
                    </div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/hatem-kandeel1" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                  <div className="glass-card" style={{borderRadius:'12px', padding:'20px 24px', display:'flex', alignItems:'center', gap:'18px'}}>
                    <div style={{width:'46px', height:'46px', borderRadius:'50%', background:'rgba(0,119,181,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{color:'var(--gold)', fontSize:'11px', letterSpacing:'1px', marginBottom:'3px'}}>LinkedIn</p>
                      <p style={{color:'var(--text)', fontSize:'14px', fontWeight:600}}>Hatem Kandeel</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* QR Code */}
              <div className="glass-card" style={{textAlign:'center', borderRadius:'16px', padding:'28px'}}>
                <p style={{color:'var(--gold)', letterSpacing:'2px', fontSize:'11px', marginBottom:'14px'}}>
                  {isAr ? 'امسح للواتساب' : 'SCAN TO WHATSAPP'}
                </p>
                <div style={{display:'inline-block', padding:'12px', backgroundColor:'#ffffff', borderRadius:'12px'}}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/201036836343`} alt="WhatsApp QR Code" style={{width:'150px', height:'150px', display:'block'}}/>
                </div>
              </div>
            </div>
          </div>

          {/* Business Card */}
          <div style={{marginTop:'50px'}}>
            <p style={{color:'var(--gold)', letterSpacing:'3px', fontSize:'12px', marginBottom:'15px', textAlign:'center'}}>
              {isAr ? '🃏 بطاقة أعمال رقمية' : '🃏 DIGITAL BUSINESS CARD'}
            </p>
            <img src={process.env.PUBLIC_URL + "/projects/businesscard.jpg"} alt="Hatem Kandeel Business Card"
              loading="lazy" style={{width:'100%', borderRadius:'12px', border:'1px solid rgba(197,168,128,0.3)'}}/>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer style={{backgroundColor:'var(--bg)', borderTop:'1px solid rgba(197,168,128,0.2)', padding:'30px 40px', textAlign:'center'}}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="HK Logo" style={{height:'40px', marginBottom:'15px'}}/>
        <p style={{color:'var(--text-dim)', fontSize:'13px', marginBottom:'5px'}}>
          {isAr ? 'حاتم أحمد قنديل' : 'Hatem A. Kandeel'}
        </p>
        <p style={{color:'var(--text-dim)', fontSize:'12px', marginBottom:'15px'}}>
          {isAr ? 'مدير تطوير الأعمال والمبيعات التجارية | استراتيجي مبني على البيانات | خبير العمليات' : 'Senior Business Development & Commercial Manager | Data-Driven Strategist | Operations Expert'}
        </p>
        <p style={{color:'var(--text-dim)', fontSize:'12px'}}>© 2026 {isAr ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
      </footer>

      {/* Certificate Modal */}
      {selectedCert && (
        <div onClick={() => setSelectedCert(null)}
          style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.85)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', boxSizing:'border-box'}}>
          <div onClick={e => e.stopPropagation()}
            style={{backgroundColor:'var(--bg-elevated)', borderRadius:'16px', padding:'30px', maxWidth:'700px', width:'100%', border:'1px solid var(--gold)', position:'relative', maxHeight:'90vh', overflowY:'auto'}}>
            <button onClick={() => setSelectedCert(null)}
              style={{position:'absolute', top:'15px', [isAr ? 'left' : 'right']:'15px', backgroundColor:'transparent', border:'none', color:'var(--gold)', fontSize:'24px', cursor:'pointer'}}>✕</button>
            <h3 style={{color:'var(--gold)', marginBottom:'10px', fontSize:'1.1rem'}}>{selectedCert.name}</h3>
            <p style={{color:'var(--text-muted)', fontSize:'13px', lineHeight:'1.7', marginBottom:'20px'}}>{selectedCert.desc}</p>
            <ModalImage cert={selectedCert} />
            <p style={{color:'var(--text-dim)', marginTop:'15px', fontSize:'12px', textAlign:'center'}}>{selectedCert.year}</p>
          </div>
        </div>
      )}
      </>
      )}

    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;