import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is the Apprentice Pledge?",
    a: "The Apprentice Pledge is a UK movement of founders, leaders and employers who commit to hire, train and develop at least one apprentice in the next 12 months. It's a public pledge — your name and company are listed alongside everyone else who has signed.",
  },
  {
    q: "Who can take the pledge?",
    a: "Any UK-based business or organisation that is willing to commit to hiring at least one apprentice in the next 12 months. Sole traders, startups, scale-ups and large employers are all welcome.",
  },
  {
    q: "How much does it cost to hire an apprentice in the UK?",
    a: "For most small and medium UK employers, the government funds 95–100% of apprenticeship training costs. You pay the apprentice's wage (from £6.40/hour in 2024 for under-19s or first-year apprentices). Compared to a typical junior hire, apprentices cost significantly less in the first year while delivering productive work.",
  },
  {
    q: "Why hire an apprentice instead of a graduate or junior employee?",
    a: "Apprentices are trained on the job to your standards, stay in role longer than the average junior hire, and bring fresh thinking. The government subsidises training, retention is higher, and you build loyalty and culture from day one.",
  },
  {
    q: "What happens after I take the pledge?",
    a: "You'll be added to the public list of pledgers, receive a short confirmation email, and get access to resources from Another Avenue — our sister organisation that connects UK employers with apprenticeship-ready young people.",
  },
  {
    q: "Is the Apprentice Pledge legally binding?",
    a: "No. It's a public commitment, not a contract. The pressure is reputational — your name is on the list. The point is to make the intent visible and create accountability among UK employers.",
  },
];

const FAQSection = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-background border-t border-border"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="container px-6 max-w-3xl">
        <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">
          Questions
        </p>
        <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground mb-10 leading-none">
          Frequently asked
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
