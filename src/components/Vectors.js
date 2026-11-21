/* Hand-crafted vector set for Crave. All icons inherit currentColor. */
import { motion } from "framer-motion";

export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <mask id="crave-bite">
          <rect width="40" height="40" fill="#fff" />
          <circle cx="34" cy="11" r="7.5" fill="#000" />
        </mask>
      </defs>
      <circle cx="19" cy="22" r="15" fill="#FF4D2E" mask="url(#crave-bite)" />
      <path d="M19 8.5c-.2-3.6 1.8-6.3 5.6-7.2-.4 3.7-2.3 6.3-5.6 7.2z" fill="#2F5D50" />
      <circle cx="13.5" cy="20" r="1.6" fill="#FBF6EE" opacity=".9" />
    </svg>
  );
}

export function Logo({ className = "", light = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className={`font-display text-[26px] font-semibold leading-none tracking-[-0.04em] ${light ? "text-cream" : "text-ink"}`}>
        crave<span className="text-tomato">.</span>
      </span>
    </span>
  );
}

export const Leaf = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M8 56C8 28 26 8 58 6c-2 32-22 50-50 50z" fill="#2F5D50" />
    <path d="M10 54C24 40 36 28 50 16" stroke="#DDEAE5" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M22 42c4-1 9 0 13 2M30 33c3 0 7 1 10 3M20 34c0-4 1-7 3-10" stroke="#DDEAE5" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".7" />
  </svg>
);

export const Chili = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M14 14c2 10 6 22 16 32s20 12 26 10c-10-6-16-14-20-26-3-9-8-16-14-18-3-1-7-1-8 2z" fill="#FF4D2E" />
    <path d="M20 18c3 8 7 16 14 23" stroke="#FFC2B5" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".8" />
    <path d="M14 14c-2-4-1-8 2-10M14 14c-4 0-7 2-8 5" stroke="#2F5D50" strokeWidth="3.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const TomatoSlice = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="28" fill="#FF4D2E" />
    <circle cx="32" cy="32" r="22" fill="#FF7A5F" />
    <path d="M32 32V12M32 32l17 10M32 32L15 42" stroke="#FF4D2E" strokeWidth="4" strokeLinecap="round" />
    {[[24, 22], [40, 22], [22, 34], [42, 34], [32, 46], [26, 44], [38, 44]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx="2.4" ry="3.4" fill="#FFE6DF" />
    ))}
    <circle cx="32" cy="32" r="4" fill="#FFC2B5" />
  </svg>
);

export const Sparkle = ({ className, style }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
    <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" fill="currentColor" />
  </svg>
);

export const BurgerPill = ({ className = "h-full w-full" }) => (
  <svg viewBox="0 0 180 76" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="bp-glow" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#FFB224" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#1A1410" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bp-bun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9B84A" />
        <stop offset="100%" stopColor="#D9821B" />
      </linearGradient>
    </defs>
    <rect width="180" height="76" fill="#1A1410" />
    <ellipse cx="90" cy="40" rx="68" ry="34" fill="url(#bp-glow)" />
    {/* left & right sizzle sparkles */}
    <path d="M26 22c.6 3.8 3.2 6.4 7 7-3.8.6-6.4 3.2-7 7-.6-3.8-3.2-6.4-7-7 3.8-.6 6.4-3.2 7-7z" fill="#FFB224" />
    <circle cx="36" cy="52" r="2.2" fill="#FF4D2E" />
    <path d="M154 42c.5 3.2 2.6 5.3 5.8 5.8-3.2.5-5.3 2.6-5.8 5.8-.5-3.2-2.6-5.3-5.8-5.8 3.2-.5 5.3-2.6 5.8-5.8z" fill="#FF4D2E" />
    <circle cx="145" cy="22" r="2.4" fill="#FFB224" />
    {/* bottom bun */}
    <path d="M56 56h68a4 4 0 014 4c0 4.4-5.4 7.5-12 7.5H64c-6.6 0-12-3.1-12-7.5a4 4 0 014-4z" fill="url(#bp-bun)" />
    {/* smash patty */}
    <rect x="51" y="45" width="78" height="11" rx="5.5" fill="#4E2712" />
    <path d="M55 48h70" stroke="#7A4222" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    {/* melted cheddar drips */}
    <path d="M53 45h74l-5 4-9-3-11 7-12-6-12 7-10-6-9 3z" fill="#FFB224" />
    {/* tomato slice */}
    <rect x="56" y="38" width="68" height="5.5" rx="2.75" fill="#FF4D2E" />
    {/* wavy lettuce */}
    <path
      d="M50 38c3-3 7-3 10 0s7 3 10 0 7-3 10 0 7 3 10 0 7-3 10 0 7 3 10 0 7-3 10 0 7 3 10 0"
      fill="none"
      stroke="#45936C"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* top brioche dome */}
    <path d="M54 35c0-14.5 15.5-25 36-25s36 10.5 36 25H54z" fill="url(#bp-bun)" />
    <path d="M64 24c5-6 14-9.5 25-9.5" fill="none" stroke="#FFE09E" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
    {/* sesame seeds */}
    {[
      [76, 22, -18],
      [90, 19, 6],
      [104, 22, 20],
      [69, 29, -12],
      [84, 28, 8],
      [98, 29, -8],
      [111, 29, 16],
    ].map(([x, y, r], i) => (
      <ellipse key={i} cx={x} cy={y} rx="2.6" ry="1.3" transform={`rotate(${r} ${x} ${y})`} fill="#FBF6EE" />
    ))}
  </svg>
);

export const Squiggle = ({ className, delay = 0.6 }) => (
  <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={className} aria-hidden="true">
    <motion.path
      d="M3 15C40 5 60 21 96 12s58-10 92 1 64 6 109-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
    />
  </svg>
);

export const Arrow = ({ className }) => (
  <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
    <path d="M6 10c30 2 70 12 90 52" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 7" />
    <path d="M84 56l13 9 3-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CircleText({ text, className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="crave-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <text className="fill-current font-sans text-[13.5px] font-extrabold uppercase" letterSpacing="5.2">
        <textPath href="#crave-circle">{text}</textPath>
      </text>
    </svg>
  );
}

/* Indian food-safety style veg / non-veg marker */
export const VegMark = ({ veg, className = "" }) => (
  <span
    title={veg ? "Vegetarian" : "Non-vegetarian"}
    className={`inline-grid h-[18px] w-[18px] place-items-center rounded-[4px] border-[1.5px] bg-white ${
      veg ? "border-basil" : "border-tomato-700"
    } ${className}`}
  >
    {veg ? (
      <span className="h-2 w-2 rounded-full bg-basil" />
    ) : (
      <span className="h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-tomato-700" />
    )}
  </span>
);

/* ---------- Category icons ---------- */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export const CategoryIcon = ({ id, className = "h-5 w-5" }) => {
  const icons = {
    all: (
      <>
        <circle cx="12" cy="13" r="8" {...S} />
        <circle cx="12" cy="13" r="4.5" {...S} />
        <path d="M5 3v4M3.5 3v3a1.5 1.5 0 003 0V3M19.5 3c-1.5 1-2 3-2 5h2V3z" {...S} />
      </>
    ),
    burger: (
      <>
        <path d="M4 10a8 6 0 0116 0z" {...S} />
        <path d="M3 13.5h18M4 17h16a3 3 0 01-3 3H7a3 3 0 01-3-3z" {...S} />
        <path d="M9 7.5h.01M12 6.5h.01M15 7.5h.01" {...S} strokeWidth="2.4" />
      </>
    ),
    pizza: (
      <>
        <path d="M12 21L3.5 6.5a14 14 0 0117 0z" {...S} />
        <path d="M5.2 9.4a11 11 0 0113.6 0" {...S} />
        <circle cx="10" cy="12" r="1.2" {...S} />
        <circle cx="14" cy="14.5" r="1.2" {...S} />
      </>
    ),
    chicken: (
      <>
        <path d="M14.5 3.5a6 6 0 016 6c0 4-4 6-7 6l-3 3" {...S} />
        <path d="M14.5 3.5c-3.3 0-6 2.7-6 6 0 1.2.3 2.3.9 3.2L7 15" {...S} />
        <path d="M7 15a2 2 0 10-2.5 2.5A2 2 0 107 20a2 2 0 002.5-2.5L10.5 18.5" {...S} />
      </>
    ),
    salad: (
      <>
        <path d="M3 12h18a9 9 0 01-18 0z" {...S} />
        <path d="M8 12c-1-3 0-6 3-7 1 3 0 5-3 7zM13 12c0-3 2-5 5-5-.5 3-2 4.5-5 5z" {...S} />
      </>
    ),
    dessert: (
      <>
        <circle cx="12" cy="12" r="8.5" {...S} />
        <circle cx="12" cy="12" r="3" {...S} />
        <path d="M8 6.5l1 1M16 7l-.8 1.2M6.5 13.5l1.3-.3M17.5 14l-1.2-.4M10.5 17.5l.5-1.1" {...S} />
      </>
    ),
    drink: (
      <>
        <path d="M6 8h12l-1.5 12.5a1.5 1.5 0 01-1.5 1.5H9a1.5 1.5 0 01-1.5-1.5z" {...S} />
        <path d="M5 8h14M12 8l2-6h3" {...S} />
        <path d="M7 13c2 1 4 1 5 0s3-1 5 0" {...S} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[id] || icons.all}
    </svg>
  );
};

/* ---------- Step illustrations ---------- */
export const PhoneIllo = () => (
  <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
    <circle cx="100" cy="86" r="62" fill="#FFF1D6" />
    <rect x="66" y="22" width="68" height="124" rx="14" fill="#1A1410" />
    <rect x="71" y="30" width="58" height="108" rx="9" fill="#FBF6EE" />
    <rect x="78" y="40" width="44" height="26" rx="6" fill="#FF4D2E" />
    <circle cx="92" cy="53" r="7" fill="#FFB224" />
    <rect x="78" y="72" width="30" height="5" rx="2.5" fill="#1A1410" />
    <rect x="78" y="81" width="20" height="4" rx="2" fill="#A89C92" />
    <rect x="78" y="94" width="44" height="18" rx="5" fill="#DDEAE5" />
    <rect x="78" y="118" width="44" height="12" rx="6" fill="#1A1410" />
    <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
      <circle cx="146" cy="44" r="14" fill="#FF4D2E" />
      <path d="M140 44l4 4 8-8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
    <path d="M40 120c6-8 14-10 20-6" stroke="#2F5D50" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="44" cy="58" r="4" fill="#FFB224" />
  </svg>
);

export const PanIllo = () => (
  <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
    <circle cx="100" cy="86" r="62" fill="#FFE6DF" />
    <motion.g animate={{ y: [0, -14, 0], rotate: [0, -8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "100px", originY: "90px" }}>
      <circle cx="84" cy="64" r="8" fill="#FFB224" />
      <path d="M104 54c4-6 12-6 14 0-4 4-10 4-14 0z" fill="#2F5D50" />
      <circle cx="112" cy="72" r="5" fill="#FF4D2E" />
    </motion.g>
    <ellipse cx="96" cy="104" rx="48" ry="14" fill="#1A1410" />
    <ellipse cx="96" cy="100" rx="42" ry="10" fill="#3A302A" />
    <path d="M140 102l44-10" stroke="#1A1410" strokeWidth="8" strokeLinecap="round" />
    {[70, 96, 122].map((x, i) => (
      <motion.path
        key={x}
        d={`M${x} 140c-6-6-2-12 0-16 2 4 6 10 0 16z`}
        fill="#FF4D2E"
        animate={{ scaleY: [1, 1.25, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        style={{ originY: "140px" }}
      />
    ))}
  </svg>
);

export const ScooterIllo = ({ className = "h-full w-full" }) => (
  <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
    <circle cx="100" cy="86" r="62" fill="#DDEAE5" />
    {[30, 42, 54].map((y, i) => (
      <motion.path key={y} d={`M18 ${y + 60}h28`} stroke="#2F5D50" strokeWidth="3" strokeLinecap="round" animate={{ x: [0, -10, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
    ))}
    <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 0.4, repeat: Infinity }}>
      <rect x="58" y="62" width="40" height="34" rx="6" fill="#FF4D2E" />
      <path d="M66 72h24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 104h70l14-30h12" stroke="#1A1410" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 104c0-12 8-18 20-18h12" fill="#1A1410" />
      <circle cx="122" cy="58" r="10" fill="#1A1410" />
      <path d="M116 68l-4 22h18l6-14" fill="#FFB224" />
    </motion.g>
    <circle cx="70" cy="114" r="12" fill="#1A1410" />
    <circle cx="70" cy="114" r="4.5" fill="#FBF6EE" />
    <circle cx="146" cy="114" r="12" fill="#1A1410" />
    <circle cx="146" cy="114" r="4.5" fill="#FBF6EE" />
  </svg>
);

export const EmptyBagIllo = ({ className = "h-40 w-40" }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <circle cx="100" cy="104" r="78" fill="#F6EEDF" />
    <motion.g animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "100px", originY: "160px" }}>
      <path d="M52 76h96l-8 92H60z" fill="#FF4D2E" />
      <path d="M52 76h96l-3 30H55z" fill="#E63B1D" />
      <path d="M78 84V66a22 22 0 0144 0v18" fill="none" stroke="#1A1410" strokeWidth="6" strokeLinecap="round" />
      <circle cx="84" cy="126" r="5" fill="#1A1410" />
      <circle cx="116" cy="126" r="5" fill="#1A1410" />
      <path d="M88 146c8-6 16-6 24 0" fill="none" stroke="#1A1410" strokeWidth="5" strokeLinecap="round" />
    </motion.g>
    <path d="M160 46l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#FFB224" />
    <path d="M40 58l2.5 6 6 2.5-6 2.5L40 75l-2.5-6-6-2.5 6-2.5z" fill="#2F5D50" />
  </svg>
);

export const PlateFallback = () => (
  <svg viewBox="0 0 100 100" className="h-1/2 w-1/2 text-ink/20" aria-hidden="true">
    <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M12 18v20M8 18v12a4 4 0 008 0V18M88 18c-5 3-6 9-6 16h6z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
