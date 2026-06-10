const pledgers = [
  "NewGen",
  "Sarah, Founder — Manchester",
  "Nonsensical",
  "James, MD — Leeds",
  "Fearless Adventures",
  "Priya, CEO — London",
  "Foudys",
  "Tom, Founder — Bristol",
  "Array",
  "Aisha, Director — Birmingham",
];

const MarqueeStrip = () => {
  return (
    <section aria-label="Businesses and people who have already pledged" className="bg-primary text-primary-foreground border-y-4 border-background py-8 md:py-10 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee gap-12 md:gap-16">
        {[...pledgers, ...pledgers].map((name, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl uppercase tracking-tight shrink-0"
          >
            {name} <span className="opacity-30 ml-12 md:ml-16">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeStrip;
