"use client";
import CvRenderer from "../templates/CvRenderer";

 // Indique que c'est un Client Component

// import CvRenderer from "./templates/CvRenderer";

export default function PreviewClient({ cv }: { cv: any }) {
  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4 flex flex-col items-center">
      {/* Barre d'outils avec le bouton d'impression */}
      <div className="mb-6 flex gap-4 print:hidden">
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
        >
          Imprimer / PDF
        </button>
      </div>

      {/* Zone de rendu avec mise à l'échelle pour les petits écrans */}
      <div className="w-full flex justify-center overflow-x-auto pb-10 custom-scrollbar">
        <div className="origin-top scale-[0.55] sm:scale-[0.75] md:scale-[0.9] lg:scale-100 transition-transform duration-300">
           <CvRenderer cv={cv} />
        </div>
      </div>

      {/* Style CSS pour l'impression */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\:hidden { display: none !important; }
          .shadow-2xl { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}