'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Button } from './ui';
import { TransitionLink } from './TransitionLink';
import { nav, navWithContact, site } from '@/content/site';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useLenis } from './motion/SmoothScroll';

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // Entrance: the bar settles in with the hero choreography.
  useEffect(() => {
    if (prefersReducedMotion() || !header.current) return;
    gsap.from(header.current.querySelectorAll('[data-nav-in]'), { y: -24, opacity: 0, duration: 1.1, stagger: 0.07, delay: 0.1 });
  }, []);

  // Hide while scrolling down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Menu animation, scroll lock, focus management and Escape.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const links = el.querySelectorAll('[data-menu-item]');
    const reduce = prefersReducedMotion();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      gsap.set(el, { visibility: 'visible' });
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduce ? 0 : 0.8, ease: 'expo' });
      gsap.fromTo(links, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: reduce ? 0 : 0.9, stagger: 0.05, delay: reduce ? 0 : 0.15 });
      (links[0] as HTMLElement | undefined)?.querySelector('a')?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: reduce ? 0 : 0.6,
        ease: 'soft',
        onComplete: () => {
          gsap.set(el, { visibility: 'hidden' });
        },
      });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, lenis]);

  return (
    <>
      <header ref={header} className={`site-header ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="container-x site-header__inner">
          <TransitionLink href="/" aria-label="Techatron — home" className="justify-self-start" data-nav-in>
            <Logo />
          </TransitionLink>

          <nav aria-label="Primary" className="hidden xl:block" data-nav-in>
            <ul className="nav-links">
              {nav.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className="nav-link" aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-3" data-nav-in>
            <Button href="/contact/" className="hidden xl:inline-flex">
              Start a project
            </Button>
            <button
              ref={toggle}
              type="button"
              className="menu-toggle xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="grid gap-[5px]">
                <span style={{ width: 16, transform: open ? 'translateY(3.25px) rotate(45deg)' : 'none' }} />
                <span style={{ width: open ? 16 : 10, transform: open ? 'translateY(-3.25px) rotate(-45deg)' : 'none', marginLeft: open ? 0 : 6 }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div ref={menu} id="mobile-menu" className="mobile-menu xl:hidden" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile" className="container-x">
          <ul>
            {navWithContact.map((n, i) => (
              <li key={n.href} data-menu-item>
                <TransitionLink href={n.href} className="mobile-menu__link" aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
                  {n.label}
                  <small>0{i + 1}</small>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x mt-auto pb-8" data-menu-item>
          <div className="grid gap-4">
            <Button href="/contact/" className="w-fit">
              Start a project
            </Button>
            <a href={`mailto:${site.email}`} className="t-meta text-slate">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
