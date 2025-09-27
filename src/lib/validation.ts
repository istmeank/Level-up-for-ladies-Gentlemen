import { z } from 'zod';

// Authentication validation schemas
export const authSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Format d'email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  password: z.string()
    .trim()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
    .max(72, { message: "Le mot de passe ne peut pas dépasser 72 caractères" })
    .regex(/^(?=.*[a-zA-Z])/, { message: "Le mot de passe doit contenir au moins une lettre" })
});

// Formation validation schema
export const formationSchema = z.object({
  title: z.string()
    .trim()
    .min(3, { message: "Le titre doit contenir au moins 3 caractères" })
    .max(200, { message: "Le titre ne peut pas dépasser 200 caractères" }),
  description: z.string()
    .trim()
    .max(2000, { message: "La description ne peut pas dépasser 2000 caractères" })
    .optional(),
  price: z.number()
    .min(0, { message: "Le prix ne peut pas être négatif" })
    .max(999999, { message: "Le prix ne peut pas dépasser 999,999" }),
  duration: z.number()
    .int({ message: "La durée doit être un nombre entier" })
    .min(1, { message: "La durée doit être d'au moins 1 minute" })
    .max(10080, { message: "La durée ne peut pas dépasser 7 jours (10,080 minutes)" })
    .optional(),
  level: z.enum(['débutant', 'intermédiaire', 'avancé'], {
    errorMap: () => ({ message: "Le niveau doit être débutant, intermédiaire ou avancé" })
  })
});

// File validation schemas
export const videoFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 500 * 1024 * 1024, { // 500MB
      message: "La vidéo ne peut pas dépasser 500MB"
    })
    .refine((file) => {
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'];
      return allowedTypes.includes(file.type);
    }, {
      message: "Format de vidéo non supporté. Utilisez MP4, AVI, MOV, WMV ou WebM"
    })
});

export const imageFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, { // 5MB
      message: "L'image ne peut pas dépasser 5MB"
    })
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, {
      message: "Format d'image non supporté. Utilisez JPEG, PNG ou WebP"
    })
});

// Contact form validation (if needed)
export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" })
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: "Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets" }),
  email: z.string()
    .trim()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Format d'email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  message: z.string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" })
});

export type AuthFormData = z.infer<typeof authSchema>;
export type FormationFormData = z.infer<typeof formationSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;