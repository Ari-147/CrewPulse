export default function Ring({ score, color }) {
  const radius = 26, circumference = 2 * Math.PI * radius;
  return <svg width="68" height="68" viewBox="0 0 68 68">
    <circle cx="34" cy="34" r={radius} fill="none" stroke="var(--line)" strokeWidth="6" />
    <circle cx="34" cy="34" r={radius} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)} transform="rotate(-90 34 34)" className="ring" />
    <text x="34" y="39" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text)" fontFamily="JetBrains Mono">{Math.round(score)}</text>
  </svg>;
}
