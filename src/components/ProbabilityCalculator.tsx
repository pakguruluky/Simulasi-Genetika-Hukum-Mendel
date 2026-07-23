import React, { useState } from 'react';
import { CrossMode, TraitConfig, PunnettCell } from '../types/genetics';
import { Calculator, Percent, Sparkles } from 'lucide-react';

interface ProbabilityCalculatorProps {
  mode: CrossMode;
  trait1: TraitConfig;
  trait2?: TraitConfig;
  flatCells: PunnettCell[];
}

export const ProbabilityCalculator: React.FC<ProbabilityCalculatorProps> = ({
  mode,
  trait1,
  trait2,
  flatCells,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');

  // Extract list of all unique genotypes and phenotypes
  const uniqueGenotypes = Array.from(new Set(flatCells.map((c) => c.genotype)));
  const uniquePhenotypes = Array.from(new Set(flatCells.map((c) => c.phenotypeName)));

  // Count matches
  let matchCount = 0;
  if (selectedTarget) {
    matchCount = flatCells.filter(
      (c) => c.genotype === selectedTarget || c.phenotypeName === selectedTarget
    ).length;
  }

  const total = flatCells.length;
  const percentage = selectedTarget ? ((matchCount / total) * 100).toFixed(2) : '0';

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-3">
      <div className="flex items-center space-x-2 border-b border-slate-700/60 pb-3">
        <Calculator className="w-5 h-5 text-teal-400" />
        <h3 className="text-base font-bold text-white tracking-wide">
          Kalkulator Prediksi Probabilitas Keturunan
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-7">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Pilih Target Sifat / Genotipe Yang Dicari:
          </label>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
          >
            <option value="">-- Pilih Fenotipe atau Genotipe Target --</option>
            <optgroup label="Berdasarkan Fenotipe (Sifat Tampak)">
              {uniquePhenotypes.map((p) => (
                <option key={p} value={p}>
                  Fenotipe: {p}
                </option>
              ))}
            </optgroup>
            <optgroup label="Berdasarkan Genotipe (Pasangan Alel)">
              {uniqueGenotypes.map((g) => (
                <option key={g} value={g}>
                  Genotipe: {g}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Output card */}
        <div className="sm:col-span-5 bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold">Probabilitas Kemunculan:</div>
            {selectedTarget ? (
              <div className="text-xs text-slate-300 font-medium">
                {matchCount} dari {total} Kotak Punnett
              </div>
            ) : (
              <div className="text-xs text-slate-500">Pilih target di samping</div>
            )}
          </div>

          <div className="bg-teal-950 text-teal-300 font-mono text-lg font-black px-3 py-1.5 rounded-lg border border-teal-500/30 flex items-center gap-1">
            <span>{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
