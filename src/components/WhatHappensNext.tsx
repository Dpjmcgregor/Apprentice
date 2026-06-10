import { Mail, Users, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Confirmation Email",
    description:
      "You\u2019ll receive an instant confirmation with apprenticeship resources and how to get set up as an employer.",
  },
  {
    icon: Users,
    title: "Apprentice-Ready Candidates",
    description:
      "We connect you with trained, apprentice-ready candidates through our sister brand Another Avenue.",
  },
  {
    icon: BadgeCheck,
    title: "Featured Signatory",
    description:
      "Your name and company appear publicly on this page as a pledge signatory \u2014 a signal to peers and to the next generation.",
  },
];

const WhatHappensNext = () => {
  return (
    <section id="what-happens-next" className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            What Happens Next
          </p>
          <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9]">
            Three steps after <br />
            you <span className="text-primary">pledge.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {steps.map((step, i) => (
            <div key={step.title} className="border-t border-border pt-8">
              <div className="font-display text-5xl text-muted-foreground mb-8">
                {String(i + 1).padStart(2, "0")}
              </div>
              <step.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatHappensNext;
