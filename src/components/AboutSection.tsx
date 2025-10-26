import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Wrench, Eye, Target } from "lucide-react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("who-we-are");

  return (
    <section id="about" className="py-24 bg-gradient-light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover who we are and what drives our commitment to engineering excellence
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 mb-12 h-auto bg-card/50 backdrop-blur-sm border border-border/50 p-2">
            <TabsTrigger value="who-we-are" className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Who We Are
            </TabsTrigger>
            <TabsTrigger value="what-we-do" className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              What We Do
            </TabsTrigger>
            <TabsTrigger value="vision" className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Vision
            </TabsTrigger>
            <TabsTrigger value="mission" className="text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Mission
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="who-we-are"
            className="animate-fade-in-up max-w-5xl mx-auto"
          >
            <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-strong border border-border/50 hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Who We Are
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At A Consultant, we're a team of passionate engineering professionals
                dedicated to delivering exceptional technical draughting solutions. With
                years of combined experience in the industry, we bring expertise,
                precision, and innovation to every project we undertake.
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="what-we-do"
            className="animate-fade-in-up max-w-5xl mx-auto"
          >
            <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-strong border border-border/50 hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                What We Do
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We specialize in providing comprehensive technical draughting services
                for engineering companies. From piping design to structural layouts, we
                deliver precise, detailed solutions that help our clients meet tight
                deadlines and solve complex engineering challenges with confidence.
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="vision"
            className="animate-fade-in-up max-w-5xl mx-auto"
          >
            <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-strong border border-border/50 hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're building a future where engineering thrives on innovation,
                expertise, and quality. We aim to be at the forefront of engineering
                innovation, consistently setting new industry standards and fostering
                lasting partnerships through our commitment to excellence.
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value="mission"
            className="animate-fade-in-up max-w-5xl mx-auto"
          >
            <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-strong border border-border/50 hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At A Consultant, we're shaping a future where engineering thrives on
                innovation, technical mastery, and an unwavering commitment to quality.
                We deliver precise, tailored solutions that enable companies to tackle
                urgent deadlines and solve complex challenges, setting new standards in
                efficiency, reliability, and excellence.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AboutSection;
