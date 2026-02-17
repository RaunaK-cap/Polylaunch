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
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, index) => {
        const tone =
          index % 4 === 0
            ? "bg-primary/26"
            : index % 4 === 1
              ? "bg-emerald-400/18"
              : index % 4 === 2
                ? "bg-amber-400/18"
                : "bg-rose-400/18";

        return {
          id: index,
          left: (index * 37) % 100,
          top: (index * 19) % 100,
          size: index % 5 === 0 ? 5 : 3,
          delay: (index % 10) * 0.4,
          duration: 10 + (index % 7),
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
          className={`particle-drift absolute rounded-full ${particle.tone}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}

function WorldMapArt() {
  return (
    <div className="relative h-72 overflow-hidden rounded-3xl border border-border/80 glass">
      <svg viewBox="0 0 900 360" className="h-full w-full opacity-70" aria-hidden>
        <path
          d="M95 165l48-29 56 4 58-18 82 12 84-32 90 20 61 56-34 26-93-6-62 25-88-5-73 14-75-20z"
          fill="currentColor"
          className="text-muted"
        />
        <path
          d="M638 109l42-8 58 12 44 24-6 41-43 19-61-9-32-33z"
          fill="currentColor"
          className="text-muted"
        />
        <path
          d="M320 226l70 10 70 45-43 23-56-16-39-30z"
          fill="currentColor"
          className="text-muted"
        />
        <path
          d="M191 141C315 48 509 46 706 131"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/60"
          strokeDasharray="6 8"
        />
        <path
          d="M251 198C388 129 500 122 651 173"
          stroke="currentColor"
          strokeWidth="2"
          className="text-emerald-400/55"
          strokeDasharray="6 8"
        />
      </svg>
      {[
        ["bg-primary", 230, 140],
        ["bg-emerald-400", 335, 128],
        ["bg-amber-400", 470, 118],
        ["bg-rose-400", 620, 148],
        ["bg-primary", 384, 230],
      ].map(([tone, left, top], index) => (
        <span
          key={index}
          className={`absolute h-3 w-3 rounded-full ${tone}`}
          style={{ left: Number(left), top: Number(top), animation: `softPulse 3s ${index * 0.4}s infinite` }}
        />
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
      <div aria-hidden className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] bg-[size:66px_66px] opacity-30" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10">
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 pb-24 pt-14 lg:px-8">
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

        <section className="overflow-hidden rounded-3xl border border-border/80 p-8 text-center glass sm:p-14">
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
