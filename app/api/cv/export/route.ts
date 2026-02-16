// app/api/cv/export/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import dbConnect from "@/lib/dbConnect";
import Cv from "@/models/Cv";
import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const cv = await Cv.findOne({ userId: session.user.id });
    if (!cv) return NextResponse.json({ message: "CV introuvable" }, { status: 404 });

    // 1️⃣ Charger le PDF template
    const templateBytes = fs.readFileSync(""); // place ton PDF dans /public ou /tmp
    const pdfDoc = await PDFDocument.load(templateBytes);

    const pages = pdfDoc.getPages();
    const page = pages[0]; // si ton CV n'a qu'une page, sinon itère

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 2️⃣ Placer le texte aux coordonnées fixes
    page.drawText(`${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`, {
      x: 50,
      y: 700,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(cv.personalInfo.email || "", { x: 50, y: 680, size: 12, font, color: rgb(0,0,0) });
    page.drawText(cv.personalInfo.phone || "", { x: 50, y: 665, size: 12, font, color: rgb(0,0,0) });

    // Ajouter expériences (exemple simplifié)
    let currentY = 630;
    cv.experiences.forEach((exp: any) => {
      page.drawText(`${exp.position} - ${exp.company} (${exp.startDate} - ${exp.endDate || "Présent"})`, {
        x: 50,
        y: currentY,
        size: 12,
        font,
        color: rgb(0,0,0)
      });
      currentY -= 15;
    });

    // 3️⃣ Générer le PDF final
    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cv_${cv.personalInfo.firstName}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
  }
}
