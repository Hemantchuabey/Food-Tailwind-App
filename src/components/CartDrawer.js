import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiMinus, FiPlus, FiTag, FiTrash2, FiTruck, FiX } from "./Icons";
import { FREE_DELIVERY_AT, useCart } from "../context/CartContext";
import { menu, promos } from "../data/menu";
import { inr } from "../utils/format";
import { SmartImage, useEscape, useLockBody } from "./ui";
import { EmptyBagIllo, VegMark } from "./Vectors";

export function FreeDeliveryMeter({ subtotal }) {
  const pct = Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100);
  const left = FREE_DELIVERY_AT - subtotal;
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <FiTruck className={left > 0 ? "text-ink-500" : "text-basil"} />
        {left > 0 ? (
          <>
            Add <span className="font-extrabold text-tomato">{inr(left)}</span> more for free delivery
          </>
        ) : (
          <span className="text-basil">Woohoo! You've unlocked free delivery 🎉</span>
        )}
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-200">
        <motion.div
          className={`h-full w-full origin-left rounded-full ${left > 0 ? "bg-gradient-to-r from-saffron to-tomato" : "bg-basil"}`}
          initial={false}
          animate={{ scaleX: pct / 100 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

export function PromoBox() {
  const { applyPromo, promo, promoValid, removePromo } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = (c) => {
    const res = applyPromo(c ?? code);
    setMsg(res);
    if (res.ok) setCode("");
  };

  if (promo) {
    return (
      <div className={`flex items-center justify-between rounded-2xl border-2 border-dashed p-3.5 pl-4 ${promoValid ? "border-basil bg-basil-100" : "border-saffron bg-saffron-100"}`}>
        <div className="flex items-center gap-3">
          <FiTag className={promoValid ? "text-basil" : "text-saffron-600"} />
          <div>
            <p className="font-mono text-sm font-bold tracking-widest">{promo.code}</p>
            <p className="text-xs font-semibold text-ink-500">{promoValid ? promo.label : `Add ${inr(promo.min)}+ to activate`}</p>
          </div>
        </div>
        <button onClick={() => { removePromo(); setMsg(null); }} className="text-xs font-bold text-ink-500 underline-offset-2 hover:text-tomato hover:underline">
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex h-12 items-center rounded-2xl bg-white p-1 pl-4 ring-1 ring-ink/10 focus-within:ring-ink"
      >
        <FiTag className="shrink-0 text-ink-500" />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Promo code"
          className="h-full w-full bg-transparent px-3 font-mono text-sm font-bold tracking-widest placeholder:font-sans placeholder:font-medium placeholder:tracking-normal placeholder:text-ink-300"
          aria-label="Promo code"
        />
        <button disabled={!code} className="h-full rounded-xl bg-ink px-4 text-sm font-bold text-cream transition hover:bg-tomato disabled:opacity-30">
          Apply
        </button>
      </form>
      <AnimatePresence>
        {msg && !msg.ok && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-xs font-semibold text-tomato-700">
            {msg.message}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {Object.values(promos).map((p) => (
          <button key={p.code} onClick={() => submit(p.code)} className="shrink-0 rounded-full border border-dashed border-ink/25 px-3 py-1.5 text-[11px] font-bold transition hover:border-ink hover:bg-white">
            <span className="font-mono tracking-wider">{p.code}</span> <span className="text-ink-500">· {p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Bill({ compact }) {
  const { subtotal, discount, delivery, packaging, tax, total, promo } = useCart();
  const Row = ({ k, v, accent }) => (
    <div className={`flex justify-between ${accent || "text-ink-700"}`}>
      <span>{k}</span>
      <span className="font-semibold tabular-nums">{v}</span>
    </div>
  );
  return (
    <div className={`space-y-2.5 text-sm ${compact ? "" : "rounded-2xl bg-white p-4 ring-1 ring-ink/5"}`}>
      <Row k="Item total" v={inr(subtotal)} />
      {discount > 0 && <Row k={`Discount (${promo.code})`} v={`− ${inr(discount)}`} accent="text-basil" />}
      <Row k="Delivery fee" v={delivery === 0 ? <span className="font-bold text-basil">FREE</span> : inr(delivery)} />
      <Row k="Packaging" v={inr(packaging)} />
      <Row k="GST (5%)" v={inr(tax)} />
      <div className="!mt-4 flex items-end justify-between border-t border-dashed border-ink/15 pt-4">
        <span className="font-bold">To pay</span>
        <span className="font-display text-3xl font-medium tracking-tight">{inr(total)}</span>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const cart = useCart();
  const { isOpen, closeCart, lines, count, subtotal, total, add, dec, remove } = cart;
  const navigate = useNavigate();
  useLockBody(isOpen);
  useEscape(isOpen, closeCart);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label="Your bag">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-[460px] flex-col bg-cream shadow-lift sm:rounded-l-[36px]"
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-6">
              <div>
                <h2 className="font-display text-4xl font-medium tracking-tight">Your bag</h2>
                <p className="text-sm text-ink-500">
                  {count} {count === 1 ? "item" : "items"} · Delivering to Indiranagar
                </p>
              </div>
              <button onClick={closeCart} className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg ring-1 ring-ink/10 transition hover:rotate-90" aria-label="Close bag">
                <FiX />
              </button>
            </div>

            {count === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <EmptyBagIllo className="h-48 w-48" />
                <h3 className="mt-4 font-display text-3xl">Your bag is hungry</h3>
                <p className="mt-2 text-ink-500">Feed it something delicious — our bestsellers are a great place to start.</p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate("/#menu");
                  }}
                  className="btn-ink mt-6"
                >
                  Browse the menu <FiArrowRight />
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-6">
                  <FreeDeliveryMeter subtotal={subtotal} />
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {lines.map(({ item, qty }) => (
                        <motion.li
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-ink/5"
                        >
                          <SmartImage src={item.image} alt={item.name} className="h-[84px] w-[84px] shrink-0 rounded-xl" />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <p className="flex items-center gap-1.5 truncate font-bold leading-tight">
                                <VegMark veg={item.veg} className="!h-3.5 !w-3.5 shrink-0 scale-90" />
                                <span className="truncate">{item.name}</span>
                              </p>
                              <button onClick={() => remove(item.id)} className="text-ink-300 transition hover:text-tomato" aria-label={`Remove ${item.name}`}>
                                <FiTrash2 />
                              </button>
                            </div>
                            <p className="text-xs text-ink-500">{inr(item.price)} each</p>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="inline-flex h-9 items-center rounded-full bg-cream-100">
                                <button onClick={() => dec(item.id)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-200" aria-label="Decrease">
                                  <FiMinus className="text-sm" />
                                </button>
                                <span className="w-5 text-center text-sm font-extrabold tabular-nums">{qty}</span>
                                <button onClick={() => add(item.id, 1, true)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-200" aria-label="Increase">
                                  <FiPlus className="text-sm" />
                                </button>
                              </div>
                              <p className="font-display text-xl font-medium">{inr(item.price * qty)}</p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  {(() => {
                    const pairings = menu.filter((m) => (m.category === "drink" || m.category === "dessert") && !cart.items[m.id]);
                    if (pairings.length === 0) return null;
                    return (
                      <div className="rounded-2xl bg-cream-100/80 p-3.5 ring-1 ring-ink/5">
                        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-500">Complete your meal ✨</p>
                        <div className="no-scrollbar mt-2.5 flex gap-2.5 overflow-x-auto pb-1">
                          {pairings.map((p) => (
                            <div key={p.id} className="flex w-52 shrink-0 items-center gap-2.5 rounded-xl bg-white p-2 ring-1 ring-ink/5">
                              <SmartImage src={p.image} alt={p.name} className="h-12 w-12 shrink-0 rounded-lg" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-bold">{p.name}</p>
                                <p className="text-xs font-semibold text-ink-500">{inr(p.price)}</p>
                              </div>
                              <button
                                onClick={() => add(p.id, 1, true)}
                                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-cream transition hover:bg-tomato"
                                aria-label={`Add ${p.name}`}
                              >
                                <FiPlus className="text-sm" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                  <PromoBox />
                  <Bill />
                </div>
                <div className="border-t border-ink/10 bg-cream/95 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] backdrop-blur">
                  <button
                    onClick={() => {
                      closeCart();
                      navigate("/checkout");
                    }}
                    className="btn-tomato group h-16 w-full justify-between px-7 text-base"
                  >
                    <span className="flex items-center gap-2">
                      Checkout <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="font-display text-xl">{inr(total)}</span>
                  </button>
                  <p className="mt-3 text-center text-xs text-ink-500">No account needed · Guest checkout in 30 seconds</p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
