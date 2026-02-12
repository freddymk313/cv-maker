"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Star } from "lucide-react";
import { skillsSchema, SkillsInput } from "@/lib/validations/cv";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function SkillsForm({ initialData, onSubmit, isLoading }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<SkillsInput>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: initialData?.length > 0 ? initialData : [{ name: "", level: 3 }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <form id="cv-form" onSubmit={handleSubmit((data) => onSubmit(data.skills))} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            
            {/* Nom de la compétence */}
            <div className="flex-1 min-w-[200px]">
              <input
                {...register(`skills.${index}.name`)}
                className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="Ex: Management, React, Comptabilité..."
              />
              {errors.skills?.[index]?.name && (
                <p className="text-red-500 text-[10px] mt-1">{errors.skills[index]?.name?.message}</p>
              )}
            </div>

            {/* Niveau (1 à 5) */}
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-blue-700 mr-2">Niveau:</span>
              <select 
                {...register(`skills.${index}.level`, { valueAsNumber: true })}
                className="bg-transparent border-none text-blue-800 text-sm font-bold focus:ring-0 outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} / 5</option>
                ))}
              </select>
            </div>

            {/* Bouton Supprimer */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", level: 3 })}
        className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
      >
        <Plus className="w-4 h-4" />
        Ajouter une compétence
      </button>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Conseil :</strong> Indiquez des compétences clés recherchées par les recruteurs en RDC (ex: logiciels spécifiques, permis de conduire, ou gestion d'équipe).
        </p>
      </div>
    </form>
  );
}