import React, { useState } from 'react';
import { FileText, Printer, Download, User, School, Calendar, Users, X, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { CrossMode } from '../types/genetics';
import { generatePrintableLkpdHtml, StudentIdentity, PhenotypeResult } from '../utils/lkpdExport';

interface LkpdModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: CrossMode;
  parent1Genotype: string;
  parent1Phenotype: string;
  parent2Genotype: string;
  parent2Phenotype: string;
  gametes1: string[];
  gametes2: string[];
  punnettSquare: {
    headersX: string[];
    headersY: string[];
    grid: { genotype: string; phenotype: string; color: string }[][];
  };
  genotypeRatios: { genotype: string; count: number; percentage: number }[];
  phenotypeResults: PhenotypeResult[];
}

export const LkpdModal: React.FC<LkpdModalProps> = ({
  isOpen,
  onClose,
  mode,
  parent1Genotype,
  parent1Phenotype,
  parent2Genotype,
  parent2Phenotype,
  gametes1,
  gametes2,
  punnettSquare,
  genotypeRatios,
  phenotypeResults,
}) => {
  // Student Identity State
  const [identity, setIdentity] = useState<StudentIdentity>({
    nama: '',
    kelas: 'Fase F (XII 1)',
    kelompok: 'Kelompok 1',
    sekolah: 'SMA Negeri 1',
    tanggal: new Date().toISOString().split('T')[0],
    guru: 'Pak Guru Luky',
  });

  // Discussion Questions Answers State
  const [answers, setAnswers] = useState({
    q1_parentAnalysis: `Induk Jantan bergenotipe ${parent1Genotype} (${parent1Phenotype}) membentuk gamet: ${gametes1.join(', ')}.\nInduk Betina bergenotipe ${parent2Genotype} (${parent2Phenotype}) membentuk gamet: ${gametes2.join(', ')}.`,
    q2_gameteFormation: 'Pembentukan gamet terjadi melalui pembelahan sel Meiosis I (khususnya tahap Anafase I). Pasangan alel homolog memisah (bersegregasi) secara bebas sehingga tiap sel gamet hanya membawa 1 alel dari pasangannya.',
    q3_punnettAnalysis: `Hasil kombinasi kotak Punnett F2 menghasilkan ${genotypeRatios.length} macam genotipe dan ${phenotypeResults.length} macam fenotipe. Rasio fenotipe yang diperoleh adalah ${phenotypeResults.map(p => `${p.phenotype} (${p.count})`).join(' : ')}. Hasil ini ${mode === 'monohybrid' ? 'membuktikan Hukum I Mendel (rasio 3:1)' : 'membuktikan Hukum II Mendel (rasio 9:3:3:1)'}.`,
    q4_lawConnection: 'Jika dilakukan Testcross (disilangkan dengan homozigot resesif), maka perbandingan fenotipe keturunan akan menjadi 1 : 1 (pada monohibrid) atau 1 : 1 : 1 : 1 (pada dihibrid heterozigot).',
    q5_conclusion: 'Dapat disimpulkan bahwa pewarisan sifat pada persilangan ini mengikuti kaidah Hukum Mendel dengan segregasi dan asortasi bebas alel saat pembentukan gamet.',
  });

  if (!isOpen) return null;

  const handlePrintOrDownload = () => {
    const fullLkpdData = {
      identity,
      mode,
      parent1Genotype,
      parent1Phenotype,
      parent2Genotype,
      parent2Phenotype,
      gametes1,
      gametes2,
      punnettSquare,
      genotypeRatios,
      phenotypeResults,
      answers,
    };

    const htmlContent = generatePrintableLkpdHtml(fullLkpdData);

    // Open new window with print HTML
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      // focus
      printWindow.focus();
    } else {
      // Fallback: Blob download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LKPD_Mendel_${identity.nama ? identity.nama.replace(/\s+/g, '_') : 'Siswa'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Lembar Kerja Peserta Didik (LKPD)</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Siap Cetak / Unduh
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Isi identitas siswa, amati data simulasi otomatis, dan cetak LKPD untuk penilaian guru.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Identitas Siswa Form */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center space-x-2 text-teal-300 font-bold text-sm">
                <User className="w-4 h-4 text-teal-400" />
                <h3>1. Identitas Peserta Didik & Sekolah</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Lengkapi data untuk dicetak di LKPD</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  value={identity.nama}
                  onChange={(e) => setIdentity({ ...identity, nama: e.target.value })}
                  placeholder="Contoh: Ahmad Rizky"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kelas / Fase</label>
                <input
                  type="text"
                  value={identity.kelas}
                  onChange={(e) => setIdentity({ ...identity, kelas: e.target.value })}
                  placeholder="Contoh: XII Biologi 1 / Fase F"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kelompok Praktikum</label>
                <input
                  type="text"
                  value={identity.kelompok}
                  onChange={(e) => setIdentity({ ...identity, kelompok: e.target.value })}
                  placeholder="Contoh: Kelompok 3"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tanggal Pelaksanaan</label>
                <input
                  type="date"
                  value={identity.tanggal}
                  onChange={(e) => setIdentity({ ...identity, tanggal: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Sekolah / Instansi</label>
                <input
                  type="text"
                  value={identity.sekolah}
                  onChange={(e) => setIdentity({ ...identity, sekolah: e.target.value })}
                  placeholder="Contoh: SMA Negeri 1 Jakarta"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Guru Mata Pelajaran</label>
                <input
                  type="text"
                  value={identity.guru}
                  onChange={(e) => setIdentity({ ...identity, guru: e.target.value })}
                  placeholder="Contoh: Pak Guru Luky, S.Pd."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Ringkasan Data Simulasi Aktif */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3>2. Data Hasil Observasi Simulasi Virtual (Otomatis Terhubung)</h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {mode === 'monohybrid' ? 'Persilangan Monohibrid' : 'Persilangan Dihibrid'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                <span className="text-slate-400 font-bold">Induk 1 (Jantan):</span>
                <div className="text-slate-200 mt-0.5">
                  Genotipe: <strong className="text-teal-300">{parent1Genotype}</strong> | Fenotipe: <strong className="text-teal-300">{parent1Phenotype}</strong>
                </div>
                <div className="text-slate-400 text-[10px] mt-1">Gamet: {gametes1.join(', ')}</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                <span className="text-slate-400 font-bold">Induk 2 (Betina):</span>
                <div className="text-slate-200 mt-0.5">
                  Genotipe: <strong className="text-teal-300">{parent2Genotype}</strong> | Fenotipe: <strong className="text-teal-300">{parent2Phenotype}</strong>
                </div>
                <div className="text-slate-400 text-[10px] mt-1">Gamet: {gametes2.join(', ')}</div>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700">
              <div className="font-bold text-slate-300 mb-1">Rasio Fenotipe F2 Terbentuk:</div>
              <div className="flex flex-wrap gap-2">
                {phenotypeResults.map((p) => (
                  <span key={p.phenotype} className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-200 font-semibold">
                    {p.phenotype}: <strong className="text-teal-400">{p.count} ({p.percentage}%)</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pertanyaan Diskusi LKPD */}
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm border-b border-slate-700/80 pb-3">
              <AlertCircle className="w-4 h-4 text-indigo-400" />
              <h3>3. Lembar Jawaban & Analisis Diskusi Siswa</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  1. Kombinasi Gamet & Induk P1:
                </label>
                <textarea
                  rows={2}
                  value={answers.q1_parentAnalysis}
                  onChange={(e) => setAnswers({ ...answers, q1_parentAnalysis: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  2. Hubungan Pembentukan Gamet dengan Meiosis:
                </label>
                <textarea
                  rows={2}
                  value={answers.q2_gameteFormation}
                  onChange={(e) => setAnswers({ ...answers, q2_gameteFormation: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  3. Analisis Rasio F2 vs Teori Hukum Mendel:
                </label>
                <textarea
                  rows={2}
                  value={answers.q3_punnettAnalysis}
                  onChange={(e) => setAnswers({ ...answers, q3_punnettAnalysis: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  4. Prediksi Hasil Testcross:
                </label>
                <textarea
                  rows={2}
                  value={answers.q4_lawConnection}
                  onChange={(e) => setAnswers({ ...answers, q4_lawConnection: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  5. Kesimpulan Eksperimen Virtual:
                </label>
                <textarea
                  rows={2}
                  value={answers.q5_conclusion}
                  onChange={(e) => setAnswers({ ...answers, q5_conclusion: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Dokumen LKPD otomatis terformat siap cetak ukuran A4.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Batal
            </button>
            
            <button
              onClick={handlePrintOrDownload}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh LKPD (HTML/PDF)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
