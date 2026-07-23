import React, { useState } from 'react';
import { CrossMode, TraitConfig } from '../types/genetics';
import { PlusCircle, X, Sparkles, Check } from 'lucide-react';

interface CustomTraitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: CrossMode;
  onApplyCustomTraits: (mode: CrossMode, trait1: TraitConfig, trait2?: TraitConfig) => void;
}

export const CustomTraitModal: React.FC<CustomTraitModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  onApplyCustomTraits,
}) => {
  const [mode, setMode] = useState<CrossMode>(currentMode);

  // Trait 1 fields
  const [t1Name, setT1Name] = useState('Warna Bunga');
  const [t1DomSym, setT1DomSym] = useState('M');
  const [t1RecSym, setT1RecSym] = useState('m');
  const [t1DomName, setT1DomName] = useState('Merah');
  const [t1RecName, setT1RecName] = useState('Putih');
  const [t1DomIcon, setT1DomIcon] = useState('🌺');
  const [t1RecIcon, setT1RecIcon] = useState('🌸');

  // Trait 2 fields
  const [t2Name, setT2Name] = useState('Tinggi Batang');
  const [t2DomSym, setT2DomSym] = useState('T');
  const [t2RecSym, setT2RecSym] = useState('t');
  const [t2DomName, setT2DomName] = useState('Tinggi');
  const [t2RecName, setT2RecName] = useState('Kerdil');
  const [t2DomIcon, setT2DomIcon] = useState('🌲');
  const [t2RecIcon, setT2RecIcon] = useState('🌱');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trait1: TraitConfig = {
      name: t1Name || 'Sifat 1',
      dominantSymbol: (t1DomSym || 'A').toUpperCase().charAt(0),
      recessiveSymbol: (t1RecSym || 'a').toLowerCase().charAt(0),
      dominantName: t1DomName || 'Dominan',
      recessiveName: t1RecName || 'Resesif',
      iconDominant: t1DomIcon || '🟢',
      iconRecessive: t1RecIcon || '🔴',
      colorDominant: 'teal',
      colorRecessive: 'amber',
    };

    let trait2: TraitConfig | undefined = undefined;

    if (mode === 'dihybrid') {
      trait2 = {
        name: t2Name || 'Sifat 2',
        dominantSymbol: (t2DomSym || 'B').toUpperCase().charAt(0),
        recessiveSymbol: (t2RecSym || 'b').toLowerCase().charAt(0),
        dominantName: t2DomName || 'Dominan 2',
        recessiveName: t2RecName || 'Resesif 2',
        iconDominant: t2DomIcon || '🟡',
        iconRecessive: t2RecIcon || '🟢',
        colorDominant: 'yellow',
        colorRecessive: 'lime',
      };
    }

    onApplyCustomTraits(mode, trait1, trait2);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Buat Sifat Genetika Kustom</h2>
              <p className="text-xs text-slate-400">Tentukan nama sifat, simbol alel, dan fenotipe sendiri</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Cross Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Jenis Persilangan:
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setMode('monohybrid')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'monohybrid' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monohibrid (1 Sifat)
              </button>
              <button
                type="button"
                onClick={() => setMode('dihybrid')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'dihybrid' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dihibrid (2 Sifat)
              </button>
            </div>
          </div>

          {/* Trait 1 Configuration */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
            <h3 className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">
              Sifat Pertama (Monohibrid / Sifat 1)
            </h3>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Nama Sifat (misal: Warna Bunga)</label>
              <input
                type="text"
                value={t1Name}
                onChange={(e) => setT1Name(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-teal-300 font-semibold mb-1">
                  Alel Dominan (Huruf KAPITAL)
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={t1DomSym}
                  onChange={(e) => setT1DomSym(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-amber-300 font-semibold mb-1">
                  Alel Resesif (Huruf Kecil)
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={t1RecSym}
                  onChange={(e) => setT1RecSym(e.target.value.toLowerCase())}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nama Fenotipe Dominan</label>
                <input
                  type="text"
                  value={t1DomName}
                  onChange={(e) => setT1DomName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nama Fenotipe Resesif</label>
                <input
                  type="text"
                  value={t1RecName}
                  onChange={(e) => setT1RecName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Trait 2 Configuration if Dihybrid */}
          {mode === 'dihybrid' && (
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
              <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                Sifat Kedua (Dihibrid / Sifat 2)
              </h3>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nama Sifat 2 (misal: Tinggi Batang)</label>
                <input
                  type="text"
                  value={t2Name}
                  onChange={(e) => setT2Name(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required={mode === 'dihybrid'}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-emerald-300 font-semibold mb-1">
                    Alel Dominan Sifat 2
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={t2DomSym}
                    onChange={(e) => setT2DomSym(e.target.value.toUpperCase())}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required={mode === 'dihybrid'}
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-lime-300 font-semibold mb-1">
                    Alel Resesif Sifat 2
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={t2RecSym}
                    onChange={(e) => setT2RecSym(e.target.value.toLowerCase())}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required={mode === 'dihybrid'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nama Fenotipe Dominan 2</label>
                  <input
                    type="text"
                    value={t2DomName}
                    onChange={(e) => setT2DomName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required={mode === 'dihybrid'}
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nama Fenotipe Resesif 2</label>
                  <input
                    type="text"
                    value={t2RecName}
                    onChange={(e) => setT2RecName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required={mode === 'dihybrid'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-950/40 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Terapkan Sifat Kustom</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
