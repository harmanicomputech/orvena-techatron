'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Lenis smooth scrolling driven from GSAP's ticker so ScrollTrigger stays in sync.
 *  Skipped entirely for reduced-motion users and on touch devices (native scroll is better there). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<((t: number) => void) | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('js-motion', !prefersReducedMotion());
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

    const instance = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    instance.on('scroll', ScrollTrigger.update);
    raf.current = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf.current);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      if (raf.current) gsap.ticker.remove(raf.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
