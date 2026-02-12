"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterInput } from "@/lib/validations/auth";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // Inscription réussie -> On envoie vers le login
      router.push("/login?success=Account created");
    } else {
      const errorData = await res.json();
      setError(errorData.message || "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Créer un compte Candidat</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom complet</label>
          <input {...register("name")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex: Jean Mukendi" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email")} type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="jean@exemple.cd" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input {...register("password")} type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="••••••••" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}