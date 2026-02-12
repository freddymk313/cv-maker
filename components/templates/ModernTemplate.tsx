export default function ModernTemplate({ data }: { data: any }) {
  return (
    <div className="flex min-h-[29.7cm] text-gray-800">
      {/* SIDEBAR (35%) */}
      <aside className="w-1/3 bg-slate-800 text-white p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wider leading-tight">
            {data.personalInfo.firstName} <br />
            <span className="text-blue-400">{data.personalInfo.lastName}</span>
          </h1>
          <p className="text-sm mt-4 font-light opacity-80">{data.title || "Professionnel"}</p>
        </div>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase border-b border-slate-600 pb-1">Contact</h3>
          <div className="text-xs space-y-2 opacity-90">
            <p>{data.personalInfo.phone}</p>
            <p className="wrap-break-word">{data.personalInfo.email}</p>
            <p>{data.personalInfo.address}</p>
          </div>
        </section>

        {/* COMPÉTENCES */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase border-b border-slate-600 pb-1">Compétences</h3>
          <div className="space-y-3">
            {data.skills?.map((s: any, i: number) => (
              <div key={i}>
                <p className="text-[10px] mb-1">{s.name}</p>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: `${(s.level / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LANGUES */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase border-b border-slate-600 pb-1">Langues</h3>
          {data.languages?.map((l: any, i: number) => (
            <div key={i} className="text-xs flex justify-between">
              <span>{l.language}</span>
              <span className="opacity-60 italic">{l.level}</span>
            </div>
          ))}
        </section>
      </aside>

      {/* CONTENU PRINCIPAL (65%) */}
      <main className="flex-1 p-10 space-y-10">
        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-[0.2em] mb-4 border-b-2 border-slate-100 pb-2">Expériences</h2>
          <div className="space-y-6">
            {data.experiences?.map((exp: any, i: number) => (
              <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-900">{exp.position}</h4>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? "Présent" : new Date(exp.endDate).getFullYear()}</span>
                </div>
                <p className="text-xs font-semibold text-blue-600 mb-2">{exp.company}</p>
                <p className="text-[11px] leading-relaxed text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-[0.2em] mb-4 border-b-2 border-slate-100 pb-2">Formation</h2>
          <div className="space-y-4">
            {data.education?.map((edu: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-900 text-xs">{edu.degree}</h4>
                  <span className="text-[10px] text-gray-400">{new Date(edu.endDate).getFullYear()}</span>
                </div>
                <p className="text-[11px] text-gray-500">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}