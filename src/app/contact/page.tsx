import { PageHero } from '@/components/PageHero';
import { Logo } from '@/components/Logo';
import { Button, Img, Star } from '@/components/ui';
import { CtaPanel } from '@/components/CtaPanel';
import { ContactForm } from './ContactForm';
import { site } from '@/content/site';
import { JsonLd, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact',
  description: `Start a project with Techatron. Email ${site.email}, call 0902 201 6978, or reach our operations hubs in Lagos, Nigeria and Delaware, USA.`,
  path: '/contact/',
});

export default function ContactPage() {
  const rows = [
    { k: 'Email', v: site.email, href: `mailto:${site.email}` },
    { k: 'Call', v: site.phones.map((p) => p.label).join('  ·  '), href: site.phones[0].href },
    { k: 'Lagos, Nigeria', v: `${site.address.street}, ${site.address.locality}, Lagos`, href: site.address.mapUrl },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])} />
      <PageHero
        eyebrow="Contact"
        title="Good things begin with a conversation."
        text="Tell us what you want to launch, fix or grow. Rough ideas are fine; you do not need a specification. We will get back to you with a thoughtful next step."
        tag="No obligation"
      />

      <section className="container-x pb-[120px] max-[809px]:pb-20" aria-label="Contact details and inquiry form">
        <div className="grid items-start gap-4 min-[1200px]:grid-cols-[440px_1fr]">
          <aside className="on-dark rounded-[28px] p-8 text-cream max-[809px]:p-6" style={{ background: 'var(--color-night)' }} data-reveal>
            <div className="flex items-center justify-between">
              <Logo light />
              <span className="flex -space-x-2.5" aria-hidden="true">
                {['photo-notes', 'photo-creator', 'photo-review'].map((k) => (
                  <span key={k} className="block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--color-night)]">
                    <Img src={k} alt="" sizes="36px" className="h-full w-full object-cover" />
                  </span>
                ))}
              </span>
            </div>
            <h2 className="t-h4 mt-8">Contact details</h2>
            <dl className="mt-4">
              {rows.map((r) => (
                <div key={r.k} className="border-t border-white/10 py-4">
                  <dt className="t-micro text-cream-56">{r.k}</dt>
                  <dd className="mt-1.5">
                    <a href={r.href} className="hover:text-yellow" {...(r.k.startsWith('Lagos') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {r.v}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="border-t border-white/10 py-4">
                <dt className="t-micro text-cream-56">Delaware, USA</dt>
                <dd className="mt-1.5">US operations hub · {site.reach}</dd>
              </div>
              <div className="border-t border-white/10 py-4">
                <dt className="t-micro text-cream-56">Social</dt>
                <dd className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                  {site.social.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-yellow">
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-4 rounded-[20px] bg-lilac p-6 text-indigo">
              <p className="text-[19px] font-medium leading-snug tracking-[-0.02em]">Not ready for a full project? A simple hello is a good place to start.</p>
              <div className="mt-5">
                <Button href={`mailto:${site.email}`}>Email Techatron</Button>
              </div>
            </div>
          </aside>

          <div className="relative rounded-[28px] bg-white p-8 max-[809px]:p-5" data-reveal data-delay="0.1">
            <div className="mb-8 flex items-start justify-between">
              <h2 className="t-h4">Project inquiry</h2>
              <Star size={30} color="var(--color-orange)" />
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <CtaPanel title="Prefer to see the work first?" text="Explore a selection of platforms and products shaped through discovery, architecture and craft." primary={{ label: 'Explore our work', href: '/work/' }} />
    </>
  );
}
