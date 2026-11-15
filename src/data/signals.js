export const SIG = {
  dose: { n: 'Dose rate', tol: 6, dir: 1, u: 'µSv/h', d: 1 },
  sleep: { n: 'Sleep', tol: 1.2, dir: -1, u: 'h sleep', d: 1 },
  rhr: { n: 'Resting heart rate', tol: 7, dir: 1, u: 'bpm', d: 0 },
  spo2: { n: 'Blood oxygen', tol: 1.2, dir: -1, u: '% SpO₂', d: 1 },
};

// Illustrative mission dose budget (mSv), shared by the KPI strip and the dose chart.
export const DOSE_BUDGET = 150;
