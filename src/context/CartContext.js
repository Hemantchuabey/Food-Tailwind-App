import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { menu, promos } from "../data/menu";

const CartContext = createContext(null);
const STORAGE_KEY = "crave.cart.v1";

export const FREE_DELIVERY_AT = 499;
const DELIVERY_FEE = 39;
const PACKAGING_FEE = 15;
const TAX_RATE = 0.05;

const initialState = { items: {}, promo: null, favs: [] };

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const qty = (state.items[action.id] || 0) + (action.qty || 1);
      return { ...state, items: { ...state.items, [action.id]: Math.min(qty, 20) } };
    }
    case "dec": {
      const items = { ...state.items };
      const qty = (items[action.id] || 0) - 1;
      if (qty <= 0) delete items[action.id];
      else items[action.id] = qty;
      return { ...state, items };
    }
    case "remove": {
      const items = { ...state.items };
      delete items[action.id];
      return { ...state, items };
    }
    case "clear":
      return { ...state, items: {}, promo: null };
    case "promo":
      return { ...state, promo: action.code };
    case "fav":
      return {
        ...state,
        favs: state.favs.includes(action.id) ? state.favs.filter((f) => f !== action.id) : [...state.favs, action.id],
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const showToast = useCallback((payload) => {
    clearTimeout(toastTimer.current);
    setToast({ ...payload, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const add = useCallback(
    (id, qty = 1, silent = false) => {
      dispatch({ type: "add", id, qty });
      if (!silent) showToast({ kind: "cart", item: menu.find((m) => m.id === id), qty });
    },
    [showToast]
  );

  const totals = useMemo(() => {
    const lines = Object.entries(state.items)
      .map(([id, qty]) => ({ item: menu.find((m) => m.id === Number(id)), qty }))
      .filter((l) => l.item);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
    const promo = state.promo ? promos[state.promo] : null;
    const promoValid = promo && subtotal >= promo.min;

    let discount = 0;
    if (promoValid && promo.type === "percent") discount = Math.min((subtotal * promo.value) / 100, promo.cap);
    if (promoValid && promo.type === "flat") discount = promo.value;

    const freeShip = subtotal >= FREE_DELIVERY_AT || (promoValid && promo.type === "ship");
    const delivery = count === 0 || freeShip ? 0 : DELIVERY_FEE;
    const packaging = count ? PACKAGING_FEE : 0;
    const tax = Math.max(subtotal - discount, 0) * TAX_RATE;
    const total = Math.max(subtotal - discount + delivery + packaging + tax, 0);

    return { lines, count, subtotal, discount, delivery, packaging, tax, total, promo, promoValid };
  }, [state.items, state.promo]);

  const applyPromo = useCallback(
    (raw) => {
      const code = (raw || "").trim().toUpperCase();
      const promo = promos[code];
      if (!promo) return { ok: false, message: "That code doesn't exist. Try CRAVE20." };
      if (totals.subtotal < promo.min) return { ok: false, message: `Add items worth ₹${promo.min - totals.subtotal} more to use ${code}.` };
      dispatch({ type: "promo", code });
      return { ok: true, message: `${code} applied — ${promo.label}!` };
    },
    [totals.subtotal]
  );

  const value = useMemo(
    () => ({
      ...totals,
      items: state.items,
      favs: state.favs,
      qtyOf: (id) => state.items[id] || 0,
      isFav: (id) => state.favs.includes(id),
      add,
      dec: (id) => dispatch({ type: "dec", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      toggleFav: (id) => dispatch({ type: "fav", id }),
      applyPromo,
      removePromo: () => dispatch({ type: "promo", code: null }),
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      toast,
      showToast,
      dismissToast: () => setToast(null),
    }),
    [totals, state, add, applyPromo, isOpen, toast, showToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
