const stats = [
  {
    number: "01",
    figure: "957,000",
    title: "Young People NEET",
    description:
      "Aged 16–24 and not in education, employment, or training. A generation waiting for a door to open.",
    source: "ONS Labour Market, Oct–Dec 2025",
    sourceUrl:
      "https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/unemployment/bulletins/youngpeoplenotineducationemploymentortrainingneet/latest",
  },
  {
    number: "02",
    figure: "16.2%",
    title: "Youth Unemployment",
    description:
      "Unemployment for 16–24 year-olds runs at more than three times the national average.",
    source: "ONS Youth Unemployment, 2025",
    sourceUrl:
      "https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/unemployment",
  },
  {
    number: "03",
    figure: "1 in 2",
    title: "\u201cHidden NEET\u201d",
    description:
      "Roughly half of NEET young people claim no benefits — invisible to the system, and to most employers.",
    source: "Youth Futures Foundation / ONS, 2025",
    sourceUrl: "https://youthfuturesfoundation.org/",
  },
];

const StatsSection = () => {
  return (
    <section id="why" className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            The Numbers
          </p>
          <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9]">
            The talent gap <br />
            is a <span className="text-primary">choice.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {stats.map((s) => (
            <div key={s.number} className="group border-t border-border pt-8 flex flex-col">
              <div className="font-display text-5xl text-muted-foreground mb-8 group-hover:text-primary transition-colors">
                {s.number}
              </div>
              <div className="font-display text-6xl md:text-7xl text-primary mb-4 leading-none">
                {s.figure}
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                {s.description}
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                Source:{" "}
                <a
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {s.source}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
