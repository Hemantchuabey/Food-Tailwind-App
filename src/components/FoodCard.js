import { AnimatePresence, motion } from "framer-motion";
import { FiClock, FiHeart, FiMinus, FiPlus, FiStar } from "./Icons";
import { useCart } from "../context/CartContext";
import { inr } from "../utils/format";
import { SmartImage } from "./ui";
import { VegMark } from "./Vectors";

const badgeStyle = {
  Bestseller: "bg-saffron text-ink",
  "Chef's pick": "bg-basil text-cream",
  New: "bg-white text-ink",
  Spicy: "bg-tomato-700 text-white",
};

export function QtyControl({ item, size = "md" }) {
  const { qtyOf, add, dec } = useCart();
  const qty = qtyOf(item.id);
  const h = size === "lg" ? "h-14" : "h-11";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {qty === 0 ? (
        <motion.button
          key="add"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.16 }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => {
            e.stopPropagation();
            add(item.id);
          }}
          className={`group/add inline-flex ${h} items-center gap-1.5 rounded-full bg-ink pl-4 pr-5 text-sm font-bold text-cream transition-colors hover:bg-tomato`}
          aria-label={`Add ${item.name} to bag`}
        >
          <FiPlus className="transition-transform duration-300 group-hover/add:rotate-90" /> Add
        </motion.button>
      ) : (
        <motion.div
          key="stepper"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.16 }}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex ${h} items-center gap-1 rounded-full bg-tomato p-1 text-white shadow-[0_10px_24px_-10px_rgba(255,77,46,0.8)]`}
        >
          <button onClick={() => dec(item.id)} className="grid aspect-square h-full place-items-center rounded-full transition hover:bg-white/20" aria-label="Decrease quantity">
            <FiMinus />
          </button>
          <span className="relative w-6 overflow-hidden text-center text-sm font-extrabold tabular-nums">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={qty} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.14 }} className="block">
                {qty}
              </motion.span>
            </AnimatePresence>
          </span>
          <button onClick={() => add(item.id, 1, true)} className="grid aspect-square h-full place-items-center rounded-full transition hover:bg-white/20" aria-label="Increase quantity">
            <FiPlus />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FavButton({ id, className = "" }) {
  const { isFav, toggleFav } = useCart();
  const on = isFav(id);
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.stopPropagation();
        toggleFav(id);
      }}
      className={`grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white ${className}`}
      aria-label={on ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={on}
    >
      <motion.span key={String(on)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
        <FiHeart className={`text-[17px] ${on ? "fill-tomato text-tomato" : "text-ink"}`} />
      </motion.span>
    </motion.button>
  );
}

export default function FoodCard({ item, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(item)}
      className="group relative flex cursor-pointer flex-col rounded-[28px] bg-white p-2.5 shadow-card ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative">
        <SmartImage
          src={item.image}
          widths={[220, 280]}
          sizes="(max-width: 639px) 84vw, (max-width: 1023px) 42vw, 260px"
          alt={item.name}
          className="aspect-[4/3] w-full rounded-[22px]"
          imgClassName="group-hover:scale-[1.07]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {item.badge && (
          <span className={`chip absolute left-3 top-3 shadow-sm ${badgeStyle[item.badge]}`}>
            {item.badge === "Spicy" ? "🌶 " : ""}
            {item.badge}
          </span>
        )}
        <FavButton id={item.id} className="absolute right-3 top-3" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold backdrop-blur">
          <FiClock className="text-tomato" /> {item.time} min
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[22px] font-medium leading-[1.1] tracking-tight">{item.name}</h3>
          <VegMark veg={item.veg} className="mt-1 shrink-0" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-ink-500">
          <span className="inline-flex items-center gap-1 text-ink">
            <FiStar className="fill-saffron text-saffron" /> {item.rating}
          </span>
          <span className="h-1 w-1 rounded-full bg-ink/20" />
          <span>{item.reviews.toLocaleString("en-IN")} reviews</span>
          <span className="h-1 w-1 rounded-full bg-ink/20" />
          <span>{item.kcal} kcal</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-display text-[28px] font-medium tracking-tight">{inr(item.price)}</p>
          <QtyControl item={item} />
        </div>
      </div>
    </motion.article>
  );
}
