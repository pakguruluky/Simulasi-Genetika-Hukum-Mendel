import React, { useState } from 'react';
import { CrossMode, TraitConfig, RatioItem, PunnettCell } from '../types/genetics';
import { computeRatios } from '../utils/genetics';
import { BarChart3, PieChart, Info, Copy, Check, Sparkles } from 'lucide-react';

interface RatioAnalysisProps {
  mode: CrossMode;
  trait1: TraitConfig;
  trait2?: TraitConfig;
  flatCells: PunnettCell[];
  highlightKey: string | null;
  onHoverKey: (key: string | null) => void;
}

export const RatioAnalysis: React.FC<RatioAnalysisProps> = ({
  mode,
  trait1,
  trait2,
  flatCells,
  highlightKey,
  onHoverKey,
}) => {
  const [activeTab, setActiveTab] = useState<'phenotype' | 'genotype'>('phenotype');
  const [copied, setCopied] = useState<boolean>(false);

  const { genotypicRatios, phenotypicRatios } = computeRatios(flatCells, mode, trait1, trait2);

  const items = activeTab === 'phenotype' ? phenotypicRatios : genotypicRatios;

  // Build simplified mathematical ratio string (e.g. "9 : 3 : 3 : 1")
  const ratioString = items.map((item) => item.ratioValue).join(' : ');

  // Copy textual summary to clipboard
  const handleCopy = () => {
    const text = [
      `=== SIMULASI MENDEL (${mode === 'monohybrid' ? 'MONOHIBRID' : 'DIHIBRID'}) ===`,
      `Sifat 1: ${trait1.name} (${trait1.dominantSymbol}=${trait1.dominantName}, ${trait1.recessiveSymbol}=${trait1.recessiveName})`,
      trait2 ? `Sifat 2: ${trait2.name} (${trait2.dominantSymbol}=${trait2.dominantName}, ${trait2.recessiveSymbol}=${trait2.recessiveName})` : '',
      ``,
      `-- RASIO FENOTIPE (Perbandingan Sifat Tampak) --`,
      ...phenotypicRatios.map((p) => `- ${p.key}: ${p.count}/${p.total} (${p.percentage}%) [Rasio: ${p.ratioValue}]`),
      `Perbandingan Sederhana: ${phenotypicRatios.map((p) => p.ratioValue).join(' : ')}`,
      ``,
      `-- RASIO GENOTIPE (Perbandingan Pasangan Alel) --`,
      ...genotypicRatios.map((g) => `- ${g.key}: ${g.count}/${g.total} (${g.percentage}%) [Rasio: ${g.ratioValue}]`),
      `Perbandingan Sederhana: ${genotypicRatios.map((g) => g.ratioValue).join(' : ')}`,
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <h3 className="text-base font-bold text-white tracking-wide">
            Analisis Rasio Keturunan (F2)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Switcher */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex text-xs font-bold">
            <button
              onClick={() => setActiveTab('phenotype')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'phenotype'
                  ? 'bg-teal-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rasio Fenotipe
            </button>
            <button
              onClick={() => setActiveTab('genotype')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'genotype'
                  ? 'bg-teal-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rasio Genotipe
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition-all border border-slate-600 text-xs font-semibold flex items-center gap-1"
            title="Salin Rangkuman"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden md:inline">{copied ? 'Tersalin!' : 'Salin'}</span>
          </button>
        </div>
      </div>

      {/* Mathematical Ratio Highlight Card */}
      <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <PieChart className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            Perbandingan Matematika Sederhana ({activeTab === 'phenotype' ? 'Fenotipe' : 'Genotipe'}):
          </span>
        </div>
        <div className="font-mono text-base font-black text-teal-300 bg-slate-800 px-3 py-1 rounded-lg border border-teal-500/30 tracking-wider">
          {ratioString}
        </div>
      </div>

      {/* Dynamic Bar Charts */}
      <div className="space-y-3 pt-1">
        {items.map((item) => {
          const isHighlighted = highlightKey === item.key;

          return (
            <div
              key={item.key}
              onMouseEnter={() => onHoverKey(item.key)}
              onMouseLeave={() => onHoverKey(null)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isHighlighted
                  ? 'bg-slate-750 border-amber-400/80 shadow-lg scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-base">{item.icon}</span>}
                  <span className="text-white text-sm font-extrabold">{item.key}</span>
                  {item.genotypes && item.genotypes.length > 0 && (
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      ({item.genotypes.join(', ')})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-300">{item.fractionString}</span>
                  <span className="text-teal-300 font-black">{item.percentage}%</span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden border border-slate-700 p-0.5">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
        <Info className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span>Arahkan kursor atau sentuh item di atas untuk menyorot sel terkait pada Tabel Punnett.</span>
      </div>

    </div>
  );
};
