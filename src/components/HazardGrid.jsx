import { HZ } from '../data/hazards.js';
import HazardCard from './HazardCard.jsx';

export default function HazardGrid(props) {
  return <ul>{HZ.map(hazard => <HazardCard key={hazard.k} hazard={hazard} {...props} />)}</ul>;
}
