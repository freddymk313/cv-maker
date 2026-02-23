"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Calendar } from "lucide-react";
import { experienceSchema, ExperienceInput } from "@/lib/validations/cv";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function ExperiencesForm({
  initialData,
  onSubmit,
  isLoading,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences:
        initialData?.length > 0
          ? initialData
          : [{ company: "", position: "", startDate: "", isCurrent: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <form
      id="cv-form"
      onSubmit={handleSubmit((data) => onSubmit(data.experiences))}
      className="space-y-8"
    >
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-6 border border-gray-100 rounded-2xl bg-gray-50/50 relative group"
        >
          {/* Bouton Supprimer */}
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entreprise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Entreprise
              </label>
              <input
                {...register(`experiences.${index}.company`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Vodacom RDC"
              />
              {errors.experiences?.[index]?.company && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experiences[index]?.company?.message}
                </p>
              )}
            </div>

            {/* Poste */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Poste occupé
              </label>
              <input
                {...register(`experiences.${index}.position`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Comptable"
              />
            </div>

            {/* Date Début */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                {...register(`experiences.${index}.startDate`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Fin ou Poste actuel */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date de fin
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  disabled={watch(`experiences.${index}.isCurrent`)}
                  {...register(`experiences.${index}.endDate`)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`experiences.${index}.isCurrent`)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-600 font-medium">
                    Poste actuel
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description des tâches
            </label>
            <textarea
              {...register(`experiences.${index}.description`)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              // placeholder="Décrivez vos réalisations..."
              placeholder={`Ex:
- Gestion de la comptabilité journalière
- Analyse financière mensuelle
- Supervision d'une équipe de 3 personnes`}
            />
          </div>
        </div>
      ))}

      {/* Bouton Ajouter une expérience */}
      <button
        type="button"
        onClick={() =>
          append({ company: "", position: "", startDate: "", isCurrent: false })
        }
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Ajouter une autre expérience
      </button>
    </form>
  );
}
