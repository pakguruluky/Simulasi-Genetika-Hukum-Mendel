export type CrossMode = 'monohybrid' | 'dihybrid';

export interface TraitConfig {
  name: string;
  dominantSymbol: string;
  recessiveSymbol: string;
  dominantName: string;
  recessiveName: string;
  iconDominant: string;
  iconRecessive: string;
  colorDominant: string; // Tailwind color name like 'emerald', 'amber', 'yellow', etc.
  colorRecessive: string;
}

export interface PresetCross {
  id: string;
  title: string;
  mode: CrossMode;
  description: string;
  trait1: TraitConfig;
  trait2?: TraitConfig;
  defaultP1: string;
  defaultP2: string;
}

export interface PunnettCell {
  id: string;
  rowIndex: number;
  colIndex: number;
  gameteP1: string; // Row gamete (from Parent 1)
  gameteP2: string; // Column gamete (from Parent 2)
  genotype: string;
  phenotypeName: string;
  trait1Phenotype: string;
  trait2Phenotype?: string;
  trait1IsDominant: boolean;
  trait2IsDominant?: boolean;
  colorClass: string;
  badgeIcon: string;
}

export interface RatioItem {
  key: string; // Genotype or Phenotype name
  count: number;
  total: number;
  percentage: number;
  fractionString: string;
  ratioValue: number; // Simplified ratio integer
  colorClass: string;
  icon?: string;
  genotypes?: string[]; // for phenotype grouping
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Mudah' | 'Sedang' | 'HOTS';
}
