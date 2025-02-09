"use client";
import HeroSection from "./components/HeroSection";
import FeatureList from "./components/FeatureList";
import TestimonialSection from "./components/TestimonialSection";
import CallToAction from "./components/CallToAction";
import FAQSection from "./components/FAQSection";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <FeatureList />    
        <TestimonialSection />
        <FAQSection />
        <CallToAction />
      </main>
    </div>
  );
}