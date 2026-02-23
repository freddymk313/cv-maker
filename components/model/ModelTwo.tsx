"use client";

import { CvType } from "@/types/CvType";
import { Phone, Mail, MapPin } from "lucide-react";

interface ResumeProps {
  cv: CvType;
}

const ModelTwo = ({ cv }: ResumeProps) => {
  const { personalInfo, experiences, education, skills, languages } = cv;

  return (
    <div
      className="bg-white w-[794px] mx-auto shadow-2xl text-[#1a1110] relative"
      style={{
        minHeight: "1123px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER : Centrage absolu au milieu du bloc #f6f6f6 */}
      <header className="h-[280px] flex flex-col items-center justify-center bg-[#f6f6f6] border-b border-[#545454] px-10 text-center">
        <h1 className="text-[64px] font-bold leading-[1.1] tracking-tight text-[#333333]">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-2xl text-[#444444] mt-4 font-medium tracking-[0.15em]">
          {personalInfo.professionalTitle || "Web Development"}
        </p>
      </header>

      {/* BODY CONTAINER */}
      <div className="flex px-16 *py-10 relative">
        {/* COLONNE GAUCHE */}
        <div className="w-[38%] pr-10 border-r border-[#545454] min-h-[700px]">
          {/* CONTACT */}
          <section className="mb-12 pt-10">
            <SectionHeading>CONTACT:</SectionHeading>
            <div className="mt-6 space-y-4 text-[14px]">
              {personalInfo.phone && (
                <div className="flex items-center gap-4 text-[#4b5563]">
                  <Phone size={16} strokeWidth={2.5} className="text-[#1a1a1a]" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-4 text-[#4b5563]">
                  <Mail size={16} strokeWidth={2.5} className="text-[#1a1a1a]" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {(personalInfo.location?.city || personalInfo.location?.country) && (
                <div className="flex items-center gap-4 text-[#4b5563]">
                  <MapPin size={16} strokeWidth={2.5} className="text-[#1a1a1a]" />
                  <span>
                    {personalInfo.location.city}, {personalInfo.location.country}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* SKILLS */}
          {skills && skills.length > 0 && (
            <section className="mb-12">
              <SectionHeading>SKILLS:</SectionHeading>
              <ul className="mt-6 space-y-3 text-[14px] text-[#4b5563]">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[2px]">•</span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* EDUCATION */}
          {education && education.length > 0 && (
            <section className="mb-12">
              <SectionHeading>EDUCATION:</SectionHeading>
              <div className="mt-6 space-y-8">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-[14px] font-bold text-[#1a1a1a] uppercase leading-tight">
                      {edu.school}
                    </p>
                    <p className="text-[13px] font-bold text-[#1a1a1a] mt-1">
                      {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} -{" "}
                      {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                    </p>
                    <p className="text-[14px] text-[#4b5563] mt-1">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {languages && languages.length > 0 && (
            <section>
              <SectionHeading>LANGUAGE:</SectionHeading>
              <ul className="mt-6 space-y-3 text-[14px] text-[#4b5563]">
                {languages.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[2px]">•</span>
                    {l.language}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* COLONNE DROITE */}
        <div className="flex-1 pl-12 pt-10">
          {/* PROFILE */}
          {personalInfo.bio && (
            <section className="mb-12">
              <SectionHeading>PROFILE:</SectionHeading>
              <p className="mt-6 text-[14px] leading-relaxed text-[#4b5563] text-justify">
                {personalInfo.bio}
              </p>
            </section>
          )}

          {/* WORK EXPERIENCE */}
          {experiences && experiences.length > 0 && (
            <section className="mb-12">
              <SectionHeading>EXPERIENCE:</SectionHeading>
              <div className="mt-6 space-y-10">
                {experiences.map((exp, i) => (
                  <div key={i} className="break-inside-avoid">
                    <div className="flex flex-col">
                      <p className="text-[15px] font-bold uppercase tracking-tight text-[#1a1a1a]">
                        {exp.position}{" "}
                        {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} -{" "}
                        {exp.isCurrent ? "PRESENT" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                      </p>
                      <p className="text-[14px] text-[#1a1a1a] font-bold mt-1 italic">
                        {exp.company}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2">
                      {exp.description?.split("\n").filter(l => l.trim()).map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[14px] leading-relaxed text-[#4b5563]">
                          <span className="mt-[2px]">•</span>
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

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-black text-[18px] tracking-[0.2em] uppercase text-[#1a1a1a]">
    {children}
  </h2>
);

export default ModelTwo;