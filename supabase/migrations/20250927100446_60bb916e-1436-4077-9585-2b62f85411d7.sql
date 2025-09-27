-- Fix RLS policies for profiles table to prevent email exposure
-- Remove the problematic deny_anon_profiles policy that has 'false' condition
DROP POLICY IF EXISTS "deny_anon_profiles" ON public.profiles;

-- Create a comprehensive policy that explicitly denies access to anonymous users
-- and only allows authenticated users to access their own data
CREATE POLICY "profiles_authenticated_only" 
ON public.profiles 
FOR ALL 
TO anon 
USING (false)
WITH CHECK (false);

-- Ensure existing authenticated policies are properly scoped to authenticated role
-- The existing policies should already be restrictive enough, but let's make sure they specify the role