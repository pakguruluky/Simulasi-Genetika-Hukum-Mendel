import { QuizQuestion } from '../types/genetics';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pada persilangan monohibrid dominan penuh antara induk homozigot dominan (BB) dan homozigot resesif (bb), berapa persentase fenotipe dominan pada keturunan F1?',
    options: ['25%', '50%', '75%', '100%'],
    correctIndex: 3,
    explanation: 'Seluruh keturunan F1 memiliki genotipe heterozigot (Bb). Karena sifat B bersifat dominan penuh terhadap b, maka 100% keturunan F1 menampilkan fenotipe dominan.',
    difficulty: 'Mudah',
  },
  {
    id: 2,
    question: 'Induk dengan genotipe BbKk dapat menghasilkan berapa jenis gamet yang berbeda menurut Hukum Mendel II?',
    options: ['2 jenis (BK, bk)', '4 jenis (BK, Bk, bK, bk)', '8 jenis', '16 jenis'],
    correctIndex: 1,
    explanation: 'Jumlah jenis gamet dihitung dengan rumus 2^n, dengan n adalah jumlah pasangan alel heterozigot. Karena BbKk memiliki 2 pasang heterozigot (Bb dan Kk), maka 2^2 = 4 jenis gamet: BK, Bk, bK, dan bk.',
    difficulty: 'Sedang',
  },
  {
    id: 3,
    question: 'Berapakah rasio fenotipe yang diharapkan dari persilangan dihibrid heterozigot sempurna (BbKk × BbKk) jika kedua sifat bersifat dominan penuh?',
    options: ['1 : 2 : 1', '3 : 1', '9 : 3 : 3 : 1', '9 : 3 : 4'],
    correctIndex: 2,
    explanation: 'Sesuai Hukum Asortasi Bebas Mendel (Hukum II Mendel), persilangan F1 heterozigot BbKk × BbKk menghasilkan rasio fenotipe 9 (Dominan-Dominan) : 3 (Dominan-Resesif) : 3 (Resesif-Dominan) : 1 (Resesif-Resesif).',
    difficulty: 'Sedang',
  },
  {
    id: 4,
    question: 'Sifat genotipe individu yang memiliki dua alel yang identik untuk suatu sifat tertentu (misalnya BB atau bb) disebut...',
    options: ['Heterozigot', 'Homozigot', 'Resesif Intermediet', 'Alel Ganda'],
    correctIndex: 1,
    explanation: 'Homozigot adalah kondisi di mana pasangan alel pada lokus yang sama memiliki sifat yang sama, baik homozigot dominan (BB) maupun homozigot resesif (bb).',
    difficulty: 'Mudah',
  },
  {
    id: 5,
    question: 'Seorang siswa menyilangkan tanaman ercis tinggi biji bulat (TtBb) dengan ercis kerdil biji keriput (ttbb). Berapakah peluang memperoleh keturunan berbatang tinggi dan biji keriput?',
    options: ['12.5% (2/16)', '25% (4/16)', '50% (8/16)', '75% (12/16)'],
    correctIndex: 1,
    explanation: 'Ini adalah persilangan testcross (TtBb × ttbb). Gamet TtBb: TB, Tb, tB, tb. Gamet ttbb: tb. Keturunan: TtBb (tinggi bulat), Ttbb (tinggi keriput), ttBb (kerdil bulat), ttbb (kerdil keriput) dengan rasio 1:1:1:1. Peluang tinggi keriput (Ttbb) adalah 1/4 = 25%.',
    difficulty: 'HOTS',
  }
];
