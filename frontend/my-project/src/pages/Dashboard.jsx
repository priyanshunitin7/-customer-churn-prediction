import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import CustomerForm from "../components/CustomerForm";
import PredictionReveal from "../components/PredictionReveal";
import ParticleBackground from "../components/ParticleBackground";
import AIThinking from "../components/AIThinking";

/* ---------------- STATUS MAP ---------------- */

const STATUS_MAP = {
  idle: { label: "Idle", color: "bg-green-400" },
  thinking: { label: "Analyzing", color: "bg-yellow-400" },
  reveal: { label: "Decision Ready", color: "bg-blue-400" },
};

/* ---------------- HERO ---------------- */

function ModelHero({ hidden, phase }) {
  const status = STATUS_MAP[phase];

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative text-center mb-14"
        >
          {/* Glow aura */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl opacity-40"
            animate={{
              background: [
                "radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 70%)",
                "radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 70%)",
                "radial-gradient(circle at center, rgba(34,211,238,0.35), transparent 70%)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Title */}
          <motion.h1
            initial={{ letterSpacing: "0.08em", opacity: 0 }}
            animate={{ letterSpacing: "0.02em", opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight
                       bg-size-[200%_200%]
                       bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400
                       bg-clip-text text-transparent
                       animate-[gradientShift_6s_ease_infinite]"
          >
            Customer Churn Prediction System
          </motion.h1>

          {/* Subtitle + status */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <p className="text-sm text-white/60 tracking-widest uppercase">
              Random Forest • ROC-AUC 0.85 • Explainable AI
            </p>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-xs text-white/70
                         backdrop-blur px-3 py-1.5 rounded-full
                         border border-white/10"
            >
              <span className={`w-2 h-2 rounded-full ${status.color}`} />
              {status.label}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- DASHBOARD ---------------- */

export default function Dashboard() {
  const [phase, setPhase] = useState("idle"); // idle | thinking | reveal
  const [prediction, setPrediction] = useState(null);

  /* Called by CustomerForm after API success */
  const handleResult = (result) => {
    setPrediction(null);
    setPhase("thinking");

    setTimeout(() => {
      setPrediction({
        churnProbability: result.churn_probability,
        churnLabel: result.churn_label,
        threshold: result.threshold_used,
      });
      setPhase("reveal");
    }, 900);
  };

  const reset = () => {
    setPrediction(null);
    setPhase("idle");
  };

  return (
    <>
      <ParticleBackground />
      <Navbar phase={phase} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <ModelHero hidden={phase !== "idle"} phase={phase} />

        {/* REAL API-powered form */}
        <CustomerForm onResult={handleResult} />
      </div>

      {/* AI calibration overlay */}
      {phase === "thinking" && <AIThinking />}

      {/* Prediction Reveal */}
      <PredictionReveal
        data={phase === "reveal" ? prediction : null}
        onClose={reset}
      />
    </>
  );
}