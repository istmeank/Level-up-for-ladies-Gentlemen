-- Add explicit restrictive policies for user_roles table
-- Only admins should be able to modify roles

-- Prevent regular users from inserting roles
CREATE POLICY "Only system can insert user roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Prevent regular users from updating roles
CREATE POLICY "Only system can update user roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- Prevent regular users from deleting roles
CREATE POLICY "Only system can delete user roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (false);