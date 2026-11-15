import { COL, NAMES } from '../data/hazards.js';

export default function AlertFeed({ alerts }) {
  return <div aria-live="polite">{alerts.length ? alerts.map(alert => <div key={alert.id} className="al" style={{ '--c': COL[alert.l] }}><b>{NAMES[alert.l]}</b> · {alert.text}<small>{alert.time} · {alert.h.risk ? `Related NASA risk: ${alert.h.risk}` : 'Hazard: Distance from Earth'}</small></div>) : <div className="empty">All signals are within each astronaut’s baseline. Try a simulation control.</div>}</div>;
}
