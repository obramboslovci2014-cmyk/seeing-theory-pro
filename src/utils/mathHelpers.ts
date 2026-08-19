/**
 * Fast & robust mathematical and statistical helpers for Canvas simulations
 */

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
}

// Box-Muller transform for standard normal random variable
export function randNormal(mu: number = 0, sigma: number = 1): number {
  let u1 = Math.random();
  let u2 = Math.random();
  while (u1 <= 1e-7) u1 = Math.random(); // avoid log(0)
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mu + z0 * sigma;
}

// Exponential distribution sampler
export function randExp(lambda: number = 1): number {
  let u = Math.random();
  while (u <= 1e-7) u = Math.random();
  return -Math.log(u) / lambda;
}

// Uniform integer in [min, max] inclusive
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Binomial random variable
export function randBinomial(n: number, p: number): number {
  let successes = 0;
  for (let i = 0; i < n; i++) {
    if (Math.random() < p) successes++;
  }
  return successes;
}

// Standard normal PDF
export function normalPdf(x: number, mu: number = 0, sigma: number = 1): number {
  if (sigma <= 0) return 0;
  const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
  return factor * Math.exp(exponent);
}

// Standard normal CDF approximation (Abramowitz and Stegun)
export function normalCdf(x: number, mu: number = 0, sigma: number = 1): number {
  const z = (x - mu) / sigma;
  const t = 1.0 / (1.0 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-0.5 * z * z);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1.0 - p : p;
}

// Log-Gamma function (Lanczos approximation)
export function logGamma(z: number): number {
  const c = [
    57.1562356658629235, -59.5979603554754912, 14.1360979747417471,
    -0.491913816097620199, 0.339946499848118887e-4, 0.465236289270485756e-4,
    -0.983744753048795646e-4, 0.158088703224377394e-3, -0.210264441724104883e-3,
    0.217439618115212643e-3, -0.164318106536763890e-3, 0.844182239838527433e-4,
    -0.261908384015814087e-4, 0.368991826595316234e-5
  ];
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  let base = z + 5.2421875;
  let sum = 0.99999999999999709182;
  for (let i = 0; i < c.length; i++) {
    sum += c[i] / (z + i + 1);
  }
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(base) - base + Math.log(sum);
}

// Beta PDF: f(x; a, b) = x^(a-1) * (1-x)^(b-1) / B(a, b)
export function betaPdf(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  const logBeta = logGamma(a) + logGamma(b) - logGamma(a + b);
  const logPdf = (a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logBeta;
  return Math.exp(logPdf);
}

// Factorial and combinations
export function factorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let c = 1;
  for (let i = 0; i < k; i++) {
    c = (c * (n - i)) / (i + 1);
  }
  return c;
}

export function permutations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let p = 1;
  for (let i = 0; i < k; i++) {
    p *= (n - i);
  }
  return p;
}

// Descriptive statistics
export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

export function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function variance(arr: number[], isSample: boolean = true): number {
  if (arr.length <= 1) return 0;
  const m = mean(arr);
  const sumSq = arr.reduce((sum, v) => sum + Math.pow(v - m, 2), 0);
  return sumSq / (isSample ? arr.length - 1 : arr.length);
}

export function stdDev(arr: number[], isSample: boolean = true): number {
  return Math.sqrt(variance(arr, isSample));
}

// Linear Regression: returns slope (m), intercept (b), r, r2
export function linearRegression(points: { x: number; y: number }[]): {
  slope: number;
  intercept: number;
  r: number;
  r2: number;
  meanX: number;
  meanY: number;
} {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: 0, r: 0, r2: 0, meanX: 0, meanY: 0 };

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const mx = mean(xs);
  const my = mean(ys);

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = points[i].x - mx;
    const dy = points[i].y - my;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const slope = denX !== 0 ? num / denX : 0;
  const intercept = my - slope * mx;
  const denom = Math.sqrt(denX * denY);
  const r = denom !== 0 ? num / denom : 0;

  return {
    slope,
    intercept,
    r,
    r2: r * r,
    meanX: mx,
    meanY: my
  };
}

// One-way ANOVA calculation
export function oneWayAnova(groups: number[][]): {
  fStat: number;
  pValue: number;
  ssBetween: number;
  ssWithin: number;
  dfBetween: number;
  dfWithin: number;
  msBetween: number;
  msWithin: number;
  grandMean: number;
} {
  const k = groups.length;
  const totalN = groups.reduce((acc, g) => acc + g.length, 0);
  if (k < 2 || totalN <= k) {
    return {
      fStat: 0,
      pValue: 1,
      ssBetween: 0,
      ssWithin: 0,
      dfBetween: k - 1,
      dfWithin: Math.max(1, totalN - k),
      msBetween: 0,
      msWithin: 0,
      grandMean: 0
    };
  }

  const allVals = groups.flat();
  const grandMean = mean(allVals);

  let ssBetween = 0;
  let ssWithin = 0;

  for (const group of groups) {
    const gMean = mean(group);
    const n_i = group.length;
    ssBetween += n_i * Math.pow(gMean - grandMean, 2);
    for (const val of group) {
      ssWithin += Math.pow(val - gMean, 2);
    }
  }

  const dfBetween = k - 1;
  const dfWithin = totalN - k;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / Math.max(1, dfWithin);
  const fStat = msWithin > 0 ? msBetween / msWithin : 0;

  // Simple F p-value approximation
  const pValue = fStat > 0 ? Math.max(0.0001, 1 / (1 + fStat * (dfBetween / dfWithin))) : 1;

  return {
    fStat,
    pValue,
    ssBetween,
    ssWithin,
    dfBetween,
    dfWithin,
    msBetween,
    msWithin,
    grandMean
  };
}
