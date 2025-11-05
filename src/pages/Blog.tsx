import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";
import servicesPipingImage from "@/assets/services-piping.jpg";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Piping Design", "Quality Control", "Project Management", "3D Modeling", "Infrastructure", "Innovation"];
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
        {/* Hero Section with Background Image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
              style={{
                backgroundImage: `url(${servicesPipingImage})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10 w-full">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Engineering Insights & Expertise
              </h1>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
                Stay updated with the latest trends, best practices, and expert advice
                in technical draughting, piping design, and engineering solutions
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                {selectedCategory === "All" 
                  ? `Showing all ${filteredPosts.length} articles` 
                  : `Showing ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} in ${selectedCategory}`}
              </p>
            </div>
            <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </article>
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-light">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
              Explore by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full transition-all shadow-soft hover:shadow-medium ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-primary hover:text-primary-foreground"
                  }`}
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
