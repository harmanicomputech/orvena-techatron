import { PageHero } from '@/components/PageHero';
import { Button, Eyebrow, Img, MarqueeBand, Star, StarDisc } from '@/components/ui';
import { ProcessCards } from '@/components/ProcessCards';
import { CtaPanel } from '@/components/CtaPanel';
import { services } from '@/content/services';
import { engagements, site } from '@/content/site';
import { JsonLd, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Services',
  description:
    'Custom software, web and mobile applications, digital product engineering, AI and intelligent systems, enterprise solutions, APIs and integrations, and technology consulting from Techatron.',
  path: '/services/',
});

const tones = [
  { bg: 'var(--color-night)', num: 'var(--color-cream)', fg: 'var(--color-cream)', sub: 'var(--cream-86)', rule: 'rgba(244,241,234,.14)' },
  { bg: 'var(--color-indigo)', num: 'var(--color-lilac)', fg: 'var(--color-lilac)', sub: 'rgba(236,230,255,.82)', rule: 'rgba(200,182,255,.2)' },
  { bg: 'var(--color-yellow)', num: 'var(--color-ink)', fg: 'var(--color-ink)', sub: 'var(--color-slate)', rule: 'rgba(17,18,24,.12)' },
  { bg: 'var(--color-lilac)', num: 'var(--color-indigo)', fg: 'var(--color-indigo)', sub: 'var(--color-indigo)', rule: 'rgba(43,26,115,.18)' },
];

const servicesLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'Service', name: s.title, description: s.text, provider: { '@id': `${site.url}/#organization` }, url: `${site.url}/services/#${s.slug}` },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesLd} />
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }])} />
      <PageHero
        eyebrow="Services"
        title="The right engineering support for what you’re building next."
        text="Whether you are building from the ground up or modernising what you already run, we shape a scope around your goals."
        tag="Scoped around you"
      >
        <Button href="/contact/">Request a proposal</Button>
        <Button href="/work/" variant="lilac">
          See our work
        </Button>
      </PageHero>

      <section className="container-x pb-[140px] max-[809px]:pb-20" aria-labelledby="ways">
        <Eyebrow>Engagement types</Eyebrow>
        <h2 id="ways" className="t-h4 mt-5" data-split>
          Three ways to work together.
        </h2>
        <div className="mt-10 grid gap-4 xl:grid-cols-3" data-reveal-group>
          {engagements.slice(0, 3).map((e, i) => {
            const t = [tones[0], { ...tones[1], bg: 'var(--color-lilac)', num: 'var(--color-indigo)', fg: 'var(--color-indigo)', sub: 'var(--color-indigo)', rule: 'rgba(43,26,115,.18)' }, { ...tones[3], bg: '#fff' }][i];
            return (
              <article key={e.title} className="flex min-h-[400px] flex-col rounded-[26px] p-7" style={{ background: t.bg, color: t.fg }}>
                <div className="flex items-start justify-between">
                  <span className="t-num" style={{ color: t.num }}>
                    0{i + 1}
                  </span>
                  <Star size={24} color={i === 2 ? 'var(--color-orange)' : t.num} />
                </div>
                <h3 className="t-h4 mt-auto pt-12">{e.title}</h3>
                <p className="mt-3" style={{ color: t.sub }}>
                  {e.text}
                </p>
                <div className="mt-6 border-t pt-4" style={{ borderColor: t.rule }}>
                  <p className="t-micro opacity-70">Typically includes</p>
                  <p className="mt-2 text-[15px]" style={{ color: t.sub }}>
                    {e.includes.join(' · ')}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="disciplines">
        <div className="container-x py-[140px] max-[809px]:py-20">
          <Eyebrow>What we do</Eyebrow>
          <div className="mt-5 flex items-end justify-between gap-8">
            <h2 id="disciplines" className="t-h2 max-w-[700px]" data-split>
              Eight disciplines, one accountable team.
            </h2>
            <StarDisc size={104} className="max-[809px]:hidden" />
          </div>
          <div className="mt-14 grid gap-3 min-[810px]:grid-cols-2" data-reveal-group>
            {services.map((s, i) => {
              const t = tones[i % 4];
              return (
                <article key={s.slug} id={s.slug} className="scroll-mt-28 flex min-h-[360px] flex-col rounded-[26px] p-7 max-[809px]:min-h-0" style={{ background: t.bg, color: t.fg }}>
                  <div className="flex items-start justify-between">
                    <span className="t-num" style={{ color: t.num }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="svc-card__thumb">
                      <Img src={s.image} alt="" sizes="74px" className="object-top" />
                    </span>
                  </div>
                  <h3 className="t-h4 mt-auto pt-12">{s.title}</h3>
                  <p className="mt-3 max-w-[520px]" style={{ color: t.sub }}>
                    {s.text}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t pt-4 text-[14px]" style={{ borderColor: t.rule, color: t.sub }}>
                    {s.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <MarqueeBand items={['Every project is scoped', 'Goals', 'Complexity', 'Timeline', 'Written proposal', 'No obligation']} duration={38} />
      <section className="on-dark text-cream" style={{ background: 'var(--color-night)' }} aria-labelledby="pricing">
        <div className="container-x pt-[110px] pb-[120px] max-[809px]:pt-16 max-[809px]:pb-20">
          <div className="flex justify-between gap-6 border-b border-white/10 pb-8">
            <p className="t-micro">Pricing note</p>
            <p className="t-micro text-right">Tailored to every brief</p>
          </div>
          <div className="mt-14 grid items-end gap-10 min-[1200px]:grid-cols-[1.2fr_1fr]">
            <h2 id="pricing" className="t-display max-w-[640px]" data-split>
              Every project is scoped around its goals, complexity and timeline.
            </h2>
            <div className="min-[1200px]:pl-[60px]" data-reveal>
              <p className="t-lead text-cream-86 max-w-[440px]">
                Share a little about what you need. We will reply with a clear written proposal: scope, approach, timeline and cost, with the assumptions stated plainly.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact/" variant="yellow">
                  Request a proposal
                </Button>
                <Button href={`mailto:${site.email}`} variant="outline-dark">
                  {site.email}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative" aria-labelledby="approach">
        <div className="guides" aria-hidden="true" />
        <div className="container-x relative py-[140px] max-[809px]:py-20">
          <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
            <Eyebrow>Our approach</Eyebrow>
            <h2 id="approach" className="t-h3 mt-5" data-split>
              A clear process, built to surface risk early.
            </h2>
          </div>
          <div className="mt-[72px]">
            <ProcessCards />
          </div>
        </div>
      </section>

      <CtaPanel title="Ready to shape a scope around your goals?" primary={{ label: 'Request a proposal', href: '/contact/' }} text="Tell us what you are building and we will prepare a tailored proposal." />
    </>
  );
}
