import { forwardRef } from "react";
// import profilePhoto from "@/assets/profile-photo.png";

const Resume = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="w-[794px] h-[1123px] bg-white mx-auto shadow-lg flex overflow-hidden font-sans">
      
      {/* Sidebar Gauche (Noire) */}
      <div className="w-[300px] bg-black text-white flex-shrink-0 flex flex-col">
        {/* Photo de profil */}
        <div className="w-full h-[320px] overflow-hidden">
          <img
            src="https://via.placeholder.com/300x300?text=Photo" // Remplacez par profilePhoto si vous avez une image locale
            alt="Benjamin Leroy"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Coordonnées (Sans icônes, texte simple) */}
        <div className="px-10 pt-12 space-y-1.5 text-[13px] font-light opacity-90">
          <p>Paris, France</p>
          <p>hello@reallygreatsite.com</p>
          <p>+123-456-7890</p>
          <p>www.reallygreatsite.com</p>
        </div>

        {/* Section Langues */}
        <div className="px-10 pt-12">
          <SidebarHeading>LANGUES</SidebarHeading>
          <div className="mt-4 space-y-1 text-[13px] font-light opacity-90">
            <p>Anglais - courant</p>
            <p>Espagnol - intermédiaire</p>
          </div>
        </div>

        {/* Section Compétences */}
        <div className="px-10 pt-12">
          <SidebarHeading>COMPÉTENCES</SidebarHeading>
          <div className="mt-4 space-y-3 text-[13px] font-light opacity-90 leading-snug">
            <p>Langages de programmation</p>
            <p>Bases de données</p>
            <p>Systèmes d'exploitation</p>
            <p>Excellentes compétences en résolution de problèmes et en dépannage</p>
          </div>
        </div>

        {/* Section Centres d'intérêts */}
        <div className="px-10 pt-12">
          <SidebarHeading>CENTRES D'INTÉRÊTS</SidebarHeading>
          <div className="mt-4 space-y-1 text-[13px] font-light opacity-90">
            <p>Technologie</p>
            <p>Photographie</p>
            <p>Lecture</p>
          </div>
        </div>
      </div>

      {/* Colonne Droite (Contenu) */}
      <div className="flex-1 px-12 pt-16 pb-12 flex flex-col bg-white">
        
        {/* Nom et Prénom */}
        <header>
          <h1 className="text-black font-black text-[56px] leading-[0.9] tracking-tighter">
            BENJAMIN<br />LEROY
          </h1>
          <p className="mt-6 text-[#7d94ad] font-bold text-base tracking-[0.1em] uppercase">
            DÉVELOPPEUR WEB
          </p>
        </header>

        {/* Profil / Résumé */}
        <div className="mt-6">
          <p className="text-[13px] text-gray-700 leading-relaxed max-w-[90%]">
            Développeur web autonome et rigoureux, capable de concevoir, maintenir et optimiser
            des solutions digitales adaptées aux besoins utilisateurs, en respectant les délais
            et la qualité attendue.
          </p>
        </div>

        {/* Expériences Professionnelles */}
        <div className="mt-12">
          <SectionHeading>EXPÉRIENCES PROFESSIONNELLES</SectionHeading>
          <div className="mt-6 space-y-8">
            <WorkItem
              title="DÉVELOPPEUR FULL STACK"
              details="Messagem, Paris, France | Février 2017 - Présent"
              bullets={[
                "Développement et maintenance d'applications web.",
                "Collaboration avec les équipes de conception afin de créer des interfaces utilisateur intuitives.",
                "Optimisation des performances des applications et résolution des bugs.",
                "Mise en place de tests automatisés pour garantir la qualité du code.",
              ]}
            />
            <WorkItem
              title="ADMINISTRATEUR SYSTÈME ET RÉSEAU"
              details="Audio Stream - Lyon, France | Août 2013 - Janvier 2017"
              bullets={[
                "Administration des infrastructures réseau et des serveurs.",
                "Implémentation de solutions de sécurité.",
                "Suivi des performances système et résolution des problèmes techniques.",
                "Contribution à la planification et à l'exécution de projets d'infrastructure.",
              ]}
            />
          </div>
        </div>

        {/* Formations */}
        <div className="mt-12">
          <SectionHeading>FORMATIONS</SectionHeading>
          <div className="mt-6 space-y-5">
            <EducationItem
              degree="MASTER EN INFORMATIQUE"
              school="École Amédé Autran, Paris, France | 2010 - 2012"
            />
            <EducationItem
              degree="LICENCE EN INFORMATIQUE"
              school="École Amédé Autran, Paris, France | 2007 - 2010"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Resume.displayName = "Resume";

/* Composants Internes pour la structure */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-black font-black text-xl tracking-tight border-none mb-2">
    {children}
  </h2>
);

const SidebarHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-white font-black text-lg tracking-tight">
    {children}
  </h2>
);

const WorkItem = ({ title, details, bullets }: { title: string; details: string; bullets: string[] }) => (
  <div className="flex flex-col">
    <h3 className="text-[14px] font-bold text-black uppercase tracking-tight">{title}</h3>
    <p className="text-[12px] text-gray-400 mt-1 font-medium">{details}</p>
    <ul className="mt-3 space-y-1.5">
      {bullets.map((bullet, idx) => (
        <li key={idx} className="text-[13px] text-gray-700 flex items-start">
          <span className="mr-2 mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0" />
          {bullet}
        </li>
      ))}
    </ul>
  </div>
);

const EducationItem = ({ degree, school }: { degree: string; school: string }) => (
  <div>
    <h3 className="text-[14px] font-bold text-black uppercase tracking-tight">{degree}</h3>
    <p className="text-[12px] text-gray-400 mt-1 font-medium">{school}</p>
  </div>
);

export default Resume;