/**
 * Deterministic classical multidimensional scaling for a symmetric distance
 * matrix. The Jacobi eigensolver avoids runtime-specific random starts, and
 * eigenvector signs are fixed from stable item ids.
 */
export function classicalMds(
  distances: number[][],
  dimensions = 3,
  ids: string[] = distances.map((_, index) => String(index)),
): number[][] {
  const n = distances.length;
  const dims = Math.max(0, dimensions);
  if (n === 0) return [];
  if (n === 1) return [new Array<number>(dims).fill(0)];

  const squared = distances.map((row, i) =>
    row.map((value, j) => (i === j ? 0 : Math.max(0, value) ** 2)),
  );
  const rowMeans = squared.map((row) => row.reduce((sum, value) => sum + value, 0) / n);
  const totalMean = rowMeans.reduce((sum, value) => sum + value, 0) / n;
  const gram = squared.map((row, i) =>
    row.map((value, j) => -0.5 * (value - rowMeans[i]! - rowMeans[j]! + totalMean)),
  );

  const { values, vectors } = symmetricEigen(gram);
  const order = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value || a.index - b.index)
    .slice(0, dims);
  const coordinates = Array.from({ length: n }, () => new Array<number>(dims).fill(0));

  for (let dimension = 0; dimension < order.length; dimension++) {
    const eigen = order[dimension]!;
    if (eigen.value <= 1e-12) continue;
    const scale = Math.sqrt(eigen.value);
    let signAnchor = 0;
    for (let i = 1; i < n; i++) {
      const candidate = Math.abs(vectors[i]![eigen.index]!);
      const current = Math.abs(vectors[signAnchor]![eigen.index]!);
      if (candidate > current + 1e-12 || (Math.abs(candidate - current) <= 1e-12 && idHash(ids[i]!) < idHash(ids[signAnchor]!))) {
        signAnchor = i;
      }
    }
    const sign = vectors[signAnchor]![eigen.index]! < 0 ? -1 : 1;
    for (let i = 0; i < n; i++) {
      coordinates[i]![dimension] = vectors[i]![eigen.index]! * scale * sign;
    }
  }
  return coordinates;
}

function symmetricEigen(input: number[][]): { values: number[]; vectors: number[][] } {
  const n = input.length;
  const matrix = input.map((row) => [...row]);
  const vectors: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
  const maxIterations = Math.max(1, n * n * 40);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const magnitude = Math.abs(matrix[i]![j]!);
        if (magnitude > largest + 1e-15) {
          largest = magnitude;
          p = i;
          q = j;
        }
      }
    }
    if (largest < 1e-12) break;

    const app = matrix[p]![p]!;
    const aqq = matrix[q]![q]!;
    const apq = matrix[p]![q]!;
    const angle = 0.5 * Math.atan2(2 * apq, aqq - app);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);

    for (let k = 0; k < n; k++) {
      if (k === p || k === q) continue;
      const akp = matrix[k]![p]!;
      const akq = matrix[k]![q]!;
      const nextKp = cosine * akp - sine * akq;
      const nextKq = sine * akp + cosine * akq;
      matrix[k]![p] = nextKp;
      matrix[p]![k] = nextKp;
      matrix[k]![q] = nextKq;
      matrix[q]![k] = nextKq;
    }
    matrix[p]![p] = cosine * cosine * app - 2 * sine * cosine * apq + sine * sine * aqq;
    matrix[q]![q] = sine * sine * app + 2 * sine * cosine * apq + cosine * cosine * aqq;
    matrix[p]![q] = 0;
    matrix[q]![p] = 0;

    for (let k = 0; k < n; k++) {
      const vkp = vectors[k]![p]!;
      const vkq = vectors[k]![q]!;
      vectors[k]![p] = cosine * vkp - sine * vkq;
      vectors[k]![q] = sine * vkp + cosine * vkq;
    }
  }

  return { values: matrix.map((row, index) => row[index]!), vectors };
}

function idHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
