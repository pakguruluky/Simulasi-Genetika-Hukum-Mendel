import React, { useState, useEffect } from 'react';
import { CrossMode, TraitConfig, PunnettCell } from '../types/genetics';
import { buildPunnettSquare } from '../utils/genetics';
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, Grid, Sparkles, Filter } from 'lucide-react';

interface PunnettSquareProps {
  mode: CrossMode;
  p1Genotype: string;
  p2Genotype: string;
  trait1: TraitConfig;
  trait2?: TraitConfig;
  highlightKey: string | null;
  onHoverKey: (key: string | null) => void;
}

export const PunnettSquare: React.FC<PunnettSquareProps> = ({
  mode,
  p1Genotype,
  p2Genotype,
  trait1,
  trait2,
  highlightKey,
  onHoverKey,
}) => {
  const { rowGametes, colGametes, matrix, flatCells } = buildPunnettSquare(
    p1Genotype,
    p2Genotype,
    mode,
    trait1,
    trait2
  );

  const totalCells = flatCells.length;

  // Animation state for step-by-step fill
  const [revealedCount, setRevealedCount] = useState<number>(totalCells);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(400); // ms per step

  // Reset revealed count when parents or mode changes
  useEffect(() => {
    setRevealedCount(totalCells);
    setIsPlaying(false);
  }, [p1Genotype, p2Genotype, mode, totalCells]);

  // Handle auto-play animation interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (revealedCount < totalCells) {
        timer = setTimeout(() => {
          setRevealedCount((prev) => prev + 1);
        }, speed);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, revealedCount, totalCells, speed]);

  const handleStartAnimation = () => {
    setRevealedCount(0);
    setIsPlaying(true);
  };

  const handleNextStep = () => {
    if (revealedCount < totalCells) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  const handleFillAll = () => {
    setRevealedCount(totalCells);
    setIsPlaying(false);
  };

  const isCellRevealed = (index: number) => index < revealedCount;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
      
      {/* Header & Animation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-teal-400" />
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Tabel Punnett ({mode === 'monohybrid' ? '2x2' : '4x4'})
            </h3>
            <p className="text-xs text-slate-400">
              {revealedCount} dari {totalCells} Kombinasi Terisi
            </p>
          </div>
        </div>

        {/* Step-by-Step Animation Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {!isPlaying ? (
            <button
              onClick={handleStartAnimation}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1 shadow-md shadow-teal-900/20"
              title="Mulai Animasi Bertahap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Animasi</span>
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(false)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1 shadow-md"
              title="Jeda Animasi"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Jeda</span>
            </button>
          )}

          <button
            onClick={handleNextStep}
            disabled={revealedCount >= totalCells}
            className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Langkah Berikutnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleFillAll}
            className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
            title="Isi Semua Sekaligus"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Semua</span>
          </button>

          {/* Speed Selector */}
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 focus:outline-none"
          >
            <option value={800}>Lambat</option>
            <option value={400}>Sedang</option>
            <option value={150}>Cepat</option>
          </select>
        </div>
      </div>

      {/* Punnett Table Layout */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full align-middle">
          <table className="border-collapse mx-auto">
            <thead>
              <tr>
                {/* Top-Left Corner Cell: P1 ♂ \ P2 ♀ */}
                <th className="p-2 border border-slate-700 bg-slate-900/90 text-slate-400 text-xs font-extrabold w-20 h-16 rounded-tl-xl text-center">
                  <div className="text-[10px] text-teal-400">P2 ♀ (Atas)</div>
                  <div className="text-[10px] text-emerald-400">P1 ♂ (Kiri)</div>
                </th>

                {/* Column Headers (P2 Gametes) */}
                {colGametes.map((gamete, colIdx) => (
                  <th
                    key={`col-header-${colIdx}`}
                    className="p-2 border border-slate-700 bg-slate-900 text-teal-300 font-mono font-black text-sm md:text-base text-center w-28 md:w-36 h-16 shadow-inner"
                  >
                    <div className="text-xs text-slate-500 font-normal">Gamet P2</div>
                    <span className="bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60 inline-block">
                      {gamete}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {matrix.map((row, rowIdx) => (
                <tr key={`row-${rowIdx}`}>
                  {/* Row Header (P1 Gamete) */}
                  <th className="p-2 border border-slate-700 bg-slate-900 text-emerald-300 font-mono font-black text-sm md:text-base text-center w-20 h-28 shadow-inner">
                    <div className="text-[10px] text-slate-500 font-normal">Gamet P1</div>
                    <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 inline-block">
                      {rowGametes[rowIdx]}
                    </span>
                  </th>

                  {/* Cell Items */}
                  {row.map((cell, colIdx) => {
                    const flatIdx = rowIdx * colGametes.length + colIdx;
                    const revealed = isCellRevealed(flatIdx);

                    // Check if cell is highlighted
                    const isMatchHighlight =
                      highlightKey &&
                      (cell.genotype === highlightKey || cell.phenotypeName === highlightKey);

                    return (
                      <td
                        key={cell.id}
                        onMouseEnter={() => onHoverKey(cell.phenotypeName)}
                        onMouseLeave={() => onHoverKey(null)}
                        className={`p-2.5 border border-slate-700/80 text-center transition-all duration-300 relative group cursor-pointer ${
                          revealed ? cell.colorClass : 'bg-slate-900/60 text-slate-600'
                        } ${
                          isMatchHighlight
                            ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-900 z-10 scale-[1.03]'
                            : ''
                        }`}
                      >
                        {revealed ? (
                          <div className="flex flex-col items-center justify-between h-full space-y-1 py-1">
                            {/* Genotype Display */}
                            <div className="font-mono text-base md:text-lg font-black tracking-wider text-white bg-slate-900/70 px-2.5 py-0.5 rounded border border-slate-700/60 shadow-sm">
                              {cell.genotype}
                            </div>

                            {/* Badge Icon & Phenotype Text */}
                            <div className="flex items-center gap-1 my-0.5">
                              <span className="text-base">{cell.badgeIcon}</span>
                              <span className="text-xs font-bold leading-tight">
                                {cell.phenotypeName}
                              </span>
                            </div>

                            {/* Gamete derivation hint */}
                            <div className="text-[10px] text-slate-400 font-mono">
                              ({cell.gameteP1} + {cell.gameteP2})
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-20 text-slate-600 font-mono text-xs">
                            <span className="text-slate-600 font-bold">?</span>
                            <span className="text-[9px] mt-1 text-slate-700">Tersembunyi</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Highlight Hint */}
      {highlightKey && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Menyorot kombinasi: <strong>{highlightKey}</strong>
            </span>
          </div>
          <button
            onClick={() => onHoverKey(null)}
            className="text-amber-400 hover:underline font-bold"
          >
            Bersihkan Highlight
          </button>
        </div>
      )}
    </div>
  );
};
