import { PageHero } from '@/components/PageHero';
import { Button, Eyebrow, Img, MarqueeBand, Star, StarDisc } from '@/components/ui';
import { ServiceCard } from '@/components/home/Sections';
import { ProcessCards } from '@/components/ProcessCards';
import { CtaPanel } from '@/components/CtaPanel';
import { Beliefs } from './Beliefs';
import { convictions, engagements, standards, valuesMarquee } from '@/content/site';
import { JsonLd, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About',
  description:
    'Techatron Consulting Limited is a digital engineering studio in Lagos that thinks like an engineer and acts like a partner. Our convictions, standards and ways of working.',
  path: '/about/',
});

const standardImages = ['powernest-2', 'command-c', 'kwoat-3', 'resolvr-3'];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])} />
      <PageHero
        eyebrow="About Techatron"
        title="A studio that thinks like an engineer and acts like a partner."
        text="Techatron Consulting Limited is a digital engineering and technology consulting company in Lagos. We design, build and grow the software that businesses depend on."
      >
        <Button href="/contact/">Let’s talk</Button>
        <Button href="/work/" variant="lilac">
          See our work
        </Button>
      </PageHero>

      <section className="container-x pb-[120px] max-[809px]:pb-20" aria-label="Recent work">
        <div className="grid grid-cols-3 gap-4 max-[809px]:grid-cols-[1fr_1fr] max-[809px]:gap-2.5" data-reveal-group>
          {['triumph-2', 'keybridge-c', 'resolvr-2'].map((k, i) => (
            <div key={k} className={`media media--light aspect-[4/3] rounded-[20px] ${i === 1 ? 'translate-y-6 max-[809px]:translate-y-0' : ''} ${i === 2 ? 'max-[809px]:hidden' : ''}`}>
              <Img src={k} alt="" sizes="(max-width: 809px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-[140px] max-[809px]:pb-20" aria-labelledby="who">
        <div className="grid gap-12 min-[1200px]:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="who" className="t-h2 mt-5 max-w-[520px]" data-split>
              Technology that earns its place in the business.
            </h2>
          </div>
          <div className="t-lead grid gap-5 text-slate" data-reveal>
            <p>
              Techatron specialises in custom software, web applications and mobile apps. Around that engineering core sits everything a digital product needs to succeed:
              product and interface design, AI and systems integration, the cloud infrastructure it runs on, and the support that keeps it working.
            </p>
            <p>
              We measure our work by what it changes for the business: processes that run reliably, customers who are better served, and systems that remain affordable to
              operate and extend. That is why we spend as much time understanding the problem, and on what happens after launch, as we do writing code.
            </p>
          </div>
        </div>
      </section>

      <MarqueeBand items={valuesMarquee} duration={40} />
      <Beliefs />

      <section className="text-indigo" style={{ background: 'var(--color-lilac)' }} aria-labelledby="conv-title">
        <div className="container-x py-[140px] max-[809px]:py-20">
          <Eyebrow variant="cream">What makes Techatron</Eyebrow>
          <div className="mt-5 flex items-end justify-between gap-8">
            <h2 id="conv-title" className="t-h2 max-w-[640px]" data-split>
              Four convictions behind every project.
            </h2>
            <StarDisc size={104} bg="var(--color-cream)" className="max-[809px]:hidden" />
          </div>
          <div className="mt-14 grid gap-3 min-[810px]:grid-cols-2 xl:grid-cols-4" data-reveal-group>
            {convictions.map((c, i) => (
              <ServiceCard key={c.title} index={i} title={c.title} text={c.text} image={['kwoat-c', 'comono-c', 'resolvr-c', 'powernest-m'][i]} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative" aria-labelledby="process-title">
        <div className="guides" aria-hidden="true" />
        <div className="container-x relative py-[140px] max-[809px]:py-20">
          <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
            <Eyebrow>How we deliver</Eyebrow>
            <h2 id="process-title" className="t-h3 mt-5" data-split>
              We keep the process open, focused and accountable.
            </h2>
            <p className="t-lead mt-5 text-slate" data-reveal>
              Built to surface risk early, when it is cheapest to deal with, and to keep you in control of scope, budget and quality throughout.
            </p>
          </div>
          <div className="mt-[72px]">
            <ProcessCards />
          </div>
        </div>
      </section>

      <section className="container-x pb-[140px] max-[809px]:pb-20" aria-labelledby="std-title">
        <Eyebrow>Engineering standards</Eyebrow>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="std-title" className="t-h4" data-split>
              What we design for.
            </h2>
            <p className="mt-3 max-w-[440px] text-slate" data-reveal>
              Qualities we consider from the first conversation, whatever the size of the project.
            </p>
          </div>
          <span data-reveal>
            <Button href="/contact/">Work with us</Button>
          </span>
        </div>
        <div className="mt-10 grid gap-4 min-[810px]:grid-cols-2 xl:grid-cols-4" data-reveal-group>
          {standards.map((s, i) => (
            <article key={s.title}>
              <div className="media media--light relative aspect-[4/5] rounded-[22px]">
                <Img src={standardImages[i]} alt="" sizes="(max-width: 809px) 100vw, 25vw" />
                <span className="pill pill--yellow absolute bottom-4 left-4 !text-[15px]">{s.title}</span>
              </div>
              <p className="mt-4 text-grey">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="on-dark text-cream" style={{ background: 'var(--color-night)' }} aria-labelledby="engage-title">
        <div className="container-x py-[120px] max-[809px]:py-20">
          <div className="flex justify-between gap-8 border-b border-white/10 pb-8">
            <h2 id="engage-title" className="t-micro">
              Ways to engage
            </h2>
            <p className="t-micro text-right">Pick the model that fits the work</p>
          </div>
          <ol className="mt-4" data-reveal-group>
            {engagements.map((e, i) => (
              <li key={e.title} className="grid gap-4 border-b border-white/10 py-8 min-[1200px]:grid-cols-[80px_1fr_1fr_40px] min-[1200px]:items-center">
                <span className="t-meta text-yellow">0{i + 1}</span>
                <div>
                  <p className="t-micro text-cream-56">{e.kicker}</p>
                  <h3 className="t-h4 mt-2">{e.title}</h3>
                </div>
                <p className="text-cream-86 max-w-[460px]">{e.text}</p>
                <Star size={18} color="var(--color-lilac)" className="max-[1199px]:hidden" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaPanel title="Looking for an engineering partner who cares about the details?" primary={{ label: 'Let’s talk', href: '/contact/' }} />
    </>
  );
}
