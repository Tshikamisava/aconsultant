import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    title: "Engineering Excellence",
    subtitle: "Precision in every design",
  },
  {
    image: hero2,
    title: "Innovation & Expertise",
    subtitle: "Building the future together",
  },
  {
    image: hero3,
    title: "Quality You Can Trust",
    subtitle: "Delivering results that matter",
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="inline-block text-white drop-shadow-lg">{slides[currentSlide].title.split(' ')[0]}</span>{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent inline-block drop-shadow-lg">
              {slides[currentSlide].title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-lg animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {slides[currentSlide].subtitle}
          </p>
          <Button
            size="lg"
            onClick={scrollToAbout}
            className="bg-white text-primary hover:bg-white/90 hover:scale-105 shadow-glow text-lg px-8 py-6 transition-all duration-300 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]"
          >
            Discover More
          </Button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 hover:scale-110 backdrop-blur-xl transition-all duration-300 shadow-medium"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 hover:scale-110 backdrop-blur-xl transition-all duration-300 shadow-medium"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
