import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BadgeCheck, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

interface ThankYouState {
  firstName?: string;
  company?: string;
}

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state as ThankYouState | null) ?? {};
  const { firstName, company } = state;

  return (
    <>
      <Helmet>
        <title>Thank You for Pledging | The Apprentice Pledge</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="min-h-[80vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl w-full text-center">
          <div className="w-20 h-20 mx-auto mb-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <BadgeCheck className="w-10 h-10" strokeWidth={1.5} />
          </div>

          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            Pledge Received
          </p>

          <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] mb-8">
            {firstName ? (
              <>
                Thank you, <span className="text-primary">{firstName}.</span>
              </>
            ) : (
              <>
                You&rsquo;re <span className="text-primary">in.</span>
              </>
            )}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            {company ? `${company} has joined ` : "You’ve joined "}
            the businesses committing to hire at least one apprentice in the next
            12 months. We&rsquo;ll be in touch with resources and apprentice-ready
            candidates from Another Avenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors"
            >
              Back to Home
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
