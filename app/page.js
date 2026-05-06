import Hero from "./components/Hero";
import About from "./components/About";
import ServicesOverview from "./components/ServicesOverview";
import CTABanner from "./components/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ServicesOverview />
      <CTABanner />
    </main>
  );
}
