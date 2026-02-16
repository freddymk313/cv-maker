// src/components/cv/templates/CvRenderer.tsx
import Resume from "../Resume";
import ResumeTree from "../model/SimpleModel";
import ResumeTwo from "../ResumeTwo";
import BenjaminLeroyTemplate from "./BenjaminLeroyTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import SimpleModernTemplate from "./SimpleModernTemplate";
import SimpleModel from "../model/SimpleModel";

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
      className="min-h-[100vh] py-10 flex justify-center"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {template === "classic" && <ClassicTemplate data={cv} />}
      {template === "modern" && <SimpleModel cv={cv} />}
      {template === "creative" && <ModernTemplate data={cv} />}
    </div>
  );
}