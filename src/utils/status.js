import { SIG } from '../data/signals.js';

export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const dev = (m, k) => Math.max(0, SIG[k].dir * (m.val[k] - m.base[k]) / SIG[k].tol);
export const lvl = d => (d < 1 ? 0 : d < 2 ? 1 : 2);
