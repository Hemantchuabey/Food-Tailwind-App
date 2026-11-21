import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { unsplashSet } from "../utils/format";
import { PlateFallback } from "./Vectors";

export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "(max-width: 639px) 84vw, (max-width: 1023px) 42vw, 260px",
  widths,
  q = 34,
  ...rest
}) {
  const [state, setState] = useState(priority ? "loaded" : "loading");
  const srcSet = unsplashSet(src, widths, q);

  return (
    <div className={`relative overflow-hidden bg-cream-100 ${className}`}>
      {state !== "error" && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
          {...rest}
        />
      )}
      {state === "loading" && <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-cream-200" />}
      {state === "error" && (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-saffron-100 to-tomato-100">
          <PlateFallback />
        </div>
      )}
    </div>
  );
}

export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function useLockBody(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

export function useEscape(active, cb) {
  useEffect(() => {
    if (!active) return;
    const on = (e) => e.key === "Escape" && cb();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [active, cb]);
}

export function Stars({ value = 5 }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex select-none text-sm leading-none tracking-tight text-saffron" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(full)}
      {full < 5 && <span className="text-ink/20">{"★".repeat(5 - full)}</span>}
    </span>
  );
}
