import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border: 0;
      font-family: Manrope, sans-serif;
      color: var(--text-main);
      outline: none;

      &:focus {
        outline: none;
      }

      &:active {
        outline: none;
      }
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #135dff;
    border-radius: 8px;
  }

  :root {
    --bg: #101113;
    --text-main: #fff;
    --text-gray: #acacac;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Global />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
