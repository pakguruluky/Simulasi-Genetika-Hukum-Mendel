export interface ReferenceItem {
  id: string;
  type: 'Buku Teks' | 'Jurnal/Paper' | 'Kurikulum' | 'Sumber Digital';
  title: string;
  author: string;
  year: string;
  publisher: string;
  description: string;
  url?: string;
}

export const REFERENSI_MATERI: ReferenceItem[] = [
  {
    id: 'ref-1',
    type: 'Kurikulum',
    title: 'Capaian Pembelajaran Mata Pelajaran Biologi Fase F (Kelas XI dan XII SMA/MA)',
    author: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP)',
    year: '2024',
    publisher: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
    description: 'Panduan kurikulum resmi pemerintah Indonesia untuk tingkat SMA kelas XII mengenai materi Genetika dan Pewarisan Sifat Makhluk Hidup.'
  },
  {
    id: 'ref-2',
    type: 'Buku Teks',
    title: 'Campbell Biology (12th Edition)',
    author: 'Urry, L. A., Cain, M. L., Wasserman, S. A., Minorsky, P. V., & Orr, R. B.',
    year: '2020',
    publisher: 'Pearson Higher Ed',
    description: 'Bab 14: Mendel and the Gene Idea — Referensi standar internasional biologi modern mengenai eksperimen Pisum sativum dan analisis rasio persilangan.'
  },
  {
    id: 'ref-3',
    type: 'Buku Teks',
    title: 'Biologi untuk SMA/MA Kelas XII (Kurikulum Merdeka)',
    author: 'Kemdikbudristek RI (Pusat Kurikulum dan Perbukuan)',
    year: '2022',
    publisher: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
    description: 'Buku teks utama siswa dan guru Biologi SMA Kelas XII mencakup materi Genetika, Hukum Segregasi, Hukum Asortasi Bebas, serta Penyimpangan Semu Hukum Mendel.'
  },
  {
    id: 'ref-4',
    type: 'Jurnal/Paper',
    title: 'Versuche über Pflanzen-Hybriden (Experiments in Plant Hybridization)',
    author: 'Mendel, Gregor Johann',
    year: '1866',
    publisher: 'Verhandlungen des naturforschenden Vereines in Brünn, Bd. IV für das Jahr 1865',
    description: 'Makalah ilmiah orisinal karya Gregor Mendel yang mendasari lahirnya ilmu genetika modern.'
  },
  {
    id: 'ref-5',
    type: 'Buku Teks',
    title: 'Genetika Dasar: Konsep dan Aplikasi Pewarisan Sifat',
    author: 'Suryo',
    year: '2019',
    publisher: 'Gadjah Mada University Press (UGM Press)',
    description: 'Buku rujukan akademis tingkat universitas dan SMA Olimpiade Biologi mengenai mekanisme hukum segregasi, persilangan dihibrid, dan pemetaan gen.'
  },
  {
    id: 'ref-6',
    type: 'Sumber Digital',
    title: 'PhET Interactive Simulations - Gene Expression and Mendelian Genetics',
    author: 'University of Colorado Boulder',
    year: '2023',
    publisher: 'PhET Interactive Simulations',
    url: 'https://phet.colorado.edu',
    description: 'Media pembelajaran interaktif berbasis laboratorium simulasi komputer untuk visualisasi genetika populasi dan Hukum Mendel.'
  }
];
