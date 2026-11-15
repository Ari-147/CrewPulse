// Simulated mission clock: one simulation tick = 6 mission minutes, starting Day 112 06:24 UTC.
const simMinutes = n => n * 6 + 384;

export const missionDay = n => 112 + Math.floor(simMinutes(n) / 1440);

export const hhmm = minutes => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

export const utcTime = n => hhmm(simMinutes(n));
export const clock = n => `Day ${missionDay(n)} · ${utcTime(n)} UTC`;

export const cv = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
