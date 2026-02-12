"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Layout, Smartphone, Award } from "lucide-react";
import { templateSchema, TemplateInput } from "@/lib/validations/cv";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const templates = [
  {
    id: "classic",
    name: "Le Classique",
    description: "Épuré et professionnel, idéal pour l'administration.",
    color: "bg-gray-800",
    icon: Layout
  },
  {
    id: "modern",
    name: "Le Moderne",
    description: "Un design avec une colonne latérale colorée.",
    color: "bg-blue-600",
    icon: Smartphone
  },
  {
    id: "creative",
    name: "Le Créatif",
    description: "Pour se démarquer dans le marketing ou le design.",
    color: "bg-purple-600",
    icon: Award
  },
];

export default function TemplateForm({ initialData, onSubmit, isLoading }: Props) {
  const { setValue, watch, handleSubmit } = useForm<TemplateInput>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      templateId: initialData || "classic",
    },
  });

  const selectedTemplate = watch("templateId");

  return (
    <form id="cv-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => setValue("templateId", tpl.id)}
            className={`cursor-pointer group relative rounded-2xl border-2 transition-all p-4 ${
              selectedTemplate === tpl.id
                ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-50"
                : "border-gray-100 hover:border-blue-200 bg-white"
            }`}
          >
            {/* Aperçu visuel simplifié */}
            <div className={`aspect-[3/4] rounded-lg mb-4 flex flex-col p-2 gap-1 overflow-hidden shadow-inner ${tpl.color} opacity-20 group-hover:opacity-30 transition-opacity`}>
               <div className="w-1/3 h-2 bg-current rounded" />
               <div className="w-full h-1 bg-current rounded" />
               <div className="w-full h-1 bg-current rounded" />
               <div className="mt-4 w-full h-20 bg-white/50 rounded" />
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-bold ${selectedTemplate === tpl.id ? "text-blue-700" : "text-gray-800"}`}>
                  {tpl.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>
              {selectedTemplate === tpl.id && (
                <CheckCircle2 className="w-6 h-6 text-blue-600 fill-blue-50" />
              )}
            </div>

            {selectedTemplate === tpl.id && (
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                SÉLECTIONNÉ
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gray-900 rounded-2xl text-white overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="font-bold mb-2">Prêt à générer votre CV ?</h4>
          <p className="text-sm text-gray-400">
            En cliquant sur "Terminer", votre CV sera sauvegardé et vous pourrez le télécharger au format PDF depuis votre tableau de bord.
          </p>
        </div>
        <Layout className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 rotate-12" />
      </div>
    </form>
  );
}