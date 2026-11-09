'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { WORDMARK_PATH } from '@/content/logo-path';
import { Img, MarqueeBand } from './ui';
import { TransitionLink } from './TransitionLink';
import { disciplinesMarquee, navWithContact, site } from '@/content/site';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

const pills = [
  { label: 'Custom Software', bg: 'var(--color-yellow)', x: 0.17, rot: -6 },
  { label: 'Mobile Apps', bg: 'var(--color-sand)', x: 0.43, rot: 7 },
  { label: 'AI Integration', bg: 'var(--color-lilac)', x: 0.73, rot: -4 },
];

export function Footer() {
  const pathname = usePathname();
  const stage = useRef<HTMLDivElement>(null);

  // Pills fall onto the wordmark with a bounce when the footer comes into view, and can be
  // nudged with the pointer afterwards.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('.footer-pill'));
    const place = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      items.forEach((p, i) => {
        const cfg = pills[i];
        gsap.set(p, { x: cfg.x * w - p.offsetWidth / 2, y: h * (i === 1 ? 0.02 : 0.42) });
      });
    };
    place();
    if (prefersReducedMotion()) {
      items.forEach((p, i) => gsap.set(p, { rotate: pills[i].rot }));
      window.addEventListener('resize', place);
      return () => window.removeEventListener('resize', place);
    }
    const ctx = gsap.context(() => {
      items.forEach((p, i) => {
        gsap.fromTo(
          p,
          { yPercent: -900, rotate: pills[i].rot * -4, opacity: 0 },
          {
            yPercent: 0,
            rotate: pills[i].rot,
            opacity: 1,
            duration: 1.6,
            delay: 0.15 * i,
            ease: 'bounce.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        );
      });
    }, el);
    const nudge = (e: PointerEvent) => {
      items.forEach((p, i) => {
        const r = p.getBoundingClientRect();
        const dx = r.left + r.width / 2 - e.clientX;
        const dy = r.top + r.height / 2 - e.clientY;
        const d = Math.hypot(dx, dy);
        if (d < 140) {
          gsap.to(p, { rotate: pills[i].rot + (dx > 0 ? 10 : -10), duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
          gsap.to(p, { rotate: pills[i].rot, duration: 1.2, delay: 0.5, ease: 'elastic.out(1, 0.3)' });
        }
      });
    };
    el.addEventListener('pointermove', nudge);
    window.addEventListener('resize', place);
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      el.removeEventListener('pointermove', nudge);
      window.removeEventListener('resize', place);
    };
  }, []);

  const linkCls = 'text-cream-86 transition-colors duration-300 hover:text-yellow';

  return (
    <footer className="bg-night on-dark relative text-cream" style={{ background: 'var(--color-night)', color: 'var(--color-cream)' }}>
      <MarqueeBand items={disciplinesMarquee} duration={52} />

      <div className="container-x pt-[88px] max-[809px]:pt-16">
        <div className="grid gap-12 border-b border-white/10 pb-12 min-[810px]:grid-cols-[minmax(0,460px)_1fr] min-[810px]:gap-0">
          <div className="min-[810px]:border-r min-[810px]:border-white/10 min-[810px]:pr-8">
            <TransitionLink href="/" aria-label="Techatron — home" className="inline-block">
              <Logo light height={30} />
            </TransitionLink>
            <dl className="mt-10 grid grid-cols-2 gap-6 max-w-[360px]">
              {site.hubs.map((h) => (
                <div key={h.city}>
                  <dt className="t-micro text-cream-56">Operations hub</dt>
                  <dd className="mt-1.5 text-[19px] tracking-[-0.02em]">
                    {h.city}
                    <span className="block text-[15px] text-cream-56">{h.country}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="min-[810px]:pl-8 xl:pl-0 xl:-ml-[0px]">
            <p className="t-h4 max-w-[640px]">
              Techatron is a digital engineering company for businesses that run on technology.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href={`mailto:${site.email}`} className="t-h4 text-cream-86 transition-colors hover:text-yellow" style={{ fontSize: 'min(var(--fs-h4), 7.4vw)' }}>
                {site.email}
              </a>
              <span className="flex -space-x-3" aria-hidden="true">
                {['photo-notes', 'photo-creator', 'photo-review'].map((k) => (
                  <span key={k} className="block h-[46px] w-[46px] overflow-hidden rounded-full ring-2 ring-[var(--color-night)]">
                    <Img src={k} alt="" sizes="46px" className="h-full w-full object-cover" />
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-14 min-[810px]:grid-cols-[1.5fr_1fr_1fr] t-body">
          <div className="max-w-[340px]">
            <p>{site.legalName}</p>
            <p className="text-cream-56 mt-1.5">
              Digital engineering and technology consulting. Software, web and mobile applications, AI and enterprise platforms.
            </p>
            <address className="text-cream-56 mt-4 grid gap-1 not-italic">
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                Lagos, Nigeria — {site.address.street}, {site.address.locality}
              </a>
              <span>Delaware, United States</span>
              <span className="text-cream-86">{site.reach}</span>
            </address>
          </div>
          <nav aria-label="Footer">
            <p>Navigation</p>
            <ul className="mt-2 grid gap-2">
              {[{ label: 'Home', href: '/' }, ...navWithContact].map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className={`${linkCls} ${pathname === n.href ? '!text-yellow' : ''}`}>
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p>Connect</p>
            <ul className="mt-2 grid gap-2">
              <li>
                <a href={`mailto:${site.email}`} className={linkCls}>
                  {site.email}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={linkCls}>
                    {p.label}
                  </a>
                </li>
              ))}
              {site.social.slice(0, 3).map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {s.label} <span className="text-cream-56">— {s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={stage} className="relative select-none" aria-hidden="true">
          <svg viewBox="40 170 3095 342" className="block w-full" style={{ marginTop: 'clamp(40px, 8vw, 120px)' }}>
            <path fill="var(--color-cream)" d={WORDMARK_PATH} />
          </svg>
          {pills.map((p) => (
            <span key={p.label} className="pill footer-pill" style={{ background: p.bg, color: 'var(--color-ink)', fontSize: 'clamp(12px, 1.3vw, 17px)' }}>
              {p.label}
            </span>
          ))}
        </div>
        <p className="t-meta text-cream-56 py-6 text-center">© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
