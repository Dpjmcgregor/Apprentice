import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsSection from "@/components/StatsSection";
import WhySection from "@/components/WhySection";
import CostComparisonSection from "@/components/CostComparisonSection";
import WhatHappensNext from "@/components/WhatHappensNext";
import AnotherAvenueSection from "@/components/AnotherAvenueSection";
import FAQSection from "@/components/FAQSection";
import PledgeForm from "@/components/PledgeForm";
import Footer from "@/components/Footer";

const PLEDGED_COUNT = 42;

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The Apprentice Pledge | Hire an Apprentice | UK Youth Employment</title>
        <meta
          name="description"
          content="957,000 young people in the UK are NEET. Take the Apprentice Pledge — commit to hiring at least one apprentice in the next 12 months. Join the movement."
        />
        <link rel="canonical" href="https://apprenticepledge.com/" />
      </Helmet>

      <main>
        <Hero pledgedCount={PLEDGED_COUNT} />
        <MarqueeStrip />
        <StatsSection />
        <WhySection />
        <CostComparisonSection />
        <WhatHappensNext />
        <AnotherAvenueSection />
        <FAQSection />
        <PledgeForm pledgedCount={PLEDGED_COUNT} />
      </main>
      <Footer />
    </>
  );
};

export default Index;
