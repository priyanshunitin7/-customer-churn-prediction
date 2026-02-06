import React from "react";
import { motion } from "framer-motion";

const STATUS = {
  idle: {
    label: "Idle",
    dot: "bg-cyan-400",
    glow: "rgba(34,211,238,0.35)",
  },
  thinking: {
    label: "Analyzing",
    dot: "bg-yellow-400",
    glow: "rgba(250,204,21,0.45)",
  },
  reveal: {
    label: "Decision Ready",
    dot: "bg-blue-400",
    glow: "rgba(59,130,246,0.5)",
  },
};

export default function Navbar({ phase = "idle" }) {
  const s = STATUS[phase] ?? STATUS.idle;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Outer glow aura */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl -z-10"
        animate={{
          opacity: [0.4, 0.75, 0.4],
          backgroundColor: s.glow,
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glass capsule */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="relative px-10 py-3 rounded-full
                   backdrop-blur-2xl bg-white/10
                   border border-white/15
                   shadow-[0_0_60px_rgba(0,0,0,0.4)]"
      >
        <div className="flex items-center gap-8">
          {/* Brand */}
          <div className="flex flex-col leading-none">
            <span className="text-cyan-300 font-semibold
                             tracking-[0.35em] text-sm">
              CHURN·AI
            </span>
            <span className="text-[10px] tracking-widest text-white/40 mt-1">
              NEURAL RETENTION ENGINE
            </span>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-white/15" />

          {/* Live status */}
          <div className="flex items-center gap-2 text-xs text-white/70">
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${s.dot}`}
            />
            {s.label}
          </div>
        </div>

        {/* Animated underline */}
        <motion.div
          className="absolute left-6 right-6 -bottom-1 h-0.5
                     bg-linear-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}