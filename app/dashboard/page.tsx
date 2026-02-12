"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session?.user.role === "HR_AGENT") {
    return <p>Bienvenue Recruteur de l'entreprise {session.user.companyId}</p>;
  }

  return <p>Bienvenue Candidat {session?.user.name}</p>;
}