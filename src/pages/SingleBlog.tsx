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
              <img src={post.image} alt={post.title} className="w-full rounded-lg shadow-medium mb-8" />
              <article 
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground 
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-primary
                  prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-foreground
                  prose-h4:text-xl prose-h4:font-bold prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-foreground
                  prose-p:text-base prose-p:leading-relaxed prose-p:mb-5 prose-p:text-muted-foreground
                  prose-ul:my-5 prose-ul:space-y-2 
                  prose-ol:my-5 prose-ol:space-y-2
                  prose-li:text-muted-foreground prose-li:leading-relaxed
                  prose-strong:text-primary prose-strong:font-bold
                  prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>Full article content coming soon...</p>` }}
              />
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
