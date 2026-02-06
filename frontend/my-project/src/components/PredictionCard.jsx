import React from "react";
import { motion } from "framer-motion";

export default function PredictionCard({ data }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>

      <p className="text-white/70 text-sm">
        This customer has a <span className="text-cyan-400 font-semibold">high risk</span> of churn.
        Immediate retention actions are recommended.
      </p>
    </motion.div>
  );
}