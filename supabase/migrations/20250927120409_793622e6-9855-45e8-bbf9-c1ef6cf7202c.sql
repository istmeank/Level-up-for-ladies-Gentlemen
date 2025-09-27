-- Mise à jour du Programme d'accompagnement Perception
UPDATE services_products 
SET 
  name = 'Programme d''accompagnement Perception',
  features = '["Séances individuelles TCC-ACT de 60 minutes 1 fois par semaine", "Séances individuelles Système de valeurs Ank de 60 minutes 1 fois par semaine", "Plan d''action personnalisé", "Suivi WhatsApp"]'::jsonb
WHERE name ILIKE '%perception%';