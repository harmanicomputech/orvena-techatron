import { notFound } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import { Button, Eyebrow, Img, MarqueeBand, Star } from '@/components/ui';
import { ProjectCard } from '@/components/ProjectCard';
import { CtaPanel } from '@/components/CtaPanel';
import { JsonLd, breadcrumbLd, pageMeta, projectLd } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} — ${p.category.replace(' / ', ' · ')}`, description: p.summary, path: `/work/${p.slug}/` });
}

const isPortrait = (src: string) => src.endsWith('-m') || src.includes('mobile');

export default async function CaseStudy({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = [projects[(idx + 1) % projects.length], projects[(idx + 2) % projects.length]];
  const landscape = p.images.gallery.filter((g) => !isPortrait(g.src));
  const portrait = p.images.gallery.find((g) => isPortrait(g.src));

  const meta = [
    { k: 'Category', v: p.category },
    { k: 'Client', v: p.client },
    { k: 'Techatron’s role', v: p.contribution.join(', ') },
  ];

  const story = [
    { n: '01', title: 'The challenge', text: p.challenge, bg: 'var(--color-night-card)', fg: 'var(--color-cream)', sub: 'var(--cream-86)', star: 'var(--color-lilac)' },
    { n: '02', title: 'The approach', text: p.approach, bg: 'var(--color-lilac)', fg: 'var(--color-indigo)', sub: 'var(--color-indigo)', star: 'var(--color-indigo)' },
    { n: '03', title: 'The outcome', text: p.outcome, bg: 'var(--color-yellow)', fg: 'var(--color-ink)', sub: 'var(--color-slate)', star: 'var(--color-ink)' },
  ];

  return (
    <>
      <JsonLd data={projectLd(p)} />
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }, { name: p.name, path: `/work/${p.slug}/` }])} />

      <section className="relative">
        <div className="guides" aria-hidden="true" />
        <div className="container-x relative pt-[100px] max-[809px]:pt-14">
          <div className="flex flex-col items-center text-center">
            <span className="pill" data-reveal>
              {p.category}
            </span>
            <h1 className="t-h1 mt-6" data-split>
              {p.name}
            </h1>
            <p className="t-h4 mt-4 text-grey" data-reveal>
              {p.tagline}
            </p>
          </div>

          <dl className="mt-20 grid gap-6 border-t border-[rgba(17,18,24,.1)] pt-6 min-[810px]:grid-cols-4 max-[809px]:mt-12 max-[809px]:grid-cols-2" data-reveal-group>
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="t-micro text-grey">{m.k}</dt>
                <dd className="mt-2 max-w-[260px]">{m.v}</dd>
              </div>
            ))}
            <div>
              <dt className="t-micro text-grey">Live product</dt>
              <dd className="mt-2">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[rgba(17,18,24,.25)] underline-offset-4 hover:decoration-ink">
                    {p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                  </a>
                ) : (
                  'Private deployment'
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="container-x relative mt-16 pb-6 max-[809px]:mt-10">
          <div className="relative mx-auto max-w-[1180px]">
            <div className="absolute inset-[4%_-1.5%_-3%_1.5%] rotate-[2deg] rounded-[34px] bg-lilac" aria-hidden="true" />
            <div className="relative -rotate-[1.2deg] rounded-[34px] bg-night-card p-[10px] shadow-[0_50px_100px_-50px_rgba(17,18,24,.5)]" data-reveal>
              <div className="media aspect-[1440/1065] rounded-[26px]" data-clip>
                <Img src={p.images.cover} alt={`${p.name} — ${p.tagline}`} sizes="(max-width: 1199px) 100vw, 1180px" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-[140px] max-[809px]:py-20" aria-labelledby="overview">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <span data-reveal>
            <Star size={40} color="var(--color-orange)" className="spin-slow" />
          </span>
          <span className="mt-8">
            <Eyebrow>Project overview</Eyebrow>
          </span>
          <h2 id="overview" className="sr-only">
            Project overview
          </h2>
          <p className="t-h4 mt-6" data-split>
            {p.overview}
          </p>
        </div>
      </section>

      <MarqueeBand items={['Discovery', 'Architecture', 'Engineering', 'Integration', 'Quality', 'Launch']} duration={36} />
      <section className="on-dark text-cream" style={{ background: 'var(--color-night)' }} aria-labelledby="story">
        <div className="container-x pt-[110px] pb-[120px] max-[809px]:pt-16 max-[809px]:pb-20">
          <div className="flex justify-between gap-6 border-b border-white/10 pb-8">
            <h2 id="story" className="t-micro">
              How the work came together
            </h2>
            <p className="t-micro text-right" aria-hidden="true">
              Challenge — Approach — Outcome
            </p>
          </div>
          <div className="mt-12 grid gap-4 min-[1200px]:grid-cols-3" data-reveal-group>
            {story.map((s) => (
              <article key={s.n} className="flex min-h-[420px] flex-col justify-between rounded-[24px] p-7 max-[809px]:min-h-0 max-[809px]:gap-12" style={{ background: s.bg, color: s.fg }}>
                <div className="flex items-start justify-between">
                  <span className="t-num">{s.n}</span>
                  <Star size={22} color={s.star} />
                </div>
                <div>
                  <h3 className="t-card">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: s.sub }}>
                    {s.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-[110px] grid gap-14 min-[1200px]:grid-cols-[1fr_1.25fr] max-[809px]:mt-16">
            <div>
              <Eyebrow variant="ghost-dark">What we built</Eyebrow>
              <h2 className="t-h2 mt-6 max-w-[480px]" data-split>
                The resulting digital experience.
              </h2>
              <div className="mt-10 grid gap-8" data-reveal>
                <div>
                  <p className="t-micro text-cream-56">Techatron’s contribution</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.contribution.map((c) => (
                      <li key={c} className="pill pill--ghost-dark !text-[15px]">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                {p.technologies && (
                  <div>
                    <p className="t-micro text-cream-56">Technologies{p.technologies.note ? ` · ${p.technologies.note}` : ''}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {p.technologies.items.map((t) => (
                        <li key={t} className="pill pill--lilac !text-[15px]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <ol data-reveal-group>
              {p.features.map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[40px_1fr] gap-x-4 border-b border-white/10 py-6 first:pt-0">
                  <span className="t-meta pt-1.5 text-yellow">0{i + 1}</span>
                  <div>
                    <h3 className="t-card">{title}</h3>
                    <p className="text-cream-56 mt-2">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-x pt-[140px] max-[809px]:pt-20" aria-labelledby="gallery">
        <Eyebrow>Project gallery</Eyebrow>
        <h2 id="gallery" className="t-h4 mt-5" data-split>
          Selected moments from the work.
        </h2>
        <div className="mt-10 grid gap-x-7 gap-y-10">
          {landscape.map((g, i) => (
            <figure key={g.src + i}>
              <div className="media media--light aspect-[16/10] rounded-[24px]" data-clip>
                <Img src={g.src} alt={`${p.name}: ${g.caption}`} sizes="(max-width: 1199px) 100vw, 1312px" />
              </div>
              <figcaption className="t-meta mt-4 flex items-center gap-3">
                <span className="pill pill--ink !px-3 !py-1.5 !text-[13px]">0{i + 1}</span>
                {g.caption}
              </figcaption>
            </figure>
          ))}
          {portrait && (
            <figure className="grid items-center gap-8 rounded-[30px] bg-sand p-8 min-[810px]:grid-cols-[1fr_340px] max-[809px]:p-4">
              <p className="t-h4 max-w-[460px]" data-split>
                {portrait.caption}
              </p>
              <div className="media mx-auto aspect-[390/844] w-full max-w-[340px] rounded-[34px] border-[8px] border-night-card" data-clip>
                <Img src={portrait.src} alt={`${p.name} on mobile`} sizes="340px" />
              </div>
            </figure>
          )}
        </div>
      </section>

      <section className="container-x pt-[140px] pb-12 max-[809px]:pt-20" aria-labelledby="next">
        <Eyebrow>Next project</Eyebrow>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 id="next" className="t-h4" data-split>
            Continue exploring the work.
          </h2>
          <span data-reveal>
            <Button href="/work/" variant="sand">
              Back to all projects
            </Button>
          </span>
        </div>
        <div className="mt-10 grid gap-7 min-[810px]:grid-cols-2" data-reveal-group>
          {next.map((n) => (
            <ProjectCard key={n.slug} project={n} />
          ))}
        </div>
      </section>
      <CtaPanel title="Have a project with a point of view? We would love to hear about it." primary={{ label: 'Start a project', href: '/contact/' }} />
    </>
  );
}
