import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@aconsultant.com",
      link: "mailto:info@aconsultant.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+27 (0) 76 1020 672",
      link: "tel:+27 (0) 76 1020 672",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Jackal Creek, Boundary Road, Roodepoort, 2196 Johannesburg, South Africa",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Contact us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="animate-fade-in border-border shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                  <Send size={18} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-right">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border"
              >
                <CardContent className="p-6">
                  <a
                    href={info.link}
                    className="flex items-start gap-4 group-hover:text-primary transition-colors"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                      <p className="text-muted-foreground group-hover:text-primary/80">
                        {info.content}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Collaborate?</h3>
                <p className="mb-6">
                  Let's discuss how we can help you achieve your engineering goals with our
                  expertise and innovative solutions.
                </p>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Schedule a Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
