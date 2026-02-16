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
    { icon: <MapPin size={14} />, text: personalInfo.address },
    { icon: <Globe size={14} />, text: personalInfo.linkedin || personalInfo.github || personalInfo.website },
  ].filter((c) => c.text);

  return (
    /* Remplacement bg-card par #ffffff */
    <div className="cv-theme w-[794px] min-h-[1123px] mx-auto shadow-lg flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Header - Name */}
      <header className="pt-14 pb-10 px-16 text-right">
        {/* Remplacement text-resume-name par #1a1a1a */}
        <h1 className="font-light tracking-[0.45em] text-4xl leading-tight" style={{ color: '#1a1a1a' }}>
          {personalInfo.firstName.toUpperCase().split("").join(" ")}
        </h1>
        <h1 className="font-bold tracking-[0.20em] text-4xl leading-tight mt-1" style={{ color: '#1a1a1a' }}>
          {personalInfo.lastName.toUpperCase().split("").join(" ")}
        </h1>
      </header>

      {/* Divider */}
      <div className="mx-16 border-t" style={{ borderColor: '#262626' }} />

      {/* Body */}
      <div className="flex flex-1 px-16 pt-10 pb-12">
        {/* Left Column */}
        <div className="w-[240px] pr-10 flex-shrink-0">
          {/* Contact */}
          {contacts.length > 0 && (
            <div className="space-y-3 mb-10">
              {contacts.map((c, i) => (
                <ContactItem key={i} icon={c.icon} text={c.text!} />
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-10">
              <SectionHeading>EDUCATION</SectionHeading>
              <div className="mt-5 space-y-6">
                {education.map((edu, i) => (
                  <EducationItem
                    key={i}
                    university={edu.school}
                    location={edu.fieldOfStudy || ""}
                    degree={edu.degree}
                    years={
                      edu.startDate && edu.endDate
                        ? `${new Date(edu.startDate).getFullYear()} - ${new Date(
                            edu.endDate
                          ).getFullYear()}`
                        : ""
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-10">
              <SectionHeading>SKILLS</SectionHeading>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: '#404040' }}>
                {skills.map((s, i) => (
                  <li key={i}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <SectionHeading>LANGUAGES</SectionHeading>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: '#404040' }}>
                {languages.map((l, i) => (
                  <li key={i}>{l.language}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Vertical Divider - Couleur Hex fixe */}
        <div className="border-l mx-0" style={{ borderColor: '#262626' }} />

        {/* Right Column */}
        <div className="flex-1 pl-10">
          {/* Profile */}
          {personalInfo.bio && (
            <div className="mb-10">
              <SectionHeading>PROFILE</SectionHeading>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: '#404040' }}>
                {personalInfo.bio}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <SectionHeading>WORK EXPERIENCE</SectionHeading>
              <div className="mt-5 space-y-8">
                {experiences.map((exp, i) => (
                  <WorkItem
                    key={i}
                    title={exp.position}
                    company={exp.company}
                    years={
                      exp.startDate
                        ? `${new Date(exp.startDate).getFullYear()} - ${
                            exp.isCurrent
                              ? "Present"
                              : exp.endDate
                              ? new Date(exp.endDate).getFullYear()
                              : ""
                          }`
                        : ""
                    }
                    description={exp.description || ""}
                    bullets={[]} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- Sous-composants avec couleurs supportées --- */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-base tracking-widest uppercase" style={{ color: '#1a1a1a' }}>
    {children}
  </h2>
);

const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-3 text-sm" style={{ color: '#404040' }}>
    <span style={{ color: '#1a1a1a' }}>{icon}</span>
    <span>{text}</span>
  </div>
);

const EducationItem = ({
  university,
  location,
  degree,
  years,
}: {
  university: string;
  location: string;
  degree: string;
  years: string;
}) => (
  <div>
    <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>{university}</p>
    <p className="text-sm" style={{ color: '#737373' }}>{location}</p>
    <p className="text-sm" style={{ color: '#737373' }}>{degree}</p>
    <p className="text-sm" style={{ color: '#737373' }}>{years}</p>
  </div>
);

const WorkItem = ({
  title,
  company,
  years,
  description,
  bullets,
}: {
  title: string;
  company: string;
  years: string;
  description: string;
  bullets: string[];
}) => (
  <div>
    <p className="text-sm font-bold uppercase" style={{ color: '#1a1a1a' }}>{title}</p>
    <p className="text-sm mt-0.5" style={{ color: '#737373' }}>
      {company} | {years}
    </p>
    <p className="text-sm leading-relaxed mt-2" style={{ color: '#404040' }}>{description}</p>
    {bullets?.length > 0 && (
      <ul className="mt-2 space-y-1 list-disc list-outside pl-5 text-sm leading-relaxed" style={{ color: '#404040' }}>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    )}
  </div>
);

export default SimpleModel;