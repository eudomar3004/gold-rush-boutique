import type { ReactNode } from "react";
import type { OlfactoryNote } from "@/types";

const NOTE_CONFIG: Record<
  OlfactoryNote,
  { label: string; color: string; icon: ReactNode }
> = {
  floral: {
    label: "Floral",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 12c0-3-2-5-5-5s-5 2-5 5 2 5 5 5" strokeLinecap="round" />
        <path d="M12 12c0-3 2-5 5-5s5 2-5 5 2 5-5 5" strokeLinecap="round" />
        <path d="M12 12c-3 0-5-2-5-5s2-5 5-5" strokeLinecap="round" />
        <path d="M12 12c3 0 5-2 5-5s-2-5-5-5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  dulce: {
    label: "Dulce",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
        <path d="M12 15v2" strokeLinecap="round" />
      </svg>
    ),
  },
  amaderado: {
    label: "Amaderado",
    color: "bg-orange-50 text-orange-800 border-orange-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22V12M12 12C12 7 7 4 4 6M12 12C12 7 17 4 20 6" strokeLinecap="round" />
        <path d="M12 12C8 10 5 12 5 15M12 12C16 10 19 12 19 15" strokeLinecap="round" />
      </svg>
    ),
  },
  citrico: {
    label: "Cítrico",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" strokeLinecap="round" />
      </svg>
    ),
  },
  oriental: {
    label: "Oriental",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  fresco: {
    label: "Fresco",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22C6 22 3 17 3 12c0-2 1-5 3-7 0 4 2 6 6 6-1-3 0-7 3-9 1 3 3 5 3 8 1-1 2-3 2-5 2 2 3 5 3 7 0 5-3 10-9 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  almizclado: {
    label: "Almizclado",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 10c0-4 4-7 9-7s9 3 9 7-4 7-9 7-9-3-9-7z" />
        <path d="M8 14c1 2 2.5 3 4 3s3-1 4-3" strokeLinecap="round" />
      </svg>
    ),
  },
  especiado: {
    label: "Especiado",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2c-2 4-4 6-4 10a4 4 0 008 0c0-4-2-6-4-10z" strokeLinecap="round" />
        <path d="M8 14h8" strokeLinecap="round" />
      </svg>
    ),
  },
  lavanda: {
    label: "Lavanda",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 20V10" strokeLinecap="round" />
        <path d="M8 10c0-2 1.5-4 4-5 2.5 1 4 3 4 5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="9" cy="8" rx="2" ry="3" transform="rotate(-20 9 8)" />
        <ellipse cx="15" cy="8" rx="2" ry="3" transform="rotate(20 15 8)" />
        <ellipse cx="12" cy="6" rx="2" ry="3" />
        <path d="M9 20h6" strokeLinecap="round" />
      </svg>
    ),
  },
  pimienta: {
    label: "Pimienta",
    color: "bg-stone-50 text-stone-700 border-stone-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="13" r="5" />
        <circle cx="10" cy="12" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="14" cy="12" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="12" cy="15" r="0.8" fill="currentColor" stroke="none" />
        <path d="M12 8V5M10 6l2-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

interface OlfactoryNotesProps {
  notes: OlfactoryNote[];
  size?: "sm" | "md";
}

export default function OlfactoryNotes({ notes, size = "md" }: OlfactoryNotesProps) {
  if (!notes || notes.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {notes.map((note) => {
        const config = NOTE_CONFIG[note];
        if (!config) return null;
        return (
          <span
            key={note}
            className={`
              inline-flex items-center gap-1.5 border rounded-full font-medium
              ${size === "sm" ? "text-xs px-2.5 py-1" : "text-xs px-3 py-1.5"}
              ${config.color}
            `}
          >
            {config.icon}
            {config.label}
          </span>
        );
      })}
    </div>
  );
}
