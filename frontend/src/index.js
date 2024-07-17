import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './tailwind.css';
import App from './App';

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
