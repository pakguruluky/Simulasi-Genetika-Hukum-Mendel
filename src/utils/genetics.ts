import { CrossMode, TraitConfig, PunnettCell, RatioItem } from '../types/genetics';

/**
 * Validates and extracts possible gametes for a given genotype string
 * Monohybrid e.g. "Bb" -> ["B", "b"]
 * Dihybrid e.g. "BbKk" -> ["BK", "Bk", "bK", "bk"]
 */
export function generateGametes(genotype: string, mode: CrossMode): string[] {
  if (mode === 'monohybrid') {
    // genotype length 2, e.g. "Bb"
    const a1 = genotype.charAt(0) || 'B';
    const a2 = genotype.charAt(1) || 'b';
    return [a1, a2];
  } else {
    // dihybrid, genotype length 4, e.g. "BbKk"
    const t1_a1 = genotype.charAt(0) || 'B';
    const t1_a2 = genotype.charAt(1) || 'b';
    const t2_a1 = genotype.charAt(2) || 'K';
    const t2_a2 = genotype.charAt(3) || 'k';

    // FOIL method
    const g1 = `${t1_a1}${t2_a1}`;
    const g2 = `${t1_a1}${t2_a2}`;
    const g3 = `${t1_a2}${t2_a1}`;
    const g4 = `${t1_a2}${t2_a2}`;

    return [g1, g2, g3, g4];
  }
}

/**
 * Combines gamete from Row (Parent 1) and Col (Parent 2) to get canonical genotype
 * e.g. Row "B", Col "b" -> "Bb"
 * Row "Bk", Col "bK" -> "BbKk" (always uppercase allele first for each trait)
 */
export function combineGametes(
  gamete1: string,
  gamete2: string,
  mode: CrossMode,
  trait1: TraitConfig,
  trait2?: TraitConfig
): {
  genotype: string;
  phenotypeName: string;
  trait1Phenotype: string;
  trait2Phenotype?: string;
  trait1IsDominant: boolean;
  trait2IsDominant?: boolean;
} {
  if (mode === 'monohybrid') {
    const raw = [gamete1.charAt(0), gamete2.charAt(0)];
    // Sort so capital letter comes first, e.g. ['b', 'B'] -> ['B', 'b']
    raw.sort((a, b) => {
      if (a === a.toUpperCase() && b === b.toLowerCase()) return -1;
      if (a === a.toLowerCase() && b === b.toUpperCase()) return 1;
      return a.localeCompare(b);
    });
    const genotype = raw.join('');

    // Determine phenotype
    const hasDominant = genotype.includes(trait1.dominantSymbol);
    const trait1Phenotype = hasDominant ? trait1.dominantName : trait1.recessiveName;

    return {
      genotype,
      phenotypeName: trait1Phenotype,
      trait1Phenotype,
      trait1IsDominant: hasDominant,
    };
  } else {
    // Dihybrid: gamete1 e.g. "BK", gamete2 e.g. "bk"
    const t1_a1 = gamete1.charAt(0);
    const t1_a2 = gamete2.charAt(0);
    const t1_raw = [t1_a1, t1_a2].sort((a, b) => {
      if (a === a.toUpperCase() && b === b.toLowerCase()) return -1;
      if (a === a.toLowerCase() && b === b.toUpperCase()) return 1;
      return a.localeCompare(b);
    });
    const trait1Genotype = t1_raw.join('');

    const t2_a1 = gamete1.charAt(1);
    const t2_a2 = gamete2.charAt(1);
    const t2_raw = [t2_a1, t2_a2].sort((a, b) => {
      if (a === a.toUpperCase() && b === b.toLowerCase()) return -1;
      if (a === a.toLowerCase() && b === b.toUpperCase()) return 1;
      return a.localeCompare(b);
    });
    const trait2Genotype = t2_raw.join('');

    const genotype = `${trait1Genotype}${trait2Genotype}`;

    const t1HasDom = trait1Genotype.includes(trait1.dominantSymbol);
    const trait1Phenotype = t1HasDom ? trait1.dominantName : trait1.recessiveName;

    const t2DomSymbol = trait2 ? trait2.dominantSymbol : 'K';
    const t2HasDom = trait2Genotype.includes(t2DomSymbol);
    const trait2Phenotype = trait2
      ? t2HasDom
        ? trait2.dominantName
        : trait2.recessiveName
      : '';

    const phenotypeName = `${trait1Phenotype}, ${trait2Phenotype}`;

    return {
      genotype,
      phenotypeName,
      trait1Phenotype,
      trait2Phenotype,
      trait1IsDominant: t1HasDom,
      trait2IsDominant: t2HasDom,
    };
  }
}

/**
 * Assigns distinct color styling based on phenotype combination
 */
export function getPhenotypeColorStyle(
  t1IsDom: boolean,
  t2IsDom?: boolean,
  mode: CrossMode = 'monohybrid'
): { bg: string; border: string; text: string; badgeIcon: string } {
  if (mode === 'monohybrid') {
    if (t1IsDom) {
      return {
        bg: 'bg-emerald-950/40 hover:bg-emerald-900/50',
        border: 'border-emerald-700/50',
        text: 'text-emerald-300',
        badgeIcon: '🟢',
      };
    } else {
      return {
        bg: 'bg-amber-950/40 hover:bg-amber-900/50',
        border: 'border-amber-700/50',
        text: 'text-amber-300',
        badgeIcon: '🟤',
      };
    }
  } else {
    // Dihybrid 4 combinations
    if (t1IsDom && t2IsDom) {
      return {
        bg: 'bg-teal-950/50 hover:bg-teal-900/60',
        border: 'border-teal-600/50',
        text: 'text-teal-300',
        badgeIcon: '🟢🟡',
      };
    } else if (t1IsDom && !t2IsDom) {
      return {
        bg: 'bg-emerald-950/50 hover:bg-emerald-900/60',
        border: 'border-emerald-600/50',
        text: 'text-emerald-300',
        badgeIcon: '🟢🟢',
      };
    } else if (!t1IsDom && t2IsDom) {
      return {
        bg: 'bg-amber-950/50 hover:bg-amber-900/60',
        border: 'border-amber-600/50',
        text: 'text-amber-300',
        badgeIcon: '🟤🟡',
      };
    } else {
      return {
        bg: 'bg-rose-950/50 hover:bg-rose-900/60',
        border: 'border-rose-600/50',
        text: 'text-rose-300',
        badgeIcon: '🟤🟢',
      };
    }
  }
}

/**
 * Builds the complete Punnett Square matrix
 */
export function buildPunnettSquare(
  p1Genotype: string,
  p2Genotype: string,
  mode: CrossMode,
  trait1: TraitConfig,
  trait2?: TraitConfig
): {
  rowGametes: string[];
  colGametes: string[];
  matrix: PunnettCell[][];
  flatCells: PunnettCell[];
} {
  const rowGametes = generateGametes(p1Genotype, mode);
  const colGametes = generateGametes(p2Genotype, mode);

  const matrix: PunnettCell[][] = [];
  const flatCells: PunnettCell[] = [];

  for (let r = 0; r < rowGametes.length; r++) {
    const row: PunnettCell[] = [];
    const gRow = rowGametes[r];

    for (let c = 0; c < colGametes.length; c++) {
      const gCol = colGametes[c];
      const res = combineGametes(gRow, gCol, mode, trait1, trait2);
      const style = getPhenotypeColorStyle(res.trait1IsDominant, res.trait2IsDominant, mode);

      const cell: PunnettCell = {
        id: `cell-${r}-${c}`,
        rowIndex: r,
        colIndex: c,
        gameteP1: gRow,
        gameteP2: gCol,
        genotype: res.genotype,
        phenotypeName: res.phenotypeName,
        trait1Phenotype: res.trait1Phenotype,
        trait2Phenotype: res.trait2Phenotype,
        trait1IsDominant: res.trait1IsDominant,
        trait2IsDominant: res.trait2IsDominant,
        colorClass: `${style.bg} ${style.border} ${style.text}`,
        badgeIcon: style.badgeIcon,
      };

      row.push(cell);
      flatCells.push(cell);
    }
    matrix.push(row);
  }

  return { rowGametes, colGametes, matrix, flatCells };
}

/**
 * Calculates Greatest Common Divisor to simplify mathematical ratios
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function gcdMultiple(numbers: number[]): number {
  if (numbers.length === 0) return 1;
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = gcd(result, numbers[i]);
  }
  return result || 1;
}

/**
 * Computes exact genotypic and phenotypic ratios
 */
export function computeRatios(
  flatCells: PunnettCell[],
  mode: CrossMode,
  trait1: TraitConfig,
  trait2?: TraitConfig
): {
  genotypicRatios: RatioItem[];
  phenotypicRatios: RatioItem[];
} {
  const total = flatCells.length;

  // 1. Genotype Grouping
  const genotypeMap = new Map<string, number>();
  flatCells.forEach((c) => {
    genotypeMap.set(c.genotype, (genotypeMap.get(c.genotype) || 0) + 1);
  });

  const genCounts = Array.from(genotypeMap.values());
  const genGcd = gcdMultiple(genCounts);

  const genotypicRatios: RatioItem[] = Array.from(genotypeMap.entries()).map(([genotype, count]) => {
    const percentage = Number(((count / total) * 100).toFixed(2));
    const ratioValue = count / genGcd;

    return {
      key: genotype,
      count,
      total,
      percentage,
      fractionString: `${count}/${total}`,
      ratioValue,
      colorClass: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    };
  });

  // 2. Phenotype Grouping
  const phenotypeMap = new Map<
    string,
    { count: number; genotypes: Set<string>; t1Dom: boolean; t2Dom?: boolean; icon: string }
  >();

  flatCells.forEach((c) => {
    if (!phenotypeMap.has(c.phenotypeName)) {
      phenotypeMap.set(c.phenotypeName, {
        count: 0,
        genotypes: new Set(),
        t1Dom: c.trait1IsDominant,
        t2Dom: c.trait2IsDominant,
        icon: c.badgeIcon,
      });
    }
    const entry = phenotypeMap.get(c.phenotypeName)!;
    entry.count += 1;
    entry.genotypes.add(c.genotype);
  });

  const phenCounts = Array.from(phenotypeMap.values()).map((v) => v.count);
  const phenGcd = gcdMultiple(phenCounts);

  const phenotypicRatios: RatioItem[] = Array.from(phenotypeMap.entries()).map(([phenotype, data]) => {
    const percentage = Number(((data.count / total) * 100).toFixed(2));
    const ratioValue = data.count / phenGcd;
    const style = getPhenotypeColorStyle(data.t1Dom, data.t2Dom, mode);

    return {
      key: phenotype,
      count: data.count,
      total,
      percentage,
      fractionString: `${data.count}/${total}`,
      ratioValue,
      colorClass: `${style.bg} ${style.text} ${style.border}`,
      icon: data.icon,
      genotypes: Array.from(data.genotypes),
    };
  });

  return { genotypicRatios, phenotypicRatios };
}
