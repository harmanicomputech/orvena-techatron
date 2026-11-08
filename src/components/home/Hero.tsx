'use client';

import { useLayoutEffect, useRef } from 'react';
import { Button, Img } from '../ui';
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/gsap';

const cards = [
  { img: 'powernest-m', alt: 'PowerNest on mobile', cls: 'hero-card--a' },
  { img: 'hostcomm-m', alt: 'HostComm Summit on mobile', cls: 'hero-card--b' },
  { img: 'kwoat-m', alt: 'Kwoat AI on mobile', cls: 'hero-card--front', title: 'Kwoat AI', sub: 'AI Platform' },
];

function RotatingBadge() {
  const text = 'TECHATRON CONSULTING • DIGITAL ENGINEERING • LAGOS • ';
  return (
    <span className="hero-badge" aria-hidden="true">
      <svg viewBox="0 0 132 132" className="spin-slow absolute inset-0">
        <defs>
          <path id="badge-circle" d="M66,66 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0" />
        </defs>
        <text fill="#f4f1ea" style={{ fontSize: 9.6, letterSpacing: 1.15, fontWeight: 500 }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 40 40" width="40" height="40" className="relative">
        <path fill="#ffdd4a" d="M20 0l2.3 13.1L31.3 4l-6.8 11.4L40 20l-15.5 4.6 6.8 11.4-9-9.1L20 40l-2.3-13.1L8.7 36l6.8-11.4L0 20l15.5-4.6L8.7 4l9 9.1z" />
      </svg>
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const veil = document.documentElement.dataset.veil === 'on' ? 0.55 : 0;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 + veil, defaults: { ease: 'expo' } });
      tl.from('[data-hero-top]', { y: 16, opacity: 0, duration: 0.9, stagger: 0.08 })
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.4 }, '<')
        .from('.hero-word', { yPercent: 115, rotate: 4, opacity: 0, filter: 'blur(8px)', duration: 1.25, stagger: 0.06 }, 0.15)
        .from('.hero-highlight', { scaleX: 0.2, opacity: 0, transformOrigin: 'left center', duration: 1.1 }, 0.35)
        .from('.hero-thumb', { scale: 0, rotate: -40, duration: 0.9, stagger: 0.08, ease: 'back.out(2)' }, 0.55)
        .from('.hero-dots', { scale: 0, duration: 0.8, ease: 'back.out(2.2)' }, 0.7)
        .from('.hero-dots i', { y: -10, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(3)' }, 0.85)
        // Transform only: the lead paragraph is the LCP element, so it must paint immediately.
        .from('[data-hero-in]', { y: 30, duration: 1.1, stagger: 0.08 }, 0.2)
        // Cards fan out from a single stack. They stay on screen throughout, so the first paint
        // already counts for LCP.
        .from('.hero-card', { xPercent: (i: number) => [32, -42, 0][i], rotate: 0, scale: 0.94, duration: 1.6, ease: 'expo' }, 0.15)
        .from('.hero-card img', { scale: 1.3, duration: 1.8, stagger: 0.12 }, 0.1)
        .from('.hero-badge', { scale: 0, rotate: -120, duration: 1.2, ease: 'back.out(1.6)' }, 1.0)
        .from('.hero-feature', { y: 14, scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(2)' }, 1.2);

      // Idle float on the card stack, then pointer tilt for fine pointers.
      gsap.to('.hero-stack', { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    }, el);

    let off = () => {};
    if (isFinePointer()) {
      const stack = el.querySelector<HTMLElement>('.hero-stack');
      const cardsEls = el.querySelectorAll<HTMLElement>('.hero-card');
      if (stack) {
        const rx = gsap.quickTo(stack, 'rotationX', { duration: 1, ease: 'power3' });
        const ry = gsap.quickTo(stack, 'rotationY', { duration: 1, ease: 'power3' });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rx(-ny * 8);
          ry(nx * 10);
          cardsEls.forEach((c, i) => gsap.to(c, { x: nx * (10 + i * 8), y: ny * (8 + i * 6), duration: 1.2, ease: 'power3', overwrite: 'auto' }));
        };
        window.addEventListener('pointermove', move, { passive: true });
        off = () => window.removeEventListener('pointermove', move);
      }
    }
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  const W = ({ children }: { children: string }) => (
    <span className="inline-block overflow-clip pb-[0.08em] -mb-[0.08em] align-bottom [overflow-clip-margin:0.1em]">
      <span className="hero-word inline-block">{children}</span>
    </span>
  );

  return (
    <section ref={root} className="hero relative" aria-labelledby="hero-title">
      <div className="guides" aria-hidden="true" />
      <div className="container-x relative pt-[84px] pb-[120px] max-[1199px]:pt-[72px] max-[1199px]:pb-[96px] max-[809px]:pt-8 max-[809px]:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pb-[22px] max-[809px]:pb-5">
          <span className="pill" data-hero-top>
            Techatron — Digital Engineering Studio
          </span>
          <span className="t-meta flex items-center gap-2.5" data-hero-top>
            <i className="inline-block h-2 w-2 rounded-full bg-orange shadow-[0_0_0_4px_rgba(255,91,31,.18)]" aria-hidden="true" />
            Lagos studio · Clients in Nigeria and beyond
          </span>
        </div>
        <div className="hero-rule h-px bg-[rgba(17,18,24,.1)]" aria-hidden="true" />

        <div className="hero-grid mt-[72px] max-[1199px]:mt-14 max-[809px]:mt-10">
          <div className="relative z-[2]">
            <h1 id="hero-title" className="t-h1">
              <span className="sr-only">We engineer reliable software and digital products.</span>
              <span aria-hidden="true">
                <span className="block">
                  <W>We</W> <W>engineer</W>
                </span>
                <span className="block">
                  <span className="hero-highlight relative inline-block -rotate-[2deg] rounded-[100px] bg-lilac px-[0.15em] pb-[0.06em] align-middle text-indigo">
                    <W>reliable</W>
                  </span>{' '}
                  <W>software</W>
                </span>
                <span className="flex items-center gap-[0.14em]">
                  <span className="flex -space-x-[0.16em]" aria-hidden="true">
                    {['kwoat-m', 'powernest-m', 'hostcomm-m'].map((k) => (
                      <span key={k} className="hero-thumb block h-[0.76em] w-[0.76em] overflow-hidden rounded-full ring-[3px] ring-cream">
                        <Img src={k} alt="" sizes="64px" className="h-full w-full object-cover object-top" priority />
                      </span>
                    ))}
                  </span>
                  <W>and</W> <W>digital</W>
                  <span className="hero-dots ml-[0.08em] inline-flex h-[0.76em] items-center gap-[0.09em] rounded-[100px] bg-yellow px-[0.24em]" aria-hidden="true">
                    <i className="block h-[0.13em] w-[0.13em] rounded-full bg-ink" />
                    <i className="block h-[0.13em] w-[0.13em] rounded-full bg-ink/45" />
                    <i className="block h-[0.13em] w-[0.13em] rounded-full bg-ink/25" />
                  </span>
                </span>
                <span className="block">
                  <W>products.</W>
                </span>
              </span>
            </h1>
            <p className="t-lead mt-9 max-w-[520px] text-slate max-[809px]:mt-6" data-hero-in>
              For businesses that run on technology. From first sketch to production and beyond, we design, engineer and launch software people rely on.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 max-[809px]:mt-7" data-hero-in>
              <Button href="/work/">Explore our work</Button>
              <Button href="/contact/" variant="lilac">
                Start a project
              </Button>
            </div>
          </div>

          <div className="hero-stack-wrap" aria-hidden="true">
            <div className="hero-stack">
              {cards.map((c) => (
                <div key={c.img} className={`hero-card ${c.cls}`}>
                  <div className="hero-card__inner media">
                    <Img src={c.img} alt="" sizes="(max-width: 809px) 40vw, 340px" priority className="h-full w-full object-cover object-top" />
                    {c.title && (
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-night-card px-4 pb-4 pt-3.5">
                        <div>
                          <p className="text-[19px] font-medium leading-tight tracking-[-0.02em] text-cream max-[809px]:text-[15px]">{c.title}</p>
                          <p className="t-meta text-cream-56">{c.sub}</p>
                        </div>
                        <span className="hero-feature pill pill--yellow !px-3.5 !py-2 !text-[15px]">Featured</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <RotatingBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
