import React from "react";
import { useFormContext } from "react-hook-form";
import { perceptionSections } from "@/data/perceptionQuestions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Section4Valeurs: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  const section = perceptionSections.find((s) => s.id === 4)!;

  return (
    <div className="grid gap-6">
      {section.questions.map((q) => {
        if (q.type === "radio") {
          return (
            <div key={q.id} className="rounded-xl border border-[#d9c34b]/20 bg-black/40 p-4 backdrop-blur">
              <Label className="mb-2 block font-heading text-[#d9c34b]">{q.label}</Label>
              <div className="mt-2 flex flex-wrap gap-4">
                {q.options?.map((opt) => (
                  <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-white/90">
                    <input type="radio" value={opt.value} {...register(q.id, { required: q.required })} className="accent-[#d9c34b]" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors[q.id] && <p className="mt-2 text-sm text-red-400">Sélectionne une option.</p>}
            </div>
          );
        }
        if (q.type === "paragraph") {
          return (
            <div key={q.id} className="rounded-xl border border-[#d9c34b]/20 bg-black/40 p-4 backdrop-blur">
              <Label htmlFor={q.id} className="mb-2 block font-heading text-[#d9c34b]">
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
        return null;
      })}
    </div>
  );
};

export default Section4Valeurs;


