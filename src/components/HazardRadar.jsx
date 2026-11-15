import ChartBox from './ChartBox.jsx';

export default function HazardRadar({ data, options }) { return <div className="cv"><ChartBox type="radar" data={data} options={options} /></div>; }
