export default function SimControls({ onSpike, onSleep, onReset }) {
  return <><h3>Simulation controls</h3><div className="stack"><button className="btn" onClick={onSpike}>Simulate radiation spike</button><button className="btn" onClick={onSleep}>Simulate sleep disruption</button><button className="btn" onClick={onReset}>Reset simulation</button></div><p className="ks controls-note">Sleep disruption applies to the selected astronaut.</p></>;
}
