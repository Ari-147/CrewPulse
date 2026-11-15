import { SIG } from '../data/signals.js';

export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const dev = (m, k) => Math.max(0, SIG[k].dir * (m.val[k] - m.base[k]) / SIG[k].tol);
export const lvl = d => (d < 1 ? 0 : d < 2 ? 1 : 2);

// Shared plotting window for a signal: leaves room on the unfavourable side so Watch (1x) and Alert (2x) are visible.
export const signalDomain = (k, base) => {
  const { dir, tol } = SIG[k];
  return dir > 0 ? [base - tol * 1.5, base + tol * 4] : [base - tol * 4, base + tol * 1.5];
};
