import React from "react";
import { useFormContext } from "react-hook-form";
import { perceptionSections } from "@/data/perceptionQuestions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

export const Section2Etat: React.FC = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const section = perceptionSections.find((s) => s.id === 2)!;
  const scaleId = "alignmentScale";
  const scaleValue = watch(scaleId) ?? 5;

  return (
    <div className="grid gap-6">
      {section.questions.map((q) => {
        if (q.type === "paragraph") {
          return (
            <div key={q.id} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <Label htmlFor={q.id} className="mb-2 block font-heading text-perception-gold">
                {q.label}
              </Label>
              <Textarea
                id={q.id}
                rows={6}
                className="bg-[hsl(var(--perception-input-bg))] text-white"
                {...register(q.id, {
                  required: q.required,
                  minLength: q.minLength ? { value: q.minLength, message: `Minimum ${q.minLength} caractères.` } : undefined,
                })}
              />
              <p className="mt-1 text-xs text-white/60">{q.helperText}</p>
              {errors[q.id]?.message && <p className="mt-2 text-sm text-red-400">{String(errors[q.id]?.message)}</p>}
              {!errors[q.id]?.message && errors[q.id] && <p className="mt-2 text-sm text-red-400">Ce champ est requis.</p>}
            </div>
          );
        }
        if (q.type === "scale") {
          return (
            <div key={q.id} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <Label className="mb-2 block font-heading text-perception-gold">{q.label}</Label>
              <div className="mt-4">
                <Slider
                  value={[Number(scaleValue)]}
                  min={q.min ?? 1}
                  max={q.max ?? 10}
                  step={1}
                  onValueChange={(v) => setValue(scaleId, v[0], { shouldValidate: true })}
                />
                <div className="mt-2 text-sm text-white/80">Valeur: <span className="font-semibold text-perception-gold">{scaleValue}</span></div>
              </div>
              {errors[q.id] && <p className="mt-2 text-sm text-red-400">Sélectionne une valeur.</p>}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Section2Etat;


