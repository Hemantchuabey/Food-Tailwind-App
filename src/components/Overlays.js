import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiInfo, FiShoppingBag } from "./Icons";
import { useCart } from "../context/CartContext";
import { inr } from "../utils/format";
import { SmartImage } from "./ui";

export function Toast() {
  const { toast, openCart, dismissToast, count } = useCart();
  const { pathname } = useLocation();
  const lifted = count > 0 && pathname === "/";

  return (
    <div className={`pointer-events-none fixed inset-x-0 z-[80] flex justify-center px-4 transition-[bottom] ${lifted ? "bottom-24 md:bottom-8" : "bottom-6 md:bottom-8"}`}>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl bg-ink p-2 pr-3 text-cream shadow-lift"
            role="status"
          >
            {toast.kind === "cart" && toast.item ? (
              <>
                <div className="relative">
                  <SmartImage src={toast.item.image} alt="" className="h-12 w-12 rounded-xl" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-basil text-[10px] ring-2 ring-ink">
                    <FiCheck />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {toast.qty > 1 ? `${toast.qty} × ` : ""}
                    {toast.item.name}
                  </p>
                  <p className="text-xs text-cream/60">Added to bag · {inr(toast.item.price * toast.qty)}</p>
                </div>
                <button
                  onClick={() => {
                    dismissToast();
                    openCart();
                  }}
                  className="rounded-xl bg-cream/10 px-3 py-2 text-xs font-bold transition hover:bg-tomato"
                >
                  View bag
                </button>
              </>
            ) : (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron text-ink">
                  <FiInfo />
                </span>
                <p className="flex-1 text-sm font-semibold">{toast.message}</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileCartBar() {
  const { count, total, openCart, isOpen } = useCart();
  const { pathname } = useLocation();
  const show = count > 0 && pathname === "/" && !isOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={openCart}
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-16 items-center justify-between rounded-full bg-ink pl-2 pr-6 text-cream shadow-lift md:hidden"
        >
          <span className="flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-tomato">
              <FiShoppingBag className="text-lg" />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-saffron px-1 text-[10px] font-extrabold text-ink">{count}</span>
            </span>
            <span className="text-left">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-cream/60">{count} items</span>
              <span className="block font-display text-xl leading-none">{inr(total)}</span>
            </span>
          </span>
          <span className="flex items-center gap-2 text-sm font-bold">
            View bag <FiArrowRight />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
