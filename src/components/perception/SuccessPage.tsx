import React from "react";
import { motion } from "framer-motion";

export const SuccessPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d9c34b]/30 bg-black/60 p-10 text-center backdrop-blur-md">
      <motion.div
        className="absolute -left-40 -top-40 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(217,195,75,0.25), rgba(217,195,75,0.15), transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(217,195,75,0.2), rgba(217,195,75,0.12), transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="relative">
        <div className="mb-2 text-5xl font-heading text-[#d9c34b]">∞</div>
        <h3 className="text-2xl font-heading text-white">
          Merci pour ta sincérité.
        </h3>
        <p className="mt-2 text-white/80">
          Je reviendrai vers toi sous 48h.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;


