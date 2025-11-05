import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate response based on keywords
    let response = generateResponse(userMessage.toLowerCase());

    // Simulate streaming effect
    let assistantMessage = "";
    const words = response.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      assistantMessage += (i > 0 ? " " : "") + words[i];
      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    setIsLoading(false);
  };

  const generateResponse = (message: string): string => {
    // Services related
    if (message.includes("service") || message.includes("what do you do") || message.includes("offer")) {
      return "We offer comprehensive technical draughting and engineering services including: Piping Design, 3D Modeling, Technical Drawing, Project Management, and Quality Control. Our team specializes in delivering precise, industry-standard documentation for industrial and infrastructure projects. Would you like to know more about any specific service?";
    }
    
    // Piping design
    if (message.includes("piping") || message.includes("pipe")) {
      return "Our piping design services include detailed piping layouts, isometric drawings, material specifications, and stress analysis. We use advanced 3D modeling software like AutoCAD Plant 3D and AVEVA E3D to create accurate designs that reduce project timelines by up to 40%. We ensure all designs meet industry standards like ASME and ISO.";
    }
    
    // 3D Modeling
    if (message.includes("3d") || message.includes("model")) {
      return "We provide professional 3D modeling services using industry-standard software. Our models include full Product Manufacturing Information (PMI), comply with ISO and ASME standards, and are optimized for construction and manufacturing. We deliver clash-free designs with automated drawing generation and material take-offs.";
    }
    
    // Quality
    if (message.includes("quality") || message.includes("standard")) {
      return "Quality is at the heart of everything we do. We follow rigorous QC procedures including multi-stage reviews, standards compliance checking, and automated validation. Our drawings meet all relevant industry standards (ISO, ASME, BS) and undergo comprehensive quality checks before delivery.";
    }
    
    // Contact/Quote
    if (message.includes("contact") || message.includes("quote") || message.includes("price") || message.includes("cost")) {
      return "I'd be happy to help you get in touch! You can reach us through the contact form on this page, or scroll down to the 'Get in Touch' section. For project quotes, please provide details about your project scope, timeline, and any specific requirements. Our team typically responds within 24 hours.";
    }
    
    // Experience/About
    if (message.includes("experience") || message.includes("about") || message.includes("who are you")) {
      return "A Consultant is a leading technical draughting and engineering consultancy specializing in piping design, 3D modeling, and project documentation. We have extensive experience across industrial, infrastructure, and commercial projects. Our team combines technical expertise with cutting-edge technology to deliver exceptional results on time and within budget.";
    }
    
    // Timeline/Deadline
    if (message.includes("how long") || message.includes("timeline") || message.includes("deadline") || message.includes("fast")) {
      return "Project timelines vary based on complexity and scope. However, we're known for our efficiency - our advanced workflows and 3D modeling tools help us reduce typical project timelines by 30-40%. We can handle tight deadlines without compromising quality. For an accurate timeline estimate, please share your project details via our contact form.";
    }
    
    // Software/Tools
    if (message.includes("software") || message.includes("tool") || message.includes("autocad") || message.includes("cad")) {
      return "We use industry-leading software including AutoCAD Plant 3D, AVEVA E3D, SmartPlant 3D, and other specialized engineering tools. Our team is proficient in both 2D drafting and 3D modeling, ensuring compatibility with client systems and seamless data exchange across different platforms.";
    }
    
    // Industries
    if (message.includes("industry") || message.includes("sector") || message.includes("type of project")) {
      return "We serve various industries including Oil & Gas, Manufacturing, Power Generation, Water Treatment, Chemical Processing, and Infrastructure Development. Our expertise spans across industrial facilities, commercial buildings, and large-scale infrastructure projects.";
    }
    
    // Greeting
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! 👋 Welcome to A Consultant. I'm here to help answer your questions about our technical draughting and engineering services. Feel free to ask about our services, project timelines, expertise, or how we can help with your specific project needs!";
    }
    
    // Thank you
    if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! If you have any more questions about our services or would like to discuss your project, feel free to ask or use the contact form below. We're here to help! 😊";
    }
    
    // Default response
    return "That's a great question! While I can provide general information about our technical draughting and piping design services, I'd recommend reaching out through our contact form for specific project inquiries. Our team can provide detailed answers tailored to your needs. Is there anything specific about our services you'd like to know?";
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    streamChat(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-glow hover:scale-110 transition-all duration-300 bg-gradient-to-br from-primary to-accent"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-glass-bg backdrop-blur-xl rounded-2xl shadow-elegant border border-glass-border flex flex-col animate-fade-in-up z-50">
          {/* Header */}
          <div className="p-4 border-b border-glass-border flex items-center justify-between bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-8">
                <p>👋 Hi! I'm your AI assistant.</p>
                <p className="text-sm mt-2">How can I help you today?</p>
              </div>
            )}
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="min-h-[44px] max-h-32 resize-none bg-background/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-11 w-11 bg-gradient-to-br from-primary to-accent hover:scale-105 transition-transform"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
