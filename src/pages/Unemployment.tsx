import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Footer from "@/components/Footer";

const youthUnemployment = [
  { period: "2021", rate: 13.1 },
  { period: "2022", rate: 11.0 },
  { period: "2023", rate: 11.9 },
  { period: "2024", rate: 14.3 },
  { period: "2025", rate: 16.2 },
];

const neetByQuarter = [
  { period: "Q1 25", neet: 872 },
  { period: "Q2 25", neet: 901 },
  { period: "Q3 25", neet: 924 },
  { period: "Q4 25", neet: 957 },
];

const chartTooltipStyle = {
  background: "hsl(0 0% 10%)",
  border: "1px solid hsl(0 0% 18%)",
  borderRadius: "0.75rem",
  textTransform: "uppercase" as const,
  fontSize: "11px",
  letterSpacing: "0.1em",
};

const Unemployment = () => {
  return (
    <>
      <Helmet>
        <title>UK Youth Unemployment Data | The Apprentice Pledge</title>
        <meta
          name="description"
          content="The latest UK youth unemployment and NEET figures, visualised. 957,000 young people aged 16–24 are not in education, employment, or training."
        />
        <link
          rel="canonical"
          href="https://apprenticepledge.com/unemployment"
        />
      </Helmet>

      <main className="px-6 pt-24 pb-24 md:pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
              UK Labour Market
            </p>
            <h1 className="font-display uppercase text-5xl md:text-8xl leading-[0.9] mb-8">
              The data behind <br />
              the <span className="text-primary">pledge.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Figures drawn from the ONS Labour Market overview. Youth
              unemployment runs at more than three times the national average,
              and the number of young people classed as NEET keeps climbing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {[
              { figure: "957,000", label: "16–24 NEET" },
              { figure: "16.2%", label: "Youth unemployment rate" },
              { figure: "1 in 2", label: "Hidden NEET, claiming no benefits" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-[2rem] p-8 md:p-10"
              >
                <div className="font-display text-6xl md:text-7xl text-primary leading-none mb-4">
                  {stat.figure}
                </div>
                <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-[2rem] p-8 md:p-10">
              <h2 className="font-display uppercase text-2xl md:text-3xl mb-2">
                Youth unemployment rate
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Ages 16–24, % unemployed
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={youthUnemployment}>
                    <defs>
                      <linearGradient id="rate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(73 96% 56%)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="hsl(73 96% 56%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" vertical={false} />
                    <XAxis dataKey="period" stroke="hsl(0 0% 62%)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(0 0% 62%)" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                    <Tooltip contentStyle={chartTooltipStyle} cursor={{ stroke: "hsl(0 0% 30%)" }} />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="hsl(73 96% 56%)"
                      strokeWidth={3}
                      fill="url(#rate)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-[2rem] p-8 md:p-10">
              <h2 className="font-display uppercase text-2xl md:text-3xl mb-2">
                NEET, by quarter
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Thousands of 16–24 year-olds, 2025
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={neetByQuarter}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" vertical={false} />
                    <XAxis dataKey="period" stroke="hsl(0 0% 62%)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(0 0% 62%)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "hsl(0 0% 100% / 0.04)" }} />
                    <Bar dataKey="neet" fill="hsl(73 96% 56%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 mt-10">
            Source:{" "}
            <a
              href="https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/unemployment"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              ONS Labour Market, 2025
            </a>{" "}
            · Illustrative figures for demonstration.
          </p>

          <div className="mt-16 pt-12 border-t border-border text-center">
            <h2 className="font-display uppercase text-3xl md:text-5xl mb-6 leading-none">
              Numbers change when <span className="text-primary">employers do.</span>
            </h2>
            <Link
              to="/#pledge-form"
              className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors"
            >
              Take the Pledge
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Unemployment;
