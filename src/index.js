import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './functional.css';
import 'font-awesome/css/font-awesome.css';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
