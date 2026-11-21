import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiCreditCard,
  FiHome,
  FiLock,
  FiMapPin,
  FiSmartphone,
  FiUser,
} from "../components/Icons";
import { useCart } from "../context/CartContext";
import { Bill, FreeDeliveryMeter, PromoBox } from "../components/CartDrawer";
import { SmartImage } from "../components/ui";
import { EmptyBagIllo, LogoMark } from "../components/Vectors";
import { cx, inr } from "../utils/format";

const ease = [0.22, 1, 0.36, 1];

/* ---------- small building blocks ---------- */
function Field({ label, error, prefix, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="relative block">
        {prefix && <span className="pointer-events-none absolute left-4 top-[25px] z-10 text-[15px] font-semibold text-ink-500">{prefix}</span>}
        <input {...props} placeholder=" " className={cx("field peer", prefix && "pl-14", error && "!border-tomato focus:!ring-tomato/10")} />
        <span className={cx("pointer-events-none absolute top-2 text-[11px] font-bold uppercase tracking-wider text-ink-500 transition-all peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-ink-500", prefix ? "left-14" : "left-4")}>
          {label}
        </span>
      </label>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 pl-1 text-xs font-semibold text-tomato-700">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Choice({ active, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "relative rounded-2xl border-2 text-left transition-all",
        active ? "border-ink bg-white shadow-card" : "border-ink/10 bg-white/50 hover:border-ink/30",
        className
      )}
    >
      {children}
      {active && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-cream">
          <FiCheck />
        </motion.span>
      )}
    </button>
  );
}

function Step({ n, title, icon: Icon, active, done, summary, onEdit, children }) {
  return (
    <section className={cx("rounded-[32px] bg-white/70 ring-1 transition-all", active ? "bg-white shadow-card ring-ink/10" : "ring-ink/5")}>
      <header className="flex items-center gap-4 p-5 sm:p-7">
        <span
          className={cx(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-extrabold transition-colors",
            done ? "bg-basil text-cream" : active ? "bg-ink text-cream" : "bg-cream-100 text-ink-500"
          )}
        >
          {done ? <FiCheck className="text-lg" /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className={cx("flex items-center gap-2 font-display text-2xl font-medium tracking-tight sm:text-[28px]", !active && !done && "text-ink-300")}>
            {title}
            <Icon className="hidden text-lg text-ink-300 sm:block" />
          </h2>
          {done && !active && <p className="truncate text-sm text-ink-500">{summary}</p>}
        </div>
        {done && !active && (
          <button onClick={onEdit} className="rounded-full px-4 py-2 text-sm font-bold text-ink underline-offset-4 hover:bg-cream-100">
            Edit
          </button>
        )}
      </header>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
            <div className="px-5 pb-6 sm:px-7 sm:pb-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CardPreview({ card, flipped }) {
  const brand = card.number.startsWith("4") ? "VISA" : card.number.startsWith("5") ? "Mastercard" : card.number.startsWith("6") ? "RuPay" : "";
  const num = (card.number.replace(/\s/g, "") + "•".repeat(16)).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  return (
    <div className="mx-auto w-full max-w-[360px] [perspective:1400px]">
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease }} style={{ transformStyle: "preserve-3d" }} className="relative aspect-[1.586/1] w-full">
        <div className="grain absolute inset-0 overflow-hidden rounded-[24px] bg-gradient-to-br from-ink via-ink-700 to-tomato-700 p-6 text-cream shadow-lift [backface-visibility:hidden]">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-tomato/40 blur-2xl" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between">
              <svg viewBox="0 0 48 36" className="h-9 w-12" aria-hidden="true">
                <rect width="48" height="36" rx="7" fill="#FFB224" />
                <path d="M0 12h16v12H0M48 12H32v12h16M16 0v36M32 0v36M16 18h16" stroke="#E99A0B" strokeWidth="1.6" fill="none" />
              </svg>
              <span className="font-display text-xl italic">{brand || <LogoMark className="h-7 w-7" />}</span>
            </div>
            <p className="mt-auto font-mono text-[19px] tracking-[0.14em] sm:text-[22px]">{num}</p>
            <div className="mt-4 flex justify-between text-xs">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-cream/50">Card holder</p>
                <p className="mt-0.5 max-w-[180px] truncate font-semibold uppercase tracking-wider">{card.name || "Your name"}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-widest text-cream/50">Expires</p>
                <p className="mt-0.5 font-mono font-semibold">{card.expiry || "MM/YY"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-gradient-to-br from-ink-700 to-ink shadow-lift [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="mt-7 h-11 bg-ink-900" />
          <div className="mx-6 mt-5 flex h-10 items-center justify-end rounded-md bg-cream px-3 font-mono text-ink">{card.cvv ? card.cvv.replace(/./g, "•") : "CVV"}</div>
          <p className="mx-6 mt-4 text-[10px] leading-relaxed text-cream/40">This is a demo checkout. No real payment will be processed — please don't enter real card details.</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- validation ---------- */
const validators = {
  contact: (d) => ({
    name: d.name.trim().length < 2 && "Please tell us your name",
    phone: !/^[6-9]\d{9}$/.test(d.phone) && "Enter a valid 10-digit mobile number",
    email: d.email && !/^\S+@\S+\.\S+$/.test(d.email) && "That email doesn't look right",
  }),
  address: (d) => ({
    house: !d.house.trim() && "Flat / house number is required",
    area: !d.area.trim() && "Street or area is required",
    city: !d.city.trim() && "City is required",
    pincode: !/^\d{6}$/.test(d.pincode) && "Enter a 6-digit pincode",
  }),
  payment: (d) => {
    if (d.method === "upi") return { upi: !/^[\w.-]{2,}@[a-z]{2,}$/i.test(d.upi) && "Enter a valid UPI ID, e.g. name@okaxis" };
    if (d.method === "card") {
      const [mm, yy] = d.expiry.split("/");
      return {
        number: d.number.replace(/\s/g, "").length !== 16 && "Card number must be 16 digits",
        cardName: d.cardName.trim().length < 2 && "Name on card is required",
        expiry: (!(Number(mm) >= 1 && Number(mm) <= 12) || !yy || yy.length !== 2) && "Use MM/YY",
        cvv: !/^\d{3}$/.test(d.cvv) && "3 digits",
      };
    }
    return {};
  },
};
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v));

const slots = ["12:30 – 1:00 PM", "1:00 – 1:30 PM", "7:30 – 8:00 PM", "8:00 – 8:30 PM", "9:00 – 9:30 PM"];
const notesList = ["Leave at door", "Don't ring the bell", "Avoid calling", "Pet at home 🐶"];
const tips = [0, 20, 30, 50];

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [cvvFocus, setCvvFocus] = useState(false);
  const [tip, setTip] = useState(20);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    label: "Home",
    house: "",
    area: "",
    landmark: "",
    city: "Bengaluru",
    pincode: "",
    when: "asap",
    slot: slots[2],
    notes: [],
    method: "upi",
    upi: "",
    number: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const set = (k) => (e) => {
    let v = e.target.value;
    if (k === "phone") v = v.replace(/\D/g, "").slice(0, 10);
    if (k === "pincode") v = v.replace(/\D/g, "").slice(0, 6);
    if (k === "cvv") v = v.replace(/\D/g, "").slice(0, 3);
    if (k === "number") v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (k === "expiry") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    }
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const grand = cart.total + tip;
  const order = ["contact", "address", "payment"];

  const next = () => {
    const errs = clean(validators[order[step]](data));
    setErrors(errs);
    if (Object.keys(errs).length) return false;
    setStep((s) => s + 1);
    return true;
  };

  const placeOrder = () => {
    const errs = clean(validators.payment(data));
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setProcessing(true);
    const id = "CRV-" + Math.floor(1000 + Math.random() * 9000);
    const snapshot = {
      id,
      placedAt: Date.now(),
      eta: data.when === "asap" ? 28 : null,
      slot: data.when === "asap" ? null : data.slot,
      customer: { name: data.name, phone: data.phone, email: data.email },
      address: { label: data.label, line: [data.house, data.area, data.landmark, data.city].filter(Boolean).join(", "), pincode: data.pincode },
      notes: data.notes,
      payment: data.method === "upi" ? `UPI · ${data.upi}` : data.method === "card" ? `Card ending ${data.number.slice(-4)}` : "Cash on delivery",
      lines: cart.lines.map(({ item, qty }) => ({ id: item.id, name: item.name, price: item.price, image: item.image, veg: item.veg, qty })),
      totals: { subtotal: cart.subtotal, discount: cart.discount, delivery: cart.delivery, packaging: cart.packaging, tax: cart.tax, tip, total: grand },
    };
    setTimeout(() => {
      localStorage.setItem("crave.lastOrder", JSON.stringify(snapshot));
      cart.clear();
      navigate(`/order/${id}`, { replace: true });
    }, 1800);
  };

  const summaries = useMemo(
    () => [
      `${data.name} · +91 ${data.phone}`,
      `${data.label} · ${[data.house, data.area, data.city].filter(Boolean).join(", ")} ${data.pincode}`,
      "",
    ],
    [data]
  );

  if (cart.count === 0 && !processing) {
    return (
      <main className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
        <EmptyBagIllo className="h-56 w-56" />
        <h1 className="mt-4 font-display text-5xl font-medium tracking-tight">Nothing to check out… yet</h1>
        <p className="mt-3 max-w-md text-ink-500">Your bag is empty. Add a few favourites from the menu and come right back.</p>
        <Link to="/#menu" className="btn-tomato mt-8 h-14 px-8">
          Explore the menu
        </Link>
      </main>
    );
  }

  const OrderSummary = (
    <div className="space-y-4">
      <ul className="space-y-3">
        {cart.lines.map(({ item, qty }) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative">
              <SmartImage src={item.image} alt={item.name} className="h-14 w-14 rounded-xl" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-ink px-1 text-[10px] font-extrabold text-cream">{qty}</span>
            </div>
            <p className="flex-1 text-sm font-semibold leading-tight">{item.name}</p>
            <p className="text-sm font-bold tabular-nums">{inr(item.price * qty)}</p>
          </li>
        ))}
      </ul>
      <FreeDeliveryMeter subtotal={cart.subtotal} />
      <PromoBox />
      <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
        <Bill compact />
        <div className="mt-3 flex justify-between border-t border-dashed border-ink/15 pt-3 text-sm text-ink-700">
          <span>Rider tip</span>
          <span className="font-semibold">{inr(tip)}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="font-bold">Grand total</span>
          <span className="font-display text-4xl font-medium tracking-tight">{inr(grand)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <main className="pb-20 pt-28 sm:pt-32">
      <div className="container-x">
        <Link to="/#menu" className="inline-flex items-center gap-2 text-sm font-bold text-ink-500 transition hover:text-ink">
          <FiArrowLeft /> Continue shopping
        </Link>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h1 className="font-display text-6xl font-medium leading-none tracking-[-0.04em] sm:text-7xl">
            Check<em className="text-tomato">out</em>
          </h1>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500">
            <FiLock className="text-basil" /> Guest checkout · No account needed
          </p>
        </div>

        {/* progress */}
        <div className="mt-8 flex items-center gap-2">
          {["Contact", "Delivery", "Payment"].map((s, i) => (
            <div key={s} className="flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.div className="h-full rounded-full bg-ink" initial={false} animate={{ width: step > i ? "100%" : step === i ? "50%" : "0%" }} transition={{ duration: 0.6, ease }} />
              </div>
              <p className={cx("mt-2 text-xs font-bold uppercase tracking-wider", step >= i ? "text-ink" : "text-ink-300")}>{s}</p>
            </div>
          ))}
        </div>

        {/* mobile summary toggle */}
        <div className="mt-6 lg:hidden">
          <button onClick={() => setShowSummary((v) => !v)} className="flex w-full items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-ink/10">
            <span className="flex items-center gap-2 text-sm font-bold">
              Order summary · {cart.count} items <FiChevronDown className={cx("transition-transform", showSummary && "rotate-180")} />
            </span>
            <span className="font-display text-xl">{inr(grand)}</span>
          </button>
          <AnimatePresence initial={false}>
            {showSummary && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pt-4">{OrderSummary}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7 xl:col-span-8">
            {/* STEP 1 */}
            <Step n={1} title="Who's eating?" icon={FiUser} active={step === 0} done={step > 0} summary={summaries[0]} onEdit={() => setStep(0)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" value={data.name} onChange={set("name")} error={errors.name} autoComplete="name" className="sm:col-span-2" />
                <Field label="Mobile number" prefix="+91" value={data.phone} onChange={set("phone")} error={errors.phone} inputMode="numeric" autoComplete="tel-national" />
                <Field label="Email (optional, for receipt)" type="email" value={data.email} onChange={set("email")} error={errors.email} autoComplete="email" />
              </div>
              <button onClick={next} className="btn-ink mt-6 h-14 w-full px-8 sm:w-auto">
                Continue to delivery
              </button>
            </Step>

            {/* STEP 2 */}
            <Step n={2} title="Where to?" icon={FiMapPin} active={step === 1} done={step > 1} summary={summaries[1]} onEdit={() => setStep(1)}>
              <div className="flex gap-2">
                {[
                  ["Home", FiHome],
                  ["Work", FiBriefcase],
                  ["Other", FiMapPin],
                ].map(([l, Icon]) => (
                  <Choice key={l} active={data.label === l} onClick={() => setData((d) => ({ ...d, label: l }))} className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold">
                    <Icon /> {l}
                  </Choice>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Flat / house no. / floor" value={data.house} onChange={set("house")} error={errors.house} />
                <Field label="Street & area" value={data.area} onChange={set("area")} error={errors.area} autoComplete="address-line1" />
                <Field label="Landmark (optional)" value={data.landmark} onChange={set("landmark")} className="sm:col-span-2" />
                <Field label="City" value={data.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
                <Field label="Pincode" value={data.pincode} onChange={set("pincode")} error={errors.pincode} inputMode="numeric" autoComplete="postal-code" />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">When?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Choice active={data.when === "asap"} onClick={() => setData((d) => ({ ...d, when: "asap" }))} className="p-4">
                  <p className="flex items-center gap-2 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-basil opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-basil" />
                    </span>
                    As soon as possible
                  </p>
                  <p className="mt-1 text-sm text-ink-500">Arrives in 25–30 min</p>
                </Choice>
                <Choice active={data.when === "later"} onClick={() => setData((d) => ({ ...d, when: "later" }))} className="p-4">
                  <p className="flex items-center gap-2 font-bold">
                    <FiClock /> Schedule for later
                  </p>
                  <p className="mt-1 text-sm text-ink-500">Pick a 30-minute slot</p>
                </Choice>
              </div>
              <AnimatePresence initial={false}>
                {data.when === "later" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="no-scrollbar flex gap-2 overflow-x-auto pt-3">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setData((d) => ({ ...d, slot: s }))}
                          className={cx("shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition", data.slot === s ? "bg-ink text-cream" : "bg-cream-100 hover:bg-cream-200")}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">Delivery instructions</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {notesList.map((n) => {
                  const on = data.notes.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setData((d) => ({ ...d, notes: on ? d.notes.filter((x) => x !== n) : [...d.notes, n] }))}
                      className={cx("inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition", on ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink/40")}
                    >
                      {on && <FiCheck />} {n}
                    </button>
                  );
                })}
              </div>

              <button onClick={next} className="btn-ink mt-7 h-14 w-full px-8 sm:w-auto">
                Continue to payment
              </button>
            </Step>

            {/* STEP 3 */}
            <Step n={3} title="How would you like to pay?" icon={FiCreditCard} active={step === 2} done={false} onEdit={() => setStep(2)}>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["upi", "UPI", "GPay, PhonePe, Paytm", FiSmartphone],
                  ["card", "Card", "Credit or debit", FiCreditCard],
                  ["cod", "Cash", "Pay on delivery", () => <span className="text-lg">₹</span>],
                ].map(([k, l, sub, Icon]) => (
                  <Choice key={k} active={data.method === k} onClick={() => { setData((d) => ({ ...d, method: k })); setErrors({}); }} className="p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream-100 text-lg">
                      <Icon />
                    </span>
                    <p className="mt-3 font-bold">{l}</p>
                    <p className="text-xs text-ink-500">{sub}</p>
                  </Choice>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={data.method} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="mt-6">
                  {data.method === "upi" && (
                    <div>
                      <Field label="UPI ID (e.g. hemant@okaxis)" value={data.upi} onChange={set("upi")} error={errors.upi} autoCapitalize="none" />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["@okaxis", "@ybl", "@paytm", "@okhdfcbank"].map((h) => (
                          <button key={h} type="button" onClick={() => setData((d) => ({ ...d, upi: (d.upi.split("@")[0] || "you") + h }))} className="rounded-full bg-cream-100 px-3 py-1.5 text-xs font-bold hover:bg-cream-200">
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.method === "card" && (
                    <div className="grid items-center gap-6 md:grid-cols-2">
                      <CardPreview card={{ number: data.number, name: data.cardName, expiry: data.expiry, cvv: data.cvv }} flipped={cvvFocus} />
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Card number" value={data.number} onChange={set("number")} error={errors.number} inputMode="numeric" autoComplete="off" className="col-span-2" />
                        <Field label="Name on card" value={data.cardName} onChange={set("cardName")} error={errors.cardName} autoComplete="off" className="col-span-2" />
                        <Field label="MM/YY" value={data.expiry} onChange={set("expiry")} error={errors.expiry} inputMode="numeric" autoComplete="off" />
                        <Field label="CVV" value={data.cvv} onChange={set("cvv")} error={errors.cvv} inputMode="numeric" type="password" autoComplete="off" onFocus={() => setCvvFocus(true)} onBlur={() => setCvvFocus(false)} />
                      </div>
                    </div>
                  )}
                  {data.method === "cod" && (
                    <div className="flex items-center gap-4 rounded-2xl bg-saffron-100 p-4 text-sm">
                      <span className="text-3xl">💵</span>
                      <p className="text-ink-700">
                        Please keep <span className="font-extrabold text-ink">{inr(grand)}</span> handy. Our rider also accepts UPI at your door.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">Tip your rider 🛵</p>
              <p className="mt-1 text-sm text-ink-500">100% of the tip goes to the person braving traffic for you.</p>
              <div className="mt-3 flex gap-2">
                {tips.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTip(t)}
                    className={cx("relative h-12 flex-1 rounded-2xl text-sm font-bold transition", tip === t ? "bg-ink text-cream" : "bg-cream-100 hover:bg-cream-200")}
                  >
                    {t === 0 ? "No tip" : inr(t)}
                    {t === 20 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-saffron px-2 py-0.5 text-[9px] font-extrabold uppercase text-ink">Popular</span>}
                  </button>
                ))}
              </div>

              <button onClick={placeOrder} disabled={processing} className="btn-tomato mt-8 h-16 w-full justify-between px-7 text-base disabled:opacity-90">
                <span className="flex items-center gap-2">
                  {processing ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="h-5 w-5 rounded-full border-[3px] border-white/30 border-t-white" />
                      Placing your order…
                    </>
                  ) : (
                    <>
                      <FiLock /> {data.method === "cod" ? "Place order" : "Pay securely"}
                    </>
                  )}
                </span>
                <span className="font-display text-xl">{inr(grand)}</span>
              </button>
              <p className="mt-3 text-center text-xs text-ink-500">Demo store — no real payment is taken.</p>
            </Step>
          </div>

          <aside className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <div className="sticky top-28 rounded-[32px] bg-cream-100 p-6 ring-1 ring-ink/5">
              <h2 className="mb-5 font-display text-3xl font-medium tracking-tight">Your order</h2>
              {OrderSummary}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
