"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, PersonalInfoInput } from "@/lib/validations/cv";

interface Props {
  initialData?: any;
  onSubmit: (data: PersonalInfoInput) => void;
  isLoading: boolean;
}

export default function PersonalInfoForm({ initialData, onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData || {},
  });

  return (
    <form id="cv-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
          <input
            {...register("firstName")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.firstName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Ex: Jean"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
          <input
            {...register("lastName")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
              errors.lastName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Ex: Mbuyi"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email professionnel</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="jean.mbuyi@exemple.cd"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone (+243)</label>
          <input
            {...register("phone")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="081XXXXXXX"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Bio / Profil */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Résumé professionnel</label>
        <textarea
          {...register("bio")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Décrivez brièvement votre parcours et vos aspirations..."
        />
        <p className="text-gray-400 text-[10px] text-right">Max 500 caractères</p>
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Lien LinkedIn (Optionnel)</label>
        <input
          {...register("linkedin")}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="https://linkedin.com/in/username"
        />
      </div>
    </form>
  );
}