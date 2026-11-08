import { PageHero } from '@/components/PageHero';
import { CtaPanel } from '@/components/CtaPanel';
import { WorkGrid } from './WorkGrid';
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
      <CtaPanel title="Have a product with a point of view? We would love to hear about it." primary={{ label: 'Start a conversation', href: '/contact/' }} />
    </>
  );
}
