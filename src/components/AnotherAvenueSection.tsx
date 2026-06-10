import { ArrowRight } from "lucide-react";

const AnotherAvenueSection = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            The Sister Brand
          </p>
          <h2 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9]">
            Built by <br />
            <span className="text-primary">Another Avenue.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-xl">
            Another Avenue trains apprentice-ready candidates. The Apprentice Pledge places them.
            A natural pipeline from classroom to career.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
            We train the talent. You hire it.
          </p>
          <a
            href="https://another-avenue.co.uk/employers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-primary font-bold uppercase tracking-[0.2em] text-sm md:text-base group"
          >
            Find apprentice-ready candidates
            <span className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowRight className="w-5 h-5" />
            </span>
          </a>
        </div>

        <div className="w-full md:w-1/3 aspect-square relative shrink-0">
          <div className="absolute inset-0 bg-primary rounded-full translate-x-4 translate-y-4" />
          <div className="absolute inset-0 bg-card border border-border rounded-full flex flex-col items-center justify-center p-10 text-center">
            <div className="font-display text-2xl md:text-3xl uppercase leading-tight">
              Another<br />
              <span className="text-primary">Avenue</span>
            </div>
            <p className="text-[10px] mt-4 uppercase tracking-[0.3em] text-muted-foreground">
              Skills Bootcamps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnotherAvenueSection;
