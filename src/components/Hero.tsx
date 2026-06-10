import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  pledgedCount?: number;
}

const Hero = ({ pledgedCount = 42 }: HeroProps) => {
  const scrollToForm = () => {
    document.getElementById("pledge-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Young apprentices and a founder working together in a UK workshop at dusk"
          className="w-full h-full object-cover grayscale opacity-70"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 max-w-6xl w-full py-32">
        <p className="animate-fade-up text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-8">
          The Apprentice Pledge
        </p>

        <h1 className="animate-fade-up font-display uppercase font-bold leading-[0.85] tracking-tight mb-10 text-[clamp(3rem,13vw,10rem)]">
          <span className="bg-primary text-background px-3 md:px-5 py-1 rounded-lg inline-block">957,000</span> YOUNG<br />
          PEOPLE. <span className="text-primary">NO JOB.</span><br />
          NO FUTURE.
        </h1>

        <p className="animate-fade-up-delay text-zinc-300 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          One apprentice. One year. That&rsquo;s the pledge.
        </p>

        <div className="animate-fade-up-delay-2 flex flex-col items-center gap-5">
          <button
            onClick={scrollToForm}
            className="inline-block bg-primary text-primary-foreground px-12 py-5 rounded-full font-bold uppercase tracking-[0.15em] text-sm md:text-base hover:bg-white transition-all transform hover:scale-105"
          >
            Take the Pledge
          </button>
          <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.25em] font-bold">
            Join <span className="text-primary">{pledgedCount}</span> businesses already committed
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
