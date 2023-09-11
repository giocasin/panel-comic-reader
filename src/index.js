import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { HashRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Router>
);