import { Link } from "react-router-dom";
import { FiArrowUp, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "./Icons";
import { Logo } from "./Vectors";

const cols = [
  { title: "Eat", links: [["Menu", "/#menu"], ["Offers", "/#offers"], ["How it works", "/#how"], ["Reviews", "/#reviews"]] },
  { title: "Company", links: [["About us", "/"], ["Careers", "/"], ["Kitchens", "/"], ["Press", "/"]] },
  { title: "Help", links: [["Support", "/"], ["Refunds", "/"], ["Privacy", "/"], ["Terms", "/"]] },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden rounded-t-[40px] bg-ink text-cream sm:rounded-t-[56px]">
      <div className="container-x pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-5 max-w-sm text-cream/80">
              Chef-crafted comfort food, cooked fresh and delivered hot across Bengaluru. Open daily, 11 AM till 3 AM.
            </p>
            <div className="mt-6 flex gap-2">
              {[FiInstagram, FiTwitter, FiYoutube, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  onClick={(e) => e.preventDefault()}
                  className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 transition hover:-translate-y-1 hover:bg-tomato"
                  aria-label="Social link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream/75">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to} className="text-cream/85 transition hover:text-saffron">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 py-6 text-sm text-cream/75 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Crave Foods. Designed & built by Hemant with React + Tailwind.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 font-semibold text-cream transition hover:text-saffron">
            Back to top <FiArrowUp />
          </button>
        </div>
      </div>
      <svg viewBox="0 0 1000 220" className="pointer-events-none w-full select-none" aria-hidden="true" role="presentation">
        <text
          x="500"
          y="205"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.06"
          className="font-display text-[280px] font-semibold"
          letterSpacing="-14"
        >
          crave.
        </text>
      </svg>
    </footer>
  );
}
