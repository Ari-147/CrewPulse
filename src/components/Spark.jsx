export default function Spark({ data, color }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const points = data.map((value, i) => `${i / (data.length - 1) * 200},${36 - (value - min) / range * 32}`).join(' ');
  return <svg viewBox="0 0 200 40" width="100%" height="40" preserveAspectRatio="none"><polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}
