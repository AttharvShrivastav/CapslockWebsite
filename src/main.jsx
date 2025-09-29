// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css'; // Make sure your global css is imported

import { TextPlugin } from 'gsap/TextPlugin';

// ✅ Add this line to disable the browser's automatic scroll restoration.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);