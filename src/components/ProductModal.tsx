"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import OlfactoryNotes from "./OlfactoryNotes";
import { createOrder } from "@/lib/supabase";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("DOP", "RD$");
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80&auto=format&fit=crop";

type Step = "detail" | "order" | "success";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: "30ml" | "50ml") => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [step, setStep] = useState<Step>("detail");
  const [selectedSize, setSelectedSize] = useState<"30ml" | "50ml">("30ml");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setStep("detail");
      setName("");
      setPhone("");
      setError("");
      // Default to cheapest available size
      setSelectedSize(product.price_30ml ? "30ml" : "50ml");
    }
  }, [product]);

  // Trap ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;

  const selectedPrice =
    selectedSize === "30ml" ? product.price_30ml : product.price_50ml;

  async function handleOrder() {
    if (!name.trim() || !phone.trim()) {
      setError("Por favor completa tu nombre y teléfono.");
      return;
    }
    if (!selectedPrice) return;

    setSubmitting(true);
    setError("");

    try {
      await createOrder({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
        product_id: product!.id,
        product_name: product!.name,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        size: selectedSize,
        quantity: 1,
        unit_price: selectedPrice,
        total: selectedPrice,
        notes: "",
      });

      // Open WhatsApp after saving order
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "18091234567";
      const msg = `¡Hola Gold Rush! 👋\n\nQuiero hacer un pedido:\n\n🌟 *${product!.name}*\n📏 Tamaño: ${selectedSize}\n💰 Precio: ${formatPrice(selectedPrice)}\n\n👤 Nombre: ${name.trim()}\n📞 Teléfono: ${phone.trim()}`;
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );

      setStep("success");
    } catch {
      setError("Ocurrió un error al guardar tu pedido. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleAddToCart() {
    onAddToCart(product!, selectedSize);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 modal-backdrop animate-fade-in" />

      {/* Panel */}
      <div className="relative bg-white w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 text-charcoal hover:bg-gray-100 transition-colors shadow-sm"
          aria-label="Cerrar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── STEP: DETAIL ─────────────────────────────────── */}
        {step === "detail" && (
          <div className="overflow-y-auto">
            {/* Hero image — object-contain para mostrar la botella completa */}
            <div className="relative aspect-square sm:aspect-[4/3] bg-gray-50">
              <Image
                src={product.image_url || PLACEHOLDER_IMAGE}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Header */}
              <div>
                {product.brand && (
                  <p className="text-xs text-gold-600 font-semibold uppercase tracking-widest mb-1">
                    {product.brand}
                  </p>
                )}
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal leading-tight">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="text-charcoal-muted text-sm mt-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Olfactory notes */}
              {product.olfactory_notes?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-muted mb-2">
                    Notas Olfativas
                  </p>
                  <OlfactoryNotes notes={product.olfactory_notes} />
                </div>
              )}

              {/* Size selector */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-muted mb-3">
                  Presentación
                </p>
                <div className="flex gap-3">
                  {product.price_30ml && (
                    <SizeOption
                      size="30ml"
                      price={product.price_30ml}
                      selected={selectedSize === "30ml"}
                      onSelect={() => setSelectedSize("30ml")}
                    />
                  )}
                  {product.price_50ml && (
                    <SizeOption
                      size="50ml"
                      price={product.price_50ml}
                      selected={selectedSize === "50ml"}
                      onSelect={() => setSelectedSize("50ml")}
                    />
                  )}
                </div>
              </div>

              {/* Total price */}
              {selectedPrice && (
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
                  <span className="text-sm text-charcoal-muted font-medium">Total</span>
                  <span className="price-display text-2xl text-charcoal">
                    {formatPrice(selectedPrice)}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-1 pb-2">
                {/* WhatsApp directo — botón principal prominente */}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "18091234567"}?text=${encodeURIComponent(
                    `¡Hola Gold Rush! 👋 Me interesa:\n\n🌟 *${product.name}*${product.brand ? ` — ${product.brand}` : ""}\n📏 Tamaño: ${selectedSize}\n💰 Precio: ${selectedPrice ? formatPrice(selectedPrice) : ""}\n\n¿Está disponible?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600
                             text-white font-bold py-3.5 px-6 rounded-full transition-all
                             duration-200 active:scale-95 shadow-sm text-sm"
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Pedir por WhatsApp
                </a>

                {/* Secundario: añadir a pedido múltiple */}
                <button
                  onClick={handleAddToCart}
                  className="btn-outline text-center text-sm"
                >
                  + Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP: ORDER FORM ─────────────────────────────── */}
        {step === "order" && (
          <div className="overflow-y-auto">
            <div className="p-6">
              {/* Back */}
              <button
                onClick={() => setStep("detail")}
                className="flex items-center gap-1.5 text-sm text-charcoal-muted hover:text-charcoal mb-6 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>

              <h2 className="font-serif text-2xl text-charcoal mb-1">Confirmar pedido</h2>
              <p className="text-sm text-charcoal-muted mb-6">
                Completa tus datos y te contactaremos por WhatsApp.
              </p>

              {/* Order summary */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-1">
                <p className="font-serif text-base text-charcoal">{product.name}</p>
                <p className="text-sm text-charcoal-muted">
                  {selectedSize}{" "}
                  {selectedPrice && (
                    <span className="text-charcoal font-semibold ml-1">
                      — {formatPrice(selectedPrice)}
                    </span>
                  )}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. María García"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-luxury"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 809-555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-luxury"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleOrder}
                  disabled={submitting}
                  className="btn-gold w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Confirmar por WhatsApp
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP: SUCCESS ─────────────────────────────────── */}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center p-10 text-center gap-5 min-h-[350px]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">¡Pedido registrado!</h2>
              <p className="text-charcoal-muted text-sm">
                Te hemos redirigido a WhatsApp para coordinar la entrega. Nuestro equipo
                te atenderá en breve.
              </p>
            </div>
            <button onClick={onClose} className="btn-gold">
              Seguir explorando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SizeOption ─────────────────────────────────────────────

interface SizeOptionProps {
  size: "30ml" | "50ml";
  price: number;
  selected: boolean;
  onSelect: () => void;
}

function SizeOption({ size, price, selected, onSelect }: SizeOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        flex-1 py-3 px-4 rounded-2xl border-2 text-center transition-all duration-200
        ${
          selected
            ? "border-charcoal bg-charcoal text-white"
            : "border-gray-200 bg-white text-charcoal hover:border-gold-400"
        }
      `}
    >
      <p className="font-semibold text-sm">{size}</p>
      <p
        className={`text-xs mt-0.5 ${selected ? "text-gold-300" : "text-charcoal-muted"}`}
      >
        {new Intl.NumberFormat("es-DO", {
          style: "currency",
          currency: "DOP",
          minimumFractionDigits: 0,
        })
          .format(price)
          .replace("DOP", "RD$")}
      </p>
    </button>
  );
}
