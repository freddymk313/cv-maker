import { CvType } from "@/types/CvType";

interface ResumeProps {
  cv: CvType;
}

const ModernModel = ({ cv }: ResumeProps) => {
  const { personalInfo, experiences, education, skills, languages } = cv;

  // Configuration des couleurs fixes (pour éviter l'erreur "lab" de Tailwind v4)
  const colors = {
    sidebarBg: "#2D3E50", // Un bleu foncé élégant
    sidebarText: "#ffffff",
    mainHeading: "#1a1a1a",
    mainSubtitle: "#4a5568",
    mainBody: "#2d3748",
    accent: "#3182ce"
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-start justify-center py-8">
      <div
        className="flex w-full shadow-xl bg-white"
        style={{
          maxWidth: "900px",
          minHeight: "1123px", // Format A4 approximatif
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        {/* LEFT SIDEBAR */}
        <aside
          className="flex flex-col"
          style={{
            width: "300px",
            minWidth: "300px",
            backgroundColor: colors.sidebarBg,
            color: colors.sidebarText
          }}
        >
          {/* Photo dynamique */}
          <div className="w-full bg-slate-700">
            <img
              src={personalInfo.profilePicture || "https://via.placeholder.com/300x300?text=Photo"}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-full object-cover"
              style={{ height: "300px" }}
            />
          </div>

          {/* Contact */}
          <div className="px-8 pt-10 space-y-2">
            <p className="text-sm leading-relaxed">{personalInfo.address}</p>
            <p className="text-sm leading-relaxed">{personalInfo.email}</p>
            <p className="text-sm leading-relaxed">{personalInfo.phone}</p>
            {personalInfo.website && (
               <p className="text-sm leading-relaxed truncate">{personalInfo.website}</p>
            )}
          </div>

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div className="px-8 pt-8">
              <h3 className="font-black uppercase tracking-wider mb-3" style={{ fontSize: "16px", letterSpacing: "0.1em" }}>
                Langues
              </h3>
              {languages.map((l, i) => (
                <p key={i} className="text-sm leading-relaxed">{l.language} - {l.level}</p>
              ))}
            </div>
          )}

          {/* Compétences */}
          {skills && skills.length > 0 && (
            <div className="px-8 pt-8">
              <h3 className="font-black uppercase tracking-wider mb-3" style={{ fontSize: "16px", letterSpacing: "0.1em" }}>
                Compétences
              </h3>
              <div className="space-y-2">
                {skills.map((s, i) => (
                  <p key={i} className="text-sm leading-relaxed">{s.name}</p>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 px-10 py-10">
          {/* Name */}
          <h1
            className="font-black uppercase leading-none"
            style={{
              fontFamily: "serif",
              fontSize: "52px",
              color: colors.mainHeading,
              letterSpacing: "0.02em",
            }}
          >
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </h1>

          {/* Title / Headline */}
          <h2
            className="uppercase font-bold mt-4 tracking-widest"
            style={{
              fontSize: "13px",
              color: colors.accent,
              letterSpacing: "0.15em",
            }}
          >
            {/* {personalInfo.headline || "Développeur Web"} */}
          </h2>

          {/* Bio / Description */}
          <p
            className="mt-4 leading-relaxed text-justify"
            style={{
              fontSize: "13px",
              color: colors.mainBody,
              lineHeight: "1.7",
            }}
          >
            {personalInfo.bio}
          </p>

          {/* Expériences Professionnelles */}
          {experiences && experiences.length > 0 && (
            <section className="mt-10">
              <h2
                className="font-black uppercase tracking-wide border-b-2 pb-1"
                style={{
                  fontSize: "18px",
                  color: colors.mainHeading,
                  letterSpacing: "0.05em",
                  marginBottom: "16px",
                  borderColor: colors.mainHeading
                }}
              >
                Expériences Professionnelles
              </h2>

              {experiences.map((exp, i) => (
                <div key={i} className="mb-6">
                  <h3 className="font-bold uppercase" style={{ fontSize: "13px", color: colors.mainHeading }}>
                    {exp.position}
                  </h3>
                  <p className="mt-1" style={{ fontSize: "12px", color: colors.mainSubtitle }}>
                    {exp.company} | {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? "Présent" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                  </p>
                  <p className="mt-2" style={{ fontSize: "12.5px", color: colors.mainBody, lineHeight: "1.6" }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Formations */}
          {education && education.length > 0 && (
            <section className="mt-8">
              <h2
                className="font-black uppercase tracking-wide border-b-2 pb-1"
                style={{
                  fontSize: "18px",
                  color: colors.mainHeading,
                  letterSpacing: "0.05em",
                  marginBottom: "16px",
                  borderColor: colors.mainHeading
                }}
              >
                Formations
              </h2>

              {education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold uppercase" style={{ fontSize: "13px", color: colors.mainHeading }}>
                    {edu.degree}
                  </h3>
                  <p className="mt-1" style={{ fontSize: "12px", color: colors.mainSubtitle }}>
                    {edu.school} | {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - {edu.endDate ? new Date(edu.endDate).getFullYear() : ""}
                  </p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ModernModel;