"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { templateSchema, TemplateInput } from "@/lib/validations/cv";
import { cn } from "@/lib/utils";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const templates = [
  {
    id: "classic",
    image: "/cv-models/model-1.png",
  },
  {
    id: "modern",
    image: "/cv-models/model-3.png",
  },
  {
    id: "creative",
    image: "/cv-models/model-2.png",
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
    <form id="cv-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => setValue("templateId", tpl.id)}
            className="relative cursor-pointer group"
          >
            {/* Conteneur de l'image avec délimitation visible */}
            <div
              className={cn(
                "relative aspect-[3/4] w-full overflow-hidden transition-all duration-300 rounded-md",
                // Délimitation par défaut (bordure fine grise)
                "border border-slate-200 shadow-sm",
                // Style quand sélectionné (anneau bleu et bordure invisible pour ne pas doubler)
                selectedTemplate === tpl.id 
                  ? "ring-2 ring-blue-600 ring-offset-2 border-transparent shadow-md" 
                  : "hover:border-slate-300 hover:shadow-md"
              )}
            >
              <Image
                src={tpl.image}
                alt="Template Preview"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}