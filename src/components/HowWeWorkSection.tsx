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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % keyFactors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + keyFactors.length) % keyFactors.length);
  };

  return (
    <section id="how-we-work" className="py-24 bg-[#e5effa]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            How We Do What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven process ensures quality and efficiency in every project
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {keyFactors.map((factor, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="animate-fade-in-left">
                      <img
                        src={factor.image}
                        alt={factor.title}
                        className="rounded-2xl shadow-strong w-full h-[400px] object-cover"
                      />
                    </div>
                    <div className="animate-fade-in-right">
                      <div className="text-6xl font-bold text-primary/20 mb-2">
                        {factor.number}
                      </div>
                      <h3 className="text-3xl font-bold mb-6 text-primary">
                        {factor.title}
                      </h3>
                      <div className="space-y-6">
                        {factor.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="bg-card rounded-lg p-6 shadow-soft"
                          >
                            <h4 className="text-xl font-semibold mb-2 text-foreground">
                              {item.title}
                            </h4>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full shadow-medium bg-card hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full shadow-medium bg-card hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center mt-8 space-x-2">
            {keyFactors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
