'use client';

import { useRef } from 'react';
import { useStickySteps } from '@/lib/useStickySteps';

const beliefs = [
  { word: 'Clarity', text: 'The simplest system that reliably meets the need is almost always the right one.' },
  { word: 'Honesty', text: 'We say early when something is risky, unnecessary or better bought than built.' },
  { word: 'Quality', text: 'Reviews, tests and documentation are part of every change, not a phase at the end.' },
  { word: 'Longevity', text: 'Software creates value in use, so we plan for operating and improving it from day one.' },
];

export function Beliefs() {
  const pin = useRef<HTMLDivElement>(null);
  const active = useStickySteps(pin, beliefs.length, 0.35);
  return (
    <section className="on-dark text-cream" style={{ background: 'var(--color-night)' }} aria-labelledby="beliefs-title">
      <div className="container-x pt-[72px] max-[809px]:pt-14">
        <div className="flex justify-between gap-8 border-b border-white/10 pb-8">
          <h2 id="beliefs-title" className="t-micro">
            Our belief
          </h2>
          <p className="t-micro max-w-[220px] text-right">Thoughtful and useful, in equal measure</p>
        </div>
      </div>
      <div ref={pin} className="container-x">
        <div className="grid items-center gap-10 py-[120px] max-[1199px]:py-16 min-[1200px]:grid-cols-[272px_1fr_420px] max-[1199px]:min-h-0 max-[1199px]:grid-cols-[120px_1fr] max-[1199px]:pb-24">
          <p className="self-start pt-10 text-[44px] leading-none tracking-[-0.03em] text-yellow max-[809px]:text-[26px]" aria-hidden="true">
            0{active + 1}
          </p>
          <ul className="sr-only">
            {beliefs.map((b) => (
              <li key={b.word}>
                {b.word}: {b.text}
              </li>
            ))}
          </ul>
          <ul className="grid" aria-hidden="true">
            {beliefs.map((b, i) => (
              <li key={b.word}>
                <span className={`word-list__word ${i === active ? 'is-active' : ''}`} data-text={b.word} data-num={`0${i + 1}`} />
              </li>
            ))}
          </ul>
          <div className="max-[1199px]:col-span-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--color-lilac)" strokeWidth="2" aria-hidden="true">
              <path d="M20 4a11 11 0 0 0-6 20.2V29h12v-4.8A11 11 0 0 0 20 4zM15 34h10M17 38h6" strokeLinecap="round" />
            </svg>
            <p className="t-h4 mt-6" aria-hidden="true">
              {beliefs[active].text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
