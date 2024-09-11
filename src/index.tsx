import "@fontsource/dm-sans"; // Defaults to weight 400
import "@fontsource/dm-sans/400-italic.css"; // Specify weight and style
import "@fontsource/dm-sans/400.css"; // Specify weight
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();
