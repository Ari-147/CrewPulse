import { NAMES } from '../data/hazards.js';
import StatusMark from './StatusMark.jsx';

export default function AlertFeed({ alerts }) {
  return <div className="alert-list" role="log" aria-label="Alert feed" tabIndex={0}>{alerts.length ? alerts.map(alert => <div key={alert.id} className={`alert-item l${alert.l}`}>
    <div><span className={`status status-${alert.l}`}><StatusMark level={alert.l} />{NAMES[alert.l]}</span> · {alert.text}</div>
    <div className="alert-meta">{alert.time} · {alert.h.risk ? `Related NASA risk: ${alert.h.risk}` : 'Hazard: Distance from Earth'}</div>
  </div>) : <div className="empty"><StatusMark level={0} /><span>No alerts. All signals are within each astronaut’s baseline.</span></div>}</div>;
}
