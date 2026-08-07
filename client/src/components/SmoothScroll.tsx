/*
 * BLUEPRINT ATELIER — Lenis smooth scroll provider
 * Heavy, damped lerp for a cinematic "structural loading" feel.
 */
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return lenisRef;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
