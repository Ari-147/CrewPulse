import { NAMES } from '../data/hazards.js';
import { worst } from './CrewTabs.jsx';
import StatusMark from './StatusMark.jsx';

export default function CrewTable({ crew, selected, onSelect }) {
  return <div className="tw"><table><caption className="sr">Crew overview, current simulated readings</caption>
    <thead><tr><th className="label">Status</th><th className="label">Astronaut</th><th className="label">Role</th><th className="label n">Dose rate</th><th className="label n">Sleep</th><th className="label n">Heart rate</th><th className="label n">SpO₂</th><th className="label n">Cum. dose</th></tr></thead>
    <tbody>{crew.map((member, i) => {
      const level = worst(member);
      return <tr key={member.id} className={i === selected ? 'on' : ''} onClick={() => onSelect(i)}>
        <td><span className={`status status-${level}`}><StatusMark level={level} />{NAMES[level]}</span></td>
        <td><button className="row-btn" aria-pressed={i === selected} onClick={event => { event.stopPropagation(); onSelect(i); }}>{member.name}</button></td>
        <td>{member.role}</td>
        <td className="n">{member.val.dose.toFixed(1)}<span className="unit">µSv/h</span></td>
        <td className="n">{member.val.sleep.toFixed(1)}<span className="unit">h</span></td>
        <td className="n">{member.val.rhr.toFixed(0)}<span className="unit">bpm</span></td>
        <td className="n">{member.val.spo2.toFixed(1)}<span className="unit">%</span></td>
        <td className="n">{member.cum.toFixed(1)}<span className="unit">mSv</span></td>
      </tr>;
    })}</tbody></table></div>;
}
