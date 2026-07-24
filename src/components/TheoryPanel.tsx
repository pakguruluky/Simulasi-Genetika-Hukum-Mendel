import React, { useState } from 'react';
import { BookOpen, X, ChevronRight, Dna, HelpCircle, Lightbulb, Award, Sparkles, Target, Bookmark, ExternalLink, ChevronDown, CheckCircle2, BookMarked, UserCheck, GitBranch, Layers, GitMerge } from 'lucide-react';
import { TUJUAN_PEMBELAJARAN, CAPAIAN_PEMBELAJARAN } from '../data/learningObjectives';
import { REFERENSI_MATERI } from '../data/references';
import { DETAILED_THEORY_SECTIONS } from '../data/detailedTheory';

interface TheoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLkpd: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ isOpen, onClose, onOpenLkpd }) => {
  const [activeTab, setActiveTab] = useState<'tujuan' | 'materi' | 'glosarium' | 'referensi'>('tujuan');
  const [expandedSection, setExpandedSection] = useState<string | null>('pendahuluan-mendel');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-slate-900/98 backdrop-blur-2xl border-l border-slate-700/80 shadow-2xl z-50 flex flex-col text-slate-200 transition-all duration-300">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Modul Pembelajaran & Referensi Biologi</h2>
            <p className="text-[10px] text-slate-400">Materi Lengkap Genetika Mendel SMA Kelas XII</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-800 bg-slate-900/80 text-xs font-bold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('tujuan')}
          className={`flex-1 min-w-[100px] py-3 px-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'tujuan'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-3.5 h-3.5 shrink-0" />
          <span>Tujuan</span>
        </button>

        <button
          onClick={() => setActiveTab('materi')}
          className={`flex-1 min-w-[110px] py-3 px-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'materi'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5 shrink-0" />
          <span>Materi Detail</span>
        </button>

        <button
          onClick={() => setActiveTab('glosarium')}
          className={`flex-1 min-w-[100px] py-3 px-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'glosarium'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 shrink-0" />
          <span>Glosarium</span>
        </button>

        <button
          onClick={() => setActiveTab('referensi')}
          className={`flex-1 min-w-[100px] py-3 px-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'referensi'
              ? 'border-teal-400 text-teal-300 bg-slate-800/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 shrink-0" />
          <span>Referensi</span>
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs leading-relaxed">
        
        {/* TAB 1: TUJUAN PEMBELAJARAN */}
        {activeTab === 'tujuan' && (
          <div className="space-y-5">
            {/* Capaian Pembelajaran Box */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-extrabold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-teal-400" />
                <span>Capaian Pembelajaran (CP) Kurikulum Merdeka</span>
              </div>
              <div className="text-[11px] font-semibold text-slate-400">{CAPAIAN_PEMBELAJARAN.fase} — {CAPAIAN_PEMBELAJARAN.elemen}</div>
              <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                {CAPAIAN_PEMBELAJARAN.deskripsi}
              </p>
            </div>

            {/* List Tujuan Pembelajaran */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Rincian Tujuan Pembelajaran (TP) & Indikator Ketercapaian:</span>
              </h3>

              {TUJUAN_PEMBELAJARAN.map((tp) => (
                <div key={tp.id} className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 space-y-2 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-extrabold text-teal-300 text-xs">{tp.code}: {tp.title}</div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                      {tp.bloomLevel}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{tp.description}</p>
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700/60 text-[10px] text-slate-400">
                    <strong className="text-emerald-400">Indikator:</strong> {tp.indicator}
                  </div>
                </div>
              ))}
            </div>

            {/* Banner LKPD CTA */}
            <div className="bg-gradient-to-r from-teal-900/60 to-emerald-900/60 p-4 rounded-xl border border-teal-500/30 space-y-2">
              <div className="font-bold text-teal-200 text-xs">Siap Menguji Pemahaman dengan LKPD?</div>
              <p className="text-[11px] text-teal-100/80">
                Gunakan Lembar Kerja Peserta Didik (LKPD) terintergrasi untuk mengumpulkan data simulasi dan mengunduh laporan berformat cetak A4.
              </p>
              <button
                onClick={onOpenLkpd}
                className="mt-2 w-full py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Buka LKPD Interaktif & Cetak</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MATERI DETAIL */}
        {activeTab === 'materi' && (
          <div className="space-y-4">
            <p className="text-[11px] text-slate-400">
              Materi Genetika Mendel disajikan secara ringkas, padat, dan ilmiah sesuai standar kurikulum SMA/MA dan Olimpiade Biologi.
            </p>

            {DETAILED_THEORY_SECTIONS.map((sec) => {
              const isExpanded = expandedSection === sec.id;
              return (
                <div key={sec.id} className="bg-slate-800/60 rounded-xl border border-slate-700/70 overflow-hidden transition-all">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                    className="w-full p-3.5 text-left font-extrabold text-xs text-white bg-slate-800/90 hover:bg-slate-750 flex items-center justify-between transition-colors"
                  >
                    <span className="text-teal-300">{sec.title}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-teal-400' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="p-4 space-y-4 bg-slate-900/60 border-t border-slate-800 text-[11px]">
                      <p className="text-slate-300 leading-relaxed">{sec.content}</p>

                      {sec.subsections?.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 space-y-2">
                          <h4 className="font-bold text-emerald-300 text-xs">{sub.subtitle}</h4>
                          <p className="text-slate-300">{sub.text}</p>

                          {sub.bulletPoints && (
                            <ul className="list-disc pl-4 space-y-1 text-slate-300">
                              {sub.bulletPoints.map((bp, bIdx) => (
                                <li key={bIdx}>{bp}</li>
                              ))}
                            </ul>
                          )}

                          {sub.tableData && (
                            <div className="overflow-x-auto my-2">
                              <table className="w-full border-collapse text-[10px] text-left">
                                <thead>
                                  <tr className="bg-slate-900 text-teal-300 border-b border-slate-700">
                                    {sub.tableData.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-1.5 font-bold">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sub.tableData.rows.map((r, rIdx) => (
                                    <tr key={rIdx} className="border-b border-slate-800/60 hover:bg-slate-800/50">
                                      {r.map((c, cIdx) => (
                                        <td key={cIdx} className="p-1.5 text-slate-300">{c}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: GLOSARIUM & RUMUS */}
        {activeTab === 'glosarium' && (
          <div className="space-y-5">
            {/* Rumus Cepat */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Rumus Cepat Matematika Persilangan Mendel</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Di mana <strong>n</strong> = Jumlah Pasangan Heterozigot pada genotipe induk.
              </p>

              <div className="grid grid-cols-1 gap-2 pt-1">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-teal-400 font-bold">1. Jumlah Jenis Gamet:</span>
                  <div className="font-mono text-xs text-white font-black my-0.5">2ⁿ</div>
                  <p className="text-slate-400 text-[10px]">Contoh: BbKk (n=2) → 2² = 4 jenis gamet (BK, Bk, bK, bk).</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-emerald-400 font-bold">2. Jumlah Kombinasi F2 (Kotak Punnett):</span>
                  <div className="font-mono text-xs text-white font-black my-0.5">4ⁿ</div>
                  <p className="text-slate-400 text-[10px]">Monohibrid (n=1) → 4¹ = 4 kotak | Dihibrid (n=2) → 4² = 16 kotak.</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                  <span className="text-indigo-400 font-bold">3. Jumlah Variasi Genotipe F2:</span>
                  <div className="font-mono text-xs text-white font-black my-0.5">3ⁿ</div>
                  <p className="text-slate-400 text-[10px]">Monohibrid → 3¹ = 3 jenis genotipe (BB, Bb, bb) | Dihibrid → 3² = 9 jenis genotipe.</p>
                </div>
              </div>
            </div>

            {/* Glosarium Istilah */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-200 text-xs">Glosarium Istilah Kunci Genetika:</h3>
              {[
                { title: 'Genotipe', desc: 'Susunan genetik atau susunan alel suatu individu (misal: BB, Bb, bb) yang tidak tampak secara fisik.' },
                { title: 'Fenotipe', desc: 'Sifat fisik yang tampak dari individu hasil interaksi genotipe dengan lingkungan (misal: Biji Bulat, Bunga Merah).' },
                { title: 'Alel', desc: 'Bentuk alternatif dari suatu gen yang menempati lokasi (lokus) yang sama pada kromosom homolog.' },
                { title: 'Dominan', desc: 'Sifat gen yang menutupi ekspresi alel pasangannya, disimbolkan dengan huruf KAPITAL (misal: B).' },
                { title: 'Resesif', desc: 'Sifat gen yang tertutupi oleh sifat dominan dan baru muncul jika berpasangan homozigot resesif (misal: b).' },
                { title: 'Homozigot', desc: 'Pasangan alel yang identik untuk sifat tertentu (BB = Homozigot Dominan, bb = Homozigot Resesif).' },
                { title: 'Heterozigot', desc: 'Pasangan alel yang berlainan untuk sifat tertentu (misal: Bb atau BbKk).' },
                { title: 'Parental (P)', desc: 'Induk atau orang tua yang melakukan persilangan.' },
                { title: 'Filial (F)', desc: 'Keturunan atau anak hasil persilangan (F1 = generasi pertama, F2 = generasi kedua).' },
                { title: 'Testcross', desc: 'Uji silang antara individu berfenotipe dominan dengan individu homozigot resesif untuk mengetahui genotipe aslinya.' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/60">
                  <div className="font-bold text-teal-300 text-xs">{item.title}</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REFERENSI */}
        {activeTab === 'referensi' && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
              <div className="font-bold text-teal-300 text-xs flex items-center gap-1.5 mb-1">
                <Bookmark className="w-4 h-4 text-teal-400" />
                <span>Daftar Pustaka & Referensi Akademis</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Materi dan rumus dalam aplikasi ini disusun berdasarkan kurikulum biologi resmi Kemdikbudristek dan rujukan teks internasional.
              </p>
            </div>

            <div className="space-y-3">
              {REFERENSI_MATERI.map((ref) => (
                <div key={ref.id} className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {ref.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{ref.year}</span>
                  </div>

                  <h4 className="font-bold text-slate-200 text-xs">{ref.title}</h4>
                  <div className="text-[11px] text-teal-400 font-semibold">{ref.author}</div>
                  <div className="text-[10px] text-slate-400 italic">{ref.publisher}</div>
                  <p className="text-[11px] text-slate-300 pt-1 leading-normal">{ref.description}</p>

                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-teal-400 hover:underline pt-1 font-semibold"
                    >
                      <span>Tautan Sumber</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
