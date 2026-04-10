"use client";

type Category = "todos" | "nuevos" | "caballeros" | "damas" | "unisex";

const CATEGORIES: { key: Category; label: string; icon: string }[] = [
  { key: "todos",      label: "Todos",      icon: "✦" },
  { key: "nuevos",     label: "Nuevos",     icon: "★" },
  { key: "caballeros", label: "Caballeros", icon: "♦" },
  { key: "damas",      label: "Damas",      icon: "♡" },
  { key: "unisex",     label: "Unisex",     icon: "◎" },
];

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
      {CATEGORIES.map(({ key, label, icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`
              flex items-center gap-1.5 whitespace-nowrap px-5 py-3 rounded-full
              text-sm font-medium transition-all duration-200 border min-h-[44px]
              ${
                isActive
                  ? "bg-charcoal text-white border-charcoal shadow-sm"
                  : "bg-white text-charcoal-muted border-gray-200 hover:border-gold-500 hover:text-gold-600"
              }
            `}
          >
            <span className={`text-xs ${isActive ? "text-gold-400" : "text-gray-400"}`}>
              {icon}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
