import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "./Icons";
import { Reveal } from "./ui";
import { Leaf, LogoMark, Sparkle } from "./Vectors";

const AppleIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
  </svg>
);

const PlayIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 01-.61-1.434V3.248c0-.56.233-1.07.609-1.434zm11.27 11.27l2.757 2.757-11.46 6.535 8.703-9.292zm3.883-2.943l2.313 1.32a1.25 1.25 0 010 2.172l-2.313 1.32-2.89-2.89 2.89-1.922zM6.176 1.624l11.46 6.535-2.757 2.757-8.703-9.292z" />
  </svg>
);

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[260px] rotate-[-6deg] rounded-[44px] bg-ink p-3 shadow-lift sm:w-[290px]">
      <div className="absolute left-1/2 top-5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[34px] bg-cream">
        <div className="relative h-56 overflow-hidden bg-basil-100">
          <svg viewBox="0 0 260 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M0 60h260M0 150h260M70 0v220M190 0v220" stroke="#fff" strokeWidth="14" />
            <path d="M0 105h260M130 0v220" stroke="#fff" strokeWidth="6" />
            <rect x="85" y="20" width="90" height="70" rx="8" fill="#C9DDD5" />
            <rect x="10" y="165" width="50" height="45" rx="8" fill="#C9DDD5" />
            <motion.path
              d="M40 190 C60 150 70 140 70 105 S130 90 190 60 L215 40"
              fill="none"
              stroke="#FF4D2E"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1 1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            <circle cx="215" cy="40" r="10" fill="#1A1410" />
            <circle cx="215" cy="40" r="4" fill="#FFB224" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute left-[60px] top-[92px] grid h-9 w-9 place-items-center rounded-full bg-tomato text-sm shadow-lg ring-4 ring-white"
          >
            🛵
          </motion.div>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Arriving in</p>
              <p className="font-display text-3xl leading-none">8 min</p>
            </div>
            <LogoMark className="h-9 w-9" />
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink/10">
            <motion.div initial={{ scaleX: 0.2 }} whileInView={{ scaleX: 0.78 }} transition={{ duration: 2.5, ease: "easeInOut" }} className="h-full w-full origin-left rounded-full bg-tomato" />
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron font-bold">R</span>
            <div className="flex-1">
              <p className="text-sm font-bold">Ravi is on the way</p>
              <p className="text-xs text-ink-500">Honda Activa · KA 01 4421</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);

  return (
    <section className="py-10 sm:py-16">
      <div className="container-x">
        <Reveal className="grain relative overflow-hidden rounded-[40px] bg-tomato px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-saffron/40 blur-3xl" />
          <Leaf className="absolute bottom-6 left-[46%] hidden w-16 rotate-45 opacity-90 lg:block" />
          <Sparkle className="absolute right-[42%] top-10 hidden h-6 w-6 text-saffron lg:block" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="chip bg-white/20 text-white">📱 The Crave app</span>
              <h2 className="mt-5 font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
                Track every bite, <em className="text-ink">live.</em>
              </h2>
              <p className="mt-5 max-w-md text-white/85">
                Real-time rider tracking, one-tap reorders and app-only drops every Friday. Get ₹100 off your first app order.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  [AppleIcon, "Download on the", "App Store"],
                  [PlayIcon, "Get it on", "Google Play"],
                ].map(([Icon, small, big]) => (
                  <button key={big} className="inline-flex h-14 items-center gap-3 rounded-2xl bg-ink px-5 text-left text-cream transition hover:-translate-y-0.5 hover:bg-ink-900">
                    <Icon className="h-6 w-6" />
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-cream/60">{small}</span>
                      <span className="block text-[15px] font-bold leading-tight">{big}</span>
                    </span>
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (valid) setDone(true);
                }}
                className="mt-10 max-w-md"
              >
                <p className="mb-3 text-sm font-semibold text-white/85">Or get secret menu drops by email</p>
                <div className="flex h-14 items-center rounded-full bg-white p-1.5 pl-5 text-ink">
                  <AnimatePresence mode="wait" initial={false}>
                    {done ? (
                      <motion.p key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 items-center gap-2 text-sm font-bold text-basil">
                        <FiCheck className="text-lg" /> You're on the list. Welcome to the club!
                      </motion.p>
                    ) : (
                      <motion.div key="form" exit={{ opacity: 0, y: -8 }} className="flex flex-1 items-center">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@hungry.com"
                          className="h-full flex-1 bg-transparent text-[15px] font-medium placeholder:text-ink-300"
                          aria-label="Email address"
                        />
                        <button disabled={!valid} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream transition hover:bg-tomato disabled:opacity-40" aria-label="Subscribe">
                          <FiArrowRight />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

            <div className="relative">
              <motion.div initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <PhoneMock />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute right-0 top-10 hidden rounded-2xl bg-white p-3 text-ink shadow-lift sm:block lg:-right-2"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Order #CRV-2041</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold">
                  <span className="h-2 w-2 rounded-full bg-basil" /> Out for delivery
                </p>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
