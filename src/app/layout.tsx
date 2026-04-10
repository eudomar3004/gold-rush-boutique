import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gold Rush Perfumados | Boutique de Fragancias",
  description:
    "Descubre nuestra colección exclusiva de fragancias de lujo. Perfumes originales para caballeros, damas y unisex. Santiago, República Dominicana.",
  keywords: "perfumes, fragancias, lujo, Santiago, República Dominicana, Gold Rush",
  openGraph: {
    title: "Gold Rush Perfumados",
    description: "Boutique de Fragancias de Lujo — Santiago, RD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
