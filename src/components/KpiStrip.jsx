import { COL, NAMES } from '../data/hazards.js';

const Kpi = ({ label, value, detail, color }) => <div className="kpi"><div className="kl">{label}</div><div className="kv" style={color ? { color } : undefined}>{value}</div><div className="ks">{detail}</div></div>;

export default function KpiStrip({ all, nd, member, peak, online, q }) {
  return <section className="kpis" aria-label="Key insights">
    <Kpi label="Crew status" value={NAMES[all]} detail="4 astronauts monitored" color={COL[all]} />
    <Kpi label="Off-baseline signals" value={`${nd} of 4`} detail={member.name} />
    <Kpi label="Peak cumulative dose" value={`${peak.toFixed(1)} mSv`} detail={`${Math.round(peak / 150 * 100)}% of illustrative budget`} />
    <Kpi label="Ground link" value={online ? 'Online' : 'Autonomous'} detail={online ? 'Real-time sync' : `${q} summaries queued`} />
  </section>;
}
