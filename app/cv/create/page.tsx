"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Layout,
} from "lucide-react";

// Tes imports de composants
import PersonalInfoForm from "@/components/cv/PersonalInfoForm";
import ExperiencesForm from "@/components/cv/ExperiencesForm";
import EducationForm from "@/components/cv/EducationForm";
import SkillsForm from "@/components/cv/SkillsForm";
import LanguagesForm from "@/components/cv/LanguagesForm";
import TemplateForm from "@/components/cv/TemplateForm";

const steps = [
  { id: "personalInfo", label: "Infos", icon: User },
  { id: "experiences", label: "Expériences", icon: Briefcase },
  { id: "education", label: "Études", icon: GraduationCap },
  { id: "skills", label: "Compétences", icon: Code },
  { id: "languages", label: "Langues", icon: Languages },
  { id: "template", label: "Design", icon: Layout },
];

export default function CreateCv() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [cvData, setCvData] = useState<any>(null);
  const router = useRouter();

  // --- CHARGEMENT INITIAL ---
  useEffect(() => {
    const fetchCv = async () => {
      try {
        const res = await fetch("/api/cv");
        if (res.ok) {
          const data = await res.json();
          // On vérifie si data n'est pas vide (null ou {})
          if (data && Object.keys(data).length > 0) {
            setCvData(data);
          }
        }
      } catch (error) {
        console.error("Erreur de récupération:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchCv();
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // --- SAUVEGARDE ET MISE À JOUR LOCALE ---
  const saveStepData = async (stepId: string, data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: stepId, data }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erreur de sauvegarde");

      // Mise à jour de l'état local avec le CV complet retourné par l'API
      // Cela permet d'avoir les données fraîches pour l'étape suivante ou précédente
      setCvData(result.cv);

      if (currentStep === steps.length - 1) {
        router.push("/dashboard");
      } else {
        nextStep();
      }
    } catch (error: any) {
      alert(error.message || "Erreur lors de la sauvegarde.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Récupération de votre brouillon...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* --- BARRE DE PROGRESSION --- */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > index;
            const isActive = currentStep === index;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-blue-600 text-white ring-4 ring-blue-100"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`absolute -bottom-7 text-xs font-medium whitespace-nowrap ${isActive ? "text-blue-600" : "text-gray-500"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- ZONE DU FORMULAIRE --- */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 min-h-[450px] relative">
        <div className="mb-8 border-b border-gray-50 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {steps[currentStep].label}
          </h2>
          <p className="text-gray-500 text-sm">Veuillez remplir les informations ci-dessous.</p>
        </div>

        <div className="py-4">
          {currentStep === 0 && (
            <PersonalInfoForm
              initialData={cvData?.personalInfo}
              onSubmit={(data) => saveStepData("personalInfo", data)}
              isLoading={isLoading}
            />
          )}

          {currentStep === 1 && (
            <ExperiencesForm
              initialData={cvData?.experiences}
              onSubmit={(data) => saveStepData("experiences", data)}
              isLoading={isLoading}
            />
          )}

          {currentStep === 2 && (
            <EducationForm
              initialData={cvData?.education}
              onSubmit={(data) => saveStepData("education", data)}
              isLoading={isLoading}
            />
          )}

          {currentStep === 3 && (
            <SkillsForm
              initialData={cvData?.skills}
              onSubmit={(data) => saveStepData("skills", data)}
              isLoading={isLoading}
            />
          )}

          {currentStep === 4 && (
            <LanguagesForm
              initialData={cvData?.languages}
              onSubmit={(data) => saveStepData("languages", data)}
              isLoading={isLoading}
            />
          )}

          {currentStep === 5 && (
            <TemplateForm
              initialData={cvData?.templateId}
              onSubmit={(data) => saveStepData("template", data)}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* --- NAVIGATION --- */}
        <div className="mt-12 flex justify-between pt-6 border-t border-gray-50">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || isLoading}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          <button
            type="submit"
            form="cv-form"
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-100 disabled:opacity-50"
          >
            {isLoading
              ? "Sauvegarde..."
              : currentStep === steps.length - 1
                ? "Terminer"
                : "Suivant"}
            {currentStep !== steps.length - 1 && !isLoading && (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}