import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function BenjaminLeroyTemplate({ data }: { data: any }) {
  return (
    <div className="flex flex-col w-[21cm] min-h-[29.7cm] bg-white text-[#1a1a1a] font-sans p-0 m-0 leading-normal">
      
      {/* --- HEADER SECTION --- */}
      <header className="flex justify-end pt-16 pb-10 px-16">
        <div className="text-right">
          <h1 className="text-6xl font-light tracking-[0.2em] uppercase leading-none">
            {data.personalInfo.firstName}
          </h1>
          <h1 className="text-6xl font-bold tracking-[0.2em] uppercase mt-2">
            {data.personalInfo.lastName}
          </h1>
        </div>
      </header>

      {/* Ligne horizontale de séparation */}
      <div className="w-full border-t border-black mb-0"></div>

      {/* --- BODY SECTION --- */}
      <div className="flex flex-1">
        
        {/* --- COLONNE GAUCHE (SIDEBAR) --- */}
        <aside className="w-[35%] pt-12 pl-12 pr-8 flex flex-col">
          
          {/* Contact Info */}
          <div className="space-y-4 mb-14 text-[11px]">
            <div className="flex items-center gap-3">
              <Phone size={14} />
              <span>{data.personalInfo.phone || "+123-456-7890"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} />
              <span className="break-all">{data.personalInfo.email || "hello@reallygreatsite.com"}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} />
              <span>{data.personalInfo.address || "123 Anywhere St., Any City"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={14} />
              <span>{data.personalInfo.website || "www.reallygreatsite.com"}</span>
            </div>
          </div>

          {/* Education */}
          <div className="mb-14">
            <h2 className="text-xl font-medium tracking-widest uppercase mb-8">Education</h2>
            <div className="space-y-8">
              {data.education?.map((edu: any, i: number) => (
                <div key={i} className="text-[11px] uppercase tracking-wider">
                  <p className="font-bold text-[12px]">{edu.school || "University Name Here"}</p>
                  <p>{edu.location || "University Location"}</p>
                  <p>{edu.degree || "Degree Name"}</p>
                  <p>{edu.startDate ? `${new Date(edu.startDate).getFullYear()} - ${new Date(edu.endDate).getFullYear()}` : "2011 - 2015"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-24 border-t border-gray-400 mb-10"></div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-medium tracking-widest uppercase mb-8">Skills</h2>
            <ul className="space-y-3 text-[12px]">
              {data.skills?.map((s: any, i: number) => (
                <li key={i} className="font-normal">{s.name}</li>
              ))}
            </ul>
          </div>

          <div className="w-24 border-t border-gray-400 mt-10"></div>
        </aside>

        {/* --- DIVISEUR VERTICAL --- */}
        <div className="w-[1px] bg-gray-300 self-stretch"></div>

        {/* --- COLONNE DROITE (MAIN CONTENT) --- */}
        <main className="w-[65%] pt-12 pl-12 pr-16">
          
          {/* Profile Section */}
          <section className="mb-14">
            <h2 className="text-xl font-medium tracking-widest uppercase mb-6">Profile</h2>
            <p className="text-[11px] leading-relaxed text-gray-800">
              {data.personalInfo.summary || "A visual artist creates works of art using a variety of materials. As a visual artist, your duties may be to draw images, work with paint, develop murals, design in 3D, or create art with mixed media."}
            </p>
          </section>

          {/* Work Experience Section */}
          <section>
            <h2 className="text-xl font-medium tracking-widest uppercase mb-8">Work Experience</h2>
            <div className="space-y-12">
              {data.experiences?.map((exp: any, i: number) => (
                <div key={i} className="text-[11px]">
                  <h3 className="font-bold uppercase text-[12px] tracking-wide mb-1">
                    {exp.position || "Enter Your Job Position Here"}
                  </h3>
                  <p className="uppercase mb-2 text-gray-600">
                    {exp.company || "Company Name"} | {exp.startDate ? `${new Date(exp.startDate).getFullYear()} - ${exp.isCurrent ? 'Present' : new Date(exp.endDate).getFullYear()}` : "2015 - 2018"}
                  </p>
                  <p className="mb-3 leading-relaxed text-gray-800">
                    {exp.description || "creates works of art using a variety of materials. As a visual artist, your duties may be to draw images, work with paint, develop murals, design in 3D"}
                  </p>
                  {/* Points de puces (Simulés à partir de la description ou d'un champ dédié) */}
                  <ul className="list-disc ml-4 space-y-1 text-gray-800">
                    <li>Create artwork based on the creative concept decided for the exhibition.</li>
                    <li>Develop a creative concept for exhibit or sale.</li>
                    <li>Display completed artwork and oversee installation of artwork at venue or event.</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}