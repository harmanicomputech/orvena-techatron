import { PageHero } from '@/components/PageHero';
import { CtaPanel } from '@/components/CtaPanel';
import { WorkGrid } from './WorkGrid';
import { Eyebrow, Img } from '@/components/ui';
import { moreWork } from '@/content/projects';
import { JsonLd, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Work',
  description:
    'Selected Techatron projects: Kwoat AI, HostComm Summit, PowerNest, ElectionShield and more. AI platforms, web applications, PropTech and civic technology engineered end to end.',
  path: '/work/',
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }])} />
      <PageHero
        eyebrow="Selected work"
        title="Software and platforms, engineered end to end."
        text="We partner with organisations building what comes next. A selection of AI platforms, web applications and digital infrastructure, shaped through discovery, architecture and craft."
        tag="Built & shipped"
      />
      <section className="container-x pb-24" aria-label="Projects">
        <WorkGrid />
      </section>
      <section className="container-x pb-[120px] pt-10 max-[809px]:pb-20" aria-labelledby="more-work">
        <Eyebrow>More work</Eyebrow>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 id="more-work" className="t-h4 max-w-[640px]" data-split>
            Corporate, commerce and creative websites.
          </h2>
          <p className="max-w-[420px] text-slate" data-reveal>
            A selection of live websites Techatron has designed and built for organisations across industries.
          </p>
        </div>
        <ul className="mt-10 grid gap-x-5 gap-y-10 min-[810px]:grid-cols-2 xl:grid-cols-4" data-reveal-group>
          {moreWork.map((w) => (
            <li key={w.url}>
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block" data-cursor-label="Visit">
                <span className="media media--light block aspect-[1440/1065] rounded-[18px]">
                  <Img src={w.image} alt={`${w.name} website`} sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 25vw" className="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
                </span>
                <span className="t-micro mt-4 block text-grey">{w.category}</span>
                <span className="mt-1.5 flex items-center justify-between gap-3 text-[20px] tracking-[-0.02em]">
                  {w.name}
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </span>
                <span className="mt-1.5 block text-[15px] text-grey">{w.summary}</span>
                <span className="sr-only">(opens live site in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <CtaPanel title="Have a product with a point of view? We would love to hear about it." primary={{ label: 'Start a conversation', href: '/contact/' }} />
    </>
  );
}
