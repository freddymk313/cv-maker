import "./../css/cv-theme-modern.css";
import { forwardRef } from "react";
import { CvType } from "@/types/CvType";

interface ResumeProps {
  cv: CvType;
}

const ModernModel = forwardRef<HTMLDivElement, ResumeProps>(({ cv }, ref) => {
  const { personalInfo, experiences, education, skills, languages, interests } = cv;

  // Formattage des dates pour le rendu
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  };

  return (
    <div 
      ref={ref} 
      className="cv-theme-modern w-[794px] h-[1123px] bg-white mx-auto shadow-lg flex overflow-hidden font-sans"
    >
      {/* Sidebar Gauche (Noire) */}
      <div className="w-[300px] bg-black text-white flex-shrink-0 flex flex-col">
        {/* Photo de profil */}
        <div className="w-full h-[320px] overflow-hidden bg-zinc-800">
          {personalInfo.image ? (
            <img
              src={personalInfo.image}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-full h-full object-cover grayscale"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-zinc-500 italic">
               Pas de photo
             </div>
          )}
        </div>

        {/* Coordonnées */}
        <div className="px-10 pt-12 space-y-1.5 text-[13px] font-light opacity-90">
          {personalInfo.address && <p>{personalInfo.address}</p>}
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {(personalInfo.website || personalInfo.linkedin) && (
            <p className="truncate">{personalInfo.website || personalInfo.linkedin}</p>
          )}
        </div>

        {/* Section Langues */}
        {languages && languages.length > 0 && (
          <div className="px-10 pt-12">
            <SidebarHeading>LANGUES</SidebarHeading>
            <div className="mt-4 space-y-1 text-[13px] font-light opacity-90">
              {languages.map((l, i) => (
                <p key={i}>{l.language} {l.level ? `- ${l.level}` : ""}</p>
              ))}
            </div>
          </div>
        )}

        {/* Section Compétences */}
        {skills && skills.length > 0 && (
          <div className="px-10 pt-12">
            <SidebarHeading>COMPÉTENCES</SidebarHeading>
            <div className="mt-4 space-y-3 text-[13px] font-light opacity-90 leading-snug">
              {skills.map((s, i) => (
                <p key={i}>{s.name}</p>
              ))}
            </div>
          </div>
        )}

        {/* Section Centres d'intérêts */}
        {interests && interests.length > 0 && (
          <div className="px-10 pt-12">
            <SidebarHeading>CENTRES D'INTÉRÊTS</SidebarHeading>
            <div className="mt-4 space-y-1 text-[13px] font-light opacity-90">
              {interests.map((interest, i) => (
                <p key={i}>{interest.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Colonne Droite (Contenu) */}
      <div className="flex-1 px-12 pt-16 pb-12 flex flex-col bg-white overflow-hidden">
        
        {/* Nom et Prénom */}
        <header>
          <h1 className="text-black font-black text-[56px] leading-[0.9] tracking-tighter uppercase">
            {personalInfo.firstName}<br />{personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="mt-6 text-[#7d94ad] font-bold text-base tracking-[0.1em] uppercase">
              {personalInfo.title}
            </p>
          )}
        </header>

        {/* Profil / Bio */}
        {personalInfo.bio && (
          <div className="mt-6">
            <p className="text-[13px] text-gray-700 leading-relaxed max-w-[95%]">
              {personalInfo.bio}
            </p>
          </div>
        )}

        {/* Expériences Professionnelles */}
        {experiences && experiences.length > 0 && (
          <div className="mt-12">
            <SectionHeading>EXPÉRIENCES PROFESSIONNELLES</SectionHeading>
            <div className="mt-6 space-y-8">
              {experiences.map((exp, i) => (
                <div key={i} className="flex flex-col break-inside-avoid">
                  <h3 className="text-[14px] font-bold text-black uppercase tracking-tight">
                    {exp.position}
                  </h3>
                  <p className="text-[12px] text-gray-400 mt-1 font-medium italic">
                    {exp.company}, {exp.location} | {formatDate(exp.startDate)} - {exp.isCurrent ? "Présent" : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <div className="mt-3 text-[13px] text-gray-700 leading-relaxed">
                      {/* Si la description contient des listes ou plusieurs lignes */}
                      <p className="whitespace-pre-line">{exp.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formations */}
        {education && education.length > 0 && (
          <div className="mt-12">
            <SectionHeading>FORMATIONS</SectionHeading>
            <div className="mt-6 space-y-5">
              {education.map((edu, i) => (
                <div key={i} className="break-inside-avoid">
                  <h3 className="text-[14px] font-bold text-black uppercase tracking-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-[12px] text-gray-400 mt-1 font-medium">
                    {edu.school}, {edu.location} | {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Présent"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ModernModel.displayName = "ModernModel";

/* Composants de style internes */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-black font-black text-xl tracking-tight uppercase border-none mb-2">
    {children}
  </h2>
);

const SidebarHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-white font-black text-lg tracking-tight uppercase">
    {children}
  </h2>
);

export default ModernModel;