// CrewPulse mark: an orbit with four crew dots. Matches public/favicon.svg.
const DOTS = [[43, 13], [52.7, 39.5], [28.2, 53.7], [11.3, 24.5]];

export default function BrandMark() {
  return <svg className="brand-mark" width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="22" fill="none" stroke="var(--text-2)" strokeWidth="4" />
    <g className="orbit">
      {DOTS.map(([x, y]) => <circle key={x} cx={x} cy={y} r="7" fill="var(--accent)" stroke="var(--surface-1)" strokeWidth="2" />)}
    </g>
  </svg>;
}
