import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { perceptionSections, TOTAL_SECTIONS } from "@/data/perceptionQuestions";
import { useFormPersistence } from "@/hooks/useFormPersistence";
import Stepper from "./Stepper";
import ProgressBar from "./ProgressBar";
import Section1General from "./Section1General";
import Section2Etat from "./Section2Etat";
import Section3Relations from "./Section3Relations";
import Section4Valeurs from "./Section4Valeurs";
import Section5Discipline from "./Section5Discipline";
import Section6Engagement from "./Section6Engagement";
import Section7Final from "./Section7Final";
import ReviewPage from "./ReviewPage";
import SuccessPage from "./SuccessPage";
import { Button } from "@/components/ui/button";
import { submitPerception } from "@/lib/perceptionApi";

type FormValues = Record<string, any>;

const sectionComponents: Record<number, React.FC> = {
  1: Section1General,
  2: Section2Etat,
  3: Section3Relations,
  4: Section4Valeurs,
  5: Section5Discipline,
  6: Section6Engagement,
  7: Section7Final,
};

const variants = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

export const MultiStepForm: React.FC = () => {
  const defaultValues = useMemo(() => {
    const map: Record<string, any> = {};
    perceptionSections.forEach((s) =>
      s.questions.forEach((q) => {
        if (q.type === "checkbox") map[q.id] = [];
        else if (q.type === "scale") map[q.id] = Math.max(1, q.min ?? 1);
        else map[q.id] = "";
      })
    );
    return map;
  }, []);

  const methods = useForm<FormValues>({ mode: "onChange", defaultValues });
  const [step, setStep] = useState<number>(1);
  const [mode, setMode] = useState<"form" | "review" | "success">("form");

  useFormPersistence<FormValues>({
    storageKey: "perception.form.v1",
    form: methods,
    version: "1",
  });

  const CurrentSection = sectionComponents[step];

  const handleNext = async () => {
    // Validate only current section's fields
    const currentSection = perceptionSections.find((s) => s.id === step)!;
    const fieldNames = currentSection.questions.map((q) => q.id);
    const ok = await methods.trigger(fieldNames as any, { shouldFocus: true });
    if (!ok) return;
    if (step < TOTAL_SECTIONS) {
      setStep((s) => s + 1);
    } else {
      setMode("review");
    }
  };

  const handlePrev = () => {
    if (mode === "review") {
      setMode("form");
      return;
    }
    setStep((s) => Math.max(1, s - 1));
  };

  const gotoSection = (id: number) => {
    setMode("form");
    setStep(id);
  };

  const onSubmitToApi = async () => {
    const payload = methods.getValues();
    try {
      await submitPerception(payload);
      setMode("success");
    } catch (e) {
      // TODO: surface toast if desired
      console.error(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6">
          <Stepper total={TOTAL_SECTIONS} current={mode === "form" ? step : TOTAL_SECTIONS} />
          <div className="mt-4">
            <ProgressBar current={mode === "form" ? step : TOTAL_SECTIONS} total={TOTAL_SECTIONS} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-cosmic-card backdrop-blur">
          <AnimatePresence mode="wait">
            {mode === "form" && (
              <motion.div
                key={`section-${step}`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h2 className="mb-1 text-xl font-heading text-white">
                  {perceptionSections.find((s) => s.id === step)?.title}
                </h2>
                <p className="mb-6 text-sm text-white/70">
                  Réponds avec sincérité et profondeur.
                </p>
                <CurrentSection />
              </motion.div>
            )}
            {mode === "review" && (
              <motion.div
                key="review"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <ReviewPage onEditSection={gotoSection} onSubmit={onSubmitToApi} />
              </motion.div>
            )}
            {mode === "success" && (
              <motion.div
                key="success"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <SuccessPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="secondary" onClick={handlePrev} className="bg-white/10 text-white hover:bg-white/20">
            {mode === "review" ? "Retour au formulaire" : "Précédent"}
          </Button>
          {mode === "form" && (
            <Button onClick={handleNext} className="bg-perception-gold text-black hover:bg-[#e6c200]">
              {step < TOTAL_SECTIONS ? "Suivant" : "Revoir mes réponses"}
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;


