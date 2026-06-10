import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { getPost } from "@/data/posts";
import Footer from "@/components/Footer";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display uppercase text-4xl md:text-6xl mb-6">
            Post not <span className="text-primary">found.</span>
          </h1>
          <Link
            to="/blog"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "The Apprentice Pledge" },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | The Apprentice Pledge</title>
        <meta name="description" content={post.excerpt} />
        <link
          rel="canonical"
          href={`https://apprenticepledge.com/blog/${post.slug}`}
        />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <main className="px-6 pt-24 pb-24 md:pt-32">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 mb-8">
            <span className="text-primary font-bold">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>{formatDate(post.date)}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-display uppercase text-4xl md:text-6xl leading-[0.92] mb-12">
            {post.title}
          </h1>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
            {post.content.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-border text-center">
            <h2 className="font-display uppercase text-3xl md:text-4xl mb-6 leading-none">
              Ready to <span className="text-primary">take the pledge?</span>
            </h2>
            <Link
              to="/#pledge-form"
              className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors"
            >
              Hire an Apprentice
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
