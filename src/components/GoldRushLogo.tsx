// Logo vectorial inline de Gold Rush Perfumados
// No depende de archivos externos — siempre renderiza correctamente

interface GoldRushLogoProps {
  className?: string;
  variant?: "default" | "footer"; // footer = dorado sobre oscuro (sin texto negro)
}

export default function GoldRushLogo({
  className = "h-12 w-auto",
  variant = "default",
}: GoldRushLogoProps) {
  const scriptColor = variant === "footer" ? "#F5B800" : "#2D2D2D";
  const subtitleColor = variant === "footer" ? "#9CA3AF" : "#2D2D2D";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390 95"
      className={className}
      aria-label="Gold Rush Perfumados"
      role="img"
    >
      {/* ── GOLD (bold italic, dorado) ── */}
      <text
        x="2"
        y="66"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="62"
        fill="#F5B800"
        letterSpacing="-1"
      >
        GOLD
      </text>

      {/* ── Círculo con flecha (entre GOLD y RUSH) ── */}
      <circle cx="179" cy="36" r="23" fill="#F5B800" />
      <g stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="172" y1="43" x2="187" y2="28" />
        <polyline points="178,28 187,28 187,37" fill="none" />
      </g>

      {/* ── R en script/cursiva (carbón o dorado en footer) ── */}
      <text
        x="204"
        y="70"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="74"
        fill={scriptColor}
        letterSpacing="-2"
      >
        R
      </text>

      {/* ── USH (bold italic, dorado) ── */}
      <text
        x="244"
        y="66"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="62"
        fill="#F5B800"
        letterSpacing="-1"
      >
        USH
      </text>

      {/* ── Perfumados (subtítulo centrado, delgado) ── */}
      <text
        x="196"
        y="88"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontWeight="300"
        fontSize="13"
        fill={subtitleColor}
        letterSpacing="5"
      >
        Perfumados
      </text>
    </svg>
  );
}
