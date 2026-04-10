-- ══════════════════════════════════════════════════════════════════
--  Gold Rush Perfumados — Supabase Schema
--  client_id: 75bc71db-efd7-4963-ad9d-f9fa102219eb
-- ══════════════════════════════════════════════════════════════════

-- ── Products Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id        UUID NOT NULL,
  name             TEXT NOT NULL,
  brand            TEXT,
  description      TEXT,
  category         TEXT NOT NULL CHECK (category IN ('nuevos', 'caballeros', 'damas', 'unisex')),
  price_30ml       DECIMAL(10,2),
  price_50ml       DECIMAL(10,2),
  image_url        TEXT,
  olfactory_notes  JSONB DEFAULT '[]',
  in_stock         BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast client catalog queries
CREATE INDEX IF NOT EXISTS idx_products_client_category
  ON products (client_id, category, in_stock);

-- ── Orders Table ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id        UUID NOT NULL,
  product_id       UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name     TEXT NOT NULL,
  customer_name    TEXT NOT NULL,
  customer_phone   TEXT NOT NULL,
  size             TEXT NOT NULL CHECK (size IN ('30ml', '50ml')),
  quantity         INTEGER NOT NULL DEFAULT 1,
  unit_price       DECIMAL(10,2) NOT NULL,
  total            DECIMAL(10,2) NOT NULL,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_client_status
  ON orders (client_id, status, created_at DESC);

-- ── Row Level Security ───────────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;

-- Anyone can read products (public catalog)
CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

-- Anyone can insert orders (customer checkout)
CREATE POLICY "Public insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- ── Seed Data ────────────────────────────────────────────────────
-- Run this after creating the tables.
-- client_id: 75bc71db-efd7-4963-ad9d-f9fa102219eb

INSERT INTO products (client_id, name, brand, description, category, price_30ml, price_50ml, image_url, olfactory_notes) VALUES
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Oud Royale',
  'Gold Rush Privé',
  'Una oda al lujo oriental. Abre con bergamota cítrica y se transforma en un corazón de oud ahumado, sándalo cremoso y notas ambarinas que perduran horas en la piel.',
  'caballeros',
  1800.00,
  2800.00,
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80&auto=format&fit=crop',
  '["oriental", "amaderado", "especiado"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Rose Précieuse',
  'Gold Rush Privé',
  'La esencia de la feminidad en su forma más pura. Pétalos de rosa de Damasco, iris empolvado y un fondo de almizcle sedoso.',
  'damas',
  1600.00,
  2500.00,
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80&auto=format&fit=crop',
  '["floral", "almizclado", "dulce"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Noir Intense',
  'Gold Rush Privé',
  'Presencia magnética y audaz. Pimienta negra, cuero refinado y un corazón de cedro que deja una estela de distinción.',
  'caballeros',
  2000.00,
  3200.00,
  'https://images.unsplash.com/photo-1613521973937-efce4e536b77?w=600&q=80&auto=format&fit=crop',
  '["amaderado", "especiado", "oriental"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Lumière Dorée',
  'Gold Rush Privé',
  'La fragancia del amanecer. Bergamota luminosa, jazmín blanco etéreo y vainilla suave que envuelve la piel como un segundo terciopelo.',
  'damas',
  1400.00,
  2200.00,
  'https://images.unsplash.com/photo-1616604426203-b1c8cc4f6258?w=600&q=80&auto=format&fit=crop',
  '["floral", "citrico", "dulce"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Blanc de Minuit',
  'Gold Rush Privé',
  'Misterioso y elegante. Almizcle blanco, maderas limpias y un toque de sándalo que convierte cada noche en una experiencia sensorial única.',
  'unisex',
  1500.00,
  2400.00,
  'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80&auto=format&fit=crop',
  '["almizclado", "fresco", "amaderado"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Velvet Dreams',
  'Gold Rush Privé',
  'Sensualidad envuelta en terciopelo. Ciruela madura, rosa y patchouli crean una fragancia opulenta que permanece como un susurro en la memoria.',
  'damas',
  1700.00,
  2700.00,
  'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&q=80&auto=format&fit=crop',
  '["dulce", "floral", "oriental"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Aqua Imperiale',
  'Gold Rush Privé',
  'Frescura marina de lujo. Sales del Mediterráneo, cítricos sicilianos y vetiver terroso. Para el hombre que lleva el océano en la mirada.',
  'caballeros',
  1300.00,
  2100.00,
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80&auto=format&fit=crop',
  '["fresco", "citrico", "amaderado"]'
),
(
  '75bc71db-efd7-4963-ad9d-f9fa102219eb',
  'Gold Elixir N°1',
  'Gold Rush Privé',
  'Nuestra fragancia insignia. Una sinfonía de azafrán dorado, rosa turca y ámbar que celebra la búsqueda de lo extraordinario. Edición limitada.',
  'nuevos',
  2200.00,
  3500.00,
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80&auto=format&fit=crop',
  '["oriental", "floral", "especiado", "dulce"]'
);
