import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <Helmet>
        <title>Page Not Found | The Apprentice Pledge</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center max-w-xl">
        <p className="font-display text-primary text-[clamp(5rem,20vw,12rem)] leading-none">
          404
        </p>
        <h1 className="font-display uppercase text-3xl md:text-5xl mb-6 leading-none">
          This page took <span className="text-primary">another avenue.</span>
        </h1>
        <p className="text-muted-foreground mb-10">
          The page you were looking for doesn&rsquo;t exist — but the pledge still does.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors"
        >
          Back to the Pledge
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
