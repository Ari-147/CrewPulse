import { COL } from '../data/hazards.js';
import { dev, lvl } from '../utils/status.js';
import { HZ } from '../data/hazards.js';

const worst = m => Math.max(...HZ.filter(h => h.s).map(h => lvl(dev(m, h.s))));

export { worst };
export default function CrewTabs({ crew, selected, onSelect }) {
  return <div className="tabs" role="tablist" aria-label="Select astronaut">
    {crew.map((c, i) => <button key={c.id} role="tab" aria-selected={i === selected} className="tab" onClick={() => onSelect(i)}>
      <span className="dot" style={{ '--c': COL[worst(c)] }} />{c.name}<small>{c.role}</small>
    </button>)}
  </div>;
}
