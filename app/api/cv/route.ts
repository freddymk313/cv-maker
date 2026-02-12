import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import dbConnect from "@/lib/dbConnect";
import Cv from "@/models/Cv";
import dbConnect from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Vérification de l'authentification
    if (!session || !session.user) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    // 2. Mise à jour ou Création (Upsert)
    // On utilise l'ID de l'utilisateur de la session pour la sécurité
    const cv = await Cv.findOneAndUpdate(
      { userId: session.user.id },
      { 
        $set: { 
          ...data, 
          userId: session.user.id // On force l'ID utilisateur
        } 
      },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ 
      message: "Progression sauvegardée", 
      cv 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Erreur CV API:", error);
    return NextResponse.json({ 
      message: "Erreur lors de la sauvegarde", 
      error: error.message 
    }, { status: 500 });
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