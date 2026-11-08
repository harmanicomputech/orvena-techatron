'use client';

import { useRef, useState, type ReactNode } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/** Accessible filter chips + grid. Items fade/scale out, the grid re-flows, new items rise in. */
export function FilterGrid<T>({
  items,
  filters,
  match,
  render,
  getKey,
  gridClass,
  label,
}: {
  items: T[];
  filters: ReadonlyArray<{ id: string; label: string }>;
  match: (item: T, filter: string) => boolean;
  render: (item: T, index: number) => ReactNode;
  getKey: (item: T) => string;
  gridClass: string;
  label: string;
}) {
  const [active, setActive] = useState(filters[0].id);
  const [shown, setShown] = useState(active);
  const grid = useRef<HTMLDivElement>(null);
  const visible = items.filter((i) => match(i, shown));

  const choose = (id: string) => {
    if (id === active) return;
    setActive(id);
    const el = grid.current;
    if (!el || prefersReducedMotion()) {
      setShown(id);
      return;
    }
    gsap.to(el.children, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.35,
      stagger: 0.03,
      ease: 'soft',
      onComplete: () => {
        setShown(id);
        requestAnimationFrame(() => {
          gsap.fromTo(el.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.06, ease: 'expo' });
          ScrollTrigger.refresh();
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={label}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => choose(f.id)}
            aria-pressed={active === f.id}
            className={`pill !text-[15px] transition-colors duration-300 ${active === f.id ? 'pill--ink' : 'hover:bg-sand-deep'}`}
          >
            {active === f.id && <i className="inline-block h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />}
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'item' : 'items'} shown
      </p>
      <div ref={grid} className={gridClass}>
        {visible.map((item, i) => (
          <div key={getKey(item)}>{render(item, i)}</div>
        ))}
      </div>
    </>
  );
}
