"use client";

import { useState, useCallback } from "react";
import {
  Code2,
  Smartphone,
  TrendingUp,
  Share2,
  FileText,
  Target,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Clock,
  Zap,
  Rocket,
  Users,
  Paintbrush,
  Wrench,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

//  Types

type Tag = { label: string; color: string };

type Scope = {
  id: string;
  label: string;
  desc: string;
  min: number;
  max: number;
  weeks: string;
  includes: string[];
  tag?: Tag;
  oneOff?: boolean;
};

type Addon = {
  id: string;
  label: string;
  desc: string;
  min: number;
  max: number;
  category: string;
};

type ServiceConfig = {
  id: string;
  label: string;
  icon: React.ElementType;
  accent: string;
  glow: string;
  border: string;
  scopes: Scope[];
  addons: Addon[];
  isMonthly: boolean;
  supportsPages: boolean;
  supportsDesign: boolean;
};

//  Pricing config

const SERVICES: ServiceConfig[] = [
  {
    id: "web",
    label: "Web Development",
    icon: Code2,
    accent: "text-primary-light",
    glow: "bg-primary/10",
    border: "border-primary/30",
    isMonthly: false,
    supportsPages: true,
    supportsDesign: true,
    scopes: [
      {
        id: "landing",
        label: "Landing Page",
        desc: "Single-page, conversion-focused",
        min: 800,
        max: 1500,
        weeks: "1-2 weeks",
        tag: {
          label: "Best for startups",
          color: "text-secondary-light bg-secondary/10",
        },
        includes: [
          "Responsive design",
          "SEO meta tags",
          "Contact form",
          "Performance optimised",
          "1 revision round",
        ],
      },
      {
        id: "business",
        label: "Business Website",
        desc: "Multi-page site with CMS",
        min: 2000,
        max: 4000,
        weeks: "3-5 weeks",
        tag: {
          label: "Most popular",
          color: "text-primary-light bg-primary/10",
        },
        includes: [
          "Up to 8 pages",
          "CMS integration",
          "Blog setup",
          "On-page SEO",
          "Analytics",
          "2 revision rounds",
        ],
      },
      {
        id: "webapp",
        label: "Web Application",
        desc: "Custom app with user accounts & logic",
        min: 5000,
        max: 12000,
        weeks: "6-10 weeks",
        includes: [
          "User auth & roles",
          "Database design",
          "REST API",
          "Admin dashboard",
          "Staging environment",
          "3 revision rounds",
        ],
      },
      {
        id: "saas",
        label: "SaaS Platform",
        desc: "Full product with billing & dashboard",
        min: 12000,
        max: 30000,
        weeks: "10-20 weeks",
        tag: { label: "Enterprise", color: "text-amber-400 bg-amber-500/10" },
        includes: [
          "Multi-tenant architecture",
          "Stripe billing",
          "Team management",
          "CI/CD pipeline",
          "Monitoring & alerts",
          "Dedicated PM",
        ],
      },
    ],
    addons: [
      {
        id: "cms",
        label: "CMS / Admin Panel",
        desc: "Custom content management system",
        min: 1000,
        max: 2000,
        category: "Features",
      },
      {
        id: "auth",
        label: "Authentication & Roles",
        desc: "Email, OAuth, role-based access",
        min: 500,
        max: 1000,
        category: "Features",
      },
      {
        id: "ecom",
        label: "E-commerce / Payments",
        desc: "Cart, checkout, Stripe integration",
        min: 1500,
        max: 3000,
        category: "Features",
      },
      {
        id: "api",
        label: "Third-party API Integration",
        desc: "Connect external services & data",
        min: 750,
        max: 1500,
        category: "Features",
      },
      {
        id: "analytics",
        label: "Analytics Dashboard",
        desc: "Custom charts & reporting views",
        min: 1000,
        max: 2000,
        category: "Features",
      },
      {
        id: "i18n",
        label: "Multi-language (i18n)",
        desc: "Translate content into multiple locales",
        min: 600,
        max: 1200,
        category: "Features",
      },
      {
        id: "seo",
        label: "Advanced SEO Setup",
        desc: "Schema, sitemap, speed audit",
        min: 500,
        max: 1000,
        category: "Marketing",
      },
      {
        id: "pwa",
        label: "PWA / Offline Support",
        desc: "Service worker, installable app",
        min: 800,
        max: 1500,
        category: "Technical",
      },
      {
        id: "maintenance",
        label: "12-month Maintenance",
        desc: "Bug fixes, updates, hosting support",
        min: 150,
        max: 400,
        category: "Retainer",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: Smartphone,
    accent: "text-secondary-light",
    glow: "bg-secondary/10",
    border: "border-secondary/30",
    isMonthly: false,
    supportsPages: true,
    supportsDesign: true,
    scopes: [
      {
        id: "mvp",
        label: "MVP / Prototype",
        desc: "Core features only, fast to market",
        min: 4000,
        max: 8000,
        weeks: "4-6 weeks",
        tag: {
          label: "Best value",
          color: "text-secondary-light bg-secondary/10",
        },
        includes: [
          "Core feature set",
          "Basic UI kit",
          "1 platform (iOS or Android)",
          "Internal TestFlight/beta",
          "Bug fixes for 30 days",
        ],
      },
      {
        id: "ios",
        label: "iOS or Android",
        desc: "Full native app, one platform",
        min: 8000,
        max: 20000,
        weeks: "8-12 weeks",
        tag: {
          label: "Most popular",
          color: "text-primary-light bg-primary/10",
        },
        includes: [
          "Full feature build",
          "Custom UI design",
          "App Store submission",
          "Push notifications",
          "2 revision rounds",
          "30-day support",
        ],
      },
      {
        id: "cross",
        label: "Cross-Platform",
        desc: "iOS + Android from one codebase",
        min: 12000,
        max: 30000,
        weeks: "10-16 weeks",
        includes: [
          "React Native / Flutter",
          "iOS + Android build",
          "Both store submissions",
          "Deep linking",
          "Crash analytics",
          "60-day support",
        ],
      },
    ],
    addons: [
      {
        id: "push",
        label: "Push Notifications",
        desc: "Rich push with scheduling & targeting",
        min: 500,
        max: 1000,
        category: "Features",
      },
      {
        id: "iap",
        label: "In-App Purchases",
        desc: "Subscriptions or one-time purchases",
        min: 1000,
        max: 2000,
        category: "Features",
      },
      {
        id: "offline",
        label: "Offline Mode",
        desc: "Local data sync & offline access",
        min: 750,
        max: 1500,
        category: "Technical",
      },
      {
        id: "backend",
        label: "API / Backend Build",
        desc: "Node.js or Supabase backend",
        min: 2000,
        max: 4000,
        category: "Technical",
      },
      {
        id: "auth",
        label: "Auth (Social login)",
        desc: "Google, Apple, Facebook sign-in",
        min: 500,
        max: 1000,
        category: "Features",
      },
      {
        id: "analytics",
        label: "In-App Analytics",
        desc: "Event tracking, funnels, retention",
        min: 600,
        max: 1200,
        category: "Features",
      },
      {
        id: "chat",
        label: "Real-time Chat",
        desc: "WebSocket or Firebase messaging",
        min: 1200,
        max: 2500,
        category: "Features",
      },
      {
        id: "maintenance",
        label: "12-month Maintenance",
        desc: "Updates, OS compatibility, bug fixes",
        min: 200,
        max: 500,
        category: "Retainer",
      },
    ],
  },
  {
    id: "seo",
    label: "SEO & Analytics",
    icon: TrendingUp,
    accent: "text-green-400",
    glow: "bg-green-500/10",
    border: "border-green-500/30",
    isMonthly: true,
    supportsPages: false,
    supportsDesign: false,
    scopes: [
      {
        id: "audit",
        label: "Site Audit",
        desc: "One-off technical audit + action plan",
        min: 300,
        max: 600,
        weeks: "1 week",
        oneOff: true,
        tag: { label: "One-off", color: "text-ink bg-edge" },
        includes: [
          "Full technical audit",
          "Core Web Vitals report",
          "Keyword gap analysis",
          "Priority action plan",
          "Video walkthrough",
        ],
      },
      {
        id: "local",
        label: "Local SEO",
        desc: "Dominate local & map-pack results",
        min: 500,
        max: 1200,
        weeks: "Ongoing",
        tag: {
          label: "Most popular",
          color: "text-primary-light bg-primary/10",
        },
        includes: [
          "Google Business optimisation",
          "Local citations",
          "Review strategy",
          "Monthly keyword tracking",
          "Quarterly report",
        ],
      },
      {
        id: "national",
        label: "National SEO",
        desc: "Compete for high-volume national keywords",
        min: 1000,
        max: 3000,
        weeks: "Ongoing",
        includes: [
          "Technical SEO",
          "On-page optimisation",
          "Link building",
          "Content strategy brief",
          "Monthly reporting",
        ],
      },
      {
        id: "ecom",
        label: "E-commerce SEO",
        desc: "Product & category page optimisation",
        min: 1500,
        max: 4000,
        weeks: "Ongoing",
        tag: { label: "Best ROI", color: "text-green-400 bg-green-500/10" },
        includes: [
          "Product schema markup",
          "Category architecture",
          "Internal linking strategy",
          "Conversion rate tips",
          "Weekly ranking updates",
        ],
      },
    ],
    addons: [
      {
        id: "links",
        label: "Link Building",
        desc: "High-DA backlink outreach",
        min: 300,
        max: 800,
        category: "Off-page",
      },
      {
        id: "content",
        label: "Content Creation",
        desc: "2-4 SEO blog posts per month",
        min: 400,
        max: 1000,
        category: "Content",
      },
      {
        id: "setup",
        label: "GA4 / Analytics Setup",
        desc: "Full analytics & conversion setup",
        min: 300,
        max: 600,
        category: "Technical",
      },
      {
        id: "competitor",
        label: "Competitor Analysis",
        desc: "Monthly competitor gap report",
        min: 200,
        max: 500,
        category: "Strategy",
      },
      {
        id: "cro",
        label: "CRO Audit",
        desc: "Landing page conversion audit",
        min: 400,
        max: 800,
        category: "Strategy",
      },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    accent: "text-pink-400",
    glow: "bg-pink-500/10",
    border: "border-pink-500/30",
    isMonthly: true,
    supportsPages: false,
    supportsDesign: false,
    scopes: [
      {
        id: "starter",
        label: "Starter",
        desc: "2 platforms, 12 posts/month",
        min: 500,
        max: 1000,
        weeks: "Ongoing",
        includes: [
          "Content calendar",
          "Copywriting",
          "Basic graphic design",
          "Scheduling & posting",
          "Monthly report",
        ],
      },
      {
        id: "growth",
        label: "Growth",
        desc: "4 platforms, 24 posts/month",
        min: 1000,
        max: 2500,
        weeks: "Ongoing",
        tag: {
          label: "Most popular",
          color: "text-primary-light bg-primary/10",
        },
        includes: [
          "4-platform management",
          "Custom branded graphics",
          "Story / Reel content",
          "Community management",
          "Bi-weekly strategy call",
        ],
      },
      {
        id: "enterprise",
        label: "Enterprise",
        desc: "6+ platforms, daily content",
        min: 2500,
        max: 5000,
        weeks: "Ongoing",
        tag: { label: "Full-service", color: "text-pink-400 bg-pink-500/10" },
        includes: [
          "6+ platforms",
          "Video production",
          "Influencer coordination",
          "Paid social management",
          "Weekly performance review",
        ],
      },
    ],
    addons: [
      {
        id: "ads",
        label: "Paid Ads Management",
        desc: "Meta / TikTok ad campaigns",
        min: 500,
        max: 1500,
        category: "Advertising",
      },
      {
        id: "video",
        label: "Video / Reels Content",
        desc: "Short-form video editing & captions",
        min: 500,
        max: 1200,
        category: "Content",
      },
      {
        id: "influencer",
        label: "Influencer Outreach",
        desc: "Identify, brief & manage creators",
        min: 300,
        max: 800,
        category: "Growth",
      },
      {
        id: "reporting",
        label: "Advanced Reporting",
        desc: "Custom monthly analytics deep-dive",
        min: 200,
        max: 500,
        category: "Reporting",
      },
      {
        id: "ugc",
        label: "UGC Strategy",
        desc: "User-generated content programme",
        min: 300,
        max: 700,
        category: "Growth",
      },
    ],
  },
  {
    id: "content",
    label: "Content Strategy",
    icon: FileText,
    accent: "text-amber-400",
    glow: "bg-amber-500/10",
    border: "border-amber-500/30",
    isMonthly: true,
    supportsPages: false,
    supportsDesign: false,
    scopes: [
      {
        id: "starter",
        label: "Starter",
        desc: "4 content pieces per month",
        min: 400,
        max: 800,
        weeks: "Ongoing",
        includes: [
          "Keyword research",
          "4 blog posts",
          "Meta descriptions",
          "Internal linking",
          "Monthly plan",
        ],
      },
      {
        id: "growth",
        label: "Growth",
        desc: "8 content pieces per month",
        min: 800,
        max: 1800,
        weeks: "Ongoing",
        tag: {
          label: "Most popular",
          color: "text-primary-light bg-primary/10",
        },
        includes: [
          "8 pieces / month",
          "Long-form articles (1500+ words)",
          "Social snippets",
          "Content calendar",
          "Bi-weekly strategy",
        ],
      },
      {
        id: "full",
        label: "Full-Stack Content",
        desc: "16+ pieces per month",
        min: 1800,
        max: 4000,
        weeks: "Ongoing",
        includes: [
          "16+ pieces",
          "Video scripts",
          "Case studies",
          "White papers",
          "Email newsletter",
          "Dedicated content strategist",
        ],
      },
    ],
    addons: [
      {
        id: "email",
        label: "Email Sequences",
        desc: "Automated drip email campaigns",
        min: 300,
        max: 700,
        category: "Email",
      },
      {
        id: "landing",
        label: "Landing Page Copy",
        desc: "High-converting sales page copy",
        min: 400,
        max: 900,
        category: "Copy",
      },
      {
        id: "brand",
        label: "Brand Messaging",
        desc: "Voice, tone, taglines & messaging",
        min: 600,
        max: 1200,
        category: "Strategy",
      },
      {
        id: "video",
        label: "Video Scripts",
        desc: "YouTube / ad / explainer scripts",
        min: 300,
        max: 700,
        category: "Video",
      },
      {
        id: "ebooks",
        label: "eBook / Lead Magnet",
        desc: "Long-form downloadable asset",
        min: 500,
        max: 1200,
        category: "Lead Gen",
      },
    ],
  },
  {
    id: "ads",
    label: "Paid Advertising",
    icon: Target,
    accent: "text-orange-400",
    glow: "bg-orange-500/10",
    border: "border-orange-500/30",
    isMonthly: true,
    supportsPages: false,
    supportsDesign: false,
    scopes: [
      {
        id: "starter",
        label: "Starter",
        desc: "1 platform - Google or Meta",
        min: 400,
        max: 800,
        weeks: "Ongoing",
        includes: [
          "Account audit & setup",
          "Campaign creation",
          "Keyword / audience research",
          "Weekly bid optimisation",
          "Monthly report",
        ],
      },
      {
        id: "growth",
        label: "Growth",
        desc: "2 platforms with A/B testing",
        min: 800,
        max: 1800,
        weeks: "Ongoing",
        tag: {
          label: "Most popular",
          color: "text-primary-light bg-primary/10",
        },
        includes: [
          "2 platforms",
          "A/B ad testing",
          "Retargeting setup",
          "Conversion tracking",
          "Bi-weekly optimisation",
        ],
      },
      {
        id: "full",
        label: "Full Funnel",
        desc: "3+ platforms - Awareness to conversion",
        min: 1800,
        max: 4000,
        weeks: "Ongoing",
        tag: { label: "Best ROI", color: "text-orange-400 bg-orange-500/10" },
        includes: [
          "3+ platforms",
          "Full funnel strategy",
          "Dynamic ads",
          "CRM integration",
          "Weekly strategy call",
          "Dedicated account manager",
        ],
      },
    ],
    addons: [
      {
        id: "creative",
        label: "Ad Creative Design",
        desc: "Static & animated ad sets",
        min: 400,
        max: 800,
        category: "Creative",
      },
      {
        id: "ab",
        label: "A/B Testing Sprint",
        desc: "Structured multivariate test programme",
        min: 300,
        max: 600,
        category: "Strategy",
      },
      {
        id: "landing",
        label: "Landing Page Build",
        desc: "Dedicated high-converting landing page",
        min: 800,
        max: 1600,
        category: "CRO",
      },
      {
        id: "reporting",
        label: "Advanced Dashboard",
        desc: "Custom Looker Studio / Data Studio",
        min: 200,
        max: 500,
        category: "Reporting",
      },
      {
        id: "tiktok",
        label: "TikTok Ads",
        desc: "TikTok For Business campaign setup",
        min: 400,
        max: 900,
        category: "Platform",
      },
    ],
  },
];

const TIMELINES = [
  {
    id: "standard",
    label: "Standard",
    desc: "Normal pace delivery",
    multiplier: 1,
    Icon: Clock,
    fee: null,
  },
  {
    id: "fast",
    label: "Accelerated",
    desc: "Priority scheduling",
    multiplier: 1.25,
    Icon: Zap,
    fee: "+25% priority fee",
  },
  {
    id: "rush",
    label: "Rush",
    desc: "Drop-everything sprint",
    multiplier: 1.5,
    Icon: Rocket,
    fee: "+50% rush fee",
  },
];

const DESIGN_LEVELS = [
  {
    id: "basic",
    label: "Basic",
    desc: "Clean template-based design",
    multiplier: 1,
    Icon: Wrench,
  },
  {
    id: "custom",
    label: "Custom",
    desc: "Bespoke UI designed from scratch",
    multiplier: 1.3,
    Icon: Paintbrush,
  },
  {
    id: "premium",
    label: "Premium",
    desc: "High-end brand system + UI",
    multiplier: 1.6,
    Icon: Zap,
  },
];

const TEAM_SIZES = [
  { id: "solo", label: "Solo / Freelancer", desc: "Just me" },
  { id: "startup", label: "Startup / SME", desc: "5-50 people" },
  { id: "company", label: "Company", desc: "50+ people" },
];

//  Helpers

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}
function round50(n: number) {
  return Math.round(n / 50) * 50;
}
function groupBy<T extends { category: string }>(arr: T[]) {
  const map: Record<string, T[]> = {};
  for (const item of arr) {
    (map[item.category] ??= []).push(item);
  }
  return Object.entries(map);
}

//  Sub-components

const STEP_LABELS = [
  "Service",
  "Scope",
  "Design & Size",
  "Add-ons",
  "Timeline",
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-1.5 sm:gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                i < step
                  ? "bg-primary text-white"
                  : i === step
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-edge text-ink-fade"
              }`}
            >
              {i < step ? "checkmark" : i + 1}
            </div>
            <span
              className={`hidden text-[10px] font-medium sm:block transition-colors ${i === step ? "text-ink" : "text-ink-fade"}`}
            >
              {STEP_LABELS[i]}
            </span>
          </div>
          {i < total - 1 && (
            <div
              className={`mb-4 h-px w-4 sm:w-8 transition-all duration-300 ${i < step ? "bg-primary" : "bg-edge"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function PriceBadge({
  min,
  max,
  suffix,
  accent,
}: {
  min: number;
  max: number;
  suffix: string;
  accent: string;
}) {
  if (!min && !max) return null;
  return (
    <div className="mb-5 flex items-center justify-between rounded-xl border border-edge bg-overlay px-4 py-2.5">
      <span className="text-xs font-medium text-ink-dim flex items-center gap-1.5">
        <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
        Running estimate
      </span>
      <span className={`font-display text-base font-bold ${accent}`}>
        {fmt(min)} {fmt(max)}
        {suffix}
      </span>
    </div>
  );
}

//  Main

export default function CostCalculator() {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [scopeId, setScopeId] = useState<string | null>(null);
  const [designId, setDesignId] = useState("custom");
  const [pages, setPages] = useState(5);
  const [teamId, setTeamId] = useState("startup");
  const [addonIds, setAddonIds] = useState<Set<string>>(new Set());
  const [timelineId, setTimelineId] = useState("standard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [showIncludes, setShowIncludes] = useState(false);

  const service = SERVICES.find((s) => s.id === serviceId);
  const scope = service?.scopes.find((s) => s.id === scopeId);
  const addons = service?.addons.filter((a) => addonIds.has(a.id)) ?? [];
  const timeline = TIMELINES.find((t) => t.id === timelineId)!;
  const design = DESIGN_LEVELS.find((d) => d.id === designId)!;

  let rawMin = scope?.min ?? 0;
  let rawMax = scope?.max ?? 0;
  if (service?.supportsPages && pages > 5) {
    const extra = Math.floor((pages - 5) / 5);
    rawMin += extra * (service.id === "mobile" ? 600 : 300);
    rawMax += extra * (service.id === "mobile" ? 1200 : 600);
  }
  if (service?.supportsDesign && !service.isMonthly) {
    rawMin *= design.multiplier;
    rawMax *= design.multiplier;
  }
  for (const a of addons) {
    rawMin += a.min;
    rawMax += a.max;
  }
  if (!service?.isMonthly) {
    rawMin *= timeline.multiplier;
    rawMax *= timeline.multiplier;
  }
  if (teamId === "company") {
    rawMin *= 1.15;
    rawMax *= 1.15;
  }

  const priceMin = round50(rawMin);
  const priceMax = round50(rawMax);
  const suffix = service?.isMonthly && !scope?.oneOff ? "/mo" : "";
  const deposit = round50(priceMin * 0.5);
  const onDelivery = round50(priceMin - deposit);
  const totalSteps = service?.isMonthly ? 4 : 5;
  const RESULT = 99;

  const selectService = useCallback((id: string) => {
    setServiceId(id);
    setScopeId(null);
    setAddonIds(new Set());
    setTimelineId("standard");
    setDesignId("custom");
    setPages(5);
  }, []);

  const toggleAddon = useCallback((id: string) => {
    setAddonIds((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const toggleGroup = (g: string) => {
    setOpenGroups((prev) => {
      const n = new Set(prev);
      n.has(g) ? n.delete(g) : n.add(g);
      return n;
    });
  };

  function reset() {
    setStep(0);
    setServiceId(null);
    setScopeId(null);
    setAddonIds(new Set());
    setTimelineId("standard");
    setDesignId("custom");
    setPages(5);
    setTeamId("startup");
    setOpenGroups(new Set());
    setShowIncludes(false);
  }

  function goToContact() {
    if (!service || !scope) return;
    window.location.href = "#contact";
  }

  const navBtn =
    "cursor-pointer flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-ink-dim transition-all hover:text-ink";
  const primaryBtn =
    "flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light glow-violet disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section
      id="calculator"
      aria-labelledby="calc-heading"
      className="relative overflow-hidden bg-canvas py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
            Pricing Estimator
          </span>
          <h2
            id="calc-heading"
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            Get an Instant <span className="gradient-text">Cost Estimate</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Configure your project step by step and get a detailed breakdown
            with included features, timeline, and payment structure.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {step !== RESULT && <ProgressBar step={step} total={totalSteps} />}
          {step > 0 && step !== RESULT && scope && (
            <PriceBadge
              min={priceMin}
              max={priceMax}
              suffix={suffix}
              accent={service?.accent ?? "text-primary-light"}
            />
          )}

          <div className="rounded-2xl border border-edge bg-surface p-6 md:p-8">
            {/* STEP 0 - Service */}
            {step === 0 && (
              <div>
                <h3 className="mb-2 font-display text-xl font-semibold text-ink">
                  What service do you need?
                </h3>
                <p className="mb-6 text-sm text-ink-dim">
                  Choose the primary service you can refine and add extras in
                  the next steps.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICES.map((s) => {
                    const Icon = s.icon;
                    const sel = serviceId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => selectService(s.id)}
                        className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${sel ? `${s.border} ${s.glow}` : "border-edge bg-overlay hover:border-primary-light/30"}`}
                      >
                        <div
                          className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg ${s.glow}`}
                        >
                          <Icon
                            className={`h-5 w-5 ${s.accent}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-sm font-semibold text-ink">
                          {s.label}
                        </div>
                        <div className="mt-0.5 text-xs text-ink-fade">
                          {s.isMonthly ? "Monthly retainer" : "One-off project"}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep(1)}
                    disabled={!serviceId}
                    className={primaryBtn}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1 - Scope */}
            {step === 1 && service && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-fade">
                  {service.label}
                </p>
                <h3 className="mb-2 font-display text-xl font-semibold text-ink">
                  What is the project scope?
                </h3>
                <p className="mb-6 text-sm text-ink-dim">
                  Pick the tier that best describes your vision.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.scopes.map((sc) => {
                    const sel = scopeId === sc.id;
                    return (
                      <div
                        key={sc.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setScopeId(sc.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setScopeId(sc.id);
                          }
                        }}
                        className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${sel ? `${service.border} ${service.glow}` : "border-edge bg-overlay hover:border-primary-light/30"}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-ink">
                                {sc.label}
                              </span>
                              {sc.tag && (
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${sc.tag.color}`}
                                >
                                  {sc.tag.label}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 text-xs text-ink-dim">
                              {sc.desc}
                            </div>
                            <div className="mt-2 text-xs text-ink-fade">
                              Timeline: {sc.weeks}
                            </div>
                          </div>
                          <div
                            className={`shrink-0 text-sm font-bold ${service.accent}`}
                          >
                            {fmt(sc.min)}+
                          </div>
                        </div>
                        {sel && (
                          <div className="mt-3 border-t border-edge pt-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowIncludes((v) => !v);
                              }}
                              className="flex items-center gap-1 text-xs font-medium text-ink-dim hover:text-ink"
                            >
                              {showIncludes ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                              {showIncludes ? "Hide" : "Show"} what is included
                            </button>
                            {showIncludes && (
                              <ul className="mt-2 space-y-1">
                                {sc.includes.map((inc) => (
                                  <li
                                    key={inc}
                                    className="flex items-center gap-1.5 text-xs text-ink-dim"
                                  >
                                    <CheckCircle2
                                      className="h-3 w-3 shrink-0 text-secondary"
                                      aria-hidden="true"
                                    />
                                    {inc}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(0)} className={navBtn}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!scopeId}
                    className={primaryBtn}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 - Design & Size */}
            {step === 2 && service && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-fade">
                  {service.label}
                </p>
                <h3 className="mb-6 font-display text-xl font-semibold text-ink">
                  Design & project size
                </h3>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-ink">
                    Who is this for?{" "}
                    <span className="ml-1 text-xs text-ink-fade">
                      (affects complexity)
                    </span>
                  </label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {TEAM_SIZES.map(({ id, label, desc }) => (
                      <button
                        key={id}
                        onClick={() => setTeamId(id)}
                        className={`cursor-pointer rounded-xl border p-3 text-left transition-all duration-200 ${teamId === id ? `${service.border} ${service.glow}` : "border-edge bg-overlay hover:border-primary-light/30"}`}
                      >
                        <Users
                          className={`mb-1.5 h-4 w-4 ${teamId === id ? service.accent : "text-ink-fade"}`}
                          aria-hidden="true"
                        />
                        <div className="text-sm font-semibold text-ink">
                          {label}
                        </div>
                        <div className="mt-0.5 text-xs text-ink-dim">
                          {desc}
                        </div>
                        {id === "company" && (
                          <div className="mt-1 text-[10px] font-semibold text-amber-400">
                            +15% complexity
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {service.supportsDesign && !service.isMonthly && (
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Design complexity
                    </label>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {DESIGN_LEVELS.map(
                        ({ id, label, desc, multiplier, Icon: DIcon }) => (
                          <button
                            key={id}
                            onClick={() => setDesignId(id)}
                            className={`cursor-pointer rounded-xl border p-3 text-left transition-all duration-200 ${designId === id ? `${service.border} ${service.glow}` : "border-edge bg-overlay hover:border-primary-light/30"}`}
                          >
                            <DIcon
                              className={`mb-1.5 h-4 w-4 ${designId === id ? service.accent : "text-ink-fade"}`}
                              aria-hidden="true"
                            />
                            <div className="text-sm font-semibold text-ink">
                              {label}
                            </div>
                            <div className="mt-0.5 text-xs text-ink-dim">
                              {desc}
                            </div>
                            {multiplier > 1 && (
                              <div className="mt-1 text-[10px] font-semibold text-ink-fade">
                                x{multiplier} base price
                              </div>
                            )}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {service.supportsPages && (
                  <div className="mb-2">
                    <label className="mb-2 flex items-center justify-between text-sm font-medium text-ink">
                      <span>
                        {service.id === "mobile"
                          ? "Number of screens"
                          : "Number of pages"}
                      </span>
                      <span className={`font-bold ${service.accent}`}>
                        {pages}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={pages}
                      onChange={(e) => setPages(Number(e.target.value))}
                      className="w-full cursor-pointer accent-violet-600"
                    />
                    <div className="mt-1 flex justify-between text-xs text-ink-fade">
                      <span>1</span>
                      <span className="flex items-center gap-1">
                        <Info className="h-3 w-3" aria-hidden="true" /> Extra
                        pages add to base price
                      </span>
                      <span>30</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(1)} className={navBtn}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button onClick={() => setStep(3)} className={primaryBtn}>
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 - Add-ons */}
            {step === 3 && service && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-fade">
                  {service.label}
                </p>
                <h3 className="mb-1 font-display text-xl font-semibold text-ink">
                  Add-ons & extras
                </h3>
                <p className="mb-5 text-sm text-ink-dim">
                  Select everything you need or skip and continue.
                </p>
                <div className="space-y-3">
                  {groupBy(service.addons).map(([group, items]) => {
                    const open = openGroups.has(group);
                    const activeCount = items.filter((a) =>
                      addonIds.has(a.id),
                    ).length;
                    return (
                      <div
                        key={group}
                        className="overflow-hidden rounded-xl border border-edge bg-overlay"
                      >
                        <button
                          onClick={() => toggleGroup(group)}
                          className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-ink">
                              {group}
                            </span>
                            {activeCount > 0 && (
                              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                                {activeCount} selected
                              </span>
                            )}
                          </div>
                          {open ? (
                            <ChevronUp className="h-4 w-4 text-ink-fade" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-ink-fade" />
                          )}
                        </button>
                        {open && (
                          <div className="divide-y divide-edge border-t border-edge">
                            {items.map((a) => {
                              const sel = addonIds.has(a.id);
                              return (
                                <button
                                  key={a.id}
                                  onClick={() => toggleAddon(a.id)}
                                  className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-all duration-150 ${sel ? service.glow : "hover:bg-canvas/40"}`}
                                >
                                  <div>
                                    <div className="text-sm font-medium text-ink">
                                      {a.label}
                                    </div>
                                    <div className="text-xs text-ink-dim">
                                      {a.desc}
                                    </div>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-3">
                                    <span
                                      className={`text-xs font-semibold ${sel ? service.accent : "text-ink-fade"}`}
                                    >
                                      +{fmt(a.min)}
                                    </span>
                                    <div
                                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${sel ? "border-primary bg-primary" : "border-edge"}`}
                                    >
                                      {sel && (
                                        <span className="text-[10px] font-bold text-white">
                                          v
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(2)} className={navBtn}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() =>
                      service.isMonthly ? setStep(RESULT) : setStep(4)
                    }
                    className={primaryBtn}
                  >
                    {service.isMonthly ? "See Estimate" : "Next"}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 - Timeline */}
            {step === 4 && service && !service.isMonthly && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-fade">
                  {service.label}
                </p>
                <h3 className="mb-2 font-display text-xl font-semibold text-ink">
                  What is your timeline?
                </h3>
                <p className="mb-6 text-sm text-ink-dim">
                  Rush delivery requires rescheduling team resources and carries
                  a priority surcharge.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {TIMELINES.map(
                    ({ id, label, desc, multiplier, Icon, fee }) => {
                      const sel = timelineId === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setTimelineId(id)}
                          className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${sel ? "border-primary/40 bg-primary/10" : "border-edge bg-overlay hover:border-primary-light/30"}`}
                        >
                          <Icon
                            className={`mb-2 h-5 w-5 ${sel ? "text-primary-light" : "text-ink-fade"}`}
                            aria-hidden="true"
                          />
                          <div className="text-sm font-semibold text-ink">
                            {label}
                          </div>
                          <div className="mt-0.5 text-xs text-ink-dim">
                            {desc}
                          </div>
                          {fee ? (
                            <div className="mt-2 text-xs font-semibold text-amber-400">
                              {fee}
                            </div>
                          ) : (
                            <div className="mt-2 text-xs font-semibold text-secondary-light">
                              No surcharge
                            </div>
                          )}
                          {sel && multiplier > 1 && (
                            <div className="mt-2 text-xs text-ink-fade">
                              Estimated total:{" "}
                              <span className={`font-bold ${service.accent}`}>
                                {fmt(priceMin)}-{fmt(priceMax)}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    },
                  )}
                </div>
                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(3)} className={navBtn}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(RESULT)}
                    className={primaryBtn}
                  >
                    See Estimate <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* RESULT */}
            {step === RESULT && service && scope && (
              <div>
                <div className="mb-6 text-center">
                  <div className="mb-3 flex justify-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.glow}`}
                    >
                      <Calculator
                        className={`h-7 w-7 ${service.accent}`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-fade">
                    Your Estimate
                  </p>
                  <div className="mt-2 font-display text-4xl font-bold md:text-5xl">
                    <span className="gradient-text">
                      {fmt(priceMin)} - {fmt(priceMax)}
                    </span>
                    {suffix && (
                      <span className="ml-1.5 text-xl font-normal text-ink-dim">
                        {suffix}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-ink-dim">
                    <strong className="text-ink">{service.label}</strong>
                    {" . "}
                    <strong className="text-ink">{scope.label}</strong>
                    {service.supportsDesign && !service.isMonthly && (
                      <> . {design.label} design</>
                    )}
                    {addons.length > 0 && (
                      <> . {addons.map((a) => a.label).join(", ")}</>
                    )}
                    {!service.isMonthly && timeline.multiplier > 1 && (
                      <> . {timeline.label} timeline</>
                    )}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-edge bg-overlay p-4">
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-fade">
                      Cost Breakdown
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-ink-dim">
                        <span>{scope.label}</span>
                        <span className="font-medium text-ink">
                          {fmt(scope.min)}-{fmt(scope.max)}
                        </span>
                      </div>
                      {service.supportsPages && pages > 5 && (
                        <div className="flex justify-between text-ink-dim">
                          <span>
                            +{pages - 5} extra{" "}
                            {service.id === "mobile" ? "screens" : "pages"}
                          </span>
                          <span className="font-medium text-ink">
                            {fmt(
                              Math.floor((pages - 5) / 5) *
                                (service.id === "mobile" ? 600 : 300),
                            )}
                            +
                          </span>
                        </div>
                      )}
                      {service.supportsDesign &&
                        !service.isMonthly &&
                        design.id !== "basic" && (
                          <div className="flex justify-between text-ink-dim">
                            <span>
                              {design.label} design (x{design.multiplier})
                            </span>
                            <span className="font-medium text-ink">
                              included
                            </span>
                          </div>
                        )}
                      {addons.map((a) => (
                        <div
                          key={a.id}
                          className="flex justify-between text-ink-dim"
                        >
                          <span>{a.label}</span>
                          <span className="font-medium text-ink">
                            +{fmt(a.min)}-{fmt(a.max)}
                          </span>
                        </div>
                      ))}
                      {teamId === "company" && (
                        <div className="flex justify-between text-amber-400/80">
                          <span>Company complexity (+15%)</span>
                          <span className="font-medium text-amber-400">
                            x1.15
                          </span>
                        </div>
                      )}
                      {!service.isMonthly && timeline.multiplier > 1 && (
                        <div className="flex justify-between text-amber-400/80">
                          <span>
                            {timeline.label} (+
                            {Math.round((timeline.multiplier - 1) * 100)}%)
                          </span>
                          <span className="font-medium text-amber-400">
                            x{timeline.multiplier}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-edge pt-2 font-semibold text-ink">
                        <span>Total</span>
                        <span className={service.accent}>
                          {fmt(priceMin)}-{fmt(priceMax)}
                          {suffix}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {!service.isMonthly && (
                      <div className="rounded-xl border border-edge bg-overlay p-4">
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-fade">
                          Estimated Delivery
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock
                            className="h-4 w-4 text-ink-fade"
                            aria-hidden="true"
                          />
                          <span className="text-ink">{scope.weeks}</span>
                          {timeline.multiplier > 1 && (
                            <span className="text-xs text-amber-400">
                              (priority)
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {!service.isMonthly && (
                      <div className="rounded-xl border border-edge bg-overlay p-4">
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-fade">
                          Suggested Payment Split
                        </h4>
                        <div className="space-y-1.5 text-sm text-ink-dim">
                          <div className="flex justify-between">
                            <span>Deposit (50% upfront)</span>
                            <span className="font-semibold text-ink">
                              {fmt(deposit)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>On delivery</span>
                            <span className="font-semibold text-ink">
                              {fmt(onDelivery)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="rounded-xl border border-edge bg-overlay p-4">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-fade">
                        Included in {scope.label}
                      </h4>
                      <ul className="space-y-1.5">
                        {scope.includes.map((inc) => (
                          <li
                            key={inc}
                            className="flex items-start gap-1.5 text-xs text-ink-dim"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-3 w-3 shrink-0 text-secondary"
                              aria-hidden="true"
                            />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-center text-xs text-ink-fade">
                  This is a ballpark estimate only. Final pricing is confirmed
                  after a free discovery call.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={goToContact}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light glow-violet"
                  >
                    Start My Project <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-edge px-6 py-3 text-sm font-medium text-ink-dim transition-all hover:border-primary-light/30 hover:text-ink"
                  >
                    Recalculate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
