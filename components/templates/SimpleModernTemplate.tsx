// src/components/cv/templates/SimpleModernTemplate.tsx

export default function SimpleModernTemplate({ data }: { data: any }) {
  return (
    <div className="p-[1.5cm] bg-white min-h-[29.7cm] text-black font-sans leading-relaxed">
      {/* EN-TÊTE MINIMALISTE */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tighter uppercase mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-lg font-medium text-gray-600 tracking-wide uppercase">
          {data.title || "Développeur Web"}
        </p>
        
        {/* CONTACT GRID */}
        <div className="mt-6 grid grid-cols-2 gap-y-2 text-sm border-t border-b border-gray-100 py-4">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase text-[10px] text-gray-400">Email:</span>
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase text-[10px] text-gray-400">Téléphone:</span>
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase text-[10px] text-gray-400">Adresse:</span>
            <span>{data.personalInfo.address}</span>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        {/* EXPÉRIENCES PROFESSIONNELLES */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-4">
            Expériences Professionnelles
            <div className="flex-1 h-px bg-gray-100"></div>
          </h2>
          <div className="space-y-8">
            {data.experiences?.map((exp: any, i: number) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-md font-bold text-black">{exp.position}</h3>
                  <span className="text-xs font-medium tabular-nums text-gray-500">
                    {new Date(exp.startDate).getFullYear()} — {exp.isCurrent ? "Présent" : new Date(exp.endDate).getFullYear()}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-700 mb-2 italic">{exp.company}</p>
                <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPÉTENCES & LANGUES (CÔTE À CÔTE) */}
        <div className="grid grid-cols-2 gap-12">
          {/* SKILLS */}
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-4">
              Compétences
              <div className="flex-1 h-px bg-gray-100"></div>
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((s: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-gray-50 text-black text-xs font-semibold rounded-md border border-gray-100">
                  {s.name}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-4">
              Formation
              <div className="flex-1 h-px bg-gray-100"></div>
            </h2>
            <div className="space-y-4">
              {data.education?.map((edu: any, i: number) => (
                <div key={i}>
                  <h4 className="text-sm font-bold">{edu.degree}</h4>
                  <p className="text-xs text-gray-500">{edu.school} • {new Date(edu.endDate).getFullYear()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* LANGUES */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-4">
            Langues
            <div className="flex-1 h-px bg-gray-100"></div>
          </h2>
          <div className="flex gap-8">
            {data.languages?.map((l: any, i: number) => (
              <div key={i} className="text-sm">
                <span className="font-bold">{l.language}</span>
                <span className="text-gray-400 ml-2 italic">{l.level}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}