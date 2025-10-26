export const blogPosts = [
  {
    id: 1,
    title: "The Future of Piping Design in Industrial Engineering",
    excerpt:
      "Explore how advanced 3D modeling and AI-powered tools are revolutionizing piping design workflows, reducing project timelines by up to 40%.",
    author: "A Consultant Team",
    date: "2024-10-15",
    category: "Piping Design",
    readTime: "5 min read",
    image: "/src/assets/services-piping.jpg",
  },
  {
    id: 2,
    title: "Best Practices for Technical Draughting Quality Control",
    excerpt:
      "Learn the essential quality control measures that ensure your technical drawings meet industry standards and client expectations every time.",
    author: "Engineering Experts",
    date: "2024-10-08",
    category: "Quality Control",
    readTime: "7 min read",
    image: "/src/assets/quality.jpg",
  },
  {
    id: 3,
    title: "How to Meet Tight Engineering Deadlines Without Compromising Quality",
    excerpt:
      "Discover proven workflow management strategies that help engineering teams deliver complex projects on schedule while maintaining excellence.",
    author: "Project Management",
    date: "2024-10-01",
    category: "Project Management",
    readTime: "6 min read",
    image: "/src/assets/workflow.jpg",
  },
  {
    id: 4,
    title: "Understanding 3D Modeling Standards in Modern Engineering",
    excerpt:
      "A comprehensive guide to current 3D modeling standards and how they impact project collaboration and final deliverables.",
    author: "Technical Team",
    date: "2024-09-24",
    category: "3D Modeling",
    readTime: "8 min read",
    image: "/src/assets/hero-1.jpg",
  },
  {
    id: 5,
    title: "The Role of Technical Draughting in Infrastructure Projects",
    excerpt:
      "How precise technical draughting services contribute to successful infrastructure development and long-term project sustainability.",
    author: "A Consultant Team",
    date: "2024-09-17",
    category: "Infrastructure",
    readTime: "5 min read",
    image: "/src/assets/hero-2.jpg",
  },
  {
    id: 6,
    title: "Innovation in Engineering: Embracing Digital Transformation",
    excerpt:
      "Explore how digital tools and innovative approaches are reshaping the engineering industry and improving project outcomes.",
    author: "Innovation Lab",
    date: "2024-09-10",
    category: "Innovation",
    readTime: "6 min read",
    image: "/src/assets/hero-3.jpg",
  },
];

export type BlogPost = (typeof blogPosts)[number];
