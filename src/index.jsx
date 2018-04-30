import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './components/App';


const reactRoot = document.getElementById('app');


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}


render(<App />, reactRoot);
