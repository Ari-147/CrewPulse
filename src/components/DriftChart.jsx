import ChartBox from './ChartBox.jsx';

export default function DriftChart({ data, options }) { return <div className="cv tall"><ChartBox type="line" data={data} options={options} /></div>; }
