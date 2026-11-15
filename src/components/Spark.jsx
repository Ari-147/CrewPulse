// Sparkline. With a `domain` the trace is scaled to a fixed window, so a flat signal reads as flat.
export default function Spark({ data, color, domain }) {
  const lo = domain ? domain[0] : Math.min(...data), hi = domain ? domain[1] : Math.max(...data), range = hi - lo || 1;
  const y = value => 36 - Math.min(1, Math.max(0, (value - lo) / range)) * 32;
  const points = data.map((value, i) => `${i / (data.length - 1) * 200},${y(value)}`).join(' ');
  return <svg viewBox="0 0 200 40" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}
