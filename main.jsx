import './style.css';

// import { setupCounter } from './counter.js';
import App from './App';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <Router>
        <App />
    </Router>,
);
