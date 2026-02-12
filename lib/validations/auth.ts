// src/lib/validations/auth.ts
import * as z from "zod";

import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type LoginInput = z.infer<typeof loginSchema>;