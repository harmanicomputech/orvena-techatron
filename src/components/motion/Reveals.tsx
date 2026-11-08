'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '@/lib/gsap';

/**
 * Declarative scroll choreography. Sections opt in with data attributes:
 *
 *  data-split            headline: lines are masked, words rise and un-blur in sequence
 *  data-reveal           element fades up and un-blurs
 *  data-reveal-group     children reveal with a stagger
 *  data-clip             media wipes open (clip-path) while its image settles from a slight zoom
 *  data-parallax="0.12"  element drifts against the scroll (fraction of its height)
 *  data-delay="0.2"      extra delay for any of the above
 *
 * Everything is transform / opacity / clip-path only, and is skipped under prefers-reduced-motion.
 */
export function Reveals() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    (window as unknown as { __reveals?: boolean }).__reveals = true;
    if (prefersReducedMotion()) return;
    const root = document.getElementById('main');
    if (!root) return;

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      // While the page-transition veil is lifting, hold above-the-fold reveals back so they
      // play as the new page is uncovered rather than behind the veil.
      const veil = document.documentElement.dataset.veil === 'on' ? 0.55 : 0;
      const delayOf = (el: Element) => {
        const own = parseFloat((el as HTMLElement).dataset.delay || '0');
        return el.getBoundingClientRect().top < window.innerHeight ? own + veil : own;
      };
      const start = 'top 88%';

      root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        const split = SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          linesClass: 'split-line',
          wordsClass: 'split-word',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            return gsap.from(self.words, {
              yPercent: 110,
              rotate: 3,
              filter: 'blur(6px)',
              opacity: 0,
              duration: 1.15,
              stagger: { each: 0.045 },
              delay: delayOf(el),
              ease: 'expo',
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
        splits.push(split);
      });

      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, filter: 'blur(6px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: delayOf(el),
            clearProps: 'filter',
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const items = Array.from(group.children);
        gsap.fromTo(
          items,
          { y: 60, opacity: 0, rotate: (i) => (i % 2 ? 1.2 : -1.2) },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.3,
            stagger: 0.09,
            delay: delayOf(group),
            clearProps: 'transform',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
        const img = el.querySelector('img, svg');
        const tl = gsap.timeline({ delay: delayOf(el), scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        tl.fromTo(el, { clipPath: 'inset(18% 10% 18% 10% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.5, clearProps: 'clipPath' });
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, clearProps: 'transform' }, 0);
      });

      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || '0.1');
        gsap.fromTo(
          el,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    }, root);

    // Images that load late change layout; keep trigger positions honest.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('load', refresh);
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
