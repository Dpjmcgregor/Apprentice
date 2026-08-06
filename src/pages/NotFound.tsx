import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <Helmet>
        <title>Page not found | Rejection Done Right</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-bold leading-none text-primary">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          This page took another avenue
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you were looking for doesn&rsquo;t exist. But every rejection
          here gets a warm landing — let&rsquo;s get you back.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/app">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
