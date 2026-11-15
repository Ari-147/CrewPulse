import { NAMES } from '../data/hazards.js';
import { SIG } from '../data/signals.js';
import { dev, lvl, signalDomain } from '../utils/status.js';
import Spark from './Spark.jsx';
import StatusMark from './StatusMark.jsx';
import TolBar from './TolBar.jsx';

export default function HazardCard({ hazard, member, online, queued, t }) {
  const key = hazard.s;
  let level, value, unit, extra, tolerance, trend;
  if (key) {
    const drift = dev(member, key);
    level = lvl(drift);
    value = member.val[key].toFixed(SIG[key].d);
    unit = SIG[key].u;
    tolerance = <TolBar drift={drift} />;
    trend = <Spark data={member.hist[key]} color="var(--text-2)" domain={signalDomain(key, member.base[key])} />;
    extra = hazard.k === 'rad' ? `Neutron channel · ${(member.val.dose * .3).toFixed(1)} µSv/h (sim.)`
      : hazard.k === 'env' ? `Cabin · ${(22 + Math.sin(t / 9) * .4).toFixed(1)} °C`
      : `Baseline · ${member.base[key]} ${unit}`;
  } else {
    level = online ? 0 : 1;
    value = online ? 'Online' : 'On board';
    unit = '';
    extra = online ? 'Live link to ground' : `${queued} summaries queued`;
    tolerance = <span className="caption">Offline-first · store-and-forward</span>;
  }
  return <li className={`hz-row l${level}`}>
    <div><div className="hz-name">{hazard.n}</div><div className="caption">{hazard.risk ? `NASA risk: ${hazard.risk}` : 'Design driver: self-sufficiency far from Earth'}</div></div>
    <div><div className="hz-value">{value}<span className="unit">{unit}</span></div><div className="caption">{extra}</div></div>
    <div className="hz-tol">{tolerance}</div>
    <div className="hz-spark">{trend}</div>
    <div><span className={`status status-${level}`}><StatusMark level={level} />{NAMES[level]}</span></div>
  </li>;
}
