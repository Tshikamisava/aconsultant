import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";

const featuredPosts = [
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
];

const BlogPreview = () => {
  return (
    <section id="blogs" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert knowledge and industry trends from our engineering team
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="group">
            <a href="/blog">
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
