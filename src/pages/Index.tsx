import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSlideshow from "@/components/HeroSlideshow";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import AIAssistant from "@/components/AIAssistant";
import CircularLoader from "@/components/CircularLoader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <CircularLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSlideshow />
        <AboutSection />
        <ServicesSection />
        <HowWeWorkSection />
        <BlogPreview />
        <ContactSection />
      </main>
      <footer className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">A Consultant</h3>
            <p className="text-sm opacity-90">
              Engineering Excellence & Technical Draughting Services
            </p>
            <div className="flex justify-center gap-6 pt-4">
              <a href="#home" className="hover:text-accent transition-colors story-link">
                Home
              </a>
              <a href="#about" className="hover:text-accent transition-colors story-link">
                About
              </a>
              <a href="#services" className="hover:text-accent transition-colors story-link">
                Services
              </a>
              <a href="#contact" className="hover:text-accent transition-colors story-link">
                Contact
              </a>
            </div>
            <p className="text-sm pt-6 border-t border-primary-foreground/20 mt-6">
              © {new Date().getFullYear()} A Consultant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};

export default Index;
