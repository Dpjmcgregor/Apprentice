export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "why-957000-young-people-need-you",
    title: "Why 957,000 Young People Need You to Hire an Apprentice",
    excerpt:
      "Nearly a million 16–24 year-olds in the UK are not in education, employment, or training. The fix isn't more policy — it's more employers saying yes.",
    date: "2026-05-28",
    readTime: "5 min read",
    category: "The Case",
    content: [
      "There are 957,000 young people in the UK aged 16 to 24 who are not in education, employment, or training. That's a city the size of Leeds, sitting outside the workforce. Behind the statistic are people who want to work and can't find the door in.",
      "The instinct is to treat this as a policy problem — something for government to solve with schemes and funding. But the lever that actually moves is simpler and closer to home: an employer deciding to take one person on.",
      "Apprenticeships are the most direct route from the outside in. Training is largely government-funded, the apprentice earns while they learn, and the employer shapes the skills to fit their business. Retention is higher than for graduate hires, whose average tenure sits at just 18–24 months.",
      "The Apprentice Pledge asks for one commitment: hire at least one apprentice in the next 12 months. Not a contract. A public promise, with your name beside everyone else who has made it.",
      "If every business reading this took on one apprentice, the NEET figure wouldn't be a headline anymore. It would be a list of names — of people who got their start because someone said yes.",
    ],
  },
  {
    slug: "apprentice-vs-graduate-true-cost",
    title: "Apprentice vs Graduate: The True Cost Over Four Years",
    excerpt:
      "Salary, NI, pension, training, and recruitment fees — when you add it all up, an apprentice costs roughly £48,000 less than a graduate hire.",
    date: "2026-05-12",
    readTime: "6 min read",
    category: "Business Case",
    content: [
      "Hiring decisions get made on instinct as often as on numbers. The instinct says a graduate is the safer bet. The numbers say otherwise.",
      "Over four years, the total employer cost of an apprentice — salary, employer National Insurance, pension contributions, and government-funded training — comes to roughly £115,000. A graduate, including two recruitment fees across the period, runs closer to £164,000.",
      "That's a difference of about £48,000 per hire. And it understates the gap, because it doesn't price in retention. Graduates leave; apprentices, shaped by your business from day one, tend to stay.",
      "The training cost is the part most employers miss. For most small and medium UK businesses, the government funds 95–100% of apprenticeship training. You're not paying for the qualification — you're paying a wage while someone becomes productive inside your own walls.",
      "None of this means a graduate is never the right hire. It means the default assumption deserves a second look. When you run the maths, the apprentice isn't the charitable option. It's the commercial one.",
    ],
  },
  {
    slug: "what-makes-an-apprenticeship-work",
    title: "What Actually Makes an Apprenticeship Work",
    excerpt:
      "The employers who get the most from apprentices do three things differently. None of them are expensive.",
    date: "2026-04-30",
    readTime: "4 min read",
    category: "How To",
    content: [
      "Taking on an apprentice is the easy part. Making it work — for them and for you — comes down to a handful of habits the best employers share.",
      "First, give the work real stakes. Apprentices grow fastest when their output matters. Busywork teaches nothing; a genuine brief with a deadline teaches everything.",
      "Second, name a mentor. Not a manager who signs off holiday, but someone whose job is to answer the dumb questions and close the gap between training and the floor. An hour a week changes outcomes.",
      "Third, plan the year past the badge. The apprentices who stay are the ones who can see what comes next — a role, a raise, a reason to build their career where they started it.",
      "Do those three things and an apprenticeship stops being a scheme you joined and becomes a pipeline you own.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
