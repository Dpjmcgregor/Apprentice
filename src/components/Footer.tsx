const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
          <div>
            <h3 className="font-display uppercase text-4xl md:text-5xl mb-3">
              The <span className="text-primary">Apprentice Pledge</span>
            </h3>
            <p className="text-muted-foreground max-w-md">
              One apprentice. One year. Real impact.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] font-bold">
            <a href="/" className="text-muted-foreground hover:text-primary transition">Home</a>
            <a href="/blog" className="text-muted-foreground hover:text-primary transition">Blog</a>
            <a href="/unemployment" className="text-muted-foreground hover:text-primary transition">UK Unemployment</a>
            <a
              href="https://another-avenue.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Another Avenue
            </a>
          </nav>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <p>© 2026 The Apprentice Pledge</p>
          <p>An Another Avenue initiative</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
