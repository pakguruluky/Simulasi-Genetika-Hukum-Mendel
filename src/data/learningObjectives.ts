export interface Objective {
  id: string;
  code: string;
  title: string;
  description: string;
  indicator: string;
  bloomLevel: 'C2 (Memahami)' | 'C3 (Menerapkan)' | 'C4 (Menganalisis)' | 'C5 (Mengevaluasi)';
}

export const CAPAIAN_PEMBELAJARAN = {
  fase: 'Fase F (Kelas XII SMA)',
  elemen: 'Pemahaman Biologi & Keterampilan Proses Simulasi Sains',
  deskripsi: 'Peserta didik mampu menganalisis keterkaitan antara struktur kromosom, gen, alel, serta mekanisme pembentukan gamet pada peristiwa pembelahan sel meiosis terhadap pola-pola pewarisan sifat makhluk hidup berdasarkan Hukum I Mendel (Segregasi Bebas) dan Hukum II Mendel (Asortasi Bebas), serta mampu menyajikan hasil olah data simulasi persilangan monohibrid dan dihibrid.'
};

export const TUJUAN_PEMBELAJARAN: Objective[] = [
  {
    id: 'tp-1',
    code: 'TP 12.1.1',
    title: 'Memahami Konsep Dasar Genetika Mendel',
    description: 'Menjelaskan pengertian gen, alel, genotipe, fenotipe, dominan, resesif, intermediet, homozigot, heterozigot, parental, dan filial dalam konteks persilangan pewarisan sifat.',
    indicator: 'Peserta didik dapat mengidentifikasi dan mendefinisikan setidaknya 8 istilah dasar genetika dengan tepat.',
    bloomLevel: 'C2 (Memahami)'
  },
  {
    id: 'tp-2',
    code: 'TP 12.1.2',
    title: 'Menganalisis Mekanisme Hukum I Mendel (Segregasi Bebas)',
    description: 'Menganalisis proses pemisahan alel secara bebas pada persilangan monohibrid saat pembentukan gamet di tahapan meiosis I (Anafase I).',
    indicator: 'Peserta didik dapat membuktikan rasio fenotipe 3:1 dan genotipe 1:2:1 pada F2 monohibrid melalui simulasi interaktif.',
    bloomLevel: 'C4 (Menganalisis)'
  },
  {
    id: 'tp-3',
    code: 'TP 12.1.3',
    title: 'Menganalisis Mekanisme Hukum II Mendel (Asortasi Bebas)',
    description: 'Menganalisis pengelompokan gen secara bebas pada persilangan dihibrid (dua sifat beda) dalam penentuan kombinasi gamet dan variasi keturunan.',
    indicator: 'Peserta didik dapat menyusun dan menganalisis 16 kombinasi kotak Punnett F2 dihibrid dengan rasio fenotipe klasik 9:3:3:1.',
    bloomLevel: 'C4 (Menganalisis)'
  },
  {
    id: 'tp-4',
    code: 'TP 12.1.4',
    title: 'Menghitung Peluang & Probabilitas Persilangan',
    description: 'Menerapkan kaidah probabilitas matematika untuk memprediksi persentase dan frekuensi kemunculan genotipe atau fenotipe spesifik pada keturunan.',
    indicator: 'Peserta didik dapat menghitung persentase keturunan dengan sifat tertentu menggunakan kalkulator probabilitas simulasi.',
    bloomLevel: 'C3 (Menerapkan)'
  },
  {
    id: 'tp-5',
    code: 'TP 12.1.5',
    title: 'Melakukan Eksperimen Simulasi Virtual & Menyusun LKPD',
    description: 'Mengoperasikan laboratorium virtual Hukum Mendel untuk menguji berbagai variasi genotipe parental, mengumpulkan data pengamatan, dan mengunduh LKPD tercetak.',
    indicator: 'Peserta didik dapat melengkapi Lembar Kerja Peserta Didik (LKPD) secara lengkap dengan data hasil percobaan virtual dan kesimpulan yang rasional.',
    bloomLevel: 'C5 (Mengevaluasi)'
  }
];
