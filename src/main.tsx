import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App?final-cta-fidelity-app-19';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
