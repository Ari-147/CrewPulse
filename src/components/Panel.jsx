export default function Panel({ title, meta, note, className = '', children }) {
  return <section className={`panel ${className}`}>
    <div className="panel-head"><h2>{title}</h2>{meta && <span className="caption">{meta}</span>}</div>
    {note && <p className="panel-note">{note}</p>}
    {children}
  </section>;
}
