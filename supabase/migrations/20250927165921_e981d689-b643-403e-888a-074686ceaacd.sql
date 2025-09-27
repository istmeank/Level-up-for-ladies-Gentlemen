-- Clean up conflicting RLS policies on profiles table
DROP POLICY IF EXISTS "profiles_require_auth" ON public.profiles;
DROP POLICY IF EXISTS "profiles_deny_anonymous" ON public.profiles;
DROP POLICY IF EXISTS "secure_profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "secure_profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "secure_profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_authenticated_only" ON public.profiles;
DROP POLICY IF EXISTS "deny_anonymous_access" ON public.profiles;

-- Create a single, clear RLS policy for profiles
CREATE POLICY "Users can only access their own profile"
ON public.profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Update the is_admin function to properly check roles
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user has admin role in profiles table
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;