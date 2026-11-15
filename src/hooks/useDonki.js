import { useEffect, useState } from 'react';

export function useDonki() {
  const [spaceWeather, setSpaceWeather] = useState(null);
  useEffect(() => {
    const end = new Date();
    const start = new Date(end - 30 * 864e5);
    const date = d => d.toISOString().slice(0, 10);
    const key = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
    fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${date(start)}&endDate=${date(end)}&api_key=${key}`)
      .then(response => response.json())
      .then(flares => {
        if (!Array.isArray(flares)) return;
        const rank = value => ({ A: 0, B: 1, C: 2, M: 3, X: 4 })[value[0]] * 100 + (parseFloat(value.slice(1)) || 0);
        const top = flares.map(flare => flare.classType).filter(Boolean).sort((a, b) => rank(b) - rank(a))[0];
        setSpaceWeather({ n: flares.length, top: top || 'none' });
      })
      .catch(() => {});
  }, []);
  return spaceWeather;
}
