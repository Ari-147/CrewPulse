import ChartBox from './ChartBox.jsx';

export default function DoseChart({ data, options }) { return <div className="cv"><ChartBox type="bar" data={data} options={options} /></div>; }
