"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { educationSchema, EducationInput } from "@/lib/validations/cv";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function EducationForm({ initialData, onSubmit, isLoading }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<EducationInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: initialData?.length > 0 ? initialData : [{ school: "", degree: "", endDate: "" }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <form id="cv-form" onSubmit={handleSubmit((data) => onSubmit(data.education))} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-6 border border-gray-100 rounded-2xl bg-blue-50/30 relative animate-in fade-in slide-in-from-bottom-2">
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
            {/* École / Université */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Établissement</label>
              <input
                {...register(`education.${index}.school`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Université de Kinshasa (UNIKIN)"
              />
              {errors.education?.[index]?.school && (
                <p className="text-red-500 text-xs mt-1">{errors.education[index]?.school?.message}</p>
              )}
            </div>

            {/* Diplôme */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Diplôme / Titre obtenu</label>
              <input
                {...register(`education.${index}.degree`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Graduat ou Licence"
              />
            </div>

            {/* Domaine d'étude */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Domaine (Optionnel)</label>
              <input
                {...register(`education.${index}.fieldOfStudy`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Économie, Informatique..."
              />
            </div>

            {/* Année d'obtention */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Année d'obtention (ou fin prévue)</label>
              <input
                type="month"
                {...register(`education.${index}.endDate`)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ school: "", degree: "", endDate: "" })}
        className="w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Ajouter un diplôme ou une formation
      </button>
    </form>
  );
}