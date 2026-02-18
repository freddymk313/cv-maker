// import "./../css/cv-theme.css";
// import { CvType } from "@/types/CvType";
// import { Phone, Mail, MapPin, Globe } from "lucide-react";

// interface ResumeProps {
//   cv: CvType;
// }

// const SimpleModel = ({ cv }: ResumeProps) => {
//   const { personalInfo, experiences, education, skills, languages } = cv;

//   const contacts = [
//     { icon: <Phone size={14} />, text: personalInfo.phone },
//     { icon: <Mail size={14} />, text: personalInfo.email },
//     { icon: <MapPin size={14} />, text: personalInfo.address },
//     { icon: <Globe size={14} />, text: personalInfo.linkedin || personalInfo.github || personalInfo.website },
//   ].filter((c) => c.text);

//   return (
//     /* Remplacement bg-card par #ffffff */
//     <div className="cv-theme w-[794px] min-h-[1123px] mx-auto shadow-lg flex flex-col" style={{ backgroundColor: '#ffffff' }}>

//       {/* Header - Name */}
//       <header className="pt-14 pb-10 px-16 text-right">
//         {/* Remplacement text-resume-name par #1a1a1a */}
//         <h1 className="font-light tracking-[0.45em] text-4xl leading-tight" style={{ color: '#1a1a1a' }}>
//           {personalInfo.firstName.toUpperCase().split("").join(" ")}
//         </h1>
//         <h1 className="font-bold tracking-[0.20em] text-4xl leading-tight mt-1" style={{ color: '#1a1a1a' }}>
//           {personalInfo.lastName.toUpperCase().split("").join(" ")}
//         </h1>
//       </header>

//       {/* Divider */}
//       <div className="mx-16 border-t" style={{ borderColor: '#262626' }} />

//       {/* Body */}
//       <div className="flex flex-1 px-16 pt-10 pb-12 relative">
//         {/* LIGNE VERTICALE : S'étire sur toute la hauteur du contenu (multi-pages) */}
//         {/* <div
//           className="absolute top-0 bottom-0 left-[304px] border-l"
//           style={{ borderColor: '#262626' }}
//         /> */}

//         {/* Left Column */}
//         <div className="w-[240px] pr-10 flex-shrink-0">
//           {/* Contact */}
//           {contacts.length > 0 && (
//             <div className="space-y-3 mb-10">
//               {contacts.map((c, i) => (
//                 <ContactItem key={i} icon={c.icon} text={c.text!} />
//               ))}
//             </div>
//           )}

//           {/* Education */}
//           {education && education.length > 0 && (
//             <div className="mb-10">
//               <SectionHeading>EDUCATION</SectionHeading>
//               <div className="mt-5 space-y-6">
//                 {education.map((edu, i) => (
//                   <EducationItem
//                     key={i}
//                     university={edu.school}
//                     location={edu.fieldOfStudy || ""}
//                     degree={edu.degree}
//                     years={
//                       edu.startDate && edu.endDate
//                         ? `${new Date(edu.startDate).getFullYear()} - ${new Date(
//                             edu.endDate
//                           ).getFullYear()}`
//                         : ""
//                     }
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Skills */}
//           {skills && skills.length > 0 && (
//             <div className="mb-10">
//               <SectionHeading>SKILLS</SectionHeading>
//               <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: '#404040' }}>
//                 {skills.map((s, i) => (
//                   <li key={i}>{s.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {languages && languages.length > 0 && (
//             <div>
//               <SectionHeading>LANGUAGES</SectionHeading>
//               <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: '#404040' }}>
//                 {languages.map((l, i) => (
//                   <li key={i}>{l.language}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Vertical Divider - Couleur Hex fixe */}
//         <div className="border-l mx-0" style={{ borderColor: '#262626' }} />

//         {/* Right Column */}
//         <div className="flex-1 pl-10">
//           {/* Profile */}
//           {personalInfo.bio && (
//             <div className="mb-10">
//               <SectionHeading>PROFILE</SectionHeading>
//               <p className="mt-5 text-sm leading-relaxed" style={{ color: '#404040' }}>
//                 {personalInfo.bio}
//               </p>
//             </div>
//           )}

//           {/* Work Experience */}
//           {experiences && experiences.length > 0 && (
//             <div>
//               <SectionHeading>WORK EXPERIENCE</SectionHeading>
//               <div className="mt-5 space-y-8">
//                 {experiences.map((exp, i) => (
//                   <WorkItem
//                     key={i}
//                     title={exp.position}
//                     company={exp.company}
//                     years={
//                       exp.startDate
//                         ? `${new Date(exp.startDate).getFullYear()} - ${
//                             exp.isCurrent
//                               ? "Present"
//                               : exp.endDate
//                               ? new Date(exp.endDate).getFullYear()
//                               : ""
//                           }`
//                         : ""
//                     }
//                     description={exp.description || ""}
//                     bullets={[]}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* --- Sous-composants avec couleurs supportées --- */

// const SectionHeading = ({ children }: { children: React.ReactNode }) => (
//   <h2 className="font-bold text-base tracking-widest uppercase" style={{ color: '#1a1a1a' }}>
//     {children}
//   </h2>
// );

// const ContactItem = ({
//   icon,
//   text,
// }: {
//   icon: React.ReactNode;
//   text: string;
// }) => (
//   <div className="flex items-center gap-3 text-sm" style={{ color: '#404040' }}>
//     <span style={{ color: '#1a1a1a' }}>{icon}</span>
//     <span>{text}</span>
//   </div>
// );

// const EducationItem = ({
//   university,
//   location,
//   degree,
//   years,
// }: {
//   university: string;
//   location: string;
//   degree: string;
//   years: string;
// }) => (
//   <div>
//     <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>{university}</p>
//     <p className="text-sm" style={{ color: '#737373' }}>{location}</p>
//     <p className="text-sm" style={{ color: '#737373' }}>{degree}</p>
//     <p className="text-sm" style={{ color: '#737373' }}>{years}</p>
//   </div>
// );

// const WorkItem = ({
//   title,
//   company,
//   years,
//   description,
//   bullets,
// }: {
//   title: string;
//   company: string;
//   years: string;
//   description: string;
//   bullets: string[];
// }) => (
//   <div>
//     <p className="text-sm font-bold uppercase" style={{ color: '#1a1a1a' }}>{title}</p>
//     <p className="text-sm mt-0.5" style={{ color: '#737373' }}>
//       {company} | {years}
//     </p>
//     <p className="text-sm leading-relaxed mt-2" style={{ color: '#404040' }}>{description}</p>
//     {bullets?.length > 0 && (
//       <ul className="mt-2 space-y-1 list-disc list-outside pl-5 text-sm leading-relaxed" style={{ color: '#404040' }}>
//         {bullets.map((b, i) => (
//           <li key={i}>{b}</li>
//         ))}
//       </ul>
//     )}
//   </div>
// );

// export default SimpleModel;

// import "./../css/cv-theme.css";
// import { CvType } from "@/types/CvType";
// import { Phone, Mail, MapPin, Globe } from "lucide-react";

// interface ResumeProps {
//   cv: CvType;
// }

// const SimpleModel = ({ cv }: ResumeProps) => {
//   const { personalInfo, experiences, education, skills, languages } = cv;

//   const contacts = [
//     { icon: <Phone size={14} />, text: personalInfo.phone },
//     { icon: <Mail size={14} />, text: personalInfo.email },
//     { icon: <MapPin size={14} />, text: personalInfo.address },
//     { icon: <Globe size={14} />, text: personalInfo.linkedin || personalInfo.github || personalInfo.website },
//   ].filter((c) => c.text);

//   return (
//     <div
//       className="cv-theme w-[794px] mx-auto shadow-lg flex flex-col bg-white"
//       style={{
//         minHeight: "1123px",
//         fontFamily: "'Inter', sans-serif" // Assure-toi d'avoir une police propre
//       }}
//     >
//       {/* Header - On réduit un peu le padding car le PDF ajoutera sa propre marge */}
//       <header className="pt-10 pb-10 px-16 text-right">
//         <h1 className="font-light tracking-[0.45em] text-4xl leading-tight" style={{ color: '#1a1a1a' }}>
//           {personalInfo.firstName?.toUpperCase().split("").join(" ")}
//         </h1>
//         <h1 className="font-bold tracking-[0.20em] text-4xl leading-tight mt-1" style={{ color: '#1a1a1a' }}>
//           {personalInfo.lastName?.toUpperCase().split("").join(" ")}
//         </h1>
//       </header>

//       <div className="mx-16 border-t" style={{ borderColor: '#262626' }} />

//       {/* Body */}
//       <div className="flex flex-1 px-16 pt-10 pb-12 relative">

//         {/* Colonne Gauche */}
//         <div className="w-[240px] pr-10 flex-shrink-0">
//           {contacts.length > 0 && (
//             <div className="space-y-3 mb-10">
//               {contacts.map((c, i) => (
//                 <div key={i} className="flex items-center gap-3 text-sm" style={{ color: '#404040' }}>
//                   <span style={{ color: '#1a1a1a' }}>{c.icon}</span>
//                   <span className="break-all">{c.text}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {education && education.length > 0 && (
//             <div className="mb-10">
//               <SectionHeading>EDUCATION</SectionHeading>
//               <div className="mt-5 space-y-6">
//                 {education.map((edu, i) => (
//                   <div key={i} className="break-inside-avoid mb-4">
//                     <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>{edu.school}</p>
//                     <p className="text-sm" style={{ color: '#737373' }}>{edu.degree}</p>
//                     <p className="text-sm" style={{ color: '#737373' }}>
//                       {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Présent"}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {skills && skills.length > 0 && (
//             <div className="mb-10 break-inside-avoid">
//               <SectionHeading>SKILLS</SectionHeading>
//               <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: '#404040' }}>
//                 {skills.map((s, i) => <li key={i}>{s.name}</li>)}
//               </ul>
//             </div>
//           )}

//           {languages && languages.length > 0 && (
//             <div className="break-inside-avoid">
//               <SectionHeading>LANGUAGES</SectionHeading>
//               <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: '#404040' }}>
//                 {languages.map((l, i) => <li key={i}>{l.language}</li>)}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Separateur Vertical - On utilise une bordure sur la colonne droite plutôt qu'un div seul */}
//         <div className="border-l" style={{ borderColor: '#262626' }} />

//         {/* Colonne Droite */}
//         <div className="flex-1 pl-10">
//           {personalInfo.bio && (
//             <div className="mb-10">
//               <SectionHeading>PROFILE</SectionHeading>
//               <p className="mt-5 text-sm leading-relaxed text-justify" style={{ color: '#404040' }}>
//                 {personalInfo.bio}
//               </p>
//             </div>
//           )}

//           {experiences && experiences.length > 0 && (
//             <div>
//               <SectionHeading>WORK EXPERIENCE</SectionHeading>
//               <div className="mt-5 space-y-8">
//                 {experiences.map((exp, i) => (
//                   <div key={i} className="mb-6">
//                     {/* Le titre et l'entreprise ne doivent pas être séparés */}
//                     <div className="break-after-avoid" style={{ breakAfter: 'avoid' }}>
//                       <p className="text-sm font-bold uppercase" style={{ color: '#1a1a1a' }}>{exp.position}</p>
//                       <p className="text-sm mt-0.5" style={{ color: '#737373' }}>
//                         {exp.company} | {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - {exp.isCurrent ? "Présent" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
//                       </p>
//                     </div>
//                     {/* La description peut être coupée entre deux pages si elle est trop longue */}
//                     <p className="text-sm leading-relaxed mt-2 text-justify" style={{ color: '#404040' }}>
//                       {exp.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SectionHeading = ({ children }: { children: React.ReactNode }) => (
//   <h2 className="font-bold text-base tracking-widest uppercase break-after-avoid" style={{ color: '#1a1a1a', breakAfter: 'avoid' }}>
//     {children}
//   </h2>
// );

// export default SimpleModel;

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
        fontFamily: "'Inter', sans-serif" }}
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
        <div className="absolute top-0 bottom-0 left-[304px] border-l border-[#262626]" />

        <div className="flex w-full">
          {/* Colonne Gauche */}
          <div className="w-[240px] pr-10 flex-shrink-0 relative z-10">
            {contacts.length > 0 && (
              <div className="space-y-3 mb-10">
                {contacts.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-[#404040]"
                  >
                    <span className="text-[#1a1a1a]">{c.icon}</span>
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
          <div className="flex-1 pl-10 *relative *z-10">
            {personalInfo.bio && (
              <div className="mb-10">
                <SectionHeading>PROFILE</SectionHeading>
                <p className="mt-5 text-sm leading-relaxed text-[#404040]">
                  {personalInfo.bio}
                </p>
              </div>
            )}

            {/* {experiences && experiences.length > 0 && (
              <div>
                <SectionHeading>WORK EXPERIENCE</SectionHeading>
                <div className="mt-5 space-y-8">
                  {experiences.map((exp, i) => (
                    <div key={i} className="experience-item">
                      <div className="mb-1">
                        <p className="text-sm font-bold uppercase text-[#1a1a1a]">{exp.position}</p>
                        <p className="text-sm text-[#737373]">
                          {exp.company} | {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - {exp.isCurrent ? "Présent" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-[#404040]">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

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
                      <p className="text-sm mt-2 text-[#404040] leading-relaxed">
                        {exp.description}
                      </p>
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
