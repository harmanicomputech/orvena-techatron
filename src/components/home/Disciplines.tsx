'use client';

import { useLayoutEffect, useRef } from 'react';
import { useStickySteps } from '@/lib/useStickySteps';
import { Button, Img } from '../ui';
import { LogoMark } from '../Logo';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

const items = [
  { word: 'Software', img: 'resolvr-1', tag: 'Built to last', alt: 'Resolvr web application' },
  { word: 'Platforms', img: 'comono-1', tag: 'Integration-ready', alt: 'Comono verification platform' },
  { word: 'Mobile', img: 'powernest-m', tag: 'Offline-first', alt: 'PowerNest on mobile' },
  { word: 'Intelligence', img: 'kwoat-1', tag: 'Model-agnostic', alt: 'Kwoat AI workspace' },
];

export function Disciplines() {
  const pin = useRef<HTMLDivElement>(null);
  const active = useStickySteps(pin, items.length);

  // Image swap: new image wipes up from below with a slight zoom-out.
  const prev = useRef(0);
  useLayoutEffect(() => {
    if (prev.current === active || prefersReducedMotion()) {
      prev.current = active;
      return;
    }
    const layer = pin.current?.querySelector<HTMLElement>(`[data-layer="${active}"]`);
    if (layer) {
      gsap.fromTo(layer, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo' });
      gsap.fromTo(layer.querySelector('img'), { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'expo' });
    }
    gsap.fromTo('.disc-tag', { y: 12, opacity: 0, rotate: -8 }, { y: 0, opacity: 1, rotate: -4, duration: 0.7, ease: 'back.out(2)' });
    gsap.fromTo('.disc-num', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'expo' });
    prev.current = active;
  }, [active]);

  return (
    <section className="on-dark relative text-cream" style={{ background: 'var(--color-night)' }} aria-labelledby="disc-title">
      <div className="container-x pt-[72px] max-[809px]:pt-14">
        <div className="flex justify-between gap-8 border-b border-white/10 pb-8">
          <p className="t-micro max-w-[220px]" data-reveal>
            Lagos · Delaware · Serving globally
          </p>
          <p className="t-micro max-w-[220px] text-right" data-reveal>
            Good software starts with a clear understanding.
          </p>
        </div>
      </div>

      <div ref={pin} className="container-x">
        <div className="grid items-center gap-10 py-[120px] max-[1199px]:py-16 min-[1200px]:grid-cols-[272px_1fr_323px] max-[1199px]:min-h-0 max-[1199px]:grid-cols-[120px_1fr]">
          <h2 id="disc-title" className="sr-only">
            What we engineer: software, platforms, mobile and intelligent systems
          </h2>
          <p className="self-start overflow-hidden pt-10 text-[44px] leading-none tracking-[-0.03em] text-yellow max-[809px]:text-[26px]" aria-hidden="true">
            <span className="disc-num inline-block">0{active + 1}</span>
          </p>
          <ul className="sr-only">
            {items.map((it) => (
              <li key={it.word}>{it.word}</li>
            ))}
          </ul>
          <ul className="grid" aria-hidden="true">
            {items.map((it, i) => (
              <li key={it.word}>
                <span className={`word-list__word ${i === active ? 'is-active' : ''}`} data-text={it.word} data-num={`0${i + 1}`} />
              </li>
            ))}
          </ul>
          <div className="max-[1199px]:col-span-2 max-[1199px]:max-w-[420px]">
            <div className="relative aspect-[323/360] overflow-hidden rounded-[20px]" style={{ background: 'var(--color-night-raised)' }}>
              {items.map((it, i) => (
                <div
                  key={it.img}
                  data-layer={i}
                  className="absolute inset-0"
                  style={{ zIndex: i === active ? 2 : i === prev.current ? 1 : 0, visibility: i === active || i === prev.current ? 'visible' : 'hidden' }}
                >
                  <Img src={it.img} alt={it.alt} sizes="(max-width: 1199px) 420px, 323px" className="h-full w-full object-cover object-top" />
                </div>
              ))}
              <span className="disc-tag pill pill--lilac absolute -left-4 top-6 z-[3] -rotate-[4deg] max-[1199px]:left-3">{items[active].tag}</span>
            </div>
            <p className="t-micro mt-4">And every decision documented</p>
          </div>
        </div>
      </div>

      <div className="container-x pb-[112px] max-[809px]:pb-20">
        <div className="h-px w-[220px] bg-white/10" aria-hidden="true" />
        <div className="mt-12 grid items-center gap-12 min-[1200px]:grid-cols-[604px_1fr] min-[1200px]:gap-[42px]">
          <div>
            <div className="media relative aspect-[604/508] rounded-[20px]" data-clip>
              <span className="absolute left-5 top-5 z-[2]" aria-hidden="true">
                <LogoMark size={30} light />
              </span>
              <Img src="hostcomm-2" alt="HostComm Summit website — editorial storytelling" sizes="(max-width: 1199px) 100vw, 604px" />
            </div>
            <p className="t-micro mt-4">Designed for reliability, security and performance</p>
          </div>
          <div className="max-w-[560px]">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="var(--color-lilac)" strokeWidth="2" aria-hidden="true" data-reveal>
              <rect x="10" y="10" width="24" height="24" rx="5" />
              <path d="M17 4v6M27 4v6M17 34v6M27 34v6M4 17h6M4 27h6M34 17h6M34 27h6" strokeLinecap="round" />
            </svg>
            <h2 className="t-h2 mt-6" data-split>
              Technology that earns its place in the business.
            </h2>
            <p className="t-lead text-cream-86 mt-6" data-reveal>
              Techatron combines strategy, design and engineering to build software that runs reliably, serves customers better and stays affordable to operate and extend.
            </p>
            <div className="mt-8" data-reveal>
              <Button href="/about/" variant="outline-dark">
                About Techatron
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
