export const clock = n => {
  const m = n * 6 + 384;
  return `Day 112 · ${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

export const cv = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
