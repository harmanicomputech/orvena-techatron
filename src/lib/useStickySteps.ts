'use client';

import { useLayoutEffect, useState, type RefObject } from 'react';
import { ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Pins `ref` while the user scrolls through `count` steps and returns the active step.
 * On phones (where a pinned block can be taller than the screen) it cycles on a timer while
 * visible instead. Reduced motion: stays on the first step and pins nothing.
 */
export function useStickySteps(ref: RefObject<HTMLElement | null>, count: number, perStep = 0.4) {
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.innerWidth < 810) {
      let timer = 0;
      const io = new IntersectionObserver(([entry]) => {
        window.clearInterval(timer);
        if (entry.isIntersecting) timer = window.setInterval(() => setActive((a) => (a + 1) % count), 2200);
      });
      io.observe(el);
      return () => {
        io.disconnect();
        window.clearInterval(timer);
      };
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'center center',
      end: () => `+=${window.innerHeight * perStep * count}`,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => setActive(Math.min(count - 1, Math.floor(self.progress * count * 0.999))),
    });
    return () => st.kill();
  }, [ref, count, perStep]);

  return active;
}
