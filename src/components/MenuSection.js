import { lazy, Suspense, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiHeart, FiSearch, FiX } from "./Icons";
import { useCart } from "../context/CartContext";
import { categories, menu } from "../data/menu";
import FoodCard from "./FoodCard";
import { Reveal } from "./ui";
import { CategoryIcon, EmptyBagIllo } from "./Vectors";

const QuickView = lazy(() => import("./QuickView"));

const sorts = {
  popular: { label: "Most popular", fn: (a, b) => b.reviews - a.reviews },
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
  low: { label: "Price: low → high", fn: (a, b) => a.price - b.price },
  high: { label: "Price: high → low", fn: (a, b) => b.price - a.price },
  fast: { label: "Fastest delivery", fn: (a, b) => a.time - b.time },
};

export default function MenuSection() {
  const { favs } = useCart();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [vegOnly, setVegOnly] = useState(false);
  const [favOnly, setFavOnly] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .filter((m) => cat === "all" || m.category === cat)
      .filter((m) => !vegOnly || m.veg)
      .filter((m) => !favOnly || favs.includes(m.id))
      .filter((m) => !q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))
      .sort(sorts[sort].fn);
  }, [cat, query, sort, vegOnly, favOnly, favs]);

  const counts = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.id === "all" ? menu.length : menu.filter((m) => m.category === c.id).length])),
    []
  );

  const reset = () => {
    setCat("all");
    setQuery("");
    setVegOnly(false);
    setFavOnly(false);
  };

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-tomato" /> The menu · {menu.length} dishes
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-5 max-w-2xl">
                Crafted to make you <em className="text-tomato">crave</em> more.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="w-full lg:max-w-sm">
            <label className="group relative flex h-14 items-center rounded-full bg-white pl-5 pr-2 shadow-card ring-1 ring-ink/5 transition focus-within:ring-2 focus-within:ring-ink">
              <FiSearch className="shrink-0 text-lg text-ink-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search burgers, wings, bowls…"
                className="h-full w-full bg-transparent px-3 text-[15px] font-medium placeholder:text-ink-300"
                aria-label="Search the menu"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={() => setQuery("")}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream-100"
                    aria-label="Clear search"
                  >
                    <FiX />
                  </motion.button>
                )}
              </AnimatePresence>
            </label>
          </Reveal>
        </div>

        {/* Filters */}
        <div className="sticky top-[84px] z-30 -mx-5 mt-10 bg-cream/85 px-5 py-3 backdrop-blur-xl sm:top-[92px] sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
              {categories.map((c) => {
                const on = cat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`relative inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${
                      on ? "bg-ink text-cream" : "bg-white text-ink-700 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <CategoryIcon id={c.id} className="h-[18px] w-[18px]" />
                      {c.label}
                      <span className={`text-[11px] font-extrabold ${on ? "text-saffron" : "text-ink-500"}`}>{counts[c.id]}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFavOnly((v) => !v)}
                className={`inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-bold ring-1 transition ${
                  favOnly ? "bg-tomato text-white ring-tomato" : "bg-white text-ink ring-ink/10 hover:ring-ink/30"
                }`}
                aria-pressed={favOnly}
              >
                <FiHeart className={favOnly ? "fill-white text-white" : "text-tomato"} />
                Saved
                {favs.length > 0 && (
                  <span className={`grid h-5 min-w-[20px] place-items-center rounded-full px-1 text-[11px] font-extrabold ${favOnly ? "bg-white text-tomato" : "bg-tomato-100 text-tomato"}`}>
                    {favs.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setVegOnly((v) => !v)}
                className="inline-flex h-12 items-center gap-3 rounded-full bg-white pl-4 pr-2 text-sm font-bold ring-1 ring-ink/10"
                aria-pressed={vegOnly}
              >
                Veg only
                <span className={`relative h-7 w-12 rounded-full transition-colors ${vegOnly ? "bg-basil" : "bg-ink/15"}`}>
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 600, damping: 32 }}
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${vegOnly ? "right-1" : "left-1"}`}
                  />
                </span>
              </button>
              <label className="relative inline-flex h-12 flex-1 items-center rounded-full bg-white ring-1 ring-ink/10 lg:flex-none">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-full w-full cursor-pointer appearance-none rounded-full bg-transparent pl-5 pr-11 text-sm font-bold"
                  aria-label="Sort dishes"
                >
                  {Object.entries(sorts).map(([k, s]) => (
                    <option key={k} value={k}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-4" />
              </label>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm font-semibold text-ink-500">
          Showing <span className="text-ink">{items.length}</span> {items.length === 1 ? "dish" : "dishes"}
          {query && (
            <>
              {" "}
              for “<span className="text-ink">{query}</span>”
            </>
          )}
        </p>

        {(() => {
          const isFiltered = cat !== "all" || query.trim() || vegOnly || favOnly || showAll;
          const visible = isFiltered ? items : items.slice(0, 8);
          return (
            <>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence>
                  {visible.map((item) => (
                    <FoodCard key={item.id} item={item} onOpen={setActive} />
                  ))}
                </AnimatePresence>
              </div>
              {!isFiltered && items.length > 8 && (
                <div className="mt-10 flex justify-center">
                  <button onClick={() => setShowAll(true)} className="btn-ghost h-14 px-8 text-[15px]">
                    Show all {items.length} dishes (+{items.length - 8} more)
                  </button>
                </div>
              )}
            </>
          );
        })()}

        <AnimatePresence>
          {items.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center rounded-[32px] border-2 border-dashed border-ink/10 py-16 text-center"
            >
              <EmptyBagIllo />
              <h3 className="mt-4 font-display text-3xl">Nothing matches that craving</h3>
              <p className="mt-2 max-w-sm text-ink-500">Try a different search or clear your filters — there's plenty more on the menu.</p>
              <button onClick={reset} className="btn-ink mt-6">
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{active && <QuickView key={active.id} item={active} onClose={() => setActive(null)} />}</AnimatePresence>
      </Suspense>
    </section>
  );
}
