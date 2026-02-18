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
//           // CE BLOC GÈRE LA CORRECTION DES COULEURS "LAB"
//           onclone: (clonedDoc: Document) => {
//             const elements = clonedDoc.getElementsByTagName("*");
//             for (let i = 0; i < elements.length; i++) {
//               const el = elements[i] as HTMLElement;
//               const style = window.getComputedStyle(el);
              
//               if (style.color.includes('lab') || style.color.includes('oklch')) {
//                 el.style.color = '#1a1a1a'; 
//               }
//               if (style.backgroundColor.includes('lab') || style.backgroundColor.includes('oklch')) {
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
//         // CE BLOC GÈRE LA SÉPARATION PROPRE DES PAGES
//         pagebreak: { 
//           mode: ['avoid-all', 'css', 'legacy'] 
//         }
//       };

//       await html2pdf().set(opt).from(cvRef.current).save();
//     } catch (error) {
//       console.error("Erreur lors de la génération du PDF :", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen">
//       {/* Bouton de téléchargement flottant */}
//       <div className="fixed bottom-10 right-10 z-50">
//         <Button 
//           onClick={handleDownloadPdf} 
//           className="bg-black text-white shadow-2xl hover:bg-gray-800 transition-all"
//         >
//           <Download className="mr-2" size={18} />
//           Télécharger en PDF
//         </Button>
//       </div>

//       {/* Rendu du CV */}
//       <div className="py-10">
//         <CvRenderer cv={cv} ref={cvRef} />
//       </div>
//     </div>
//   );
// }



// Well
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
        // AJOUT DE MARGE : Cela crée l'espace top sur la page 2 automatiquement
        margin: [40, 0, 40, 0], 
        filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
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
                el.style.borderColor = '#262626';
              }
            }
          }
        },
        jsPDF: {
          unit: "px",
          format: [794, 1123],
          hotfixes: ["px_scaling"],
        },
        // GESTION INTELLIGENTE DES COUPURES
        pagebreak: { 
          // mode: ['avoid-all', 'css', 'legacy'],
          mode: ['css', 'legacy'],
          before: '.page-break' // Si tu veux forcer une coupure manuellement un jour
        }
      };

      await html2pdf().set(opt).from(cvRef.current).save();
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="fixed bottom-10 right-10 z-50">
        <Button onClick={handleDownloadPdf} className="bg-black text-white shadow-xl">
          <Download className="mr-2" size={18} />
          Télécharger en PDF
        </Button>
      </div>

      <div className="py-10">
        <CvRenderer cv={cv} ref={cvRef} />
      </div>
    </div>
  );
}





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
//         // La marge [Haut, Gauche, Bas, Droite] assure que la Page 2 ne commence pas collée au bord
//         margin: [40, 0, 40, 0], 
//         filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           backgroundColor: '#ffffff',
//           onclone: (clonedDoc: Document) => {
//             const elements = clonedDoc.getElementsByTagName("*");
//             for (let i = 0; i < elements.length; i++) {
//               const el = elements[i] as HTMLElement;
              
//               // 1. Nettoyage des couleurs LAB/OKLCH pour éviter les erreurs de rendu
//               const style = window.getComputedStyle(el);
//               if (style.color.includes('lab') || style.color.includes('oklch')) {
//                 el.style.color = '#1a1a1a'; 
//               }
//               if (style.backgroundColor.includes('lab') || style.backgroundColor.includes('oklch')) {
//                 el.style.backgroundColor = el.classList.contains('bg-white') ? '#ffffff' : 'transparent';
//               }

//               // 2. CORRECTION DU BLOCAGE : On force les éléments à accepter la coupure
//               // Si un élément a "display: flex", il empêche souvent la coupure du texte sur 2 pages
//               if (el.classList.contains('experience-item') || el.tagName === 'P') {
//                 el.style.display = 'block'; // On repasse en block pour permettre la coupure
//                 el.style.breakInside = 'auto';
//                 el.style.pageBreakInside = 'auto';
//               }
//             }
//           }
//         },
//         jsPDF: {
//           unit: "px",
//           format: [794, 1123],
//           hotfixes: ["px_scaling"],
//         },
//         // GESTION DES COUPURES : On autorise explicitement la coupure au milieu des éléments
//         pagebreak: { 
//           mode: ['avoid-all', 'css', 'legacy'],
//           avoid: ['h2', 'header', '.SectionHeading'] // On évite de couper juste après un titre
//         }
//       };

//       await html2pdf().set(opt).from(cvRef.current).save();
//     } catch (error) {
//       console.error("Erreur lors de la génération du PDF :", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen">
//       <div className="fixed bottom-10 right-10 z-50">
//         <Button onClick={handleDownloadPdf} className="bg-black text-white shadow-xl">
//           <Download className="mr-2" size={18} />
//           Télécharger en PDF
//         </Button>
//       </div>

//       <div className="py-10">
//         <CvRenderer cv={cv} ref={cvRef} />
//       </div>
//     </div>
//   );
// }


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
//         margin: [40, 0, 40, 0], 
//         filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           backgroundColor: '#ffffff',
//           onclone: (clonedDoc: Document) => {
//             // Supprimer les variables CSS de Tailwind qui utilisent OKLCH/LAB
//             const elements = clonedDoc.getElementsByTagName("*");
//             for (let i = 0; i < elements.length; i++) {
//               const el = elements[i] as HTMLElement;
              
//               // On force les couleurs en HEX pur sans lire le style calculé
//               if (el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'LI') {
//                  el.style.color = '#404040'; 
//               }
//               if (el.tagName === 'H1' || el.tagName === 'H2') {
//                  el.style.color = '#1a1a1a';
//               }
              
//               // CRUCIAL : Forcer l'affichage block pour permettre la coupure entre les pages
//               // Les Flexbox ne se coupent pas bien en PDF
//               if (el.style.display === 'flex' || el.classList.contains('flex')) {
//                 el.style.display = 'block';
//               }
//             }
//           }
//         },
//         jsPDF: { unit: "px", format: [794, 1123], hotfixes: ["px_scaling"] },
//         pagebreak: { 
//           mode: ['avoid-all', 'css', 'legacy']
//         }
//       };

//       await html2pdf().set(opt).from(cvRef.current).save();
//     } catch (error) {
//       console.error("Erreur PDF:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen">
//       <div className="fixed bottom-10 right-10 z-50">
//         <Button onClick={handleDownloadPdf} className="bg-black text-white shadow-xl">
//           <Download className="mr-2" size={18} />
//           Télécharger en PDF
//         </Button>
//       </div>
//       <div className="py-10">
//         <CvRenderer cv={cv} ref={cvRef} />
//       </div>
//     </div>
//   );
// }



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
//         margin: [40, 0, 40, 0], 
//         filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           // Supprime l'ombre et les couleurs problématiques avant le rendu
//           onclone: (clonedDoc: Document) => {
//             const elements = clonedDoc.querySelectorAll("*");
//             elements.forEach((node) => {
//               const el = node as HTMLElement;
//               // On force des couleurs simples pour éviter l'erreur LAB
//               if (el.style.color.includes('var') || el.classList.length > 0) {
//                  // On ne nettoie QUE le texte pour ne pas casser le rendu
//                  if (el.tagName === 'P' || el.tagName === 'SPAN') el.style.color = '#404040';
//                  if (el.tagName.startsWith('H')) el.style.color = '#1a1a1a';
//               }
//               // Désactiver les ombres qui utilisent souvent du LAB
//               el.style.boxShadow = "none";
//               el.style.textShadow = "none";
//             });
//           }
//         },
//         jsPDF: { unit: "px", format: [794, 1123], hotfixes: ["px_scaling"] },
//         pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
//       };

//       // On cible uniquement le contenu interne du CV pour éviter de scanner la page entière
//       await html2pdf().set(opt).from(cvRef.current).save();
//     } catch (error) {
//       console.error("Erreur PDF:", error);
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

//       <div className="py-10">
//         {/* Le ref est ici, html2pdf ne regardera QUE ce qui est dedans */}
//         <div ref={cvRef}>
//           <CvRenderer cv={cv} />
//         </div>
//       </div>
//     </div>
//   );
// }