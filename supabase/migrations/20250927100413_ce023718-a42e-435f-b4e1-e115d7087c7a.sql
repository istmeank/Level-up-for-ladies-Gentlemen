-- Fix RLS policies for profiles table to prevent email exposure
-- Remove the problematic deny_anon_profiles policy
DROP POLICY IF EXISTS "deny_anon_profiles" ON public.profiles;

-- Add explicit policy to require authentication for all operations
CREATE POLICY "profiles_require_auth" 
ON public.profiles 
FOR ALL 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add explicit policy to deny all access to anonymous users
CREATE POLICY "profiles_deny_anonymous" 
ON public.profiles 
FOR ALL 
TO anon 
USING (false)
WITH CHECK (false);

-- Ensure the existing policies are properly restrictive
-- Update secure_profiles_select to be more explicit about authentication requirement
DROP POLICY IF EXISTS "secure_profiles_select" ON public.profiles;
CREATE POLICY "secure_profiles_select" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Update secure_profiles_insert to be more explicit about authentication requirement
DROP POLICY IF EXISTS "secure_profiles_insert" ON public.profiles;
CREATE POLICY "secure_profiles_insert" 
ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- Update secure_profiles_update to be more explicit about authentication requirement
DROP POLICY IF EXISTS "secure_profiles_update" ON public.profiles;
CREATE POLICY "secure_profiles_update" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);