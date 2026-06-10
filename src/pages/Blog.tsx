import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/data/posts";
import Footer from "@/components/Footer";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | The Apprentice Pledge</title>
        <meta
          name="description"
          content="Insights and data on apprenticeships, youth employment, and the business case for hiring in the UK."
        />
        <link rel="canonical" href="https://apprenticepledge.com/blog" />
      </Helmet>

      <main className="px-6 pt-24 pb-24 md:pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
              The Blog
            </p>
            <h1 className="font-display uppercase text-5xl md:text-8xl leading-[0.9]">
              Notes on building <br />
              the <span className="text-primary">next generation.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-[2rem] overflow-hidden">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card p-8 md:p-10 flex flex-col hover:bg-secondary transition-colors"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                    {post.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h2 className="font-display uppercase text-2xl md:text-3xl leading-[0.95] mb-5">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                  <span>{formatDate(post.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
