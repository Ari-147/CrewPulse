import { HZ } from '../data/hazards.js';
import { dev, lvl } from '../utils/status.js';
import StatusMark from './StatusMark.jsx';

const worst = m => Math.max(...HZ.filter(h => h.s).map(h => lvl(dev(m, h.s))));

export { worst };
export default function CrewTabs({ crew, selected, onSelect }) {
  const onKeyDown = event => {
    const n = crew.length;
    const next = { ArrowRight: (selected + 1) % n, ArrowLeft: (selected - 1 + n) % n, Home: 0, End: n - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    document.getElementById(`tab-${crew[next].id}`)?.focus();
  };
  return <div className="crew" role="tablist" aria-label="Select astronaut" onKeyDown={onKeyDown}>
    {crew.map((c, i) => <button key={c.id} id={`tab-${c.id}`} role="tab" aria-selected={i === selected} aria-controls="crew-panel" tabIndex={i === selected ? 0 : -1} className="crew-tab" onClick={() => onSelect(i)}>
      <StatusMark level={worst(c)} />{c.name}<span className="role">{c.role}</span>
    </button>)}
  </div>;
}
