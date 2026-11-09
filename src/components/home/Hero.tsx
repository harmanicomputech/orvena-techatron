'use client';

import { useLayoutEffect, useRef } from 'react';
import { Button, Img } from '../ui';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

const hubs = [
  { k: 'Operations hub', v: 'Lagos, Nigeria' },
  { k: 'Operations hub', v: 'Delaware, USA' },
  { k: 'Clients', v: 'Served globally' },
];

/**
 * Classical, symmetrical hero: centred headline with a serif accent, a quiet hub line,
 * and a showcase (flagship product in a browser frame, flanked by two phones).
 * Motion is restrained: masked line reveals, then the showcase rises into place and
 * settles with a gentle scroll parallax.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const veil = document.documentElement.dataset.veil === 'on' ? 0.55 : 0;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 + veil, defaults: { ease: 'expo' } })
        .from('[data-hero-top]', { y: 14, opacity: 0, duration: 1 })
        .from('.hero-line > span', { yPercent: 105, duration: 1.3, stagger: 0.1 }, 0.1)
        // Transform only: the lead paragraph is the LCP element, so it must paint immediately.
        .from('[data-hero-in]', { y: 24, duration: 1.1, stagger: 0.08 }, 0.35)
        .from('.hero-rule', { scaleX: 0, duration: 1.4, transformOrigin: 'center' }, 0.45)
        .from('.hero-hub', { y: 16, opacity: 0, duration: 1, stagger: 0.08 }, 0.55)
        .from('.hero-show__main', { y: 80, duration: 1.6 }, 0.35)
        .from('.hero-show__phone--l', { y: 120, x: 40, duration: 1.6 }, 0.5)
        .from('.hero-show__phone--r', { y: 120, x: -40, duration: 1.6 }, 0.5);

      // Gentle parallax: phones drift up a little faster than the main frame; the screen settles from a slight zoom.
      gsap.to('.hero-show__phone', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-show', start: 'top 80%', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(
        '.hero-show__screen img',
        { scale: 1.06 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: '.hero-show', start: 'top 90%', end: 'bottom 40%', scrub: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero relative overflow-hidden" aria-labelledby="hero-title">
      <div className="guides" aria-hidden="true" />
      <div className="container-x relative flex flex-col items-center pt-[88px] text-center max-[1199px]:pt-[64px] max-[809px]:pt-10">
        <span className="pill" data-hero-top>
          Digital engineering &amp; technology consulting
        </span>

        <h1 id="hero-title" className="hero-title mt-8">
          <span className="hero-line">
            <span>We engineer software</span>
          </span>{' '}
          <span className="hero-line">
            <span>
              businesses <em className="hero-serif">rely on.</em>
            </span>
          </span>
        </h1>

        <p className="t-lead mt-8 max-w-[560px] text-slate max-[809px]:mt-6" data-hero-in>
          Custom software, web and mobile applications, and intelligent platforms, designed, engineered and launched for organisations that run on technology.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 max-[809px]:mt-7" data-hero-in>
          <Button href="/work/">Explore our work</Button>
          <Button href="/contact/" variant="lilac">
            Start a project
          </Button>
        </div>

        <div className="mt-16 w-full max-w-[860px] max-[809px]:mt-12">
          <div className="hero-rule h-px bg-[rgba(17,18,24,.12)]" aria-hidden="true" />
          <ul className="grid grid-cols-3" aria-label="Where we work">
            {hubs.map((h, i) => (
              <li
                key={h.v}
                className={`hero-hub px-2 py-5 max-[809px]:py-4 ${i > 0 ? 'border-l border-[rgba(17,18,24,.12)]' : ''}`}
              >
                <span className="t-micro block text-grey max-[809px]:!text-[10px]">{h.k}</span>
                <span className="mt-1.5 block text-[19px] tracking-[-0.02em] max-[809px]:text-[14px]">{h.v}</span>
              </li>
            ))}
          </ul>
          <div className="hero-rule h-px bg-[rgba(17,18,24,.12)]" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-show container-x relative mt-20 max-[809px]:mt-12" aria-hidden="true">
        <div className="hero-show__stage">
          <span className="hero-show__label hero-show__label--l">Nebo Stage</span>
          <span className="hero-show__label hero-show__label--r">Resolvr</span>
          <div className="hero-show__phone hero-show__phone--l">
            <Img src="nebostage-m" alt="" sizes="(max-width: 809px) 28vw, 230px" priority className="h-full w-full object-cover object-top" />
          </div>
          <div className="hero-show__main">
            <div className="hero-show__screen">
              <Img src="photo-multitask" alt="" sizes="(max-width: 1199px) 90vw, 940px" priority className="h-full w-full object-cover object-center" />
            </div>
          </div>
          <div className="hero-show__phone hero-show__phone--r">
            <Img src="resolvr-m" alt="" sizes="(max-width: 809px) 28vw, 230px" priority className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
