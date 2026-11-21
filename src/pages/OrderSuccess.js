import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiClock, FiCreditCard, FiMapPin, FiPackage, FiPhone } from "../components/Icons";
import { SmartImage } from "../components/ui";
import { VegMark } from "../components/Vectors";
import { cx, inr } from "../utils/format";

const ease = [0.22, 1, 0.36, 1];
const stages = [
  { label: "Order confirmed", sub: "The kitchen has your order", at: 0, icon: FiCheck },
  { label: "Cooking", sub: "Chef is firing it up 🔥", at: 5, icon: FiPackage },
  { label: "Out for delivery", sub: "Ravi is on the way", at: 14, icon: FiMapPin },
  { label: "Delivered", sub: "Enjoy every bite!", at: 32, icon: FiCheck },
];
const colors = ["#FF4D2E", "#FFB224", "#2F5D50", "#1A1410", "#FFC2B5"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 900,
        y: 300 + Math.random() * 500,
        r: Math.random() * 720 - 360,
        d: 1.6 + Math.random() * 1.6,
        delay: Math.random() * 0.25,
        w: 6 + Math.random() * 8,
        round: Math.random() > 0.6,
        c: colors[i % colors.length],
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-0 w-0" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{ x: p.x, y: [0, -180 - Math.random() * 120, p.y], opacity: [1, 1, 0], rotate: p.r, scale: 1 }}
          transition={{ duration: p.d, delay: p.delay, ease: "easeOut" }}
          className="absolute block"
          style={{ width: p.w, height: p.round ? p.w : p.w * 0.45, background: p.c, borderRadius: p.round ? 999 : 2 }}
        />
      ))}
    </div>
  );
}

function RouteMap({ progress }) {
  const pathRef = useRef(null);
  const [pt, setPt] = useState({ x: 40, y: 180 });
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const { x, y } = p.getPointAtLength(len * progress);
    setPt({ x, y });
  }, [progress]);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-basil-100">
      <svg viewBox="0 0 400 220" className="h-full w-full" aria-label="Delivery route map">
        <g stroke="#fff" fill="none">
          <path d="M0 60h400M0 160h400M90 0v220M260 0v220M340 0v220" strokeWidth="16" />
          <path d="M0 110h400M180 0v220" strokeWidth="7" />
        </g>
        <rect x="110" y="78" width="54" height="66" rx="8" fill="#C9DDD5" />
        <rect x="280" y="80" width="44" height="60" rx="8" fill="#C9DDD5" />
        <rect x="16" y="176" width="58" height="36" rx="8" fill="#C9DDD5" />
        <circle cx="210" cy="190" r="16" fill="#B6D2C7" />
        <path ref={pathRef} d="M40 180 C70 170 90 160 90 110 S150 60 180 60 S260 70 260 110 S300 160 340 60" fill="none" stroke="#1A1410" strokeOpacity=".15" strokeWidth="5" strokeLinecap="round" />
        <motion.path
          d="M40 180 C70 170 90 160 90 110 S150 60 180 60 S260 70 260 110 S300 160 340 60"
          fill="none"
          stroke="#FF4D2E"
          strokeWidth="5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: progress }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* kitchen */}
        <circle cx="40" cy="180" r="11" fill="#1A1410" />
        <text x="40" y="184" textAnchor="middle" fontSize="11">🍳</text>
        {/* home */}
        <circle cx="340" cy="60" r="14" fill="#FF4D2E" />
        <circle cx="340" cy="60" r="24" fill="#FF4D2E" opacity=".2">
          <animate attributeName="r" values="14;28;14" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".35;0;.35" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="340" y="65" textAnchor="middle" fontSize="13">🏠</text>
        {/* rider */}
        <motion.g initial={false} animate={{ x: pt.x, y: pt.y }} transition={{ duration: 1, ease: "easeInOut" }}>
          <circle r="15" fill="#fff" />
          <circle r="12" fill="#FFB224" />
          <text y="5" textAnchor="middle" fontSize="14">🛵</text>
        </motion.g>
      </svg>
    </div>
  );
}

export default function OrderSuccess() {
  const { id } = useParams();
  const order = useMemo(() => {
    try {
      const o = JSON.parse(localStorage.getItem("crave.lastOrder"));
      return o && o.id === id ? o : null;
    } catch {
      return null;
    }
  }, [id]);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!order) {
    return (
      <main className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-5xl font-medium tracking-tight">We couldn't find that order</h1>
        <p className="mt-3 text-ink-500">It may have been placed on another device.</p>
        <Link to="/" className="btn-ink mt-8">
          Back to home
        </Link>
      </main>
    );
  }

  const elapsed = (now - order.placedAt) / 1000; // demo: accelerated timeline
  const stageIndex = stages.reduce((acc, s, i) => (elapsed >= s.at ? i : acc), 0);
  const progress = Math.min(1, elapsed / stages[3].at);
  const minsLeft = order.eta ? Math.max(0, Math.ceil(order.eta * (1 - progress))) : null;
  const first = order.customer.name.split(" ")[0];
  const t = order.totals;

  return (
    <main className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
      <Confetti />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }} className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-basil">
            <span className="absolute inset-0 animate-ping rounded-full bg-basil/30" />
            <svg viewBox="0 0 52 52" className="h-12 w-12" aria-hidden="true">
              <motion.path d="M14 27l8 8 16-17" fill="none" stroke="#FBF6EE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.45, ease }} />
            </svg>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-ink-500">
            Order {order.id} confirmed
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease }} className="mt-3 font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl">
            Thank you, <em className="text-tomato">{first}!</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-4 text-lg text-ink-500">
            Your food is in great hands. We've sent updates to +91 {order.customer.phone}
            {order.customer.email ? ` and ${order.customer.email}` : ""}.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* tracking */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }} className="rounded-[36px] bg-white p-5 shadow-card ring-1 ring-ink/5 sm:p-7 lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">{order.slot ? "Scheduled for" : stageIndex === 3 ? "Delivered" : "Arriving in"}</p>
                <p className="mt-1 font-display text-5xl font-medium tracking-tight sm:text-6xl">
                  {order.slot ? order.slot : stageIndex === 3 ? "Enjoy! 🎉" : `${minsLeft} min`}
                </p>
              </div>
              <span className="chip bg-basil-100 text-basil">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-basil" /> Live
              </span>
            </div>

            <div className="mt-6 aspect-[400/220]">
              <RouteMap progress={order.slot ? 0 : progress} />
            </div>

            <ol className="mt-8 space-y-0">
              {stages.map((s, i) => {
                const done = !order.slot && i <= stageIndex;
                const current = !order.slot && i === stageIndex;
                return (
                  <li key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < stages.length - 1 && (
                      <span className="absolute left-[19px] top-10 h-[calc(100%-32px)] w-0.5 bg-ink/10">
                        <motion.span className="block w-full bg-basil" initial={false} animate={{ height: !order.slot && i < stageIndex ? "100%" : "0%" }} transition={{ duration: 0.6 }} />
                      </span>
                    )}
                    <span className={cx("relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-500", done ? "bg-basil text-cream" : "bg-cream-100 text-ink-300")}>
                      <s.icon />
                      {current && i < 3 && <span className="absolute inset-0 animate-ping rounded-full bg-basil/30" />}
                    </span>
                    <div className="pt-1.5">
                      <p className={cx("font-bold", !done && "text-ink-300")}>{s.label}</p>
                      <p className="text-sm text-ink-500">{s.sub}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {!order.slot && stageIndex >= 2 && stageIndex < 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 rounded-2xl bg-cream-100 p-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-saffron font-bold">R</span>
                <div className="flex-1">
                  <p className="text-sm font-bold">Ravi Kumar · ★ 4.9</p>
                  <p className="text-xs text-ink-500">Honda Activa · KA 01 4421</p>
                </div>
                <button className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream" aria-label="Call rider">
                  <FiPhone />
                </button>
              </motion.div>
            )}
          </motion.section>

          {/* receipt */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }} className="relative lg:col-span-5">
            <div className="rounded-[36px] bg-cream-100 p-5 ring-1 ring-ink/5 sm:p-7">
              <h2 className="font-display text-3xl font-medium tracking-tight">Receipt</h2>
              <ul className="mt-5 space-y-3">
                {order.lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-3">
                    <SmartImage src={l.image} alt={l.name} className="h-12 w-12 rounded-xl" />
                    <p className="flex flex-1 items-center gap-2 text-sm font-semibold">
                      <VegMark veg={l.veg} className="!h-3.5 !w-3.5" /> {l.qty} × {l.name}
                    </p>
                    <p className="text-sm font-bold tabular-nums">{inr(l.price * l.qty)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-dashed border-ink/15 pt-5 text-sm text-ink-700">
                {[
                  ["Item total", inr(t.subtotal)],
                  t.discount > 0 && ["Discount", `− ${inr(t.discount)}`],
                  ["Delivery", t.delivery ? inr(t.delivery) : "FREE"],
                  ["Packaging", inr(t.packaging)],
                  ["GST", inr(t.tax)],
                  t.tip > 0 && ["Rider tip", inr(t.tip)],
                ]
                  .filter(Boolean)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span>{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                <div className="flex items-end justify-between pt-3">
                  <span className="font-bold text-ink">Paid</span>
                  <span className="font-display text-4xl font-medium text-ink">{inr(t.total)}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3 rounded-2xl bg-white p-4 text-sm">
                <p className="flex gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-tomato" />
                  <span>
                    <span className="font-bold">{order.address.label}</span> · {order.address.line} – {order.address.pincode}
                  </span>
                </p>
                <p className="flex gap-3">
                  <FiCreditCard className="mt-0.5 shrink-0 text-tomato" /> {order.payment}
                </p>
                {order.notes.length > 0 && (
                  <p className="flex gap-3">
                    <FiClock className="mt-0.5 shrink-0 text-tomato" /> {order.notes.join(" · ")}
                  </p>
                )}
              </div>
            </div>
            <Link to="/#menu" className="btn-ink group mt-4 h-14 w-full">
              Order something else <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
