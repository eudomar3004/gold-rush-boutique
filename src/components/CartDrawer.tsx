"use client";

import { useState } from "react";
import type { CartItem } from "@/types";
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

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
  onClear: () => void;
}

export default function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const total = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  async function handleCheckout() {
    if (!name.trim() || !phone.trim()) {
      setError("Por favor completa tu nombre y teléfono.");
      return;
    }
    if (items.length === 0) return;

    setSubmitting(true);
    setError("");

    try {
      // Save each item as a separate order row
      for (const item of items) {
        await createOrder({
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
          product_id: item.product.id,
          product_name: item.product.name,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          size: item.size,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total: item.unit_price * item.quantity,
        });
      }

      // Build WhatsApp summary
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "18091234567";
      const lines = items
        .map((i) => `• ${i.product.name} (${i.size}) × ${i.quantity} — ${formatPrice(i.unit_price * i.quantity)}`)
        .join("\n");
      const msg = `¡Hola Gold Rush! 👋\n\nMi pedido:\n\n${lines}\n\n💰 Total: ${formatPrice(total)}\n\n👤 ${name.trim()}\n📞 ${phone.trim()}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");

      setSuccess(true);
      onClear();
    } catch {
      setError("Error al guardar el pedido. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 modal-backdrop animate-fade-in" />

      {/* Drawer */}
      <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-serif text-xl text-charcoal">Mi Pedido</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 text-charcoal-muted transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal">¡Pedido enviado!</h3>
              <p className="text-sm text-charcoal-muted">Revisa WhatsApp para confirmar tu pedido.</p>
              <button onClick={onClose} className="btn-gold">Cerrar</button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-50">
              <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-serif text-charcoal">Tu pedido está vacío</p>
            </div>
          ) : (
            <>
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-gray-50 rounded-2xl p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{item.product.name}</p>
                    <p className="text-xs text-charcoal-muted mt-0.5">{item.size} · {formatPrice(item.unit_price)}</p>
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <span className="text-sm text-charcoal-muted font-medium">Total estimado</span>
                <span className="price-display text-xl text-charcoal">{formatPrice(total)}</span>
              </div>

              {/* Form */}
              <div className="space-y-3 pt-2">
                <p className="text-xs text-charcoal-muted font-medium uppercase tracking-widest">
                  Tus datos
                </p>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-luxury"
                />
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-luxury"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!success && items.length > 0 && (
          <div className="p-5 border-t border-gray-100">
            <button
              onClick={handleCheckout}
              disabled={submitting}
              className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? "Enviando..." : (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Confirmar por WhatsApp
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
