import { motion } from "framer-motion";
import React from "react";
const infinityVariants = {
  animate: {
    y: [0, -6, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
export const PerceptionHeader: React.FC = () => {
  return <header className="relative py-10 text-center">
      <motion.div className="absolute right-6 top-6 text-[42px] text-perception-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]" variants={infinityVariants} animate="animate" aria-hidden>
        <span className="text-[42px] font-heading text-perception-gold">∞</span>
      </motion.div>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-heading font-bold tracking-wide sm:text-6xl text-[#fcda5d]">
          PERCEPTION
        </h1>
        <p className="mt-3 text-lg font-body text-cosmic-star-white/90">
          Programme d’accompagnement — Formulaire de Candidature
        </p>
        <p className="mt-2 text-sm font-body text-perception-soft-yellow/90">
          L’Architecture Identitaire par les Valeurs™
        </p>
        <p className="mt-1 text-xs font-body text-white/70">Par Abdenacer Maredj</p>
      </div>
    </header>;
};
export default PerceptionHeader;