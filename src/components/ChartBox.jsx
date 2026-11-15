import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { cv } from '../utils/format.js';

export default function ChartBox({ type, data, options }) {
  const canvas = useRef();
  const chart = useRef();
  useEffect(() => {
    Chart.defaults.font.family = 'Inter,system-ui,sans-serif';
    const plugins = options.plugins || {};
    chart.current = new Chart(canvas.current, { type, data, options: { responsive: true, maintainAspectRatio: false, animation: false, interaction: { mode: 'index', intersect: false }, ...options, plugins: { ...plugins, tooltip: { backgroundColor: cv('--s2'), titleColor: cv('--text'), bodyColor: cv('--text'), borderColor: cv('--line2'), borderWidth: 1, padding: 10, cornerRadius: 4, ...(plugins.tooltip || {}) } } } });
    return () => chart.current.destroy();
  }, [type]);
  useEffect(() => { if (chart.current) { chart.current.data = data; chart.current.update('none'); } }, [data]);
  return <canvas ref={canvas} />;
}
