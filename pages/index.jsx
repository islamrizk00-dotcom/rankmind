
// ╔══════════════════════════════════════════════════════════════╗
// ║  RankMind v2 — SEO Intelligence Platform                     ║
// ║  Fixes: position logic, RTL border, Math.random, gradient   ║
// ║  IDs, unused imports, CSV export handler                     ║
// ║  New: DateRangePicker, SiteSelector, GlobalDashboardState   ║
// ║  i18n: 100% Arabic/English coverage                         ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  Search, TrendingDown, BarChart2, Zap, ChevronRight,
  ChevronDown, Menu, X, ArrowUpRight, ArrowDownRight,
  Download, Filter, RefreshCw, Settings, Bell, LogOut,
  Languages, CheckCircle, Star, Cpu, Database,
  Eye, MousePointer, Target, Award, FileText, Layers,
  ChevronUp, ExternalLink, Calendar, Globe, AlertTriangle,
  ChevronLeft, Check, Info, Trash2
} from "lucide-react";

// ══════════════════════════════════════════════════════════════
// TRANSLATIONS — 100% coverage EN + AR
// ══════════════════════════════════════════════════════════════
const T = {
  en: {
    // Brand
    brand: "RankMind", tagline: "AI-Powered SEO Intelligence",
    // Landing hero
    heroTitle: "Turn Search Data Into", heroHighlight: "Revenue Intelligence",
    heroSub: "Connect Google Search Console & GA4. Get AI-generated insights, quick wins, and automated opportunity detection — built for SEO professionals.",
    startFree: "Start Free Trial", watchDemo: "Watch Demo",
    trustedBy: "Trusted by 2,400+ SEO professionals",
    // Nav
    features: "Features", howItWorks: "How It Works",
    pricing: "Pricing", blog: "Blog", login: "Log In", signup: "Get Started",
    // Hero stats
    hero_stat1: "2.4K+", hero_stat1_label: "SEO Professionals",
    hero_stat2: "18M+", hero_stat2_label: "Keywords Tracked",
    hero_stat3: "94%",  hero_stat3_label: "Client Satisfaction",
    // Feature section
    feat_kw_title: "Keyword Intelligence", feat_kw_desc: "Track all search queries with position, CTR, and trend analysis.",
    feat_qw_title: "Quick Win Detection",  feat_qw_desc: "Automatically surface keywords ranking 8-20 with high impression volume.",
    feat_dc_title: "Content Decay Alerts", feat_dc_desc: "Catch pages losing traffic before they disappear from rankings.",
    feat_cn_title: "Cannibalization Detection", feat_cn_desc: "Identify competing pages and get consolidation recommendations.",
    feat_ai_title: "AI Insights Engine",   feat_ai_desc: "Human-readable SEO insights generated automatically from your data.",
    feat_db_title: "GSC + GA4 Unified",    feat_db_desc: "Both data sources in one view for complete search performance picture.",
    // How it works
    hiw_1_title: "Connect Your Accounts", hiw_1_desc: "Link Google Search Console and GA4 via OAuth. No code required.",
    hiw_2_title: "Automated Data Processing", hiw_2_desc: "We fetch, normalize, and analyze your SEO data every 24 hours.",
    hiw_3_title: "Get AI-Powered Insights", hiw_3_desc: "Review prioritized opportunities, quick wins, and insight cards.",
    step: "Step",
    // Pricing
    monthly: "Monthly", annual: "Annual (−20%)", mostPopular: "Most Popular",
    perMonth: "/mo",
    plan_starter: "Starter", plan_pro: "Professional", plan_agency: "Agency",
    // Footer
    privacy: "Privacy", terms: "Terms", apiDocs: "API Docs",
    copyright: "© 2025 RankMind. All rights reserved.",
    // Auth
    welcomeBack: "Welcome back", createAccount: "Create your account",
    continueGoogle: "Continue with Google", orDivider: "or",
    fullName: "Full name", emailAddress: "Email address", password: "Password",
    noAccount: "Don't have an account?", hasAccount: "Already have an account?",
    // Dashboard nav
    dashboard: "Dashboard", overview: "SEO Overview",
    keywords: "Keyword Performance", pages: "Page Performance",
    quickWins: "Quick Wins", decay: "Content Decay",
    cannibal: "Cannibalization", insights: "AI Insights",
    // Metrics
    clicks: "Clicks", impressions: "Impressions",
    ctr: "CTR", position: "Avg. Position",
    sessions: "Sessions", bounceRate: "Bounce Rate",
    // Labels
    query: "Query", page: "Page", change: "Change",
    export: "Export CSV", pdfExport: "Export PDF",
    filter: "Filter", search: "Search...",
    vs: "vs previous period",
    rank: "Rank", opportunity: "Opportunity Score",
    severity: "Severity", recommendation: "Recommendation",
    insightTitle: "AI-Generated Insights",
    traffic: "Traffic Growth",
    // Date range
    dateRange: "Date Range", last7: "Last 7 days", last28: "Last 28 days",
    last90: "Last 90 days", last6m: "Last 6 months", custom: "Custom",
    apply: "Apply", cancel: "Cancel",
    // Site selector
    selectSite: "Select site", allSites: "All sites",
    addSite: "Add new site",
    // Notifications
    notifications: "Notifications", markAllRead: "Mark all read",
    noNotifications: "No new notifications",
    // Insight actions
    viewDetails: "View Details", dismiss: "Dismiss", createTask: "Create Task",
    addToReport: "Add to Report", markDone: "Mark Done",
    // Settings / profile
    settings: "Settings", profile: "Profile", logout: "Logout",
    connect: "Connect Account", connected: "Connected", disconnect: "Disconnect",
    googleSC: "Google Search Console", ga4: "Google Analytics 4",
    // Table
    loading: "Loading...", noData: "No data available",
    affectedPages: "Affected Pages",
    // Language toggle
    lang: "عربي",
    // CSV export toast
    exportSuccess: "CSV exported successfully",
    exportCols_query: "Query", exportCols_clicks: "Clicks",
    exportCols_impressions: "Impressions", exportCols_ctr: "CTR (%)",
    exportCols_position: "Avg. Position", exportCols_change: "Position Change",
  },
  ar: {
    brand: "رانك مايند", tagline: "ذكاء السيو المدعوم بالذكاء الاصطناعي",
    heroTitle: "حوّل بيانات البحث إلى", heroHighlight: "ذكاء الإيرادات",
    heroSub: "اربط Google Search Console و GA4 واحصل على رؤى تلقائية وفرص نمو — مصمم لمحترفي السيو.",
    startFree: "ابدأ مجاناً", watchDemo: "شاهد العرض",
    trustedBy: "يثق به أكثر من 2,400 متخصص في السيو",
    features: "المميزات", howItWorks: "كيف يعمل",
    pricing: "الأسعار", blog: "المدونة", login: "تسجيل الدخول", signup: "ابدأ الآن",
    hero_stat1: "+2.4K", hero_stat1_label: "متخصص سيو",
    hero_stat2: "+18M", hero_stat2_label: "كلمة مفتاحية مُتتبَّعة",
    hero_stat3: "94%",  hero_stat3_label: "رضا العملاء",
    feat_kw_title: "ذكاء الكلمات المفتاحية", feat_kw_desc: "تتبع جميع استعلامات البحث مع الترتيب ومعدل النقر والتحليل.",
    feat_qw_title: "اكتشاف الفرص السريعة",  feat_qw_desc: "رصد الكلمات في مراتب 8-20 ذات حجم ظهور مرتفع تلقائياً.",
    feat_dc_title: "تنبيهات تراجع المحتوى", feat_dc_desc: "اكتشف الصفحات التي تفقد زياراتها قبل أن تختفي من النتائج.",
    feat_cn_title: "كشف التنافس الداخلي", feat_cn_desc: "حدد الصفحات المتنافسة واحصل على توصيات الدمج.",
    feat_ai_title: "محرك رؤى الذكاء الاصطناعي", feat_ai_desc: "رؤى سيو بلغة بشرية تُولَّد تلقائياً من بياناتك.",
    feat_db_title: "GSC + GA4 موحّد",    feat_db_desc: "مصدرا البيانات في عرض واحد لصورة كاملة عن أداء البحث.",
    hiw_1_title: "اربط حساباتك", hiw_1_desc: "اربط Google Search Console و GA4 عبر OAuth. بدون أكواد.",
    hiw_2_title: "معالجة تلقائية للبيانات", hiw_2_desc: "نجلب بياناتك ونحللها كل 24 ساعة تلقائياً.",
    hiw_3_title: "احصل على رؤى مدعومة بالذكاء الاصطناعي", hiw_3_desc: "راجع قائمة الفرص المرتبة والفرص السريعة وبطاقات الرؤى.",
    step: "خطوة",
    monthly: "شهري", annual: "سنوي (وفر 20٪)", mostPopular: "الأكثر شيوعاً",
    perMonth: "/شهر",
    plan_starter: "المبتدئ", plan_pro: "الاحترافي", plan_agency: "الوكالات",
    privacy: "الخصوصية", terms: "الشروط", apiDocs: "توثيق API",
    copyright: "© 2025 رانك مايند. جميع الحقوق محفوظة.",
    welcomeBack: "مرحباً بعودتك", createAccount: "أنشئ حسابك",
    continueGoogle: "المتابعة مع Google", orDivider: "أو",
    fullName: "الاسم الكامل", emailAddress: "البريد الإلكتروني", password: "كلمة المرور",
    noAccount: "ليس لديك حساب؟", hasAccount: "لديك حساب بالفعل؟",
    dashboard: "لوحة التحكم", overview: "نظرة عامة على السيو",
    keywords: "أداء الكلمات المفتاحية", pages: "أداء الصفحات",
    quickWins: "فرص سريعة", decay: "تراجع المحتوى",
    cannibal: "التنافس الداخلي", insights: "رؤى الذكاء الاصطناعي",
    clicks: "النقرات", impressions: "مرات الظهور",
    ctr: "معدل النقر", position: "متوسط الترتيب",
    sessions: "الجلسات", bounceRate: "معدل الارتداد",
    query: "الاستعلام", page: "الصفحة", change: "التغيير",
    export: "تصدير CSV", pdfExport: "تصدير PDF",
    filter: "تصفية", search: "بحث...",
    vs: "مقارنة بالفترة السابقة",
    rank: "الترتيب", opportunity: "نقاط الفرصة",
    severity: "الحدة", recommendation: "التوصية",
    insightTitle: "رؤى الذكاء الاصطناعي",
    traffic: "نمو الزيارات",
    dateRange: "نطاق التاريخ", last7: "آخر 7 أيام", last28: "آخر 28 يوماً",
    last90: "آخر 90 يوماً", last6m: "آخر 6 أشهر", custom: "مخصص",
    apply: "تطبيق", cancel: "إلغاء",
    selectSite: "اختر موقعاً", allSites: "كل المواقع",
    addSite: "إضافة موقع جديد",
    notifications: "الإشعارات", markAllRead: "تعليم الكل كمقروء",
    noNotifications: "لا توجد إشعارات جديدة",
    viewDetails: "عرض التفاصيل", dismiss: "إغلاق", createTask: "إنشاء مهمة",
    addToReport: "إضافة للتقرير", markDone: "تعليم كمنجز",
    settings: "الإعدادات", profile: "الملف الشخصي", logout: "تسجيل الخروج",
    connect: "ربط الحساب", connected: "متصل", disconnect: "فصل",
    googleSC: "Google Search Console", ga4: "Google Analytics 4",
    loading: "جارٍ التحميل...", noData: "لا توجد بيانات",
    affectedPages: "الصفحات المتأثرة",
    lang: "English",
    exportSuccess: "تم تصدير CSV بنجاح",
    exportCols_query: "الاستعلام", exportCols_clicks: "النقرات",
    exportCols_impressions: "مرات الظهور", exportCols_ctr: "معدل النقر (%)",
    exportCols_position: "متوسط الترتيب", exportCols_change: "تغيير الترتيب",
  }
};

// ══════════════════════════════════════════════════════════════
// STATIC BACKGROUND ORBS — fixed outside component (Bug #4 fix)
// ══════════════════════════════════════════════════════════════
const BG_ORBS = Array.from({ length: 18 }, (_, i) => ({
  w: 60 + ((i * 73 + 41) % 250),
  h: 60 + ((i * 97 + 17) % 250),
  left: ((i * 53 + 7) % 100),
  top:  ((i * 67 + 23) % 100),
  blue: i % 2 === 0,
}));

// ══════════════════════════════════════════════════════════════
// MOCK DATA
// ══════════════════════════════════════════════════════════════
const TRAFFIC_DATA = {
  "last7":  [
    { month: "Mon", clicks: 3200,  impressions: 38000,  sessions: 2800  },
    { month: "Tue", clicks: 3500,  impressions: 41000,  sessions: 3100  },
    { month: "Wed", clicks: 2900,  impressions: 35000,  sessions: 2600  },
    { month: "Thu", clicks: 3800,  impressions: 44000,  sessions: 3400  },
    { month: "Fri", clicks: 4100,  impressions: 47000,  sessions: 3700  },
    { month: "Sat", clicks: 2400,  impressions: 29000,  sessions: 2100  },
    { month: "Sun", clicks: 1900,  impressions: 23000,  sessions: 1700  },
  ],
  "last28": [
    { month: "W1",  clicks: 18400, impressions: 210000, sessions: 16200 },
    { month: "W2",  clicks: 19200, impressions: 218000, sessions: 17100 },
    { month: "W3",  clicks: 20100, impressions: 228000, sessions: 17900 },
    { month: "W4",  clicks: 21200, impressions: 238000, sessions: 18800 },
  ],
  "last90": [
    { month: "Aug", clicks: 12400, impressions: 148000, sessions: 9800  },
    { month: "Sep", clicks: 14200, impressions: 162000, sessions: 11200 },
    { month: "Oct", clicks: 13800, impressions: 155000, sessions: 10900 },
    { month: "Nov", clicks: 16500, impressions: 189000, sessions: 13100 },
    { month: "Dec", clicks: 15200, impressions: 172000, sessions: 12000 },
    { month: "Jan", clicks: 18900, impressions: 210000, sessions: 15300 },
    { month: "Feb", clicks: 21200, impressions: 238000, sessions: 17800 },
  ],
  "last6m": [
    { month: "Sep", clicks: 56200, impressions: 634000, sessions: 49800 },
    { month: "Oct", clicks: 61400, impressions: 692000, sessions: 54300 },
    { month: "Nov", clicks: 68900, impressions: 774000, sessions: 61000 },
    { month: "Dec", clicks: 64100, impressions: 722000, sessions: 56800 },
    { month: "Jan", clicks: 73800, impressions: 831000, sessions: 65400 },
    { month: "Feb", clicks: 82400, impressions: 928000, sessions: 73100 },
  ],
};

const KPI_DATA = {
  "last7":  { clicks: 21800,  impressions: 257000, ctr: 8.5,  position: 5.4,  cc: 6.2,  ic: 4.1,  ctrc: 1.8,  posc: -0.3 },
  "last28": { clicks: 78900,  impressions: 894000, ctr: 8.8,  position: 5.3,  cc: 9.4,  ic: 7.2,  ctrc: 2.0,  posc: -0.5 },
  "last90": { clicks: 118400, impressions: 1340000, ctr: 8.9, position: 5.2,  cc: 12.1, ic: 8.4,  ctrc: 2.1,  posc: -0.8 },
  "last6m": { clicks: 406800, impressions: 4581000, ctr: 8.9, position: 5.1,  cc: 18.4, ic: 14.2, ctrc: 3.1,  posc: -1.2 },
};

const KEYWORD_DATA = [
  { query: "seo tools for agencies",       clicks: 1240, impressions: 18400, ctr: 6.7, position: 4.2,  change: +1.3 },
  { query: "google search console guide",  clicks: 980,  impressions: 32100, ctr: 3.1, position: 6.8,  change: -0.5 },
  { query: "technical seo checklist 2025", clicks: 876,  impressions: 14200, ctr: 6.2, position: 3.1,  change: +2.1 },
  { query: "keyword cannibalization fix",  clicks: 654,  impressions: 9800,  ctr: 6.7, position: 5.4,  change: +0.8 },
  { query: "content decay detection",      clicks: 543,  impressions: 8200,  ctr: 6.6, position: 7.2,  change: -1.2 },
  { query: "seo dashboard software",       clicks: 489,  impressions: 12300, ctr: 4.0, position: 8.1,  change: +0.3 },
  { query: "ga4 seo reporting",            clicks: 421,  impressions: 11000, ctr: 3.8, position: 9.4,  change: +1.9 },
  { query: "seo intelligence platform",    clicks: 398,  impressions: 7600,  ctr: 5.2, position: 11.2, change: +3.4 },
];

const QUICK_WIN_DATA = [
  { query: "seo automation tools",         clicks: 210, impressions: 14200, ctr: 1.5, position: 12.3, opportunity: 94 },
  { query: "crawl budget optimization",    clicks: 180, impressions: 11800, ctr: 1.5, position: 14.1, opportunity: 88 },
  { query: "core web vitals 2025",         clicks: 156, impressions: 9400,  ctr: 1.7, position: 16.2, opportunity: 82 },
  { query: "international seo strategy",   clicks: 134, impressions: 8900,  ctr: 1.5, position: 13.8, opportunity: 79 },
  { query: "schema markup generator",      clicks: 98,  impressions: 7200,  ctr: 1.4, position: 18.4, opportunity: 71 },
  { query: "entity seo explained",         clicks: 87,  impressions: 6100,  ctr: 1.4, position: 19.1, opportunity: 68 },
];

const PAGE_DATA = [
  { page: "/blog/technical-seo-guide",    sessions: 4210, clicks: 2100, ctr: 8.2, bounceRate: 34, change: +12.4 },
  { page: "/blog/keyword-research-2025",  sessions: 3840, clicks: 1890, ctr: 7.1, bounceRate: 38, change: +8.1  },
  { page: "/features/keyword-tracking",   sessions: 2910, clicks: 1340, ctr: 5.4, bounceRate: 42, change: -3.2  },
  { page: "/blog/content-decay-seo",      sessions: 2640, clicks: 1210, ctr: 6.8, bounceRate: 36, change: +22.8 },
  { page: "/pricing",                     sessions: 2380, clicks: 980,  ctr: 4.1, bounceRate: 51, change: -1.1  },
  { page: "/blog/ga4-seo-tutorial",       sessions: 1920, clicks: 876,  ctr: 5.9, bounceRate: 41, change: +6.4  },
];

const DECAY_DATA = [
  { page: "/blog/seo-tools-2022",              peak: 4200, current: 890,  drop: -78.8, severity: "critical" },
  { page: "/blog/google-algorithm-updates",    peak: 3100, current: 1240, drop: -60.0, severity: "high"     },
  { page: "/features/old-dashboard",          peak: 1800, current: 890,  drop: -50.6, severity: "high"     },
  { page: "/blog/local-seo-guide",            peak: 2400, current: 1380, drop: -42.5, severity: "medium"   },
  { page: "/blog/link-building-2023",         peak: 1600, current: 980,  drop: -38.8, severity: "medium"   },
];

const CANNIBAL_DATA = [
  { keyword: "seo tools",         pages: ["/tools", "/blog/best-seo-tools", "/features"], topPage: "/tools"           },
  { keyword: "keyword tracking",  pages: ["/features/keywords", "/blog/keyword-tracking"], topPage: "/features/keywords"},
  { keyword: "content optimization", pages: ["/features/content", "/blog/content-seo", "/academy/content"], topPage: "/blog/content-seo" },
];

const CTR_DIST = [
  { name: "Top 3",  value: 34, color: "#10b981" },
  { name: "4–10",   value: 41, color: "#3b82f6"  },
  { name: "11–20",  value: 18, color: "#f59e0b"  },
  { name: "20+",    value: 7,  color: "#ef4444"  },
];

const AI_INSIGHTS_DATA = [
  { id: 1, type: "opportunity", icon: "🚀", titleKey: "ins1_title", descKey: "ins1_desc", score: 94 },
  { id: 2, type: "warning",     icon: "⚠️", titleKey: "ins2_title", descKey: "ins2_desc", score: 82 },
  { id: 3, type: "decay",       icon: "📉", titleKey: "ins3_title", descKey: "ins3_desc", score: 78 },
  { id: 4, type: "cannibal",    icon: "🔀", titleKey: "ins4_title", descKey: "ins4_desc", score: 71 },
  { id: 5, type: "positive",    icon: "✅", titleKey: "ins5_title", descKey: "ins5_desc", score: 68 },
];
const INSIGHT_COPY = {
  en: {
    ins1_title: "Quick Win Cluster Detected",
    ins1_desc: "6 keywords ranking 11-19 with >5K monthly impressions. Content updates could drive +2,400 clicks/month.",
    ins2_title: "Low CTR on High-Impression Queries",
    ins2_desc: "3 pages with >10K impressions/month have CTR below 2%. Title tag optimization recommended.",
    ins3_title: "Content Decay Alert — Immediate Action",
    ins3_desc: "/blog/seo-tools-2022 lost 78% of traffic in 6 months. Refresh with 2025 data to recapture rankings.",
    ins4_title: "Cannibalization Risk Detected",
    ins4_desc: "3 keyword clusters show competing pages. Consolidation could recover 15% of lost authority.",
    ins5_title: "Strong Topical Authority Growth",
    ins5_desc: "Technical SEO cluster gained +34 average positions in 90 days. Expand content depth to sustain.",
  },
  ar: {
    ins1_title: "تم اكتشاف مجموعة فرص سريعة",
    ins1_desc: "6 كلمات في مراتب 11-19 بظهور >5K شهرياً. تحديثات المحتوى قد تولّد +2,400 نقرة إضافية شهرياً.",
    ins2_title: "معدل نقر منخفض على استعلامات عالية الظهور",
    ins2_desc: "3 صفحات بظهور >10K شهرياً ولكن CTR أقل من 2%. يُنصح بتحسين عناوين الصفحات.",
    ins3_title: "تنبيه تراجع محتوى — يتطلب إجراءً فورياً",
    ins3_desc: "فقدت /blog/seo-tools-2022 78% من زياراتها في 6 أشهر. حدّث بيانات 2025 لاستعادة الترتيب.",
    ins4_title: "تم رصد خطر تنافس داخلي",
    ins4_desc: "3 مجموعات كلمات تتنافس فيها صفحات متعددة. الدمج قد يُستعيد 15% من السلطة المفقودة.",
    ins5_title: "نمو قوي في السلطة الموضوعية",
    ins5_desc: "مجموعة سيو التقني حققت متوسط +34 مرتبة في 90 يوماً. وسّع عمق المحتوى للحفاظ على الزخم.",
  },
};

const MOCK_SITES = [
  { id: "s1", url: "https://example.com", label: "example.com" },
  { id: "s2", url: "https://blog.example.com", label: "blog.example.com" },
  { id: "s3", url: "https://shop.example.com", label: "shop.example.com" },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "warning", text: "Traffic drop >20% detected on /blog/seo-tools-2022", textAr: "انخفاض زيارات >20% على /blog/seo-tools-2022", time: "2m ago", timeAr: "منذ دقيقتين", read: false },
  { id: 2, type: "opportunity", text: "New quick win: 'seo automation tools' moved to position 12", textAr: "فرصة جديدة: 'seo automation tools' انتقلت للمرتبة 12", time: "1h ago", timeAr: "منذ ساعة", read: false },
  { id: 3, type: "positive", text: "Weekly report ready — click to download", textAr: "التقرير الأسبوعي جاهز — انقر للتحميل", time: "3h ago", timeAr: "منذ 3 ساعات", read: true },
];

const PRICING_PLANS = [
  {
    nameKey: "plan_starter", price: 49,
    features: { en: ["5 Projects","500 Keywords","GSC Integration","Basic Reports","Email Support"], ar: ["5 مشاريع","500 كلمة مفتاحية","ربط GSC","تقارير أساسية","دعم بريد إلكتروني"] },
    highlighted: false,
  },
  {
    nameKey: "plan_pro", price: 99,
    features: { en: ["25 Projects","5,000 Keywords","GSC + GA4","AI Insights Engine","Quick Wins Detection","Content Decay Alerts","Priority Support"], ar: ["25 مشروعاً","5,000 كلمة مفتاحية","GSC + GA4","محرك رؤى AI","كشف الفرص السريعة","تنبيهات تراجع المحتوى","دعم أولوية"] },
    highlighted: true,
  },
  {
    nameKey: "plan_agency", price: 249,
    features: { en: ["Unlimited Projects","50,000 Keywords","Full API Access","White-label Reports","Cannibalization Detection","Custom Dashboards","Dedicated Manager"], ar: ["مشاريع غير محدودة","50,000 كلمة مفتاحية","وصول كامل للـ API","تقارير بالعلامة التجارية","كشف التنافس الداخلي","لوحات مخصصة","مدير مخصص"] },
    highlighted: false,
  },
];

// ══════════════════════════════════════════════════════════════
// DATE RANGE PRESETS
// ══════════════════════════════════════════════════════════════
const DATE_PRESETS = [
  { key: "last7",  labelKey: "last7"  },
  { key: "last28", labelKey: "last28" },
  { key: "last90", labelKey: "last90" },
  { key: "last6m", labelKey: "last6m" },
];

// ══════════════════════════════════════════════════════════════
// CSV EXPORT UTILITY (Bug #5 fix — real handler)
// ══════════════════════════════════════════════════════════════
function exportToCSV(rows, columns, filename) {
  const header = columns.map(c => `"${c.label}"`).join(",");
  const body = rows.map(row =>
    columns.map(c => {
      const val = row[c.key] ?? "";
      return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
    }).join(",")
  ).join("\n");
  const csv = `${header}\n${body}`;
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }); // BOM for Arabic
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════════
const Toast = ({ message, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-2xl text-sm font-medium animate-bounce-in">
      <Check size={16} /> {message}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// DATE RANGE PICKER COMPONENT
// ══════════════════════════════════════════════════════════════
const DateRangePicker = ({ value, onChange, t, isRtl }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const presetLabel = DATE_PRESETS.find(p => p.key === value)
    ? t[DATE_PRESETS.find(p => p.key === value).labelKey]
    : t.custom;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-blue-500/50 transition-colors min-w-[130px]"
      >
        <Calendar size={13} className="text-blue-400 flex-shrink-0" />
        <span className="flex-1 text-left truncate">{presetLabel}</span>
        <ChevronDown size={12} className="text-slate-500 flex-shrink-0" />
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden
            ${isRtl ? "right-0" : "left-0"}`}
        >
          <div className="p-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1.5 mb-1">{t.dateRange}</p>
            {DATE_PRESETS.map(preset => (
              <button
                key={preset.key}
                onMouseEnter={() => setHovered(preset.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => { onChange(preset.key); setOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors
                  ${value === preset.key
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                    : hovered === preset.key
                    ? "bg-slate-800 text-white"
                    : "text-slate-300"
                  }`}
              >
                {t[preset.labelKey]}
                {value === preset.key && <Check size={11} className="text-blue-400" />}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-700/50 p-2">
            <div className="px-3 py-2 rounded-lg text-xs text-slate-500 cursor-not-allowed flex items-center gap-2">
              <Calendar size={11} /> {t.custom} <span className="text-slate-600 text-xs">(coming soon)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SITE SELECTOR COMPONENT
// ══════════════════════════════════════════════════════════════
const SiteSelector = ({ sites, activeSite, onChange, t, isRtl }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const active = sites.find(s => s.id === activeSite) || sites[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-blue-500/50 transition-colors max-w-[180px]"
      >
        <Globe size={13} className="text-emerald-400 flex-shrink-0" />
        <span className="flex-1 text-left truncate">{active?.label || t.selectSite}</span>
        <ChevronDown size={12} className="text-slate-500 flex-shrink-0" />
      </button>

      {open && (
        <div className={`absolute top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden ${isRtl ? "right-0" : "left-0"}`}>
          <div className="p-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1.5 mb-1">{t.selectSite}</p>
            {sites.map(site => (
              <button
                key={site.id}
                onClick={() => { onChange(site.id); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors text-left
                  ${activeSite === site.id ? "bg-blue-600/20 text-blue-300 border border-blue-500/20" : "text-slate-300 hover:bg-slate-800"}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="truncate flex-1">{site.label}</span>
                {activeSite === site.id && <Check size={11} className="text-blue-400" />}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-700/50 p-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-blue-400 hover:bg-slate-800 transition-colors">
              <span className="text-lg leading-none">+</span> {t.addSite}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// NOTIFICATION PANEL
// ══════════════════════════════════════════════════════════════
const NotificationPanel = ({ notifications, onMarkAll, onClose, t, lang }) => (
  <div className="absolute top-full mt-2 right-0 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
      <span className="text-sm font-semibold text-white">{t.notifications}</span>
      <div className="flex items-center gap-2">
        <button onClick={onMarkAll} className="text-xs text-blue-400 hover:text-blue-300">{t.markAllRead}</button>
        <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={14} /></button>
      </div>
    </div>
    <div className="max-h-72 overflow-y-auto">
      {notifications.map(n => (
        <div key={n.id} className={`px-4 py-3 border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors ${n.read ? "opacity-50" : ""}`}>
          <div className="flex items-start gap-3">
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? "bg-blue-400" : "bg-slate-600"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-200 leading-relaxed">{lang === "ar" ? n.textAr : n.text}</p>
              <p className="text-xs text-slate-500 mt-1">{lang === "ar" ? n.timeAr : n.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════
// USER DROPDOWN
// ══════════════════════════════════════════════════════════════
const UserDropdown = ({ t, onLogout, onClose }) => (
  <div className="absolute top-full mt-2 right-0 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
    <div className="p-2">
      <div className="px-3 py-2 border-b border-slate-800 mb-1">
        <p className="text-xs font-semibold text-white">Ahmed Hassan</p>
        <p className="text-xs text-slate-500">ahmed@example.com</p>
      </div>
      {[
        { icon: Settings, label: t.settings },
        { icon: Database, label: t.connect },
      ].map(({ icon: Icon, label }) => (
        <button key={label} onClick={onClose} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition-colors text-left">
          <Icon size={13} /> {label}
        </button>
      ))}
      <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left mt-1 border-t border-slate-800 pt-2">
        <LogOut size={13} /> {t.logout}
      </button>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════
// INSIGHT DETAIL PANEL (slide-over)
// ══════════════════════════════════════════════════════════════
const InsightDetailPanel = ({ insight, t, lang, onClose }) => {
  if (!insight) return null;
  const copy = INSIGHT_COPY[lang];
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-700 h-full overflow-y-auto z-10 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <span className="text-sm font-semibold text-white">{t.viewDetails}</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{insight.icon}</div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">{copy[insight.titleKey]}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{copy[insight.descKey]}</p>
            </div>
          </div>
          <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Impact Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${insight.score}%` }} />
              </div>
              <span className="text-sm font-bold text-white">{insight.score}/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">Recommended Actions</p>
            <div className="space-y-2">
              {["Conduct content gap analysis vs top competitors","Update title tag and H1 with primary intent","Add 2025 statistics and refreshed data","Improve internal linking to this page"].map((a,i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-800/40">
                  <div className="w-4 h-4 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i+1}</div>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-slate-800 flex gap-2">
          <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors">{t.createTask}</button>
          <button onClick={onClose} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SHARED UTILITIES
// ══════════════════════════════════════════════════════════════
const Badge = ({ type, children }) => {
  const colors = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high:     "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium:   "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low:      "bg-blue-500/20 text-blue-400 border-blue-500/30",
    positive: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };
  return <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${colors[type] || colors.low}`}>{children}</span>;
};

// ✅ Bug #2 Fixed: position is inverted — lower = better
const MetricCard = ({ label, value, change, icon: Icon, color = "blue", suffix = "", invertChange = false }) => {
  const isGood = invertChange ? change <= 0 : change >= 0;
  const colors = {
    blue:    "from-blue-600/20 to-blue-600/5 border-blue-500/20 text-blue-400",
    emerald: "from-emerald-600/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
    violet:  "from-violet-600/20 to-violet-600/5 border-violet-500/20 text-violet-400",
    amber:   "from-amber-600/20 to-amber-600/5 border-amber-500/20 text-amber-400",
  };
  const iconColor = colors[color].split(" ")[2];
  return (
    <div className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${colors[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">{label}</p>
          <p className="text-2xl font-bold text-white">{typeof value === "number" ? value.toLocaleString() : value}{suffix}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/5"><Icon size={18} className={iconColor} /></div>
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${isGood ? "text-emerald-400" : "text-red-400"}`}>
          {isGood ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{Math.abs(change)}{suffix || "%"}</span>
          <span className="text-slate-500 font-normal ml-1">vs prev.</span>
        </div>
      )}
    </div>
  );
};

const OpScore = ({ score }) => {
  const color = score >= 85 ? "#10b981" : score >= 65 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>{score}</span>
    </div>
  );
};

// Sortable column header
const SortTh = ({ label, sortKey, sort, onSort }) => (
  <th
    className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-white transition-colors"
    onClick={() => onSort(sortKey)}
  >
    <div className="flex items-center gap-1">
      {label}
      <span className="text-slate-600">
        {sort.key === sortKey ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </div>
  </th>
);

const useSort = (data, defaultKey, defaultDir = "desc") => {
  const [sort, setSort] = useState({ key: defaultKey, dir: defaultDir });
  const sorted = useMemo(() =>
    [...data].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sort.dir === "asc" ? cmp : -cmp;
    }),
    [data, sort]
  );
  const onSort = useCallback(key =>
    setSort(s => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" })),
    []
  );
  return { sorted, sort, onSort };
};

// ══════════════════════════════════════════════════════════════
// DASHBOARD SECTIONS
// ══════════════════════════════════════════════════════════════
const OverviewSection = ({ t, dateRange, onExport }) => {
  const kpi = KPI_DATA[dateRange] || KPI_DATA["last90"];
  const traffic = TRAFFIC_DATA[dateRange] || TRAFFIC_DATA["last90"];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{t.overview}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{t.vs}</p>
        </div>
        <button onClick={() => onExport("overview")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:border-blue-500/50 transition-colors">
          <Download size={12} /> {t.export}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label={t.clicks}      value={kpi.clicks}    change={kpi.cc}   icon={MousePointer} color="blue"    suffix="" />
        <MetricCard label={t.impressions} value={kpi.impressions} change={kpi.ic} icon={Eye}          color="violet"  suffix="" />
        <MetricCard label={t.ctr}         value={`${kpi.ctr}`}  change={kpi.ctrc} icon={Target}       color="emerald" suffix="%" />
        {/* ✅ Bug #2: invertChange=true → lower position = green */}
        <MetricCard label={t.position}    value={`${kpi.position}`} change={kpi.posc} icon={Award}    color="amber"   suffix="" invertChange={true} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">{t.traffic} — {t.clicks} &amp; {t.impressions}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={traffic}>
              <defs>
                {/* ✅ Bug #6 Fixed: unique IDs per instance */}
                <linearGradient id="ov-gClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ov-gImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} labelStyle={{ color: "#94a3b8" }} />
              <Area type="monotone" dataKey="clicks"      stroke="#3b82f6" fill="url(#ov-gClicks)"      strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="impressions" stroke="#8b5cf6" fill="url(#ov-gImpressions)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Rank Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CTR_DIST} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {CTR_DIST.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {CTR_DIST.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-400">{t.position} {d.name}</span>
                </div>
                <span className="text-white font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const KeywordsSection = ({ t, onExport }) => {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() =>
    KEYWORD_DATA.filter(k => k.query.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
  const { sorted, sort, onSort } = useSort(filtered, "clicks");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{t.keywords}</h2>
          <p className="text-sm text-slate-400 mt-0.5">Google Search Console · {sorted.length} {t.query}s</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50 w-44 transition-colors" />
          </div>
          {/* ✅ Bug #5 Fixed: real onClick CSV export */}
          <button onClick={() => onExport("keywords")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
            <Download size={12} /> {t.export}
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/80">
                <SortTh label={t.query}       sortKey="query"       sort={sort} onSort={onSort} />
                <SortTh label={t.clicks}      sortKey="clicks"      sort={sort} onSort={onSort} />
                <SortTh label={t.impressions} sortKey="impressions" sort={sort} onSort={onSort} />
                <SortTh label={t.ctr}         sortKey="ctr"         sort={sort} onSort={onSort} />
                <SortTh label={t.position}    sortKey="position"    sort={sort} onSort={onSort} />
                <SortTh label={t.change}      sortKey="change"      sort={sort} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={i} className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-medium text-xs">{row.query}</td>
                  <td className="px-4 py-3 text-white text-xs font-semibold tabular-nums">{row.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs tabular-nums">{row.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs"><span className="text-emerald-400 font-medium">{row.ctr}%</span></td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`font-bold ${row.position <= 5 ? "text-emerald-400" : row.position <= 10 ? "text-blue-400" : "text-amber-400"}`}>{row.position}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {/* ✅ Bug #2: position change — lower = better = green */}
                    <div className={`flex items-center gap-0.5 ${row.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {row.change > 0 ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      <span>{Math.abs(row.change)}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-xs text-slate-500">{t.noData}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuickWinsSection = ({ t }) => {
  const [selected, setSelected] = useState(null);
  const { sorted, sort, onSort } = useSort(QUICK_WIN_DATA, "opportunity");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{t.quickWins}</h2>
        <p className="text-sm text-slate-400 mt-0.5">Keywords ranking 8–20 with high impression volume</p>
      </div>
      <div className="space-y-2.5">
        {sorted.map((kw, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 px-5 py-4 hover:border-blue-500/30 transition-colors group">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{kw.query}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pos: <span className="text-amber-400 font-semibold">{kw.position}</span>
                  {" · "}{kw.impressions.toLocaleString()} {t.impressions}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400">{t.clicks}</p>
                <p className="text-sm font-semibold text-white">{kw.clicks}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400">{t.ctr}</p>
                <p className="text-sm font-semibold text-white">{kw.ctr}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">{t.opportunity}</p>
                <OpScore score={kw.opportunity} />
              </div>
              {/* ✅ Fixed: ExternalLink now has onClick */}
              <button
                onClick={() => setSelected(kw)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/40"
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Keyword Detail</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <p className="text-base font-bold text-blue-400 mb-4">"{selected.query}"</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[["Position", selected.position],["Impressions", selected.impressions.toLocaleString()],["Clicks", selected.clicks],[t.ctr, `${selected.ctr}%`]].map(([l,v]) => (
                <div key={l} className="bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-400">{l}</p>
                  <p className="text-sm font-bold text-white mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-300 font-medium">💡 Opportunity</p>
              <p className="text-xs text-slate-300 mt-1">Improve content targeting this keyword. Moving from pos {selected.position} to top 5 could yield ~{Math.round(selected.impressions * 0.072).toLocaleString()} additional clicks/month.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentDecaySection = ({ t }) => {
  const { sorted, sort, onSort } = useSort(DECAY_DATA, "drop");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{t.decay}</h2>
        <p className="text-sm text-slate-400 mt-0.5">Pages with significant traffic loss compared to peak</p>
      </div>
      <div className="space-y-3">
        {sorted.map((item, i) => (
          <div key={i} className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 hover:border-slate-600/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge type={item.severity}>{item.severity.toUpperCase()}</Badge>
                </div>
                <p className="text-sm font-medium text-slate-200 truncate">{item.page}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <span className="text-2xl font-extrabold text-red-400">{item.drop}%</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400 mb-3">
              <span>Peak: <strong className="text-white">{item.peak.toLocaleString()}</strong> {t.clicks}</span>
              <span>Now: <strong className="text-white">{item.current.toLocaleString()}</strong> {t.clicks}</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-red-500/60" style={{ width: `${(item.current / item.peak) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CannibalizationSection = ({ t }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-white">{t.cannibal}</h2>
      <p className="text-sm text-slate-400 mt-0.5">Multiple pages competing for the same keywords</p>
    </div>
    <div className="space-y-4">
      {CANNIBAL_DATA.map((item, i) => (
        <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white">"{item.keyword}"</p>
              <p className="text-xs text-amber-400 mt-0.5">{item.pages.length} pages competing</p>
            </div>
            <Badge type="medium">CANNIBAL</Badge>
          </div>
          <div className="space-y-2">
            {item.pages.map((page, pi) => (
              <div key={pi} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${page === item.topPage ? "bg-blue-500/10 border border-blue-500/20" : "bg-slate-800/50"}`}>
                {page === item.topPage && <Star size={10} className="text-blue-400 flex-shrink-0" />}
                <span className={page === item.topPage ? "text-blue-300 font-medium" : "text-slate-400"}>{page}</span>
                {page === item.topPage && <span className="ml-auto text-blue-400">Top Ranking</span>}
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-slate-800/60 rounded-lg">
            <p className="text-xs text-slate-300">
              <span className="text-slate-400">{t.recommendation}: </span>
              Consolidate secondary pages into <strong className="text-blue-300">{item.topPage}</strong> or add canonical tags.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AIInsightsSection = ({ t, lang }) => {
  const copy = INSIGHT_COPY[lang];
  const [dismissed, setDismissed] = useState([]);
  const [detailInsight, setDetailInsight] = useState(null);
  const [taskCreated, setTaskCreated] = useState([]);

  const visible = AI_INSIGHTS_DATA.filter(i => !dismissed.includes(i.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{t.insightTitle}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{visible.length} active insights</p>
        </div>
      </div>
      {visible.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          <CheckCircle size={32} className="mx-auto mb-3 text-emerald-500/40" />
          All insights resolved!
        </div>
      )}
      <div className="space-y-3">
        {visible.map(insight => (
          <div key={insight.id} className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 hover:border-slate-600/40 transition-colors">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0 mt-0.5">{insight.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{copy[insight.titleKey]}</p>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{copy[insight.descKey]}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-slate-500 mb-1">Impact</p>
                    <OpScore score={insight.score} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {/* ✅ Fixed: all buttons have real handlers */}
                  <button onClick={() => setDetailInsight(insight)}
                    className="px-3 py-1 text-xs bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 rounded-lg transition-colors">
                    {t.viewDetails}
                  </button>
                  <button
                    onClick={() => setTaskCreated(p => [...p, insight.id])}
                    className={`px-3 py-1 text-xs border rounded-lg transition-colors ${taskCreated.includes(insight.id) ? "bg-emerald-600/20 border-emerald-500/20 text-emerald-400" : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"}`}
                  >
                    {taskCreated.includes(insight.id) ? "✓ Task Created" : t.createTask}
                  </button>
                  <button onClick={() => setDismissed(p => [...p, insight.id])}
                    className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-400 rounded-lg transition-colors flex items-center gap-1">
                    <Trash2 size={10} /> {t.dismiss}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {detailInsight && (
        <InsightDetailPanel insight={detailInsight} t={t} lang={lang} onClose={() => setDetailInsight(null)} />
      )}
    </div>
  );
};

const PagePerformanceSection = ({ t, onExport }) => {
  const { sorted, sort, onSort } = useSort(PAGE_DATA, "sessions");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{t.pages}</h2>
          <p className="text-sm text-slate-400 mt-0.5">Combined GSC + GA4</p>
        </div>
        <button onClick={() => onExport("pages")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
          <Download size={12} /> {t.export}
        </button>
      </div>
      <div className="rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/80">
                <SortTh label={t.page}       sortKey="page"       sort={sort} onSort={onSort} />
                <SortTh label={t.sessions}   sortKey="sessions"   sort={sort} onSort={onSort} />
                <SortTh label={t.clicks}     sortKey="clicks"     sort={sort} onSort={onSort} />
                <SortTh label={t.ctr}        sortKey="ctr"        sort={sort} onSort={onSort} />
                <SortTh label={t.bounceRate} sortKey="bounceRate" sort={sort} onSort={onSort} />
                <SortTh label={t.change}     sortKey="change"     sort={sort} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={i} className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-blue-400 text-xs font-medium max-w-[200px] truncate">{row.page}</td>
                  <td className="px-4 py-3 text-white text-xs font-semibold tabular-nums">{row.sessions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs tabular-nums">{row.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs"><span className="text-emerald-400 font-medium">{row.ctr}%</span></td>
                  <td className="px-4 py-3 text-xs"><span className={row.bounceRate > 45 ? "text-red-400 font-semibold" : "text-emerald-400"}>{row.bounceRate}%</span></td>
                  <td className="px-4 py-3 text-xs">
                    <div className={`flex items-center gap-1 ${row.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {row.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {Math.abs(row.change)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// NAV ITEMS
// ══════════════════════════════════════════════════════════════
const getNavItems = (t) => [
  { id: "overview",  label: t.overview,  icon: BarChart2    },
  { id: "keywords",  label: t.keywords,  icon: Search       },
  { id: "pages",     label: t.pages,     icon: FileText     },
  { id: "quickwins", label: t.quickWins, icon: Zap          },
  { id: "decay",     label: t.decay,     icon: TrendingDown },
  { id: "cannibal",  label: t.cannibal,  icon: Layers       },
  { id: "insights",  label: t.insights,  icon: Cpu          },
];

// ══════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════
const Dashboard = ({ t, lang, onLangToggle, onLogout }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [dateRange, setDateRange]         = useState("last90");  // Global state
  const [activeSite, setActiveSite]       = useState("s1");      // Global state
  const [showNotif, setShowNotif]         = useState(false);
  const [showUser, setShowUser]           = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [toast, setToast]                 = useState(null);
  const isRtl = lang === "ar";

  const unread = notifications.filter(n => !n.read).length;

  // ✅ Bug #5 Fixed: real CSV export per section
  const handleExport = useCallback((section) => {
    if (section === "keywords") {
      exportToCSV(KEYWORD_DATA, [
        { key: "query",       label: t.exportCols_query       },
        { key: "clicks",      label: t.exportCols_clicks      },
        { key: "impressions", label: t.exportCols_impressions },
        { key: "ctr",         label: t.exportCols_ctr         },
        { key: "position",    label: t.exportCols_position    },
        { key: "change",      label: t.exportCols_change      },
      ], `keywords_${dateRange}.csv`);
    } else if (section === "pages") {
      exportToCSV(PAGE_DATA, [
        { key: "page",       label: t.page        },
        { key: "sessions",   label: t.sessions    },
        { key: "clicks",     label: t.clicks      },
        { key: "ctr",        label: t.ctr         },
        { key: "bounceRate", label: t.bounceRate  },
        { key: "change",     label: t.change      },
      ], `pages_${dateRange}.csv`);
    } else {
      exportToCSV([{ site: activeSite, date_range: dateRange, clicks: KPI_DATA[dateRange].clicks }],
        [{ key: "site", label: "Site" }, { key: "date_range", label: "Period" }, { key: "clicks", label: t.clicks }],
        `overview_${dateRange}.csv`);
    }
    setToast(t.exportSuccess);
  }, [dateRange, activeSite, t]);

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  const sectionMap = {
    overview:  <OverviewSection  t={t} dateRange={dateRange} onExport={handleExport} />,
    keywords:  <KeywordsSection  t={t} onExport={handleExport} />,
    pages:     <PagePerformanceSection t={t} onExport={handleExport} />,
    quickwins: <QuickWinsSection t={t} />,
    decay:     <ContentDecaySection   t={t} />,
    cannibal:  <CannibalizationSection t={t} />,
    insights:  <AIInsightsSection     t={t} lang={lang} />,
  };

  return (
    <div className={`flex h-screen bg-slate-950 text-white overflow-hidden`} dir={isRtl ? "rtl" : "ltr"}>
      {/* ═══ SIDEBAR ══════════════════════════════════════════ */}
      {/* ✅ Bug #3 Fixed: RTL border via className only, no conflicting inline style */}
      <aside className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"} bg-slate-900 flex flex-col
        ${isRtl ? "border-l border-slate-800" : "border-r border-slate-800"}`}>
        <div className="p-4 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-white text-sm">{t.brand}</span>}
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {getNavItems(t).map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all
                ${activeSection === item.id ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}
                ${!sidebarOpen ? "justify-center" : ""}`}
            >
              <item.icon size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings size={15} className="flex-shrink-0" />{sidebarOpen && t.settings}
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={15} className="flex-shrink-0" />{sidebarOpen && t.logout}
          </button>
        </div>
      </aside>

      {/* ═══ MAIN ═════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 flex items-center gap-3 px-4 border-b border-slate-800 bg-slate-900 flex-shrink-0">
          <button onClick={() => setSidebarOpen(o => !o)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 flex-shrink-0">
            <Menu size={16} />
          </button>

          {/* Breadcrumb */}
          <div className="text-xs text-slate-500 hidden sm:block flex-shrink-0">
            <span className="text-slate-300 font-medium">{t.dashboard}</span>
            <span className="mx-1.5">›</span>
            <span>{getNavItems(t).find(n => n.id === activeSection)?.label}</span>
          </div>

          <div className="flex-1" />

          {/* ✅ NEW: Site Selector */}
          <SiteSelector sites={MOCK_SITES} activeSite={activeSite} onChange={setActiveSite} t={t} isRtl={isRtl} />

          {/* ✅ NEW: Date Range Picker */}
          <DateRangePicker value={dateRange} onChange={setDateRange} t={t} isRtl={isRtl} />

          {/* Lang toggle */}
          <button onClick={onLangToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:border-blue-500/40 transition-colors flex-shrink-0">
            <Languages size={12} /> {t.lang}
          </button>

          {/* Notification bell */}
          <div className="relative flex-shrink-0">
            <button onClick={() => { setShowNotif(o => !o); setShowUser(false); }}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 relative">
              <Bell size={15} />
              {unread > 0 && (
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                  {unread}
                </div>
              )}
            </button>
            {showNotif && (
              <NotificationPanel notifications={notifications} onMarkAll={markAllRead} onClose={() => setShowNotif(false)} t={t} lang={lang} />
            )}
          </div>

          {/* ✅ Fixed: User avatar with working dropdown */}
          <div className="relative flex-shrink-0">
            <button onClick={() => { setShowUser(o => !o); setShowNotif(false); }}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800 transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold">A</div>
              <ChevronDown size={12} className="text-slate-400 hidden sm:block" />
            </button>
            {showUser && (
              <UserDropdown t={t} onLogout={onLogout} onClose={() => setShowUser(false)} />
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {sectionMap[activeSection]}
        </main>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════════════
// ✅ Bug #4 Fixed: BG_ORBS defined outside component, stable across renders
const AuthPage = ({ t, isLogin, onAuth, onToggle, lang, onLangToggle }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const isRtl = lang === "ar";

  return (
    <div className="min-h-screen bg-slate-950 flex" dir={isRtl ? "rtl" : "ltr"}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-950 to-slate-950 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0">
          {BG_ORBS.map((o, i) => (
            <div key={i} className="absolute rounded-full opacity-10"
              style={{ width: o.w, height: o.h, left: `${o.left}%`, top: `${o.top}%`, background: o.blue ? "#3b82f6" : "#8b5cf6", transform: "translate(-50%,-50%)" }} />
          ))}
        </div>
        <div className="relative z-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/40">
            <Zap size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{t.brand}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{t.tagline}</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-white">{t.brand}</span>
            </div>
            <button onClick={onLangToggle} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:border-blue-500/40 transition-colors">
              <Languages size={12} /> {t.lang}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">{isLogin ? t.login : t.signup}</h1>
          <p className="text-slate-400 text-sm mb-8">{isLogin ? t.welcomeBack : t.createAccount}</p>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 py-3 border border-slate-700 rounded-xl text-sm text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t.continueGoogle}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-500">{t.orDivider}</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {!isLogin && (
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder={t.fullName}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />
            )}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t.emailAddress}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder={t.password}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />

            <button onClick={onAuth}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-600/25">
              {isLogin ? t.login : t.signup}
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            {isLogin ? t.noAccount : t.hasAccount}{" "}
            <button onClick={onToggle} className="text-blue-400 hover:text-blue-300 font-medium">
              {isLogin ? t.signup : t.login}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════
const LandingPage = ({ t, onLogin, onSignup, lang, onLangToggle }) => {
  const [mobileMenu, setMobileMenu]     = useState(false);
  const [activePricing, setActivePricing] = useState("monthly");
  const isRtl = lang === "ar";

  const features = [
    { icon: Search,    titleKey: "feat_kw_title", descKey: "feat_kw_desc", color: "blue"    },
    { icon: Zap,       titleKey: "feat_qw_title", descKey: "feat_qw_desc", color: "amber"   },
    { icon: TrendingDown, titleKey: "feat_dc_title", descKey: "feat_dc_desc", color: "red"  },
    { icon: Layers,    titleKey: "feat_cn_title", descKey: "feat_cn_desc", color: "violet"  },
    { icon: Cpu,       titleKey: "feat_ai_title", descKey: "feat_ai_desc", color: "emerald" },
    { icon: Database,  titleKey: "feat_db_title", descKey: "feat_db_desc", color: "blue"    },
  ];

  const howItWorks = [
    { step: "01", titleKey: "hiw_1_title", descKey: "hiw_1_desc", icon: Globe       },
    { step: "02", titleKey: "hiw_2_title", descKey: "hiw_2_desc", icon: RefreshCw   },
    { step: "03", titleKey: "hiw_3_title", descKey: "hiw_3_desc", icon: Cpu         },
  ];

  const fColorMap = {
    blue:    "text-blue-400 bg-blue-500/10 border-blue-500/20",
    amber:   "text-amber-400 bg-amber-500/10 border-amber-500/20",
    red:     "text-red-400 bg-red-500/10 border-red-500/20",
    violet:  "text-violet-400 bg-violet-500/10 border-violet-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  // Mini chart preview data
  const previewTraffic = TRAFFIC_DATA["last90"];

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Zap size={16} className="text-white" /></div>
            <span className="font-bold text-white">{t.brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            {[t.features, t.howItWorks, t.pricing, t.blog].map(item => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onLangToggle} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:border-blue-500/40">
              <Languages size={12} /> {t.lang}
            </button>
            <button onClick={onLogin}  className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors">{t.login}</button>
            <button onClick={onSignup} className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium">{t.signup}</button>
            <button onClick={() => setMobileMenu(o => !o)} className="md:hidden p-2 text-slate-400">
              {mobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-1">
            {[t.features, t.howItWorks, t.pricing, t.blog].map(item => (
              <button key={item} className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg">{item}</button>
            ))}
            <button onClick={onLangToggle} className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg flex items-center gap-2">
              <Languages size={14} /> {t.lang}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Zap size={12} /> {t.tagline}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            {t.heroTitle}<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">{t.heroHighlight}</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">{t.heroSub}</p>
          <p className="text-xs text-slate-500 mb-4">{t.trustedBy}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button onClick={onSignup} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all shadow-2xl shadow-blue-600/30 flex items-center gap-2">
              {t.startFree} <ChevronRight size={16} />
            </button>
            <button onClick={onLogin} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-semibold text-sm transition-all">
              {t.watchDemo}
            </button>
          </div>
          <div className="flex items-center justify-center gap-10">
            {[[t.hero_stat1, t.hero_stat1_label],[t.hero_stat2, t.hero_stat2_label],[t.hero_stat3, t.hero_stat3_label]].map(([v, l], i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white">{v}</div>
                <div className="text-xs text-slate-400 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-black/60">
            <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
              <div className="flex gap-1.5">
                {["#ef4444","#f59e0b","#10b981"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{background: c}} />)}
              </div>
              <div className="flex-1 bg-slate-800 rounded-md h-5 mx-4 flex items-center px-3">
                <span className="text-xs text-slate-500">app.rankmind.io/dashboard</span>
              </div>
            </div>
            <div className="bg-slate-950 p-5">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[["21.2K", t.clicks, "+12%", "#3b82f6"],["238K", t.impressions, "+8%", "#8b5cf6"],["8.9%", t.ctr, "+2%", "#10b981"],["5.2", t.position, "−0.8", "#f59e0b"]].map(([v,l,c,col], i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-700/50" style={{ backgroundColor: `${col}10` }}>
                    <div className="text-xs text-slate-400">{l}</div>
                    <div className="text-lg font-bold text-white mt-1">{v}</div>
                    <div className="text-xs mt-1" style={{ color: c.startsWith("+") ? "#10b981" : "#f59e0b" }}>{c}</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-400 mb-3">{t.traffic} — Last 90 Days</div>
                <ResponsiveContainer width="100%" height={110}>
                  <AreaChart data={previewTraffic}>
                    <defs>
                      {/* ✅ Bug #6: unique gradient ID, no collision with dashboard */}
                      <linearGradient id="lp-previewGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="clicks" stroke="#3b82f6" fill="url(#lp-previewGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.features}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${fColorMap[f.color]}`}>
                  <f.icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{t[f.titleKey]}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t[f.descKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">{t.howItWorks}</h2>
          </div>
          <div className="space-y-4">
            {howItWorks.map((s, i) => (
              <div key={i} className="flex gap-5 items-start p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <s.icon size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-blue-400 font-bold mb-1">{t.step} {s.step}</div>
                  <h3 className="text-sm font-semibold text-white mb-1">{t[s.titleKey]}</h3>
                  <p className="text-xs text-slate-400">{t[s.descKey]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-4 py-20 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">{t.pricing}</h2>
            <div className="inline-flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
              {["monthly", "annual"].map(p => (
                <button key={p} onClick={() => setActivePricing(p)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${activePricing === p ? "bg-blue-600 text-white" : "text-slate-400"}`}>
                  {p === "monthly" ? t.monthly : t.annual}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className={`relative p-6 rounded-2xl border transition-all ${plan.highlighted ? "border-blue-500/50 bg-blue-600/10 shadow-2xl shadow-blue-600/20" : "border-slate-700/50 bg-slate-900/50"}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold text-white whitespace-nowrap">
                    {t.mostPopular}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-white">{t[plan.nameKey]}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-white">${activePricing === "annual" ? Math.round(plan.price * 0.8) : plan.price}</span>
                    <span className="text-slate-400 text-sm">{t.perMonth}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features[lang]?.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle size={13} className={plan.highlighted ? "text-blue-400" : "text-emerald-400"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onSignup} className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${plan.highlighted ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white"}`}>
                  {t.startFree}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-4 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Zap size={14} className="text-white" /></div>
              <span className="font-bold text-white text-sm">{t.brand}</span>
            </div>
            <p className="text-xs text-slate-500">{t.copyright}</p>
            <div className="flex gap-4 text-xs text-slate-500">
              {[t.privacy, t.terms, t.apiDocs, t.blog].map(l => (
                <button key={l} className="hover:text-white transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("landing");
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const toggleLang = useCallback(() => setLang(l => l === "en" ? "ar" : "en"), []);

  return (
    // ✅ Bug #1 Fixed: only used imports imported above
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        @keyframes bounce-in {
          0% { transform: translateY(20px); opacity: 0; }
          60% { transform: translateY(-4px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.35s ease forwards; }
      `}</style>

      {page === "landing" && (
        <LandingPage t={t} lang={lang} onLangToggle={toggleLang}
          onLogin={() => setPage("login")} onSignup={() => setPage("signup")} />
      )}
      {(page === "login" || page === "signup") && (
        <AuthPage t={t} lang={lang} onLangToggle={toggleLang}
          isLogin={page === "login"}
          onAuth={() => setPage("dashboard")}
          onToggle={() => setPage(p => p === "login" ? "signup" : "login")} />
      )}
      {page === "dashboard" && (
        <Dashboard t={t} lang={lang} onLangToggle={toggleLang}
          onLogout={() => setPage("landing")} />
      )}
    </div>
  );
}
