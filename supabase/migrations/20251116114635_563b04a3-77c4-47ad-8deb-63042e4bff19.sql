-- Ajout des nouvelles colonnes CRM à la table services_products existante
ALTER TABLE public.services_products 
  ADD COLUMN IF NOT EXISTS duration TEXT,
  ADD COLUMN IF NOT EXISTS format TEXT,
  ADD COLUMN IF NOT EXISTS conditions TEXT,
  ADD COLUMN IF NOT EXISTS upsells JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS pipeline TEXT,
  ADD COLUMN IF NOT EXISTS cta TEXT,
  ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS content_included JSONB DEFAULT '[]'::jsonb;

-- Modification de la contrainte de type pour inclure 'program' et 'community'
ALTER TABLE public.services_products DROP CONSTRAINT IF EXISTS services_products_type_check;
ALTER TABLE public.services_products 
  ADD CONSTRAINT services_products_type_check 
  CHECK (type IN ('service', 'product', 'program', 'community'));

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_services_products_category ON public.services_products(category);

-- Suppression de l'ancienne politique générique si elle existe
DROP POLICY IF EXISTS "Admins can manage services and products" ON public.services_products;

-- Nouvelle politique : Seuls les admins peuvent gérer les offres
CREATE POLICY "Seuls les admins peuvent gérer les offres"
  ON public.services_products FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));