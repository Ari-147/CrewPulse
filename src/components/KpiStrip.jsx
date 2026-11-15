import { NAMES } from '../data/hazards.js';
import { DOSE_BUDGET } from '../data/signals.js';
import StatusMark from './StatusMark.jsx';

const Stat = ({ label, value, detail, level }) => <div className="panel stat">
  <div className="label">{label}</div>
  <div className={`stat-value${level === undefined ? '' : ` status-${level}`}`}>{level !== undefined && <StatusMark level={level} />}{value}</div>
  <div className="stat-detail">{detail}</div>
</div>;

export default function KpiStrip({ all, nd, signalCount, member, peak, online, q, crewCount }) {
  return <section className="stats" aria-label="Key indicators">
    <Stat label="Crew status" value={NAMES[all]} level={all} detail={`${crewCount} astronauts monitored`} />
    <Stat label="Off-baseline signals" value={`${nd} of ${signalCount}`} detail={member.name} />
    <Stat label="Peak cumulative dose" value={<>{peak.toFixed(1)}<span className="unit">mSv</span></>} detail={`${Math.round(peak / DOSE_BUDGET * 100)}% of illustrative budget`} />
    <Stat label="Ground link" value={online ? 'Online' : 'Autonomous'} level={online ? 0 : 1} detail={online ? 'Real-time sync' : `${q} summaries queued`} />
  </section>;
}
