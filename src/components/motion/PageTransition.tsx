'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { useLenis } from './SmoothScroll';
import { LogoMark } from '../Logo';

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const normalise = (p: string) => (p.endsWith('/') ? p : p + '/');

/**
 * Cinematic route change: a night-blue veil wipes up over the page (clip-path), the Techatron mark
 * pulses, the route swaps underneath, and the veil continues off the top as the new page's own
 * entrance choreography (see Reveals) plays. Reduced-motion users get an instant swap.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const veil = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;
      if (busy.current) return;
      if (normalise(url.pathname) === normalise(window.location.pathname)) {
        if (url.hash) document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' });
        else lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (prefersReducedMotion() || !veil.current) {
        router.push(target);
        return;
      }
      busy.current = true;
      pending.current = normalise(url.pathname);
      lenis?.stop();
      const mark = veil.current.querySelector('.page-veil__mark');
      gsap
        .timeline()
        .set(veil.current, { clipPath: 'inset(100% 0% 0% 0% round 40px 40px 0 0)' })
        .to(veil.current, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)', duration: 0.75, ease: 'expo' })
        .fromTo(mark, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.25)
        .add(() => {
          document.documentElement.dataset.veil = 'on';
          router.push(target);
        });
      // Safety: never leave the veil down if navigation stalls.
      window.setTimeout(() => {
        if (busy.current) reveal();
      }, 4000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, lenis],
  );

  const reveal = useCallback(() => {
    if (!veil.current) return;
    const mark = veil.current.querySelector('.page-veil__mark');
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
          pending.current = null;
          delete document.documentElement.dataset.veil;
          lenis?.start();
        },
      })
      .to(mark, { opacity: 0, y: -20, duration: 0.35, ease: 'soft' })
      .to(veil.current, { clipPath: 'inset(0% 0% 100% 0% round 0 0 40px 40px)', duration: 0.9, ease: 'expo' }, 0.1)
      .set(mark, { y: 0 });
  }, [lenis]);

  // Route committed → lift the veil.
  useEffect(() => {
    if (pending.current && normalise(pathname) === pending.current) {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    } else if (!busy.current) {
      // Back/forward navigation: just make sure we start at the top cleanly.
      ScrollTrigger.refresh();
    }
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={veil} className="page-veil" aria-hidden="true">
        <div className="page-veil__mark">
          <LogoMark size={56} light />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
