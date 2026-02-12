import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

export default function CvRenderer({ cv }: { cv: any }) {
  // On s'assure que le templateId existe, sinon "classic" par défaut
  const template = cv.templateId || "classic";

  return (
    <div className="bg-white shadow-2xl mx-auto my-10 print:my-0 print:shadow-none min-h-[29.7cm] w-[21cm] overflow-hidden">
      {template === "classic" && <ClassicTemplate data={cv} />}
      {template === "modern" && <ModernTemplate data={cv} />}
    </div>
  );
}