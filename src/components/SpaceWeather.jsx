export default function SpaceWeather({ spaceWeather }) {
  const text = spaceWeather ? `Last 30 days: ${spaceWeather.n} solar flares, strongest class ${spaceWeather.top}. Live from NASA DONKI.` : 'Live NASA DONKI solar-flare feed loads when the page is hosted online (e.g. GitHub Pages). Not reachable in this preview.';
  return <><h3>NASA space weather · DONKI</h3><p className="ks zero-margin">{text}</p></>;
}
