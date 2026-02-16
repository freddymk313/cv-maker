import { Phone, Mail, MapPin, Globe } from "lucide-react";

const Resume = () => {
  return (
    <div className="w-[794px] min-h-[1123px] bg-card mx-auto shadow-lg flex flex-col">
      {/* Header - Name */}
      <header className="pt-14 pb-10 px-16 text-right">
        <h1 className="text-resume-name font-light tracking-[0.45em] text-5xl leading-tight">
          P E D R O
        </h1>
        <h1 className="text-resume-name font-bold tracking-[0.32em] text-5xl leading-tight mt-1">
          F E R N A N D E S
        </h1>
      </header>

      {/* Divider */}
      <div className="mx-16 border-t *border-resume-divider border-[hsl(var(--resume-divider))]" />

      {/* Body */}
      <div className="flex flex-1 px-16 pt-10 pb-12">
        {/* Left Column */}
        <div className="w-[240px] pr-10 flex-shrink-0">
          {/* Contact */}
          <div className="space-y-3 mb-10">
            <ContactItem icon={<Phone size={14} />} text="+123-456-7890" />
            <ContactItem
              icon={<Mail size={14} />}
              text="hello@reallygreatsite.com"
            />
            <ContactItem
              icon={<MapPin size={14} />}
              text="123 Anywhere St., Any City"
            />
            <ContactItem
              icon={<Globe size={14} />}
              text="www.reallygreatsite.com"
            />
          </div>

          {/* Education */}
          <div className="mb-10">
            <SectionHeading>EDUCATION</SectionHeading>
            <div className="mt-5 space-y-6">
              <EducationItem
                university="UNIVERSITY NAME HERE"
                location="University Location"
                degree="Degree Name"
                years="2011 - 2015"
              />
              <EducationItem
                university="UNIVERSITY NAME HERE"
                location="University Location"
                degree="Degree Name"
                years="2011 - 2015"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionHeading>S K I L L S</SectionHeading>
            <ul className="mt-5 space-y-2 text-sm text-resume-body">
              <li>Editing</li>
              <li>Layouting</li>
              <li>Communication</li>
              <li>Teamwork</li>
              <li>Visual Art</li>
              <li>Animation</li>
            </ul>
            <div className="mt-8 w-20 border-t border-[hsl(var(--resume-divider))]" />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-[hsl(var(--resume-divider))] mx-0" />

        {/* Right Column */}
        <div className="flex-1 pl-10">
          {/* Profile */}
          <div className="mb-10">
            <SectionHeading>PROFILE</SectionHeading>
            <p className="mt-5 text-sm text-resume-body leading-relaxed">
              A visual artist creates works of art using a variety of materials.
              As a visual artist, your duties may be to draw images, work with
              paint, develop murals, design in 3D, or create art with mixed
              media.
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <SectionHeading>WORK EXPERIENCE</SectionHeading>
            <div className="mt-5 space-y-8">
              <WorkItem
                title="ENTER YOUR JOB POSITION HERE"
                company="Cmpany Name"
                years="2015 - 2018"
                description="creates works of art using a variety of materials. As a visual artist, your duties may be to draw images, work with paint, develop murals, design in 3D"
                bullets={[
                  "Create artwork based on the creative concept decided for the exhibition.",
                  "Develop a creative concept for exhibit or sale.",
                  "Display completed artwork and oversee installation of artwork at venue or event.",
                ]}
              />
              <WorkItem
                title="ENTER YOUR JOB POSITION HERE"
                company="Cmpany Name"
                years="2015 - 2018"
                description="creates works of art using a variety of materials. As a visual artist, your duties may be to draw images, work with paint, develop murals, design in 3D"
                bullets={[
                  "Create artwork based on the creative concept decided for the exhibition.",
                  "Develop a creative concept for exhibit or sale.",
                  "Display completed artwork and oversee installation of artwork at venue or event.",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <p className="text-sm text-resume-body leading-relaxed mt-2">
      {description}
    </p>
    <ul className="mt-2 space-y-1 list-disc list-outside pl-5 text-sm text-resume-body leading-relaxed">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default Resume;
