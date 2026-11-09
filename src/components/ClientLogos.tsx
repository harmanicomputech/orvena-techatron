import { clientLogos } from '@/content/projects';

/** "Trusted by" — client logos on white tiles in two slow, counter-scrolling rows (static grid under reduced motion). */
export function ClientLogos({ title = 'Trusted by organisations across industries.', tone = 'cream' }: { title?: string; tone?: 'cream' | 'white' }) {
  const half = Math.ceil(clientLogos.length / 2);
  const rows = [clientLogos.slice(0, half), clientLogos.slice(half)];
  return (
    <section className={`clients ${tone === 'white' ? 'bg-white' : ''} py-[110px] max-[809px]:py-16`} aria-labelledby="clients-title">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="pill" data-reveal>
            Our clients
          </span>
          <h2 id="clients-title" className="t-h4 mt-5 max-w-[560px]" data-split>
            {title}
          </h2>
        </div>
        <p className="max-w-[380px] text-slate" data-reveal>
          From energy and real estate to technology, hospitality and public life, organisations trust Techatron with the software they depend on.
        </p>
      </div>
      <ul className="sr-only">
        {clientLogos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <div className="clients__rows mt-12" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="clients__row">
            <div className={`clients__track ${r === 1 ? 'clients__track--rev' : ''}`}>
              {[...row, ...row].map((l, i) => (
                <span key={l.name + i} className="clients__tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt="" loading="lazy" decoding="async" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
