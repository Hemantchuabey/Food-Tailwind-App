import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { MobileCartBar, Toast } from "./components/Overlays";
import { useCart } from "./context/CartContext";
import Home from "./pages/Home";

const CartDrawer = lazy(() => import("./components/CartDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function LazyCartDrawer() {
  const { isOpen } = useCart();
  if (!isOpen) return null;
  return (
    <Suspense fallback={null}>
      <CartDrawer />
    </Suspense>
  );
}

export default function App() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderSuccess />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
      <LazyCartDrawer />
      <MobileCartBar />
      <Toast />
    </div>
  );
}
