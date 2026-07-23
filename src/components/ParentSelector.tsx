import React from 'react';
import { CrossMode, TraitConfig } from '../types/genetics';
import { combineGametes } from '../utils/genetics';
import { Dna, ArrowRightLeft, Sparkles } from 'lucide-react';

interface ParentSelectorProps {
  mode: CrossMode;
  trait1: TraitConfig;
  trait2?: TraitConfig;
  p1Genotype: string;
  p2Genotype: string;
  onP1Change: (genotype: string) => void;
  onP2Change: (genotype: string) => void;
  onSwapParents: () => void;
}

export const ParentSelector: React.FC<ParentSelectorProps> = ({
  mode,
  trait1,
  trait2,
  p1Genotype,
  p2Genotype,
  onP1Change,
  onP2Change,
  onSwapParents,
}) => {
  // Option lists
  const monohybridOptions = [
    { value: `${trait1.dominantSymbol}${trait1.dominantSymbol}`, label: `${trait1.dominantSymbol}${trait1.dominantSymbol} - Homozigot Dominan` },
    { value: `${trait1.dominantSymbol}${trait1.recessiveSymbol}`, label: `${trait1.dominantSymbol}${trait1.recessiveSymbol} - Heterozigot` },
    { value: `${trait1.recessiveSymbol}${trait1.recessiveSymbol}`, label: `${trait1.recessiveSymbol}${trait1.recessiveSymbol} - Homozigot Resesif` },
  ];

  const t1Dom = trait1.dominantSymbol;
  const t1Rec = trait1.recessiveSymbol;
  const t2Dom = trait2 ? trait2.dominantSymbol : 'K';
  const t2Rec = trait2 ? trait2.recessiveSymbol : 'k';

  const dihybridOptions = [
    { value: `${t1Dom}${t1Dom}${t2Dom}${t2Dom}`, label: `${t1Dom}${t1Dom}${t2Dom}${t2Dom} (Homozigot Dominan Ganda)` },
    { value: `${t1Dom}${t1Dom}${t2Dom}${t2Rec}`, label: `${t1Dom}${t1Dom}${t2Dom}${t2Rec} (Homo Dominan - Hetero)` },
    { value: `${t1Dom}${t1Dom}${t2Rec}${t2Rec}`, label: `${t1Dom}${t1Dom}${t2Rec}${t2Rec} (Homo Dominan - Homo Resesif)` },
    { value: `${t1Dom}${t1Rec}${t2Dom}${t2Dom}`, label: `${t1Dom}${t1Rec}${t2Dom}${t2Dom} (Hetero - Homo Dominan)` },
    { value: `${t1Dom}${t1Rec}${t2Dom}${t2Rec}`, label: `${t1Dom}${t1Rec}${t2Dom}${t2Rec} (Heterozigot Ganda / F1 Standard)` },
    { value: `${t1Dom}${t1Rec}${t2Rec}${t2Rec}`, label: `${t1Dom}${t1Rec}${t2Rec}${t2Rec} (Hetero - Homo Resesif)` },
    { value: `${t1Dom}${t1Rec}${t2Dom}${t2Rec}`, label: `${t1Dom}${t1Rec}${t2Dom}${t2Rec} (Heterozigot Sempurna)` },
    { value: `${t1Rec}${t1Rec}${t2Dom}${t2Dom}`, label: `${t1Rec}${t1Rec}${t2Dom}${t2Dom} (Homo Resesif - Homo Dominan)` },
    { value: `${t1Rec}${t1Rec}${t2Dom}${t2Rec}`, label: `${t1Rec}${t1Rec}${t2Dom}${t2Rec} (Homo Resesif - Hetero)` },
    { value: `${t1Rec}${t1Rec}${t2Rec}${t2Rec}`, label: `${t1Rec}${t1Rec}${t2Rec}${t2Rec} (Homozigot Resesif Ganda / Testcross)` },
  ];

  const options = mode === 'monohybrid' ? monohybridOptions : dihybridOptions;

  // Determine parent phenotype details
  const getParentPhenotype = (genotype: string) => {
    if (mode === 'monohybrid') {
      const dummyG1 = genotype.charAt(0);
      const dummyG2 = genotype.charAt(1);
      return combineGametes(dummyG1, dummyG2, mode, trait1);
    } else {
      const dummyG1 = `${genotype.charAt(0)}${genotype.charAt(2)}`;
      const dummyG2 = `${genotype.charAt(1)}${genotype.charAt(3)}`;
      return combineGametes(dummyG1, dummyG2, mode, trait1, trait2);
    }
  };

  const p1Details = getParentPhenotype(p1Genotype);
  const p2Details = getParentPhenotype(p2Genotype);

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700/60 pb-3">
        <div className="flex items-center space-x-2">
          <Dna className="w-5 h-5 text-teal-400" />
          <h2 className="text-base font-bold text-white tracking-wide">
            Pemilihan Induk (Parental / P)
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-300">
          Mode: {mode === 'monohybrid' ? '1 Sifat Bedaa' : '2 Sifat Beda'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Parent 1 Card */}
        <div className="md:col-span-5 bg-slate-900/80 rounded-xl p-4 border border-slate-700/80 space-y-3 relative overflow-hidden group hover:border-teal-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/50">
              Induk 1 (P1 - Jantan)
            </span>
            <span className="text-lg">♂️</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Genotipe Induk 1
            </label>
            <select
              value={p1Genotype}
              onChange={(e) => onP1Change(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Phenotype & Icon Display */}
          <div className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-700/50 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Fenotipe Induk 1:</p>
              <p className="text-sm font-bold text-teal-300">
                {p1Details.phenotypeName}
              </p>
            </div>
            <div className="text-2xl font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
              {trait1.iconDominant}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-2 flex justify-center my-1 md:my-0">
          <button
            onClick={onSwapParents}
            className="p-3 bg-slate-700 hover:bg-teal-600 text-slate-200 hover:text-white rounded-full transition-all shadow-md hover:scale-110 active:scale-95 group"
            title="Tukar Genotipe Induk"
          >
            <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Parent 2 Card */}
        <div className="md:col-span-5 bg-slate-900/80 rounded-xl p-4 border border-slate-700/80 space-y-3 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              Induk 2 (P2 - Betina)
            </span>
            <span className="text-lg">♀️</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Genotipe Induk 2
            </label>
            <select
              value={p2Genotype}
              onChange={(e) => onP2Change(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Phenotype & Icon Display */}
          <div className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-700/50 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Fenotipe Induk 2:</p>
              <p className="text-sm font-bold text-emerald-300">
                {p2Details.phenotypeName}
              </p>
            </div>
            <div className="text-2xl font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
              {trait1.iconDominant}
            </div>
          </div>
        </div>

      </div>

      {/* Trait Legend / Info Banner */}
      <div className="mt-4 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-slate-300">Sifat Terpilih:</span>
          <span className="inline-flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-700">
            <strong>{trait1.name}:</strong> Dominan ({trait1.dominantSymbol} = {trait1.dominantName}), Resesif ({trait1.recessiveSymbol} = {trait1.recessiveName})
          </span>
          {trait2 && (
            <span className="inline-flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-700">
              <strong>{trait2.name}:</strong> Dominan ({trait2.dominantSymbol} = {trait2.dominantName}), Resesif ({trait2.recessiveSymbol} = {trait2.recessiveName})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
