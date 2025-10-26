import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactImage from "@/assets/contact-info.jpg";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore how A Consultant can support your technical draughting needs and
            contribute to the success of your projects. We look forward to
            collaborating with you to drive your engineering objectives forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="animate-fade-in-left">
            <img
              src={contactImage}
              alt="Contact us"
              className="rounded-3xl shadow-strong w-full h-full object-cover min-h-[400px] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          <div className="animate-fade-in-right">
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4 group hover-scale">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-medium group-hover:rotate-6 transition-transform">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">
                    Call
                  </h3>
                  <p className="text-muted-foreground">+27 (0) 76 1020 672</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover-scale">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-medium group-hover:rotate-6 transition-transform">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">
                    Email
                  </h3>
                  <p className="text-muted-foreground">
                    thato@aconsultant.co.za
                    <br />
                    info@aconsultant.co.za
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover-scale">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-medium group-hover:rotate-6 transition-transform">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">
                    Address
                  </h3>
                  <p className="text-muted-foreground">
                    Jackal Creek, Boundary Road,
                    <br />
                    Roodepoort, 2196
                    <br />
                    Johannesburg, South Africa
                  </p>
                </div>
              </div>
            </div>

            <form className="space-y-4 bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-medium border border-border/50">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Name" className="h-12 bg-background/50 border-border/50" />
                <Input placeholder="Email" type="email" className="h-12 bg-background/50 border-border/50" />
              </div>
              <Input placeholder="Subject" className="h-12 bg-background/50 border-border/50" />
              <Textarea
                placeholder="Message"
                className="min-h-[150px] resize-none bg-background/50 border-border/50"
              />
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:scale-[1.02] hover:shadow-glow transition-all duration-300">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
