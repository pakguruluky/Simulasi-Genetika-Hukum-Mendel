import React, { useState } from 'react';
import { CrossMode, TraitConfig, PresetCross } from './types/genetics';
import { PRESET_CROSSES } from './data/presets';
import { buildPunnettSquare, computeRatios } from './utils/genetics';
import { Header } from './components/Header';
import { ParentSelector } from './components/ParentSelector';
import { GameteDisplay } from './components/GameteDisplay';
import { PunnettSquare } from './components/PunnettSquare';
import { RatioAnalysis } from './components/RatioAnalysis';
import { ProbabilityCalculator } from './components/ProbabilityCalculator';
import { TheoryPanel } from './components/TheoryPanel';
import { QuizModal } from './components/QuizModal';
import { CustomTraitModal } from './components/CustomTraitModal';
import { LkpdModal } from './components/LkpdModal';
import { Dna, Sparkles, BookOpen, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Current mode
  const [mode, setMode] = useState<CrossMode>('monohybrid');

  // Selected preset
  const [selectedPreset, setSelectedPreset] = useState<PresetCross>(PRESET_CROSSES[0]);

  // Current traits
  const [trait1, setTrait1] = useState<TraitConfig>(PRESET_CROSSES[0].trait1);
  const [trait2, setTrait2] = useState<TraitConfig | undefined>(PRESET_CROSSES[0].trait2);

  // Parent Genotypes
  const [p1Genotype, setP1Genotype] = useState<string>(PRESET_CROSSES[0].defaultP1);
  const [p2Genotype, setP2Genotype] = useState<string>(PRESET_CROSSES[0].defaultP2);

  // Highlighting key (hovered phenotype or genotype)
  const [highlightKey, setHighlightKey] = useState<string | null>(null);

  // Modals / Drawers State
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isCustomTraitOpen, setIsCustomTraitOpen] = useState<boolean>(false);
  const [isLkpdOpen, setIsLkpdOpen] = useState<boolean>(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch Cross Mode
  const handleModeChange = (newMode: CrossMode) => {
    setMode(newMode);
    setHighlightKey(null);

    const defaultPreset = PRESET_CROSSES.find((p) => p.mode === newMode) || PRESET_CROSSES[0];
    setSelectedPreset(defaultPreset);
    setTrait1(defaultPreset.trait1);
    setTrait2(defaultPreset.trait2);
    setP1Genotype(defaultPreset.defaultP1);
    setP2Genotype(defaultPreset.defaultP2);
  };

  // Select Preset
  const handlePresetSelect = (preset: PresetCross) => {
    setSelectedPreset(preset);
    setMode(preset.mode);
    setTrait1(preset.trait1);
    setTrait2(preset.trait2);
    setP1Genotype(preset.defaultP1);
    setP2Genotype(preset.defaultP2);
    setHighlightKey(null);
  };

  // Swap Parents
  const handleSwapParents = () => {
    const temp = p1Genotype;
    setP1Genotype(p2Genotype);
    setP2Genotype(temp);
  };

  // Reset to default settings
  const handleReset = () => {
    setP1Genotype(selectedPreset.defaultP1);
    setP2Genotype(selectedPreset.defaultP2);
    setHighlightKey(null);
    showToast('Simulasi telah direset ke nilai awal!');
  };

  // Apply custom traits
  const handleApplyCustomTraits = (
    customMode: CrossMode,
    cTrait1: TraitConfig,
    cTrait2?: TraitConfig
  ) => {
    setMode(customMode);
    setTrait1(cTrait1);
    setTrait2(cTrait2);

    if (customMode === 'monohybrid') {
      const dom = cTrait1.dominantSymbol;
      const rec = cTrait1.recessiveSymbol;
      setP1Genotype(`${dom}${rec}`);
      setP2Genotype(`${dom}${rec}`);
    } else {
      const dom1 = cTrait1.dominantSymbol;
      const rec1 = cTrait1.recessiveSymbol;
      const dom2 = cTrait2 ? cTrait2.dominantSymbol : 'B';
      const rec2 = cTrait2 ? cTrait2.recessiveSymbol : 'b';
      setP1Genotype(`${dom1}${rec1}${dom2}${rec2}`);
      setP2Genotype(`${dom1}${rec1}${dom2}${rec2}`);
    }

    setHighlightKey(null);
    showToast('Sifat kustom berhasil diterapkan!');
  };

  // Calculate Punnett flat cells for ratio & probability analysis
  const { rowGametes, colGametes, matrix, flatCells } = buildPunnettSquare(p1Genotype, p2Genotype, mode, trait1, trait2);
  const { genotypicRatios, phenotypicRatios } = computeRatios(flatCells, mode, trait1, trait2);

  // Helper for parent phenotype string
  const getPhenotypeString = (genotype: string) => {
    if (mode === 'monohybrid') {
      return genotype.includes(trait1.dominantSymbol) ? trait1.dominantName : trait1.recessiveName;
    } else {
      const t1Dom = genotype.slice(0, 2).includes(trait1.dominantSymbol);
      const t1Pheno = t1Dom ? trait1.dominantName : trait1.recessiveName;
      const t2DomSym = trait2 ? trait2.dominantSymbol : 'K';
      const t2Dom = genotype.slice(2, 4).includes(t2DomSym);
      const t2Pheno = trait2 ? (t2Dom ? trait2.dominantName : trait2.recessiveName) : '';
      return `${t1Pheno}, ${t2Pheno}`;
    }
  };

  // Copy Summary text
  const handleCopySummary = () => {
    const text = `Simulasi Genetika Mendel (${mode === 'monohybrid' ? 'Monohibrid' : 'Dihibrid'})\n` +
      `Induk 1 (P1): ${p1Genotype} x Induk 2 (P2): ${p2Genotype}\n` +
      `Sifat 1: ${trait1.name} (${trait1.dominantSymbol}/${trait1.recessiveSymbol})\n` +
      (trait2 ? `Sifat 2: ${trait2.name} (${trait2.dominantSymbol}/${trait2.recessiveSymbol})\n` : '');

    navigator.clipboard.writeText(text);
    showToast('Rangkuman hasil berhasil disalin ke clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        currentMode={mode}
        onModeChange={handleModeChange}
        selectedPresetId={selectedPreset.id}
        onPresetSelect={handlePresetSelect}
        onReset={handleReset}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCustomTrait={() => setIsCustomTraitOpen(true)}
        onToggleTheoryPanel={() => setIsTheoryOpen(!isTheoryOpen)}
        onOpenLkpd={() => setIsLkpdOpen(true)}
        isTheoryOpen={isTheoryOpen}
        onCopySummary={handleCopySummary}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-teal-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-teal-300 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Preset Description Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-700/80 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">
                {selectedPreset.title}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedPreset.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTheoryOpen(true)}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 shrink-0 hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Baca Panduan Sifat</span>
          </button>
        </div>

        {/* Section 1: Parent Selector (Parental / P) */}
        <ParentSelector
          mode={mode}
          trait1={trait1}
          trait2={trait2}
          p1Genotype={p1Genotype}
          p2Genotype={p2Genotype}
          onP1Change={setP1Genotype}
          onP2Change={setP2Genotype}
          onSwapParents={handleSwapParents}
        />

        {/* Section 2: Meiosis & Gamete Formation */}
        <GameteDisplay
          mode={mode}
          p1Genotype={p1Genotype}
          p2Genotype={p2Genotype}
          trait1={trait1}
          trait2={trait2}
        />

        {/* Section 3 & 4: Punnett Square & Ratio Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Punnett Square Matrix (7 cols) */}
          <div className="lg:col-span-7">
            <PunnettSquare
              mode={mode}
              p1Genotype={p1Genotype}
              p2Genotype={p2Genotype}
              trait1={trait1}
              trait2={trait2}
              highlightKey={highlightKey}
              onHoverKey={setHighlightKey}
            />
          </div>

          {/* Ratio Analysis & Bar Charts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <RatioAnalysis
              mode={mode}
              trait1={trait1}
              trait2={trait2}
              flatCells={flatCells}
              highlightKey={highlightKey}
              onHoverKey={setHighlightKey}
            />

            <ProbabilityCalculator
              mode={mode}
              trait1={trait1}
              trait2={trait2}
              flatCells={flatCells}
            />
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-400">
              Simulasi Genetika Hukum Mendel &copy; {new Date().getFullYear()} — Media Pembelajaran Biologi SMA <span className="text-teal-400 font-medium">by. Pak GuruAI</span>
            </p>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <button onClick={() => setIsLkpdOpen(true)} className="hover:text-emerald-400 text-teal-400 font-semibold transition-colors">
              LKPD Siswa & Cetak
            </button>
            <span>&bull;</span>
            <button onClick={() => setIsTheoryOpen(true)} className="hover:text-teal-400 transition-colors">
              Materi & Referensi
            </button>
            <span>&bull;</span>
            <button onClick={() => setIsQuizOpen(true)} className="hover:text-teal-400 transition-colors">
              Kuis Evaluasi
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <TheoryPanel
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        onOpenLkpd={() => {
          setIsTheoryOpen(false);
          setIsLkpdOpen(true);
        }}
      />
      
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <CustomTraitModal
        isOpen={isCustomTraitOpen}
        onClose={() => setIsCustomTraitOpen(false)}
        currentMode={mode}
        onApplyCustomTraits={handleApplyCustomTraits}
      />

      <LkpdModal
        isOpen={isLkpdOpen}
        onClose={() => setIsLkpdOpen(false)}
        mode={mode}
        parent1Genotype={p1Genotype}
        parent1Phenotype={getPhenotypeString(p1Genotype)}
        parent2Genotype={p2Genotype}
        parent2Phenotype={getPhenotypeString(p2Genotype)}
        gametes1={rowGametes}
        gametes2={colGametes}
        punnettSquare={{
          headersX: colGametes,
          headersY: rowGametes,
          grid: matrix.map((row) =>
            row.map((cell) => ({
              genotype: cell.genotype,
              phenotype: cell.phenotypeName,
              color: cell.colorClass,
            }))
          ),
        }}
        genotypeRatios={genotypicRatios.map((g) => ({
          genotype: g.key,
          count: g.count,
          percentage: g.percentage,
        }))}
        phenotypeResults={phenotypicRatios.map((p) => ({
          phenotype: p.key,
          count: p.count,
          percentage: p.percentage,
        }))}
      />

    </div>
  );
}
