import { reviews } from "../data/menu";
import { Reveal, Stars } from "./ui";

const avatarTone = {
  "bg-tomato": "bg-tomato-700 text-white",
  "bg-saffron": "bg-saffron text-ink",
  "bg-basil": "bg-basil text-white",
  "bg-ink": "bg-ink text-white",
};

function Card({ r }) {
  return (
    <figure className="w-[300px] shrink-0 rounded-[28px] bg-white p-6 shadow-card ring-1 ring-ink/5 sm:w-[360px]">
      <Stars value={r.rating} />
      <blockquote className="mt-4 font-display text-xl leading-snug tracking-tight">“{r.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold ${avatarTone[r.color] || "bg-ink text-white"}`}>
          {r.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
        <span>
          <span className="block text-sm font-bold">{r.name}</span>
          <span className="block text-xs text-ink-500">{r.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }) {
  return (
    <div className="flex w-max gap-5">
      <div className={`flex gap-5 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(reviews.length / 2);
  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="eyebrow">Wall of love</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5">
              12,000 people
              <br />
              can't be <em className="text-tomato">wrong.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="flex items-center gap-4 rounded-3xl bg-white p-4 pr-6 shadow-card ring-1 ring-ink/5">
          <p className="font-display text-6xl font-medium leading-none">4.9</p>
          <div>
            <Stars value={5} className="h-4 w-4" />
            <p className="mt-1 text-sm text-ink-500">from 48,000+ ratings</p>
          </div>
        </Reveal>
      </div>

      <div className="pause-hover relative mt-14 flex flex-col gap-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row items={reviews.slice(0, half)} />
        <Row items={reviews.slice(half)} reverse />
      </div>
    </section>
  );
}
