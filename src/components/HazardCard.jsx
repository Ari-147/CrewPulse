import { COL, NAMES } from '../data/hazards.js';
import { SIG } from '../data/signals.js';
import { clamp, dev, lvl } from '../utils/status.js';
import Ring from './Ring.jsx';
import Spark from './Spark.jsx';

export default function HazardCard({ hazard, member, online, queued, t }) {
  let level, score, big, sub, data, extra = '';
  if (hazard.s) {
    const drift = dev(member, hazard.s);
    level = lvl(drift); score = clamp(100 - drift * 38, 0, 100); big = member.val[hazard.s].toFixed(SIG[hazard.s].d); sub = SIG[hazard.s].u; data = member.hist[hazard.s];
    extra = hazard.k === 'rad' ? `Neutron channel · ${(member.val.dose * .3).toFixed(1)} µSv/h (sim.)` : hazard.k === 'env' ? `Cabin · ${(22 + Math.sin(t / 9) * .4).toFixed(1)} °C` : `Baseline · ${member.base[hazard.s]} ${SIG[hazard.s].u}`;
  } else { level = online ? 0 : 1; score = online ? 100 : 68; big = online ? 'Online' : 'On board'; sub = online ? 'Live link to ground' : `${queued} summaries queued`; extra = 'Offline-first · store-and-forward'; }
  const color = COL[level];
  return <div className={`card l${level}`} style={{ '--c': color }}>
    <div className="ch"><span>{hazard.n}</span><span className="chip">{NAMES[level]}</span></div>
    <div className="body"><Ring score={score} color={color} /><div><div className="big">{big}</div><div className="sub">{sub}</div></div></div>
    {data ? <Spark data={data} color={color} /> : <div className="spark-space" />}
    <div className="sub card-extra">{extra}</div><div className="risk">{hazard.risk ? `NASA risk: ${hazard.risk}` : 'Hazard-level design driver: self-sufficiency far from Earth'}</div>
  </div>;
}
