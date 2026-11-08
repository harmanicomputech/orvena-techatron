import type { ReactNode } from 'react';

/** Centred inner-page hero used by Work, About, Services, Insights and Contact (reference layout). */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
  tag,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
  tag?: string;
}) {
  return (
    <section className="relative">
      <div className="guides" aria-hidden="true" />
      <div className="container-x relative flex flex-col items-center pt-[100px] pb-[64px] text-center max-[809px]:pt-14 max-[809px]:pb-10">
        <span className="pill" data-reveal>
          {eyebrow}
        </span>
        <h1 className="t-h1 mt-6 max-w-[920px] !text-[min(var(--fs-h1),max(42px,5.4vw))]" data-split>
          {title}
        </h1>
        <p className="t-lead mt-6 max-w-[560px] text-slate" data-reveal>
          {text}
        </p>
        {children && (
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            {children}
          </div>
        )}
        {tag && (
          <span className="pill pill--lilac mt-6 rotate-[3deg] !text-[15px]" data-reveal>
            {tag}
          </span>
        )}
      </div>
    </section>
  );
}
