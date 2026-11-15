export const HZ = [
  { k: 'rad', n: 'Space radiation', i: '☢', s: 'dose', risk: 'Radiation-Induced Cancers', msg: 'dose rate is above baseline' },
  { k: 'iso', n: 'Isolation & confinement', i: '◔', s: 'sleep', risk: 'Inadequate Sleep and Irregular Schedules', msg: 'sleep is below baseline' },
  { k: 'dist', n: 'Distance from Earth', i: '⌖' },
  { k: 'grav', n: 'Gravity fields', i: '⬇', s: 'rhr', risk: 'Cardiovascular Adaptations', msg: 'resting heart rate is drifting up' },
  { k: 'env', n: 'Hostile/closed environment', i: '⌂', s: 'spo2', risk: 'Hypoxia', msg: 'blood oxygen is below baseline' },
];

export const NAMES = ['Normal', 'Watch', 'Alert'];
export const COL = ['var(--ok)', 'var(--wa)', 'var(--al)'];
