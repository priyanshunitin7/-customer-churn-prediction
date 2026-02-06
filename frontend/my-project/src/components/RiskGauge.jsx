import React from "react";
import { motion } from "framer-motion";

export default function RiskGauge({ probability }) {
  const pct = Math.round(probability * 100);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          stroke="#22d3ee"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={440}
          animate={{
            strokeDashoffset: 440 - (440 * pct) / 100,
          }}
          transition={{ duration: 1.2 }}
        />
      </svg>

      <div className="absolute text-3xl font-bold">
        {pct}%
      </div>
    </div>
  );
}