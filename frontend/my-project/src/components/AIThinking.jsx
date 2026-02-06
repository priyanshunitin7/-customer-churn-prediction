import React from "react";
import { motion } from "framer-motion";

export default function AIThinking() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur">
      <div className="flex flex-col items-center gap-6">
        {/* Calibrating Ring */}
        <motion.div
          className="relative w-24 h-24 rounded-full
                     border border-white/10"
        >
          <motion.div
            className="absolute inset-0 rounded-full
                       border-2 border-cyan-400/80"
            animate={{
              rotate: 360,
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1.6, repeat: Infinity },
            }}
          />
        </motion.div>

        {/* Status Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm tracking-widest uppercase text-cyan-300"
        >
          Calibrating Prediction Confidence
        </motion.p>

        <p className="text-xs text-white/50">
          Analyzing customer behavior patterns
        </p>
      </div>
    </div>
  );
}