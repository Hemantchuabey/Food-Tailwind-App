export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const img = (id, w = 280, q = 34) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=webp&w=${w}&q=${q}`;

export function unsplashSet(src, widths = [220, 280], q = 34) {
  if (!src || !src.includes("images.unsplash.com")) return undefined;
  const base = src.split("?")[0];
  return widths.map((w) => `${base}?auto=format&fit=crop&fm=webp&w=${w}&q=${q} ${w}w`).join(", ");
}
