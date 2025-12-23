import { motion } from "framer-motion";
import React from "react";
type ProgressBarProps = {
  current: number;
  total: number;
};
export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total
}) => {
  const pct = Math.max(0, Math.min(100, Math.round(current / total * 100)));
  return <div className="w-full">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur">
        <motion.div initial={{
        width: 0
      }} animate={{
        width: `${pct}%`
      }} transition={{
        type: "spring",
        stiffness: 120,
        damping: 20
      }} className="h-full rounded-full bg-[linear-gradient(90deg,#d9c34b_0%,#e5d066_100%)] shadow-[0_0_10px_rgba(217,195,75,0.3)]" />
      </div>
      <div className="mt-2 text-right text-xs font-medium text-[#d9c34b]">{pct}%</div>
    </div>;
};
export default ProgressBar;