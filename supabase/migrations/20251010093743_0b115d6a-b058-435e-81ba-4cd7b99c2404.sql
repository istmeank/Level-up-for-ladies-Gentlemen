-- ============================================
-- PHASE 1: FIX CRITICAL PRIVILEGE ESCALATION
-- ============================================

-- 1.1 Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 1.2 Create user_roles table with proper security
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 1.3 Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 1.4 Users can only view their own roles (read-only, no UPDATE allowed)
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- PHASE 2: CREATE SECURITY DEFINER FUNCTIONS
-- ============================================

-- 2.1 Create function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 2.2 Update existing is_admin function to use user_roles table
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(user_id, 'admin'::app_role);
$$;

-- ============================================
-- PHASE 3: MIGRATE EXISTING DATA
-- ============================================

-- 3.1 Copy admin users from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles
WHERE role = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- 3.2 Copy regular users to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'user'::app_role
FROM public.profiles
WHERE role = 'user' OR role IS NULL OR role = ''
ON CONFLICT (user_id, role) DO NOTHING;

-- 3.3 Remove the insecure role column from profiles (BREAKING CHANGE)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- ============================================
-- PHASE 4: SECURE FORMATION_PURCHASES TABLE
-- ============================================

-- 4.1 Add admin access policy for viewing all purchases
CREATE POLICY "Admins can view all purchases"
  ON public.formation_purchases
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- 4.2 Create validation function for purchase inserts
CREATE OR REPLACE FUNCTION public.validate_purchase_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Force payment_status to 'pending' for non-admin users
  IF NOT public.is_admin(auth.uid()) THEN
    NEW.payment_status := 'pending';
  END IF;
  
  -- Ensure user_id matches authenticated user (prevent impersonation)
  IF NEW.user_id != auth.uid() AND NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Cannot create purchase for another user';
  END IF;
  
  -- Validate amount is positive
  IF NEW.amount <= 0 THEN
    RAISE EXCEPTION 'Purchase amount must be positive';
  END IF;
  
  RETURN NEW;
END;
$$;

-- 4.3 Attach validation trigger to formation_purchases
CREATE TRIGGER validate_purchase_before_insert
  BEFORE INSERT ON public.formation_purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_purchase_insert();

-- 4.4 Add UPDATE policy for admins to update payment status
CREATE POLICY "Admins can update purchases"
  ON public.formation_purchases
  FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));