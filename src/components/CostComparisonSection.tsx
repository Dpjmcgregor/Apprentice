import { TrendingDown } from "lucide-react";

const apprenticeYears = [
  { label: "Year One", detail: "£18,000 salary + £900 pension + £0 NI", total: "£18,900" },
  { label: "Year Two", detail: "£25,000 salary + £1,250 pension + £2,063 NI", total: "£28,313" },
  { label: "Year Three", detail: "£30,000 salary + £1,500 pension + £2,713 NI", total: "£34,213" },
];

const graduateYears = [
  { label: "Year One", detail: "£30,000 salary + £1,500 pension + £3,156 NI + £4,500 fee", total: "£34,656" },
  { label: "Year Two", detail: "£31,000 salary + £1,550 pension + £3,294 NI + £4,500 fee", total: "£35,844" },
  { label: "Year Three", detail: "£32,000 salary + £1,600 pension + £3,432 NI", total: "£37,032" },
];

const CostComparisonSection = () => {
  return (
    <section id="business-case" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-4xl">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            The Business Case
          </p>
          <h2 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            An apprentice costs <br />
            <span className="text-primary">c.£48,000 less</span> <br />
            than a graduate.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
            Over four years, the total employer cost of an apprentice — salary, NI, pension and
            government-funded training — comes in dramatically lower than a graduate hire. And
            retention is far higher.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Apprentice — winning side */}
          <div className="bg-primary text-primary-foreground rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-[0.25em] bg-primary-foreground text-primary px-3 py-1 rounded-full">
              Recommended
            </div>
            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2 opacity-70">
              Option A
            </p>
            <h3 className="font-display uppercase text-5xl md:text-6xl mb-2">Apprentice</h3>
            <p className="text-sm opacity-70 mb-8">Total employer cost inc. NI & Pension</p>

            <div className="space-y-4 mb-8">
              {apprenticeYears.map((y) => (
                <div key={y.label} className="border-b border-primary-foreground/20 pb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold uppercase tracking-wider text-sm">{y.label}</span>
                    <span className="font-display text-2xl">{y.total}</span>
                  </div>
                  <p className="text-xs opacity-70">{y.detail}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-primary-foreground pt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70 mb-1">
                Grand Total · 4 Years
              </p>
              <p className="font-display text-6xl md:text-7xl leading-none">c.£115,639</p>
              <p className="text-xs mt-3 opacity-70 uppercase tracking-wider">
                Shaped by your business · Higher retention
              </p>
            </div>
          </div>

          {/* Graduate — comparison side */}
          <div className="bg-card border border-border rounded-[2rem] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2 text-muted-foreground">
              Option B
            </p>
            <h3 className="font-display uppercase text-5xl md:text-6xl mb-2">Graduate</h3>
            <p className="text-sm text-muted-foreground mb-8">Total employer cost inc. NI & Pension</p>

            <div className="space-y-4 mb-8">
              {graduateYears.map((y) => (
                <div key={y.label} className="border-b border-border pb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold uppercase tracking-wider text-sm">{y.label}</span>
                    <span className="font-display text-2xl">{y.total}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{y.detail}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-border pt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-1">
                Grand Total · 4 Years
              </p>
              <p className="font-display text-6xl md:text-7xl leading-none">c.£163,752</p>
              <p className="text-xs mt-3 text-muted-foreground uppercase tracking-wider">
                Plus two recruitment fees · Avg tenure 18–24 months
              </p>
            </div>
          </div>
        </div>

        {/* Bottom call-out */}
        <div className="mt-10 md:mt-12 border-t border-border pt-10 md:pt-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <TrendingDown className="w-12 h-12 text-primary shrink-0" />
          <div className="flex-1">
            <p className="font-display uppercase text-3xl md:text-5xl leading-[0.95]">
              Save <span className="text-primary">c.£48,000</span> per hire — and keep them longer.
            </p>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Apprentices are shaped by your business, funded by government training, and stay far
              longer than graduate hires whose average tenure is just 18–24 months.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostComparisonSection;
