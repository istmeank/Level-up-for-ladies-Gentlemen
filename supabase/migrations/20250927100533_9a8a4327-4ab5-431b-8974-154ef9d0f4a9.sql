-- Fix RLS policies for profiles table to prevent email exposure
-- Remove the problematic deny_anon_profiles policy
DROP POLICY IF EXISTS "deny_anon_profiles" ON public.profiles;

-- Create a simple, effective policy to deny anonymous access
CREATE POLICY "deny_anonymous_access" 
ON public.profiles 
FOR ALL 
TO anon 
USING (false);