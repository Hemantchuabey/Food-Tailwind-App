/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FBF6EE", 100: "#F6EEDF", 200: "#EFE3CC", 300: "#E4D3B4" },
        ink: { DEFAULT: "#1A1410", 900: "#120E0B", 700: "#3A302A", 500: "#6B5F57", 300: "#A89C92", 100: "#E9E2DA" },
        tomato: { DEFAULT: "#FF4D2E", 700: "#C9300F", 600: "#E63B1D", 200: "#FFC2B5", 100: "#FFE6DF" },
        saffron: { DEFAULT: "#FFB224", 600: "#E99A0B", 100: "#FFF1D6" },
        basil: { DEFAULT: "#2F5D50", 700: "#1F4238", 100: "#DDEAE5" },
      },
      opacity: {
        15: "0.15",
        35: "0.35",
        85: "0.85",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(26,20,16,0.18)",
        card: "0 1px 0 rgba(26,20,16,0.04), 0 18px 40px -22px rgba(26,20,16,0.35)",
        lift: "0 30px 60px -25px rgba(26,20,16,0.45)",
        ring: "0 0 0 1px rgba(26,20,16,0.06)",
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.75rem" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        wiggle: { "0%,100%": { transform: "rotate(-6deg)" }, "50%": { transform: "rotate(6deg)" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-rev": "marquee-rev 42s linear infinite",
        "spin-slow": "spin 28s linear infinite",
        "spin-slower": "spin 60s linear infinite",
        float: "float 6s ease-in-out infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
