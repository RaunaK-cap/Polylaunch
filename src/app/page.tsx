"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Globe, Languages, Moon, Sparkles, Sun, Workflow } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type LanguagePreview = {
  code: string;
  label: string;
  title: string;
  body: string;
  rtl?: boolean;
};

const previews: LanguagePreview[] = [
  {
    code: "EN",
    label: "English",
    title: "Launch globally. Instantly.",
    body: "Generate and localize your full launch across markets in one workflow.",
  },
  {
    code: "HI",
    label: "Hindi",
    title: "Global launch, local tone.",
    body: "Keep your core message while adapting tone and context for each region.",
  },
  {
    code: "JP",
    label: "Japanese",
    title: "Fast execution with local nuance.",
    body: "Copy feels native to each market instead of direct translation.",
  },
  {
    code: "DE",
    label: "German",
    title: "One pipeline for every language.",
    body: "Sync website, email, and social copy through CI-powered localization.",
  },
  {
    code: "AR",
    label: "Arabic",
    title: "Launch in Arabic with confidence.",
    body: "Preview right-to-left layout and culturally adapted release messaging.",
    rtl: true,
  },
];

const bentoLanguageTabs = ["EN", "HI", "JP", "DE", "AR"];
const particleTones = ["bg-primary", "bg-emerald-400", "bg-amber-400", "bg-rose-400/90", "bg-foreground/70"];

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

function ParticleField() {
  const pseudo = (value: number) => {
    const x = Math.sin(value * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 320 }).map((_, index) => {
        const tone = particleTones[index % particleTones.length];
        const size = 1.5 + pseudo(index + 4) * 3.2;
        const left = -20 - pseudo(index + 11) * 35;
        const top = pseudo(index + 27) * 100;
        const driftY = (pseudo(index + 52) - 0.5) * 26;
        const duration = 10 + pseudo(index + 100) * 10;
        const pulseDuration = 2.4 + pseudo(index + 74) * 4;
        const delay = pseudo(index + 88) * duration;

        return {
          id: index,
          left,
          top,
          size,
          delay,
          duration,
          pulseDuration,
          driftY,
          tone,
        };
      }),
    []
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden transition-transform duration-300"
      style={{ transform: "translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0)" }}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`absolute rounded-full ${particle.tone}`}
          style={{
            "--dy": `${particle.driftY}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: "0 0 10px rgba(190,140,255,0.16)",
            animation: `particleAcross ${particle.duration}s linear ${particle.delay * -1}s infinite, softPulse ${particle.pulseDuration}s ease-in-out ${particle.delay}s infinite`,
            opacity: 0.36,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function WorldMapArt() {
  const nodes = [
    { code: "US", left: "18%", top: "44%", tone: "bg-primary" },
    { code: "BR", left: "30%", top: "66%", tone: "bg-emerald-400" },
    { code: "DE", left: "49%", top: "39%", tone: "bg-amber-400" },
    { code: "IN", left: "63%", top: "50%", tone: "bg-rose-400" },
    { code: "JP", left: "79%", top: "43%", tone: "bg-primary" },
    { code: "AE", left: "58%", top: "52%", tone: "bg-emerald-400" },
  ];

  return (
    <div className="relative h-80 overflow-hidden rounded-3xl border border-border/80 glass">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(190,140,255,0.18),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_45%)]" />

      <svg viewBox="0 0 1200 500" className="relative z-10 h-full w-full p-8 opacity-80" aria-hidden>
        <g className="text-muted/80">
          <path d="M95 247l41-41 89-10 42-30 75 8 57-24 99 30 44 40-19 30-66 7-47 24-52 3-61 34-60 7-75-15-52-27z" fill="currentColor" />
          <path d="M366 305l40-23 69 6 47 27 21 35-12 26-39 11-56-14-47-35-19-20z" fill="currentColor" />
          <path d="M595 168l52-22 102 6 67 30 39 45-16 34-58 20-80-10-62-35-32-36z" fill="currentColor" />
          <path d="M818 153l52-14 99 16 83 46 25 38-12 41-69 26-87-13-54-38-33-45z" fill="currentColor" />
          <path d="M913 327l47-9 52 16 28 32-26 26-49-5-42-25z" fill="currentColor" />
        </g>

        <g fill="none" strokeWidth="2.2" strokeLinecap="round">
          <path d="M215 223C350 132 513 128 648 190C756 241 836 228 945 188" className="text-primary/70" stroke="currentColor" strokeDasharray="8 8" style={{ animation: "routeFlow 10s linear infinite" }} />
          <path d="M226 246C340 269 447 331 607 321C744 314 862 278 968 210" className="text-emerald-400/70" stroke="currentColor" strokeDasharray="7 9" style={{ animation: "routeFlow 9s linear infinite" }} />
          <path d="M646 197C640 258 608 278 596 316" className="text-amber-400/80" stroke="currentColor" strokeDasharray="5 7" style={{ animation: "routeFlow 7.5s linear infinite" }} />
        </g>
      </svg>

      {nodes.map((node, index) => (
        <div key={node.code} className="absolute z-20" style={{ left: node.left, top: node.top }}>
          <span className={`block h-2.5 w-2.5 rounded-full ${node.tone}`} style={{ animation: `softPulse 2.4s ${index * 0.35}s infinite` }} />
          <span className="mt-1 block text-[10px] font-medium text-muted-foreground">{node.code}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState(0);
  const [bentoTab, setBentoTab] = useState("EN");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPreview = previews[active];

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
      onMouseMove={(event) => {
        const { innerWidth, innerHeight } = window;
        const x = ((event.clientX / innerWidth) * 2 - 1) * 8;
        const y = ((event.clientY / innerHeight) * 2 - 1) * 8;
        event.currentTarget.style.setProperty("--parallax-x", `${x}px`);
        event.currentTarget.style.setProperty("--parallax-y", `${y}px`);
      }}
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] bg-[size:66px_66px] opacity-30" />
      </div>
      <div aria-hidden className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border/90 bg-background/86 backdrop-blur-xl"
            : "border-transparent bg-background/30 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-primary/35 bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </span>
            PolyLaunch
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {[
              ["#features", "Features"],
              ["#preview", "Preview"],
              ["#technology", "Tech"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="group relative transition-colors hover:text-foreground">
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 pb-24 pt-14 lg:px-8">
        <section className="relative grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal from="up" className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              AI Global Launch Kit
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Launch Globally. Instantly.
            </h1>
            <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Generate, localize, and synchronize your entire product launch across multiple
              languages powered by AI and Lingo.dev.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-500 dark:text-emerald-300">
                market-aware tone
              </span>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-600 dark:text-amber-300">
                ci localization
              </span>
              <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-rose-600 dark:text-rose-300">
                rtl support
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="group bg-primary text-primary-foreground">
                <Link href="/login" className="inline-flex items-center gap-2">
                  Generate My Launch Kit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#preview" className="inline-flex items-center gap-2">
                  <Globe className="size-4" />
                  See Global Preview
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal from="up" delayMs={120} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border/90 p-7 glass">
              <div className="space-y-5">
                <div className="rounded-2xl border border-border/80 bg-background/70 p-4">
                  <div className="text-xs text-muted-foreground">Live AI Copy Generation</div>
                  <div className="mt-2 flex items-center gap-2 font-mono text-sm">
                    <span className="typing-track">Creating launch messaging for 5 markets...</span>
                    <span className="cursor text-primary">|</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {previews.map((item, index) => (
                    <span
                      key={item.code}
                      className={`${index % 2 ? "float-delay" : "float-slow"} rounded-full border border-border/80 bg-background/65 px-3 py-1`}
                    >
                      {item.code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="features" className="space-y-6">
          <Reveal from="up" className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Core Features</h2>
            <p className="max-w-2xl text-muted-foreground">
              Premium bento layout focused on launch velocity, localization depth, and live previews.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-12">
            <Card className="card-hover glass border-border/80 p-6 md:col-span-7 md:row-span-2">
              <h3 className="text-lg font-semibold">AI-Powered Launch Kits</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate landing copy, emails, social posts, and press summaries instantly.
              </p>
              <div className="mt-6 rounded-2xl border border-border/80 bg-background/75 p-4 font-mono text-xs text-primary">
                <div className="typing-track">
                  {"draft.launchKit({ locales: [\"en\", \"de\", \"jp\", \"ar\"] })"}
                </div>
              </div>
            </Card>

            <Card className="card-hover glass border-border/80 p-6 md:col-span-5">
              <h3 className="text-lg font-semibold">Beyond Translation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Messaging adapts culturally for each market, not just word-for-word translation.
              </p>
            </Card>

            <Card className="card-hover glass border-border/80 p-6 md:col-span-5">
              <h3 className="text-lg font-semibold">Live Language Switching</h3>
              <p className="mt-2 text-sm text-muted-foreground">Preview translated launch content instantly.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {bentoLanguageTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setBentoTab(tab)}
                    className={`rounded-full border px-3 py-1 text-xs transition-all ${
                      bentoTab === tab
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border/80 bg-background/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="card-hover glass border-border/80 p-6 md:col-span-3">
              <h3 className="text-base font-semibold">RTL Ready</h3>
              <p className="mt-2 text-sm text-muted-foreground">Layout flips naturally for Arabic.</p>
              <div className="mt-4 rounded-xl border border-border/80 bg-background/65 p-2 text-right text-xs" dir="rtl">
                arabic preview rtl
              </div>
            </Card>

            <Card className="card-hover glass border-border/80 p-6 md:col-span-3">
              <h3 className="text-base font-semibold">CI-Powered Localization</h3>
              <p className="mt-2 text-sm text-muted-foreground">Auto-sync copy updates through pipelines.</p>
              <Workflow className="mt-4 size-5 text-primary" />
            </Card>

            <Card className="card-hover glass border-border/80 p-6 md:col-span-6">
              <h3 className="text-base font-semibold">Deeply Integrated with Lingo.dev</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-4">
                {["Compiler", "SDK", "CLI", "CI/CD"].map((item) => (
                  <span key={item} className="rounded-lg border border-border/80 bg-background/60 px-2 py-2 text-center">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="preview" className="grid gap-5 lg:grid-cols-2">
          <Reveal from="left">
            <Card className="card-hover glass border-border/80 p-6">
              <div
                className={`space-y-4 transition-all duration-300 ${currentPreview.rtl ? "text-right" : "text-left"}`}
                dir={currentPreview.rtl ? "rtl" : "ltr"}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-primary">{currentPreview.label}</div>
                <h3 className="text-2xl font-semibold">{currentPreview.title}</h3>
                <p className="text-muted-foreground">{currentPreview.body}</p>
              </div>
            </Card>
          </Reveal>

          <Reveal from="right" delayMs={120}>
            <Card className="card-hover glass border-border/80 p-6">
              <h3 className="text-base font-semibold">Global Language Preview</h3>
              <p className="mt-2 text-sm text-muted-foreground">Switch locales and watch copy morph instantly.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {previews.map((item, index) => (
                  <button
                    key={item.code}
                    onClick={() => setActive(index)}
                    className={`rounded-xl border px-3 py-2 text-sm transition-all ${
                      active === index
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border/80 bg-background/65 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {item.code} <span className="opacity-70">{item.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </Reveal>
        </section>

        <section className="space-y-5">
          <Reveal from="up" className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your Product. Every Market. Day One.
            </h2>
          </Reveal>
          <WorldMapArt />
        </section>

        <section id="technology" className="space-y-4">
          <Reveal from="up" className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">Technology Stack</h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Lingo Compiler", "Compile localization bundles with strict consistency."],
              ["Lingo SDK", "Inject localized variants across your product stack."],
              ["Lingo CLI", "Automate and validate locale ops from terminal workflows."],
              ["CI/CD Sync", "Keep localization aligned with your release pipeline."],
            ].map(([title, text]) => (
              <Card key={title} className="card-hover glass border-border/80 p-5">
                <div className="text-base font-semibold">{title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-border/80 p-8 text-center glass sm:p-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(190,140,255,0.22),transparent_46%),radial-gradient(circle_at_80%_70%,rgba(52,211,153,0.16),transparent_48%),radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.14),transparent_44%)]"
          />
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop Launching in Just One Language.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Build globally with AI-native localization and market-aware launch messaging.
          </p>
          <div className="mt-7 flex justify-center">
            <Button size="lg" asChild className="bg-primary text-primary-foreground">
              <Link href="/login" className="inline-flex items-center gap-2">
                <Languages className="size-4" />
                Start Building Globally
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
