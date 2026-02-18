// // types/CvType.ts
// export interface ExperienceType {
//   company: string;
//   position: string;
//   location?: string;
//   startDate: string | Date;
//   endDate?: string | Date;
//   isCurrent?: boolean;
//   description?: string;
// }

// export interface EducationType {
//   school: string;
//   degree: string;
//   fieldOfStudy?: string;
//   startDate?: string | Date;
//   endDate?: string | Date;
// }

// export interface SkillType {
//   name: string;
//   level?: number; // 1 à 5
// }

// export interface LanguageType {
//   language: string;
//   level: "Débutant" | "Intermédiaire" | "Avancé" | "Langue maternelle";
// }

// export interface PersonalInfoType {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   address?: string;
//   profilePicture?: string;
//   bio?: string;
//   linkedin?: string;
//   github?: string;
//   website?: string;
// }

// export interface CvType {
//   userId: string;
//   title?: string;
//   personalInfo: PersonalInfoType;
//   experiences?: ExperienceType[];
//   education?: EducationType[];
//   skills?: SkillType[];
//   languages?: LanguageType[];
//   templateId?: string;
//   isPublic?: boolean;
//   slug?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// types/CvType.ts

export interface ExperienceType {
  company: string;
  position: string;
  location?: string; // Optionnel, mais utile pour le rendu "Paris, France"
  startDate: string | Date;
  endDate?: string | Date;
  isCurrent?: boolean;
  description?: string;
}

export interface EducationType {
  school: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string; // AJOUTÉ : pour correspondre au design (ex: "Paris, France")
  startDate?: string | Date;
  endDate?: string | Date;
}

export interface SkillType {
  name: string;
  level?: number; // 1 à 5
}

export interface LanguageType {
  language: string;
  level?: string; // Rendu plus flexible pour accepter "Courant", "Intermédiaire", etc.
}

// AJOUTÉ : Pour la section "Centres d'intérêts" présente sur ton image
export interface InterestType {
  name: string;
}

export interface PersonalInfoType {
  firstName: string;
  lastName: string;
  email: string;
  title?: string;      // AJOUTÉ : Le titre du poste (ex: "Développeur Web")
  phone?: string;
  address?: string;
  profilePicture?: string; 
  image?: string;      // ALIAS : Souvent utilisé indifféremment avec profilePicture
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CvType {
  id?: string;         // Identifiant unique du CV
  userId: string;
  title?: string;      // Nom interne du CV (ex: "CV Version Dev")
  personalInfo: PersonalInfoType;
  experiences?: ExperienceType[];
  education?: EducationType[];
  skills?: SkillType[];
  languages?: LanguageType[];
  interests?: InterestType[]; // AJOUTÉ : Pour la sidebar
  templateId?: string;
  isPublic?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}
