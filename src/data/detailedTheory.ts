export interface TheorySection {
  id: string;
  title: string;
  iconName: string;
  content: string;
  subsections?: {
    subtitle: string;
    text: string;
    bulletPoints?: string[];
    tableData?: { headers: string[]; rows: string[][] };
  }[];
}

export const DETAILED_THEORY_SECTIONS: TheorySection[] = [
  {
    id: 'pendahuluan-mendel',
    title: '1. Pengantar & Eksperimen Gregor Mendel',
    iconName: 'UserCheck',
    content: `Gregor Johann Mendel (1822–1884), seorang biarawan dan ilmuwan asal Austria, diakui sebagai "Bapak Genetika Modern". Antara tahun 1856 hingga 1863, Mendel melakukan eksperimen persilangan secara sistematis menggunakan tanaman kacang kapri (*Pisum sativum*) di kebun biara Brno.`,
    subsections: [
      {
        subtitle: 'Mengapa Mendel Memilih Tanaman Kacang Kapri (Pisum sativum)?',
        text: 'Pilihan organisme model *Pisum sativum* oleh Mendel sangat krusial bagi keberhasilan eksperimennya karena memiliki beberapa keunggulan biologis utama:',
        bulletPoints: [
          'Memiliki banyak varietas dengan sifat kontras yang jelas (misal: Biji Bulat vs Keriput, Warna Bunga Ungu vs Putih).',
          'Dapat melakukan penyerbukan sendiri (Self-pollination) dengan mudah untuk menghasilkan galur murni (Pure line).',
          'Mudah disilangkan secara buatan (Penyerbukan silang / Cross-pollination).',
          'Siklus hidup relatif singkat (cepat menghasilkan keturunan).',
          'Memiliki jumlah keturunan yang banyak dalam sekali persilangan sehingga memenuhi kaidah statistik probabilitas.'
        ]
      },
      {
        subtitle: '7 Sifat Beda (Karakter) Pisum sativum yang Diteliti Mendel',
        text: 'Mendel memfokuskan pengamatannya pada 7 pasangan sifat yang kontras dan dikendalikan oleh pasangan alel tunggal pada kromosom berlainan:',
        tableData: {
          headers: ['No', 'Karakter / Sifat', 'Sifat Dominan (Kapital)', 'Sifat Resesif (Kecil)'],
          rows: [
            ['1', 'Bentuk Biji', 'Bulat (B)', 'Keriput / Kisut (b)'],
            ['2', 'Warna Biji', 'Kuning (K)', 'Hijau (k)'],
            ['3', 'Warna Bunga', 'Ungu (U)', 'Putih (u)'],
            ['4', 'Bentuk Polong', 'Penuh / Mulus (P)', 'Berkerut / Berlekuk (p)'],
            ['5', 'Warna Polong', 'Hijau (H)', 'Kuning (h)'],
            ['6', 'Posisi Bunga', 'Aksial / Ketiak Daun (A)', 'Terminal / Ujung Batang (a)'],
            ['7', 'Tinggi Batang', 'Tinggi (T)', 'Kerdil / Pendek (t)']
          ]
        }
      }
    ]
  },
  {
    id: 'terminologi-genetika',
    title: '2. Terminologi Kunci Genetika',
    iconName: 'BookMarked',
    content: 'Untuk memahami Hukum Mendel dengan rinci, siswa harus menguasai istilah-istilah ilmiah dasar dalam genetika:',
    subsections: [
      {
        subtitle: 'Daftar Istilah & Penjelasannya',
        text: 'Berikut adalah istilah penting beserta contoh konkretnya:',
        bulletPoints: [
          'Gen: Unit pewarisan sifat berupa segmen DNA yang menyandi informasi protein spesifik.',
          'Lokus: Posisi atau letak fisik gen pada rantai kromosom.',
          'Alel: Bentuk-bentuk alternatif dari suatu gen tunggal pada lokus kromosom homolog (misal: B dan b).',
          'Genotipe: Susunan genetik atau susunan alel pada suatu individu (misal: BB, Bb, bb). Genotipe bersifat tidak terlihat langsung secara fisik.',
          'Fenotipe: Sifat atau karakteristik fisik yang terekspresi dan dapat diamati secara visual (misal: Biji Bulat, Bunga Ungu) sebagai hasil interaksi genotipe dengan lingkungan.',
          'Dominan: Alel yang menutupi ekspresi alel pasangannya jika berada dalam kondisi heterozigot. Disimbolkan dengan huruf KAPITAL (misal: B).',
          'Resesif: Alel yang tertutupi ekspresinya oleh alel dominan dan hanya muncul jika berada dalam kondisi homozigot resesif. Disimbolkan dengan huruf kecil (misal: b).',
          'Homozigot: Pasangan alel yang identik (BB = Homozigot Dominan, bb = Homozigot Resesif).',
          'Heterozigot: Pasangan alel yang berlainan untuk satu karakter (misal: Bb atau BbKk).',
          'Parental (P): Generasi induk atau orang tua yang disilangkan.',
          'Filial (F): Keturunan hasil persilangan (F1 = Keturunan pertama, F2 = Keturunan kedua hasil perkawinan sesama F1).'
        ]
      }
    ]
  },
  {
    id: 'hukum-1-mendel',
    title: '3. Hukum I Mendel (Segregasi Bebas)',
    iconName: 'GitBranch',
    content: 'Hukum I Mendel dikenal pula sebagai Hukum Segregasi Bebas (Law of Segregation). Hukum ini berlaku untuk persilangan Monohibrid (persilangan dengan satu sifat beda).',
    subsections: [
      {
        subtitle: 'Bunyi Hukum I Mendel',
        text: '"Pada pembentukan gamet (sel kelamin), pasangan-pasangan alel yang mengendalikan suatu sifat akan memisah (bersegregasi) secara bebas, sehingga setiap sel gamet hanya akan membawa satu alel dari pasangan gennya."'
      },
      {
        subtitle: 'Mekanisme Sitologi saat Meiosis',
        text: 'Secara mikroskopis biologi sel, pemisahan alel ini terjadi pada tahap Anafase I dari proses pembelahan sel meiosis. Pada saat Anafase I, kromosom homolog yang membawa alel berlainan ditarik oleh benang spindel menuju ke kutub sel yang berlawanan.',
        bulletPoints: [
          'Induk bergenotipe Bb (Heterozigot) pada tahap meiosis I akan memisahkan alel B dan alel b ke dalam sel anakan berlainan.',
          'Hasil akhir meiosis menghasilkan 50% sel gamet membawa alel B dan 50% sel gamet membawa alel b.'
        ]
      },
      {
        subtitle: 'Contoh Analisis Skematis Monohibrid (Biji Bulat vs Keriput)',
        text: 'Persilangan Galur Murni:',
        bulletPoints: [
          'P1 (Induk): BB (Bulat) × bb (Keriput)',
          'Gamet P1: B dan b',
          'F1 (Keturunan 1): Bb (100% Fenotipe Biji Bulat)',
          'Persilangan Sesama F1: Bb × Bb',
          'Gamet F1: B, b dan B, b',
          'Hasil F2: 1 BB (Bulat) : 2 Bb (Bulat) : 1 bb (Keriput)',
          'Rasio Genotipe F2 = 1 BB : 2 Bb : 1 bb (1 : 2 : 1)',
          'Rasio Fenotipe F2 = 3 Biji Bulat : 1 Biji Keriput (3 : 1 / 75% : 25%)'
        ]
      }
    ]
  },
  {
    id: 'hukum-2-mendel',
    title: '4. Hukum II Mendel (Asortasi Bebas)',
    iconName: 'Layers',
    content: 'Hukum II Mendel dikenal sebagai Hukum Pengelompokan/Asortasi Bebas (Law of Independent Assortment). Hukum ini dikaji melalui persilangan Dihibrid (dua sifat beda secara bersamaan) atau polihibrid.',
    subsections: [
      {
        subtitle: 'Bunyi Hukum II Mendel',
        text: '"Bila dua individu memiliki dua pasang sifat atau lebih, maka di dalam pembentukan gamet, alel-alel dari pasangan gen yang berbeda akan mengelompok (berasortasi) secara bebas satu sama lain pada saat fertilisasi/pembentukan gamet, selama gen-gen tersebut terletak pada kromosom yang berbeda (tidak tertaut)."'
      },
      {
        subtitle: 'Penentuan Gamet pada Dihibrid',
        text: 'Induk dengan genotipe BbKk (Heterozigot ganda) akan membentuk 4 jenis gamet dengan frekuensi seimbang (masing-masing 25%):',
        bulletPoints: [
          'Gamet 1: BK (Alel B mengelompok dengan K)',
          'Gamet 2: Bk (Alel B mengelompok dengan k)',
          'Gamet 3: bK (Alel b mengelompok dengan K)',
          'Gamet 4: bk (Alel b mengelompok dengan k)'
        ]
      },
      {
        subtitle: 'Rasio Klasik F2 Dihibrid (BbKk × BbKk)',
        text: 'Persilangan dua individu heterozigot BbKk menghasilkan 16 kombinasi genotipe pada Kotak Punnett dengan Rasio Fenotipe F2 sebagai berikut:',
        tableData: {
          headers: ['Rasio', 'Fenotipe F2', 'Kombinasi Genotipe', 'Persentase'],
          rows: [
            ['9', 'Bulat Kuning (Dominan-Dominan)', 'B_K_ (BBKK, BBKk, BbKK, BbKk)', '56.25%'],
            ['3', 'Bulat Hijau (Dominan-Resesif)', 'B_kk (BBkk, Bbkk)', '18.75%'],
            ['3', 'Keriput Kuning (Resesif-Dominan)', 'bbK_ (bbKK, bbKk)', '18.75%'],
            ['1', 'Keriput Hijau (Resesif-Resesif)', 'bbkk', '6.25%']
          ]
        }
      }
    ]
  },
  {
    id: 'persilangan-khusus',
    title: '5. Persilangan Khusus: Testcross & Backcross',
    iconName: 'HelpCircle',
    content: 'Dalam praktik pemuliaan tanaman dan hewan, ilmuwan sering menggunakan teknik persilangan uji untuk mengetahui genotipe asli dari individu berbiji bulat atau berfenotipe dominan.',
    subsections: [
      {
        subtitle: '1. Testcross (Uji Silang)',
        text: 'Persilangan antara individu berfenotipe dominan yang tidak diketahui genotipenya (apakah homozigot BB atau heterozigot Bb) dengan individu homozigot resesif (bb).',
        bulletPoints: [
          'Jika Hasil Keturunan 100% Bulat (BB × bb) → Induk terbukti HOMOZIGOT DOMINAN (BB).',
          'Jika Hasil Keturunan 50% Bulat : 50% Keriput (Bb × bb) → Induk terbukti HETEROZIGOT (Bb).'
        ]
      },
      {
        subtitle: '2. Backcross (Silang Balik)',
        text: 'Persilangan antara individu keturunan (F1) dengan salah satu induknya (baik induk dominan maupun induk resesif) untuk mempertahankan sifat galur murni tertentu.'
      }
    ]
  },
  {
    id: 'penyimpangan-semu',
    title: '6. Penyimpangan Semu Hukum Mendel',
    iconName: 'GitMerge',
    content: 'Dalam beberapa kasus biologi nyata, rasio fenotipe F2 tidak menunjukkan angka 3:1 atau 9:3:3:1 secara utuh, melainkan modifikasi daripadanya. Hal ini terjadi akibat interaksi antargen pada lokus berbeda. Meskipun rasionya berubah, mekanisme segregasi alel tetap mematuhi Hukum Mendel, sehingga disebut "Penyimpangan Semu".',
    subsections: [
      {
        subtitle: 'Jenis-Jenis Penyimpangan Semu Hukum Mendel',
        text: 'Berikut adalah contoh interaksi gen beserta rasio modifikasinya:',
        tableData: {
          headers: ['Bentuk Interaksi', 'Rasio Fenotipe F2 Modifikasi', 'Contoh Kasus Organisme'],
          rows: [
            ['Atavisme (Interaksi Alel)', '9 : 3 : 3 : 1', 'Bentuk pial/jengger ayam (Walnut, Rose, Pea, Single)'],
            ['Kriptomeri', '9 : 3 : 4', 'Warna bunga *Linaria maroccana* (Ungu, Merah, Putih)'],
            ['Epistasis Resesif', '9 : 3 : 4', 'Warna rambut anjing Labrador retriever'],
            ['Epistasis Dominan', '12 : 3 : 1', 'Warna buah labu (*Cucurbita pepo*)'],
            ['Polimeri (Sifat Kuantitatif)', '15 : 1', 'Warna biji gandum (Sifat dipengaruhi banyak gen)'],
            ['Gen Komplementer', '9 : 7', 'Bunga *Lathyrus odoratus* (Saling melengkapi enzym)']
          ]
        }
      }
    ]
  }
];
