// Company facts. Every value here is taken from techatronagency.com (Nov 2026).
export const site = {
  name: 'Techatron',
  legalName: 'Techatron Consulting Limited',
  url: 'https://techatronagency.com',
  tagline: 'Digital engineering & technology consulting',
  description:
    'Techatron Consulting Limited is a digital engineering and technology consulting company with operations hubs in Lagos, Nigeria and Delaware, USA, serving clients globally. We design, engineer and launch software, web applications, mobile apps and intelligent platforms.',
  locations: 'Lagos, Nigeria · Delaware, USA',
  reach: 'Serving clients globally',
  email: 'hello@techatronagency.com',
  phones: [
    { label: '0902 201 6978', href: 'tel:+2349022016978' },
    { label: '0704 541 4419', href: 'tel:+2347045414419' },
  ],
  address: {
    street: '13 Adepele Street',
    locality: 'Ikeja',
    region: 'Lagos',
    country: 'Nigeria',
    countryCode: 'NG',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=13%20Adepele%20Street%2C%20Ikeja%2C%20Lagos%2C%20Nigeria',
  },
  // Operations hubs
  hubs: [
    { city: 'Lagos', country: 'Nigeria', detail: '13 Adepele Street, Ikeja', countryCode: 'NG', region: 'Lagos' },
    { city: 'Delaware', country: 'United States', detail: 'US operations hub', countryCode: 'US', region: 'DE' },
  ],
  social: [
    { label: 'LinkedIn', handle: 'Techatron Consulting', href: 'https://www.linkedin.com/company/techatron-consulting-limited/' },
    { label: 'Instagram', handle: '@techatronconsultingltd', href: 'https://www.instagram.com/techatronconsultingltd/' },
    { label: 'X', handle: '@techatronagency', href: 'https://x.com/techatronagency' },
    { label: 'Facebook', handle: 'techatronconsultingltd', href: 'https://web.facebook.com/techatronconsultingltd' },
    { label: 'TikTok', handle: '@techatronconsultingltd', href: 'https://www.tiktok.com/@techatronconsultingltd' },
  ],
} as const;

export const nav = [
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Insights', href: '/insights/' },
] as const;

export const navWithContact = [...nav, { label: 'Contact', href: '/contact/' }] as const;

// Marquee bands
export const disciplinesMarquee = [
  'Custom Software',
  'Web Applications',
  'Mobile Apps',
  'Product Engineering',
  'AI Integration',
  'APIs & Integrations',
];

export const valuesMarquee = [
  'Clarity beats complexity',
  'Honesty saves money',
  'Quality is a habit',
  'Launch is the beginning',
  'Engineered to last',
];

// Techatron's four convictions (techatronagency.com/about)
export const convictions = [
  { title: 'Clarity beats complexity', text: 'The simplest system that reliably meets the need is almost always the right one.' },
  { title: 'Honesty saves money', text: 'We say early when something is risky, unnecessary or better bought than built.' },
  { title: 'Quality is a habit', text: 'Reviews, tests and documentation are part of every change, not a phase at the end.' },
  { title: 'Launch is the beginning', text: 'Software creates value in use, so we plan for operating and improving it from day one.' },
];

// Delivery process (techatronagency.com — "How we deliver"), condensed to four stages.
export const process = [
  { step: 'Discover', text: 'We learn the business before the technology: the goal, the people, the constraints and what success has to look like.' },
  { step: 'Architect', text: 'We choose the simplest architecture that will hold up, and agree scope, plan and running costs.' },
  { step: 'Engineer', text: 'We build in short, visible increments, with code review and automated tests on every change.' },
  { step: 'Launch', text: 'We deploy with monitoring and a rollback plan, then stay on to support, improve and extend.' },
];

// Ways to engage (techatronagency.com/about)
export const engagements = [
  {
    kicker: 'A defined product or system to build',
    title: 'Project delivery',
    text: 'An agreed scope, plan and budget, delivered in visible increments with a clear definition of done.',
    includes: ['Discovery brief', 'Fixed scope & architecture', 'Iterative delivery', 'Launch & handover'],
  },
  {
    kicker: 'An evolving product or roadmap',
    title: 'Dedicated team',
    text: 'A stable team working as an extension of yours, with priorities you set and progress reviewed regularly.',
    includes: ['Product engineering', 'Regular demos', 'Shared roadmap', 'Continuous releases'],
  },
  {
    kicker: 'A decision to make before you commit',
    title: 'Advisory',
    text: 'Focused, time-boxed work: an assessment, a review or a roadmap that gives you an independent technical view.',
    includes: ['Technology roadmaps', 'Build-versus-buy', 'Architecture & code reviews', 'Vendor evaluation'],
  },
  {
    kicker: 'Systems that must keep running',
    title: 'Managed services',
    text: 'Ongoing support, monitoring and improvement for your infrastructure, devices and the software we build.',
    includes: ['Monitoring & alerting', 'Patching', 'Support', 'Improvements'],
  },
];

// Engineering standards (techatronagency.com/about)
export const standards = [
  { title: 'Reliability', text: 'Systems are built to fail safely and recover quickly, with monitoring that tells us before your customers do.' },
  { title: 'Security', text: 'Access control, data protection and secure defaults are part of the architecture, not a checklist at the end.' },
  { title: 'Performance', text: 'We set performance budgets early and test against them on the mid-range phones and networks your users actually have.' },
  { title: 'Maintainability', text: 'Readable code, automated tests and documentation keep software affordable to change long after launch.' },
];
