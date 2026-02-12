import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await dbConnect();

    // 1. Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 });
    }

    // 2. Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Créer l'utilisateur (Rôle CANDIDAT par défaut selon ton modèle)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "CANDIDAT" 
    });

    return NextResponse.json({ message: "Utilisateur créé avec succès" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de l'inscription" }, { status: 500 });
  }
}