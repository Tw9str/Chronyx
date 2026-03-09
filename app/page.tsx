import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Process from "@/components/Process";
import CostCalculator from "@/components/CostCalculator";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <CostCalculator />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
