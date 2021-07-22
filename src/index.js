import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LogContext from './contexts/LogContext';
import SeshContext from './contexts/CurrentSessionContext';
ReactDOM.render(
  <React.StrictMode>
    <LogContext>
      <SeshContext>
        <App />
      </SeshContext>
    </LogContext>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
