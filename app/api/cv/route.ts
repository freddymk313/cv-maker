import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Cv from "@/models/Cv";
import dbConnect from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const { step, data } = await req.json();
    await dbConnect();

    const allowedSteps = [
      "personalInfo",
      "experiences",
      "education",
      "skills",
      "languages",
      "template"
    ];

    if (!allowedSteps.includes(step)) {
      return NextResponse.json({ message: "Step invalide" }, { status: 400 });
    }

    const updateData: any = {};

    switch (step) {
      case "personalInfo":
        updateData.personalInfo = data;
        break;

      case "experiences":
        updateData.experiences = data;
        break;

      case "education":
        updateData.education = data;
        break;

      case "skills":
        updateData.skills = data;
        break;

      case "languages":
        updateData.languages = data;
        break;

      case "template":
        updateData.templateId = data.templateId;
        break;
    }

    const cv = await Cv.findOneAndUpdate(
      { userId: session.user.id },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ message: "Sauvegardé", cv });
  } catch (error: any) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// Route GET pour récupérer le CV existant au chargement du stepper
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Non autorisé" }, { status: 401 });

    await dbConnect();
    const cv = await Cv.findOne({ userId: session.user.id });

    return NextResponse.json(cv || {});
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}