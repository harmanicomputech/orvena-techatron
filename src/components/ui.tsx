'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { TransitionLink } from './TransitionLink';
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/gsap';
import manifest from '@/content/image-manifest.json';

/* ───────── Magnetic behaviour (fine pointers only) */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
}

/* ───────── Button: pill + three dots, hover fill rises from below */
type BtnVariant = 'dark' | 'lilac' | 'sand' | 'cream' | 'yellow' | 'outline-dark';
export function Button({
  href,
  children,
  variant = 'dark',
  className = '',
  type,
  onClick,
  disabled,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}) {
  const ref = useMagnetic<HTMLAnchorElement & HTMLButtonElement>();
  const cls = `btn ${variant === 'dark' ? '' : `btn--${variant}`} ${className}`;
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </>
  );
  if (href)
    return (
      <TransitionLink ref={ref} href={href} className={cls} data-cursor="link" {...rest}>
        {inner}
      </TransitionLink>
    );
  return (
    <button ref={ref} type={type ?? 'button'} className={cls} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}

/* ───────── Eight-point star used across the reference */
export function Star({ size = 32, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M20 0l2.3 13.1L31.3 4l-6.8 11.4L40 20l-15.5 4.6 6.8 11.4-9-9.1L20 40l-2.3-13.1L8.7 36l6.8-11.4L0 20l15.5-4.6L8.7 4l9 9.1z"
      />
    </svg>
  );
}


/* ───────── Responsive image from the optimised manifest (or a static SVG path) */
type ManifestEntry = { width: number; height: number; widths: number[] };
const M = manifest as Record<string, ManifestEntry>;

export function Img({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
  style,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  if (src.startsWith('/')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} style={style} loading={priority ? 'eager' : 'lazy'} decoding="async" />;
  }
  const entry = M[src];
  if (!entry) throw new Error(`Unknown image key: ${src}`);
  const srcSet = entry.widths.map((w) => `/images/work/${src}-${w}.webp ${w}w`).join(', ');
  const fallback = entry.widths.find((w) => w >= 960) ?? entry.widths[entry.widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/work/${src}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}

/* ───────── Marquee band, notched into the dark section below it */
export function MarqueeBand({ items, duration = 46 }: { items: readonly string[]; duration?: number }) {
  const row = [...items, ...items];
  return (
    <div className="band" aria-hidden="true">
      <svg className="band__ear band__ear--l" viewBox="0 0 72 56" preserveAspectRatio="none">
        <path d="M0 0H10C34 0 38 56 70 56H0Z" />
      </svg>
      <svg className="band__ear band__ear--r" viewBox="0 0 72 56" preserveAspectRatio="none">
        <path d="M0 0H10C34 0 38 56 70 56H0Z" />
      </svg>
      <div className="band__track">
        <div className="marquee" style={{ ['--marquee-dur' as string]: `${duration}s` }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex">
              {row.map((t, i) => (
                <span key={i} className="marquee__item">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── Section eyebrow */
export function Eyebrow({ children, variant = '', className = '' }: { children: ReactNode; variant?: string; className?: string }) {
  return (
    <span className={`pill ${variant ? `pill--${variant}` : ''} ${className}`} data-reveal>
      {children}
    </span>
  );
}

/* ───────── Cluster of round project thumbnails + label (replaces stock-portrait clusters) */
const CLUSTER = ['hostcomm-m', 'triumph-m', 'powernest-m', 'keybridge-m'];

export function ThumbCluster({ label, images = CLUSTER, dark = true }: { label: string; images?: string[]; dark?: boolean }) {
  const spots = [
    { size: 96, x: 22, y: 26 },
    { size: 62, x: 78, y: 0 },
    { size: 58, x: 110, y: 52 },
    { size: 100, x: 62, y: 86 },
  ];
  return (
    <div className="relative" style={{ width: 240, height: 196 }} data-reveal>
      {spots.map((s, i) => (
        <span
          key={i}
          className="absolute overflow-hidden rounded-full"
          style={{ width: s.size, height: s.size, left: s.x, top: s.y, boxShadow: '0 0 0 3px rgba(244,241,234,.75)' }}
          data-float={i}
        >
          <Img src={images[i % images.length]} alt="" sizes="100px" className="h-full w-full object-cover object-top" />
        </span>
      ))}
      <span className={`pill ${dark ? 'pill--ink' : 'pill--cream'} absolute`} style={{ left: 128, top: 128, fontSize: 15, padding: '9px 16px' }}>
        {label}
      </span>
    </div>
  );
}
