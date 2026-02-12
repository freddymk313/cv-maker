"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, FilePlus, User as UserIcon, Briefcase, Eye } from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <p className="text-xl font-semibold text-gray-700">Vous n'êtes pas connecté.</p>
        <Link href="/login" className="text-blue-600 hover:underline">Aller à la page de connexion</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
             <Briefcase className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Job<span className="text-blue-600">RDC</span></span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{session.user.role.toLowerCase()}</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="md:flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bonjour, {session.user.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-gray-500 mt-2">
                Prêt à trouver votre prochaine opportunité en RDC ?
              </p>
            </div>
            
            {/* ACTIONS CV */}
            {session.user.role === "CANDIDAT" && (
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                {/* BOUTON PREVIEW */}
                <Link 
                  href={`/cv/preview/${session.user.id}`} 
                  target="_blank" // Ouvre dans un nouvel onglet
                  className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                >
                  <Eye className="w-5 h-5 text-gray-500" />
                  Voir mon CV
                </Link>

                {/* BOUTON CRÉER / MODIFIER */}
                <Link 
                  href="/cv/create" 
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-semibold"
                >
                  <FilePlus className="w-5 h-5" />
                  Modifier mon CV
                </Link>
              </div>
            )}
          </div>

          <hr className="my-8 border-gray-100" />

          {/* GRILLE DE RÉSUMÉ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Statut Profil</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">Complet à 40%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wider">Candidatures</p>
              <p className="text-2xl font-bold text-green-900 mt-1">0 envoyée</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wider">Offres suggérées</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">12 nouvelles</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}