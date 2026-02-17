"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Moon, Sparkles, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

const loginParticleTones = ["bg-primary/30", "bg-foreground/20", "bg-emerald-400/20"];

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

function MinimalParticleBackground() {
  const pseudo = (value: number) => {
    const x = Math.sin(value * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 130 }).map((_, index) => {
        const duration = 11 + pseudo(index + 8) * 10;
        return {
          id: index,
          left: -15 - pseudo(index + 13) * 30,
          top: pseudo(index + 21) * 100,
          size: 1.5 + pseudo(index + 33) * 2.6,
          delay: pseudo(index + 48) * duration,
          duration,
          driftY: (pseudo(index + 59) - 0.5) * 20,
          tone: loginParticleTones[index % loginParticleTones.length],
        };
      }),
    []
  );

  return (
    <div
      aria-hidden
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
            boxShadow: "0 0 8px rgba(190,140,255,0.16)",
            animation: `particleAcross ${particle.duration}s linear ${particle.delay * -1}s infinite, softPulse 3.2s ease-in-out ${particle.delay}s infinite`,
            opacity: 0.34,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      onMouseMove={(event) => {
        const { innerWidth, innerHeight } = window;
        const x = ((event.clientX / innerWidth) * 2 - 1) * 5;
        const y = ((event.clientY / innerHeight) * 2 - 1) * 5;
        event.currentTarget.style.setProperty("--parallax-x", `${x}px`);
        event.currentTarget.style.setProperty("--parallax-y", `${y}px`);
      }}
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] bg-[size:62px_62px] opacity-25" />
      </div>
      <div className="absolute inset-0 z-[1]">
        <MinimalParticleBackground />
      </div>

      <div className="absolute right-6 top-6">
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      <Card className="glass relative z-10 w-full max-w-md rounded-3xl border-border/80">
        <CardHeader>
          <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            PolyLaunch
          </div>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Use Google to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-primary text-primary-foreground" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? "Redirecting..." : "Continue with Google"}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
