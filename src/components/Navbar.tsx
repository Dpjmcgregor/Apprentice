import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handlePledgeClick = () => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById("pledge-form")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#pledge-form";
    }
  };

  const navLinks = [
    { label: "Why", to: "/#why", external: false },
    { label: "Blog", to: "/blog", external: false },
    { label: "Unemployment", to: "/unemployment", external: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl md:text-2xl uppercase tracking-tight">
            The <span className="text-primary">Apprentice Pledge</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.to.startsWith("/#") ? (
              <a
                key={link.to}
                href={link.to}
                className="text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <button
            onClick={handlePledgeClick}
            className="px-6 py-2.5 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-all"
          >
            Take the Pledge
          </button>
        </nav>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) =>
              link.to.startsWith("/#") ? (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <button
              onClick={handlePledgeClick}
              className="mt-2 px-6 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] font-bold rounded-full"
            >
              Take the Pledge
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
