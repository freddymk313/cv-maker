"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Globe } from "lucide-react";
import { languagesSchema, LanguagesInput } from "@/lib/validations/cv";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const levels = ["Débutant", "Intermédiaire", "Avancé", "Langue maternelle"];

export default function LanguagesForm({ initialData, onSubmit, isLoading }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<LanguagesInput>({
    resolver: zodResolver(languagesSchema),
    defaultValues: {
      languages: initialData?.length > 0 ? initialData : [{ language: "", level: "Intermédiaire" }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <form id="cv-form" onSubmit={handleSubmit((data) => onSubmit(data.languages))} className="space-y-4">
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
              <Globe className="w-5 h-5" />
            </div>

            {/* Nom de la langue */}
            <div className="flex-1">
              <input
                {...register(`languages.${index}.language`)}
                className="w-full px-3 py-2 border-none focus:ring-0 outline-none font-medium placeholder:text-gray-300"
                placeholder="Ex: Français, Anglais, Lingala..."
              />
              {errors.languages?.[index]?.language && (
                <p className="text-red-500 text-[10px] pl-3">{errors.languages[index]?.language?.message}</p>
              )}
            </div>

            {/* Niveau */}
            <div className="min-w-[140px]">
              <select
                {...register(`languages.${index}.level`)}
                className="w-full bg-gray-50 border-none rounded-lg text-sm font-semibold text-gray-700 py-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Supprimer */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ language: "", level: "Intermédiaire" })}
        className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
      >
        <Plus className="w-4 h-4" />
        Ajouter une langue
      </button>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          N'oubliez pas d'inclure les langues locales si elles sont pertinentes pour le poste (ex: Swahili pour une mission à Goma).
        </p>
      </div>
    </form>
  );
}