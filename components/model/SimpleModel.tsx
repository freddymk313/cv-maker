import "./../css/cv-theme.css";
import { CvType } from "@/types/CvType";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

interface ResumeProps {
  cv: CvType;
}

const SimpleModel = ({ cv }: ResumeProps) => {
  const { personalInfo, experiences, education, skills, languages } = cv;

  const contacts = [
    { icon: <Phone size={14} />, text: personalInfo.phone },
    { icon: <Mail size={14} />, text: personalInfo.email },
    // { icon: <MapPin size={14} />, text: personalInfo.address },
    {
      icon: <MapPin size={14} />,
      text:
        personalInfo.location?.formatted ||
        (personalInfo.location?.city && personalInfo.location?.country
          ? `${personalInfo.location.city}, ${personalInfo.location.country}`
          : ""),
    },
    {
      icon: <Globe size={14} />,
      text:
        personalInfo.linkedin || personalInfo.github || personalInfo.website,
    },
  ].filter((c) => c.text);

  return (
    <div
      className="cv-theme bg-white w-[794px] mx-auto shadow-lg"
      style={{
        // minHeight: "1123px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <header className="pt-14 pb-10 px-16 text-right">
        <h1 className="font-light tracking-[0.45em] text-4xl leading-tight text-[#1a1a1a]">
          {personalInfo.firstName?.toUpperCase().split("").join(" ")}
        </h1>
        <h1 className="font-bold tracking-[0.20em] text-4xl leading-tight mt-1 text-[#1a1a1a]">
          {personalInfo.lastName?.toUpperCase().split("").join(" ")}
        </h1>
      </header>

      <div className="mx-16 border-t border-[#262626]" />

      {/* Body Container */}
      <div className="relative px-16 pt-10 pb-12">
        {/* Ligne Verticale - On utilise une bordure sur un div absolu qui s'adapte à la hauteur */}
        {/* <div className="absolute top-0 bottom-0 left-[304px] border-l border-[#262626]" /> */}

        <div className="flex w-full">
          {/* Colonne Gauche */}
          {/* <div className="w-[240px] pr-10 flex-shrink-0 relative z-10"> */}
          <div className="w-[240px] pr-10 border-r border-[#262626]">
            {contacts.length > 0 && (
              <div className="space-y-3 mb-10">
                {contacts.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-[#404040]"
                  >
                    <span className="text-[#1a1a1a] mt-2">
                      {c.icon}
                    </span>
                    <span className="break-all">{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            {education && education.length > 0 && (
              <div className="mb-10">
                <SectionHeading>EDUCATION</SectionHeading>
                <div className="mt-5 space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="mb-4">
                      <p className="text-sm font-semibold text-[#1a1a1a]">
                        {edu.school}
                      </p>
                      <p className="text-sm text-[#737373]">{edu.degree}</p>
                      <p className="text-sm text-[#737373]">
                        {edu.startDate
                          ? new Date(edu.startDate).getFullYear()
                          : ""}{" "}
                        -{" "}
                        {edu.endDate
                          ? new Date(edu.endDate).getFullYear()
                          : "Présent"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div className="mb-10">
                <SectionHeading>SKILLS</SectionHeading>
                <ul className="mt-5 space-y-2 text-sm text-[#404040]">
                  {skills.map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div>
                <SectionHeading>LANGUAGES</SectionHeading>
                <ul className="mt-5 space-y-2 text-sm text-[#404040]">
                  {languages.map((l, i) => (
                    <li key={i}>{l.language}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Colonne Droite */}
          <div className="flex-1 pl-10">
            {personalInfo.bio && (
              <div className="mb-10">
                <SectionHeading>PROFILE</SectionHeading>
                <p className="mt-5 text-sm leading-relaxed text-[#404040] text-justify">
                  {personalInfo.bio}
                </p>
              </div>
            )}

            {experiences && experiences.length > 0 && (
              <div className="w-full">
                <SectionHeading>WORK EXPERIENCE</SectionHeading>
                <div className="mt-5 space-y-8">
                  {experiences.map((exp, i) => (
                    <div
                      key={i}
                      className="mb-6 *block break-inside-avoid"
                      style={{ breakInside: "auto" }}
                    >
                      <div style={{ breakAfter: "avoid" }}>
                        <p className="text-sm font-bold uppercase text-[#1a1a1a]">
                          {exp.position}
                        </p>
                        <p className="text-sm text-[#737373]">
                          {exp.company} |{" "}
                          {exp.startDate
                            ? new Date(exp.startDate).getFullYear()
                            : ""}{" "}
                          -{" "}
                          {exp.isCurrent
                            ? "Présent"
                            : exp.endDate
                              ? new Date(exp.endDate).getFullYear()
                              : ""}
                        </p>
                      </div>
                      <div className="text-sm mt-2 text-[#404040] leading-relaxed">
                        {/* {exp.description} */}
                        <div className="mt-3 space-y-2">
                          {exp.description
                            ?.split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm leading-relaxed"
                              >
                                <span className="mt-[2px]">•</span>
                                <span>{line.replace(/^[-•]\s*/, "")}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-base tracking-widest uppercase text-[#1a1a1a]">
    {children}
  </h2>
);

export default SimpleModel;
