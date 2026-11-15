import { missionDay, utcTime } from '../utils/format.js';
import BrandMark from './BrandMark.jsx';
import StatusMark from './StatusMark.jsx';

export default function Header({ t, online, theme, age, onLink, onTheme }) {
  return <header className="bar"><div className="bar-inner">
    <div className="brand"><BrandMark />CrewPulse</div>
    <dl className="bar-meta">
      <div><dt className="label">Mission day</dt><dd className="num">{missionDay(t)}</dd></div>
      <div><dt className="label">UTC</dt><dd className="num">{utcTime(t)}</dd></div>
      <div><dt className="label">Updated</dt><dd className="num">{age}s ago</dd></div>
    </dl>
    <span className="badge">Simulated · Fictional crew</span>
    <div className="bar-actions">
      <button className="btn" onClick={onLink} aria-label={`Link to Earth ${online ? 'online' : 'offline'}. Activate to ${online ? 'simulate link loss' : 'restore the link'}.`}>
        <StatusMark level={online ? 0 : 1} />Link to Earth: {online ? 'Online' : 'Offline'}
      </button>
      <button className="btn" onClick={onTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'}</button>
    </div>
  </div></header>;
}
