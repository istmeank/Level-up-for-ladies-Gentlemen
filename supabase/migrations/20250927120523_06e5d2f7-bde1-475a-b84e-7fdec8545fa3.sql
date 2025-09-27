-- Mise à jour de l'image du service LEVEL UP for Ladies
UPDATE services_products 
SET image_url = '/images/logo-level-up-ladies-new.svg'
WHERE name ILIKE '%ladies%';