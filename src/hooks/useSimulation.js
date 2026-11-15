import { useEffect, useRef, useState } from 'react';
import { CREW } from '../data/crew.js';
import { HZ } from '../data/hazards.js';
import { SIG } from '../data/signals.js';
import { clock } from '../utils/format.js';
import { dev, lvl } from '../utils/status.js';

const mk = (c, id) => {
  const base = { dose: c[2], sleep: c[3], rhr: c[4], spo2: 98 };
  return { id, name: c[0], role: c[1], cum: 112 * 24 * c[2] / 1000, base, bias: { dose: 0, sleep: 0, rhr: 0, spo2: 0 }, val: { ...base }, hist: Object.fromEntries(Object.keys(base).map(k => [k, Array(28).fill(base[k])])) };
};

const step = m => {
  const bias = {}, val = {}, hist = {};
  for (const k in SIG) {
    bias[k] = m.bias[k] * 0.95;
    val[k] = m.base[k] + bias[k] + (Math.random() - 0.5) * SIG[k].tol * 0.25;
    hist[k] = [...m.hist[k].slice(1), val[k]];
  }
  return { ...m, bias, val, hist, cum: m.cum + val.dose * 0.1 / 1000 };
};

export function useSimulation() {
  const [crew, setCrew] = useState(() => CREW.map(mk));
  const [online, setOnline] = useState(true);
  const [q, setQ] = useState(0);
  const [t, setT] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const prev = useRef({});

  useEffect(() => { const id = setInterval(() => { setCrew(c => c.map(step)); setT(x => x + 1); }, 1500); return () => clearInterval(id); }, []);
  useEffect(() => {
    const out = [];
    crew.forEach(m => HZ.forEach(h => {
      if (!h.s) return;
      const key = m.id + h.k, l = lvl(dev(m, h.s));
      if (l > (prev.current[key] || 0)) out.push({ id: `${key}-${t}`, l, h, text: `${m.name}: ${h.msg}`, time: clock(t) });
      prev.current[key] = l;
    }));
    if (out.length) setAlerts(a => [...out, ...a].slice(0, 12));
  }, [crew, t]);
  useEffect(() => { if (!online && t % 4 === 0) setQ(x => x + 1); }, [online, t]);

  const toggleLink = notify => {
    const next = !online;
    setOnline(next);
    if (!next) setAlerts(a => [{ id: `link-${t}`, l: 1, h: HZ[2], text: 'Link to Earth lost. Running on board.', time: clock(t) }, ...a]);
    else { notify(q ? `Summary synced · ${q} reports sent to ground` : 'Link restored'); setQ(0); }
  };
  const spike = () => setCrew(c => c.map(m => ({ ...m, bias: { ...m.bias, dose: SIG.dose.tol * 3.2 } })));
  const sleepHit = selected => setCrew(c => c.map((m, i) => i === selected ? { ...m, bias: { ...m.bias, sleep: -SIG.sleep.tol * 3.2, rhr: SIG.rhr.tol * 1.4 } } : m));
  const reset = () => { setCrew(CREW.map(mk)); setAlerts([]); prev.current = {}; };
  return { crew, online, q, t, alerts, toggleLink, spike, sleepHit, reset };
}
