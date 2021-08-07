import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
 
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 6000,
  offset: '50%',
  transition: transitions.SCALE
}

ReactDOM.render( 
  <BrowserRouter>
    <React.StrictMode>
      <AlertProvider template={AlertTemplate} {...options}>
      <App />
      </AlertProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
