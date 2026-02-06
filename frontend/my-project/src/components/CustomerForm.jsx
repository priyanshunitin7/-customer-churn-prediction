import React, { useState } from "react";
import { motion } from "framer-motion";
import { predictChurn } from "../services/api";

export default function CustomerForm({ onResult }) {
  const [form, setForm] = useState({
    tenure_months: "",
    monthly_charges: "",
    total_charges: "",
    contract_type: "",
    internet_service: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    for (const key in form) {
      if (form[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    setLoading(true);

    try {
      const result = await predictChurn({
        tenure_months: Number(form.tenure_months),
        monthly_charges: Number(form.monthly_charges),
        total_charges: Number(form.total_charges),
        contract_type: form.contract_type,
        internet_service: form.internet_service,
      });

      onResult(result);
    } catch {
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="relative bg-white/10 backdrop-blur-2xl
                 border border-white/15 rounded-3xl
                 p-10 w-full max-w-2xl
                 shadow-[0_0_90px_rgba(34,211,238,0.18)]
                 hover:shadow-[0_0_160px_rgba(34,211,238,0.35)]"
    >
      {/* Neon hover layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl
                   bg-linear-to-br from-cyan-400/10 to-blue-500/10
                   opacity-0 hover:opacity-100 transition-opacity duration-500"
      />

      <h2 className="relative text-2xl font-semibold text-center mb-8">
        Customer Input Vector
      </h2>

      <form
        onSubmit={submit}
        className="relative grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Tenure (months)"
          value={form.tenure_months}
          onChange={(v) => update("tenure_months", v)}
        />

        <CurrencyInput
          label="Monthly Charges"
          value={form.monthly_charges}
          onChange={(v) => update("monthly_charges", v)}
        />

        <CurrencyInput
          label="Total Charges"
          value={form.total_charges}
          onChange={(v) => update("total_charges", v)}
        />

        <Select
          label="Contract Type"
          options={["Month-to-month", "One year", "Two year"]}
          value={form.contract_type}
          onChange={(v) => update("contract_type", v)}
        />

        <Select
          label="Internet Service"
          options={["Fiber Optic", "DSL", "None"]}
          value={form.internet_service}
          onChange={(v) => update("internet_service", v)}
        />

        <div className="md:col-span-2 mt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl
                       bg-linear-to-r from-cyan-400 to-blue-500
                       text-black font-bold tracking-wide
                       shadow-lg hover:shadow-cyan-500/40 transition"
          >
            {loading ? "Analyzing…" : "Run AI Prediction"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

/* ================= INPUT ================= */

function Input({ label, value, onChange }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <label className="text-xs text-white/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-black/40 border border-white/10
                   rounded-lg px-4 py-3 outline-none
                   transition-all
                   hover:border-white/30
                   focus:border-cyan-400
                   focus:shadow-[0_0_20px_rgba(34,211,238,0.45)]"
      />
    </motion.div>
  );
}

/* ================= CURRENCY INPUT ================= */

function CurrencyInput({ label, value, onChange }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <label className="text-xs text-white/60">{label}</label>

      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2
                         text-white/50">
          $
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/40 border border-white/10
                     rounded-lg pl-8 pr-4 py-3 outline-none
                     transition-all
                     hover:border-white/30
                     focus:border-cyan-400
                     focus:shadow-[0_0_20px_rgba(34,211,238,0.45)]"
        />
      </div>
    </motion.div>
  );
}

/* ================= SELECT ================= */

function Select({ label, options, value, onChange }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <label className="text-xs text-white/60">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-black/40 border border-white/10
                   rounded-lg px-4 py-3 text-white/80
                   outline-none transition-all
                   hover:border-white/30
                   focus:border-cyan-400
                   focus:shadow-[0_0_20px_rgba(34,211,238,0.45)]"
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </motion.div>
  );
}