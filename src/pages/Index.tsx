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
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} A Consultant. All rights reserved.
          </p>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};

export default Index;
