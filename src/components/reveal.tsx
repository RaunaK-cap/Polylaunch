"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealFrom = "up" | "down" | "left" | "right";

export function Reveal({
  children,
  className,
  delayMs = 0,
  from = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  from?: RevealFrom;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    from === "up"
      ? "translate-y-6"
      : from === "down"
        ? "-translate-y-6"
        : from === "left"
          ? "translate-x-6"
          : "-translate-x-6";

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "will-change-transform transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform}`,
        className
      )}
    >
      {children}
    </div>
  );
}
