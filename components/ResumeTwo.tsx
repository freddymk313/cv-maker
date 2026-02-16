import { Phone, Mail, MapPin, Globe } from "lucide-react";

interface ResumeProps {
  data: {
    personalInfo: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      address: string;
      website?: string;
      summary: string;
    };
    education: Array<{
      university: string;
      location: string;
      degree: string;
      years: string;
    }>;
    // Correction ici : Skills est un tableau d'objets
    skills: Array<{
      name: string;
      level?: string;
      _id?: string;
    }>;
    experiences: Array<{
      title: string;
      company: string;
      years: string;
      description: string;
      bullets: string[];
    }>;
  };
}

const ResumeTwo = ({ data }: ResumeProps) => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-card mx-auto shadow-lg flex flex-col text-black">
      {/* Header - Name */}
      <header className="pt-14 pb-10 px-16 text-right">
        <h1 className="text-resume-name font-light tracking-[0.45em] text-5xl leading-tight uppercase">
          {data.personalInfo.firstName?.split('').join(' ')}
        </h1>
        <h1 className="text-resume-name font-bold tracking-[0.35em] text-5xl leading-tight mt-1 uppercase">
          {data.personalInfo.lastName?.split('').join(' ')}
        </h1>
      </header>

      {/* Divider */}
      <div className="mx-16 border-t border-resume-divider" />

      {/* Body */}
      <div className="flex flex-1 px-16 pt-10 pb-12">
        {/* Left Column */}
        <div className="w-[240px] pr-10 flex-shrink-0">
          {/* Contact */}
          <div className="space-y-3 mb-10">
            <ContactItem icon={<Phone size={14} />} text={data.personalInfo.phone} />
            <ContactItem icon={<Mail size={14} />} text={data.personalInfo.email} />
            <ContactItem icon={<MapPin size={14} />} text={data.personalInfo.address} />
            {data.personalInfo.website && (
              <ContactItem icon={<Globe size={14} />} text={data.personalInfo.website} />
            )}
          </div>

          {/* Education */}
          <div className="mb-10">
            <SectionHeading>EDUCATION</SectionHeading>
            <div className="mt-5 space-y-6">
              {data.education?.map((edu, index) => (
                <EducationItem
                  key={index}
                  university={edu.university}
                  location={edu.location}
                  degree={edu.degree}
                  years={edu.years}
                />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionHeading>S K I L L S</SectionHeading>
            <ul className="mt-5 space-y-2 text-sm text-resume-body">
              {data.skills?.map((skill, index) => (
                // Correction ici : on affiche skill.name au lieu de l'objet skill complet
                <li key={skill._id || index}>
                  {typeof skill === 'object' ? skill.name : skill}
                </li>
              ))}
            </ul>
            <div className="mt-8 w-20 border-t border-resume-divider" />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-resume-divider mx-0" />

        {/* Right Column */}
        <div className="flex-1 pl-10">
          {/* Profile */}
          <div className="mb-10">
            <SectionHeading>PROFILE</SectionHeading>
            <p className="mt-5 text-sm text-resume-body leading-relaxed text-justify">
              {data.personalInfo.summary}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <SectionHeading>WORK EXPERIENCE</SectionHeading>
            <div className="mt-5 space-y-8">
              {data.experiences?.map((exp, index) => (
                <WorkItem
                  key={index}
                  title={exp.title}
                  company={exp.company}
                  years={exp.years}
                  description={exp.description}
                  bullets={exp.bullets}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-resume-heading font-bold text-base tracking-widest uppercase">
    {children}
  </h2>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-sm text-resume-body">
    <span className="text-resume-icon">{icon}</span>
    <span className="truncate">{text}</span>
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
  <div className="uppercase tracking-wide">
    <p className="text-[13px] font-bold text-resume-heading leading-tight">{university}</p>
    <p className="text-xs text-resume-muted mt-1">{location}</p>
    <p className="text-xs text-resume-muted">{degree}</p>
    <p className="text-xs text-resume-muted">{years}</p>
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
    <p className="text-[13px] font-bold text-resume-heading uppercase tracking-wide">{title}</p>
    <p className="text-xs text-resume-muted mt-1 uppercase">
      {company} | {years}
    </p>
    <p className="text-sm text-resume-body leading-relaxed mt-3 text-justify">{description}</p>
    <ul className="mt-3 space-y-1 list-disc list-outside pl-5 text-sm text-resume-body leading-relaxed">
      {bullets?.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default ResumeTwo;