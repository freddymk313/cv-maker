import { forwardRef } from "react";
import SimpleModel from "../model/SimpleModel";
import ResumeTwo from "../ResumeTwo";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

const CvRenderer = forwardRef<HTMLDivElement, { cv: any }>(({ cv }, ref) => {
  const template = cv.templateId || "classic";

  return (
    <div 
      className="min-h-[100vh] py-10 flex justify-center"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* C'est cet élément qui sera capturé par le PDF */}
      <div ref={ref} className="bg-white">
        {template === "classic" && <ClassicTemplate data={cv} />}
        {template === "modern" && <SimpleModel cv={cv} />}
        {template === "creative" && <ModernTemplate data={cv} />}
      </div>
    </div>
  );
});

CvRenderer.displayName = "CvRenderer";
export default CvRenderer;