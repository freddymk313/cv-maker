import dbConnect from "@/lib/mongodb";
import Cv from "@/models/Cv";
import CvRenderer from "./CvRenderer";

export default async function PreviewPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const cv = await Cv.findOne({ userId: params.id }).lean();

  if (!cv) return <p>CV introuvable</p>;

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <div className="max-w-[21cm] mx-auto shadow-2xl bg-white">
        {/* On appelle le moteur de rendu qui choisira le bon switch */}
        <CvRenderer cv={cv} />
      </div>
    </div>
  );
}