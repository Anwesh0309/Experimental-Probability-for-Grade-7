// Mulberry32 Seeded PRNG for deterministic, reproducible question generation
export function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const randInt = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min;

export const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

export const shuffle = (rng, arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

export const simplify = (num, den) => {
  const g = gcd(num, den);
  return [num / g, den / g];
};
