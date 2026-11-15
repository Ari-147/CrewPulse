import { COL, NAMES } from '../data/hazards.js';
import { worst } from './CrewTabs.jsx';

export default function CrewTable({ crew, selected, onSelect }) {
  return <div className="tw"><table><caption className="sr">Crew overview, current simulated readings</caption><thead><tr><th>Astronaut</th><th>Role</th><th className="n">Dose rate</th><th className="n">Sleep</th><th className="n">Heart rate</th><th className="n">SpO₂</th><th className="n">Cumulative dose</th><th>Status</th></tr></thead>
    <tbody>{crew.map((member, i) => <tr key={member.id} className={i === selected ? 'on' : ''} tabIndex="0" onClick={() => onSelect(i)} onKeyDown={event => event.key === 'Enter' && onSelect(i)}>
      <td>{member.name}</td><td>{member.role}</td><td className="n">{member.val.dose.toFixed(1)} <span>µSv/h</span></td><td className="n">{member.val.sleep.toFixed(1)} <span>h</span></td><td className="n">{member.val.rhr.toFixed(0)} <span>bpm</span></td><td className="n">{member.val.spo2.toFixed(1)} <span>%</span></td><td className="n">{member.cum.toFixed(1)} <span>mSv</span></td><td><span className="chip table-chip" style={{ '--c': COL[worst(member)] }}>{NAMES[worst(member)]}</span></td>
    </tr>)}</tbody></table></div>;
}
