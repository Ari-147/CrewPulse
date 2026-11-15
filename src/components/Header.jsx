import { clock } from '../utils/format.js';

export default function Header({ t, online, theme, onLink, onTheme }) {
  return <header className="top">
    <div className="brand"><span className="mark" />CrewPulse<span className="meta brand-meta">Crew health monitor</span></div>
    <div className="ctl"><span className="meta">{clock(t)}</span>
      <button className="btn" onClick={onLink} aria-pressed={!online}><span className="dot" style={{ '--c': online ? 'var(--ok)' : 'var(--wa)' }} />Link to Earth: {online ? 'Online' : 'Offline'}</button>
      <button className="btn" onClick={onTheme}>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</button>
    </div>
  </header>;
}
