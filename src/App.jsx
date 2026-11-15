import { useEffect, useMemo, useState } from 'react';
import { HZ } from './data/hazards.js';
import { SIG } from './data/signals.js';
import { useDonki } from './hooks/useDonki.js';
import { useSimulation } from './hooks/useSimulation.js';
import { cv } from './utils/format.js';
import { clamp, dev, lvl } from './utils/status.js';
import Header from './components/Header.jsx';
import CrewTabs, { worst } from './components/CrewTabs.jsx';
import KpiStrip from './components/KpiStrip.jsx';
import HazardGrid from './components/HazardGrid.jsx';
import DriftChart from './components/DriftChart.jsx';
import HazardRadar from './components/HazardRadar.jsx';
import DoseChart from './components/DoseChart.jsx';
import CrewTable from './components/CrewTable.jsx';
import AlertFeed from './components/AlertFeed.jsx';
import SimControls from './components/SimControls.jsx';
import SpaceWeather from './components/SpaceWeather.jsx';
import Toast from './components/Toast.jsx';

const Section = ({ title, detail, children }) => <section className="sec"><div className="sh"><h2>{title}</h2><p>{detail}</p></div>{children}</section>;

export default function App() {
  const simulation = useSimulation();
  const { crew, online, q, t, alerts, toggleLink, spike, sleepHit, reset } = simulation;
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState('');
  const [theme, setTheme] = useState('dark');
  const spaceWeather = useDonki();
  const member = crew[selected];
  const notify = message => { setToast(message); setTimeout(() => setToast(''), 3200); };
  const switchTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; setTheme(next); };
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const charts = useMemo(() => {
    const text = cv('--muted'), grid = cv('--line');
    const trend = key => member.hist[key].map(value => Math.max(-1, SIG[key].dir * (value - member.base[key]) / SIG[key].tol));
    const line = (label, key, color) => ({ label, data: trend(key), borderColor: cv(color), borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: .2 });
    const threshold = (label, value, color) => ({ label, data: Array(28).fill(value), borderColor: cv(color), borderDash: [5, 5], borderWidth: 1, pointRadius: 0 });
    const axis = title => ({ ticks: { color: text }, grid: { color: grid }, title: { display: !!title, text: title, color: text } });
    const legend = { legend: { position: 'bottom', labels: { color: text, boxWidth: 12, usePointStyle: true, pointStyle: 'line' } } };
    return {
      trend: { labels: Array(28).fill(''), datasets: [line('Dose rate', 'dose', '--vi'), line('Sleep', 'sleep', '--cy'), line('Heart rate', 'rhr', '--wa'), line('Blood oxygen', 'spo2', '--ok'), threshold('Watch (1×)', 1, '--wa'), threshold('Alert (2×)', 2, '--al')] },
      radar: { labels: ['Radiation', 'Isolation', 'Distance', 'Gravity', 'Environment'], datasets: [{ data: HZ.map(h => h.s ? clamp(100 - dev(member, h.s) * 38, 0, 100) : online ? 100 : 68), borderColor: cv('--cy'), backgroundColor: 'rgba(34,211,238,.2)', pointBackgroundColor: cv('--cy'), borderWidth: 2 }] },
      dose: { labels: crew.map(c => c.name.split(' ')[0]), datasets: [{ label: 'Cumulative dose (mSv, simulated)', data: crew.map(c => +c.cum.toFixed(1)), backgroundColor: cv('--cy'), borderRadius: 8 }, { type: 'line', label: 'Illustrative mission budget', data: crew.map(() => 150), borderColor: cv('--al'), borderDash: [6, 6], pointRadius: 0 }] },
      trendOptions: { scales: { x: { display: false }, y: { ...axis('× personal tolerance'), min: -1, max: 4 } }, plugins: { ...legend, tooltip: { filter: item => item.datasetIndex < 4, callbacks: { label: item => `${item.dataset.label}: ${item.parsed.y.toFixed(2)}×` } } } },
      radarOptions: { scales: { r: { min: 0, max: 100, ticks: { display: false }, grid: { color: grid }, angleLines: { color: grid }, pointLabels: { color: text, font: { size: 11 } } } }, plugins: { legend: { display: false } } },
      doseOptions: { scales: { x: axis(), y: { ...axis('mSv'), min: 0, max: 180 } }, plugins: legend },
    };
  }, [crew, member, online, theme]);
  const nd = HZ.filter(h => h.s).filter(h => lvl(dev(member, h.s)) > 0).length;
  const all = Math.max(...crew.map(worst), online ? 0 : 1);
  const peak = Math.max(...crew.map(c => c.cum));
  return <div className="app">
    <Header t={t} online={online} theme={theme} onLink={() => toggleLink(notify)} onTheme={switchTheme} />
    <section className="hero"><div className="meta">Mission day 112 · Simulated telemetry · Fictional crew</div><h1>Crew health intelligence</h1><p className="lede">Baseline-aware monitoring across NASA’s five hazards of human spaceflight. Each astronaut is compared with their own baseline, so drift is flagged before it becomes a problem.</p><CrewTabs crew={crew} selected={selected} onSelect={setSelected} /></section>
    <KpiStrip all={all} nd={nd} member={member} peak={peak} online={online} q={q} />
    <div className="layout"><main>
      {nd >= 2 && <div className="banner" role="status"><b>Compound-hazard pattern.</b> {nd} signals are drifting together for {member.name}. NASA notes the five hazards can feed off one another. Suggested next step: flag to the medical officer and review workload and sleep schedule.</div>}
      <Section title={`Drift from personal baseline · ${member.name}`} detail="Each signal is shown as a multiple of this astronaut’s own tolerance, where positive values mean drift in the unfavorable direction. Dashed lines mark the Watch (1×) and Alert (2×) thresholds."><DriftChart key={`a${theme}`} data={charts.trend} options={charts.trendOptions} /></Section>
      <Section title="Status by hazard" detail="NASA’s five hazards of human spaceflight. In each ring, 100 is nominal."><HazardGrid member={member} online={online} queued={q} t={t} /></Section>
      <section className="sec two"><div><h3 className="ct">Hazard balance</h3><p className="cd">Score per hazard for {member.name}; 100 is nominal.</p><HazardRadar key={`b${theme}`} data={charts.radar} options={charts.radarOptions} /></div><div><h3 className="ct">Cumulative radiation dose</h3><p className="cd">Simulated dose at mission day 112 against an illustrative, configurable budget.</p><DoseChart key={`c${theme}`} data={charts.dose} options={charts.doseOptions} /></div></section>
      <Section title="Crew overview" detail="Current simulated readings for every astronaut. Select a row to inspect that astronaut."><CrewTable crew={crew} selected={selected} onSelect={setSelected} /></Section>
    </main><aside><div className="blk"><SimControls onSpike={spike} onSleep={() => sleepHit(selected)} onReset={reset} /></div><div className="blk"><SpaceWeather spaceWeather={spaceWeather} /></div><div className="blk"><h3>Alert feed</h3><AlertFeed alerts={alerts} /></div></aside></div>
    <footer className="foot">Simulated data · Fictional crew · Decision support, not a medical device · Built on NASA HRP and CSA resources</footer><Toast message={toast} />
  </div>;
}
