import { useEffect, useRef, useState } from 'react';
import { HZ } from './data/hazards.js';
import { DOSE_BUDGET } from './data/signals.js';
import { useDonki } from './hooks/useDonki.js';
import { useSimulation } from './hooks/useSimulation.js';
import { dev, lvl } from './utils/status.js';
import Header from './components/Header.jsx';
import CrewTabs, { worst } from './components/CrewTabs.jsx';
import KpiStrip from './components/KpiStrip.jsx';
import Panel from './components/Panel.jsx';
import HazardGrid from './components/HazardGrid.jsx';
import DriftChart from './components/DriftChart.jsx';
import DoseChart from './components/DoseChart.jsx';
import CrewTable from './components/CrewTable.jsx';
import AlertFeed from './components/AlertFeed.jsx';
import SimControls from './components/SimControls.jsx';
import SpaceWeather from './components/SpaceWeather.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  const simulation = useSimulation();
  const { crew, online, q, t, alerts, toggleLink, spike, sleepHit, reset } = simulation;
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState('');
  const [theme, setTheme] = useState('light');
  const [lastTick, setLastTick] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const toastTimer = useRef();
  const spaceWeather = useDonki();
  const member = crew[selected];

  const notify = message => { setToast(message); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(''), 3200); };
  // Set the attribute before re-rendering: charts read CSS tokens during render and must see the new theme.
  const switchTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; setTheme(next); };
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { setLastTick(Date.now()); }, [t]);
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const age = Math.max(0, Math.round((now - lastTick) / 1000));
  const signals = HZ.filter(h => h.s);
  const nd = signals.filter(h => lvl(dev(member, h.s)) > 0).length;
  const all = Math.max(...crew.map(worst), online ? 0 : 1);
  const peak = Math.max(...crew.map(c => c.cum));

  return <>
    <Header t={t} online={online} theme={theme} age={age} onLink={() => toggleLink(notify)} onTheme={switchTheme} />
    <div className="page">
      <CrewTabs crew={crew} selected={selected} onSelect={setSelected} />
      <KpiStrip all={all} nd={nd} signalCount={signals.length} member={member} peak={peak} online={online} q={q} crewCount={crew.length} />
      {nd >= 2 && <div className="banner" role="status"><b>Compound-hazard pattern.</b> {nd} signals are drifting together for {member.name}. NASA notes the five hazards can feed off one another. Suggested next step: flag to the medical officer and review workload and sleep schedule.</div>}
      <div className="layout">
        <div className="layout-main" role="tabpanel" id="crew-panel" aria-labelledby={`tab-${member.id}`}>
          <Panel title="Status by hazard" meta={member.name} note="NASA’s five hazards of human spaceflight. Each bar shows drift as a multiple of this astronaut’s personal tolerance: Watch at 1×, Alert at 2×.">
            <HazardGrid member={member} online={online} queued={q} t={t} />
          </Panel>
          <Panel title="Drift from personal baseline" meta={`${member.name} · last 28 samples · UTC`} note="Each signal in its own units against the astronaut’s baseline. Dashed lines mark the Watch (1×) and Alert (2×) thresholds.">
            <DriftChart member={member} t={t} theme={theme} />
          </Panel>
          <Panel title="Cumulative radiation dose" meta="mSv, simulated" note={`Dashed line: illustrative ${DOSE_BUDGET} mSv mission budget.`}>
            <DoseChart crew={crew} theme={theme} />
          </Panel>
          <Panel title="Crew overview" meta="Select a row to inspect">
            <CrewTable crew={crew} selected={selected} onSelect={setSelected} />
          </Panel>
        </div>
        <aside className="rail" aria-label="Alerts and tools">
          <Panel title="Alert feed" meta={`${alerts.length} logged`} className="alerts"><AlertFeed alerts={alerts} /></Panel>
          <SpaceWeather spaceWeather={spaceWeather} />
          <SimControls onSpike={spike} onSleep={() => sleepHit(selected)} onReset={reset} />
        </aside>
      </div>
      <footer className="foot">Simulated data · Fictional crew · Decision support, not a medical device · Built on NASA HRP and CSA resources</footer>
    </div>
    <Toast message={toast} />
  </>;
}
