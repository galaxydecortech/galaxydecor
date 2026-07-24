-- ==========================================================================
-- GALAXY DECOR - SUPABASE (POSTGRESQL) DATABASE SCHEMA
-- Copy & Run this SQL script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================================================

-- 1. Store Config Table (Key-Value)
CREATE TABLE IF NOT EXISTS public.store_config (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "desc" TEXT,
    image TEXT
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    "shortDesc" TEXT,
    "desc" TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    "offerPrice" NUMERIC DEFAULT 0,
    shipping NUMERIC DEFAULT 0,
    image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    "isNew" BOOLEAN DEFAULT false,
    "inStock" BOOLEAN DEFAULT true,
    specs JSONB DEFAULT '{}'::jsonb,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure shipping column exists on existing tables
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS shipping NUMERIC DEFAULT 0;


-- 4. Interior Solutions Table
CREATE TABLE IF NOT EXISTS public.interior_solutions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    "desc" TEXT,
    price TEXT,
    image TEXT,
    features JSONB DEFAULT '[]'::jsonb
);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    author TEXT NOT NULL,
    title TEXT,
    rating INTEGER DEFAULT 5,
    text TEXT
);

-- 6. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    "totalAmount" NUMERIC NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'Pending',
    "paymentStatus" TEXT DEFAULT 'Pending',
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'New',
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    "discountType" TEXT DEFAULT 'percentage',
    "discountValue" NUMERIC DEFAULT 0,
    "minOrderValue" NUMERIC DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true
);

-- Enable RLS for Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interior_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Allow Public Read & Full Write Access for API & Seeding
DROP POLICY IF EXISTS "Full access store_config" ON public.store_config;
CREATE POLICY "Full access store_config" ON public.store_config FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access categories" ON public.categories;
CREATE POLICY "Full access categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access products" ON public.products;
CREATE POLICY "Full access products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access interior_solutions" ON public.interior_solutions;
CREATE POLICY "Full access interior_solutions" ON public.interior_solutions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access reviews" ON public.reviews;
CREATE POLICY "Full access reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access orders" ON public.orders;
CREATE POLICY "Full access orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access enquiries" ON public.enquiries;
CREATE POLICY "Full access enquiries" ON public.enquiries FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Full access coupons" ON public.coupons;
CREATE POLICY "Full access coupons" ON public.coupons FOR ALL USING (true) WITH CHECK (true);
