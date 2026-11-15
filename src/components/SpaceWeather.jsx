import Panel from './Panel.jsx';

export default function SpaceWeather({ spaceWeather }) {
  const { status, data } = spaceWeather;
  const text = status === 'loading' ? 'Loading NASA DONKI solar-flare summary…'
    : status === 'error' ? 'Solar-flare feed unavailable (offline, rate-limited or blocked). This is not an all-clear. Check NASA DONKI directly.'
    : `Last 30 days: ${data.n} solar flares, strongest class ${data.top}. Live from NASA DONKI.`;
  return <Panel title="Space weather · DONKI" meta={status === 'ready' ? 'Live' : status === 'loading' ? 'Loading' : 'Unavailable'} className="weather"><div className="panel-body"><p className="note" role={status === 'error' ? 'status' : undefined}>{text}</p></div></Panel>;
}
