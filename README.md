# CrewPulse

CrewPulse is a fictional, baseline-aware astronaut health-monitoring dashboard for NASA Space Apps' **Create Health Monitoring Software for Astronauts on Space Missions** challenge. [Live demo (add GitHub Pages URL)](https://Ari-147.github.io/CrewPulse/)

## The challenge

Long-duration missions put crews at the intersection of radiation, isolation, distance, changing gravity, and closed environments. CrewPulse explores how a compact, offline-capable dashboard could make individual physiological drift and connected hazards visible to a crew and ground team.

## What it does

- Monitors telemetry through NASA's five hazards of human spaceflight.
- Compares each astronaut against a personal baseline rather than a generic normal range.
- Detects compound-hazard patterns when multiple signals drift together.
- Uses Normal, Watch, and Alert tiers to make status easy to scan.
- Demonstrates offline-first, store-and-forward summaries when the Earth link is unavailable.
- Visualizes baseline drift, hazard balance, cumulative dose, crew status, and alert history.

## How it maps to NASA's five hazards

| Hazard | What is monitored | Related NASA risk |
| --- | --- | --- |
| Space radiation | Dose rate and cumulative simulated dose | Radiation-Induced Cancers |
| Isolation and confinement | Sleep duration versus personal baseline | Inadequate Sleep and Irregular Schedules |
| Distance from Earth | Ground-link state and queued summaries | Self-sufficiency far from Earth |
| Gravity fields | Resting heart-rate drift | Cardiovascular Adaptations |
| Hostile/closed environments | Blood oxygen and simulated cabin temperature | Hypoxia |

## NASA and partner data used

CrewPulse uses fictional, simulated crew telemetry. Its monitoring concepts and labels are informed by these public resources:

- [NASA HRP Hazards](https://www.nasa.gov/hrp/hazards/)
- [NASA HRP Risks](https://www.nasa.gov/hrp/risks/)
- [NASA Ongoing HRP Research](https://www.nasa.gov/hrp/ongoing-hrp-research/)
- [CSA Monitoring Radiation for Astronaut Health](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp)
- [CSA Why Do We Conduct Science Experiments in Space?](https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp)
- [NASA DONKI](https://ccmc.gsfc.nasa.gov/tools/DONKI/) provides the optional live solar-flare summary.

## Tech stack

React 18, Vite, Chart.js 4, and plain CSS. The only runtime dependencies are React, React DOM, and Chart.js.

## Getting started

```bash
npm install
npm run dev
npm run build
```

To use your own DONKI key, copy `.env.example` to `.env` and set `VITE_NASA_API_KEY`. The application uses `DEMO_KEY` when it is absent.

## Project structure

```text
src/
  components/  Small presentational dashboard pieces
  data/        Fictional crew, hazard, and signal constants
  hooks/       Simulation and DONKI data loading
  utils/       Status scoring and display helpers
  styles/      Existing visual tokens, base rules, and component styles
```

## Deploying to GitHub Pages

The included workflow builds and deploys `dist` whenever `main` is updated. In your repository settings, choose **GitHub Actions** as the Pages source. Vite uses a relative base path, so the compiled site also works from the project Pages URL.

## Limitations and next steps

All crew records, vitals, doses, and alerts are simulated and fictional. Thresholds are illustrative, not clinically validated, and CrewPulse is not a medical device. Future work would connect real wearable and dosimeter inputs, validate workflows with flight surgeons, and use space-weather events to trigger radiation alerts.

## Credits and licenses

Built with React (MIT) and Chart.js (MIT). Inter and JetBrains Mono are licensed under the SIL Open Font License. NASA and CSA resources are credited above. This project is licensed under the [MIT License](LICENSE).
