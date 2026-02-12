// import dbConnect from "@/lib/dbConnect";
import CvRenderer from "@/components/templates/CvRenderer";
import dbConnect from "@/lib/mongodb";
import Cv from "@/models/Cv";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CvPreviewPage({ params }: Props) {
  // 2. On attend (await) que les paramètres soient résolus
  const { id } = await params;

  await dbConnect();

  console.log("ID recherché dans l'URL :", id); // Maintenant ça affichera le bon ID !

  // 3. On utilise l'id "attendu" pour la recherche
  const cv = await Cv.findOne({ userId: id }).lean();

  console.log("CV trouvé en base :", cv);

  if (!cv) return notFound();

  return (
   <div className="min-h-screen bg-zinc-800 flex justify-center py-10 overflow-x-auto">
    <CvRenderer cv={cv} />
  </div>
  );
}
