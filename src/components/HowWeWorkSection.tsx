import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import workflowImage from "@/assets/workflow.jpg";
import qualityImage from "@/assets/quality.jpg";
import teamCollabImage from "@/assets/hero-1.jpg";
import resourceImage from "@/assets/hero-2.jpg";
import documentationImage from "@/assets/hero-3.jpg";
import qgisImage from "@/assets/services-piping.jpg";
import technologyImage from "@/assets/contact-info.jpg";

const keyFactors = [
  {
    number: "01",
    title: "Workflow Management",
    image: workflowImage,
    items: [
      {
        title: "Project Scheduling",
        description:
          "Establish clear timelines for each project, including deadlines for drafts, revisions, and final deliverables.",
      },
      {
        title: "Time Tracking",
        description:
          "Implement time tracking to monitor productivity and ensure projects are completed within the allocated time frame.",
      },
    ],
  },
  {
    number: "02",
    title: "Quality Control",
    image: qualityImage,
    items: [
      {
        title: "Design Reviews",
        description:
          "Regularly review designs at key stages to ensure they meet client specifications and industry standards.",
      },
      {
        title: "Client Feedback",
        description:
          "Incorporate client feedback into the revision process to ensure satisfaction and address any concerns promptly.",
      },
    ],
  },
  {
    number: "03",
    title: "Team Collaboration",
    image: teamCollabImage,
    items: [
      {
        title: "Document Sharing",
        description:
          "Implement a cloud-based document management system to enable easy access to project files and designs.",
      },
      {
        title: "Communication Tools and Meetings",
        description:
          "Use project management tools like Slack or Microsoft Teams for team collaboration, and hold daily or weekly meetings to review progress and plan next steps.",
      },
    ],
  },
  {
    number: "04",
    title: "Resource Management",
    image: resourceImage,
    items: [
      {
        title: "Technical Support",
        description:
          "Provide technical support for any issues related to software, hardware, or tools to minimise downtime.",
      },
      {
        title: "Training and Development",
        description:
          "Offer ongoing training to keep the team updated on the latest design techniques and industry trends.",
      },
    ],
  },
  {
    number: "05",
    title: "Documentation and Reporting",
    image: documentationImage,
    items: [
      {
        title: "Progress Reports",
        description:
          "Create routine reports summarising project progress, resource utilisation, and any issues encountered.",
      },
      {
        title: "Archiving",
        description:
          "Implement a system for archiving completed projects, making it easy to retrieve past work for reference or client requests.",
      },
    ],
  },
  {
    number: "06",
    title: "QGIS Integration Design",
    image: qgisImage,
    items: [
      {
        title: "Custom Map Design",
        description:
          "Site Analysis: Visualizing topography, terrain, and boundaries. Land Surveys: Precise mapping for boundaries and resources. Environmental Assessments: Identifying constraints and opportunities. Utility Mapping: Tracking infrastructure like pipelines and cables.",
      },
      {
        title: "Geographical Data Integration",
        description:
          "Streamlining decision-making and site selection. Ensuring regulatory compliance. As a multi-disciplinary drafting and design firm, we leverage QGIS to provide seamless project support from concept to execution, enhancing efficiency across various engineering disciplines.",
      },
    ],
  },
  {
    number: "07",
    title: "Technology Integration",
    image: technologyImage,
    items: [
      {
        title: "CAD/BIM Standards",
        description:
          "Establish and maintain CAD and BIM standards across all projects to ensure consistency and quality.",
      },
      {
        title: "Automation",
        description:
          "Explore opportunities for automation in repetitive tasks, such as drafting, to increase efficiency.",
      },
      {
        title: "Systemised Libraries",
        description:
          "Development and management of design libraries to streamline and standardise processes.",
      },
      {
        title: "2D to 3D Conversion",
        description:
          "Transforming traditional 2D designs into sophisticated 3D models for enhanced visualisation and accuracy.",
      },
      {
        title: "BIM Optimisation",
        description:
          "Leveraging Building Information Management (BIM) 360 to improve design coordination and project execution.",
      },
    ],
  },
];

const HowWeWorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // track expanded state for items per factor (keyed by factor index)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % keyFactors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + keyFactors.length) % keyFactors.length);
  };

  return (
    <section id="how-we-work" className="py-16 bg-gradient-to-b from-[#e5effa] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-3">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
              OUR PROCESS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
            How We Do What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our proven process ensures quality and efficiency in every project
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {keyFactors.map((factor, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-strong p-6 md:p-8">
                    <div className="animate-fade-in-left order-2 md:order-1">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                        <img
                          src={factor.image}
                          alt={factor.title}
                          className="relative rounded-2xl shadow-lg w-full h-[380px] object-cover transform transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                    
                    <div className="animate-fade-in-right order-1 md:order-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                          {factor.number}
                        </div>
                        <div className="h-16 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary leading-tight">
                        {factor.title}
                      </h3>
                      
                      <div className="space-y-4">
                        {/**
                         * For Technology Integration (factor.number === '07') show only
                         * the first 2 cards by default and allow toggling to reveal the rest.
                         */}
                        {factor.items
                          .slice(0, expanded[index] ? factor.items.length : 2)
                          .map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="group bg-gradient-to-br from-[#f8fbff] to-white rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 border border-primary/5 hover:border-primary/20"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2"></div>
                                <div>
                                  <h4 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {item.title}
                                  </h4>
                                  <p className="text-muted-foreground leading-relaxed text-sm">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}

                        {factor.number === '07' && factor.items.length > 2 && (
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => setExpanded(prev => ({ ...prev, [index]: !prev[index] }))}
                              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                            >
                              {expanded[index] ? 'Show less' : `Show ${factor.items.length - 2} more`}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 rounded-full shadow-strong bg-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 w-12 h-12 border-2 border-primary/20 hover:border-primary"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 rounded-full shadow-strong bg-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 w-12 h-12 border-2 border-primary/20 hover:border-primary"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {keyFactors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-primary to-accent w-10 shadow-md"
                    : "bg-primary/20 w-3 hover:bg-primary/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground font-medium">
              {currentIndex + 1} / {keyFactors.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
