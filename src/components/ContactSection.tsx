import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import emailService from "@/services/emailService";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.from_name || !formData.from_email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('📧 Sending contact form email...', {
        name: formData.from_name,
        email: formData.from_email,
        messageLength: formData.message.length
      });

      // Send email using EmailJS service
      const result = await emailService.sendContactEmail(formData);

      if (result.success) {
        toast.success("Message sent successfully!", {
          description: result.message
        });
        
        // Reset form on success
        setFormData({
          from_name: '',
          from_email: '',
          message: ''
        });
      } else {
        toast.error("Failed to send message", {
          description: result.message
        });
      }

    } catch (error) {
      console.error('Contact form error:', error);
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
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
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 tracking-wide font-normal">
            Get In Touch
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Ready to start your next project? Contact us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          
          {/* Contact Form */}
          <Card className="animate-fade-in border-border shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.from_name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="from_email"
                    name="from_email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.from_email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-body text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
                      <h3 className="font-heading text-lg font-normal mb-1">{info.title}</h3>
                      <p className="font-body text-sm md:text-base text-muted-foreground group-hover:text-primary/80 font-medium">
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
