// Insights. Opinion pieces in Techatron's voice, developed from the convictions and
// engineering standards published on techatronagency.com. They make no claims about
// clients, results or figures. Review before publishing.

export type Block = { t: 'lead' | 'p' | 'h2' | 'strong'; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Engineering' | 'Product' | 'Consulting';
  readMinutes: number;
  published: string; // ISO date
  cover: 'dots' | 'bars' | 'rings' | 'grid' | 'stack' | 'wave';
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'clarity-beats-complexity',
    title: 'Clarity Beats Complexity',
    excerpt: 'Why the simplest system that reliably meets the need is almost always the right one.',
    category: 'Engineering',
    readMinutes: 4,
    published: '2026-11-08',
    cover: 'dots',
    body: [
      { t: 'lead', text: 'Most software does not fail because it was too simple. It fails because it became too complicated to understand, change or run. Clarity is not a style preference; it is an operating cost decision.' },
      { t: 'p', text: 'Every component you add is something that has to be deployed, monitored, secured, upgraded and explained to the next engineer. A message queue, a second database or a microservice can each be the right answer, but only when the problem genuinely asks for them. Added early, “just in case”, they turn a straightforward product into a system nobody fully understands.' },
      { t: 'h2', text: 'Start from the job, not the stack' },
      { t: 'p', text: 'We begin every engagement by writing down what the system has to do, for whom, and what success looks like. Only then do we choose technology. That order matters: it keeps the conversation about the business problem, and it makes it obvious when a tool is solving a problem you do not have.' },
      { t: 'h2', text: 'Design for the growth you expect' },
      { t: 'p', text: 'Scalability is real, but it is specific. A platform serving a single estate has different needs from one serving a national user base. We design for the growth the business actually expects, and keep the path to the next stage open, rather than paying today for the scale of a hypothetical future.' },
      { t: 'h2', text: 'Clear systems are cheaper systems' },
      { t: 'p', text: 'A clear architecture is quicker to change, easier to test and safer to hand over. It also makes honest estimates possible, because you can see what a change will touch. Over the life of a product that clarity compounds, and it is usually the difference between software that keeps earning its keep and software that has to be replaced.' },
      { t: 'strong', text: 'The question we keep asking is simple: what is the least we can build that reliably does the job, and leaves room to grow?' },
    ],
  },
  {
    slug: 'honesty-saves-money',
    title: 'Honesty Saves Money',
    excerpt: 'Saying early when something is risky, unnecessary or better bought than built.',
    category: 'Consulting',
    readMinutes: 4,
    published: '2026-11-08',
    cover: 'bars',
    body: [
      { t: 'lead', text: 'The most valuable thing a technology partner can say is sometimes “you don’t need this”. The earlier that is said, the cheaper it is.' },
      { t: 'p', text: 'Risk is cheapest to deal with at the start of a project, when it is still an assumption on a page rather than code in production. That is why our process is built to surface risk early: unclear requirements, fragile integrations, unrealistic timelines, features nobody has validated.' },
      { t: 'h2', text: 'Build, buy or skip' },
      { t: 'p', text: 'Not everything should be custom software. Accounting, email, HR and many back-office functions are well served by existing products. Custom engineering earns its place where the process is genuinely distinctive, where off-the-shelf tools force the business to bend around them, or where owning the platform is a strategic advantage.' },
      { t: 'p', text: 'We put build-versus-buy on the table in the first conversation, and we say plainly when the right answer is a subscription rather than a project.' },
      { t: 'h2', text: 'Proposals that state their assumptions' },
      { t: 'p', text: 'A proposal is only useful if you can compare it and hold it to account. Ours set out scope, approach, timeline and cost, and, just as importantly, the assumptions and risks behind them. When an assumption changes, everyone can see what it affects.' },
      { t: 'strong', text: 'Honesty is not a soft value in technology work. It is the cheapest form of risk management there is.' },
    ],
  },
  {
    slug: 'launch-is-the-beginning',
    title: 'Launch Is the Beginning',
    excerpt: 'Software creates value in use, so we plan for operating and improving it from day one.',
    category: 'Product',
    readMinutes: 5,
    published: '2026-11-08',
    cover: 'rings',
    body: [
      { t: 'lead', text: 'Launch day is the first day your software starts doing its real job. Everything before it is preparation.' },
      { t: 'p', text: 'Most software costs more to run and change than it did to build. Yet many projects are planned as if the finish line were go-live: a big reveal, a handover, and a team that moves on. The product then meets real users, real data and real networks without anyone watching closely.' },
      { t: 'h2', text: 'Ship with monitoring and a way back' },
      { t: 'p', text: 'We deploy with monitoring and alerting in place, so we hear about problems before customers do, and with a rollback plan, so a bad release is an inconvenience rather than an incident. Automated deployment makes small, frequent releases routine instead of risky.' },
      { t: 'h2', text: 'Hand over properly' },
      { t: 'p', text: 'Documentation and training are part of the build, not an afterthought. Whoever operates the system next, your team or ours, should be able to understand how it works, how to change it and what to do when something goes wrong.' },
      { t: 'h2', text: 'Learn from use' },
      { t: 'p', text: 'The best ideas for version two come from watching version one in use. Planning for support and improvement from the start means there is a budget, a team and a habit in place to act on what you learn.' },
      { t: 'strong', text: 'We plan every project with its second year in mind. That is when good software proves its worth.' },
    ],
  },
  {
    slug: 'designing-for-the-phones-your-users-have',
    title: 'Designing for the Phones Your Users Actually Have',
    excerpt: 'Performance budgets, mid-range devices and the networks your customers are really on.',
    category: 'Engineering',
    readMinutes: 5,
    published: '2026-11-08',
    cover: 'wave',
    body: [
      { t: 'lead', text: 'Your product is not used on the laptop it was built on. It is used on a mid-range phone, on a congested network, often with a few minutes to spare.' },
      { t: 'p', text: 'It is easy to judge software on a fast office connection and a flagship device. Users rarely experience it that way. Slow loads and janky screens are not cosmetic problems; they are where enquiries, payments and sign-ups are lost.' },
      { t: 'h2', text: 'Set a budget, then test against it' },
      { t: 'p', text: 'We set performance budgets early (how heavy a page may be, how fast it must become usable) and test against them throughout the project, on representative devices and network conditions. A budget turns performance from a hope into a requirement.' },
      { t: 'h2', text: 'Offline is a feature' },
      { t: 'p', text: 'Where connectivity is unreliable, design for it. Installable web apps can start without a network, keep working with cached data and say clearly how old that data is. For reporting in the field, channels like USSD reach any handset, with no data plan required.' },
      { t: 'h2', text: 'Mobile first means mobile first' },
      { t: 'p', text: 'Designing the small screen first forces clarity: one primary action, the essential information, nothing that does not earn its space. The larger layouts then add room rather than fixing a cramped afterthought.' },
      { t: 'strong', text: 'Respecting your users’ devices is respecting their time, and that shows up directly in your results.' },
    ],
  },
  {
    slug: 'build-or-buy',
    title: 'Build or Buy? A Practical Way to Decide',
    excerpt: 'A short set of questions that makes the most expensive technology decision easier.',
    category: 'Consulting',
    readMinutes: 4,
    published: '2026-11-08',
    cover: 'grid',
    body: [
      { t: 'lead', text: 'Few technology decisions shape cost and flexibility as much as whether to build something custom or adopt an existing product.' },
      { t: 'h2', text: 'Is the process genuinely distinctive?' },
      { t: 'p', text: 'If the way you work is part of what makes the business competitive, custom software can protect and amplify it. If the process is standard, an established product has usually solved it already, and keeps improving it at someone else’s expense.' },
      { t: 'h2', text: 'What does it cost to bend?' },
      { t: 'p', text: 'Off-the-shelf tools come with assumptions. Count the workarounds, spreadsheets and manual re-keying your team would need to fit around them. When that hidden cost is large and permanent, building becomes the cheaper option.' },
      { t: 'h2', text: 'How will it connect?' },
      { t: 'p', text: 'Most systems do not live alone. Check how a product exposes its data, whether it supports webhooks and APIs, and what it would take to integrate with payments, CRMs or accounting. Poor integration is where many “bought” solutions quietly become expensive.' },
      { t: 'h2', text: 'Who will run it in two years?' },
      { t: 'p', text: 'Custom software needs an owner, a support plan and a budget for change. If those are not realistic, a well-chosen product, configured properly, is often the better answer.' },
      { t: 'strong', text: 'The right answer is frequently a mix: buy the commodity, build the advantage, and integrate the two cleanly.' },
    ],
  },
  {
    slug: 'quality-is-a-habit',
    title: 'Quality Is a Habit, Not a Phase',
    excerpt: 'Reviews, tests and documentation belong in every change, not in a phase at the end.',
    category: 'Engineering',
    readMinutes: 4,
    published: '2026-11-08',
    cover: 'stack',
    body: [
      { t: 'lead', text: 'If quality is something you check at the end, it is already too late and too expensive to fix properly.' },
      { t: 'p', text: 'Traditional projects often reserve a testing phase before launch. In practice, that phase gets squeezed by everything that ran late before it, and defects are found when they are hardest to fix. We treat quality as a habit applied to every change instead.' },
      { t: 'h2', text: 'Every change is reviewed' },
      { t: 'p', text: 'A second engineer reads every change before it is merged. Review catches mistakes, but it also spreads knowledge across the team, so no part of the system depends on one person.' },
      { t: 'h2', text: 'Tests run automatically' },
      { t: 'p', text: 'Automated tests run on every change, so regressions are caught in minutes rather than discovered by customers. Before release, we confirm the whole system end to end: function, performance, security and accessibility.' },
      { t: 'h2', text: 'Documentation travels with the code' },
      { t: 'p', text: 'Readable code, clear conventions and documentation written alongside the work keep software affordable to change long after launch. They are what make a codebase something you own, rather than something you depend on its authors to explain.' },
      { t: 'strong', text: 'Quality is not slower. Habits like these are what let a team keep moving quickly, month after month.' },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleFilters = ['All', 'Engineering', 'Product', 'Consulting'] as const;
