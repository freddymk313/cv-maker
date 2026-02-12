import * as z from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().optional(),
  bio: z.string().max(500, "La bio ne doit pas dépasser 500 caractères").optional(),
  linkedin: z.string().url("Lien LinkedIn invalide").optional().or(z.literal("")),
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;