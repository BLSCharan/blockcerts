import { HeroSection } from "../components/home/HeroSection";
import { AboutSection } from "../components/home/AboutSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { StatsSection } from "../components/home/StatsSection";
import { CTASection } from "../components/home/CTASection";

function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}

export default Home;