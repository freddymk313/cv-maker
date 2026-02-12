// app/cv/preview/[id]/page.tsx
import PreviewClient from "@/components/cv/PreviewClient";
import dbConnect from "@/lib/mongodb";
import Cv from "@/models/Cv";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CvPreviewPage({ params }: Props) {
  const { id } = await params;

  await dbConnect();

  const cvData = await Cv.findOne({ userId: id }).lean();

  if (!cvData) return notFound();

  // --- LA CORRECTION ICI ---
  // On transforme l'objet Mongoose en objet JS simple (JSON-safe)
  // Cela convertit les ObjectId en String et supprime les méthodes internes
  const serializedCv = JSON.parse(JSON.stringify(cvData));

  return <PreviewClient cv={serializedCv} />;
}