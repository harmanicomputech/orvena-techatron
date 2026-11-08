// Services. Copy adapted from techatronagency.com/services; scope limited to the
// capabilities Techatron has asked to lead with.
export type Service = {
  slug: string;
  title: string;
  short: string;
  text: string;
  includes: string[];
  image: string; // image-manifest key used for the small circular thumbnail
};

export const services: Service[] = [
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    short: 'Software built around your processes, not the other way round.',
    text: 'Custom platforms, portals and internal tools for when off-the-shelf products force the business to bend around them.',
    includes: ['Customer portals', 'Internal tools & dashboards', 'Workflow automation', 'Multi-tenant SaaS'],
    image: 'resolvr-3',
  },
  {
    slug: 'web-applications',
    title: 'Web Application Development',
    short: 'Fast, secure, search-friendly web products that convert.',
    text: 'From corporate platforms to transactional web apps: fast, accessible and built to turn visitors into enquiries and customers.',
    includes: ['Web applications', 'Corporate platforms', 'E-commerce & payments', 'Content management'],
    image: 'hostcomm-1',
  },
  {
    slug: 'mobile-applications',
    title: 'Mobile Application Development',
    short: 'iOS and Android apps people keep on their home screen.',
    text: 'Native and cross-platform apps backed by the APIs and infrastructure to run them, including offline-first experiences for low-connectivity areas.',
    includes: ['iOS & Android', 'Cross-platform', 'Offline-first', 'Payments & notifications'],
    image: 'powernest-m',
  },
  {
    slug: 'ai-intelligent-systems',
    title: 'AI & Intelligent Systems',
    short: 'Practical AI, integrated where it adds real value.',
    text: 'Multi-model integration, intelligent routing, AI agents and AI-assisted workflows, designed around the job to be done rather than the hype.',
    includes: ['Multi-model integration', 'AI orchestration', 'Agent workflows', 'AI-assisted documents'],
    image: 'kwoat-1',
  },
  {
    slug: 'digital-product-engineering',
    title: 'Digital Product Engineering',
    short: 'From first sketch to a product people love.',
    text: 'Product strategy, UX, interface design and engineering in one team, so what gets designed is what gets shipped.',
    includes: ['Product discovery', 'UX & interface design', 'Prototyping', 'Iterative delivery'],
    image: 'comono-1',
  },
  {
    slug: 'enterprise-solutions',
    title: 'Enterprise Software Solutions',
    short: 'Systems large organisations can run on.',
    text: 'Role-based enterprise applications with operational workflows, audit trails and the reliability that critical operations depend on.',
    includes: ['Role-based access', 'Operational workflows', 'Audit & reporting', 'Legacy modernisation'],
    image: 'command-1',
  },
  {
    slug: 'apis-integrations',
    title: 'API Development & Integrations',
    short: 'Systems that finally talk to each other.',
    text: 'REST and webhook APIs connecting payments, ERPs, CRMs, messaging and partners, with clean contracts and documentation.',
    includes: ['REST & webhook APIs', 'Payment gateways', 'ERP & CRM integration', 'Messaging & USSD'],
    image: 'powernest-3',
  },
  {
    slug: 'technology-consulting',
    title: 'Technology Consulting',
    short: 'Independent technical advice before you commit.',
    text: 'Technology strategy and roadmaps, build-versus-buy decisions, vendor evaluation, and architecture and code reviews.',
    includes: ['Strategy & roadmaps', 'Build-versus-buy', 'Vendor evaluation', 'Architecture reviews'],
    image: 'triumph-1',
  },
];
