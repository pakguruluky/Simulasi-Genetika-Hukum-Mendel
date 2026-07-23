import React, { useState } from 'react';
import { BookOpen, X, ChevronRight, Dna, HelpCircle, Lightbulb, Award, Sparkles } from 'lucide-react';

interface TheoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hukum' | 'glosarium' | 'rumus'>('hukum');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/80 shadow-2xl z-50 flex flex-col text-slate-200 transition-all duration-300">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          <h2 className="text-base font-bold text-white">Rangkuman Materi Mendel SMA</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/80 text-xs font-bold">
        <button
          onClick={() => setActiveTab('hukum')}
          className={`flex-1 py-3 text-center transition-colors border-b-2 ${
            activeTab === 'hukum'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Hukum Mendel
        </button>
        <button
          onClick={() => setActiveTab('glosarium')}
          className={`flex-1 py-3 text-center transition-colors border-b-2 ${
            activeTab === 'glosarium'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Glosarium
        </button>
        <button
          onClick={() => setActiveTab('rumus')}
          className={`flex-1 py-3 text-center transition-colors border-b-2 ${
            activeTab === 'rumus'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Rumus Cepat
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs leading-relaxed">
        
        {activeTab === 'hukum' && (
          <div className="space-y-5">
            {/* Hukum I Mendel */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-extrabold text-sm">
                <Dna className="w-4 h-4 shrink-0" />
                <h3>Hukum I Mendel (Segregasi Bebas)</h3>
              </div>
              <p className="text-slate-300">
                Bunyi: <em>&quot;Pada pembentukan gamet, pasangan alel akan memisah (bersegregasi) secara bebas sehingga setiap gamet hanya menerima satu alel dari pasangannya.&quot;</em>
              </p>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700 text-[11px] text-slate-300">
                <strong>Contoh Persilangan Monohibrid:</strong>
                <br />Induk (P): Bb × Bb
                <br />Gamet: B dan b
                <br />Keturunan (F2): 1 BB : 2 Bb : 1 bb
                <br />Rasio Fenotipe: <strong>3 Dominan : 1 Resesif (75% : 25%)</strong>
              </div>
            </div>

            {/* Hukum II Mendel */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                <Sparkles className="w-4 h-4 shrink-0" />
                <h3>Hukum II Mendel (Asortasi Bebas)</h3>
              </div>
              <p className="text-slate-300">
                Bunyi: <em>&quot;Setiap gen/alel yang mengendalikan sifat yang berbeda akan berpasangan secara bebas (mengelompok secara independen) pada saat pembentukan gamet.&quot;</em>
              </p>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700 text-[11px] text-slate-300">
                <strong>Contoh Persilangan Dihibrid:</strong>
                <br />Induk (P): BbKk × BbKk
                <br />Gamet: BK, Bk, bK, bk (4 Jenis Gamet)
                <br />Rasio Fenotipe F2: <strong>9 : 3 : 3 : 1</strong>
                <br />(9 Dominan-Dominan, 3 Dominan-Resesif, 3 Resesif-Dominan, 1 Resesif-Resesif)
              </div>
            </div>
          </div>
        )}

        {activeTab === 'glosarium' && (
          <div className="space-y-3">
            {[
              { title: 'Genotipe', desc: 'Susunan genetik atau susunan alel suatu individu (misal: BB, Bb, bb) yang tidak tampak secara fisik.' },
              { title: 'Fenotipe', desc: 'Sifat fisik atau karakteristik tampak dari suatu individu hasil interaksi genotipe dengan lingkungan (misal: Biji Bulat, Bunga Merah).' },
              { title: 'Alel', desc: 'Bentuk alternatif dari suatu gen yang menempati lokasi (lokus) yang sama pada kromosom homolog.' },
              { title: 'Dominan', desc: 'Sifat gen yang menutupi ekspresi alel pasangannya, disimbolkan dengan huruf KAPITAL (misal: B).' },
              { title: 'Resesif', desc: 'Sifat gen yang tertutupi oleh sifat dominan dan baru muncul jika berpasangan homozigot, disimbolkan huruf kecil (misal: b).' },
              { title: 'Homozigot', desc: 'Pasangan alel yang identik untuk sifat tertentu (BB = Homozigot Dominan, bb = Homozigot Resesif).' },
              { title: 'Heterozigot', desc: 'Pasangan alel yang berbeda untuk sifat tertentu (misal: Bb atau BbKk).' },
              { title: 'Parental (P)', desc: 'Induk atau orang tua yang melakukan persilangan.' },
              { title: 'Filial (F)', desc: 'Keturunan atau anak hasil persilangan (F1 = generasi pertama, F2 = generasi kedua).' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="font-extrabold text-teal-300 text-xs">{item.title}</div>
                <div className="text-slate-300 text-[11px] mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rumus' && (
          <div className="space-y-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                <Lightbulb className="w-4 h-4 shrink-0" />
                <h3>Rumus Cepat Persilangan Mendel</h3>
              </div>
              <p className="text-slate-300">
                Gunakan nilai <strong>n</strong> = Jumlah Pasangan Heterozigot pada genotipe induk.
              </p>

              <div className="space-y-2 pt-2">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-teal-400 font-extrabold">1. Jumlah Jenis Gamet:</span>
                  <div className="font-mono text-sm text-white font-black my-1">2ⁿ</div>
                  <p className="text-slate-400 text-[11px]">Contoh: BbKk Memiliki 2 Heterozigot (Bb dan Kk) → 2² = 4 jenis gamet.</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-emerald-400 font-extrabold">2. Jumlah Kombinasi F2 (Kotak Punnett):</span>
                  <div className="font-mono text-sm text-white font-black my-1">4ⁿ (atau (2ⁿ) × (2ⁿ))</div>
                  <p className="text-slate-400 text-[11px]">Contoh: Monohibrid (n=1) → 4¹ = 4 kotak. Dihibrid (n=2) → 4² = 16 kotak.</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-indigo-400 font-extrabold">3. Jumlah Variasi Genotipe F2:</span>
                  <div className="font-mono text-sm text-white font-black my-1">3ⁿ</div>
                  <p className="text-slate-400 text-[11px]">Contoh: Monohibrid → 3¹ = 3 jenis genotipe (BB, Bb, bb). Dihibrid → 3² = 9 jenis genotipe.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
