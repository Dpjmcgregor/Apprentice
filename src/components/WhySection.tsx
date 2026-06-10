import { TrendingUp, Users, Building2, Heart, Globe } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Strengthen Your Business",
    description: "Apprentices add more in productivity than they cost. They bring energy, fresh ideas, and digital-native thinking. And they stay — retention is far higher than traditional hires."
  },
  {
    icon: Users,
    title: "Build Future Leaders",
    description: "Every industry is changing faster than the talent market can keep up. If you want future managers, operators, and leaders — you have to grow them yourself."
  },
  {
    icon: Building2,
    title: "Drive Economic Recovery",
    description: "One young person moving from unemployment into skilled work boosts tax receipts, local spending, and long-term productivity. A small action with a national impact."
  },
  {
    icon: Heart,
    title: "Shape Your Culture",
    description: "Nothing signals a forward-thinking, socially responsible employer more than giving people their first step into work."
  },
  {
    icon: Globe,
    title: "Build a Better UK",
    description: "If we want a better country to build companies in, we have to help build it. Less complaining. More creating opportunities."
  }
];

const WhySection = () => {
  return (
    <section id="why" className="py-24 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <p className="inline-block bg-primary text-secondary font-semibold tracking-wide uppercase text-sm mb-4 px-4 py-2 rounded-full">
            Why Join Us
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            Five Reasons to <span className="bg-primary text-secondary px-3 py-1 rounded-lg">Take the Pledge</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unemployment is rising — yet businesses still struggle to find talent. 
            The truth? The next generation is ready. What they lack is opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-accent/30"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors border-2 border-pink">
                <reason.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
