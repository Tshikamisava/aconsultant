import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";

import { useState } from "react";

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState(false);

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
    setServerError(false);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to send email');
      }

      console.log("SUCCESS!", result);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you shortly."
      });
      form.reset();
      
    } catch (error: any) {
      console.error("Email sending error:", error);
      
      // Check if it's a server connection error
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        setServerError(true);
        toast.error("Cannot connect to email server", {
          description: "Please contact us directly at lhlongwane81@gmail.com or call us.",
          duration: 10000
        });
      } else if (error.message.includes('Too many requests')) {
        toast.error("Too many requests", {
          description: "Please wait a few minutes before trying again.",
          duration: 7000
        });
      } else {
        toast.error("Failed to send message", {
          description: error.message || "Please try again later",
          duration: 7000
        });
      }
    } finally {
      setSending(false);
    }
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
          {/* Server Error Alert */}
          {serverError && (
            <div className="lg:col-span-2">
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Email Service Temporarily Unavailable</AlertTitle>
                <AlertDescription>
                  Cannot connect to email server. Please contact us directly:
                  <div className="mt-2 space-y-1">
                    <div>📧 Email: <a href="mailto:lhlongwane81@gmail.com" className="underline font-semibold">lhlongwane81@gmail.com</a></div>
                    <div>📞 Phone: <a href="tel:+27761020672" className="underline font-semibold">+27 (0) 76 1020 672</a></div>
                  </div>
                  <div className="mt-3 text-xs opacity-80">
                    <strong>Admin Note:</strong> Make sure the email server is running on port 3001.
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          {/* Contact Form */}
          <Card className="animate-fade-in border-border shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
