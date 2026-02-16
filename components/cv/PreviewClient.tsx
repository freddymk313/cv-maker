// "use client";
// import CvRenderer from "../templates/CvRenderer";

// export default function PreviewClient({ cv }: { cv: any }) {
//   return (
//     <div >
//          <CvRenderer cv={cv} />
//     </div>
//   );
// }

"use client";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import CvRenderer from "../templates/CvRenderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PreviewClient({ cv }: { cv: any }) {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = () => {
    if (!cvRef.current) return;

    const opt = {
      margin: 0,
      filename: `${cv.personalInfo.firstName}_${cv.personalInfo.lastName}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "px", format: [794, 1123], hotfixes: ["px_scaling"] },
    };

    html2pdf().set(opt).from(cvRef.current).save();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Button onClick={handleExportPdf} className="flex items-center gap-2">
        <Download size={16} />
        Export to PDF
      </Button>
      <div ref={cvRef}>
        <CvRenderer cv={cv} />
      </div>
    </div>
  );
}
