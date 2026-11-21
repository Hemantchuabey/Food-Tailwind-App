const S = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const icon = (children) => ({ className = "" }) => (
  <svg {...S} className={`inline-block h-[1em] w-[1em] shrink-0 ${className}`}>
    {children}
  </svg>
);

export const FiArrowRight = icon(<><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>);
export const FiArrowLeft = icon(<><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></>);
export const FiArrowUp = icon(<><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>);
export const FiArrowUpRight = icon(<><path d="M7 17L17 7" /><path d="M7 7h10v10" /></>);
export const FiBriefcase = icon(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></>);
export const FiCheck = icon(<path d="M20 6L9 17l-5-5" />);
export const FiChevronDown = icon(<path d="M6 9l6 6 6-6" />);
export const FiClock = icon(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>);
export const FiCopy = icon(<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>);
export const FiCreditCard = icon(<><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></>);
export const FiFacebook = icon(<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />);
export const FiHeart = icon(<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />);
export const FiHome = icon(<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></>);
export const FiInfo = icon(<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>);
export const FiInstagram = icon(<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" /></>);
export const FiLock = icon(<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>);
export const FiMapPin = icon(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>);
export const FiMenu = icon(<path d="M3 12h18M3 6h18M3 18h18" />);
export const FiMinus = icon(<path d="M5 12h14" />);
export const FiPackage = icon(<><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></>);
export const FiPhone = icon(<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />);
export const FiPlus = icon(<path d="M12 5v14M5 12h14" />);
export const FiSearch = icon(<><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>);
export const FiShoppingBag = icon(<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 01-8 0" /></>);
export const FiSmartphone = icon(<><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></>);
export const FiStar = icon(<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />);
export const FiTag = icon(<><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><path d="M7 7h.01" /></>);
export const FiTrash2 = icon(<><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" /></>);
export const FiTruck = icon(<><rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>);
export const FiTwitter = icon(<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />);
export const FiUser = icon(<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>);
export const FiX = icon(<path d="M18 6L6 18M6 6l12 12" />);
export const FiYoutube = icon(<><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" /><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" /></>);
export const FiZap = icon(<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />);
