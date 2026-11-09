import { TransitionLink } from './TransitionLink';
import { Img } from './ui';
import { websites, type Website } from '@/content/projects';

const domain = (url: string) => url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

function Preview({ w }: { w: Website }) {
  if (w.image)
    return (
      <span className="media media--light block aspect-[1440/1065] rounded-[18px]">
        <Img
          src={w.image}
          alt={`${w.name} website`}
          sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 25vw"
          className="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
      </span>
    );
  // No capturable screenshot (site offline or behind bot protection): a branded card instead.
  return (
    <span className="relative flex aspect-[1440/1065] flex-col items-center justify-center overflow-hidden rounded-[18px] bg-white px-8 text-center ring-1 ring-[rgba(17,18,24,.06)]">
      {w.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={w.logo} alt={`${w.name} logo`} loading="lazy" className="max-h-[42%] max-w-[70%] object-contain transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <span className="text-[26px] leading-tight tracking-[-0.03em]">{w.name}</span>
      )}
      <span className="t-micro absolute bottom-4 text-grey">{domain(w.url)}</span>
    </span>
  );
}

function WebsiteCard({ w }: { w: Website }) {
  const body = (
    <>
      <Preview w={w} />
      <span className="t-micro mt-4 block text-grey">{w.category}</span>
      <span className="mt-1.5 flex items-start justify-between gap-3 text-[20px] leading-snug tracking-[-0.02em]">
        {w.name}
        <span aria-hidden="true" className="pt-0.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          {w.caseStudy ? '→' : '↗'}
        </span>
      </span>
      <span className="mt-1.5 block text-[15px] text-grey">{w.summary}</span>
    </>
  );
  return w.caseStudy ? (
    <TransitionLink href={`/work/${w.caseStudy}/`} className="group block" data-cursor-label="View">
      {body}
      <span className="sr-only">(read the case study)</span>
    </TransitionLink>
  ) : (
    <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block" data-cursor-label="Visit">
      {body}
      <span className="sr-only">(opens live site in a new tab)</span>
    </a>
  );
}

/** Every client website from Techatron's portfolio notes. */
export function Websites() {
  return (
    <section className="container-x pb-[120px] pt-10 max-[809px]:pb-20" aria-labelledby="websites">
      <span className="pill" data-reveal>
        Client websites
      </span>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2 id="websites" className="t-h4 max-w-[640px]" data-split>
          Websites, designed and built for organisations across industries.
        </h2>
        <p className="max-w-[420px] text-slate" data-reveal>
          Corporate platforms, commerce, events, real estate, creative studios and personal brands, each live and in use.
        </p>
      </div>
      <ul className="mt-12 grid gap-x-5 gap-y-10 min-[810px]:grid-cols-2 xl:grid-cols-4" data-reveal-group>
        {websites.map((w) => (
          <li key={w.url}>
            <WebsiteCard w={w} />
          </li>
        ))}
      </ul>
    </section>
  );
}
