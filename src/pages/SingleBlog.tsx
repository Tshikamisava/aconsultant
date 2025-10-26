import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { blogPosts } from "@/data/blogPosts";
import type { BlogPost } from "@/data/blogPosts";
import { Calendar, User } from "lucide-react";

const SingleBlog = () => {
  const { id } = useParams();
  const postId = Number(id);
  const post = blogPosts.find((p) => p.id === postId) as BlogPost | undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <div className="container mx-auto px-6 py-24 text-center">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find the article you're looking for.</p>
            <Link to="/blog" className="text-primary hover:underline">Back to articles</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        <section className="bg-gradient-light py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4 text-primary">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                <div className="text-sm">{post.readTime}</div>
              </div>
              <img src={post.image} alt={post.title} className="w-full rounded-lg shadow-medium mb-6" />
              <article className="prose prose-lg text-foreground">
                <p>{post.excerpt}</p>
                <p>
                  This is a demo article. Replace this with full article content when available. For now,
                  the excerpt and metadata are used to demonstrate routing and single-post display.
                </p>
              </article>
              <div className="mt-8">
                <Link to="/blog" className="text-primary hover:underline">← Back to articles</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleBlog;
