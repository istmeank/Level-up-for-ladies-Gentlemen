-- Mise à jour de la description du service LEVEL UP for Ladies
UPDATE services_products 
SET description = 'Groupe d''échange exclusivement Féminin'
WHERE name ILIKE '%ladies%';