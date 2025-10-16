-- Add explicit policies to deny all anonymous/public access to sensitive tables
-- This provides defense-in-depth in case RLS is accidentally disabled

-- Deny anonymous access to profiles
CREATE POLICY "Deny public access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Deny anonymous access to formation_purchases
CREATE POLICY "Deny public access to purchases"
ON public.formation_purchases
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Deny anonymous access to user_roles
CREATE POLICY "Deny public access to user roles"
ON public.user_roles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);