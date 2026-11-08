import { Button, Eyebrow, Img, MarqueeBand, Star, StarDisc, ThumbCluster } from '../ui';
import { LogoMark } from '../Logo';
import { ProjectCard } from '../ProjectCard';
import { ProcessCards } from '../ProcessCards';
import { ArticleCard } from '../ArticleCard';
import { featuredProjects } from '@/content/projects';
import { services } from '@/content/services';
import { articles } from '@/content/articles';
import { valuesMarquee } from '@/content/site';

export function SelectedWork() {
  return (
    <section className="container-x pt-[152px] pb-[140px] max-[1199px]:pt-28 max-[809px]:pt-20 max-[809px]:pb-24" aria-labelledby="work-title">
      <Eyebrow>Selected work</Eyebrow>
      <div className="mt-5 flex items-end justify-between gap-8">
        <div>
          <h2 id="work-title" className="t-h2" data-split>
            Products engineered to be used.
          </h2>
          <p className="t-lead mt-5 max-w-[560px] text-slate" data-reveal>
            Every project starts with a business problem and ends with software that people and organisations rely on.
          </p>
        </div>
        <StarDisc size={112} className="max-[809px]:hidden" />
      </div>
      <div className="mt-16 grid gap-x-7 gap-y-12 min-[810px]:grid-cols-2 max-[809px]:mt-10 max-[809px]:gap-y-6" data-reveal-group>
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </div>
      <div className="mt-16 flex justify-center" data-reveal>
        <Button href="/work/">View all projects</Button>
      </div>
    </section>
  );
}

const svcTones = [
  { bg: 'var(--color-night)', num: 'var(--color-cream)', title: 'var(--color-cream)', text: 'var(--cream-86)' },
  { bg: 'var(--color-cream)', num: 'var(--color-indigo)', title: 'var(--color-ink)', text: 'var(--color-slate)' },
  { bg: 'var(--color-indigo)', num: 'var(--color-lilac)', title: 'var(--color-lilac)', text: 'rgba(236,230,255,.82)' },
  { bg: 'var(--color-yellow)', num: 'var(--color-ink)', title: 'var(--color-ink)', text: 'var(--color-slate)' },
];

export function ServiceCard({ index, title, text, image }: { index: number; title: string; text: string; image: string }) {
  const t = svcTones[index % 4];
  return (
    <article className="svc-card" style={{ background: t.bg }}>
      <div className="flex items-start justify-between">
        <span className="t-num" style={{ color: t.num }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="svc-card__thumb">
          <Img src={image} alt="" sizes="74px" className="object-top" />
        </span>
      </div>
      <div>
        <h3 className="t-h4" style={{ color: t.title }}>
          {title}
        </h3>
        <p className="mt-3 max-w-[360px]" style={{ color: t.text }}>
          {text}
        </p>
      </div>
    </article>
  );
}

export function WhatWeDo() {
  const core = services.slice(0, 4);
  return (
    <section className="text-indigo" style={{ background: 'var(--color-lilac)' }} aria-labelledby="wwd-title">
      <div className="container-x pt-[150px] pb-[120px] max-[1199px]:pt-28 max-[809px]:pt-20 max-[809px]:pb-20">
        <Eyebrow variant="cream">What we do</Eyebrow>
        <div className="mt-5 flex items-end justify-between gap-8">
          <h2 id="wwd-title" className="t-h2 max-w-[700px]" data-split>
            We make complex technology simple to use, run and grow.
          </h2>
          <StarDisc size={112} bg="var(--color-cream)" className="max-[809px]:hidden" />
        </div>
        <div className="mt-[120px] grid gap-14 min-[1200px]:grid-cols-[454px_1fr] max-[1199px]:mt-16">
          <div className="flex flex-col justify-end">
            <ThumbCluster label="Engineering clarity" />
            <p className="t-mega mt-8" aria-hidden="true" data-reveal>
              04
            </p>
            <p className="mt-3 max-w-[300px]" data-reveal>
              Core disciplines, backed by API, enterprise and consulting expertise.
            </p>
            <div className="mt-6" data-reveal>
              <Button href="/services/" variant="dark">
                All services
              </Button>
            </div>
          </div>
          <div className="grid gap-3 min-[810px]:grid-cols-2" data-reveal-group>
            {core.map((s, i) => (
              <ServiceCard key={s.slug} index={i} title={s.title.replace(' Development', '')} text={s.text} image={s.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section className="relative" aria-labelledby="approach-title">
      <div className="guides" aria-hidden="true" />
      <div className="container-x relative pt-[120px] pb-[140px] max-[809px]:pt-20 max-[809px]:pb-24">
        <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
          <span className="spin-slow" data-reveal>
            <Star size={40} />
          </span>
          <span className="mt-10">
            <Eyebrow>Our approach</Eyebrow>
          </span>
          <h2 id="approach-title" className="t-h3 mt-5" data-split>
            A clear process, built to surface risk early.
          </h2>
          <p className="t-lead mt-5 text-slate" data-reveal>
            Open and accountable: you will always know what we are building, why a decision makes sense, and what comes next.
          </p>
        </div>
        <div className="mt-[88px] max-[809px]:mt-12">
          <ProcessCards />
        </div>
      </div>
    </section>
  );
}

const glance = ['Full-service digital engineering partner', 'Architecture before code', 'Working software, every iteration', 'Built to stay affordable to change'];

export function Snapshot() {
  return (
    <>
      <MarqueeBand items={valuesMarquee} duration={40} />
      <section className="on-dark text-cream" style={{ background: 'var(--color-night)' }} aria-labelledby="snap-title">
        <div className="container-x pt-[128px] pb-[112px] max-[809px]:pt-20 max-[809px]:pb-16">
          <div className="grid gap-14 min-[1200px]:grid-cols-[1fr_1fr]">
            <div>
              <Eyebrow variant="ghost-dark">At a glance</Eyebrow>
              <h2 id="snap-title" className="t-display mt-6 max-w-[560px]" data-split>
                Engineers by training. Partners by habit.
              </h2>
              <p className="t-lead text-cream-86 mt-6 max-w-[480px]" data-reveal>
                Techatron brings strategy, design and engineering together around the problems that matter to your business.
              </p>
              <div className="mt-9" data-reveal>
                <Button href="/about/" variant="yellow">
                  Meet Techatron
                </Button>
              </div>
            </div>
            <ol className="self-start min-[1200px]:pl-[60px]" data-reveal-group>
              {glance.map((g, i) => (
                <li key={g} className="flex items-center gap-5 border-b border-white/10 py-[22px] first:pt-2">
                  <span className="t-meta text-yellow">0{i + 1}</span>
                  <span className="t-card flex-1">{g}</span>
                  <Star size={18} color="var(--color-lilac)" />
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-[112px] h-px bg-white/10 max-[809px]:mt-16" aria-hidden="true" />
          <Conviction />
        </div>
      </section>
    </>
  );
}

function Conviction() {
  return (
    <figure className="mt-[88px] grid items-center gap-14 min-[1200px]:grid-cols-[395px_1fr] min-[1200px]:gap-[60px] max-[809px]:mt-14">
      <div className="relative mx-auto w-full max-w-[395px]" data-reveal>
        <div className="absolute inset-[22px_0_0_28px] rotate-[3deg] rounded-[26px] bg-lilac" aria-hidden="true" />
        <div className="media relative aspect-[395/463] -rotate-[3deg] overflow-hidden rounded-[26px]" data-parallax="0.04">
          <Img src="kwoat-m" alt="Kwoat AI on mobile" sizes="395px" />
        </div>
        <span className="pill pill--yellow absolute -left-2 bottom-12 -rotate-[6deg]">Kwoat AI</span>
      </div>
      <div>
        <span data-reveal className="block w-fit">
          <Star size={44} color="var(--color-yellow)" className="spin-slow" />
        </span>
        <blockquote className="t-quote mt-8 max-w-[900px]" data-split>
          “We measure our work by what it changes for the business: processes that run reliably, customers who are better served, and systems that stay affordable to operate.”
        </blockquote>
        <figcaption className="mt-9 flex items-center gap-4" data-reveal>
          <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-cream">
            <LogoMark size={30} />
          </span>
          <span>
            <span className="block text-[19px] font-medium tracking-[-0.02em]">Techatron Consulting</span>
            <span className="t-meta text-cream-56 block">What we believe</span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export function InsightsTeaser() {
  return (
    <section className="container-x pt-[150px] pb-[100px] max-[809px]:pt-20 max-[809px]:pb-16" aria-labelledby="ins-title">
      <Eyebrow>Insights</Eyebrow>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2 id="ins-title" className="t-h4 max-w-[740px]" data-split>
          Notes on engineering, product building and the decisions that make software last.
        </h2>
        <span data-reveal>
          <Button href="/insights/" variant="sand">
            Read our insights
          </Button>
        </span>
      </div>
      <div className="mt-12 grid gap-4 min-[810px]:grid-cols-2 xl:grid-cols-3" data-reveal-group>
        {articles.slice(0, 3).map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
