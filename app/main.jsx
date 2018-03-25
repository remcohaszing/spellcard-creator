import React from 'react';
import { render } from 'react-dom';

import './main.css';
import App from './components/App';
import loadFont from './util/loadFont';


loadFont('Droid Sans');
loadFont('Droid Serif');
loadFont('Lobster');


const reactRoot = document.getElementById('app');


render(<App />, reactRoot);
