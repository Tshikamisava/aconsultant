import {
  Home,
  Construction,
  Layers,
  Zap,
  PenTool,
  Boxes,
} from "lucide-react";
import pipingImage from "@/assets/services-piping.jpg";
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

  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-medium hover:shadow-glow transition-all duration-500 hover:-translate-y-3 animate-fade-in-up border border-border/50 hover:border-primary/50 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-medium">
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
