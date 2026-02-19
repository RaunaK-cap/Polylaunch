"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Gauge,
  Globe,
  Languages,
  LoaderCircle,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  WandSparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SignOutButton from "./sign-out-button";

type DashboardClientProps = {
  userLabel: string;
};

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: Gauge },
  { key: "new-launch", label: "New Launch Kit", icon: WandSparkles },
  { key: "launches", label: "My Launches", icon: Sparkles },
  { key: "pipeline", label: "Localization Pipeline", icon: Workflow },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

const previewByLanguage: Record<string, { landing: string; email: string; social: string; press: string; rtl?: boolean }> = {
  EN: {
    landing: "Launch globally with AI-generated, culturally adapted messaging.",
    email: "Subject: Your global launch kit is ready.",
    social: "Launching in 5 markets with one pipeline.",
    press: "PolyLaunch introduces coordinated multi-language launch generation.",
  },
  HI: {
    landing: "Apne product ko global markets me local tone ke sath launch karein.",
    email: "Subject: Aapka multilingual launch kit taiyar hai.",
    social: "Ek workflow, multiple markets.",
    press: "PolyLaunch ne AI-enabled localization workflow launch kiya.",
  },
  JP: {
    landing: "Market context aware launch content in every region.",
    email: "Subject: Your localized launch assets are synced.",
    social: "From one brief to many markets.",
    press: "PolyLaunch streamlines AI launch localization for teams.",
  },
  DE: {
    landing: "Marktgerechte Inhalte fur einen globalen Produktstart.",
    email: "Subject: Ihr Launch-Kit ist bereit.",
    social: "Schneller lokalisieren, sauber synchronisieren.",
    press: "PolyLaunch vereinfacht mehrsprachige Produktstarts.",
  },
  AR: {
    landing: "Global launch content with full RTL compatibility.",
    email: "Subject: Your Arabic launch assets are prepared.",
    social: "One product story, many markets.",
    press: "PolyLaunch powers localization-ready global launches.",
    rtl: true,
  },
};

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const storedTheme = window.localStorage.getItem("polylaunch-theme");
    if (storedTheme) return storedTheme === "dark";
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("polylaunch-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return {
    isDark,
    toggleTheme: () => setIsDark((previous) => !previous),
  };
}

function DashboardParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, index) => ({
        id: index,
        top: `${(index * 17) % 100}%`,
        delay: (index % 20) * 0.4,
        duration: 18 + (index % 8) * 1.2,
        size: index % 3 === 0 ? 3 : 2,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute -left-8 rounded-full bg-primary/20"
          style={{
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `particleAcross ${particle.duration}s linear ${particle.delay * -1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardClient({ userLabel }: DashboardClientProps) {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [language, setLanguage] = useState("EN");
  const [tone, setTone] = useState("Professional");
  const [marketSearch, setMarketSearch] = useState("");
  const [toasts, setToasts] = useState<string[]>([]);

  const preview = previewByLanguage[language] ?? previewByLanguage.EN;
  const selectedMarkets = ["EN", "HI", "JP", "DE", "AR"].filter((item) =>
    item.toLowerCase().includes(marketSearch.toLowerCase())
  );

  const pushToast = (message: string) => {
    setToasts((current) => [...current, message]);
    window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 2400);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <DashboardParticles />

      <div className="flex min-h-screen">
        <aside
          className={`hidden border-r border-border/70 bg-background/85 backdrop-blur transition-all duration-300 md:flex md:flex-col ${
            sidebarCollapsed ? "md:w-20" : "md:w-72"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-primary/35 bg-primary/15 text-primary">
                <Sparkles className="size-4" />
              </span>
              {!sidebarCollapsed ? <span className="text-sm font-semibold tracking-wide">PolyLaunch</span> : null}
            </Link>
            <Button variant="ghost" size="icon-sm" onClick={() => setSidebarCollapsed((value) => !value)}>
              {sidebarCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </Button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`group relative flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                    active
                      ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_16px_rgba(190,140,255,0.22)]"
                      : "border-transparent text-muted-foreground hover:border-border/80 hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {!sidebarCollapsed ? <span>{item.label}</span> : null}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="relative z-10 flex min-w-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 px-4 py-3 backdrop-blur md:px-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search launch kits, locales, pipeline..." />
                </div>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-sm"
                >
                  {["EN", "HI", "JP", "DE", "AR"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                  {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="size-4" />
                </Button>
                <div className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{userLabel}</div>
                <SignOutButton />
              </div>
            </header>

            <main className="flex-1 px-4 py-6 md:px-6">
              <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
                <div className="grid gap-6">
                  <section>
                    <h1 className="text-2xl font-semibold tracking-tight">PolyLaunch Dashboard</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Generate and manage your multilingual launch kits.
                    </p>
                  </section>

                  <section className="grid gap-4 md:grid-cols-12">
                    <Card className="card-hover border-border/80 md:col-span-7">
                      <CardHeader>
                        <CardTitle>Create New Launch Kit</CardTitle>
                        <CardDescription>Generate AI-powered marketing content and localize instantly.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={() => pushToast("Launch Kit Generated")} className="bg-primary text-primary-foreground">
                          + Generate
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="card-hover border-border/80 md:col-span-5">
                      <CardHeader>
                        <CardTitle>Active Launch Kits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-semibold">3</div>
                        <p className="text-sm text-muted-foreground">Manage and edit existing kits</p>
                      </CardContent>
                    </Card>

                    <Card className="card-hover border-border/80 md:col-span-4">
                      <CardHeader>
                        <CardTitle>Supported Languages</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2">
                        {["EN", "HI", "JP", "DE", "AR"].map((item) => (
                          <span key={item} className="rounded-full border border-border bg-background px-3 py-1 text-xs">
                            {item}
                          </span>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="card-hover border-border/80 md:col-span-4">
                      <CardHeader>
                        <CardTitle>Localization Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { name: "English", width: "100%", status: "Complete" },
                          { name: "Japanese", width: "80%", status: "Synced" },
                          { name: "Hindi", width: "55%", status: "Pending" },
                        ].map((item) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{item.name}</span>
                              <span className="text-muted-foreground">{item.status}</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: item.width }} />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="card-hover border-border/80 md:col-span-4">
                      <CardHeader>
                        <CardTitle>CI/CD Sync</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <LoaderCircle className="size-4 animate-spin text-primary" />
                          Pipeline listening for content changes
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-emerald-400" />
                          Last sync succeeded
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card-hover border-border/80 md:col-span-12">
                      <CardHeader>
                        <CardTitle>Lingo Integration Status</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          ["Compiler", "Active"],
                          ["SDK", "Active"],
                          ["CLI", "Configured"],
                          ["CI", "Connected"],
                        ].map(([name, status]) => (
                          <div key={name} className="rounded-lg border border-border/80 bg-background/70 p-3">
                            <div className="text-sm font-medium">{name}</div>
                            <div className="mt-1 text-xs text-emerald-400">{status}</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </section>

                  <section className="grid gap-4 lg:grid-cols-2">
                    <Card className="border-border/80">
                      <CardHeader>
                        <CardTitle>New Launch Kit</CardTitle>
                        <CardDescription>Prepare your multilingual generation input.</CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="product-name">Product Name</Label>
                          <Input id="product-name" placeholder="PolyLaunch Assistant" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="target-audience">Target Audience</Label>
                          <Input id="target-audience" placeholder="Growth teams, indie SaaS" />
                        </div>
                        <div className="grid gap-2 sm:col-span-2">
                          <Label htmlFor="product-description">Product Description</Label>
                          <textarea
                            id="product-description"
                            className="min-h-24 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30"
                            placeholder="Describe the product launch context and value."
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="tone">Tone</Label>
                          <select
                            id="tone"
                            value={tone}
                            onChange={(event) => setTone(event.target.value)}
                            className="h-9 rounded-md border border-border bg-background px-3 text-sm"
                          >
                            {["Professional", "Bold", "Friendly", "Premium"].map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="markets">Target Markets</Label>
                          <Input
                            id="markets"
                            placeholder="Search locale"
                            value={marketSearch}
                            onChange={(event) => setMarketSearch(event.target.value)}
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 sm:col-span-2">
                          {selectedMarkets.map((item) => (
                            <span key={item} className="rounded-full border border-border px-3 py-1 text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                        <Button
                          className="sm:col-span-2 bg-primary text-primary-foreground"
                          onClick={() => pushToast("Launch Kit Generated")}
                        >
                          Generate
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-border/80">
                      <CardHeader>
                        <CardTitle>Launch Kit Preview</CardTitle>
                        <CardDescription>Language-aware structured output preview.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {["EN", "HI", "JP", "DE", "AR"].map((item) => (
                            <button
                              key={item}
                              onClick={() => setLanguage(item)}
                              className={`rounded-full border px-3 py-1 text-xs transition-all ${
                                language === item
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>

                        <div
                          className={`rounded-lg border border-border/80 bg-background/70 p-4 text-sm transition-all ${
                            preview.rtl ? "text-right" : "text-left"
                          }`}
                          dir={preview.rtl ? "rtl" : "ltr"}
                        >
                          <div className="grid gap-2">
                            <div><span className="font-medium">Landing:</span> {preview.landing}</div>
                            <div><span className="font-medium">Email:</span> {preview.email}</div>
                            <div><span className="font-medium">Social:</span> {preview.social}</div>
                            <div><span className="font-medium">Press:</span> {preview.press}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Copy className="size-4" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="size-4" />
                            Download JSON
                          </Button>
                          <Button size="sm" onClick={() => pushToast("Translation Completed")}>
                            Regenerate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  <section>
                    <Card className="border-border/80">
                      <CardHeader>
                        <CardTitle>Localization Pipeline</CardTitle>
                        <CardDescription>Track sync state for each target language.</CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          { locale: "Base: EN", status: "Ready", updated: "2 min ago" },
                          { locale: "JP", status: "Synced", updated: "4 min ago" },
                          { locale: "HI", status: "Pending", updated: "1 min ago" },
                          { locale: "AR", status: "Queued", updated: "just now" },
                        ].map((item) => (
                          <div key={item.locale} className="rounded-lg border border-border/80 bg-background/70 p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{item.locale}</span>
                              <LoaderCircle className={`size-4 ${item.status === "Pending" ? "animate-spin text-amber-400" : "text-primary"}`} />
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">{item.status}</div>
                            <div className="text-xs text-muted-foreground">Updated {item.updated}</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </section>
                </div>

                <aside className="hidden xl:block">
                  <Card className="sticky top-20 border-border/80">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Globe className="size-4 text-primary" />
                        Global Preview
                      </CardTitle>
                      <CardDescription>Quick market-level status snapshot.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="rounded-lg border border-border/80 bg-background/70 p-3">
                        <div className="font-medium">Languages Active</div>
                        <div className="text-muted-foreground">5 locales connected</div>
                      </div>
                      <div className="rounded-lg border border-border/80 bg-background/70 p-3">
                        <div className="font-medium">Lingo CLI</div>
                        <div className="text-emerald-400">Configured</div>
                      </div>
                      <div className="rounded-lg border border-border/80 bg-background/70 p-3">
                        <div className="font-medium">Pipeline Health</div>
                        <div className="text-muted-foreground">Stable</div>
                      </div>
                      <div className="rounded-lg border border-border/80 bg-background/70 p-3">
                        <div className="font-medium">Current Locale</div>
                        <div className="flex items-center gap-2 text-primary">
                          <Languages className="size-4" />
                          {language}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </aside>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex w-[280px] flex-col gap-2">
        {toasts.map((message, index) => (
          <div key={`${message}-${index}`} className="rounded-lg border border-border bg-card/95 px-3 py-2 text-sm shadow-lg backdrop-blur animate-in slide-in-from-right-8">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
