"use client";

import GoldRushLogo from "./GoldRushLogo";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo vectorial — siempre visible, sin dependencia de archivos */}
          <a href="/" aria-label="Gold Rush Perfumados — Inicio">
            <GoldRushLogo className="h-10 sm:h-12 w-auto" />
          </a>

          {/* Botón de pedido */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 border-2 border-charcoal text-charcoal
                       px-4 py-2 rounded-full text-sm font-semibold tracking-wide
                       transition-all duration-200 hover:bg-charcoal hover:text-white
                       active:scale-95"
            aria-label="Ver pedido"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="hidden sm:inline">Mi pedido</span>

            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-gold-500 text-charcoal text-xs
                           font-bold rounded-full h-5 w-5 flex items-center justify-center
                           shadow-sm ring-2 ring-white"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Línea dorada decorativa */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
    </header>
  );
}
