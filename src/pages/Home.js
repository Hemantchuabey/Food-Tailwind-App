import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppCTA from "../components/AppCTA";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Marquee from "../components/Marquee";
import MenuSection from "../components/MenuSection";
import Offers from "../components/Offers";
import Testimonials from "../components/Testimonials";

export default function Home() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 60);
    return () => clearTimeout(t);
  }, [hash, key]);

  return (
    <main>
      <Hero />
      <Marquee />
      <MenuSection />
      <Offers />
      <HowItWorks />
      <Testimonials />
      <AppCTA />
    </main>
  );
}
