"use client"; // <--- TRÈS IMPORTANT

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Chargement...</p>;

  if (!session) return <p>Vous n'êtes pas connecté.</p>;

  return (
    <div>
      <h1>Bienvenue, {session.user.name}</h1>
      <p>Rôle : {session.user.role}</p>
    </div>
  );
}