import { useEffect, useState } from 'react';

// Returns { status: 'loading' | 'ready' | 'error', data } so the UI can tell "still loading" from "unavailable".
export function useDonki() {
  const [state, setState] = useState({ status: 'loading', data: null });
  useEffect(() => {
    const end = new Date();
    const start = new Date(end - 30 * 864e5);
    const date = d => d.toISOString().slice(0, 10);
    const key = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
    const failed = () => setState({ status: 'error', data: null });
    fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${date(start)}&endDate=${date(end)}&api_key=${key}`)
      .then(response => response.json())
      .then(flares => {
        if (!Array.isArray(flares)) return failed();
        const rank = value => ({ A: 0, B: 1, C: 2, M: 3, X: 4 })[value[0]] * 100 + (parseFloat(value.slice(1)) || 0);
        const top = flares.map(flare => flare.classType).filter(Boolean).sort((a, b) => rank(b) - rank(a))[0];
        setState({ status: 'ready', data: { n: flares.length, top: top || 'none' } });
      })
      .catch(failed);
  }, []);
  return state;
}
