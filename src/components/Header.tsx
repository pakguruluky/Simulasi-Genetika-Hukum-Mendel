import React from 'react';
import { CrossMode, PresetCross } from '../types/genetics';
import { PRESET_CROSSES } from '../data/presets';
import { Dna, RefreshCw, BookOpen, HelpCircle, PlusCircle, Sparkles, Share2, FileText } from 'lucide-react';

interface HeaderProps {
  currentMode: CrossMode;
  onModeChange: (mode: CrossMode) => void;
  selectedPresetId: string;
  onPresetSelect: (preset: PresetCross) => void;
  onReset: () => void;
  onOpenQuiz: () => void;
  onOpenCustomTrait: () => void;
  onToggleTheoryPanel: () => void;
  onOpenLkpd: () => void;
  isTheoryOpen: boolean;
  onCopySummary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  selectedPresetId,
  onPresetSelect,
  onReset,
  onOpenQuiz,
  onOpenCustomTrait,
  onToggleTheoryPanel,
  onOpenLkpd,
  isTheoryOpen,
  onCopySummary,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20 shrink-0">
              <Dna className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  Simulasi Genetika Mendel
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Biologi SMA
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Laboratorium Virtual Hukum Mendel I & II Interaktif
              </p>
            </div>
          </div>

          {/* Mode Selector & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Mode Switcher */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 flex items-center shrink-0">
              <button
                onClick={() => onModeChange('monohybrid')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  currentMode === 'monohybrid'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>1 Sifat (Monohibrid)</span>
              </button>
              <button
                onClick={() => onModeChange('dihybrid')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  currentMode === 'dihybrid'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>2 Sifat (Dihibrid)</span>
              </button>
            </div>

            {/* Presets Dropdown */}
            <div className="relative">
              <select
                value={selectedPresetId}
                onChange={(e) => {
                  const preset = PRESET_CROSSES.find((p) => p.id === e.target.value);
                  if (preset) onPresetSelect(preset);
                }}
                className="bg-slate-800/90 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer font-medium hover:bg-slate-750 transition-colors"
              >
                <optgroup label="Preset Monohibrid">
                  {PRESET_CROSSES.filter((p) => p.mode === 'monohybrid').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Preset Dihibrid">
                  {PRESET_CROSSES.filter((p) => p.mode === 'dihybrid').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Custom Trait Button */}
            <button
              onClick={onOpenCustomTrait}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-teal-300 rounded-xl border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1"
              title="Buat Sifat Kustom"
            >
              <PlusCircle className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">Kustom</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 rounded-xl border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1"
              title="Reset Simulasi"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-900/30 flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Kuis SMA</span>
            </button>

            {/* LKPD Button */}
            <button
              onClick={onOpenLkpd}
              className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-900/30 flex items-center gap-1.5"
              title="Lembar Kerja Peserta Didik (LKPD) & Cetak"
            >
              <FileText className="w-4 h-4" />
              <span>LKPD</span>
            </button>

            {/* Theory Drawer Toggle */}
            <button
              onClick={onToggleTheoryPanel}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1 ${
                isTheoryOpen
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Materi & Glosarium"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">Materi</span>
            </button>

            {/* Copy / Share Button */}
            <button
              onClick={onCopySummary}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-teal-300 rounded-xl border border-slate-700 text-xs font-semibold transition-all flex items-center"
              title="Salin Rangkuman Hasil Simulasi"
            >
              <Share2 className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
