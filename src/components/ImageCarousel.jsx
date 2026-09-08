/**
 * Full-width auto-scrolling image strip.
 *
 * Images are pulled from Unsplash by URL as placeholders. To use local
 * images instead, drop files into `src/assets/carousel/` and replace
 * the `src` values below with the imported paths — the rest of the
 * component (looping, layout, overlay) does not need to change.
 */
const IMAGES = [
  {
    src: "/images/image 1 jhar.jpeg",
    caption: "Open-pit mining terrain",
  },
  {
    src: "/images/image 2 jhar.jpeg",
    caption: "Rural water source",
  },
  {
    src: "/images/image 3 jhar.jpeg",
    caption: "Groundwater sampling",
  },
  {
    src: "/images/image 4 jhar.jpeg",
    caption: "River running through mining belt",
  },
  {
    src: "/images/image 5 jhar.jpeg",
    caption: "Forested hills, Jharkhand plateau",
  },
];
// Duplicated once so the strip can loop seamlessly with a simple
// -50% transform instead of manual frame calculation.
const LOOPED_IMAGES = [...IMAGES, ...IMAGES];

export default function ImageCarousel() {
  return (
    <section className="py-16 sm:py-20 bg-black border-y border-white/[0.06] overflow-hidden">
      <div className="section-shell mb-8">
        <span className="text-xs tracking-[0.14em] text-stone-500">Field &amp; site reference</span>
        <h2 className="font-display text-2xl sm:text-3xl text-stone-50 mt-2">
          Where the monitoring happens
        </h2>
      </div>

      <div className="relative w-full">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10"
          style={{ background: "linear-gradient(90deg, #000 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10"
          style={{ background: "linear-gradient(270deg, #000 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <div className="flex w-max animate-scrollX hover:[animation-play-state:paused]">
          {LOOPED_IMAGES.map((img, i) => (
            <figure
              key={`${img.caption}-${i}`}
              className="relative shrink-0 w-[260px] sm:w-[340px] h-[190px] sm:h-[240px] mx-2.5 rounded-xl overflow-hidden border border-white/[0.06]"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.75) 100%)" }}
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-3 left-4 right-4 text-xs text-stone-200">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
