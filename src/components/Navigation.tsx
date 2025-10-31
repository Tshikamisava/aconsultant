import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Layers, Briefcase, BookOpen, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe whether the hero/landing section is in view so nav link colors
  // can adapt to the background (white over the hero, dark after scroll).
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setOverHero(entry.isIntersecting);
      },
      { root: null, threshold: 0.15 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // link color: white when over the hero (and not scrolled), otherwise dark
  const linkColorClass = !isScrolled && overHero ? "text-white" : "text-foreground";

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

          {/* Mobile menu button */}
          <button 
            className="md:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className={linkColorClass} />
            ) : (
              <Menu size={24} className={linkColorClass} />
            )}
          </button>
          
          {/* Mobile menu */}
          <div className={`
            fixed inset-0 bg-background/95 backdrop-blur-sm md:hidden
            flex flex-col items-center justify-center space-y-8
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}>
            <a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center"
            >
              <Home size={20} className="mr-2" />
              Home
            </a>
            <button
              onClick={() => {
                scrollToSection("about");
                setIsMobileMenuOpen(false);
              }}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center"
            >
              <User size={20} className="mr-2" />
              About
            </button>
            <button
              onClick={() => {
                scrollToSection("services");
                setIsMobileMenuOpen(false);
              }}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center"
            >
              <Layers size={20} className="mr-2" />
              Services
            </button>
            <button
              onClick={() => {
                scrollToSection("how-we-work");
                setIsMobileMenuOpen(false);
              }}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center"
            >
              <Briefcase size={20} className="mr-2" />
              Key Fector
            </button>
            <a
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center"
            >
              <BookOpen size={20} className="mr-2" />
              Blog
            </a>
            <Button
              onClick={() => {
                scrollToSection("contact");
                setIsMobileMenuOpen(false);
              }}
              className="shadow-medium hover:shadow-glow transition-all duration-300"
            >
              Get in Touch
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* when over the hero and not scrolled keep links light (white); otherwise dark */}
            {/** compute link color class here so it stays consistent across links */}
            
            <a
              href="/"
              className={`${linkColorClass} hover:text-primary transition-colors text-base font-medium flex items-center`}
            >
              <Home size={16} className={`mr-2 ${linkColorClass}`} />
              Home
            </a>
            <button
              onClick={() => scrollToSection("about")}
              className={`${linkColorClass} hover:text-primary transition-colors text-base font-medium flex items-center`}
            >
              <User size={16} className={`mr-2 ${linkColorClass}`} />
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`${linkColorClass} hover:text-primary transition-colors text-base font-medium flex items-center`}
            >
              <Layers size={16} className={`mr-2 ${linkColorClass}`} />
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-we-work")}
              className={`${linkColorClass} hover:text-primary transition-colors text-base font-medium flex items-center`}
            >
              <Briefcase size={16} className={`mr-2 ${linkColorClass}`} />
              Key Fector
            </button>
            <a
              href="/blog"
              className={`${linkColorClass} hover:text-primary transition-colors text-base font-medium flex items-center`}
            >
              <BookOpen size={16} className={`mr-2 ${linkColorClass}`} />
              Blog
            </a>
            {/* 
            <button
              onClick={() => scrollToSection("contact")}
              className={`${linkColorClass} hover:text-primary transition-colors text-base font-medium flex items-center`}
            >
              <Mail size={16} className={`mr-2 ${linkColorClass}`} />
              Contact
            </button>
            */}
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
