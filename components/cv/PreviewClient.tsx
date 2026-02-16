"use client";

import { useRef } from "react";
import CvRenderer from "../templates/CvRenderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PreviewClient({ cv }: { cv: any }) {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = cvRef.current;
    if (!element) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      // Create a clone and remove all stylesheets to prevent lab() colors
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Remove all style tags and links to prevent Tailwind-generated lab() colors
      const styleTags = clonedElement.querySelectorAll('style, link[rel="stylesheet"]');
      styleTags.forEach(tag => tag.remove());
      
      // Apply inline HEX colors to all elements
      const applyHexColors = (el: any) => {
        const computedStyle = window.getComputedStyle(el);
        const colorProps = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
        
        colorProps.forEach(prop => {
          let value = computedStyle[prop as any];
          if (value && value.includes('lab(')) {
            el.style[prop] = '#000000';
          } else if (value && (value.includes('rgb') || value.includes('hsl'))) {
            // Convert any computed color to hex fallback
            const rgbMatch = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (rgbMatch) {
              const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
              const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
              const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
              el.style[prop] = `#${r}${g}${b}`;
            }
          }
        });
        
        // Recursively apply to children
        Array.from(el.children).forEach((child: any) => applyHexColors(child));
      };
      
      applyHexColors(clonedElement);

      const opt = {
        margin: 0,
        filename: `CV_${cv.personalInfo?.lastName || "export"}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        },
        jsPDF: {
          unit: "px",
          format: [794, 1123] as [number, number],
          hotfixes: ["px_scaling"],
        },
      };

      // Use the cloned element with inline styles
      html2pdf().set(opt).from(clonedElement).save();
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-10 bg-gray-100 min-h-screen">
      {/* Bouton */}
      <div className="fixed bottom-10 right-10 z-50">
        <Button
          onClick={handleDownloadPdf}
          className="shadow-2xl flex gap-2 items-center bg-black text-white hover:bg-gray-800"
        >
          <Download size={18} />
          Télécharger en PDF
        </Button>
      </div>

      {/* Rendu du CV */}
      <div ref={cvRef}>
        <CvRenderer cv={cv} />
      </div>
    </div>
  );
}
