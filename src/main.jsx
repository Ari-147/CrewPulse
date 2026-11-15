import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

document.documentElement.dataset.theme = 'dark';
createRoot(document.getElementById('root')).render(<App />);
