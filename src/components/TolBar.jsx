// Drift as a multiple of personal tolerance on a 0-3x scale. Watch starts at 1x, Alert at 2x.
const MAX = 3;

export default function TolBar({ drift }) {
  const pct = Math.min(drift, MAX) / MAX * 100;
  return <div>
    <div className="tol-read"><span className="num">{drift.toFixed(2)}×</span><span className="caption">of tolerance</span></div>
    <div className="tol-track" role="img" aria-label={`Drift ${drift.toFixed(2)} times personal tolerance. Watch at 1, Alert at 2.`}>
      <span className="tol-mark" style={{ left: `${pct}%` }} />
    </div>
    <div className="tol-scale" aria-hidden="true"><span style={{ left: 0 }}>0</span><span style={{ left: '33.33%' }}>1×</span><span style={{ left: '66.66%' }}>2×</span><span style={{ left: '100%' }}>3×</span></div>
  </div>;
}
