import { useMemo } from 'react';
import { SIG } from '../data/signals.js';
import { cv, utcTime } from '../utils/format.js';
import { dev, lvl, signalDomain } from '../utils/status.js';
import ChartBox from './ChartBox.jsx';
import StatusMark from './StatusMark.jsx';

const KEYS = ['dose', 'sleep', 'rhr', 'spo2'];
const SAMPLES = 28;

// One small-multiple per signal, plotted in real units against its own baseline.
// The trace is neutral ink; only the Watch and Alert thresholds use status colour.
function Signal({ k, member, t, theme }) {
  const sig = SIG[k], base = member.base[k], drift = dev(member, k);
  const labels = useMemo(() => Array.from({ length: SAMPLES }, (_, i) => utcTime(t - (SAMPLES - 1 - i))), [t]);
  const data = useMemo(() => {
    const flat = v => Array(SAMPLES).fill(v);
    const line = (label, values, color, extra) => ({ label, data: values, borderColor: color, pointRadius: 0, ...extra });
    return { labels, datasets: [
      line(sig.n, member.hist[k], cv('--text'), { borderWidth: 2, pointHoverRadius: 3, tension: .2 }),
      line('Baseline', flat(base), cv('--text-muted'), { borderWidth: 1, borderDash: [2, 3] }),
      line('Watch (1×)', flat(base + sig.dir * sig.tol), cv('--status-watch'), { borderWidth: 1, borderDash: [5, 4] }),
      line('Alert (2×)', flat(base + sig.dir * sig.tol * 2), cv('--status-alert'), { borderWidth: 1, borderDash: [5, 4] }),
    ] };
  }, [labels, member, theme]);
  const options = useMemo(() => {
    const muted = cv('--text-muted'), grid = cv('--line');
    const [lo, hi] = signalDomain(k, base);
    // Y ticks sit on the values that matter: baseline, Watch (1x) and Alert (2x).
    const marks = [base, base + sig.dir * sig.tol, base + sig.dir * sig.tol * 2];
    return {
      layout: { padding: { top: 4 } },
      scales: {
        x: { ticks: { color: muted, maxTicksLimit: 4, maxRotation: 0, padding: 4 }, grid: { display: false }, border: { color: grid } },
        y: {
          min: lo, max: hi,
          afterBuildTicks: scale => { scale.ticks = marks.map(value => ({ value })); },
          afterFit: scale => { scale.width = 48; },
          ticks: { color: muted, callback: v => Number(v).toFixed(sig.d) },
          grid: { color: grid }, border: { display: false },
        },
      },
      plugins: { legend: { display: false }, tooltip: { filter: item => item.datasetIndex === 0, callbacks: { label: item => `${item.parsed.y.toFixed(sig.d)} ${sig.u}` } } },
    };
  }, [member.id, theme]);
  const level = lvl(drift);
  const current = member.val[k].toFixed(sig.d);
  return <div>
    <div className="signal-head">
      <span className="signal-title">{sig.n}</span>
      <span className="num caption"><span className={`status-${level}`}><StatusMark level={level} /></span> {current} {sig.u} · {drift.toFixed(2)}×</span>
    </div>
    <div className="cv"><ChartBox key={`${member.id}${theme}`} type="line" data={data} options={options} label={`${sig.n} trend for ${member.name}, last ${SAMPLES} samples. Current ${current} ${sig.u}, ${drift.toFixed(2)} times tolerance.`} /></div>
  </div>;
}

export default function DriftChart({ member, t, theme }) {
  return <div className="signals">{KEYS.map(k => <Signal key={k} k={k} member={member} t={t} theme={theme} />)}</div>;
}
