// src/components/cv/templates/CvRenderer.tsx
import Resume from "../Resume";
import BenjaminLeroyTemplate from "./BenjaminLeroyTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import SimpleModernTemplate from "./SimpleModernTemplate";

export default function CvRenderer({ cv }: { cv: any }) {
  const template = cv.templateId || "classic";

  return (
    /* Conteneur de la feuille A4 */
    <div 
      // className="bg-white shadow-2xl mx-auto print:my-0 print:shadow-none overflow-hidden ring-1 ring-gray-200"
      // style={{ 
      //   width: "21cm", 
      //   minHeight: "29.7cm",
      //   height: "fit-content" 
      // }}
      className="min-h-screen bg-background py-10 flex justify-center"
    >
      {template === "classic" && <ClassicTemplate data={cv} />}
      {template === "modern" && <Resume />}
      {template === "creative" && <ModernTemplate data={cv} />}
    </div>
  );
}