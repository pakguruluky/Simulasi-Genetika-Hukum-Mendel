import React from 'react';
import { CrossMode, TraitConfig } from '../types/genetics';
import { generateGametes } from '../utils/genetics';
import { GitCommit, ArrowDown, Sparkles } from 'lucide-react';

interface GameteDisplayProps {
  mode: CrossMode;
  p1Genotype: string;
  p2Genotype: string;
  trait1: TraitConfig;
  trait2?: TraitConfig;
}

export const GameteDisplay: React.FC<GameteDisplayProps> = ({
  mode,
  p1Genotype,
  p2Genotype,
}) => {
  const p1Gametes = generateGametes(p1Genotype, mode);
  const p2Gametes = generateGametes(p2Genotype, mode);

  // Count unique gametes
  const p1Unique = Array.from(new Set(p1Gametes));
  const p2Unique = Array.from(new Set(p2Gametes));

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700/60 pb-3">
        <div className="flex items-center space-x-2">
          <GitCommit className="w-5 h-5 text-teal-400 rotate-90" />
          <h3 className="text-base font-bold text-white tracking-wide">
            Pembentukan Gamet (Meiosis)
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Hukum I & II Mendel
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Parent 1 Gametes */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-teal-400">Gamet Induk 1 ({p1Genotype})</span>
            <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              {p1Unique.length} Kombinasi Gamet
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono text-slate-400">P1: {p1Genotype}</span>
            <ArrowDown className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-teal-300">Gamet P1</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {p1Gametes.map((gamete, idx) => (
              <div
                key={`p1-gamete-${idx}`}
                className="px-3.5 py-1.5 bg-teal-950/60 text-teal-200 border border-teal-600/40 font-mono font-extrabold text-sm rounded-lg shadow-sm hover:scale-105 transition-transform"
              >
                {gamete}
              </div>
            ))}
          </div>
        </div>

        {/* Parent 2 Gametes */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-400">Gamet Induk 2 ({p2Genotype})</span>
            <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              {p2Unique.length} Kombinasi Gamet
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono text-slate-400">P2: {p2Genotype}</span>
            <ArrowDown className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300">Gamet P2</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {p2Gametes.map((gamete, idx) => (
              <div
                key={`p2-gamete-${idx}`}
                className="px-3.5 py-1.5 bg-emerald-950/60 text-emerald-200 border border-emerald-600/40 font-mono font-extrabold text-sm rounded-lg shadow-sm hover:scale-105 transition-transform"
              >
                {gamete}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
