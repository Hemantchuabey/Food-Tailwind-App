import { Sparkle } from "./Vectors";

const words = ["Smash Burgers", "Wood-fired Pizza", "Crispy Wings", "Power Bowls", "Molten Cakes", "Cold Brew"];

function Ribbon({ className, reverse, outline }) {
  return (
    <div className={`absolute left-[-5%] w-[110%] overflow-hidden py-4 sm:py-5 ${className}`}>
      <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {words.map((w) => (
              <span key={w} className="flex items-center gap-6 px-6 font-display text-3xl font-medium italic tracking-tight sm:gap-8 sm:px-8 sm:text-5xl">
                <span className={outline ? "stroke-text" : ""}>{w}</span>
                <Sparkle className="h-5 w-5 shrink-0 text-saffron sm:h-7 sm:w-7" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="What we cook" className="relative h-[190px] overflow-hidden sm:h-[250px]">
      <Ribbon className="top-[30%] rotate-[3deg] bg-tomato text-white" reverse outline />
      <Ribbon className="top-[30%] -rotate-[2deg] bg-ink text-cream shadow-lift" />
    </section>
  );
}
