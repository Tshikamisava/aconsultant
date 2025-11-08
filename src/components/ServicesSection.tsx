import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import pipingImage from "@/assets/services-piping.jpg";
import qualityImage from "@/assets/quality.jpg";
import workflowImage from "@/assets/workflow.jpg";
import hero1Image from "@/assets/hero-1.jpg";
import hero2Image from "@/assets/hero-2.jpg";
import hero3Image from "@/assets/hero-3.jpg";

const services = [
  {
    customIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17 9h2V7h-2zm0 4h2v-2h-2zm0 4h2v-2h-2zm0 4v-2h4V5h-9v1.4l-2-1.45V3h13v18zM1 21V11l7-5l7 5v10H9v-5H7v5zm2-2h2v-5h6v5h2v-7L8 8.45L3 12zm8 0v-5H5v5v-5h6z"/>
      </svg>
    ),
    title: "Architectural Design",
    description:
      "We deliver creative and functional architectural designs tailored to both commercial and residential projects. Our services focus on crafting visually appealing and practical solutions that meet client needs, enhance usability, and align with modern design standards.",
  },
  {
    customIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
        <path fill="currentColor" d="M352 264V64c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v200c0 13.3-10.7 24-24 24s-24-10.7-24-24V78.1C90 109.8 32 191.8 32 288v64h512v-64c-1-95.2-58.4-177.7-144-209.8V264c0 13.3-10.7 24-24 24s-24-10.7-24-24M40 400c-22.1 0-40 17.9-40 40s17.9 40 40 40h496c22.1 0 40-17.9 40-40s-17.9-40-40-40z"/>
      </svg>
    ),
    title: "Civil Design",
    description:
      "We specialise in detailed draughting and design for civil engineering projects, including infrastructure such as commercial and residential buildings, roads, highways, and process plants. Our services ensure precise and comprehensive plans that support efficient design, planning, and execution of complex projects.",
  },
  {
    customIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11 15H6l7-14v8h5l-7 14z"/>
      </svg>
    ),
    title: "Electrical Design",
    description:
      "We offer specialised draughting and design support for electrical engineering projects across various industries, including mining process plants, renewable energy, roads, highways, and building services. Our expertise extends to creating accurate layout drawings for MV & HV reticulation systems and substations ranging from 6.6kV to 400kV.",
  },
  {
    customIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22 13v8h-2v-2h-3.42c-.77 1.76-2.53 3-4.58 3s-3.81-1.24-4.58-3H4v2H2v-8h2v2h3.43c.5-1.15 1.42-2.07 2.57-2.58V11H8V9h8v2h-2v1.42c1.15.51 2.07 1.43 2.57 2.58H20v-2zM17 2H7c-.55 0-1 .45-1 1s.45 1 1 1h3v1h1v3h2V5h1V4h3c.55 0 1-.45 1-1s-.45-1-1-1"/>
      </svg>
    ),
    title: "Piping Design",
    description:
      "With extensive experience in petrochemical facilities and process plants, we offer reliable draughting support to your piping engineering team. Our accurate and detailed designs for piping systems ensure precise layouts that prioritise functionality, efficiency, and adherence to engineering standards.",
  },
  {
    customIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path fill="currentColor" d="M31 22v-2h-2.1a5 5 0 0 0-.733-1.753l1.49-1.49l-1.414-1.414l-1.49 1.49A5 5 0 0 0 25 16.101V14h-2v2.101a5 5 0 0 0-1.753.732l-1.49-1.49l-1.414 1.414l1.49 1.49A5 5 0 0 0 19.1 20H17v2h2.1c.13.637.384 1.229.732 1.753l-1.49 1.49l1.414 1.414l1.49-1.49A5 5 0 0 0 23 25.9V28h2v-2.1a5 5 0 0 0 1.753-.732l1.49 1.49l1.414-1.414l-1.49-1.49A5 5 0 0 0 28.9 22zm-7 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/>
        <path fill="currentColor" d="M21 6c0-2.757-2.243-5-5-5c-1.78 0-3.439.958-4.33 2.5a5.2 5.2 0 0 0-.63 1.794A6.96 6.96 0 0 0 7 4c-3.86 0-7 3.14-7 7a7 7 0 0 0 3.779 6.208C2.7 18.126 2 19.476 2 21c0 2.757 2.243 5 5 5c.734 0 1.427-.168 2.055-.454C9.332 28.043 11.43 30 14 30a4.97 4.97 0 0 0 3.536-1.464l-1.415-1.415A2.98 2.98 0 0 1 14 28c-1.654 0-3-1.346-3-3s1.346-3 3-3v-2c-.735 0-1.427.169-2.055.454a5 5 0 0 0-1.722-3.246A7 7 0 0 0 14 11c0-.147-.014-.291-.023-.436c.62.276 1.302.436 2.023.436c2.757 0 5-2.243 5-5m-7.6-1.5A3.01 3.01 0 0 1 16 3c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3h-.03c.036-.576.172-1.052.43-1.5M10 21c0 1.654-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3s3 1.346 3 3m-3-5c-2.757 0-5-2.243-5-5s2.243-5 5-5s5 2.243 5 5s-2.243 5-5 5"/>
      </svg>
    ),
    title: "Mechanical Design",
    description:
      "We provide advanced draughting and design solutions for mechanical systems, supporting your teams in optimising performance, reliability, and efficiency. Our expertise ensures each system is designed to meet industry standards, delivering long-lasting, high-quality results.",
  },
  {
    customIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M2 12c0-2.482.518-3 3-3h2c2.482 0 3 .518 3 3s-.518 3-3 3H5c-2.482 0-3-.518-3-3Zm12-5c0-2.482.518-3 3-3h2c2.482 0 3 .518 3 3s-.518 3-3 3h-2c-2.482 0-3-.518-3-3Zm0 10c0-2.482.518-3 3-3h2c2.482 0 3 .518 3 3s-.518 3-3 3h-2c-2.482 0-3-.518-3-3Z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="m14 7l-3 5l3 5"/>
        </g>
      </svg>
    ),
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
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-wide font-normal">
            Our Services
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
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
                  <div className="w-8 h-8 text-primary-foreground flex items-center justify-center">
                    {service.customIcon}
                  </div>
                </div>
                <h3 className="font-heading text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed font-medium">{service.description}</p>
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
              <h3 className="font-heading text-3xl md:text-4xl mb-4 tracking-wide font-normal">
                {slideshowImages[currentSlide].title}
              </h3>
              <p className="font-body text-base md:text-lg mb-6 text-primary-foreground/90 font-medium">
                {slideshowImages[currentSlide].description}
              </p>
              <div className="mt-8">
                <h4 className="font-heading text-2xl md:text-3xl mb-2 tracking-wide font-normal">
                  Ready to Start Your Project?
                </h4>
                <p className="font-body text-sm md:text-base text-primary-foreground/80 font-medium">
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
