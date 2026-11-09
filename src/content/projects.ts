// Portfolio. Sources:
//  - Techatron's verified portfolio (harmanicomputech/techatron-v2, database/seeders/data/projects.php, Nov 2026)
//  - Product READMEs for Kwoat, PowerNest Estate and Election Shield (harmanicomputech/* repositories)
//  - Screenshots captured from each live site on 8 Nov 2026
// No results, metrics or testimonials are claimed. Technologies are listed only where the
// source repository confirms them.

export type ImageRef = string; // key in image-manifest.json, or an absolute /images/... path (SVG)

export type Project = {
  slug: string;
  name: string;
  client: string;
  url?: string;
  category: string; // shown on the card pill, "A / B"
  filters: Array<'ai' | 'software' | 'proptech' | 'events' | 'civic' | 'corporate'>;
  tagline: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  contribution: string[];
  features: Array<[string, string]>;
  technologies?: { note?: string; items: string[] };
  images: { cover: ImageRef; mobile: ImageRef; gallery: Array<{ src: ImageRef; caption: string }> };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'kwoat-ai',
    name: 'Kwoat AI',
    client: 'Kwoat',
    url: 'https://kwoat.ai/',
    category: 'AI Platform / SaaS',
    filters: ['ai', 'software'],
    tagline: 'Every AI model. One platform.',
    summary: 'A multi-model AI platform that brings leading AI models into one unified workspace.',
    overview:
      'Kwoat AI gives people and teams a single workspace for working with multiple leading AI models. Instead of moving between separate tools, users route work to the right model, compare responses side by side, run agent missions, generate images, talk by voice and keep track of usage, all inside one product.',
    challenge:
      'The AI landscape is fragmented. Each leading model has its own interface, subscription and strengths, so getting the best answer often means juggling several tools and copying context between them. The product had to unify that experience without hiding the differences that make each model useful.',
    approach:
      'We treated Kwoat as an orchestration problem first and an interface problem second: a model-agnostic core that can talk to multiple providers, and a workspace designed around comparing, routing and acting on AI output rather than simply chatting with it.',
    outcome:
      'A SaaS platform combining multi-model integration, intelligent routing and agent-style automation, wrapped in a workspace that makes advanced AI approachable for everyday work.',
    contribution: ['Product concept & UX', 'Multi-model integration', 'Interface & motion design', 'Front-end engineering'],
    features: [
      ['Intelligent routing', 'Each request goes to a suitable model rather than forcing users to choose manually.'],
      ['Model comparison', 'Responses from different models side by side, so quality can be judged directly.'],
      ['Agent missions', 'Multi-step, goal-driven tasks carried out by AI agents inside the workspace.'],
      ['Images & voice', 'Image generation and spoken interaction in the same workspace as text models.'],
      ['Usage management', 'Visibility and control over how AI capacity is consumed.'],
    ],
    technologies: { items: ['React 19', 'TypeScript', 'Vite', 'GSAP', 'Lenis', 'Three.js (WebGL)'] },
    images: {
      cover: 'kwoat-c',
      mobile: 'kwoat-m',
      gallery: [
        { src: 'kwoat-1', caption: '“Stop choosing. Start doing.” One prompt box, every model.' },
        { src: 'kwoat-2', caption: 'Auto-routing and side-by-side model comparison.' },
        { src: 'kwoat-3', caption: 'Agent missions and usage analytics.' },
        { src: 'kwoat-m', caption: 'The same workspace, built mobile-first.' },
      ],
    },
    featured: true,
  },
  {
    slug: 'hostcomm-summit',
    name: 'HostComm Summit',
    client: 'Host Community Summit',
    url: 'https://hostcommsummit.com/',
    category: 'Events / Energy',
    filters: ['events', 'corporate'],
    tagline: 'Where operators, communities and investors align.',
    summary: 'The digital home of the Host Community Summit on host communities and Nigeria’s oil and gas development.',
    overview:
      'The HostComm Host Community Summit focuses on host communities and Nigeria’s oil and gas development. Techatron built the summit’s digital platform as its information and engagement hub, communicating the theme, programme, organisers, speakers and registration opportunities.',
    challenge:
      'An industry summit speaks to several audiences at once: delegates, regulators, operators, partners and the communities at the centre of the conversation. The platform needed the credibility of a corporate site and the clarity of an event guide.',
    approach:
      'We built the information architecture around the questions attendees actually ask (what is it, who is behind it, what happens when, and how do I take part) and paired it with a confident, premium visual presentation.',
    outcome:
      'An event-focused digital experience combining corporate credibility, industry communication, clear programme information and registration pathways for delegates and sponsors.',
    contribution: ['Information architecture', 'Visual design', 'Web development', 'Registration journeys'],
    features: [
      ['Theme & programme', 'Clear communication of the summit theme and programme.'],
      ['Speakers & stakeholders', 'Presentation of the organisations and people involved.'],
      ['Delegate passes', 'Pass options and routes for prospective attendees to register.'],
      ['Sponsorship & exhibition', 'Dedicated pathways for partners and exhibitors.'],
    ],
    images: {
      cover: 'hostcomm-c',
      mobile: 'hostcomm-m',
      gallery: [
        { src: 'hostcomm-1', caption: 'A hero that states the purpose in one line.' },
        { src: 'hostcomm-2', caption: 'Editorial storytelling for a policy-led audience.' },
        { src: 'hostcomm-3', caption: 'Speakers and delegate pass options.' },
        { src: 'hostcomm-m', caption: 'Fully responsive for delegates on the move.' },
      ],
    },
    featured: true,
  },
  {
    slug: 'powernest',
    name: 'PowerNest',
    client: 'PowerNest',
    url: 'https://powernest.com.ng/',
    category: 'PropTech / Utility Payments',
    filters: ['proptech', 'software'],
    tagline: 'Buy power easily, 24/7.',
    summary: 'A digital electricity vending platform that lets estate residents buy prepaid electricity tokens in minutes.',
    overview:
      'PowerNest lets estate residents purchase prepaid electricity tokens online. The platform captures meter information, processes payment and delivers tokens electronically, turning an everyday estate chore into a simple digital transaction.',
    challenge:
      'In many estates, buying prepaid electricity depends on visiting a vendor or waiting on an estate office. Residents need a dependable way to top up at any hour, and estate operations need every transaction to be exact: the right meter, the right payment, the right token.',
    approach:
      'We designed PowerNest around the transaction itself (meter details, payment and token delivery as one reliable flow) and kept the resident journey as short as possible.',
    outcome:
      'A utility technology platform combining meter capture, payment integration and electronic token delivery by SMS or email. It is now growing into PowerNest Estate, a mobile-first estate operating platform with visitor passes, service charges and the vending service built in.',
    contribution: ['Transaction flow design', 'Payment integration', 'Web development', 'Platform roadmap'],
    features: [
      ['Meter capture', 'Residents enter and confirm meter details before paying.'],
      ['Online payment', 'Card, bank transfer or mobile wallet.'],
      ['Instant tokens', 'Prepaid tokens delivered by SMS or email after payment.'],
      ['Estate platform (next)', 'Visitor passes, service charges, maintenance and an append-only ledger.'],
    ],
    technologies: {
      note: 'PowerNest Estate platform',
      items: ['Laravel 13', 'PHP 8.3', 'Livewire 4', 'Alpine.js', 'Tailwind CSS 4', 'Paystack & Payaza', 'Stron vending', 'PWA'],
    },
    images: {
      cover: 'powernest-c',
      mobile: 'powernest-m',
      gallery: [
        { src: 'powernest-1', caption: 'One job, stated plainly: buy power for your home.' },
        { src: 'powernest-2', caption: 'Meter details, payment, token. Three steps.' },
        { src: 'powernest-3', caption: 'Built as the official token provider for the estate.' },
        { src: 'powernest-m', caption: 'Designed for the phone residents already carry.' },
      ],
    },
    featured: true,
  },
  {
    slug: 'electionshield',
    name: 'ElectionShield',
    client: 'Governorship campaign, Ebonyi State',
    category: 'Civic Tech / Election Data',
    filters: ['civic', 'software'],
    tagline: 'An election-day situation room.',
    summary: 'Election monitoring and reporting infrastructure: results by USSD from polling units, a live situation room on the phone.',
    overview:
      'ElectionShield is the reporting infrastructure for the Ebonyi State governorship election. Polling agents submit results by USSD from any phone; coordinators follow the Parallel Vote Tabulation live in a mobile-first situation room, from state to LGA, ward and polling unit.',
    challenge:
      'Election-day reporting has to work on any handset, on poor networks, under pressure, and it has to be right. Results arrive late, out of order or twice; corrections must supersede the figures they correct; and coordinators need to know at a glance where things stand against the constitutional win condition.',
    approach:
      'We split the system in two: a USSD service that is the single source of truth, and a situation-room web app that keeps a verified copy, received by HMAC-signed webhook in real time and reconciled by a scheduled pull as a safety net. Every event is idempotent, and results never move back a stage.',
    outcome:
      'An installable, offline-capable situation room that shows reporting coverage, the section 179(2) win condition (most votes and at least 25% in two-thirds of LGAs), a per-LGA 25% tracker, weak links and full collation down to each polling unit.',
    contribution: ['System architecture', 'USSD & webhook integration', 'Data integrity design', 'Web app engineering'],
    features: [
      ['USSD reporting', 'Polling agents submit EC8A results from any phone, no data plan needed.'],
      ['Win-condition tracker', 'Whether the leader would be declared or face a run-off, on current figures.'],
      ['25% LGA tracker', 'Every candidate’s share in every LGA against the 25% line.'],
      ['Collation', 'State → LGA → ward → polling unit, with each result’s reference.'],
      ['Offline-first PWA', 'Installs to the home screen, starts offline and shows how old its data is.'],
    ],
    technologies: { items: ['Laravel 13', 'PHP 8.3', 'USSD', 'HMAC-signed webhooks', 'Scheduled sync', 'PWA / service worker'] },
    images: {
      cover: '/images/work/electionshield-cover.svg',
      mobile: '/images/work/electionshield-mobile.svg',
      gallery: [
        { src: '/images/work/electionshield-flow.svg', caption: 'One source of truth: USSD in, signed webhook out, scheduled pull as a safety net.' },
        { src: '/images/work/electionshield-cover.svg', caption: 'The situation room: coverage, win condition and weak links.' },
        { src: 'command-1', caption: 'Part of the same campaign ecosystem: the Command Center.' },
        { src: '/images/work/electionshield-mobile.svg', caption: 'Mobile first: works at 360px wide.' },
      ],
    },
    featured: true,
  },
  {
    slug: 'resolvr',
    name: 'Resolvr',
    client: 'Resolvr',
    url: 'https://resolvrapp.com/',
    category: 'SaaS / AI Productivity',
    filters: ['ai', 'software'],
    tagline: 'Your workplace evidence, finally organised.',
    summary: 'A workplace evidence and incident documentation platform that turns scattered records into formal, AI-assisted HR complaints.',
    overview:
      'Resolvr helps employees organise workplace incidents, preserve supporting evidence, build chronological timelines and generate formal HR complaint documents with the help of AI.',
    challenge:
      'When workplace issues escalate, evidence is scattered across emails, messages, notes and memory. Turning that into a structured, professionally worded complaint is hard, especially under stress, and the material is sensitive, so privacy had to be designed in.',
    approach:
      'We built Resolvr on structured data: incidents, evidence and dates are connected records, not free text, so timelines and documents assemble reliably. AI is applied where it adds the most value: drafting formal language from structured facts.',
    outcome:
      'A privacy-conscious application combining structured incident management, evidence handling, automatic timelines and AI-assisted document generation in a calm, focused experience.',
    contribution: ['Product design', 'Data modelling', 'AI integration', 'Full-stack engineering'],
    features: [
      ['Incident log', 'Capture and categorise incidents as structured records.'],
      ['Evidence vault', 'Keep supporting evidence alongside each incident.'],
      ['Timeline builder', 'An ordered timeline of events, assembled automatically.'],
      ['Complaint generator', 'Formal HR complaint documents drafted from the record.'],
    ],
    images: {
      cover: 'resolvr-c',
      mobile: 'resolvr-m',
      gallery: [
        { src: 'resolvr-1', caption: 'Calm, editorial and private by design.' },
        { src: 'resolvr-2', caption: 'Naming the problem before selling the product.' },
        { src: 'resolvr-3', caption: 'Incident log, evidence vault, timeline and generator.' },
        { src: 'resolvr-m', caption: 'Mobile-ready for evidence captured in the moment.' },
      ],
    },
  },
  {
    slug: 'comono',
    name: 'Comono',
    client: 'Comono Technologies',
    url: 'https://comono.io/',
    category: 'Verification / Trust',
    filters: ['software', 'corporate'],
    tagline: 'Verification made easy.',
    summary: 'A digital verification platform for identity, physical and digital addresses, proof of address and project information.',
    overview:
      'Comono helps individuals and organisations verify identity, physical and digital addresses, proof of address and project-related information. It is built around digital trust: confidence in who and what you are dealing with.',
    challenge:
      'Verifying people, addresses and project details is often slow, manual and inconsistent. Organisations need a dependable, structured way to move requests through verification, and individuals need onboarding that is clear rather than intimidating.',
    approach:
      'We modelled verification as workflows: structured onboarding captures the right information up front, and business verification flows move each request through clearly defined stages.',
    outcome:
      'A verification platform built around structured onboarding, business verification workflows and a product experience that communicates trust.',
    contribution: ['Workflow engineering', 'Onboarding UX', 'Web platform', 'Developer-facing pages'],
    features: [
      ['Identity verification', 'Verification of individual identity.'],
      ['Address verification', 'Physical and digital addresses, including proof of address.'],
      ['Project verification', 'Project-related information for organisations.'],
      ['Structured onboarding', 'Guided capture of what each verification needs.'],
    ],
    images: {
      cover: 'comono-c',
      mobile: 'comono-m',
      gallery: [
        { src: 'comono-1', caption: 'A clear promise: verification made easy.' },
        { src: 'comono-2', caption: 'Verification types explained visually.' },
        { src: 'comono-3', caption: 'Real-time address, identity and project checks.' },
        { src: 'comono-m', caption: 'Responsive onboarding.' },
      ],
    },
  },
  {
    slug: 'triumph-power-and-gas',
    name: 'Triumph Power & Gas',
    client: 'Triumph Power & Gas Systems',
    url: 'https://triumphpg.com/',
    category: 'Energy / Corporate',
    filters: ['corporate'],
    tagline: 'Integrated energy expertise, presented clearly.',
    summary: 'An enterprise-grade corporate digital experience for an indigenous integrated energy services company.',
    overview:
      'Triumph Power & Gas Systems is an indigenous integrated energy services company working across oil and gas, power, industrial and marine services. Techatron engineered a corporate website that communicates its capabilities, service portfolio, expertise, partnerships and credentials.',
    challenge:
      'Technical energy businesses operate across several demanding sectors at once. The website had to present a broad, complex service portfolio clearly to industry buyers, with the credibility expected of an enterprise energy partner.',
    approach:
      'We structured the experience around the business’s service architecture, so visitors from each sector find what is relevant to them, and used industry storytelling to show expertise rather than simply list services.',
    outcome:
      'A professional corporate experience with a structured service architecture, industry storytelling and brand presentation suited to a technical energy company.',
    contribution: ['Information architecture', 'Corporate web design', 'Web development'],
    features: [
      ['Service architecture', 'Oil and gas, power, industrial and marine services, organised.'],
      ['Capabilities', 'Clear presentation of technical expertise.'],
      ['Credentials', 'Partnerships and corporate credentials up front.'],
    ],
    images: {
      cover: 'triumph-c',
      mobile: 'triumph-m',
      gallery: [
        { src: 'triumph-1', caption: 'Power & industry, introduced with confidence.' },
        { src: 'triumph-2', caption: 'Solutions built around critical industries.' },
        { src: 'triumph-3', caption: 'The full spectrum of energy services.' },
        { src: 'triumph-m', caption: 'Responsive across devices.' },
      ],
    },
  },
  {
    slug: 'keybridge-realty',
    name: 'Keybridge Realty',
    client: 'Keybridge Realty',
    url: 'https://keybridgerealty.com.ng/',
    category: 'Real Estate / PropTech',
    filters: ['proptech', 'corporate'],
    tagline: 'Verified properties, direct from owners.',
    summary: 'A real estate platform built around verified listings, direct owner access and transparent transactions.',
    overview:
      'Keybridge Realty focuses on verified property listings, direct access to owners, property verification and transaction transparency, and the platform communicates how it reduces uncertainty and risk.',
    challenge:
      'Buyers and renters often face unverified listings, layers of intermediaries and unclear transactions. The platform had to make trust visible from the first visit.',
    approach:
      'We designed the experience around trust signals (verification, direct owner access and transparency) so the brand promise is reinforced throughout property discovery.',
    outcome:
      'A property platform combining real estate presentation, property discovery and trust-oriented engagement.',
    contribution: ['Trust-oriented UX', 'Property presentation', 'Web development'],
    features: [
      ['Verified listings', 'Listings presented with an emphasis on verification.'],
      ['Direct owner access', 'Pathways that connect prospects with owners.'],
      ['Transparency', 'Clear communication of how transactions are made safer.'],
    ],
    images: {
      cover: 'keybridge-c',
      mobile: 'keybridge-m',
      gallery: [
        { src: 'keybridge-1', caption: 'Trust, stated in the headline.' },
        { src: 'keybridge-2', caption: 'Verification as the core proposition.' },
        { src: 'keybridge-3', caption: 'Discovery with direct-from-owner access.' },
        { src: 'keybridge-m', caption: 'Mobile property discovery.' },
      ],
    },
  },
  {
    slug: 'command-center',
    name: 'Command Center',
    client: 'Anyi Ga Emeya movement',
    url: 'https://commandcenter.anyigaemeya.com.ng/',
    category: 'Enterprise / Campaign Ops',
    filters: ['civic', 'software'],
    tagline: 'Every ward. Every voice. One picture.',
    summary: 'A purpose-built campaign management application for structured operations, teams and information.',
    overview:
      'The Command Center is the management application that coordinates the operations of the Anyi Ga Emeya campaign, supporting structured operations, team management and information management from one place.',
    challenge:
      'Large campaigns involve many people, roles and moving parts. Without one operational system, coordination happens across chats and spreadsheets, information is duplicated or lost, and it is hard to control who can see and change what.',
    approach:
      'We approached the Command Center as an enterprise application: defined roles and permissions, workflows that mirror how the campaign actually runs, and a central information model every team works from.',
    outcome:
      'A custom management application with role-based access, operational workflows and centralised information: the internal system the campaign runs on.',
    contribution: ['Enterprise architecture', 'Role-based access control', 'Workflow engineering'],
    features: [
      ['Campaign operations', 'Structured management of campaign activities.'],
      ['Team management', 'Organisation and coordination of teams.'],
      ['Information management', 'One central place for campaign information.'],
      ['Role-based access', 'Different capabilities for different roles.'],
    ],
    images: {
      cover: 'command-c',
      mobile: 'command-m',
      gallery: [
        { src: 'command-1', caption: 'Secure sign-in for every role in the campaign.' },
        { src: 'command-m', caption: 'Built for coordinators in the field.' },
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const workFilters = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'software', label: 'Software' },
  { id: 'proptech', label: 'PropTech' },
  { id: 'events', label: 'Events' },
  { id: 'civic', label: 'Civic Tech' },
  { id: 'corporate', label: 'Corporate' },
] as const;

// Client websites: all 24 sites from Techatron's portfolio notes (Drive: Portfolio/Websites, Nov 2026),
// grouped as in that document. Screenshots were captured from each live site on 9 Nov 2026. Sites that
// could not be captured (offline, expired domain, bot protection) show a branded card instead.
export type Website = {
  name: string;
  category: string;
  summary: string;
  url: string;
  group: (typeof websiteGroups)[number];
  image?: string; // screenshot key
  logo?: string; // /images/clients/*.webp
  caseStudy?: string; // slug of a full case study
};

export const websiteGroups = [
  'Technology, software and digital platforms',
  'Corporate, industrial and enterprise',
  'Real estate and property',
  'Creative, lifestyle and e-commerce',
  'Personal brands, professional services, faith and campaigns',
] as const;

const [TECH, CORP, PROP, CREATIVE, PERSONAL] = websiteGroups;

export const websites: Website[] = [
  { name: 'Comono Technologies', category: 'Technology / Identity verification', group: TECH, url: 'https://comono.io/', image: 'comono-c', logo: '/images/clients/comono.webp', caseStudy: 'comono',
    summary: 'An integrated identity and address verification platform: identity checks, physical and digital address verification, proof of address and project verification.' },
  { name: 'HostComm™ Host Community Summit', category: 'Events / Energy / Digital experience', group: TECH, url: 'https://hostcommsummit.com/', image: 'hostcomm-c', logo: '/images/clients/hostcomm-summit.webp', caseStudy: 'hostcomm-summit',
    summary: 'The digital platform for Nigeria’s Host Community Summit, connecting the oil and gas industry, host communities, government and development institutions.' },
  { name: 'The eBook Club', category: 'Education / Digital publishing', group: TECH, url: 'http://theebookclub.org/',
    summary: 'A digital reading and subscription experience with an extensive e-book collection, personal libraries and reading across devices.' },
  { name: 'Triumph Power & Gas Systems', category: 'Energy / Oil & gas / Engineering', group: CORP, url: 'https://triumphpg.com/', image: 'triumph-c', caseStudy: 'triumph-power-and-gas',
    summary: 'A corporate experience for an indigenous integrated energy services company across oil and gas, power generation and marine operations.' },
  { name: 'Zealot Chemicals', category: 'Manufacturing / Construction materials', group: CORP, url: 'https://zealotchemicals.com/', image: 'zealot-c', logo: '/images/clients/zealot.webp',
    summary: 'A corporate and product website for a manufacturer of Plaster of Paris (POP) cement, with product discovery and enquiries.' },
  { name: 'Doowe Gas', category: 'Energy / LPG / Industrial services', group: CORP, url: 'https://www.doowe.ng/', logo: '/images/clients/doowe.webp',
    summary: 'An integrated LPG business: gas distribution, transportation, retail, plant construction, installation, reticulation and autogas conversion.' },
  { name: 'Goldbrooks', category: 'Logistics / Supply chain management', group: CORP, url: 'https://goldbrooks.com/',
    summary: 'A corporate website for an international supply chain management group: logistics, strategic sourcing and tailored business solutions.' },
  { name: 'Cordiant Resources', category: 'Finance / Business support / Consultancy', group: CORP, url: 'http://cordiantresources.com.ng/', logo: '/images/clients/cordiant.webp',
    summary: 'A corporate web presence for Cordiant Resources Ltd, a finance, business support and consultancy firm.' },
  { name: 'Advent Management Solutions', category: 'Consulting / Project management', group: CORP, url: 'https://adventmgtsolutions.com/', image: 'advent-c', logo: '/images/clients/advent.webp',
    summary: 'A corporate website for a project management and consulting firm.' },
  { name: 'Zealot Haulage', category: 'Logistics / Transportation', group: CORP, url: 'https://zealothaulage.com/', image: 'zealothaulage-c',
    summary: 'A corporate website for a haulage and logistics business, with its services, track-and-trace and quote requests.' },
  { name: 'Brick Homes', category: 'Real estate / Property', group: PROP, url: 'https://brickhomesng.com/', image: 'brickhomes-c', logo: '/images/clients/brick-homes.webp',
    summary: 'A corporate website for Brick Homes Integrated Limited, an estate development company, presenting its properties, services and projects.' },
  { name: 'Keybridge Realty', category: 'Real estate / PropTech', group: PROP, url: 'https://keybridgerealty.com.ng/', image: 'keybridge-c', caseStudy: 'keybridge-realty',
    summary: 'A real estate platform connecting buyers directly with verified property owners, built around transparency, verification and due diligence.' },
  { name: 'Nebo Concept', category: 'Creative / Photography / Videography', group: CREATIVE, url: 'https://neboconcept.com/',
    summary: 'A creative studio website for photography and videography: portfolio, production capabilities and bookings for weddings, events and brands.' },
  { name: 'Nebo Stage', category: 'Event production', group: CREATIVE, url: 'https://nebostage.com.ng/', image: 'nebostage-c',
    summary: 'A nationwide event production company: staging, rigging, barricades, lighting, LED displays, audio, media and livestreaming.' },
  { name: 'DonLamba — Beatz Factory', category: 'Music / E-commerce', group: CREATIVE, url: 'https://donlamba.com/', image: 'donlamba-c', logo: '/images/clients/don-lamba.webp',
    summary: 'A music platform with a beat catalogue, audio previews, custom production services and online booking.' },
  { name: 'SEE Lifestyle', category: 'Hospitality / Lifestyle / Dining', group: CREATIVE, url: 'https://seelifestyle.com.ng/', image: 'seelifestyle-c', logo: '/images/clients/see.webp',
    summary: 'A premium digital experience for SEE Lagos, a lifestyle and business lounge with dining, membership and table reservations.' },
  { name: 'Obymart', category: 'E-commerce / Retail', group: CREATIVE, url: 'https://obymart.com/', image: 'obymart-c',
    summary: 'An online store for educational tablets, toys, fashion, baby essentials, home products and computing accessories.' },
  { name: 'The Wardrobe Manager', category: 'Fashion / Luxury / Bridal styling', group: CREATIVE, url: 'https://thewardrobemanager.com/', image: 'wardrobe-c', logo: '/images/clients/wardrobe-manager.webp',
    summary: 'A luxury fashion and bridal styling presence: bridal wardrobe planning, destination weddings and styling coordination.' },
  { name: 'The Catalyst — Dr Lanre Olusola', category: 'Personal brand / Coaching / Education', group: PERSONAL, url: 'https://thecatalystng.com/', image: 'catalyst-c', logo: '/images/clients/the-catalyst.webp',
    summary: 'The platform for Dr Lanre Olusola’s executive coaching, programmes, courses, media appearances and resources.' },
  { name: 'House on the Rock Dublin', category: 'Faith / Church / Community', group: PERSONAL, url: 'https://houseontherockdublin.org/',
    summary: 'An online point of connection for a church community in Dublin, communicating its identity, activities and ways to get involved.' },
  { name: 'Ayorinde Thomas & Co.', category: 'Professional services / Accounting', group: PERSONAL, url: 'https://ayorindethomasandco.com/', image: 'ayorinde-c',
    summary: 'A corporate website for a firm of chartered accountants: audit and assurance, accounting, tax and financial advisory.' },
  { name: 'Ifeanyi Odii — Campaign Website', category: 'Campaign / Digital communications', group: PERSONAL, url: 'https://voteifeanyiodii.com.ng/', image: 'odii-c',
    summary: 'The central digital presence for a 2027 Ebonyi State governorship campaign: profile, vision, messaging and mobilisation.' },
  { name: 'Dr. Festus Fadeyi', category: 'Executive personal brand', group: PERSONAL, url: 'https://drffat85.com/',
    summary: 'A premium executive profile for a prominent oil and gas leader.' },
  { name: 'Acesolvit', category: 'Corporate', group: PERSONAL, url: 'http://acesolvit.com/', logo: '/images/clients/acesolvit.webp',
    summary: 'A corporate web presence for Acesolvit.' },
];

// Client logos (from techatronagency.com).
export const clientLogos = [
  { name: 'HostComm Summit', src: '/images/clients/hostcomm-summit.webp' },
  { name: 'Caritas', src: '/images/clients/caritas.webp' },
  { name: 'Comono', src: '/images/clients/comono.webp' },
  { name: 'Brick Homes', src: '/images/clients/brick-homes.webp' },
  { name: 'Zealot Chemicals', src: '/images/clients/zealot.webp' },
  { name: 'Powernest', src: '/images/clients/powernest.webp' },
  { name: 'The Catalyst', src: '/images/clients/the-catalyst.webp' },
  { name: 'Doowe', src: '/images/clients/doowe.webp' },
  { name: 'Advent Management Solutions', src: '/images/clients/advent.webp' },
  { name: 'Cordiant Resources', src: '/images/clients/cordiant.webp' },
  { name: 'SEE Lifestyle', src: '/images/clients/see.webp' },
  { name: 'The Wardrobe Manager', src: '/images/clients/wardrobe-manager.webp' },
  { name: 'Acesolvit', src: '/images/clients/acesolvit.webp' },
  { name: 'C.S.E Phones NG', src: '/images/clients/cse-phones.webp' },
  { name: 'Don Lamba', src: '/images/clients/don-lamba.webp' },
];
