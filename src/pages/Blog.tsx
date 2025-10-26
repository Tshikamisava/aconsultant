import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import BlogCard from "@/components/BlogCard";
import { Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Piping Design in Industrial Engineering",
    excerpt: "Explore how advanced 3D modeling and AI-powered tools are revolutionizing piping design workflows, reducing project timelines by up to 40%.",
    author: "A Consultant Team",
    date: "2024-10-15",
    category: "Piping Design",
    readTime: "5 min read",
    image: "/src/assets/services-piping.jpg",
  },
  {
    id: 2,
    title: "Best Practices for Technical Draughting Quality Control",
    excerpt: "Learn the essential quality control measures that ensure your technical drawings meet industry standards and client expectations every time.",
    author: "Engineering Experts",
    date: "2024-10-08",
    category: "Quality Control",
    readTime: "7 min read",
    image: "/src/assets/quality.jpg",
  },
  {
    id: 3,
    title: "How to Meet Tight Engineering Deadlines Without Compromising Quality",
    excerpt: "Discover proven workflow management strategies that help engineering teams deliver complex projects on schedule while maintaining excellence.",
    author: "Project Management",
    date: "2024-10-01",
    category: "Project Management",
    readTime: "6 min read",
    image: "/src/assets/workflow.jpg",
  },
  {
    id: 4,
    title: "Understanding 3D Modeling Standards in Modern Engineering",
    excerpt: "A comprehensive guide to current 3D modeling standards and how they impact project collaboration and final deliverables.",
    author: "Technical Team",
    date: "2024-09-24",
    category: "3D Modeling",
    readTime: "8 min read",
    image: "/src/assets/hero-1.jpg",
  },
  {
    id: 5,
    title: "The Role of Technical Draughting in Infrastructure Projects",
    excerpt: "How precise technical draughting services contribute to successful infrastructure development and long-term project sustainability.",
    author: "A Consultant Team",
    date: "2024-09-17",
    category: "Infrastructure",
    readTime: "5 min read",
    image: "/src/assets/hero-2.jpg",
  },
  {
    id: 6,
    title: "Innovation in Engineering: Embracing Digital Transformation",
    excerpt: "Explore how digital tools and innovative approaches are reshaping the engineering industry and improving project outcomes.",
    author: "Innovation Lab",
    date: "2024-09-10",
    category: "Innovation",
    readTime: "6 min read",
    image: "/src/assets/hero-3.jpg",
  },
];

const Blog = () => {
  useEffect(() => {
    // Update page title and meta for SEO
    document.title = "Engineering Blog - Expert Insights | A Consultant";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read expert insights on piping design, technical draughting, 3D modeling, and engineering project management from A Consultant's team of professionals."
      );
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "A Consultant Engineering Blog",
      "description": "Expert insights on technical draughting, piping design, and engineering solutions",
      "url": "https://aconsultant.co.za/blog",
      "publisher": {
        "@type": "Organization",
        "name": "A Consultant",
        "url": "https://aconsultant.co.za"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-light py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                Engineering Insights & Expertise
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with the latest trends, best practices, and expert advice
                in technical draughting, piping design, and engineering solutions
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </article>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-light">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
              Explore by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Piping Design", "Quality Control", "Project Management", "3D Modeling", "Infrastructure", "Innovation"].map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all shadow-soft hover:shadow-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} A Consultant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
