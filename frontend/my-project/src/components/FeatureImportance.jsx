import React from "react";
export default function FeatureImportance({ factors }) {
  if (!factors) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Why this customer may churn
      </h3>

      <div className="space-y-3">
        {factors.map((f, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{f.name}</span>
              <span>{Math.round(f.value * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded">
              <div
                className="h-2 bg-cyan-400 rounded"
                style={{ width: `${f.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}