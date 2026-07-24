import { CrossMode } from '../types/genetics';

export interface PhenotypeResult {
  phenotype: string;
  count: number;
  percentage: number;
}

export interface StudentIdentity {
  nama: string;
  kelas: string;
  kelompok: string;
  sekolah: string;
  tanggal: string;
  guru: string;
}

export interface LkpdAnswerData {
  identity: StudentIdentity;
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
  answers: {
    q1_parentAnalysis: string;
    q2_gameteFormation: string;
    q3_punnettAnalysis: string;
    q4_lawConnection: string;
    q5_conclusion: string;
  };
}

export function generatePrintableLkpdHtml(data: LkpdAnswerData): string {
  const modeTitle = data.mode === 'monohybrid' ? 'MONOHIBRID (1 SIFAT BEDA)' : 'DIHIBRID (2 SIFAT BEDA)';
  
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LKPD Biologi - Simulasi Genetika Hukum Mendel - ${data.identity.nama || 'Siswa'}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
      background-color: #f8fafc;
      padding: 20px;
      line-height: 1.5;
      font-size: 13px;
    }

    .no-print-bar {
      max-width: 900px;
      margin: 0 auto 20px auto;
      background: #0f172a;
      color: #fff;
      padding: 12px 20px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
    }

    .btn-print {
      background: #10b981;
      color: #042f2e;
      font-weight: 700;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .btn-print:hover {
      background: #34d399;
    }

    .page-container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 36px 40px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    /* Header Lembar Kerja */
    .header-doc {
      border-bottom: 3px double #0f172a;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .doc-title-box h1 {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .doc-title-box h2 {
      font-size: 14px;
      font-weight: 700;
      color: #0d9488;
      margin-top: 2px;
    }

    .doc-title-box p {
      font-size: 11px;
      color: #64748b;
      margin-top: 4px;
    }

    .badge-fase {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 6px 12px;
      border-radius: 8px;
      text-align: right;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
    }

    /* Identity Card */
    .identity-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
    }

    .identity-table td {
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .identity-table td.label {
      font-weight: 700;
      color: #334155;
      width: 130px;
      background: #f1f5f9;
    }

    .identity-table td.val {
      font-weight: 600;
      color: #0f172a;
    }

    /* Sections */
    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      background: #f1f5f9;
      padding: 6px 12px;
      border-left: 4px solid #0d9488;
      margin: 20px 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .info-box {
      font-size: 12px;
      color: #334155;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    /* Punnett Grid Table */
    .punnett-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      text-align: center;
    }

    .punnett-table th, .punnett-table td {
      border: 1px solid #94a3b8;
      padding: 8px;
      font-size: 12px;
    }

    .punnett-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 700;
    }

    .punnett-table td.gamete-header {
      background: #e2e8f0;
      font-weight: 800;
      color: #0f172a;
    }

    .punnett-cell {
      background: #ffffff;
    }

    .genotype-text {
      font-weight: 800;
      font-size: 13px;
      color: #0f172a;
      font-family: monospace;
    }

    .phenotype-text {
      font-size: 10px;
      color: #475569;
      margin-top: 2px;
    }

    /* Data Tables */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px 0;
    }

    .data-table th, .data-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      font-size: 12px;
    }

    .data-table th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      text-align: left;
    }

    /* Question & Answer Box */
    .qa-block {
      margin-bottom: 16px;
    }

    .q-text {
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 6px;
      font-size: 12px;
    }

    .a-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 14px;
      font-size: 12px;
      color: #0f172a;
      min-height: 48px;
      white-space: pre-wrap;
    }

    /* Signatures Section */
    .signatures {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      page-break-inside: avoid;
    }

    .sig-box {
      text-align: center;
      width: 220px;
    }

    .sig-space {
      height: 60px;
    }

    .sig-name {
      font-weight: 700;
      text-decoration: underline;
      font-size: 12px;
    }

    .sig-sub {
      font-size: 11px;
      color: #64748b;
    }

    .score-box {
      border: 2px dashed #0d9488;
      border-radius: 12px;
      padding: 10px 20px;
      text-align: center;
      background: #f0fdf4;
      width: 160px;
    }

    .score-box label {
      font-size: 10px;
      font-weight: 800;
      color: #047857;
      text-transform: uppercase;
    }

    .score-box div {
      font-size: 24px;
      font-weight: 900;
      color: #065f46;
      margin-top: 4px;
    }

    /* Print Styles */
    @media print {
      body {
        background-color: #ffffff;
        padding: 0;
      }
      .no-print-bar {
        display: none !important;
      }
      .page-container {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      @page {
        size: A4;
        margin: 1.5cm;
      }
    }
  </style>
</head>
<body>

  <div class="no-print-bar">
    <div>
      <strong>Lembar Kerja Peserta Didik (LKPD) Siap Cetak</strong>
      <div style="font-size: 11px; color: #94a3b8;">Format A4 — Pembelajaran Biologi SMA Mendel Virtual</div>
    </div>
    <button class="btn-print" onclick="window.print()">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
      Cetak / Simpan PDF
    </button>
  </div>

  <div class="page-container">

    <!-- Header Dokumen -->
    <div class="header-doc">
      <div class="doc-title-box">
        <h1>LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
        <h2>Eksperimen Virtual Genetika Hukum Mendel</h2>
        <p>Mata Pelajaran: Biologi | Topik: Pewarisan Sifat Hukum I & II Mendel</p>
      </div>
      <div class="badge-fase">
        <div>FASE F / KELAS XII SMA</div>
        <div style="color: #0d9488; font-weight: 800; margin-top: 2px;">MODE: ${modeTitle}</div>
      </div>
    </div>

    <!-- Identitas Siswa -->
    <table class="identity-table">
      <tr>
        <td class="label">Nama Siswa</td>
        <td class="val">${data.identity.nama || '.........................................................'}</td>
        <td class="label">Kelas / Fase</td>
        <td class="val">${data.identity.kelas || 'Fase F / XII'}</td>
      </tr>
      <tr>
        <td class="label">Kelompok</td>
        <td class="val">${data.identity.kelompok || '..........................'}</td>
        <td class="label">Tanggal</td>
        <td class="val">${data.identity.tanggal || new Date().toLocaleDateString('id-ID')}</td>
      </tr>
      <tr>
        <td class="label">Nama Sekolah</td>
        <td class="val" colspan="3">${data.identity.sekolah || '................................................................................'}</td>
      </tr>
      <tr>
        <td class="label">Guru Pembimbing</td>
        <td class="val" colspan="3">${data.identity.guru || '................................................................................'}</td>
      </tr>
    </table>

    <!-- Section 1: Tujuan -->
    <div class="section-title">A. Tujuan Pembelajaran</div>
    <div class="info-box">
      1. Menganalisis mekanisme persilangan ${data.mode === 'monohybrid' ? 'Monohibrid (1 sifat beda)' : 'Dihibrid (2 sifat beda)'} berdasarkan Hukum Mendel.<br>
      2. Menentukan kombinasi gamet, susunan genotipe, dan ekspresi fenotipe hasil persilangan.<br>
      3. Membuktikan rasio matematika hasil persilangan menggunakan simulasi laboratorium virtual.
    </div>

    <!-- Section 2: Data Pengamatan Simulasi -->
    <div class="section-title">B. Data Hasil Pengamatan Simulasi Virtual</div>
    
    <div class="info-box">
      <strong>1. Data Induk / Parental (P1):</strong><br>
      • Induk Jantan (P1-A) : Genotipe <strong>${data.parent1Genotype}</strong> | Fenotipe: <strong>${data.parent1Phenotype}</strong> | Gamet: <code>${data.gametes1.join(', ')}</code><br>
      • Induk Betina (P1-B) : Genotipe <strong>${data.parent2Genotype}</strong> | Fenotipe: <strong>${data.parent2Phenotype}</strong> | Gamet: <code>${data.gametes2.join(', ')}</code>
    </div>

    <strong style="font-size: 12px; color: #0f172a;">2. Tabel Papan Punnett Kombinasi F2:</strong>
    <table class="punnett-table">
      <thead>
        <tr>
          <th>Gamet ♀ \\ ♂</th>
          ${data.punnettSquare.headersX.map(g => `<th style="background:#0d9488;">${g}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${data.punnettSquare.grid.map((row, rIdx) => `
          <tr>
            <td class="gamete-header">${data.punnettSquare.headersY[rIdx]}</td>
            ${row.map(cell => `
              <td class="punnett-cell">
                <div class="genotype-text">${cell.genotype}</div>
                <div class="phenotype-text">${cell.phenotype}</div>
              </td>
            `).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="display: flex; gap: 16px; margin-top: 12px;">
      <!-- Rasio Genotipe -->
      <div style="flex: 1;">
        <strong style="font-size: 11px; color: #334155;">3. Rasio Genotipe F2:</strong>
        <table class="data-table">
          <thead>
            <tr>
              <th>Genotipe</th>
              <th>Jumlah</th>
              <th>Persentase</th>
            </tr>
          </thead>
          <tbody>
            ${data.genotypeRatios.map(g => `
              <tr>
                <td style="font-family: monospace; font-weight:700;">${g.genotype}</td>
                <td>${g.count} / ${data.punnettSquare.headersX.length * data.punnettSquare.headersY.length}</td>
                <td>${g.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Rasio Fenotipe -->
      <div style="flex: 1;">
        <strong style="font-size: 11px; color: #334155;">4. Rasio Fenotipe F2:</strong>
        <table class="data-table">
          <thead>
            <tr>
              <th>Fenotipe</th>
              <th>Jumlah</th>
              <th>Persentase</th>
            </tr>
          </thead>
          <tbody>
            ${data.phenotypeResults.map(p => `
              <tr>
                <td style="font-weight:600;">${p.phenotype}</td>
                <td>${p.count}</td>
                <td>${p.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 3: Pertanyaan Analisis -->
    <div class="section-title">C. Pertanyaan Analisis & Diskusi</div>

    <div class="qa-block">
      <div class="q-text">1. Berdasarkan data persilangan di atas, tuliskan kombinasi gamet yang terbentuk dari masing-masing induk beserta penjelasannya!</div>
      <div class="a-box">${data.answers.q1_parentAnalysis || '(Belum diisi oleh siswa)'}</div>
    </div>

    <div class="qa-block">
      <div class="q-text">2. Bagaimanakah proses pembentukan gamet tersebut berkaitan dengan peristiwa pembelahan sel meiosis?</div>
      <div class="a-box">${data.answers.q2_gameteFormation || '(Belum diisi oleh siswa)'}</div>
    </div>

    <div class="qa-block">
      <div class="q-text">3. Analisislah rasio fenotipe dan genotipe F2 yang dihasilkan! Apakah sudah sesuai dengan Teori ${data.mode === 'monohybrid' ? 'Hukum I Mendel (3:1)' : 'Hukum II Mendel (9:3:3:1)'}? Jelaskan!</div>
      <div class="a-box">${data.answers.q3_punnettAnalysis || '(Belum diisi oleh siswa)'}</div>
    </div>

    <div class="qa-block">
      <div class="q-text">4. Jika persilangan ini dilakukan antara individu heterozigot dengan individu homozigot resesif (Testcross), prediksikan rasio keturunan yang akan diperoleh!</div>
      <div class="a-box">${data.answers.q4_lawConnection || '(Belum diisi oleh siswa)'}</div>
    </div>

    <!-- Section 4: Kesimpulan -->
    <div class="section-title">D. Kesimpulan</div>
    <div class="qa-block">
      <div class="a-box" style="min-height: 60px;">${data.answers.q5_conclusion || '(Belum diisi oleh siswa)'}</div>
    </div>

    <!-- Signatures -->
    <div class="signatures">
      <div class="sig-box">
        <div style="font-size: 11px; color: #64748b;">Peserta Didik,</div>
        <div class="sig-space"></div>
        <div class="sig-name">${data.identity.nama || '...................................'}</div>
        <div class="sig-sub">NIS / NISN</div>
      </div>

      <div class="score-box">
        <label>Nilai LKPD</label>
        <div>____</div>
      </div>

      <div class="sig-box">
        <div style="font-size: 11px; color: #64748b;">Guru Mata Pelajaran,</div>
        <div class="sig-space"></div>
        <div class="sig-name">${data.identity.guru || '...................................'}</div>
        <div class="sig-sub">NIP. .....................................</div>
      </div>
    </div>

  </div>

</body>
</html>`;
}
