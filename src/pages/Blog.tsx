import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

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
