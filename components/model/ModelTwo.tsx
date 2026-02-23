"use client";

import { CvType } from "@/types/CvType";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

interface ResumeProps {
  cv: CvType;
}

const ModelTwo = ({ cv }: ResumeProps) => {
  const { personalInfo, experiences, education, skills, languages } = cv;

  return (
    <div
      className="bg-white w-[794px] mx-auto shadow-lg text-[#333]"
      style={{
        minHeight: "1123px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER : Nom et Poste centrés */}
      <header className="pt-16 pb-10 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-[#333]">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl uppercase tracking-[0.2em] mt-3 text-[#444] font-medium">
          {personalInfo.professionalTitle || "PROFESSIONAL TITLE"}
        </p>
      </header>

      {/* Ligne horizontale de séparation */}
      <div className="mx-12 border-t border-gray-300" />

      {/* BODY : Deux colonnes avec séparation verticale */}
      <div className="flex px-12 py-10 min-h-[800px]">
        
        {/* COLONNE GAUCHE (Contact, Skills, Education, Language) */}
        <div className="w-[35%] pr-8 border-r border-gray-300">
          
          {/* CONTACT */}
          <section className="mb-10">
            <SectionHeading>CONTACT:</SectionHeading>
            <div className="mt-5 space-y-4 text-[13px]">
              {personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-gray-700" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-gray-700" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {(personalInfo.location?.city || personalInfo.location?.country) && (
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-gray-700" />
                  <span>
                    {personalInfo.location.city}, {personalInfo.location.country}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* SKILLS */}
          {skills && skills.length > 0 && (
            <section className="mb-10">
              <SectionHeading>SKILLS:</SectionHeading>
              <ul className="mt-5 space-y-2 text-[13px]">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* EDUCATION */}
          {education && education.length > 0 && (
            <section className="mb-10">
              <SectionHeading>EDUCATION:</SectionHeading>
              <div className="mt-5 space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-[13px] font-bold uppercase leading-tight">
                      {edu.school}
                    </p>
                    <p className="text-[12px] text-gray-600 font-bold mt-1">
                      {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                    </p>
                    <p className="text-[13px] text-gray-600 mt-1">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {languages && languages.length > 0 && (
            <section>
              <SectionHeading>LANGUAGE:</SectionHeading>
              <ul className="mt-5 space-y-2 text-[13px]">
                {languages.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    {l.language}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* COLONNE DROITE (Profile, Experience, References) */}
        <div className="flex-1 pl-10">
          
          {/* PROFILE */}
          {personalInfo.bio && (
            <section className="mb-10">
              <SectionHeading>PROFILE:</SectionHeading>
              <p className="mt-5 text-[13px] leading-relaxed text-gray-700 text-justify">
                {personalInfo.bio}
              </p>
            </section>
          )}

          {/* WORK EXPERIENCE */}
          {experiences && experiences.length > 0 && (
            <section className="mb-10">
              <SectionHeading>EXPERIENCE:</SectionHeading>
              <div className="mt-5 space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <p className="text-[13px] font-bold uppercase tracking-wide">
                        {exp.position}
                      </p>
                      <p className="text-[12px] font-bold text-gray-700">
                         {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - {exp.isCurrent ? "PRESENT" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                      </p>
                    </div>
                    <p className="text-[13px] text-gray-600 font-bold italic mt-1">
                      {exp.company}
                    </p>
                    <div className="mt-3 space-y-2">
                      {exp.description?.split("\n").filter(l => l.trim()).map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[13px] leading-relaxed text-gray-700">
                          <span className="text-gray-400">•</span>
                          <span>{line.replace(/^[-•]\s*/, "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

/* Sous-composant pour les titres de section uniformes */
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-extrabold text-[15px] tracking-[0.15em] uppercase text-[#1a1a1a]">
    {children}
  </h2>
);

export default ModelTwo;