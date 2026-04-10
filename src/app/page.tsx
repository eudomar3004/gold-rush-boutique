"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product, CartItem } from "@/types";
import { getProducts } from "@/lib/supabase";

import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

type Category = "todos" | "nuevos" | "caballeros" | "damas" | "unisex";

export default function HomePage() {
  const [products, setProducts]       = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [category, setCategory]       = useState<Category>("todos");
  const [search, setSearch]           = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen]       = useState(false);
  const [cartItems, setCartItems]     = useState<CartItem[]>([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts(
        category === "todos" ? undefined : category,
        search || undefined
      );
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Cart helpers
  function addToCart(product: Product, size: "30ml" | "50ml" = "30ml") {
    const price = size === "30ml" ? product.price_30ml : product.price_50ml;
    if (!price) return;
    setCartItems((prev) => [
      ...prev,
      { product, size, quantity: 1, unit_price: price },
    ]);
    setCartOpen(true);
  }

  function removeFromCart(index: number) {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Hero tagline ───────────────────────────────────── */}
        <section className="py-10 sm:py-14 text-center">
          {/* Eyebrow — aparece primero */}
          <p className="animate-hero-title text-xs font-semibold uppercase tracking-[0.25em] text-gold-600 mb-4">
            Boutique de Fragancias · Santiago, RD
          </p>

          {/* Título principal con animación de entrada */}
          <h1 className="animate-hero-title font-serif text-3xl sm:text-5xl text-charcoal leading-tight max-w-2xl mx-auto">
            El lujo que se lleva
            <br />
            {/* Palabra principal: gradiente dorado oscuro → brillante + subrayado decorativo */}
            <span className="relative inline-block mt-1">
              <span className="italic text-gradient-gold">
                en la piel.
              </span>
              {/* Subrayado fino dorado — centrado, no llega a los bordes */}
              <span
                className="animate-underline-grow absolute left-[10%] right-[10%] bottom-0
                           h-[2px] rounded-full origin-left"
                style={{
                  background: "linear-gradient(90deg, transparent, #F5B800 30%, #FCD02E 70%, transparent)",
                }}
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Subtítulo — entra con retraso */}
          <p className="animate-hero-sub mt-6 text-charcoal-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Fragancias exclusivas curadas para quienes aprecian
            <br className="hidden sm:block" /> los matices del perfume como arte.
          </p>
        </section>

        {/* ── Search bar ────────────────────────────────────── */}
        <div className="relative max-w-lg mx-auto mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-charcoal-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            placeholder="Buscar fragancia..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input-luxury pl-10 pr-10"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute inset-y-0 right-4 flex items-center text-charcoal-muted hover:text-charcoal"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Category tabs ─────────────────────────────────── */}
        <div className="mb-8">
          <CategoryTabs
            active={category}
            onChange={(cat) => {
              setCategory(cat);
              setSearchInput("");
            }}
          />
        </div>

        {/* ── Product count ─────────────────────────────────── */}
        {!loading && (
          <p className="text-xs text-charcoal-muted mb-5 uppercase tracking-widest font-medium">
            {products.length} {products.length === 1 ? "fragancia" : "fragancias"}
            {search && ` para "${search}"`}
          </p>
        )}

        {/* ── Product grid ──────────────────────────────────── */}
        <ProductGrid
          products={products}
          loading={loading}
          onProductClick={setSelectedProduct}
          onAddToCart={(product) => addToCart(product)}
        />

        {/* ── Brand strip ───────────────────────────────────── */}
        {!loading && products.length > 0 && (
          <section className="mt-20 py-12 border-t border-b border-gray-100 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-charcoal-muted mb-3 font-medium">
              Nuestra promesa
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-6">
              {[
                { icon: "✦", label: "Originales garantizados" },
                { icon: "◎", label: "Entrega en Santiago" },
                { icon: "♦", label: "Selección curada" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span className="text-gold-500 text-xl">{icon}</span>
                  <span className="text-xs text-charcoal-muted font-medium">{label}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* ── Modals & Drawers ──────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onClear={() => setCartItems([])}
      />

      <WhatsAppButton
        phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "18091234567"}
      />
    </>
  );
}
