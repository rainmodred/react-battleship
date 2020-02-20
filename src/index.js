import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import App from './App';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    user-select: none;
    font-family: 'Open Sans', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const app = (
  <>
    <GlobalStyle />
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </>
);

ReactDOM.render(app, document.getElementById('root'));
