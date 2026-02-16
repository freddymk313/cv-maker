import React from 'react';

interface Education {
  school: string;
  location: string;
  degree: string;
  years: string;
}

interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
  bullets: string[];
}

interface ResumeProps {
  data: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    profile: string;
    education: Education[];
    skills: string[];
    experience: Experience[];
  };
}

const Resume = ({ data }: ResumeProps) => {
  return (
    <div className="bg-gray-100 p-8 min-h-screen flex justify-center">
      {/* Conteneur Format A4 */}
      <div className="bg-white shadow-2xl w-[210mm] h-[297mm] p-[15mm] flex flex-col text-gray-800 print:shadow-none print:m-0">
        
        {/* HEADER : Nom à droite */}
        <header className="flex justify-end mb-4">
          <div className="text-right">
            <h1 className="text-5xl font-light tracking-[0.2em] uppercase leading-tight">
              {data.name} <br /> 
              <span className="font-semibold">{data.lastName}</span>
            </h1>
          </div>
        </header>

        {/* Ligne horizontale supérieure */}
        <div className="border-t border-black w-full mb-8"></div>

        <div className="flex flex-1 gap-10">
          
          {/* COLONNE GAUCHE (1/3) */}
          <aside className="w-1/3 flex flex-col gap-8">
            {/* Contact */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-5 text-center">📞</span> {data.phone}
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 text-center">✉️</span> {data.email}
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 text-center">📍</span> {data.address}
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 text-center">🌐</span> {data.website}
              </div>
            </div>

            {/* Education */}
            <section>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-2">Education</h2>
              <div className="border-t border-gray-400 w-full mb-4"></div>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4 text-sm">
                  <p className="font-bold uppercase">{edu.school}</p>
                  <p className="text-gray-600 italic">{edu.location}</p>
                  <p>{edu.degree}</p>
                  <p>{edu.years}</p>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-2">Skills</h2>
              <div className="border-t border-gray-400 w-full mb-4"></div>
              <ul className="text-sm space-y-1">
                {data.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </section>
          </aside>

          {/* SÉPARATEUR VERTICAL */}
          <div className="border-l border-gray-300"></div>

          {/* COLONNE DROITE (2/3) */}
          <main className="w-2/3 flex flex-col gap-8">
            {/* Profile */}
            <section>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-4">Profile</h2>
              <p className="text-sm leading-relaxed text-justify">
                {data.profile}
              </p>
            </section>

            {/* Work Experience */}
            <section>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-4">Work Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <h3 className="font-bold uppercase text-md">{exp.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{exp.company} | {exp.years}</p>
                  <p className="text-sm mb-2 italic">{exp.description}</p>
                  <ul className="list-disc ml-5 text-sm space-y-1">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Resume;