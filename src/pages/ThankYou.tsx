import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Linkedin,
  Twitter,
  MessageCircle,
  Mail,
  Users,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/Footer";

interface ThankYouState {
  firstName?: string;
  company?: string;
  pledgeNumber?: number;
}

const SITE_URL = "https://apprenticepledge.com";

const shareText = {
  linkedin:
    "I've just taken the Apprentice Pledge — committing to hire at least one apprentice in the next 12 months. 957,000 young people in the UK are NEET. One hire can change that. Join me: apprenticepledge.com",
  twitter:
    "I've taken the Apprentice Pledge. One apprentice. One year. Real impact. apprenticepledge.com #ApprenticePledge",
  whatsapp:
    "I just signed the Apprentice Pledge — committing to hire an apprentice this year. If you run a business, join me: apprenticepledge.com",
};

const shareLinks = [
  {
    label: "Share on LinkedIn",
    icon: Linkedin,
    href: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
      shareText.linkedin
    )}`,
  },
  {
    label: "Share on X",
    icon: Twitter,
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText.twitter
    )}`,
  },
  {
    label: "Share on WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/?text=${encodeURIComponent(shareText.whatsapp)}`,
  },
];

const steps = [
  {
    icon: Mail,
    title: "Check your inbox",
    description: "Your confirmation email is landing right now, with everything you need to get set up as an employer.",
  },
  {
    icon: Users,
    title: "Meet your candidates",
    description: "We'll connect you with apprentice-ready candidates through our sister brand, Another Avenue.",
  },
  {
    icon: BadgeCheck,
    title: "Join the pledge wall",
    description: "Your name goes up on the pledge wall on the homepage — a public signal to your peers and the next generation.",
  },
];

const recentSignatories = [
  "Sarah, Founder — Manchester",
  "James, MD — Leeds",
  "Priya, CEO — London",
  "Tom, Founder — Bristol",
  "Aisha, Director — Birmingham",
];

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state as ThankYouState | null) ?? {};
  const { firstName, company, pledgeNumber } = state;

  const youLabel = firstName
    ? `${firstName}${company ? ` — ${company}` : ""}`
    : "You — just now";

  return (
    <>
      <Helmet>
        <title>You&rsquo;ve Taken the Pledge | The Apprentice Pledge</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="px-6 pt-24 pb-24 md:pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Hero confirmation */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <BadgeCheck className="w-10 h-10" strokeWidth={1.5} />
            </div>

            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
              Pledge Confirmed
            </p>

            <h1 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.88] mb-8">
              You&rsquo;ve taken <br />
              the <span className="text-primary">pledge.</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10">
              {firstName ? `${firstName}, you've` : "You've"} just committed to
              changing a young person&rsquo;s life. That matters more than you know.
            </p>

            {pledgeNumber && (
              <div className="inline-flex flex-col items-center border-2 border-primary rounded-[2rem] px-10 py-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-1">
                  You are
                </span>
                <span className="font-display text-5xl md:text-6xl text-primary leading-none">
                  Pledge #{pledgeNumber}
                </span>
              </div>
            )}
          </div>

          {/* Social sharing — primary action */}
          <div className="mt-20 md:mt-24">
            <div className="text-center mb-10">
              <h2 className="font-display uppercase text-3xl md:text-5xl leading-none mb-4">
                Now make it <span className="text-primary">count.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The pledge spreads when leaders talk. Tell your network you&rsquo;ve
                signed — and pull them in with you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-primary text-primary-foreground py-5 rounded-2xl font-bold uppercase tracking-[0.15em] text-sm hover:bg-white transition-colors"
                >
                  <s.icon className="w-5 h-5" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-20 md:mt-28">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
              What Happens Next
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {steps.map((step, i) => (
                <div key={step.title} className="border-t border-border pt-8">
                  <div className="font-display text-5xl text-muted-foreground mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <step.icon className="w-9 h-9 text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="text-lg md:text-xl font-bold uppercase mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pledge wall strip with their name highlighted */}
          <div className="mt-20 md:mt-28">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6 text-center">
              Recent signatories
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-display uppercase text-lg md:text-2xl bg-primary text-primary-foreground px-5 py-2 rounded-full">
                {youLabel}
              </span>
              {recentSignatories.map((name) => (
                <span
                  key={name}
                  className="font-display uppercase text-lg md:text-2xl text-muted-foreground/70 px-2"
                >
                  {name}
                  <span className="opacity-20 ml-3">✦</span>
                </span>
              ))}
            </div>
          </div>

          {/* Secondary CTAs — no dead ends */}
          <div className="mt-20 md:mt-24 pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-sm group"
            >
              See who else has pledged
              <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <a
              href="https://another-avenue.co.uk/employers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-sm group"
            >
              Find candidates
              <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou;
