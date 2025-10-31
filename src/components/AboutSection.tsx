import { useState } from "react";
import { Target, Users, Eye, Flag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const [activeTab, setActiveTab] = useState("who");

  const tabs = [
    {
      value: "who",
      label: "Who We Are",
      icon: Users,
      content: {
        title: "Expert Engineering Consultants",
        description:
          "At A Consultant, we are a team of highly skilled engineering professionals dedicated to providing innovative solutions for complex technical challenges. With years of combined experience across various engineering disciplines, we bring expertise, precision, and commitment to every project.",
      },
    },
    {
      value: "what",
      label: "What We Do",
      icon: Target,
      content: {
        title: "Comprehensive Engineering Solutions",
        description:
          "We deliver tailored engineering consulting services that help companies meet tight deadlines and solve complex challenges. From initial concept to final implementation, we provide technical expertise, project management, and innovative problem-solving to ensure your success.",
      },
    },
    {
      value: "vision",
      label: "Vision",
      icon: Eye,
      content: {
        title: "Shaping the Future of Engineering",
        description:
          "We envision a future where engineering thrives on innovation, technical mastery, and an unwavering commitment to quality. We aim to be at the forefront of engineering innovation, setting new industry standards and fostering lasting partnerships through efficiency, reliability, and excellence.",
      },
    },
    {
      value: "mission",
      label: "Mission",
      icon: Flag,
      content: {
        title: "A Brief Story About The Solutions",
        description:
          "At A Consultant, we're shaping a future where engineering thrives on innovation, technical mastery, and an unwavering commitment to quality. We consistently strive to be at the forefront of engineering innovation, delivering tailored and precise solutions that enable engineering companies to tackle urgent project deadlines and solve complex challenges. We aim to set new industry standards, fostering lasting partnerships through efficiency, reliability, and a relentless pursuit of excellence.",
      },
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover who we are and what drives our commitment to engineering excellence
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-4 mb-12 h-auto bg-background shadow-lg">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 py-4 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <tab.icon size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="animate-fade-in">
              <Card className="max-w-4xl mx-auto border-none shadow-xl">
                <CardContent className="p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <tab.icon size={32} className="text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {tab.content.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {tab.content.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default About;
