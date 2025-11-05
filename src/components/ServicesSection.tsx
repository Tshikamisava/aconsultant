import { useState, useEffect } from "react";
import {
  Home,
  Construction,
  Layers,
  Zap,
  PenTool,
  Boxes,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import pipingImage from "@/assets/services-piping.jpg";
import qualityImage from "@/assets/quality.jpg";
import workflowImage from "@/assets/workflow.jpg";
import hero1Image from "@/assets/hero-1.jpg";
import hero2Image from "@/assets/hero-2.jpg";
import hero3Image from "@/assets/hero-3.jpg";
import architecturalIcon from "@/assets/icon1.png";

const services = [
  {
    customIcon: architecturalIcon,
    title: "Architectural Design",
    description:
      "We deliver creative and functional architectural designs tailored to both commercial and residential projects. Our services focus on crafting visually appealing and practical solutions that meet client needs, enhance usability, and align with modern design standards.",
  },
  {
    icon: Construction,
    title: "Civil Design",
    description:
      "We specialise in detailed draughting and design for civil engineering projects, including infrastructure such as commercial and residential buildings, roads, highways, and process plants. Our services ensure precise and comprehensive plans that support efficient design, planning, and execution of complex projects.",
  },
  {
    icon: Zap,
    title: "Electrical Design",
    description:
      "We offer specialised draughting and design support for electrical engineering projects across various industries, including mining process plants, renewable energy, roads, highways, and building services. Our expertise extends to creating accurate layout drawings for MV & HV reticulation systems and substations ranging from 6.6kV to 400kV.",
  },
  {
    icon: PenTool,
    title: "Piping Design",
    description:
      "With extensive experience in petrochemical facilities and process plants, we offer reliable draughting support to your piping engineering team. Our accurate and detailed designs for piping systems ensure precise layouts that prioritise functionality, efficiency, and adherence to engineering standards.",
  },
  {
    icon: Boxes,
    title: "Mechanical Design",
    description:
      "We provide advanced draughting and design solutions for mechanical systems, supporting your teams in optimising performance, reliability, and efficiency. Our expertise ensures each system is designed to meet industry standards, delivering long-lasting, high-quality results.",
  },
  {
    icon: Layers,
    title: "Structural Design",
    description:
      "We offer detailed draughting and design services to support structural engineering across industries. Our expertise ensures every design maintains structural integrity, adheres to industry standards, and is optimised for functionality to meet unique project requirements.",
  },
];

const slideshowImages = [
  {
    src: pipingImage,
    title: "Advanced Piping Design",
    description: "Precision-engineered piping systems for industrial applications",
  },
  {
    src: qualityImage,
    title: "Quality Engineering Solutions",
    description: "Rigorous quality control and testing procedures",
  },
  {
    src: workflowImage,
    title: "Streamlined Project Workflow",
    description: "Efficient project management and delivery processes",
  },
  {
    src: hero1Image,
    title: "Structural Engineering Excellence",
    description: "Robust structural designs for complex projects",
  },
  {
    src: hero2Image,
    title: "Innovative Design Solutions",
    description: "Cutting-edge engineering approaches and methodologies",
  },
  {
    src: hero3Image,
    title: "Professional Project Delivery",
    description: "Delivering exceptional results on time and within budget",
  },
];

const ServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-wide">
            Our Services
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Comprehensive engineering solutions tailored to your needs
          </p>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-medium hover:shadow-glow transition-all duration-500 hover:-translate-y-3 animate-fade-in-up border-2 border-border/70 hover:border-primary/70 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-medium flex-shrink-0">
                  {service.customIcon ? (
                    <img 
                      src={service.customIcon} 
                      alt={service.title}
                      className="w-12 h-12 object-contain brightness-0 invert"
                    />
                  ) : service.icon ? (
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  ) : null}
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-strong animate-fade-in group">
          {/* Slideshow Images */}
          <div className="relative w-full h-[400px]">
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary shadow-glow' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
            <div className="text-center text-primary-foreground px-6 animate-fade-in-up">
              <h3 className="font-heading text-3xl md:text-4xl mb-4 tracking-wide">
                {slideshowImages[currentSlide].title}
              </h3>
              <p className="font-body text-lg mb-6 text-primary-foreground/90 font-light">
                {slideshowImages[currentSlide].description}
              </p>
              <div className="mt-8">
                <h4 className="font-heading text-2xl md:text-3xl mb-2 tracking-wide">
                  Ready to Start Your Project?
                </h4>
                <p className="font-body text-base text-primary-foreground/80 font-light">
                  Let's discuss how we can help bring your engineering vision to life
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
