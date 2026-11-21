import { motion } from "framer-motion";
import { FiArrowUpRight, FiCopy } from "./Icons";
import { useCart } from "../context/CartContext";
import { img } from "../utils/format";
import { Reveal, SmartImage } from "./ui";
import { CircleText, ScooterIllo, Sparkle } from "./Vectors";

function useCopy() {
  const { showToast } = useCart();
  return (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    showToast({ kind: "info", message: `Code ${code} copied — apply it in your bag.` });
  };
}

function Ticket({ code, dark }) {
  const copy = useCopy();
  return (
    <button
      onClick={() => copy(code)}
      className={`group relative inline-flex items-center gap-3 rounded-2xl border-2 border-dashed px-5 py-3 font-mono text-lg font-bold tracking-[0.2em] transition hover:-translate-y-0.5 ${
        dark ? "border-cream/30 text-cream hover:border-saffron" : "border-ink/25 text-ink hover:border-ink"
      }`}
    >
      {code}
      <FiCopy className="text-base opacity-60 transition group-hover:opacity-100" />
    </button>
  );
}

export default function Offers() {
  return (
    <section id="offers" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">
                <Sparkle className="h-3 w-3 text-tomato" /> Deals worth crushing
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-5">
                Good food.
                <br />
                <em className="text-tomato">Better</em> prices.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-ink-500">Tap any code to copy it. Stack it with free delivery on orders over ₹499 — no login, no fuss.</p>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(240px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Hero tile */}
          <Reveal className="grain relative overflow-hidden rounded-[36px] bg-ink p-8 text-cream sm:p-10 md:col-span-2 lg:row-span-2">
            <div className="relative z-10 flex h-full flex-col">
              <span className="chip w-fit bg-saffron text-ink">First order</span>
              <h3 className="mt-6 font-display text-6xl font-medium leading-[0.9] tracking-tight sm:text-8xl">
                20<span className="text-saffron">%</span>
                <br />
                <em className="font-light">off</em>
              </h3>
              <p className="mt-5 max-w-[260px] text-cream/70">On your first crave. Up to ₹150 off on orders above ₹299.</p>
              <div className="mt-auto pt-10">
                <Ticket code="CRAVE20" dark />
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px]">
              <div className="absolute inset-0 animate-spin-slower text-cream/30">
                <CircleText text="use code crave20 · use code crave20 · use code crave20 · " className="h-full w-full" />
              </div>
              <motion.div whileHover={{ rotate: 20, scale: 1.04 }} transition={{ type: "spring", stiffness: 120 }} className="absolute inset-[16%]">
                <SmartImage
                  src={img("1568901346375-23c9450c58cd", 360, 56)}
                  widths={[280, 360]}
                  sizes="260px"
                  alt="Loaded burger"
                  className="h-full w-full rounded-full ring-8 ring-cream/10"
                />
              </motion.div>
            </div>
          </Reveal>

          {/* Free delivery */}
          <Reveal delay={0.08} className="relative flex overflow-hidden rounded-[36px] bg-saffron p-8 md:col-span-2">
            <div className="relative z-10 flex max-w-[60%] flex-col">
              <h3 className="font-display text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl">
                Free delivery, <em>always.</em>
              </h3>
              <p className="mt-3 text-sm font-medium text-ink-700">On every order above ₹499. Or use FREESHIP on anything.</p>
              <div className="mt-auto pt-6">
                <Ticket code="FREESHIP" />
              </div>
            </div>
            <div className="absolute -right-6 bottom-0 h-[110%] w-[55%]">
              <ScooterIllo />
            </div>
          </Reveal>

          {/* Midnight */}
          <Reveal delay={0.14} className="relative overflow-hidden rounded-[36px] bg-basil p-8 text-cream">
            <svg viewBox="0 0 100 100" className="absolute -right-6 -top-6 h-36 w-36 text-saffron" aria-hidden="true">
              <path d="M70 18a36 36 0 1 0 12 50A30 30 0 0 1 70 18z" fill="currentColor" />
            </svg>
            {[
              [20, 30],
              [60, 70],
              [40, 55],
              [80, 40],
            ].map(([l, t], i) => (
              <Sparkle key={i} className="absolute h-3 w-3 animate-pulse text-cream/60" style={{ left: `${l}%`, top: `${t}%` }} />
            ))}
            <div className="relative flex h-full flex-col">
              <span className="chip w-fit bg-cream/15">🌙 Late night</span>
              <h3 className="mt-auto font-display text-4xl font-medium leading-[0.95] tracking-tight">
                Open till <em className="text-saffron">3 AM</em>
              </h3>
              <p className="mt-2 text-sm text-cream/70">Midnight cravings, sorted.</p>
            </div>
          </Reveal>

          {/* Flat 50 */}
          <Reveal delay={0.2} className="group relative overflow-hidden rounded-[36px] bg-tomato p-8 text-white">
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between">
                <span className="chip bg-white/20">Flat deal</span>
                <FiArrowUpRight className="text-2xl transition-transform duration-300 group-hover:rotate-45" />
              </div>
              <p className="mt-auto font-display text-7xl font-medium leading-none tracking-tight">₹50</p>
              <p className="mt-1 text-sm text-white/80">off orders above ₹199</p>
              <div className="mt-5">
                <Ticket code="FIRST50" dark />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
