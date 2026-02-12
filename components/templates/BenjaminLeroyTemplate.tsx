// src/components/cv/templates/BenjaminLeroyTemplate.tsx

export default function BenjaminLeroyTemplate({ data }: { data: any }) {
  return (
    <div className="flex min-h-[29.7cm] w-[21cm] bg-white text-black font-sans leading-tight">
      
      {/* --- COLONNE GAUCHE (SIDEBAR) --- [cite: 1, 4, 8, 11, 16] */}
      <aside className="w-[35%] p-10 flex flex-col space-y-10 border-r border-gray-50">
        
        {/* Photo de profil (si l'utilisateur en a une) [cite: 1] */}
        <div className="w-44 h-44 bg-gray-200 rounded-full self-center overflow-hidden mb-4 grayscale">
          {data.personalInfo.image ? (
            <img src={data.personalInfo.image} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl font-bold text-gray-400">
              {data.personalInfo.firstName[0]}{data.personalInfo.lastName[0]}
            </div>
          )}
        </div>

        {/* Bloc Nom et Titre [cite: 1, 2] */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">
            {data.personalInfo.firstName} <br /> {data.personalInfo.lastName}
          </h1>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] border-t-2 border-black pt-2">
            {data.title} [cite: 2]
          </p>
        </div>

        {/* Infos de Contact [cite: 4, 5, 6, 7] */}
        <div className="text-[10px] space-y-1.5 uppercase tracking-wider">
          <p className="font-bold text-gray-400 mb-1">Contact</p>
          <p>{data.personalInfo.address}</p> [cite: 4]
          <p className="lowercase font-normal">{data.personalInfo.email}</p> [cite: 5]
          <p>{data.personalInfo.phone}</p> [cite: 6]
        </div>

        {/* Langues [cite: 8, 9, 10] */}
        <div className="text-[10px] space-y-2 uppercase tracking-wider">
          <p className="font-bold text-gray-400 mb-2 border-b-2 border-black w-fit pb-0.5">Langues</p>
          {data.languages?.map((l: any, i: number) => (
            <p key={i}>
              <span className="font-bold">{l.language}</span> — {l.level} [cite: 9, 10]
            </p>
          ))}
        </div>

        {/* Compétences [cite: 11, 12, 13, 14] */}
        <div className="text-[10px] space-y-2 uppercase tracking-wider">
          <p className="font-bold text-gray-400 mb-2 border-b-2 border-black w-fit pb-0.5">Compétences</p>
          <ul className="space-y-1.5 list-none">
            {data.skills?.map((s: any, i: number) => (
              <li key={i} className="font-medium leading-relaxed">{s.name}</li>
            ))}
          </ul>
        </div>
      </aside>

      {/* --- COLONNE DROITE (MAIN CONTENT) --- [cite: 3, 19, 33] */}
      <main className="w-[65%] p-12"> 
        
        {/* Résumé Professionnel [cite: 3] */}  
        <div className="mb-12 text-[11px] leading-relaxed italic text-gray-700 text-justify pr-6 border-b border-gray-100 pb-8">
          {data.personalInfo.summary || "Développeur web autonome et rigoureux..."} [cite: 3]
        </div>

        {/* Expériences [cite: 19, 20, 21, 25, 26] */}
        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8">Expériences Professionnelles [cite: 19]</h2>
          <div className="space-y-10">
            {data.experiences?.map((exp: any, i: number) => (
              <div key={i} className="relative">
                <h3 className="text-xs font-black uppercase tracking-wide">{exp.position}</h3> [cite: 20, 25]
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 mb-3 tracking-tighter">
                  {exp.company} | {new Date(exp.startDate).toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'})} — {exp.isCurrent ? "Présent" : new Date(exp.endDate).toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'})} [cite: 21, 26]
                </p>
                <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line space-y-1">
                  {exp.description} [cite: 22, 23, 24, 27, 31]
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formations [cite: 33, 34, 36] */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8">Formations [cite: 33]</h2>
          <div className="space-y-6">
            {data.education?.map((edu: any, i: number) => (
              <div key={i}>
                <h3 className="text-xs font-black uppercase">{edu.degree}</h3> [cite: 34, 36]
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                  {edu.school} | {new Date(edu.endDate).getFullYear()} [cite: 35, 37]
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}