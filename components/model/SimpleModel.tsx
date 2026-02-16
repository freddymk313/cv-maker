import "./../css/cv-theme.css";
import { CvType } from "@/types/CvType";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
// import { CvType } from "@/types"; // Crée un type TS basé sur ton modèle Mongoose

interface ResumeProps {
  cv: CvType;
}

const SimpleModel = ({ cv }: ResumeProps) => {
    console.log("CV data in ResumeTree:", cv); // Debug : vérifier les données reçues

  const { personalInfo, experiences, education, skills } = cv;

  const contacts = [
    { icon: <Phone size={14} />, text: personalInfo.phone },
    { icon: <Mail size={14} />, text: personalInfo.email },
    { icon: <MapPin size={14} />, text: personalInfo.address },
    { icon: <Globe size={14} />, text: personalInfo.website },
  ].filter((c) => c.text); // Filtrer les infos vides

  return (
    <div className="cv-theme w-[794px] min-h-[1123px] bg-card mx-auto shadow-lg flex flex-col">
      {/* Header - Name */}
      <header className="pt-14 pb-10 px-16 text-right">
        <h1 className="text-resume-name font-light tracking-[0.45em] text-4xl leading-tight">
          {personalInfo.firstName.toUpperCase().split("").join(" ")}
        </h1>
        <h1 className="text-resume-name font-bold tracking-[0.32em] text-4xl leading-tight mt-1">
          {personalInfo.lastName.toUpperCase().split("").join(" ")}
        </h1>
      </header>

      {/* Divider */}
      <div className="mx-16 border-t border-[hsl(var(--resume-divider))]" />

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
          {education?.length > 0 && (
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
          {skills?.length > 0 && (
            <div>
              <SectionHeading>S K I L L S</SectionHeading>
              <ul className="mt-5 space-y-2 text-sm text-resume-body">
                {skills.map((s, i) => (
                  <li key={i}>{s.name}</li>
                ))}
              </ul>
              <div className="mt-8 w-20 border-t border-[hsl(var(--resume-divider))]" />
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-[hsl(var(--resume-divider))] mx-0" />

        {/* Right Column */}
        <div className="flex-1 pl-10">
          {/* Profile */}
          {personalInfo.bio && (
            <div className="mb-10">
              <SectionHeading>PROFILE</SectionHeading>
              <p className="mt-5 text-sm text-resume-body leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experiences?.length > 0 && (
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
                    bullets={[]} // si tu veux, tu peux ajouter un champ bullets dans le modèle
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

// --- Components (inchangés) ---
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-resume-heading font-bold text-base tracking-widest">
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
  <div className="flex items-center gap-3 text-sm text-resume-body">
    <span className="text-resume-icon">{icon}</span>
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
    <p className="text-sm font-semibold text-resume-heading">{university}</p>
    <p className="text-sm text-resume-muted">{location}</p>
    <p className="text-sm text-resume-muted">{degree}</p>
    <p className="text-sm text-resume-muted">{years}</p>
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
    <p className="text-sm font-bold text-resume-heading">{title}</p>
    <p className="text-sm text-resume-muted mt-0.5">
      {company} | {years}
    </p>
    <p className="text-sm text-resume-body leading-relaxed mt-2">{description}</p>
    {bullets?.length > 0 && (
      <ul className="mt-2 space-y-1 list-disc list-outside pl-5 text-sm text-resume-body leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    )}
  </div>
);

export default SimpleModel;
