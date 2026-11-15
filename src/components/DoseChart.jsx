import { useMemo } from 'react';
import { DOSE_BUDGET } from '../data/signals.js';
import { cv } from '../utils/format.js';
import ChartBox from './ChartBox.jsx';

export default function DoseChart({ crew, theme }) {
  const data = useMemo(() => ({
    labels: crew.map(c => c.name.split(' ')[0]),
    datasets: [
      { label: 'Cumulative dose (mSv, simulated)', data: crew.map(c => +c.cum.toFixed(1)), backgroundColor: cv('--accent'), borderRadius: 2, maxBarThickness: 56 },
      { type: 'line', label: 'Illustrative mission budget', data: crew.map(() => DOSE_BUDGET), borderColor: cv('--status-alert'), borderWidth: 1, borderDash: [5, 4], pointRadius: 0 },
    ],
  }), [crew, theme]);
  const options = useMemo(() => {
    const muted = cv('--text-muted'), grid = cv('--line');
    return {
      scales: {
        x: { ticks: { color: muted }, grid: { display: false } },
        y: { min: 0, max: Math.ceil(DOSE_BUDGET * 1.2), ticks: { color: muted }, grid: { color: grid }, title: { display: true, text: 'mSv', color: muted } },
      },
      plugins: { legend: { display: false } },
    };
  }, [theme]);
  const label = `Cumulative simulated dose per astronaut in mSv: ${crew.map(c => `${c.name} ${c.cum.toFixed(1)}`).join(', ')}. Illustrative budget ${DOSE_BUDGET} mSv.`;
  return <div className="panel-body"><div className="cv cv-dose"><ChartBox key={theme} type="bar" data={data} options={options} label={label} /></div></div>;
}
