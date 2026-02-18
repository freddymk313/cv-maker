// "use client";

// import { useRef } from "react";
// import CvRenderer from "../templates/CvRenderer";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";

// export default function PreviewClient({ cv }: { cv: any }) {
//   const cvRef = useRef<HTMLDivElement>(null);

//   const handleDownloadPdf = async () => {
//     if (!cvRef.current) return;

//     try {
//       const html2pdf = (await import("html2pdf.js")).default;

//       const opt = {
//         margin: 0,
//         filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           backgroundColor: '#ffffff',
//           // CE BLOC EST LA SOLUTION :
//           onclone: (clonedDoc: Document) => {
//             // On parcourt tous les éléments du CV cloné pour le PDF
//             const elements = clonedDoc.getElementsByTagName("*");
//             for (let i = 0; i < elements.length; i++) {
//               const el = elements[i] as HTMLElement;
//               const style = window.getComputedStyle(el);
              
//               // Si une couleur utilise une fonction non supportée (lab, oklch), 
//               // on la remplace par du HEX simple
//               if (style.color.includes('lab') || style.color.includes('oklch')) {
//                 el.style.color = '#1a1a1a'; 
//               }
//               if (style.backgroundColor.includes('lab') || style.backgroundColor.includes('oklch')) {
//                 // Si c'est le fond du CV, on met blanc, sinon on met transparent ou une couleur fixe
//                 el.style.backgroundColor = el.classList.contains('bg-white') ? '#ffffff' : 'transparent';
//               }
//               if (style.borderColor.includes('lab') || style.borderColor.includes('oklch')) {
//                 el.style.borderColor = '#e5e7eb';
//               }
//             }
//           }
//         },
//         jsPDF: {
//           unit: "px",
//           format: [794, 1123],
//           hotfixes: ["px_scaling"],
//         },
//       };

//       await html2pdf().set(opt).from(cvRef.current).save();
//     } catch (error) {
//       console.error("Erreur lors de la génération du PDF :", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen">
//       <div className="fixed bottom-10 right-10 z-50">
//         <Button onClick={handleDownloadPdf} className="bg-black text-white">
//           <Download className="mr-2" size={18} />
//           Télécharger en PDF
//         </Button>
//       </div>

//       <CvRenderer cv={cv} ref={cvRef} />
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
import CvRenderer from "../templates/CvRenderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PreviewClient({ cv }: { cv: any }) {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!cvRef.current) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          // CE BLOC GÈRE LA CORRECTION DES COULEURS "LAB"
          onclone: (clonedDoc: Document) => {
            const elements = clonedDoc.getElementsByTagName("*");
            for (let i = 0; i < elements.length; i++) {
              const el = elements[i] as HTMLElement;
              const style = window.getComputedStyle(el);
              
              if (style.color.includes('lab') || style.color.includes('oklch')) {
                el.style.color = '#1a1a1a'; 
              }
              if (style.backgroundColor.includes('lab') || style.backgroundColor.includes('oklch')) {
                el.style.backgroundColor = el.classList.contains('bg-white') ? '#ffffff' : 'transparent';
              }
              if (style.borderColor.includes('lab') || style.borderColor.includes('oklch')) {
                el.style.borderColor = '#e5e7eb';
              }
            }
          }
        },
        jsPDF: {
          unit: "px",
          format: [794, 1123],
          hotfixes: ["px_scaling"],
        },
        // CE BLOC GÈRE LA SÉPARATION PROPRE DES PAGES
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'] 
        }
      };

      await html2pdf().set(opt).from(cvRef.current).save();
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      {/* Bouton de téléchargement flottant */}
      <div className="fixed bottom-10 right-10 z-50">
        <Button 
          onClick={handleDownloadPdf} 
          className="bg-black text-white shadow-2xl hover:bg-gray-800 transition-all"
        >
          <Download className="mr-2" size={18} />
          Télécharger en PDF
        </Button>
      </div>

      {/* Rendu du CV */}
      <div className="py-10">
        <CvRenderer cv={cv} ref={cvRef} />
      </div>
    </div>
  );
}