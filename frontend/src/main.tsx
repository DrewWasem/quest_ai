import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { checkAutoDemo } from './utils/demo-runner';
import { checkZoneDemo } from './utils/zone-demo-runner';
import { checkIntroRunner } from './utils/intro-runner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Auto-start demos from URL params:
//   ?demo=showcase              → 21 best vignettes across all zones
//   ?demo=skeleton-birthday     → ALL stage 1 vignettes for that zone
checkAutoDemo();
checkZoneDemo();
checkIntroRunner();
