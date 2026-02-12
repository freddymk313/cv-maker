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

export const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      company: z.string().min(2, "Nom de l'entreprise requis"),
      position: z.string().min(2, "Intitulé du poste requis"),
      location: z.string().optional(),
      startDate: z.string().min(1, "Date de début requise"),
      endDate: z.string().optional(),
      isCurrent: z.boolean().default(false),
      description: z.string().optional(),
    })
  ).min(1, "Ajoutez au moins une expérience"),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  education: z.array(
    z.object({
      school: z.string().min(2, "Nom de l'établissement requis"),
      degree: z.string().min(2, "Diplôme requis (ex: Licence)"),
      fieldOfStudy: z.string().optional(),
      startDate: z.string().optional(), // Optionnel pour les études
      endDate: z.string().min(1, "Année d'obtention requise"),
    })
  ).min(1, "Ajoutez au moins une formation"),
});

export type EducationInput = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(
    z.object({
      name: z.string().min(1, "Le nom de la compétence est requis"),
      level: z.number().min(1).max(5).default(3),
    })
  ).min(1, "Ajoutez au moins une compétence"),
});

export type SkillsInput = z.infer<typeof skillsSchema>;