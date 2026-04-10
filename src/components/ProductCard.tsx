"use client";

import Image from "next/image";
import type { Product } from "@/types";
import OlfactoryNotes from "./OlfactoryNotes";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("DOP", "RD$");
}

const CATEGORY_LABELS: Record<string, string> = {
  nuevos:     "Nuevo",
  caballeros: "Caballeros",
  damas:      "Damas",
  unisex:     "Unisex",
};

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80&auto=format&fit=crop";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const displayPrice = product.price_30ml ?? product.price_50ml ?? 0;

  return (
    <article
      className="card-luxury cursor-pointer group animate-fade-in hover:scale-[1.02]"
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
        <Image
          src={product.image_url || PLACEHOLDER_IMAGE}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`
              text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full
              ${
                product.category === "nuevos"
                  ? "bg-gold-500 text-white"
                  : "bg-white/90 text-charcoal"
              }
            `}
          >
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>

        {/* Quick add button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-charcoal text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-gold-500 transition-colors duration-200 shadow-lg"
          >
            + Añadir
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        {product.brand && (
          <p className="text-xs text-charcoal-muted uppercase tracking-widest font-medium">
            {product.brand}
          </p>
        )}

        <h3 className="font-serif text-base text-charcoal leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Olfactory notes (small) */}
        {product.olfactory_notes?.length > 0 && (
          <OlfactoryNotes notes={product.olfactory_notes.slice(0, 2)} size="sm" />
        )}

        {/* Price row */}
        <div className="flex items-end justify-between pt-2">
          <div>
            {product.price_30ml && (
              <div>
                <p className="text-[10px] text-charcoal-muted uppercase tracking-widest">desde</p>
                <p className="price-display text-xl font-bold text-gold-600 leading-tight">
                  {formatPrice(product.price_30ml)}
                </p>
              </div>
            )}
            {product.price_50ml && !product.price_30ml && (
              <p className="price-display text-xl font-bold text-gold-600 leading-tight">
                {formatPrice(product.price_50ml)}
              </p>
            )}
          </div>

          {/* Sizes available */}
          <div className="flex gap-1">
            {product.price_30ml && (
              <span className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 text-charcoal-muted font-medium">
                30ml
              </span>
            )}
            {product.price_50ml && (
              <span className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 text-charcoal-muted font-medium">
                50ml
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
