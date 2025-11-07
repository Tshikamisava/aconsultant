import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { toast } from "@/components/ui/sonner";

import { useState } from "react";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    if (!form.checkValidity()) {
      toast.error("Please fill in all fields before sending.");
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = {
      from_name: formData.get('from_name') as string,
      from_email: formData.get('from_email') as string,
      message: formData.get('message') as string,
    };

    setSending(true);
    
    try {
      console.log('📧 Using PHP email service...');
      console.log('📧 Form data:', data);

      // Import PHP email service dynamically
      const { default: emailService } = await import('../../services/phpEmailService');
      
      console.log('📧 Email service status:', emailService.getStatus());
      console.log('📧 Base URL:', emailService.getBaseUrl());
      
      // Send email using PHP backend
      const result = await emailService.sendContactEmail(data);
      
      console.log("✅ Email sent via PHP:", result);
      
      toast.success("Message sent successfully!", {
        description: "Thank you for contacting us. We'll get back to you soon!"
      });
      form.reset();
      
    } catch (error: any) {
      console.error("Form submission error:", error);
      
      // Show more specific error messages for debugging
      let errorMessage = "Please contact us directly via phone or try again later.";
      let errorDescription = "";
      
      if (error.message) {
        console.error("Detailed error:", error.message);
        // Add error details for debugging (remove in production)
        errorDescription = `Error: ${error.message}`;
      }
      
      toast.error("Something went wrong", {
        description: errorDescription || errorMessage,
        duration: 10000 // Longer duration to read error
      });
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@aconsultant.co.za",
      link: "mailto:info@aconsultant.co.za",
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
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            Get In Touch
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Ready to start your next project? Contact us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          
          {/* Contact Form */}
          <Card className="animate-fade-in border-border shadow-lg">
            <CardContent className="p-8">
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="from_name"
                    name="from_name"
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
                    id="from_email"
                    name="from_email"
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
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={sending}>
                  {sending ? (
                    <span className="flex items-center justify-center w-full">
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2" />
                    </>
                  )}
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
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Focus on the first input after scrolling
                    setTimeout(() => {
                      const firstInput = form?.querySelector('input[name="from_name"]') as HTMLInputElement;
                      firstInput?.focus();
                    }, 500);
                  }}
                >
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
