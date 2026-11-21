import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin, FiMenu, FiShoppingBag, FiX } from "./Icons";
import { useCart } from "../context/CartContext";
import { Logo } from "./Vectors";
import { useLockBody } from "./ui";

const links = [
  { label: "Menu", to: "/#menu" },
  { label: "Offers", to: "/#offers" },
  { label: "How it works", to: "/#how" },
  { label: "Reviews", to: "/#reviews" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.key]);
  useLockBody(open);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="container-x">
          <nav
            className={`flex h-16 items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 sm:pl-6 ${
              scrolled ? "bg-cream/80 shadow-soft ring-1 ring-ink/5 backdrop-blur-xl" : "bg-transparent"
            }`}
          >
            <Link to="/" aria-label="Crave home" className="shrink-0">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="group relative rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition hover:text-ink"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-tomato transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2.5 text-xs font-semibold text-ink-700 md:inline-flex">
                <FiMapPin className="text-tomato" />
                Deliver to <span className="font-bold text-ink">Indiranagar, BLR</span>
              </span>
              <button
                onClick={openCart}
                className="relative inline-flex h-12 items-center gap-2 rounded-full bg-ink pl-4 pr-5 text-sm font-bold text-cream transition hover:bg-tomato active:scale-95"
                aria-label={`Open cart with ${count} items`}
              >
                <FiShoppingBag className="text-lg" />
                <span className="hidden sm:inline">Bag</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="grid h-6 min-w-[24px] place-items-center rounded-full bg-saffron px-1.5 text-[11px] font-extrabold text-ink"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button
                onClick={() => setOpen(true)}
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-white/70 text-xl lg:hidden"
                aria-label="Open menu"
              >
                <FiMenu />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-cream lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex h-[88px] items-center justify-between pt-3">
              <Logo light />
              <button onClick={() => setOpen(false)} className="grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-xl" aria-label="Close menu">
                <FiX />
              </button>
            </div>
            <ul className="container-x mt-8 flex flex-1 flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-cream/10"
                >
                  <Link to={l.to} className="flex items-center justify-between py-5 font-display text-5xl tracking-tight">
                    {l.label}
                    <FiArrowUpRight className="text-3xl text-tomato" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="container-x flex items-center justify-between pb-10 text-sm text-cream/60"
            >
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="text-tomato" /> Indiranagar, Bengaluru
              </span>
              <span>Open till 3 AM</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
