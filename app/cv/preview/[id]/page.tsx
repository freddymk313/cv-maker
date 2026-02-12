// import dbConnect from "@/lib/dbConnect";
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div
        className={`max-w-[21cm] mx-auto bg-white shadow-2xl min-h-[29.7cm] p-12 ${cv.templateId === "modern" ? "flex gap-8" : ""}`}
      >
        {/* EN-TÊTE */}
        <header className="border-b-2 border-blue-600 pb-4 mb-8">
          <h1 className="text-4xl font-bold uppercase">
            {cv.personalInfo.firstName} {cv.personalInfo.lastName}
          </h1>
          <p className="text-xl text-blue-600 font-medium">{cv.title}</p>
          <div className="mt-2 text-sm text-gray-600 flex gap-4">
            <span>{cv.personalInfo.email}</span>
            <span>{cv.personalInfo.phone}</span>
            <span>{cv.personalInfo.address}</span>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <div className="space-y-8">
          {/* SECTION EXPÉRIENCES */}
          <section>
            <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-2 mb-4">
              EXPÉRIENCES PROFESSIONNELLES
            </h2>
            <div className="space-y-4">
              {cv.experiences.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between font-bold">
                    <span>
                      {exp.position} - {exp.company}
                    </span>
                    <span className="text-gray-500 italic">
                      {new Date(exp.startDate).getFullYear()} -{" "}
                      {exp.isCurrent
                        ? "Présent"
                        : new Date(exp.endDate).getFullYear()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION FORMATION */}
          <section>
            <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-2 mb-4">
              FORMATION
            </h2>
            {cv.education.map((edu: any, i: number) => (
              <div key={i} className="mb-2">
                <span className="font-bold">{edu.degree}</span> | {edu.school} (
                {new Date(edu.endDate).getFullYear()})
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
