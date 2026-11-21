import { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiMinus, FiPlus, FiStar, FiX, FiZap } from "./Icons";
import { useCart } from "../context/CartContext";
import { inr } from "../utils/format";
import { FavButton } from "./FoodCard";
import { SmartImage, useEscape, useLockBody } from "./ui";
import { Chili, VegMark } from "./Vectors";

export default function QuickView({ item, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  useLockBody(true);
  useEscape(true, onClose);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={item.name}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[32px] bg-cream sm:rounded-[36px] md:grid-cols-2"
      >
        <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/80 sm:hidden" />
        <div className="relative p-2.5">
          <SmartImage src={item.image} alt={item.name} className="aspect-[4/3] w-full rounded-[26px] md:aspect-auto md:h-full md:min-h-[460px]" />
          <FavButton id={item.id} className="absolute left-6 top-6" />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
              <VegMark veg={item.veg} /> {item.veg ? "Vegetarian" : "Non-veg"}
            </span>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white text-lg ring-1 ring-ink/10 transition hover:rotate-90" aria-label="Close">
              <FiX />
            </button>
          </div>

          <h3 className="mt-4 font-display text-4xl font-medium leading-[1] tracking-tight sm:text-5xl">{item.name}</h3>
          <p className="mt-4 leading-relaxed text-ink-500">{item.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              [<FiStar className="fill-saffron text-saffron" />, item.rating, `${item.reviews.toLocaleString("en-IN")} reviews`],
              [<FiClock className="text-tomato" />, `${item.time}m`, "prep + ride"],
              [<FiZap className="text-basil" />, item.kcal, "kcal"],
            ].map(([icon, k, v], i) => (
              <div key={i} className="rounded-2xl bg-white p-3 ring-1 ring-ink/5">
                <p className="flex items-center gap-1.5 text-lg font-extrabold">
                  {icon}
                  {k}
                </p>
                <p className="text-[11px] font-semibold text-ink-500">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-ink-500">
            Spice level
            <span className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <Chili key={n} className={`h-5 w-5 ${n <= item.spice ? "" : "opacity-20 grayscale"}`} />
              ))}
            </span>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-8">
            <div className="inline-flex h-14 items-center gap-1 rounded-full bg-white p-1 ring-1 ring-ink/10">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center rounded-full hover:bg-cream-100" aria-label="Decrease">
                <FiMinus />
              </button>
              <span className="w-6 text-center font-extrabold tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid h-12 w-12 place-items-center rounded-full hover:bg-cream-100" aria-label="Increase">
                <FiPlus />
              </button>
            </div>
            <button
              onClick={() => {
                add(item.id, qty);
                onClose();
              }}
              className="btn-tomato h-14 flex-1 justify-between px-6 text-[15px]"
            >
              <span>Add to bag</span>
              <span className="font-display text-lg">{inr(item.price * qty)}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
