import { site } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Privacy',
  description: 'How Techatron Consulting Limited handles information you share through this website.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <section className="container-x py-[100px] max-[809px]:py-14">
      <div className="prose-t mx-auto max-w-[680px]">
        <span className="pill">Privacy</span>
        <h1 className="t-h2 mt-6">Privacy notice</h1>
        <p className="lead !mt-6">
          This notice explains how {site.legalName} (“Techatron”) handles information you share with us through techatronagency.com.
        </p>
        <h2>What we collect</h2>
        <p>
          When you send a project inquiry or email us, we receive the details you choose to provide: typically your name, email address, organisation, phone number and a
          description of your project. We do not ask for sensitive personal data.
        </p>
        <h2>How we use it</h2>
        <p>We use these details only to reply to you, discuss your project and prepare a proposal. We do not sell your information or use it for unrelated marketing.</p>
        <h2>Analytics</h2>
        <p>
          If analytics are enabled on this site, they are used in aggregate to understand which pages are useful. You can block analytics in your browser without affecting
          how the site works.
        </p>
        <h2>Retention and your rights</h2>
        <p>
          We keep inquiry correspondence only as long as needed to respond and for our ordinary business records. You can ask us to access, correct or delete the information
          you have sent us at any time, in line with the Nigeria Data Protection Act 2023.
        </p>
        <h2>Contact</h2>
        <p>
          Email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> or write to us at {site.address.street}, {site.address.locality},{' '}
          {site.address.region}, {site.address.country}.
        </p>
      </div>
    </section>
  );
}
