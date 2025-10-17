-- Security Fix Migration: Address Critical Security Issues
-- Correct order: Drop all dependent objects first

-- 1. Drop formations RLS policies that depend on get_current_user_role()
DROP POLICY IF EXISTS "Seuls les admins peuvent créer des formations" ON public.formations;
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier des formations" ON public.formations;
DROP POLICY IF EXISTS "Seuls les admins peuvent supprimer des formations" ON public.formations;

-- 2. Drop the problematic get_current_user_role() function
DROP FUNCTION IF EXISTS public.get_current_user_role();

-- 3. Drop existing trigger before dropping function
DROP TRIGGER IF EXISTS validate_purchase_insert_trigger ON public.formation_purchases;
DROP TRIGGER IF EXISTS validate_purchase_before_insert ON public.formation_purchases;

-- 4. Drop the old validate_purchase_insert function
DROP FUNCTION IF EXISTS public.validate_purchase_insert();

-- 5. Remove role column from profiles if it exists
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- 6. Create new secure formations policies using has_role()
CREATE POLICY "Admins can create formations"
ON public.formations FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update formations"
ON public.formations FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete formations"
ON public.formations FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Create enhanced purchase validation function
CREATE OR REPLACE FUNCTION public.validate_purchase_insert()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  formation_price numeric;
  formation_published boolean;
  existing_purchase_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.payment_status := 'pending';
  END IF;
  
  IF NEW.user_id != auth.uid() AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Cannot create purchase for another user';
  END IF;
  
  IF NEW.amount <= 0 THEN
    RAISE EXCEPTION 'Purchase amount must be positive';
  END IF;
  
  IF NEW.amount > 1000000 THEN
    RAISE EXCEPTION 'Purchase amount exceeds maximum allowed';
  END IF;
  
  SELECT price, is_published INTO formation_price, formation_published
  FROM public.formations WHERE id = NEW.formation_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Formation does not exist';
  END IF;
  
  IF NOT formation_published AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Formation is not available for purchase';
  END IF;
  
  IF NEW.amount != formation_price AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Purchase amount does not match formation price';
  END IF;
  
  SELECT id INTO existing_purchase_id FROM public.formation_purchases
  WHERE user_id = NEW.user_id AND formation_id = NEW.formation_id AND payment_status = 'completed';
  
  IF FOUND THEN
    RAISE EXCEPTION 'User has already purchased this formation';
  END IF;
  
  RETURN NEW;
END;
$$;

-- 8. Create trigger for purchase validation
CREATE TRIGGER validate_purchase_insert_trigger
BEFORE INSERT ON public.formation_purchases
FOR EACH ROW EXECUTE FUNCTION public.validate_purchase_insert();

-- 9. Storage policies for formation-videos bucket
CREATE POLICY "Admins can upload formation videos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'formation-videos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update formation videos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'formation-videos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'formation-videos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete formation videos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'formation-videos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Purchased users can view formation videos"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'formation-videos' AND
  (public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.formation_purchases fp
    INNER JOIN public.formations f ON fp.formation_id = f.id
    WHERE fp.user_id = auth.uid() AND fp.payment_status = 'completed'
    AND f.video_url LIKE '%' || (storage.foldername(name))[1] || '%'
  ))
);

-- 10. Storage policies for formation-thumbnails bucket
CREATE POLICY "Admins can upload formation thumbnails"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'formation-thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update formation thumbnails"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'formation-thumbnails' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'formation-thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete formation thumbnails"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'formation-thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Everyone can view formation thumbnails"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'formation-thumbnails');

-- 11. Clean up duplicate policy on services_products
DROP POLICY IF EXISTS "Tout le monde peut voir les services/produits actifs" ON public.services_products;

-- 12. Add admin management for services_products
CREATE POLICY "Admins can manage services and products"
ON public.services_products FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));