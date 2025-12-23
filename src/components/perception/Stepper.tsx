import React from "react";
import { motion } from "framer-motion";

type StepperProps = {
  total: number;
  current: number; // 1-based
};

export const Stepper: React.FC<StepperProps> = ({ total, current }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }, (_, i) => {
        const stepIndex = i + 1;
        const active = stepIndex === current;
        const done = stepIndex < current;
        return (
          <div key={stepIndex} className="flex items-center">
            <motion.div
              className={[
                "grid h-8 w-8 place-items-center rounded-full border backdrop-blur",
                active
                  ? "border-[#d9c34b]/60 bg-white/10 shadow-[0_0_15px_rgba(217,195,75,0.4)]"
                  : done
                  ? "border-[#d9c34b]/40 bg-white/10 shadow-[0_0_10px_rgba(217,195,75,0.2)]"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
              animate={{ scale: active ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Étape ${stepIndex}`}
            >
              <span
                className={[
                  "text-sm font-heading",
                  active || done ? "text-[#d9c34b]" : "text-white/60",
                ].join(" ")}
              >
                {stepIndex}
              </span>
            </motion.div>
            {stepIndex < total && (
              <div className="mx-2 h-[2px] w-8 rounded bg-white/10">
              <motion.div
                  className="h-full rounded bg-[#d9c34b]"
                  initial={{ width: 0 }}
                  animate={{ width: done ? "100%" : active ? "50%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;


