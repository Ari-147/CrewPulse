import { HZ } from '../data/hazards.js';
import HazardCard from './HazardCard.jsx';

export default function HazardGrid(props) {
  return <div className="hz">{HZ.map(hazard => <HazardCard key={hazard.k} hazard={hazard} {...props} />)}</div>;
}
