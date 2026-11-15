import Panel from './Panel.jsx';

export default function SimControls({ onSpike, onSleep, onReset }) {
  return <Panel title="Simulation · demo only" className="sim panel-dashed">
    <div className="panel-body"><div className="stack">
      <button className="btn" onClick={onSpike}>Simulate radiation spike</button>
      <button className="btn" onClick={onSleep}>Simulate sleep disruption</button>
      <button className="btn" onClick={onReset}>Reset simulation</button>
    </div><p className="note" style={{ marginTop: 'var(--space-2)' }}>Sleep disruption applies to the selected astronaut.</p></div>
  </Panel>;
}
