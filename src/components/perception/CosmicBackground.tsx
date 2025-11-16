import { motion } from "framer-motion";
import React from "react";

type CosmicBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
};

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ children, className }) => {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-0">
        {/* Starfield layers */}
        <div className="absolute inset-0 opacity-40">
          <motion.div
            aria-hidden
            className="absolute -inset-[50%] [background:radial-gradient(2px_2px_at_20%_30%,rgba(255,255,255,0.7)_1px,transparent_1px),radial-gradient(2px_2px_at_80%_70%,rgba(255,255,255,0.5)_1px,transparent_1px),radial-gradient(2px_2px_at_40%_80%,rgba(255,255,255,0.6)_1px,transparent_1px),radial-gradient(3px_3px_at_90%_20%,rgba(255,215,0,0.35)_1px,transparent_2px)]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          />
        </div>
        {/* Nebula glows */}
        <motion.div
          aria-hidden
          className="absolute -top-1/2 left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, hsla(45,100%,65%,0.10) 0%, hsla(280,60%,40%,0.06) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />
      </div>
      {children}
    </div>
  );
};

export default CosmicBackground;


