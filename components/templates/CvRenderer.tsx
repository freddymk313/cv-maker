import { forwardRef } from "react";
import SimpleModel from "../model/SimpleModel";
import ResumeTwo from "../ResumeTwo";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import ModernModel from "../model/ModernModel";
import ModelTwo from "../model/ModelTwo";

const CvRenderer = forwardRef<HTMLDivElement, { cv: any }>(({ cv }, ref) => {
  const template = cv.templateId || "classic";

  return (
    <div className="min-h-screen py-10 flex justify-center bg-[#f5f5f5]">
      <div ref={ref}>
        {template === "classic" && <SimpleModel cv={cv} />}
        {template === "modern" && <ModelTwo cv={cv} />}
        {template === "creative" && <ModernModel cv={cv} />}
      </div>
    </div>
  );
});

CvRenderer.displayName = "CvRenderer";
export default CvRenderer;