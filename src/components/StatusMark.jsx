// Status is encoded by shape as well as colour: circle = Normal, triangle = Watch, diamond = Alert.
const SHAPES = [
  <circle key="ok" cx="6" cy="6" r="5" />,
  <path key="watch" d="M6 1 11 11H1z" />,
  <path key="alert" d="M6 .5 11.5 6 6 11.5.5 6z" />,
];

export default function StatusMark({ level }) {
  return <svg className={`mark status-${level}`} width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">{SHAPES[level]}</svg>;
}
