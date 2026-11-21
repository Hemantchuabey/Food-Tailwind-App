import { motion } from "framer-motion";
import { Reveal } from "./ui";
import { PanIllo, PhoneIllo, ScooterIllo } from "./Vectors";

const steps = [
  { n: "01", title: "Pick your craving", text: "Browse 120+ dishes, filter by mood, diet or how hungry you really are.", Illo: PhoneIllo, bg: "bg-saffron-100" },
  { n: "02", title: "We fire it up", text: "Our chefs cook every order fresh — no heat lamps, no shortcuts, ever.", Illo: PanIllo, bg: "bg-tomato-100" },
  { n: "03", title: "Hot at your door", text: "Track your rider live. Average door-to-door time: just 25 minutes.", Illo: ScooterIllo, bg: "bg-basil-100" },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">How it works</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5">
              From craving to <em className="text-tomato">couch</em> in three steps.
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          <svg className="pointer-events-none absolute left-[16%] right-[16%] top-[110px] hidden h-16 md:block" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M0 30 C100 -10 200 70 300 30 S500 -10 600 30"
              fill="none"
              stroke="#1A1410"
              strokeOpacity=".25"
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
          {steps.map(({ n, title, text, Illo, bg }, i) => (
            <Reveal key={n} delay={i * 0.12} className="group relative">
              <div className={`relative mx-auto aspect-[5/4] overflow-hidden rounded-[36px] ${bg} p-6 transition-transform duration-500 group-hover:-translate-y-2`}>
                <Illo />
                <span className="absolute left-5 top-4 font-display text-6xl font-medium italic text-ink/10">{n}</span>
              </div>
              <div className="mt-6 px-2">
                <h3 className="font-display text-3xl font-medium tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
