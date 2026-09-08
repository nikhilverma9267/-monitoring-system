import { Droplets } from "lucide-react";

const LINKS = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#plants", label: "Plants" },
  { href: "#live", label: "Live Monitoring" },
  { href: "#map", label: "Map" },
];

export default function Footer() {
  const handleNavigate = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="section-shell flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
        <div className="max-w-sm">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("#top");
            }}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-seam-500/10 border border-seam-500/25 text-seam-300">
              <Droplets className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-stone-100">Jharkhand Water Monitoring</span>
          </a>
          <p className="text-sm text-stone-500 mt-3 leading-relaxed">
            Smart water quality monitoring for rural mining areas.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavigate(link.href)}
                  className="text-sm text-stone-500 hover:text-stone-200 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm text-stone-600 sm:text-right">
          <p>Demo monitoring system</p>
          <p className="mt-1">All readings shown are illustrative demo data.</p>
        </div>
      </div>
    </footer>
  );
}
