import { Wrench, Ruler, Layers, Settings } from "lucide-react";
import pipingImage from "@/assets/services-piping.jpg";

const services = [
  {
    icon: Wrench,
    title: "Piping Design",
    description:
      "Precision in the layout and design of piping systems for various industrial applications.",
  },
  {
    icon: Ruler,
    title: "Technical Draughting",
    description:
      "Detailed technical drawings and documentation for engineering projects.",
  },
  {
    icon: Layers,
    title: "3D Modeling",
    description:
      "Advanced 3D modeling solutions for complex engineering structures.",
  },
  {
    icon: Settings,
    title: "Project Coordination",
    description:
      "Seamless coordination between design teams and project stakeholders.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive engineering solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-medium hover:shadow-glow transition-all duration-500 hover:-translate-y-3 animate-fade-in-up border border-border/50 hover:border-primary/50 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-medium">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-strong animate-fade-in group">
          <img
            src={pipingImage}
            alt="Piping design project"
            className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
            <div className="text-center text-primary-foreground px-6 animate-fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-lg mb-6 text-primary-foreground/90">
                Let's discuss how we can help bring your engineering vision to life
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
