import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiClock, FiPlus } from "./Icons";
import { useCart } from "../context/CartContext";
import { menu } from "../data/menu";
import { img, inr } from "../utils/format";
import { Arrow, BurgerPill, Chili, CircleText, Leaf, Sparkle, Squiggle, TomatoSlice } from "./Vectors";
import { SmartImage, Stars } from "./ui";

const words = ["different.", "the spot.", "like home.", "at 2 AM."];
const featured = menu.find((m) => m.id === 6);
const ease = [0.22, 1, 0.36, 1];

function useDepth(sx, sy, d) {
  const x = useTransform(sx, (v) => v * d);
  const y = useTransform(sy, (v) => v * d);
  return { x, y };
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative block h-[1.08em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", rotate: 4 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-100%", rotate: -4 }}
          transition={{ duration: 0.55, ease }}
          className="block origin-left italic text-tomato"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { add } = useCart();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const l1 = useDepth(sx, sy, 30);
  const l2 = useDepth(sx, sy, -24);
  const l3 = useDepth(sx, sy, 50);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const rectRef = useRef(null);
  const onEnter = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };
  const onMove = (e) => {
    const r = rectRef.current;
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} onMouseEnter={onEnter} onMouseMove={onMove} className="grain relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* backdrop decorations */}
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_65%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-saffron/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-tomato/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tomato opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tomato" />
            </span>
            Kitchens open · Delivering in 25 min
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(3.1rem,8.5vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            <span className="block">Food that</span>
            <span className="block">
              <span className="relative inline-block">
                <span className="relative z-10">hits</span>
                <Squiggle className="absolute -bottom-1 left-0 h-3 w-full text-saffron sm:h-4" delay={0.4} />
              </span>
              <span className="group/pill relative ml-[0.22em] inline-flex h-[0.76em] w-[1.85em] translate-y-[0.06em] items-center justify-center overflow-hidden rounded-full bg-ink align-baseline shadow-card ring-4 ring-white">
                <BurgerPill className="h-full w-full transition-transform duration-300 group-hover/pill:scale-110" />
              </span>
            </span>
            <span className="block">
              <RotatingWord />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-7 max-w-md text-[17px] leading-relaxed text-ink-500"
          >
            Smash burgers, 72-hour fermented pizza and fiery wings — cooked by people who are obsessed, delivered before the cheese
            stops stretching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link to="/#menu" className="btn-tomato group h-14 px-7 text-[15px]">
              Order now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/#offers" className="btn-ghost h-14 px-7 text-[15px]">
              See today's deals
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-12 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {[
                ["bg-tomato-700 text-white", "A"],
                ["bg-basil text-white", "K"],
                ["bg-saffron text-ink", "R"],
                ["bg-ink text-white", "M"],
              ].map(([c, letter]) => (
                <span key={letter} className={`grid h-11 w-11 place-items-center rounded-full border-[3px] border-cream text-sm font-bold ${c}`}>
                  {letter}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Stars value={5} />
                <span className="text-sm font-extrabold">4.9</span>
              </div>
              <p className="text-sm text-ink-500">Loved by 12,000+ hungry humans</p>
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {/* blob */}
            <motion.svg style={l2} viewBox="0 0 200 200" className="absolute inset-[-6%] h-[112%] w-[112%] text-saffron" aria-hidden="true">
              <path
                fill="currentColor"
                d="M45.3,-58.1C57.9,-48.1,66.6,-33.4,70.6,-17.3C74.6,-1.2,73.9,16.3,66.6,30.5C59.3,44.7,45.4,55.6,30,62.7C14.6,69.8,-2.3,73.1,-18.9,69.6C-35.5,66.1,-51.8,55.8,-62.1,41C-72.4,26.2,-76.7,6.9,-72.9,-10.2C-69.1,-27.3,-57.2,-42.2,-43,-52.1C-28.8,-62,-14.4,-66.9,1.2,-68.3C16.8,-69.8,32.7,-68,45.3,-58.1Z"
                transform="translate(100 100)"
              />
            </motion.svg>

            {/* rotating text ring */}
            <div className="absolute inset-[2%] animate-spin-slower text-ink/70">
              <CircleText text="fresh · hot · fast · handmade · fresh · hot · fast · handmade · " className="h-full w-full" />
            </div>

            {/* plate */}
            <motion.div style={{ rotate: plateRotate, y: plateY }} className="absolute inset-[13%]">
              <motion.div
                initial={{ scale: 0.92, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease }}
                className="h-full w-full rounded-full bg-white p-[4%] shadow-lift"
              >
                <SmartImage
                  src={img("1513104890138-7c749659a591", 400, 34)}
                  widths={[300, 400]}
                  q={34}
                  sizes="(max-width: 640px) 74vw, 400px"
                  priority
                  alt="Wood-fired pizza seen from above"
                  className="h-full w-full rounded-full"
                />
              </motion.div>
            </motion.div>

            {/* floating vectors */}
            <motion.div style={l3} className="absolute -left-2 top-[8%] w-16 sm:w-20">
              <Leaf className="w-full animate-wiggle" />
            </motion.div>
            <motion.div style={l1} className="absolute right-[2%] top-[2%] w-14 rotate-12 sm:w-20">
              <Chili className="w-full animate-float" />
            </motion.div>
            <motion.div style={l2} className="absolute bottom-[4%] left-[6%] w-14 sm:w-16">
              <TomatoSlice className="w-full animate-spin-slow" />
            </motion.div>
            <motion.div style={l3} className="absolute bottom-[22%] right-0 text-tomato">
              <Sparkle className="h-6 w-6 animate-pulse" />
            </motion.div>
            <Sparkle className="absolute left-[18%] top-[2%] h-4 w-4 text-basil" />

            {/* floating cards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
              className="absolute -left-2 bottom-[16%] sm:-left-8"
            >
              <motion.div style={l1} className="flex items-center gap-3 rounded-2xl bg-white/90 p-2.5 pr-4 shadow-card backdrop-blur">
                <SmartImage
                  src={img("1604382355076-af4b0eb60143", 120, 55)}
                  widths={[120]}
                  sizes="48px"
                  alt=""
                  className="h-12 w-12 rounded-xl"
                />
                <div>
                  <p className="text-[13px] font-bold leading-tight">{featured.name}</p>
                  <p className="text-xs font-semibold text-ink-500">{inr(featured.price)}</p>
                </div>
                <button
                  onClick={() => add(featured.id)}
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-tomato text-white transition hover:scale-110 active:scale-90"
                  aria-label={`Add ${featured.name}`}
                >
                  <FiPlus />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease }}
              className="absolute right-0 top-[18%] sm:-right-4"
            >
              <motion.div style={l2} className="rounded-2xl bg-ink p-3.5 pr-5 text-cream shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron text-ink">
                    <FiClock className="text-lg" />
                  </span>
                  <div>
                    <p className="font-display text-2xl leading-none">25 min</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-cream/60">avg. delivery</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.7, ease }}
              className="absolute bottom-[2%] right-[8%]"
            >
              <motion.div style={l3} className="rounded-full bg-basil px-4 py-2.5 text-xs font-bold text-cream shadow-card">
                🌿 100% fresh, never frozen
              </motion.div>
            </motion.div>

            <Arrow className="absolute -left-24 top-[38%] hidden w-24 rotate-[-10deg] text-ink/40 xl:block" />
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="container-x relative mt-16 lg:mt-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-4">
          {[
            ["120+", "dishes on the menu"],
            ["25 min", "average delivery"],
            ["48", "chefs in our kitchens"],
            ["1.2M", "orders delivered hot"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className="bg-cream p-6 sm:p-7"
            >
              <p className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{k}</p>
              <p className="mt-1 text-sm text-ink-500">{v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
