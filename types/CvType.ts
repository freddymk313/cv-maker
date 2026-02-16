// types/CvType.ts
export interface ExperienceType {
  company: string;
  position: string;
  location?: string;
  startDate: string | Date;
  endDate?: string | Date;
  isCurrent?: boolean;
  description?: string;
}

export interface EducationType {
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string | Date;
  endDate?: string | Date;
}

export interface SkillType {
  name: string;
  level?: number; // 1 à 5
}

export interface LanguageType {
  language: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Langue maternelle";
}

export interface PersonalInfoType {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CvType {
  userId: string;
  title?: string;
  personalInfo: PersonalInfoType;
  experiences?: ExperienceType[];
  education?: EducationType[];
  skills?: SkillType[];
  languages?: LanguageType[];
  templateId?: string;
  isPublic?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}
