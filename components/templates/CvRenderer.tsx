// src/components/cv/templates/CvRenderer.tsx
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

export default function CvRenderer({ cv }: { cv: any }) {
  // C'est ici qu'on utilise le switch
  switch (cv.templateId) {
    case "classic":
      return <ClassicTemplate data={cv} />;
    case "modern":
      return <ModernTemplate data={cv} />;
    default:
      return <ClassicTemplate data={cv} />;
  }
}