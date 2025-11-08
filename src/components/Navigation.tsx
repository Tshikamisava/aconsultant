import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Layers, Briefcase, BookOpen, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [overBlogs, setOverBlogs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnBlogPage, setIsOnBlogPage] = useState(false);

  useEffect(() => {
    // Check if we're on the blog page
    setIsOnBlogPage(window.location.pathname === '/blog');
    
    // Handle hash navigation on page load/change
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Small delay to ensure page is loaded
      }
    };

    // Check for hash on initial load
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

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

  // Observe whether the blog section is in view
  useEffect(() => {
    const blogs = document.getElementById("blogs");
    if (!blogs) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setOverBlogs(entry.isIntersecting);
      },
      { root: null, threshold: 0.15 }
    );

    io.observe(blogs);
    return () => io.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If element doesn't exist (e.g., on blog page), go to home page first
      if (window.location.pathname !== '/') {
        window.location.href = `/#${id}`;
      } else {
        // If we're on home page but element doesn't exist yet, wait a bit
        setTimeout(() => {
          const delayedElement = document.getElementById(id);
          if (delayedElement) {
            delayedElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    }
  };

  // link color: always black on blog page, white when over the hero (and not scrolled), black when over blogs, otherwise dark
  const linkColorClass = isOnBlogPage ? "text-foreground" : (overBlogs ? "text-foreground" : (!isScrolled && overHero ? "text-white" : "text-foreground"));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-0">
            <img src={logo} alt="A Consultant" className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto" />
            <span className="font-heading text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-primary whitespace-nowrap">Consultant</span>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden z-50 p-2 rounded-md hover:bg-black/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={20} className={linkColorClass} />
            ) : (
              <Menu size={20} className={linkColorClass} />
            )}
          </button>
          
          {/* Mobile menu */}
          <div className={`
            fixed inset-0 bg-background/95 backdrop-blur-sm lg:hidden
            flex flex-col items-center justify-center space-y-4 px-4 py-8
            transition-all duration-300 ease-in-out overflow-y-auto
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}>
            <a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center justify-center py-4 px-8 rounded-lg hover:bg-primary/5 w-full max-w-sm"
            >
              <Home size={20} className="mr-2" />
              Home
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("about");
              }}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center justify-center py-4 px-8 rounded-lg hover:bg-primary/5 w-full max-w-sm"
            >
              <User size={20} className="mr-2" />
              About
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("services");
              }}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center justify-center py-4 px-8 rounded-lg hover:bg-primary/5 w-full max-w-sm"
            >
              <Layers size={20} className="mr-2" />
              Services
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection("how-we-work");
              }}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center justify-center py-4 px-8 rounded-lg hover:bg-primary/5 w-full max-w-sm"
            >
              <Briefcase size={20} className="mr-2" />
              Key Factor
            </button>
            <a
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors text-lg font-medium flex items-center justify-center py-4 px-8 rounded-lg hover:bg-primary/5 w-full max-w-sm"
            >
              <BookOpen size={20} className="mr-2" />
              Blog
            </a>
            <Button
              onClick={() => {
                scrollToSection("contact");
                setIsMobileMenuOpen(false);
              }}
              className="shadow-medium hover:shadow-glow transition-all duration-300 w-full max-w-sm py-3 text-lg mt-4"
            >
              Get in Touch
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="/"
              className={`${linkColorClass} hover:text-primary transition-colors text-sm xl:text-base font-medium flex items-center`}
            >
              <Home size={14} className={`mr-1.5 xl:mr-2 ${linkColorClass}`} />
              Home
            </a>
            <button
              onClick={() => scrollToSection("about")}
              className={`${linkColorClass} hover:text-primary transition-colors text-sm xl:text-base font-medium flex items-center`}
            >
              <User size={14} className={`mr-1.5 xl:mr-2 ${linkColorClass}`} />
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`${linkColorClass} hover:text-primary transition-colors text-sm xl:text-base font-medium flex items-center`}
            >
              <Layers size={14} className={`mr-1.5 xl:mr-2 ${linkColorClass}`} />
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-we-work")}
              className={`${linkColorClass} hover:text-primary transition-colors text-sm xl:text-base font-medium flex items-center whitespace-nowrap`}
            >
              <Briefcase size={14} className={`mr-1.5 xl:mr-2 ${linkColorClass}`} />
              Key Factor
            </button>
            <a
              href="/blog"
              className={`${linkColorClass} hover:text-primary transition-colors text-sm xl:text-base font-medium flex items-center`}
            >
              <BookOpen size={14} className={`mr-1.5 xl:mr-2 ${linkColorClass}`} />
              Blog
            </a>
          </div>

          {/* Medium screen menu - simplified */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <a
              href="/"
              className={`${linkColorClass} hover:text-primary transition-colors text-xs font-medium flex items-center`}
            >
              <Home size={12} className={`mr-1 ${linkColorClass}`} />
              Home
            </a>
            <button
              onClick={() => scrollToSection("about")}
              className={`${linkColorClass} hover:text-primary transition-colors text-xs font-medium flex items-center`}
            >
              <User size={12} className={`mr-1 ${linkColorClass}`} />
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`${linkColorClass} hover:text-primary transition-colors text-xs font-medium`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-we-work")}
              className={`${linkColorClass} hover:text-primary transition-colors text-xs font-medium whitespace-nowrap`}
            >
              Key Factor
            </button>
            <a
              href="/blog"
              className={`${linkColorClass} hover:text-primary transition-colors text-xs font-medium`}
            >
              Blog
            </a>
          </div>

          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:block shadow-medium hover:shadow-glow transition-all duration-300 px-3 py-2 text-xs md:text-sm lg:px-4 lg:py-2.5 lg:text-base xl:px-6"
          >
            <span className="hidden lg:inline">Get in Touch</span>
            <span className="lg:hidden">Contact</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
