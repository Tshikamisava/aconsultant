import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            A Consultant
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors text-base font-medium"
            >
              Home
            </a>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors text-base font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors text-base font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-we-work")}
              className="text-foreground hover:text-primary transition-colors text-base font-medium"
            >
              Projects
            </button>
            <a
              href="/blog"
              className="text-foreground hover:text-primary transition-colors text-base font-medium"
            >
              Blog
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors text-base font-medium"
            >
              Contact
            </button>
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:block shadow-medium hover:shadow-glow transition-all duration-300"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
