// src/components/cv/templates/CvRenderer.tsx
import BenjaminLeroyTemplate from "./BenjaminLeroyTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import SimpleModernTemplate from "./SimpleModernTemplate";

export default function CvRenderer({ cv }: { cv: any }) {
  const template = cv.templateId || "classic";

  return (
    /* Conteneur de la feuille A4 */
    <div 
      className="bg-white shadow-2xl mx-auto print:my-0 print:shadow-none overflow-hidden ring-1 ring-gray-200"
      style={{ 
        width: "21cm", 
        minHeight: "29.7cm",
        height: "fit-content" 
      }}
    >
      {template === "classic" && <ClassicTemplate data={cv} />}
      {template === "modern" && <BenjaminLeroyTemplate data={cv} />}
      {template === "creative" && <ModernTemplate data={cv} />}
    </div>
  );
}