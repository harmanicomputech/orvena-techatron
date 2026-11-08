'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/gsap';

/**
 * Contextual cursor for fine pointers: a small dot that grows over links and becomes a labelled
 * yellow disc over elements with data-cursor-label (e.g. "View" on project cards).
 * Never rendered on touch devices or for reduced-motion users; the native cursor is kept.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      el.style.opacity = '1';
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor-label]');
      if (labelled) {
        el.classList.add('is-label');
        el.classList.remove('is-link');
        setLabel(labelled.dataset.cursorLabel || '');
      } else {
        el.classList.remove('is-label');
        el.classList.toggle('is-link', !!t.closest('a, button, [data-cursor="link"], input, select, textarea, label'));
      }
    };
    const leave = () => (el.style.opacity = '0');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}
