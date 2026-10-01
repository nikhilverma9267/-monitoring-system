import { useEffect, useState } from "react";
import { Droplets, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#plants", label: "Plants" },
  { href: "#dashboard", label: "Water Dashboard" },
  { href: "#live", label: "Live Monitoring" },
  { href: "#map", label: "Jharkhand Map" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-base-950/85 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <nav className="section-shell flex items-center justify-between h-16 sm:h-[4.5rem]" aria-label="Primary">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#top");
          }}
          className="flex items-center gap-3 group"
        >
          <img
             src="jal rakshak.jpeg"
             alt="Jal Rakshak"
             className="h-9 w-9 rounded-lg object-cover"
          />
          
          <span className="leading-tight">
            <span className="block text-2xl font-bold tracking-[0.16em] text-stone-400">जल रक्षक</span>
            <span className="block text-sm font-medium text-stone-100 -mt-0.5">Water Monitoring</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavigate(link.href)}
                className="px-4 py-2 text-sm text-stone-300 hover:text-stone-50 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNavigate("#live")}
          className="hidden md:inline-flex items-center gap-2 rounded-lg bg-seam-500/90 hover:bg-seam-500 text-stone-950 text-sm font-medium px-4 py-2 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-stone-950/70 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-stone-950" />
          </span>
          Live status
        </button>

        <button
          className="md:hidden p-2 text-stone-300 hover:text-stone-50"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div className="md:hidden border-t border-white/[0.06] bg-base-950/95 backdrop-blur-xl">
          <ul className="section-shell py-3 flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavigate(link.href)}
                  className="w-full text-left px-3 py-3 text-sm text-stone-200 hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
