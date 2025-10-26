import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import workflowImage from "@/assets/workflow.jpg";
import qualityImage from "@/assets/quality.jpg";

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
